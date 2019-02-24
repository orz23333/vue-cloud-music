<template>
    <div class="suggest">
        <scroll
            :data="result"
            class="scroll-wrapper"
            ref="suggest"
            :pullup="pullup"
            :beforeScroll="beforeScroll"
            @scrollToEnd="_searchMoreMv"
        >
            <div>
                <list-bar :list="result" @selectItem="selectMv" icon="icon-MV"></list-bar>
                <loading v-show="hasMore" title></loading>
                <div v-show="!hasMore && !result.length" class="no-result-wrapper">抱歉，暂无搜索结果</div>
            </div>
        </scroll>
    </div>
</template>
 
<script>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import ListBar from "base/list-bar/list-bar";
import { search } from "api/search";
import { RES_OK } from "api/config";
import { mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";

export default {
    props: {
        query: {
            type: String,
            default: ""
        }
    },  
    data() {
        return {
            type: 1004,
            page: 0,
            pullup: true,
            beforeScroll: true,
            hasMore: true,
            result: [],
            lastQuery: ""
        };
    },
    activated() {
        if (!this.query || this.query === this.lastQuery) {
            return;
        }
        this.result = [];
        this.hasMore = true;        
        this.getSearch(this.query);
    },
    methods: {
        selectMv(id) {
            this.playMv(id);
        },
        getSearch(query) {
          this._searchMv(query)
        },
        _searchMv(query) {
            this.page = 0;
            this.hasMore = true;
            this.lastQuery = query 
            this.$refs.suggest ? this.$refs.suggest.scrollTo(0, 0) : "";
            search(query, this.type, this.page).then(res => {
                if (res.code === RES_OK) {
                    if (typeof res.result.mvs === 'undefined') {
                        this.hasMore = false;
                        return;
                    }
                    this.result = this._normalizeMv(res.result.mvs);
                    this.hasMore = this._checkMore(res.result.mvCount);
                }
            });
        },
        _searchMoreMv() {
            if (!this.hasMore) {
                return;
            }
            this.page++;
            search(this.query, this.type, this.page).then(res => {
                if (res.code === RES_OK) {
                    if (typeof res.result.mvs === 'undefined') {
                        this.hasMore = false;
                        return;
                    }
                    this.result = this.result.concat(
                        this._normalizeMv(res.result.mvs)
                    );
                    this.hasMore = this._checkMore(res.result.mvCount);
                }
            });
        },
        _checkMore(count) {
            return this.result.length < count;
        },
        filterDesc(desc) {
            let str = "";
            if (desc.length) {
                str = desc.join("/");
            }
            return str;
        },
        _normalizeMv(list) {
            let ret = [];
            list.forEach(mv => {
                let obj = {};
                obj.id = mv.id;
                obj.image = mv.cover;
                obj.name = mv.name;
                obj.desc = `${this._formalTime(mv.duration)}, by ${
                    mv.artists.name
                }`;
                obj.count = this._filterCount(mv.playCount);
                ret.push(obj);
            });
            return ret;
        },
        _filterCount(count) {
            let ret = "";
            let fCount = count / 10000;
            if (fCount >= 1) {
                ret = `播放${fCount.toFixed(1)}万次`;
            } else {
                ret = `播放${count}次`;
            }
            return ret;
        },
        _formalTime(t) {
            let time = moment(t)
                .utcOffset(0)
                .format("h:mm:ss");
            let arr = time.split(":");
            if (arr[0] === "12") {
                arr.shift();
            }
            time = arr.join(":");
            return time;
        },
        ...mapActions(["playMv"])
    },
    components: {
        Scroll,
        Loading,
        ListBar
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
        .active
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
                &.disable
                    opacity 0.5
                &.disable:after
                    content '不可播放'
                    display block
                    padding-right 9px
                    font-size 12px
                    opacity 0.5
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
        padding-top 100px
        width 100%
        text-align center
        font-size 30px
        color #999
</style>