<template>
    <transition name="slide">
        <div class="mv" v-if="playMv" :style="paddingTop">
            <mvplayer @giveMVDt="_getMvDt" @fixTop="fixTop"></mvplayer>
            <scroll
                :data="allComments"
                :pullup="pullup"
                :probe-type="probeType"
                :listen-scroll="listenScroll"
                @scroll="scroll"
                @scrollToEnd="getMoreComments"
                class="scroll-wrapper"
                ref="scroll"
            >
                <div>
                    <div class="mvdetail">
                        <h2 class="title">
                            <i class="icon-MV"></i>
                            <span>{{mvDetail.name}}</span>
                            <i :class="isFavoriteIcon" @click="toggleFavoriteMv"></i>
                        </h2>
                        <p class="singer">歌手：{{mvDetail.artistName}}</p>
                        <div class="center">
                            <p>发行：{{mvDetail.publishTime}}</p>
                            <p>播放：{{_normalizeCount(mvDetail.playCount)}}</p>
                        </div>
                        <p class="desc">{{mvDetail.desc}}</p>
                    </div>
                    <comments
                        :total="total"
                        :hasMore="hasMore"
                        :comments="comments"
                        :hotComments="hotComments"
                        :scrollY="scrollY"
                    ></comments>
                </div>
            </scroll>
        </div>
    </transition>
</template>

<script>
import Comments from "components/comments/comments";
import Scroll from "base/scroll/scroll";
import Mvplayer from "components/mvplayer/mvplayer";
import { mapGetters, mapActions } from "vuex";
import { getMvComments, getMvDetail } from "api/mv";
import { RES_OK } from "api/config";

export default {
    name: "mv",
    data() {
        return {
            total: 0,
            hasMore: false,
            comments: [],
            hotComments: [],
            pullup: true,
            page: 0,
            mvDetail: {},
            listenScroll: true,
            probeType: 3,
            scrollY: -1,
            paddingTop: {
                paddingTop: "56%"
            } //默认paddingtop为%56
        };
    },
    computed: {
        isFavoriteIcon() {
            return this.isFavoriteMv ? "icon-shoucang" : "icon-shoucang1";
        },
        isFavoriteMv() {
            let index = this.favoriteMv.findIndex(v => {
                return (v.id == this.mvDetail.id);
            });

            return index > -1;
        },
        allComments() {
            return this.comments.concat(this.hotComments);
        },
        ...mapGetters(["mvId", "playMv", "favoriteMv"])
    },
    created() {
        if (!this.playMv) {
            this.$router.push("/findmusic/vedio");
            return;
        }
        this._getComments(this.mvId);
    },
    methods: {
        toggleFavoriteMv() {
            if (this.isFavoriteMv) {
                this.deleteFM(this.mvDetail);
            } else {
                this.saveFM(this.mvDetail);
            }
        },
        fixTop(height) {
            this.paddingTop.paddingTop = height + "px";
            setTimeout(() => {
                this.$refs.scroll.refresh();
            }, 20);
        },
        _getMvDt(mv) {
            this.mvDetail = mv;
        },
        _getComments(id) {
            this.page = 0;
            this.comments = [];
            this.hotComments = [];
            this.total = 0;
            this.hasMore = false;
            getMvComments({ id: id, page: this.page }).then(res => {
                if (res.code === RES_OK) {
                    this.comments = res.comments;
                    this.hotComments = res.hotComments;
                    this.hasMore = res.more;
                    this.total = res.total;
                }
            });
        },
        getMoreComments() {
            this.page++;
            getMvComments({ id: this.mvId, page: this.page }).then(res => {
                if (res.code === RES_OK) {
                    this.comments = this.comments.concat(res.comments);
                    this.hasMore = res.more;
                }
            });
        },
        _normalizeCount(count) {
            count = +count % 10000;
            count = count.toFixed(1) + "万";
            return count;
        },
        scroll(pos) {
            this.scrollY = pos.y;
        },
        ...mapActions(["saveFM", "deleteFM"])
    },
    watch: {
        mvId(newId) {
            this._getComments(newId);
        },
        scrollY(newY) {}
    },
    components: {
        Comments,
        Scroll,
        Mvplayer
    }
};
</script>

<style lang="stylus" scoped>
.mv
    position fixed
    z-index 100
    top 0
    bottom 0
    left 0
    right 0
    width 100%
    padding-top 56%
    background-color #fff
    .scroll-wrapper
        height 100%
        position relative
        .mvdetail
            padding 10px
            .title
                display flex
                margin-bottom 10px
                font-size 16px
                color black
                line-height 30px
                letter-spacing 1px
                span
                    font-size 18px
                    font-weight 550
                    flex 1
                .icon-MV
                    color red
                    font-size 30px
                    margin-right 8px
                .icon-shoucang1
                    font-size 18px
                    line-height 30px
                .icon-shoucang
                    font-size 18px
                    line-height 30px
                    color red                    
            .singer
                margin-bottom 15px
            .center
                margin-bottom 15px
                p
                    display inline-block
                    width 49%
                    box-sizing border-box
                    color #999
            .desc
                line-height 25px
                color rgb(150, 150, 150)
.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>

