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
                                <div class="item">
                                    <i class="icon-ic_folder_special_px"></i>
                                    <p class="text">收藏</p>
                                </div>
                                <div class="item" @click="showComments">
                                    <i class="icon-comment-o"></i>
                                    <p class="text">评论</p>
                                </div>
                                <div class="item">
                                    <i class="icon-fenxiang"></i>
                                    <p class="text">分享</p>
                                </div>
                                <div class="item">
                                    <i class="icon-xiazai"></i>
                                    <p class="text">下载</p>
                                </div>
                            </div>
                        </div>
                        <div class="control" @click="playAll">
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
        ...mapGetters([
            "disc",
            "mode",
            "playing",
            "favoriteDisc",
            "favoriteSong"
        ])
    },
    created() {
        this.discDetail = Object.assign({}, this.discDetail, {
            songs: this.favoriteSong,
            creatorName: "帅哥",
            discName: "我喜欢的歌曲",
            discPic: this.favoriteSong[0].image,
            creatorAvat:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550837940531&di=a5f11fa1102d4732542ad9d54a45e5c5&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Forj360%2F0070GpqCgy1ftc0opvkhuj30rs0rsgpt.jpg"
        });

        this._getUrl(); //歌曲地址url有有效时间限制，所以需要重新获取url
    },
    methods: {
        showComments() {
            this.isCommentShow = true;
        },
        hideComments() {
            this.isCommentShow = false;
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
        _getUrl() {
            const ids = [];
            this.favoriteSong.forEach(song => {
                ids.push(song.id);
            });
            const id = ids.join(",");
            getUrl(id).then(res => {
                if (res.code === RES_OK) {
                    let data = res.data;
                    let copyFavoriteSong = JSON.parse(
                        JSON.stringify(this.favoriteSong)
                    ); //复制
                    copyFavoriteSong.forEach(song => {
                        data.forEach(v => {
                            if (v.id === song.id) {
                                song.url = v.url;
                            }
                        });
                    });
                    this.saveFD(copyFavoriteSong);
                    this.discDetail = Object.assign({}, this.discDetail, {
                        songs: copyFavoriteSong,
                        creatorName: "帅哥",
                        discName: "我喜欢的歌曲",
                        discPic: copyFavoriteSong[0].image,
                        creatorAvat:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550837940531&di=a5f11fa1102d4732542ad9d54a45e5c5&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Forj360%2F0070GpqCgy1ftc0opvkhuj30rs0rsgpt.jpg"
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
    bottom 44px
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

