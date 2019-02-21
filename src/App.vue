<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <mv></mv>
        <player></player>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
import BottomBar from "components/bottom-bar/bottom-bar";
import Findmusic from "pages/findmusic/findmusic";
import Mv from "pages/mv/mv";
import Player from "components/player/player";

export default {
    components: {
        BottomBar,
        Mv,
        Player
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
