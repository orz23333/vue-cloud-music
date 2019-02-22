<template>
    <div class="player-container" @click="showCtrl">
        <video
            preload="true"
            width="100%"
            height="100%"
            playsinline
            webkit-playsinline
            :poster="mvDetail.cover"
            ref="video"
            @canplay="canplay"
            @play="play"
            @pause="pause"
            @ended="ended"
            @timeupdate="timeupdate"
        >
            <source :src="mvDetail.brs">
        </video>
        <button type="button" class="back" @click.stop="back">
            <span class="icon-iconfontcha"></span>
        </button>
        <div class="loading" v-if="loading">
            <loading></loading>
        </div>
        <button class="toggleplay" type="button" @click.stop="togglePlay" v-if="showControl">
            <span :class="playCls"></span>
        </button>
        <div class="control-bar" :class="{'hide-control-bar': !showControl}" @click.stop>
            <button @click.stop="togglePlay" class="play">
                <span :class="miniPlayCls"></span>
            </button>
            <div class="progress-bar" ref="progressBar" @click="progressClick">
                <div class="bar-inner">
                    <div class="progress" ref="progress"></div>
                    <div
                        class="progress-btn-wrapper"
                        ref="progressBtn"
                        @touchstart.prevent="progressTouchStart"
                        @touchmove.prevent="progressTouchMove"
                        @touchend="progressTouchEnd"
                    >
                        <div class="progress-btn"></div>
                    </div>
                </div>
            </div>
            <div class="time">
                <span>{{cTime}}</span>/
                <span>{{duration}}</span>
            </div>
            <button class="quanping" @click.stop="setFullScreen">
                <i class="icon-quanping"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getMvDetail } from "api/mv";
import { RES_OK } from "api/config";
import moment from "moment";
import Loading from "base/loading/loading";
import { prefixStyle } from "common/js/dom";

const transform = prefixStyle("transform");
const progressBtnWidth = 16;

