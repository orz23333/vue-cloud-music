<template>
    <div class="findmusic">
        <scroll :data="recommendData" ref="scroll" class="scroll-wrapper" :refreshDelay="500">
            <div>
                <div class="findmusic-content">
                    <div v-if="recommends.length" class="slider-wrapper">
                        <slider>
                            <div v-for="item of recommends" :key="item.linkUrl">
                                <a :href="item.linkUrl" class="needsclick">
                                    <img :src="item.picUrl" @load="loadImage" class="needsclick">
                                </a>
                            </div>
                        </slider>
                    </div>
                    <recommend
                        rType="music"
                        :items="discList"
                        title="推荐歌单"
                        @selectItem="selectDisc"
                    ></recommend>
                    <recommend rType="mv" :items="mvList" title="推荐Mv" @selectItem="selectMv"></recommend>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Slider from "base/slider/slider";
import Recommend from "base/recommend/recommend";
import Scroll from "base/scroll/scroll";
import { ERR_OK, RES_OK } from "api/config";
import { mapActions, mapMutations } from "vuex";
import {
    getRecommend,
    getDiscList,
    getRecommendDisc,
    getRecommendMv
} from "api/recommend";

import { Mv } from "common/js/mv";

export default {
    data() {
        return {
            recommends: [],
            discList: [],
            mvList: []
        };
    },
    methods: {
        selectMv(mv) {
            this.playMv(mv.id);
        },
        selectDisc(disc) {
            this.changeDisc(disc.id)
        },
        loadImage() {
            this.$refs.scroll.refresh();
        },
        _getRecommed() {
            getRecommend().then(res => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider;
                }
            });
        },
        _getRecommedDisc() {
            getRecommendDisc().then(res => {
                if (res.code === RES_OK) {
                    this.discList = res.result.slice(0, 9);
                }
            });
        },
        _getRecommedMv() {
            getRecommendMv().then(res => {
                if (res.code === RES_OK) {
                    this.mvList = this._normalizeMv(res.result);
                }
            });
        },
        _normalizeMv(items) {
            return items.map(v => {
                return new Mv(v);
            });
        },
        ...mapActions(["playMv", 'changeDisc']),
        ...mapMutations({
            setDisc: "SET_DISC",
            setDiscShow: "SET_DISC_SHOW"
        })
    },
    computed: {
        recommendData() {
            let data = this.discList
                .concat(this.mvList)
                .concat(this.recommends);
            return data;
        },
        showMv() {
            return this.mvList.slice(0, 6);
        }
    },
    created() {
        this._getRecommed();
        this._getRecommedDisc();
        this._getRecommedMv();
    },
    components: {
        Slider,
        Recommend,
        Scroll
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.findmusic
    position fixed
    width 100%
    top 88px
    bottom 44px
    z-index 5
    .scroll-wrapper
        height 100%
        overflow hidden
        .findmusic-content
            height 100%
            overflow hidden
            .slider-wrapper
                position relative
                width 100%
                overflow hidden
</style>
