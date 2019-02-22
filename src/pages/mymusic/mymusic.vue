<template>
    <div class="mm-wrapper">
        <c-header title="我的音乐" icon="icon-zhanghao"></c-header>
        <router-link to="/mymusic/playHistory">
            <div class="item">
                <div class="icon">
                    <i class="icon-zuijinbofang"></i>
                </div>
                <div class="bar">
                    <span class="text">最近播放</span>
                    <span class="right">
                        {{songHistory.length}}
                        <i class="icon-you"></i>
                    </span>
                </div>
            </div>
        </router-link>
        <router-link to="/mymusic/favoriteSong">
            <div class="item">
                <div class="icon">
                    <i class="icon-shoucang"></i>
                </div>
                <div class="bar">
                    <span class="text">收藏歌曲</span>
                    <span class="right">
                        {{favoriteSong.length}}
                        <i class="icon-you"></i>
                    </span>
                </div>
            </div>
        </router-link>
        <router-link to="/mymusic/favoriteMv">
            <div class="item">
                <div class="icon">
                    <i class="icon-video"></i>
                </div>
                <div class="bar">
                    <span class="text">收藏MV</span>
                    <span class="right">
                        {{favoriteMv.length}}
                        <i class="icon-you"></i>
                    </span>
                </div>
            </div>
        </router-link>
        <router-link to="/mymusic/favoriteDisc">
            <div class="item">
                <div class="icon">
                    <i class="icon-wodeshoucang"></i>
                </div>
                <div class="bar">
                    <span class="text">收藏歌单</span>
                    <span class="right">
                        {{favoriteDisc.length}}
                        <i class="icon-you"></i>
                    </span>
                </div>
            </div>
        </router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import CHeader from "components/header/header";
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "favoriteDisc",
            "favoriteSong",
            "favoriteMv",
            "songHistory"
        ])
    },
    components: {
        CHeader
    }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

a
    color black
.mm-wrapper
    position fixed
    top 0
    bottom 44px
    left 0
    right 0
    overflow hidden
    .item
        display flex
        line-height 50px
        border-bottom 1px solid rgb(240, 240, 240)
        .icon
            flex 0 1 44px
            font-size 30px
            text-align center
            padding 0 10px
            color red
        .bar
            display flex
            flex 1
            padding-right 10px
            .text
                flex 1
                font-size 15px
            .right
                font-size 12px
</style>

