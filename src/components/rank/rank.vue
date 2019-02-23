<template>
    <div class="rank" ref="rank">
        <scroll :data="cloudList" class="toplist" ref="toplist">
            <div>
                <h2 class="title">
                    <span></span>云音乐官方榜
                </h2>
                <ul>
                    <li @click="selectItem(item)" class="item" v-for="item in cloudList">
                        <div class="icon">
                            <img v-lazy="item.coverImgUrl">
                        </div>
                        <ul class="songlist">
                            <li class="song" v-for="(song,index) in item.tracks">
                                <span>{{index + 1}}</span>
                                <span>{{song.first}}-{{song.second}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h2 class="title">
                    <span></span>云音乐官方榜
                </h2>
                <ul class="other">
                    <li @click="selectItem(item)" class="otheritem" v-for="item in otherList">
                        <div class="icon">
                            <img v-lazy="item.coverImgUrl">
                        </div>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
                <div class="loading-container" v-show="!cloudList.length">
                    <loading></loading>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import { getTopList } from "api/rank";
import { RES_OK } from "api/config";
import { mapMutations,mapActions } from "vuex";

export default {
    created() {
        this._getTopList();
    },
    data() {
        return {
            cloudList: [],
            otherList: []
        };
    },
    methods: {
        selectItem(item) {
            this.changeDisc(item.id)
        },
        _getTopList() {
            getTopList().then(res => {
                if (res.code === RES_OK) {
                    this.cloudList = this._normalizeList(res.list.slice(0, 4));
                    this.otherList = this._normalizeList(res.list.slice(4));
                }
            });
        },
        _normalizeList(list) {
            let ret = [];
            list.forEach(v => {
                let obj = {};
                obj.id = v.id;
                obj.coverImgUrl = v.coverImgUrl;
                obj.tracks = v.tracks;
                obj.name = v.name;
                ret.push(obj);
            });
            return ret;
        },
        ...mapMutations({
            setDisc: "SET_DISC"
        }),
        ...mapActions([
          'changeDisc'
        ])
    },
    watch: {
        cloudList() {
            setTimeout(() => {
                this.$Lazyload.lazyLoadHandler();
            }, 20);
        }
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

.rank
    position fixed
    width 100%
    top 88px
    bottom 44px
    z-index 2
    .toplist
        height 100%
        overflow hidden
        .title
            line-height 40px
            span
                padding-left 5px
                border-left 2px solid red
        .item
            display flex
            margin-right 20px
            padding-bottom 5px
            height 120px
            .icon
                flex 0 0 120px
                width 120px
                height 120px
                img
                    width 100%
            .songlist
                flex 1
                display flex
                flex-direction column
                justify-content center
                padding 0 20px
                height 100px
                overflow hidden
                background #ffffff
                color #999
                font-size $font-size-small
                .song
                    no-wrap()
                    line-height 26px
        .other
            display flex
            flex-flow row wrap
            margin-bottom 10px
            .otheritem
                display flex
                box-sizing border-box
                flex 0 1
                flex-flow column
                width 33%
                padding-bottom 5px
                padding-right 5px
                .icon
                    flex 0 1
                    width 120px
                    height 120px
                    img
                        width 100%
                p
                    width 100%
        .loading-container
            position absolute
            width 100%
            top 50%
            transform translateY(-50%)
</style>