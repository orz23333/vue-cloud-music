<template>
    <transition name="slide">
        <div class="like">
            <c-header title="最近播放的歌曲" icon="icon-2fanhui" :back="back"></c-header>
            <scroll class="scroll-wrapper" :data="songs">
                <div>
                    <div class="control" @click="playAll">
                        <i class="icon-bofang"></i>
                        <span>播放全部(共首)</span>
                    </div>
                    <song-list :songs="songs" @selectMv="setPlayMv" @select="setPlayList"></song-list>
                </div>
            </scroll>
        </div>
    </transition>
</template>

<script>
import ListBar from "base/list-bar/list-bar";
import CHeader from "components/header/header";
import Scroll from "base/scroll/scroll";
import SongList from "base/song-list/song-list";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { playMode } from "common/js/config";
import { getUrl } from "api/song";
import { RES_OK } from "api/config";

export default {
    data() {
        return {
            songs: []
        };
    },
    computed: {
        ...mapGetters(["mode", "songHistory"])
    },
    created() {
        this._getUrl();
    },
    methods: {
        back() {
            this.$router.back();
        },
        setPlayMv(id) {
            this.playMv(id);
        },
        setPlayList(item, index) {
            this.selectPlay({ list: this.songs, index });
        },
        playAll() {
            let index;
            if (this.mode === playMode.random) {
                index = Math.floor(
                    Math.random() * (this.songs.length + 1)
                );
            } else {
                index = 0;
            }
            this.selectPlay({ list: this.songs, index });
        },
        _getUrl() {
            const ids = [];
            this.songHistory.forEach(song => {
                ids.push(song.id);
            });
            const id = ids.join(",");
            getUrl(id).then(res => {
                if (res.code === RES_OK) {
                    let data = res.data;
                    let copySongHistory = JSON.parse(
                        JSON.stringify(this.songHistory)
                    ); //复制
                    copySongHistory.forEach(song => {
                        data.forEach(v => {
                            if (v.id === song.id) {
                                song.url = v.url;
                            }
                        });
                    });
                    this.songs = copySongHistory;
                }
            });
        },
        ...mapActions(["selectPlay", "playMv"])
    },
    components: {
        ListBar,
        CHeader,
        Scroll,
        SongList
    }
};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
.like
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 1
    background-color #fff
    .scroll-wrapper
        position absolute
        top 44px
        bottom 0
        left 0
        right 0
        .control
            font-size 16px
            padding-left 20px
            line-height 40px
            border-bottom 1px solid rgb(240, 240, 240)
</style>
