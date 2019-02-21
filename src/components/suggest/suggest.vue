<template>
    <scroll
        ref="suggest"
        class="suggest"
        :data="result"
        :pullup="pullup"
        :beforeScroll="beforeScroll"
    >
        <ul class="tab">
            <li :class="{'item': true, 'active': activeIndex === 0}" class="item">单曲</li>
            <li :class="{'item': true, 'active': activeIndex === 1}">歌手</li>
            <li :class="{'item': true, 'active': activeIndex === 2}">歌单</li>
            <li :class="{'item': true, 'active': activeIndex === 3}">Mv</li>
        </ul>
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i></i>
                </div>
                <div class="name">
                    <p class="text"></p>
                </div>
            </li>
            <loading v-show="hasMore" title></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import NoResult from "base/no-result/no-result";
import { search } from "api/search";
import { RES_OK } from "api/config";
import { createSong } from "common/js/song";
import Singer from "common/js/singer";

const TYPE_SINGER = "singer";
const perpage = 20;

export default {
    props: {
        showSinger: {
            type: Boolean,
            default: true
        },
        query: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            page: 0,
            type: 1,
            pullup: true,
            beforeScroll: true,
            hasMore: true,
            result: [],
            activeIndex: 0
        };
    },
    methods: {
      search() {
        this.page = 0
        this.type = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.type, this.page).then(res => {
          if (res.code === RES_OK) {
            this.result = this._normalizeSong(res.result.songs)
          }
        }) 
      },
      _normalizeSong(list) {
        let ret = []
        list.forEach(musicData => {
          ret.push(createSong(musicData))
        });
        return ret
      }
    },
    watch: {
      query(newQ) {
        this.search(newQ);
      }
    },
    components: {
        Scroll,
        Loading,
        NoResult
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
        display flex
        height 30px
        line-height 30px
        font-size 16px
        .item
            flex 1
            text-align center
        .active
            color red
    .suggest-list
        padding 0 30px
        .suggest-item
            display flex
            align-items center
            padding-bottom 20px
        .icon
            flex 0 0 30px
            width 30px
            [class^='icon-']
                font-size 14px
                color $color-text-d
        .name
            flex 1
            font-size $font-size-medium
            color $color-text-d
            overflow hidden
            .text
                no-wrap()
    .no-result-wrapper
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>