<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
                <div class="rank">
                    <span class="text">{{ index + 1}}</span>
                </div>
                <div class="content">
                    <h2 class="name">
                        {{song.name}}
                        <span v-if="song.alia">({{song.alia}})</span>
                    </h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
                <div class="mv" v-if="song.mvId" @click.stop="selectMv(song.mvId)">
                    <i class="icon-bofang1"></i>
                </div>
            </li>
        </ul>
        <loading v-if="!songs.length"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
import Loading from "base/loading/loading";
export default {
    props: {
        songs: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        selectItem(item, index) {
            this.$emit("select", item, index);
        },
        selectMv(id) {
            this.$emit("selectMv", id);
        },
        getDesc(song) {
            return `${song.singer} - ${song.album}`;
        },
        getRankCls(index) {
            if (index <= 2) {
                return `icon icon${index}`;
            } else {
                return "text";
            }
        },
        getRankText(index) {
            if (index > 2) {
                return index + 1;
            }
        }
    },
    components: {
        Loading
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.song-list
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
        .content
            flex 1
            line-height 20px
            overflow hidden
            padding-bottom 5px
            border-bottom 1px solid rgb(240, 240, 240)
            .name
                no-wrap()
                color $color-text
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