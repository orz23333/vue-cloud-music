<template>
    <div class="suggest">
        <scroll
            :data="result"
            class="scroll-wrapper"
            ref="suggest"
            :pullup="pullup"
            :beforeScroll="beforeScroll"
            @scrollToEnd="searchMore"
        >
            <div>
                <ul class="suggest-list" v-if="type === types[0]">
                    <li
                        class="suggest-item"
                        v-for="item in result"
                        @click="select(item)"
                        :key="item.id"
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
                <ul class="suggest-list" v-if="type === types[2]">
                    <li
                        class="suggest-item"
                        v-for="item in result"
                        @click="select(item)"
                        :key="item.id"
                    >
                        <list-bar :list="result"></list-bar>
                    </li>
                    <loading v-show="hasMore" title></loading>
                </ul>
                <div v-show="!hasMore && !result.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无搜索结果"></no-result>
                </div>
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
import Singer from "common/js/singer";
import ListBar from "base/list-bar/list-bar";

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
            activeIndex: 0,
            search: this._searchSong.bind(this),
            searchMore: this._searchMoreSong.bind(this)
        };
    },
    created() {
        this.tab = ["单曲", "歌手", "歌单", "Mv"];
        this.types = [1, 100, 1000, 1004];
    },
    methods: {
        select(item) {
            this.$emit("select", { type: item.type, item });
        },
        selectMv(mv) {
            this.$emit("select", { type: "mv", item: mv });
        },
        _searchSong() {
            this.page = 0;
            this.type = 1;
            this.hasMore = true;
            this.$refs.suggest.scrollTo(0, 0);
            search(this.query, this.type, this.page).then(res => {
                if (res.code === RES_OK) {
                    this.result = this._normalizeSong(res.result.songs);
                    this.hasMore = this._checkMore(res.result.songCount);
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
                    this.result = this.result.concat(
                        this._normalizeSong(res.result.songs)
                    );
                    this.hasMore = this._checkMore(res.result.songCount);
                }
            });
        },
        _searchDisc() {
            this.page = 0;
            this.type = 1000;
            this.hasMore = true;
            this.$refs.suggest.scrollTo(0, 0);
            search(this.query, this.type, this.page).then(res => {
                if (res.code === RES_OK) {
                    this.result = this._normalizeDisc(res.result.playLists);
                    this.hasMore =
                        this.result.length < res.result.playlistCount
                            ? true
                            : false;
                }
            });
        },
        changeMode(index) {
            this.activeIndex = index;
            this.type = this.types[index];
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
        _normalizeDisc(list) {
            let ret = [];
            list.forEach(disc => {
                let obj = {};
                obj.id = disc.id;
                obj.image = disc.coverImgUrl;
                obj.name = disc.name;
                obj.desc = `${disc.trackCount}首音乐 播放${this._filterCount(
                    disc.playCount
                )}次 by ${disc.creator.nickname}`;
            });
            return ret;
        },
        _filterCount(count) {
            let fCount = count / 10000;
            return this.fCount > 10 ? fCount.toFixed(1) + "万" : fCount;
        }
    },
    watch: {
        query(newQ) {
            if (!newQ) {
                return;
            }
            this.search(newQ);
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult,
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