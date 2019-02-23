<template>
    <div class="suggest">
        <ul class="tab">
            <router-link
                tag="li"
                :to="`/search/${routers[index]}`"
                v-for="(item,index) of tab"
                class="item"
                :key="index"
            >{{item}}</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    created() {
        this.tab = ["单曲", "歌手", "歌单", "Mv"];
        this.types = [1, 100, 1000, 1004];
        this.routers = ["song", "singer", "disc", "mv"];
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.suggest
    height 100%
    overflow hidden
    .tab
        position relative
        z-index 1
        background-color #fff
        display flex
        height 30px
        line-height 30px
        font-size 16px
        border-bottom 1px solid rgb(240, 240, 240)
        .item
            flex 1
            text-align center
            &.router-link-active
                color red
    .scroll-wrapper
        position fixed
        top 131px
        bottom 44px
        left 0
        right 0
        .suggest-list
            height 100%
            .suggest-item
                display flex
                align-items center
                padding 5px 10px
                border-bottom 1px solid rgb(240, 240, 240)
                .name
                    flex 1
                    font-size $font-size-medium
                    color black
                    overflow hidden
                    .text
                        font-size 15px
                        no-wrap()
                    .center
                        color #999
                        padding 5px 0
                        font-size 12px
                        no-wrap()
                        width 60%
                    .bottom
                        color #999999
                .mv
                    font-size 25px
    .no-result-wrapper
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>