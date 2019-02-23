<template>
    <div class="suggest">
        <scroll
            :data="result"
            class="scroll-wrapper"
            ref="suggest"
            :pullup="pullup"
            :beforeScroll="beforeScroll"
            @scrollToEnd="_searchMoreSinger"
        >
            <div>
                <div class="item" v-for="item of result">
                    <img v-lazy="item.image" alt>
                    <p class="text">
                        {{item.name}}
                        <span v-if="item.desc" class="desc">({{item.desc}})</span>
                    </p>
                </div>
                <loading v-show="hasMore" title></loading>
                <div v-show="!hasMore && !result.length" class="no-result-wrapper">抱歉，暂无搜索结果</div>
            </div>
        </scroll>
    </div>
</template>
 
<script>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import { search } from "api/search";
import { RES_OK } from "api/config";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    props: {
        query: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            type: 100,
            page: 0,
            pullup: true,
            beforeScroll: true,
            hasMore: true,
            result: []
        };
    },
    activated() {
        if (!this.query || this.query === this.lastQuery) {
            return;
        }
        this.getSearch(this.query);
    },
    methods: {
        selectDisc(id) {
            this.changeDisc(id);
        },
        getSearch(query) {
            this._searchSinger(query);
        },
        _searchSinger(query) {
            this.page = 0;
            this.hasMore = true;
            this.lastQuery = query;
            this.$refs.suggest ? this.$refs.suggest.scrollTo(0, 0) : "";
            search(query, this.type, this.page).then(res => {
                if (res.code === RES_OK) {
                    if (typeof res.result.artists === "undefined") {
                        this.hasMore = false;
                        return;
                    }
                    this.result = this._normalizeSinger(res.result.artists);
                    this.hasMore = this._checkMore(res.result.artistCount);
                }
            });
        },
        _searchMoreSinger() {
            if (!this.hasMore) {
                return;
            }
            this.page++;
            search(this.query, this.type, this.page).then(res => {
                if (res.code === RES_OK) {
                    if (typeof res.result.artists === "undefined") {
                        this.hasMore = false;
                        return;
                    }
                    this.result = this.result.concat(
                        this._normalizeSinger(res.result.artists)
                    );
                    this.hasMore = this._checkMore(res.result.artistCount);
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
        _normalizeSinger(list) {
            let ret = [];
            list.forEach(singer => {
                let obj = {};
                obj.id = singer.id;
                obj.image = singer.picUrl;
                obj.name = singer.name;
                obj.desc = `${this.filterDesc(singer.alias)}`;
                ret.push(obj);
            });
            return ret;
        },
        ...mapActions(["changeDisc"])
    },
    components: {
        Scroll,
        Loading
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
        .item
            display flex
            align-items center
            padding 10px 10px 0
            img
                height 64px
                width 64px
            .text
                flex 1
                padding-left 10px
                .desc
                    color #999
        .no-result-wrapper
            padding-top 100px
            width 100%
            text-align center
            font-size 30px
            color #999
</style>