<template>
    <transition name="slide">
        <div class="like">
            <c-header icon="icon-2fanhui" :back="back" title="收藏MV"></c-header>
            <scroll class="scroll-wrapper" :data="favoriteMv">
                <list-bar :list="list" icon="icon-MV" @selectItem="selectMv"></list-bar>
            </scroll>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
import ListBar from "base/list-bar/list-bar";
import CHeader from "components/header/header";
import Scroll from "base/scroll/scroll";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { formatDuration } from "common/js/date";
export default {
    computed: {
        list() {
            let arr = [];
            this.favoriteMv.forEach(mv => {
                let obj = {};
                obj.image = mv.cover;
                obj.name = mv.name;
                obj.desc = `${this._formalTime(mv.duration)},${mv.artistName}`;
                obj.id = mv.id;
                arr.push(obj);
            });
            return arr;
        },
        ...mapGetters(["favoriteMv"])
    },
    methods: {
        back() {
            this.$router.back();
        },
        selectMv(id) {
            this.playMv(id);
        },
        _formalTime(t) {
           return formatDuration(t)
        },
        ...mapActions(["playMv"])
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

</style>

