<template>
    <div class="suggest">
        <scroll
            :data="result"
            class="scroll-wrapper"
            ref="suggest"
            :pullup="pullup"
            :beforeScroll="beforeScroll"
            @scrollToEnd="_searchMoreSong"
        >
            <div>
                <ul class="suggest-list" v-if="result.length">
                    <li
                        class="suggest-item"
                        v-for="(item,index) in result"
                        @click="select(item)"
                        :class="disable(item)"
                        :key="index + item.name + item.id"
                    >
                        <div class="name">
                            <p class="text">{{item.name}}</p>
                            <p class="center">{{item.singer}}-{{item.album}}</p>
                            <p class="bottom">{{item.desc}}</p>
                        </div>
                        <div class="mv" @click.stop="selectMv(item)">
                            <i class="icon-bofang1" v-if="item.mvId"></i>
                        </div>
                    </li>
                    <loading v-show="hasMore" title></loading>
                </ul>
                <div v-show="!hasMore && !result.length" class="no-result-wrapper">抱歉，暂无搜索结果</div>
            </div>
        </scroll>
    </div>
</template>
 
<script>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import NoResult from "base/no-result/no-result";
import { search } from "api/search";
import { RES_OK } from "api/config";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getUrl } from "api/song";

export default {
    props: {
        query: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            type: 1,
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
        this.result = [];
        this.hasMore = true;
        }
        this.getSearch(this.query);
    },
    methods: {
        select(item) {
            if (!item.url) {
                return;
            }
            this.insertSong(item);
        },
        selectMv(item) {
            this.playMv(item.mvId);
        },
        getSearch(query) {
            this._searchSong(query);
        },
        _searchSong(query) {
            this.page = 0;
            this.hasMore = true;
            this.result = [];
            this.lastQuery = query;
            this.$refs.suggest ? this.$refs.suggest.scrollTo(0, 0) : "";
            search(query, this.type, this.page).then(res => {
                if (res.code === RES_OK) {
                    if (typeof res.result.songs === "undefined") {
                        this.result = [];
                        this.hasMore = false;
                        return;
                    }
                    this.result = this._normalizeSong(res.result.songs);
                    this.hasMore = this._checkMore(res.result.songCount);
                    this._getUrl(this.result);
                }
            });
        },
        _searchMoreSong() {
            if (!this.hasMore) {
                return;
            }
            this.page++;
            search(this.query, this.type, this.page).then(res => {
                if (res.code === RES_OK) {
                    if (typeof res.result.songs === "undefined") {
                        this.hasMore = false;
                        console.log(typeof res.result.songs);

                        return;
                    }
                    this.result = this.result.concat(
                        this._normalizeSong(res.result.songs)
                    );
                    this.hasMore = this._checkMore(res.result.songCount);
                    this._getUrl(this.result);
                }
            });
        },
        _checkMore(count) {
            return this.result.length < count;
        },
        _normalizeSong(list) {
            let ret = [];
            list.forEach(musicData => {
                ret.push(this.createSong(musicData));
            });
            return ret;
        },
        createSong(song) {
            let s = {};
            s.type = "song";
            s.id = song.id;
            s.name = song.name;
            s.desc = this.filterDesc(song.alias);
            s.singer = this.filterSinger(song.artists);
            s.album = song.album.name;
            s.mvId = song.mvid;
            s.duration = song.duration;
            return s;
        },
        filterSinger(singer) {
            let ret = [];
            let str = "";
            if (singer.length) {
                singer.forEach(man => {
                    ret.push(man.name);
                });
                str = ret.join("/");
            }
            return str;
        },
        filterDesc(desc) {
            let str = "";
            if (desc.length) {
                str = desc.join("/");
            }
            return str;
        },
        _getUrl(list) {
            const ids = [];
            list.forEach(song => {
                ids.push(song.id);
            });
            const id = ids.join(",");
            getUrl(id).then(res => {
                if (res.code === RES_OK) {
                    let data = res.data;
                    let copy = JSON.parse(JSON.stringify(this.result));
                    copy.forEach(song => {
                        data.forEach(v => {
                            if (v.id === song.id) {
                                song.url = v.url;
                            }
                        });
                    });
                    this.result = copy;
                }
            });
        },
        disable(song) {
            return song.url ? "" : "disable";
        },
        ...mapActions(["insertSong", "playMv"])
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