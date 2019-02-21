<template>
    <div class="bar-container">
        <div class="flex">
            <router-link class="bar-item" tag="div" to="/findmusic/music">
                <div class="icon-wangyiyunyinlezizhi-copy"></div>
                <div class="text">发现音乐</div>
            </router-link>
            <router-link class="bar-item" tag="div" to="/mymusic">
                <div class="icon-yinyue-copy"></div>
                <div class="text">我的音乐</div>
            </router-link>
            <router-link class="bar-item" tag="div" to="/search">
                <div class="icon-search2"></div>
                <div class="text">搜索</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.bar-container
    position absolute
    bottom 0
    left 0
    height 44px
    width 100%
    line-height 44px
    border-top 1px solid rgb(230, 230, 230)
    .flex
        display flex
        .bar-item
            flex 1
            text-align center
            font-size 30px
            .text
                font-size 10px
                line-height 12px
            &.router-link-active
                color red
</style>
