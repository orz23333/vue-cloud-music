<template>
    <div class="recommend">
        <h1 class="title">
            <i class="border"></i>
            {{ title }}
        </h1>
        <ul class="disc-wrapper">
            <li :class="Cls" v-for="item of items" @click="selectItem(item)">
                <div href class="item-link">
                    <div class="item-content">
                        <img v-lazy="item.picUrl" class="item-img">
                    </div>
                    <span class="count">
                        <i class="icon-yinyue"></i>
                        {{ _normalizeCount(item.playCount) }}
                    </span>
                    <p class="text">{{ item.name }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: "推荐"
        },
        rType: {
            type: String,
            default: "music"
        }
    },
    methods: {
        _normalizeCount(count) {
            count = +count % 10000;
            count = count.toFixed(1);
            return count + "万";
        },
        selectItem(item) {
            this.$emit("selectItem", item);
        }
    },
    computed: {
        Cls() {
            let ret = "";
            if (this.rType === "mv") {
                ret = "item-mv";
            } else {
                ret = "item-music";
            }
            return ret;
        }
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.recommend
    margin 10px 0 20px 0
    .title
        font-size 20px
        word-spacing 2px
        line-height 40px
        .border
            padding-right 5px
            height 10px
            border-left 2px solid red
        .icon-you
            display inline-block
            padding 2px
            font-size 16px
    .disc-wrapper
        display flex
        flex-wrap wrap
        box-sizing border-box
        align-items center
        .item-mv
            flex 1 1 48%
            box-sizing border-box
            padding 0 10px 10px 0
            position relative
            min-width 0
            .item-link
                width 100%
                height 100%
                .item-content
                    position relative
                    width 100%
                    height 0
                    padding-top 57.4%
                    overflow hidden
                    .item-img
                        position absolute
                        height 100%
                        width 100%
                        border 3px solid pink
                        top 0
                        left 0
                .count
                    position absolute
                    right 13px
                    top 5px
                    color #fff
                    font-size 13px
                .text
                    font-size 14px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
        .item-music
            flex 1 1 30%
            box-sizing border-box
            padding 0 10px 10px 0
            position relative
            min-width 0
            .item-link
                width 100%
                height 100%
                .item-content
                    .item-img
                        width 100%
                        border 3px solid pink
                .count
                    position absolute
                    right 13px
                    top 5px
                    color #fff
                    font-size 13px
                .text
                    font-size 14px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
</style>
