<template>
    <div class="recommend">
        <scroll :data="mvList" class="mv-wrapper" :pullup="pullup" @scrollToEnd="getMoreMv">
            <div>
                <ul class="disc-wrapper">
                    <li class="item" v-for="(item, index) of mvList" @click="selectMv(item.id)" :key="item.id">
                        <div class="item-link">
                            <div class="item-content">
                                <img :src="item.cover" class="item-video">
                                <span class="count">
                                    <i class="icon-video"></i>
                                    {{ _normalizeCount(item.playCount) }}
                                </span>
                                <div class="desc">
                                    <p class="rank">
                                        <span class="newrank">{{index+1}}</span>
                                        <span class="oldrank" v-html="_getRank(index)"></span>
                                    </p>
                                    <span>{{ item.name }}-{{ item.artistName }}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <loading v-show="hasMore"></loading>
                </ul>
            </div>
        </scroll>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { getMvList } from "api/mv";
import { RES_OK } from "api/config";
import { Mv } from "common/js/mv";
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";

export default {
    data() {
        return {
            mvList: [],
            hasMore: true,
            pullup: true,
            offset: 0
        };
    },
    created() {
        setTimeout(() => {
            this._getMvList(this.offset);
        }, 1000);
    },
    methods: {
        selectMv(id) {
            this.playMv(id);
        },
        getMoreMv() {
            if (!this.hasMore) {
                return;
            }
            this.offset++;
            getMvList(this.offset).then(res => {
                if (res.code === RES_OK) {
                    this.mvList = this.mvList.concat(
                        this._normalizeMv(res.data)
                    );
                    this._checkMore(res.hasMore);
                }
            });
        },
        _getRank(index) {
            let offset = index + 1 - this.mvList[index].lastRank;
            switch (true) {
                case offset === 0:
                    return `-0`;
                    break;

                case offset < 0:
                    return `&#8593;${Math.abs(offset)}`;
                    break;

                case offset > 0:
                    return `&#8595;${Math.abs(offset)}`;
                    break;
            }
        },
        _checkMore(hasMore) {
            if (!hasMore) {
                //30是每次查询mv的数量
                this.hasMore = false;
            }
        },
        _getMvList(offset) {
            getMvList(offset).then(res => {
                if (res.code === RES_OK) {
                    this.mvList = this._normalizeMv(res.data);
                    this._checkMore(res.data);
                }
            });
        },
        _normalizeMv(items) {
            return items.map(v => {
                return new Mv(v);
            });
        },
        _normalizeCount(count) {
            count = +count % 10000;
            count = Number.parseInt(count) + "万";
            return count;
        },
        getMvDetail(id) {},
        ...mapMutations({
            setMvId: "SET_MVID"
        }),
        ...mapActions(["playMv"])
    },
    components: {
        Scroll,
        Loading
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.recommend
    position fixed
    bottom 44px
    top 88px
    z-index 10
    width 100%
    .mv-wrapper
        overflow hidden
        height 100%
    .title
        font-size 20px
        word-spacing 2px
        line-height 40px
        .border
            padding-right 5px
            height 10px
            border-left 2px solid red
        .icon-you
            display inline-block
            padding 2px
            font-size 16px
    .disc-wrapper
        display flex
        flex-wrap wrap
        box-sizing border-box
        align-items center
        width 100%
        .item
            flex 0 0 100%
            width 100%
            box-sizing border-box
            position relative
            min-width 0
            padding 0 5px 5px
            .item-link
                width 100%
                height 100%
                .item-content
                    position relative
                    width 100%
                    height 0
                    padding-top 57.4%
                    overflow hidden
                    .item-video
                        position absolute
                        height 100%
                        width 100%
                        top 0
                        left 0
                    .desc
                        position absolute
                        bottom 20px
                        left 20px
                        width 100%
                        font-size 14px
                        line-height 20px
                        color #222222
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                        color #ffffff
                        width 80%
                        .rank
                            margin-bottom 5px
                            .newrank
                                font-size 30px
                                line-height 30px
                                font-weight 600
                            .oldrank
                                font-size 12px
                                vertical-align bottom
                    .count
                        position absolute
                        right 13px
                        top 10px
                        color #fff
                        font-size 15px
</style>

