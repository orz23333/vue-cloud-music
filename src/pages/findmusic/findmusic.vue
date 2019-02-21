<template>
    <div>
        <c-header></c-header>
        <tab></tab>

        <transition :name="name" v-on:before-enter="beforeEnter" >
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import CHeader from "components/header/header";
import Tab from "components/tab/tab";
import Slider from "base/slider/slider";

export default {
    data() {
        return {
            name: "slideL"
        };
    },
    methods: {
        beforeEnter(el) {
            if (el.className === "findmusic") {
                this.name = "slideL";
            } else {
                this.name = "slideR";
            }
        }
    },
    components: {
        CHeader,
        Tab,
        Slider
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slideL-enter-active, .slideL-leave-active
    transition all 0.3s
.slideL-enter
    transform translate3d(100%, 0, 0)
.slideL-leave-to
    transform translate3d(-100%, 0, 0)
.slideR-enter-active, .slideR-leave-active
    transition all 0.3s
.slideR-enter
    transform translate3d(-100%, 0, 0)
.slideR-leave-to
    transform translate3d(100%, 0, 0)
</style>
