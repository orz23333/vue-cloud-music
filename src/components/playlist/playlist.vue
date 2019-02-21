<template>
    <transition name="list-fade">
        <div class="playlist" @click="hide" v-show="showFlag">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <span class="mode" @click="changeMode">
                            <i :class="modeIcon" class="icon"></i>
                            <span class="text">{{modeText}}({{listlength}})</span>
                        </span>
                        <span class="clear" @click="deleteAll">
                            <i class="icon-lajitong"></i>
                        </span>
                    </h1>
                </div>
                <scroll
                    ref="listContent"
                    :data="sequenceList"
                    class="list-content"
                    :refreshDelay="refreshDelay"
                >
                    <transition-group ref="list" name="list" tag="ul">
                        <li
                            :key="item.id"
                            class="item"
                            v-for="(item,index) in sequenceList"
                            @click="selectItem(item,index)"
                            :class="isCurSongLi(item)"
                        >
                            <i :class="isCurSong(item)"></i>
                            <span class="text">
                                {{item.name}}
                                <span class="singer">- {{item.singer}}</span>
                            </span>
                            <span class="delete" @click.stop="deleteSong(item)">
                                <i class="icon-iconfontcha"></i>
                            </span>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="deleteSongList"></confirm>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters, mapMutations } from "vuex";
import { playMode } from "common/js/config";
import Scroll from "base/scroll/scroll";
import Confirm from "base/confirm/confirm";

export default {
    data() {
        return {
            showFlag: false,
            refreshDelay: 120
        };
    },
    computed: {
        modeIcon() {
            return this.mode === playMode.sequence
                ? "icon-shunxubofang"
                : this.mode === playMode.loop
                ? `icon-Pdanquxunhuan-`
                : "icon-bofangye-caozuolan-suijibofang";
        },
        modeText() {
            return this.mode === playMode.sequence
                ? "顺序播放"
                : this.mode === playMode.random
                ? "随机播放"
                : "单曲循环";
        },
        listlength() {
            return this.playlist.length;
        },
        ...mapGetters(["sequenceList", "mode", "playlist", "currentSong"])
    },
    methods: {
        deleteAll() {
            this.$refs.confirm.show();
        },
        deleteSong(item) {
            this.deleteSong(item);
            !this.playlist.length ? this.hide() : "";
        },
        isCurSong(item) {
            return this.currentSong.id === item.id ? "icon-icon-test" : "";
        },
        isCurSongLi(item) {
            return this.currentSong.id === item.id ? "currentli" : "";
        },
        selectItem(item, index) {
            if (this.mode === playMode.random) {
                index = this.playlist.findIndex(song => {
                    return song.id === item.id;
                });
            }
            this.setCurrentIndex(index);
            this.setPlayState(true);
        },
        show() {
            this.showFlag = true;
            setTimeout(() => {
                this.$refs.listContent.refresh();
                this.$refs.listContent.scrollToElement(".currentli", 300);
            }, 20);
        },
        hide() {
            this.showFlag = false;
        },
        ...mapMutations({
            setCurrentIndex: "SET_CURRENT_INDEX",
            setPlayState: "SET_PLAYING_STATE"
        }),
        ...mapActions(["changeMode", "deleteSong", "deleteSongList"])
    },
    components: {
        Scroll,
        Confirm
    },
    watch: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.playlist
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 200
    background-color rgba(0, 0, 0, 0.3)
    color black
    &.list-fade-enter-active, &.list-fade-leave-active
        transition opacity 0.3s
        .list-wrapper
            transition all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
        opacity 0
        .list-wrapper
            transform translate3d(0, 100%, 0)
    &.list-fade-enter, .list-wrapper
        position absolute
        left 0
        bottom 0
        width 100%
        background-color #ffffff
        display flex
        flex-flow column
        height 50%
        .list-header
            position relative
            padding 10px 5px
            .title
                display flex
                align-items center
                font-size 16px
                .mode
                    flex 1
                    vertical-align top
                    .icon
                        margin-right 10px
                        font-size 20px
                .clear
                    extend-click()
                    font-size 20px
                    margin-right 10px
        .list-content
            flex 1
            overflow hidden
            .item
                display flex
                align-items center
                height 40px
                padding 0 20px 0 5px
                overflow hidden
                border-bottom 1px solid rgb(240, 240, 240)
                &.list-enter-active, &.list-leave-active
                    transition all 0.1s
                &.list-enter, &.list-leave-to
                    height 0
                &.currentli
                    color red
                    .icon-icon-test
                        margin-right 5px
                        color red
                        font-size 20px
                    .text
                        flex 1
                        no-wrap()
                        font-size 16px
                        .singer
                            font-size 14px
                    .delete
                        extend-click()
                        font-size 12px
                .text
                    flex 1
                    no-wrap()
                    font-size 14px
                    .singer
                        font-size 12px
                        color rgb(150, 150, 150)
                .delete
                    extend-click()
                    font-size 12px
        .list-operate
            width 140px
            margin 20px auto 30px auto
            .add
                display flex
                align-items center
                padding 8px 16px
                border 1px solid $color-text-l
                border-radius 100px
                .icon-add
                    margin-right 5px
                    font-size $font-size-small-s
                .text
                    font-size $font-size-small
        .list-close
            text-align center
            line-height 50px
            background #ffffff
            font-size 16px
            border-top 1px solid rgb(230, 230, 230)
</style>