export default {
    name: "mvplayer",
    data() {
        return {
            mvDetail: {},
            playState: false,
            loading: true,
            showControl: false,
            currentTime: "0",
            touch: {},
            timer: null
        };
    },
    created() {
        this._getMvDetail(this.mvId);
    },
    beforeDestroy() {
        this.playState = false;
        this.loading = true;
        this.showControl = false;
        this.$refs.video.poster = "";
    },
    methods: {
        ended(e) {
            this.showControl = true;
            this.playState = false;
            e.target.currentTime = 0;
        },
        timeupdate(e) {
            this.currentTime = e.target.currentTime;
        },
        pause() {
            this.showControl = true;
            this.playState = false;
        },
        play() {
            this.showControl = false;
            this.playState = true;
        },
        canplay(e) {
            this.showControl = true;
            this.loading = false;
            this.$emit("fixTop", e.target.clientHeight);
        },
        progressClick(e) {
            const rect = this.$refs.progressBar.getBoundingClientRect();
            const offsetWidth = e.pageX - rect.left;
            this._offset(offsetWidth);
            this._triggerPercent();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.showControl = false;
            }, 3000);
        },
        progressTouchStart(e) {
            clearTimeout(this.timer);
            this.touch.init = true;
            this.touch.startX = e.touches[0].pageX;
            this.touch.left = this.$refs.progress.clientWidth;
        },
        progressTouchMove(e) {
            if (!this.touch.init) {
                return;
            }
            const deltaX = e.touches[0].pageX - this.touch.startX;
            const offsetWidth = Math.min(
                this.$refs.progressBar.clientWidth - progressBtnWidth,
                Math.max(0, this.touch.left + deltaX)
            );

            const barWidth =
                this.$refs.progressBar.clientWidth - progressBtnWidth;
            this.touch.percent = this.$refs.progress.clientWidth / barWidth;
            this._offset(offsetWidth);
        },
        progressTouchEnd() {
            this.touch.init = false;
            this._triggerPercent();
            this.timer = setTimeout(() => {
                this.showControl = false;
            }, 3000);
        },
        _offset(offsetWidth) {
            this.$refs.progress.style.width = `${offsetWidth}px`;
            this.$refs.progressBtn.style[
                transform
            ] = `translate3d(${offsetWidth}px,0,0)`;
        },
        _triggerPercent() {
            const barWidth =
                this.$refs.progressBar.clientWidth - progressBtnWidth;
            const percent = this.$refs.progress.clientWidth / barWidth;
            let time = (this.$refs.video.duration * percent).toFixed(0);
            this.$refs.video.currentTime = time;
            this.$refs.video.play();
        },
        back() {
            this.setPlayMv(false);
        },
        togglePlay() {
            if (this.$refs.video.paused) {
                this.$refs.video.play();
                this.playState = true;
            } else {
                this.$refs.video.pause();
                this.playState = false;
            }
        },
        setFullScreen() {
            if (this.$refs.video.requestFullscreen) {
                this.$refs.video.requestFullscreen();
            } else if (this.$refs.video.mozRequestFullScreen) {
                this.$refs.video.mozRequestFullScreen();
            } else if (this.$refs.video.msRequestFullscreen) {
                this.$refs.video.msRequestFullscreen();
            } else if (this.$refs.video.oRequestFullscreen) {
                this.$refs.video.oRequestFullscreen();
            } else if (this.$refs.video.webkitRequestFullscreen) {
                this.$refs.video.webkitRequestFullScreen();
            }
        },
        showCtrl() {
            clearTimeout(this.timer);

            if (this.showControl) {
                this.showControl = false;
            } else {
                this.showControl = true;
                this.timer = setTimeout(() => {
                    this.showControl = false;
                }, 3000);
            }
        },
        _getMvDetail(id) {
            getMvDetail(id).then(res => {
                if (res.code === RES_OK) {
                    this.mvDetail = res.data;
                    let src = this.mvDetail.brs;
                    let srcArr = Object.keys(src);
                    this.$refs.video.src = src[srcArr.pop()];
                    this.$emit("giveMVDt", res.data);
                }
            });
        },
        _getMvSrc(srcO) {
            if (!srcO) {
                return;
            }
            let srcArr = Object.keys(srcO);
            this.$refs.video.src = srcO[srcArr.pop()];
        },
        _normalizeCount(count) {
            count = +count % 10000;
            count = count.toFixed(1) + "万";
            return count;
        },
        _formalTime(t) {
            let time = moment(t)
                .utcOffset(0)
                .format("h:mm:ss");
            let arr = time.split(":");
            if (arr[0] === "12") {
                arr.shift();
            }
            time = arr.join(":");
            return time;
        },
        ...mapMutations({
            setPlayMv: "SET_PLAYMV"
        })
    },
    computed: {
        cTime() {
            return this._formalTime(this.currentTime * 1000);
        },
        duration() {
            if (this.loading) {
                return;
            }
            let time = this.$refs.video.duration;
            return this._formalTime(time * 1000);
        },
        playCls() {
            let cls;
            if (this.playState) {
                cls = "icon-zanting";
            } else {
                cls = "icon-bofang";
            }
            return cls;
        },
        miniPlayCls() {
            let cls;
            if (this.playState) {
                cls = "icon-zanting1";
            } else {
                cls = "icon-bofang2";
            }
            return cls;
        },
        ...mapGetters(["mvId"])
    },
    watch: {
        currentTime(newC) {
            if (!this.touch.init && this.showControl) {
                const barWidth =
                    this.$refs.progressBar.clientWidth - progressBtnWidth;
                const percent = newC / this.$refs.video.duration;
                const offsetWidth = percent * barWidth;
                this._offset(offsetWidth);
            }
        }
    },
    components: {
        Loading
    }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.player-container
    position fixed
    top 0
    left 0
    width 100%
    overflow hidden
    z-index 50
    outline none
    background-color black
    .loading
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 100px
    button
        background 0 0
        border none
        color inherit
        display inline-block
        font-size inherit
        line-height inherit
        text-transform none
        text-decoration none
        transition none
        outline none
        padding 0
    .back
        position absolute
        z-index 1
        top 10px
        left 10px
        width 30px
        height 30px
        font-size 20px
        line-height 30px
        color #ffffff
    .toggleplay
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        font-size 30px
        line-height 30px
        color #ffffff
    .hide-control-bar
        visibility visible
        opacity 0
    .control-bar
        display flex
        position absolute
        z-index 2
        left 0
        right 0
        bottom 0
        height 30px
        background-color rgb(0, 0, 0)
        .play
            width 30px
            height 30px
            line-height 30px
            margin-right 5px
            color #ffffff
        .progress-bar
            height 30px
            flex 1
            .bar-inner
                position relative
                top 12px
                height 4px
                background #ffffff
                .progress
                    position absolute
                    height 100%
                    background rgba(115, 133, 159, 0.5)
                .progress-btn-wrapper
                    position absolute
                    left -8px
                    top -13px
                    width 30px
                    height 30px
                    .progress-btn
                        position relative
                        top 7px
                        left 7px
                        box-sizing border-box
                        margin 0
                        width 16px
                        height 16px
                        border 3px solid #ffffff
                        border-radius 50%
                        background #ffffff
        .time
            line-height 30px
            font-size 13px
            margin-left 15px
            color #ffffff
        .quanping
            width 30px
            height 30px
            line-height 30px
            font-size 15px
            color #ffffff
</style>
