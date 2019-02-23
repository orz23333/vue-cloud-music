<template>
    <div class="player-wrapper" v-show="playlist.length">
        <transition name="slide">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img :src="currentSong.image" alt width="100%" height="100%">
                </div>
                <div class="top">
                    <div class="back">
                        <i class="icon-2fanhui" @click="hideScreen"></i>
                    </div>
                    <h1 class="title">{{currentSong.name }}</h1>
                    <h2 class="subtitle">{{currentSong.singer}}</h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper">
                            <div class="cd" :class="cdIcon">
                                <img :src="currentSong.image" alt class="image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="minioperators">
                        <div class="icon" @click="toggleFavoriteSong">
                            <i :class="isFavoriteIcon"></i>
                        </div>
                        <div class="icon" @click="showComments">
                            <i class="icon-comment-o"></i>
                        </div>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{formatTime(currentTime * 1000)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i :class="modeIcon" @click="changeMode"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i class="icon-shangyiqu" @click="prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i :class="playIcon" @click="togglePlay"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i class="icon-xiayiqu" @click="next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-fenlei-copy-copy" @click="show"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <audio
            :src="currentSong.url"
            ref="audio"
            @canplay="ready"
            @error="error"
            @timeupdate="updateTime"
            @ended="ended"
        ></audio>
        <playlist ref="playlist"></playlist>
        <transition name="slide">
            <comments-page
                v-if="isCommentShow"
                @hide="hideComments"
                commentsType="song"
                :id="currentSong.id"
                :item="currentSong"
            ></comments-page>
        </transition>
    </div>
</template>

<script>
import CommentsPage from "components/comments-page/comments-page";
import ProgressBar from "base/progress-bar/progress-bar";
import Playlist from "components/playlist/playlist";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { playMode } from "common/js/config";
import {
    savePlaylist,
    saveSequenceList,
    saveCurrentIndex
} from "common/js/cache";
import moment from "moment";
export default {
    data() {
        return {
            songReady: false,
            currentTime: 0,
            isCommentShow: false
        };
    },
    computed: {
        isFavoriteSong() {
            let index = this.favoriteSong.findIndex(v => {
                return v.id == this.currentSong.id;
            });
            return index > -1;
        },
        isFavoriteIcon() {
            return this.isFavoriteSong ? "icon-shoucang" : "icon-shoucang1";
        },
        modeIcon() {
            return this.mode === playMode.sequence
                ? "icon-shunxubofang"
                : this.mode === playMode.loop
                ? `icon-Pdanquxunhuan-`
                : "icon-bofangye-caozuolan-suijibofang";
        },
        cdIcon() {
            return this.playing ? "play" : "play pause";
        },
        playIcon() {
            return this.playing ? "icon-zanting" : "icon-bofang";
        },
        disableCls() {
            return this.songReady ? "" : "disable";
        },
        percent() {
            return (this.currentTime / this.currentSong.duration) * 1000;
        },
        ...mapGetters([
            "playing",
            "fullScreen",
            "playlist",
            "sequenceList",
            "mode",
            "currentIndex",
            "currentSong",
            "playMv",
            "favoriteSong"
        ])
    },
    methods: {
        hideComments() {
            this.isCommentShow = false;
        },
        showComments() {
            this.isCommentShow = true;
        },
        toggleFavoriteSong() {
            if (this.isFavoriteSong) {
                this.deleteFS(this.currentSong);
            } else {
                this.saveFS(this.currentSong);
            }
        },
        show() {
            this.$refs.playlist.show();
        },
        onProgressBarChange(percent) {
            const currentTime = (this.currentSong.duration * percent) / 1000;
            this.$refs.audio.currentTime = currentTime;
            if (!this.playing) {
                this.togglePlay();
            }
        },
        updateTime(e) {
            this.currentTime = e.target.currentTime;
        },
        ended(e) {
            if (this.mode === playMode.loop) {
                this.loop();
            } else {
                this.next();
            }
        },
        togglePlay() {
            this.setPlayingState(!this.playing);
        },
        next() {
            if (!this.songReady) {
                return;
            }
            let index = this.currentIndex + 1;
            if (index >= this.playlist.length) {
                index = 0;
            }
            this.setCurrentIndex(index);
            this.songReady = false;
        },
        prev() {
            if (!this.songReady) {
                return;
            }
            let index = this.currentIndex - 1;
            if (index === -1) {
                index = this.playlist.length - 1;
            }
            this.setCurrentIndex(index);
            this.songReady = false;
        },
        loop() {
            this.$refs.audio.currentTime = 0;
            this.$refs.audio.play();
            this.setPlayingState(true);
        },
        ready() {
            this.songReady = true;
        },
        error() {
            this.songReady = true;
            // this.next();
            console.log("出错");
        },
        hideScreen() {
            this.setFullScreen(false);
        },
        formatTime(time) {
            return moment(time).format("m:ss");
        },
        ...mapMutations({
            setFullScreen: "SET_FULL_SCREEN",
            setPlayingState: "SET_PLAYING_STATE",
            setCurrentIndex: "SET_CURRENT_INDEX",
            setPlayMode: "SET_PLAY_MODE"
        }),
        ...mapActions(["changeMode", "saveSongHistory", "saveFS", "deleteFS"])
    },
    watch: {
        playlist(n) {
            savePlaylist(n);
        },
        sequenceList(n) {
            saveSequenceList(n);
        },
        currentIndex(n) {
            saveCurrentIndex(n);
        },
        playMv(newP) {
            if (newP === true) {
                this.setPlayingState(false);
            }
        },
        currentSong(newS, oldS) {
            this.saveSongHistory(newS); //保存到历史记录
            if (newS.id === oldS.id || !newS.id) {
                return;
            }
            if (!newS.url) {
                this.next();
                this.songReady = true;
                return;
            }
            this.$nextTick(() => {
                this.$refs.audio.play();
                this.setPlayingState(true);
            });
        },
        playing(newPlaying) {
            const audio = this.$refs.audio;
            this.$nextTick(() => {
                newPlaying ? audio.play() : audio.pause();
            });
        }
    },
    components: {
        ProgressBar,
        Playlist,
        CommentsPage
    }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.player-wrapper
    .slide-enter-active, .slide-leave-active
        transition all 0.3s
    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
    .normal-player
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 150
        background $color-background
        .background
            position absolute
            left 0
            top 0
            width 100%
            height 100%
            z-index -1
            opacity 0.6
            filter blur(20px)
        .top
            position relative
            margin-bottom 25px
            .back
                position absolute
                top 0
                left 6px
                z-index 50
                .icon-2fanhui
                    display block
                    padding 9px
                    font-size $font-size-large-x
                    color rgb(230, 230, 230)
            .title
                width 70%
                margin 0 auto
                line-height 40px
                text-align center
                no-wrap()
                font-size $font-size-large
                color rgb(230, 230, 230)
            .subtitle
                line-height 20px
                text-align center
                font-size $font-size-medium
                color rgb(230, 230, 230)
                width 60%
                margin 0 auto
                no-wrap()
        .middle
            position fixed
            width 100%
            top 80px
            bottom 170px
            white-space nowrap
            font-size 0
            .middle-l
                display inline-block
                vertical-align top
                position relative
                width 100%
                height 0
                padding-top 80%
                .cd-wrapper
                    position absolute
                    left 10%
                    top 0
                    width 80%
                    height 100%
                    .cd
                        width 100%
                        height 100%
                        box-sizing border-box
                        border 10px solid rgba(255, 255, 255, 0.1)
                        border-radius 50%
                        &.play
                            animation rotate 20s linear infinite
                        &.pause
                            animation-play-state paused
                        .image
                            position absolute
                            left 0
                            top 0
                            width 100%
                            height 100%
                            border-radius 50%
                .playing-lyric-wrapper
                    width 80%
                    margin 30px auto 0 auto
                    overflow hidden
                    text-align center
                    .playing-lyric
                        height 20px
                        line-height 20px
                        font-size $font-size-medium
                        color $color-text-l
            .middle-r
                display inline-block
                vertical-align top
                width 100%
                height 100%
                overflow hidden
                .lyric-wrapper
                    width 80%
                    margin 0 auto
                    overflow hidden
                    text-align center
                    .text
                        line-height 32px
                        color $color-text-l
                        font-size $font-size-medium
                        &.current
                            color $color-text
        .bottom
            position absolute
            bottom 50px
            width 100%
            .minioperators
                display flex
                align-items center
                justify-content space-between
                margin 10px auto
                width 30%
                .icon
                    flex 1 1
                    text-align center
                    color rgb(230, 230, 230)
                    .icon-shoucang
                        color red
                    i
                        font-size 20px
            .progress-wrapper
                display flex
                align-items center
                width 80%
                margin 0px auto
                padding 10px 0
                .time
                    color rgb(230, 230, 230)
                    font-size $font-size-small
                    flex 0 0 30px
                    line-height 30px
                    width 30px
                    &.time-l
                        text-align left
                    &.time-r
                        text-align right
                .progress-bar-wrapper
                    flex 1
            .operators
                display flex
                align-items center
                .icon
                    flex 1
                    color rgb(230, 230, 230)
                    &.disable
                        color $color-theme-d
                    i
                        font-size 30px
                .i-left
                    text-align right
                .i-center
                    padding 0 20px
                    text-align center
                    i
                        font-size 40px
                .i-right
                    text-align left
                .icon-favorite
                    color $color-sub-theme
        &.normal-enter-active, &.normal-leave-active
            transition all 0.4s
            .top, .bottom
                transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        &.normal-enter, &.normal-leave-to
            opacity 0
            .top
                transform translate3d(0, -100px, 0)
            .bottom
                transform translate3d(0, 100px, 0)
@keyframes rotate
    0%
        transform rotate(0)
    100%
        transform rotate(360deg)
</style>

