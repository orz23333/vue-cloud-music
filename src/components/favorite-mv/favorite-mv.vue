<template>
    <transition name="slide">
        <div class="like">
            <c-header icon="icon-2fanhui" :back="back" title="收藏MV"></c-header>
            <list-bar :list="list" icon="icon-MV" @selectItem="selectMv"></list-bar>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
import ListBar from "base/list-bar/list-bar";
import CHeader from "components/header/header";
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";
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
        ...mapActions(["playMv"])
    },
    components: {
        ListBar,
        CHeader
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
</style>

