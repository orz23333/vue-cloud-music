<template>
    <transition name="slide">
        <div class="disc">
            <c-header title="歌单" icon="icon-2fanhui" :back="back"></c-header>
            <div class="scroll-wrapper">
                <scroll :data="discDetail.songs" :refreshDelay="100" ref="scroll" class="scroll">
                    <div>
                        <div class="center" v-if="discDetail.discName">
                            <div class="left">
                                <img :src="discDetail.discPic" @load="refresh">
                            </div>
                            <div class="right">
                                <h2 class="title">{{discDetail.discName}}</h2>
                                <div class="author">
                                    <img :src="discDetail.creatorAvat" alt>
                                    <span>{{discDetail.creatorName}}</span>
                                </div>
                            </div>
                            <div class="tab">
                                <div class="item" @click="toggleFavoriteDisc">
                                    <i :class="isFavoriteIcon"></i>
                                    <p class="text">{{discDetail.subscribedCount}}</p>
                                </div>
                                <div class="item" @click="showComments">
                                    <i class="icon-comment-o"></i>
                                    <p class="text">{{discDetail.commentCount}}</p>
                                </div>
                                <div class="item disable">
                                    <i class="icon-fenxiang"></i>
                                    <p class="text">{{discDetail.shareCount}}</p>
                                </div>
                                <div class="item disable">
                                    <i class="icon-xiazai"></i>
                                    <p class="text">下载</p>
                                </div>
                            </div>
                        </div>
                        <div class="control" v-if="discDetail.discName" @click="playAll">
                            <i class="icon-bofang"></i>
                            <span>播放全部(共{{ discDetail.songs.length }}首)</span>
                        </div>
                        <song-list
                            :songs="discDetail.songs"
                            @selectMv="setPlayMv"
                            @select="setPlayList"
                        ></song-list>
                    </div>
                </scroll>
            </div>
            <comments-page
                v-if="isCommentShow"
                @hide="hideComments"
                commentsType="disc"
                :id="disc"
                :item="discDetail"
            ></comments-page>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getDiscList } from "api/recommend";
import { RES_OK } from "api/config";
import { getUrl } from "api/song";
import { playMode } from "common/js/config";
import { createSong } from "common/js/song";
import CommentsPage from "components/comments-page/comments-page";
import songList from "base/song-list/song-list";
import Scroll from "base/scroll/scroll";
import CHeader from "components/header/header";

