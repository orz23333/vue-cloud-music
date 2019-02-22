<template>
    <div>
        <div class="item" v-for="(item, index) in list" @click="selectItem(item.id)">
            <div class="rank">
                <img v-lazy="item.image" alt>
            </div>
            <div class="content">
                <h2 class="name">
                    <i :class="icon"></i>
                    {{item.name}}
                </h2>
                <p class="desc">{{item.desc}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        },
        icon: {
            type: String,
            default: ""
        }
    },
    methods: {
        selectItem(id) {
            this.$emit("selectItem", id);
        }
    }
};
</script>

<style lang="stylus" scoped>
.item
    display flex
    align-items center
    height 64px
    padding 10px 10px 0
    font-size 14px
    &:last-child
      padding 10px
    .rank
        flex 0
        text-align center
        color #999
        font-size 18px
        img
            height 64px
    .content
        flex 3
        line-height 20px
        overflow hidden
        align-self stretch
        padding-bottom 5px
        padding-left 10px
        border-bottom 1px solid rgb(240, 240, 240)
        .name
            no-wrap()
            color $color-text
            &.current
                color red
            span
                color #999
            i
                font-size 20px
        .desc
            no-wrap()
            margin-top 4px
            color #999
            width 70%
            font-size 12px
    .mv
        font-size 20px
        padding 14.5px 0
        padding-right 40px
        border-bottom 1px solid rgb(240, 240, 240)
</style>

