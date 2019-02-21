<template>
    <div class="item" v-for="(item, index) in list">
        <div class="rank">
            <img src alt>
        </div>
        <div class="content">
            <h2 class="name"></h2>
            <p class="desc"></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="stylus" scoped>
.item
    display flex
    align-items center
    box-sizing border-box
    height 64px
    font-size 14px
    .rank
        flex 0 0 25px
        width 25px
        margin 13px
        text-align center
        color #999
        font-size 18px
        .icon-icon-test
            font-size 25px
            color red
    .content
        flex 1
        line-height 20px
        overflow hidden
        padding-bottom 5px
        border-bottom 1px solid rgb(240, 240, 240)
        .name
            no-wrap()
            color $color-text
            &.current
                color red
            span
                color #999
        .desc
            no-wrap()
            margin-top 4px
            color #999
            width 70%
    .mv
        font-size 20px
        padding 14.5px 0
        padding-right 40px
        border-bottom 1px solid rgb(240, 240, 240)
</style>

