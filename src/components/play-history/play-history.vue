<template>
    <transition name="slide">
        <div class="like">
            <c-header icon="icon-2fanhui" :back="back" title="最近播放"></c-header>
            <scroll class="scroll-wrapper" :data="list">
                <div>
                    <div class="item" @click="toSongHistory">
                        <div class="rank">
                            <i class="icon-lishi"></i>
                        </div>
                        <h2 class="name">最近播放的歌曲</h2>
                        <p class="desc">{{this.songHistory.length}}</p>
                    </div>
                    <h2 class="title">最近播放的歌单</h2>
                    <list-bar :list="list" @selectItem="selectDisc"></list-bar>
                </div>
            </scroll>
        </div>
    </transition>
</template>

<script>
import ListBar from "base/list-bar/list-bar";
import CHeader from "components/header/header";
import Scroll from "base/scroll/scroll";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    computed: {
        list() {
            let arr = [];
            this.discHistory.forEach(disc => {
                let obj = {};
                obj.image = disc.discPic;
                obj.name = disc.discName;
                obj.desc = "by " + disc.creatorName;
                obj.id = disc.id;
                arr.push(obj);
            });
            return arr;
        },
        ...mapGetters(["discHistory", "songHistory"])
    },
    methods: {
        back() {
            this.$router.back();
        },
        toSongHistory() {
            this.$router.push({ path: "/mymusic/playHistory/songHistory" });
        },
        selectDisc(id) {
            this.changeDisc(id);
        },
        ...mapMutations({
            setDisc: "SET_DISC"
        }),
        ...mapActions(["changeDisc"])
    },
    components: {
        ListBar,
        CHeader,
        Scroll
    }
};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
.like
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 1
    background-color #fff
    .scroll-wrapper
        position absolute
        top 44px
        bottom 0
        left 0
        right 0
        .item
            display flex
            height 60px
            align-items center
            .rank
                flex 0 1
                padding 2px
                font-size 50px
                display flex
                align-items center
                background-color rgba(0, 0, 0, 0.7)
                background-clip content-box
                color #ffffff
            .name
                flex 1
                font-weight 400
                font-size 15px
                padding-left 10px
            .desc
                padding-right 13px
        .title
            height 20px
            line-height 20px
            padding-left 10px
            font-size 13px
            color rgb(100, 100, 100)
            background-color rgb(245, 245, 245)
</style>
