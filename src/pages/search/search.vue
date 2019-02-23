<template>
    <div>
        <c-header icon="icon-fangdajing" title="搜索"></c-header>
        <div class="search-input-wrapper">
            <div class="search-input" @click="focus">
                <i class="icon-fangdajing"></i>
                <input
                    :value="query"
                    @input="changeQuery"
                    type="text"
                    class="input"
                    placeholder="搜索歌曲，歌手，mv"
                    ref="input"
                >
                <i class="icon-iconfontcha" v-show="query" @click="clearQuery"></i>
            </div>
        </div>
        <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
            <scroll class="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li v-for="item of hotKey" class="item" @click="selectHot(item.first)">
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
        </div>
    </div>
</template>

<script>
import CHeader from "components/header/header";
import Scroll from "base/scroll/scroll";
import { getHotKey } from "api/search";
import { RES_OK } from "api/config";
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            input: "",
            hotKey: [],
            searches: [],
            tab: ["单曲", "歌手", "歌单", "Mv"],
            types: [1, 100, 1000, 1004],
            routers: ["song", "singer", "disc", "mv"]
        };
    },
    computed: {
        ...mapGetters(["query"])
    },
    methods: {
        changeQuery(e) {
            this.setQuery(e.target.value);
            console.log(2);
            
        },
        clearQuery() {
            this.setQuery("");
            this.$router.push({ path: "/search" });
        },
        selectHot(query) {
            this.setQuery(query);
            this.$router.push({ path: "/search/song" });
        },
        _getHotKey() {
            getHotKey().then(res => {
                if (res.code === RES_OK) {
                    this.hotKey = res.result.hots;
                }
            });
        },
        focus() {
            this.$refs.input.focus();
        },
        ...mapMutations({
            setQuery: "SET_QUERY"
        })
    },
    created() {
        this._getHotKey();
    },
    watch: {
        // input(newinput) {
        //     this.setQuery(newinput);
        //     if (newinput === "") {
        //         this.$router.push({ path: "/search" });
        //     }
        // },
        // query(newq) {
        //     this.input = newq;
        // }
    },
    components: {
        CHeader,
        Scroll
    }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.search-input-wrapper
    position relative
    z-index 2
    background-color #fff
    padding 10px
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
.search-result
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

