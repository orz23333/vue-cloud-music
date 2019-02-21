<template>
    <div>
        <c-header icon='icon-fangdajing'></c-header>
        <div class="search-input-wrapper">
            <div class="search-input">
                <i class="icon-fangdajing"></i>
                <input v-model="query" type="text" class="input" placeholder="搜索歌曲，歌手，mv">
                <i class="icon-iconfontcha" v-show="query" @click="clearQuery"></i>
            </div>
        </div>
        <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
            <scroll class="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li v-for="item of hotKey" class="item">
                                <span>
                                    {{ item.first }}
                                    <sup v-if="item.iconType" class="sup">hot</sup>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear">
                                <i class="icon-lajitong"></i>
                            </span>
                        </h1>
                        <div class="search-list" v-show="searches.length">
                            <transition-group name="list" tag="ul">
                                <li :key="item" class="search-item" v-for="item in searches">
                                    <span class="text">{{item}}</span>
                                    <span class="icon" @click.stop="deleteOne(item)">
                                        <i class="icon-delete"></i>
                                    </span>
                                </li>
                            </transition-group>
                        </div>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest  ref="suggest" :query="query"></suggest>
        </div>
    </div>
</template>

<script>
import CHeader from "components/header/header";
import Scroll from "base/scroll/scroll";
import Suggest from 'components/suggest/suggest'
import { getHotKey } from "api/search";
import { RES_OK } from "api/config";
export default {
    data() {
        return {
            query: "",
            hotKey: [],
            searches: []
        };
    },
    methods: {
        clearQuery() {
            this.query = "";
        },
        _getHotKey() {
            getHotKey().then(res => {
                if (res.code === RES_OK) {
                    this.hotKey = res.result.hots;
                }
            });
        }
    },
    created() {
        this._getHotKey();
    },
    components: {
        CHeader,
        Scroll,
        Suggest
    }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.search-input-wrapper
    margin 10px
    .search-input
        display flex
        align-items center
        box-sizing border-box
        width 100%
        padding 0 6px
        height 35px
        background-color rgb(230, 230, 230)
        border-radius 20px
        .icon-fangdajing
            font-size 24px
            color $color-background
        .input
            flex 1
            margin 0 5px
            line-height 25px
            background rgb(230, 230, 230)
            color rgb(50, 50, 50)
            font-size $font-size-medium
            outline none
            &::placeholder
                color rgb(100, 100, 100)
        .icon-iconfontcha
            font-size 16px
            color $color-background
.shortcut-wrapper
    margin-top 20px
    width 100%
    .shortcut
        height 100%
        overflow hidden
        .hot-key
            margin 0 20px 20px 20px
            .title
                margin-bottom 20px
                font-size 14px
                color black
            .item
                display inline-block
                padding 5px 10px
                margin 0 20px 10px 0
                border-radius 6px
                background #ffffff
                font-size $font-size-medium
                color black
                border 1px solid black
                border-radius 10px
                .sup
                    font-size 12px
                    color red
        .search-history
            position relative
            margin 0 20px
            .title
                display flex
                align-items center
                height 40px
                font-size $font-size-medium
                color $color-text-l
                .text
                    flex 1
                .clear
                    extend-click()
                    .icon-clear
                        font-size $font-size-medium
                        color $color-text-d
            .search-list
                .search-item
                    display flex
                    align-items center
                    height 40px
                    overflow hidden
                    &.list-enter-active, &.list-leave-active
                        transition all 0.1s
                    &.list-enter, &.list-leave-to
                        height 0
                    .text
                        flex 1
                        color $color-text-l
                    .icon
                        extend-click()
                        .icon-delete
                            font-size $font-size-small
                            color $color-text-d
</style>