export default {
    data() {
        return {
            discDetail: {},
            isCommentShow: false
        };
    },
    computed: {
        isFavoriteIcon() {
            return this.isFavoriteDisc
                ? "icon-ic_folder_special_px"
                : "icon-tianjiawenjianjia";
        },
        isFavoriteDisc() {
            let isF = this.favoriteDisc.findIndex(v => {
                return v.id == this.disc;
            });
            return isF > -1;
        },
        playIcon() {
            return this.playing ? "play" : "play pause";
        },
        ...mapGetters(["disc", "mode", "playing", "favoriteDisc"])
    },
    created() {
        this._getDiscList(this.disc);
    },
    methods: {
        showComments() {
            this.isCommentShow = true;
        },
        hideComments() {
            this.isCommentShow = false;
        },
        toggleFavoriteDisc() {
            if (this.isFavoriteDisc) {
                this.deleteFD(this.discDetail);
            } else {
                this.saveFD(this.discDetail);
            }
        },
        playAll() {
            let index;
            if (this.mode === playMode.random) {
                index = Math.floor(
                    Math.random() * (this.discDetail.songs.length + 1)
                );
            } else {
                index = 0;
            }
            this.selectPlay({ list: this.discDetail.songs, index });
            this.saveDiscHistory(this.discDetail);
        },
        setPlayList(item, index) {
            this.selectPlay({ list: this.discDetail.songs, index });
            this.saveDiscHistory(this.discDetail);
        },
        refresh() {
            try {
                this.$refs.scroll.refresh();
            } catch (error) {}
        },
        setPlayMv(id) {
            this.playMv(id);
        },
        back() {
            this.$router.back();
        },
        _getDiscList(id) {
            getDiscList(id).then(res => {
                if (res.code === RES_OK) {
                    this.discDetail = this._normalize(res.playlist);
                    this.discDetail.id = this.disc;
                    this._getUrl(this.discDetail.songs);
                }
            });
        },
        _normalize(list) {
            let ret = {};
            ret.id = this.disc;
            ret.creatorName = list.creator.nickname;
            ret.creatorAvat = list.creator.avatarUrl;
            ret.discName = list.name;
            ret.discPic = list.coverImgUrl;
            ret.commentCount = list.commentCount;
            ret.shareCount = list.shareCount;
            ret.subscribedCount = list.subscribedCount;
            let songs = list.tracks;
            ret.songs = songs.map(song => {
                return createSong(song);
            });
            return ret;
        },
        _getUrl(list) {
            const ids = [];
            list.forEach(song => {
                ids.push(song.id);
            });
            const id = ids.join(",");
            getUrl(id).then(res => {
                if (res.code === RES_OK) {
                    let data = res.data;
                    this.discDetail.songs.forEach(song => {
                        data.forEach(v => {
                            if (v.id === song.id) {
                                song.url = v.url;
                            }
                        });
                    });
                }
            });
        },
        ...mapActions([
            "playMv",
            "selectPlay",
            "saveFD",
            "deleteFD",
            "saveDiscHistory"
        ]),
        ...mapMutations({
            setFullScreen: "SET_FULL_SCREEN"
        })
    },
    components: {
        songList,
        Scroll,
        CHeader,
        CommentsPage
    }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
.disc
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    right 0
    background #ffffff
    color black
    .header
        position relative
        height 44px
        text-align center
        .back
            position absolute
            top 0
            left 5px
            .icon-2fanhui
                display block
                padding 13px 10px 7px 10px
                font-size 20px
                color black
        .title
            display inline-block
            vertical-align top
            line-height 44px
            width 70%
        .player
            position absolute
            top 0
            right 0
            .icon-zuijinbofang
                display block
                padding 10px 10px 10px
                font-size 24px
                color black
                &.play
                    animation rotate 20s linear infinite
                &.pause
                    animation-play-state paused
    .scroll-wrapper
        position fixed
        top 44px
        bottom 0
        left 0
        right 0
        overflow hidden
        width 100%
        .scroll
            height 100%
            overflow hidden
            .control
                font-size 16px
                padding-left 20px
                line-height 40px
                border-bottom 1px solid rgb(240, 240, 240)
            .center
                display flex
                padding 10px
                flex-wrap wrap
                align-items center
                border-bottom 1px solid rgb(240, 240, 240)
                .left
                    flex 1 0
                    width 30%
                    margin-right 10px
                    img
                        width 100%
                .right
                    display flex
                    flex-flow column nowrap
                    align-self flex-start
                    flex 3 0
                    width 70%
                    height 100%
                    .title
                        padding-top 4px
                        margin-bottom 20px
                        width 100%
                        word-wrap normal
                    .author
                        line-height 30px
                        img
                            width 30px
                            border-radius 50%
                            vertical-align top
                        span
                            width 100%
                            word-wrap normal
                .tab
                    display flex
                    height 40px
                    padding-top 10px
                    flex-wrap nowrap
                    flex 1 0 100%
                    align-items center
                    text-align center
                    .item
                        display flex
                        flex-direction column
                        justify-content center
                        flex 1 1
                        font-size 20px
                        align-self stretch
                        &.disable
                            opacity 0.3
                        .icon-fenxiang, .icon-xiazai
                            font-size 18px
                        .icon-ic_folder_special_px
                            color red
                    .text
                        padding-top 10px
                        font-size 12px
@keyframes rotate
    0%
        transform rotate(0)
    100%
        transform rotate(360deg)
</style>

