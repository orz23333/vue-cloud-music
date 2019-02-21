<template>
    <div class="comments-wrapper">
        <div class="header">
            <div class="icon" @click="hide">
                <i class="icon-2fanhui"></i>
            </div>
            <div class="title">评论({{total}})</div>
        </div>
        <scroll
            :data="comments"
            class="scroll-wrapper"
            :pullup="pullup"
            @scrollToEnd="getMoreComments"
        >
            <div class="scroll">
                <list-bar></list-bar>
                <comments
                    :hasMore="hasMore"
                    :comments="comments"
                    :hotComments="hotComments"
                    :total="total"
                    v-if="comments"
                ></comments>
            </div>
        </scroll>
    </div>
</template>

<script>
import Comments from "components/comments/comments";
import CHeader from "components/header/header";
import ListBar from "base/list-bar/list-bar";
import Scroll from "base/scroll/scroll";
import { getSongComments, getDiscComments } from "api/comments";
import { RES_OK } from "api/config";
export default {
    props: {
        commentsType: {
            type: String,
            default: ""
        },
        id: {
            type: Number,
            default: 64293
        }
    },
    data() {
        return {
            hasMore: false,
            total: -1,
            comments: [],
            hotComments: [],
            pullup: true,
            page: 0
        };
    },
    created() {
        if (this.commentsType === "song") {
            this._getSongComments({ id: this.id });
        } else {
            this._getDiscComments({ id: this.id });
        }
    },
    methods: {
        hide() {
            this.$emit("hide");
        },
        _getSongComments(options) {
            getSongComments(options).then(res => {
                if (res.code === RES_OK) {
                    this.hasMore = res.more;
                    this.total = res.total;
                    this.comments = this.comments.concat(res.comments);
                    this.hotComments = this.hotComments.concat(res.hotComments);
                }
            });
        },
        _getDiscComments(options) {
            getDiscComments(options).then(res => {
                if (res.code === RES_OK) {
                    this.hasMore = res.more;
                    this.total = res.total;
                    this.comments = this.comments.concat(res.comments);
                    this.hotComments = this.hotComments.concat(res.hotComments);
                }
            });
        },
        getMoreComments() {
            if (!this.hasMore) {
                return;
            }
            this.page++;
            if (this.commentsType === "song") {
                getSongComments({ id: this.id, page: this.page }).then(res => {
                    if (res.code === RES_OK) {
                        this.hasMore = res.more;
                        this.total = res.total;
                        this.comments = this.comments.concat(res.comments);
                    }
                });
            } else {
                getDiscComments({ id: this.id, page: this.page }).then(res => {
                    if (res.code === RES_OK) {
                        this.hasMore = res.more;
                        this.total = res.total;
                        this.comments = this.comments.concat(res.comments);
                    }
                });
            }
        }
    },
    components: {
        Comments,
        CHeader,
        ListBar,
        Scroll
    }
};
</script>

<style lang="stylus" scoped>
.comments-wrapper
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 200
    background-color #fff
    .header
        position relative
        height 44px
        text-align center
        border-bottom 1px solid rgb(230, 230, 230)
        background-color #fff
        z-index 1
        .icon
            position absolute
            top 0
            left 5px
            i
                display block
                padding 10px
                font-size 24px
                color black
        .title
            display inline-block
            vertical-align top
            line-height 44px
            width 70%
    .scroll-wrapper
        position absolute
        top 44px
        bottom 0
        left 0
        right 0
</style>

