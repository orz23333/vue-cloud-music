<template>
    <transition name="slide">
        <div class="like">
            <c-header icon="icon-2fanhui" :back="back" title="收藏歌单"></c-header>
            <list-bar :list="list" @selectItem="selectDisc"></list-bar>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
import ListBar from "base/list-bar/list-bar";
import CHeader from "components/header/header";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    computed: {
        list() {
            let arr = [];
            this.favoriteDisc.forEach(disc => {
                let obj = {};
                obj.image = disc.discPic;
                obj.name = disc.discName;
                obj.desc = "by " + disc.creatorName;
                obj.id = disc.id;
                arr.push(obj);
            });
            return arr;
        },
        ...mapGetters(["favoriteDisc"])
    },
    methods: {
        back() {
            this.$router.back();
        },
        selectDisc(id) {
            this.setDisc(id);
            this.$router.push({ path: `/mymusic/favoriteDisc/${id}` });
        },
        ...mapMutations({
            setDisc: "SET_DISC"
        })
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

