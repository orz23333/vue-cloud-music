<template>
    <div class="header">
        <div class="icon" @click="back">
            <i :class="icon"></i>
        </div>
        <div class="title">{{title}}</div>
        <div class="player" @click="setFullScreen(true)" :class="playIcon">
            <i class="icon-yinyue"></i>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
    props: {
        title: {
            type: String,
            default: "网易云音乐"
        },
        back: {
            type: Function,
            default: function() {}
        },
        icon: {
            type: String,
            default: "icon-huatong"
        }
    },
    computed: {
        playIcon() {
            return this.playing ? "play" : "pause";
        },
        ...mapGetters(["playing"])
    },
    methods: {
        ...mapMutations({
            setFullScreen: "SET_FULL_SCREEN"
        })
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.header
    position relative
    height 44px
    text-align center
    border-bottom 1px solid rgb(230, 230, 230)
    background-color #fff
    z-index 1
    .icon
        position absolute
        top 0
        left 5px
        i
            display block
            padding 10px
            font-size 24px
            color black
    .title
        display inline-block
        vertical-align top
        line-height 44px
        width 70%
    .player
        position absolute
        top 10px
        right 10px
        &.play
            animation rotate 20s linear infinite
        &.pause
            animation-play-state paused
        .icon-yinyue
            display block
            font-size 24px
            color black
@keyframes rotate
    0%
        transform rotate(0)
    100%
        transform rotate(360deg)
</style>