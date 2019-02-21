<template>
    <div class="commentsview">
        <div class="comment" v-if="hotComments.length">
            <h2 class="title">精彩评论</h2>
            <ul>
                <li v-for="comment in hotComments" :key="comment.time" class="list-group-item">
                    <div class="header">
                        <img v-lazy="comment.user.avatarUrl" width="30" class="img">
                        <div class="center">
                            <h3>{{ comment.user.nickname }}</h3>
                            <span>{{ _normalizeTime(comment.time) }}</span>
                        </div>
                        <span class="right">
                            <i class="icon-dianzan"></i>
                            {{ comment.likedCount }}
                        </span>
                    </div>
                    <div class="content">
                        <p class="comment">{{ comment.content }}</p>
                        <p
                            class="replied"
                            v-if="comment.beReplied.length"
                        >@{{comment.beReplied[0].user.nickname}}:{{comment.beReplied[0].content}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="comment" v-if="comments.length">
            <h2 class="title">最新评论({{total}})</h2>
            <ul>
                <li v-for="comment in comments" :key="comment.time" class="list-group-item">
                    <div class="header">
                        <img v-lazy="comment.user.avatarUrl" width="30" class="img">
                        <div class="center">
                            <h3>{{ comment.user.nickname }}</h3>
                            <span>{{ _normalizeTime(comment.time) }}</span>
                        </div>
                        <span class="right">
                            <i class="icon-dianzan"></i>
                            {{ comment.likedCount }}
                        </span>
                    </div>
                    <div class="content">
                        <p class="comment">{{ comment.content }}</p>
                        <p
                            class="replied"
                            v-if="comment.beReplied.length"
                        >@{{comment.beReplied[0].user.nickname}}:{{comment.beReplied[0].content}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="comments-fixed" ref="fixed" v-show="fixed">
            <div class="fixed-title">{{}}fixed</div>
        </div>
        <loading v-show="hasMore"></loading>
    </div>
</template>

<script>
import Loading from "base/loading/loading";
import moment from "moment";
moment.locale("zh-cn");

export default {
    props: {
        hasMore: {
            type: Boolean,
            default: false
        },
        comments: {
            type: Array,
            default: () => []
        },
        hotComments: {
            type: Array,
            default: () => []
        },
        total: {
            type: Number,
            default: 0
        },
        scrollY: {
            type: Number,
            default: 0
        }
    },
    methods: {
        _normalizeTime(time) {
            let date = moment(time).calendar(null, {
                sameDay: "H:mm",
                lastDay: "[昨天] H:mm",
                lastWeek: "MM月DD日",
                sameElse: "YYYY年MM月DD日"
            });
            return date;
        }
    },
    computed: {
        fixed() {
            //暂时不做fixed固定
            return "";
        }
    },
    components: {
        Loading
    }
};
</script>

<style lang="stylus" scoped>
.commentsview
    position relative
    .comment
        .title
            height 30px
            line-height 30px
            padding-left 10px
            font-size 13px
            color rgb(100, 100, 100)
            background-color rgb(245, 245, 245)
        .list-group-item
            display flex
            flex-direction column
            padding 0 0 10px 10px
            .header
                display flex
                flex-direction row
                height 40px
                line-height 20px
                .img
                    width 40px
                    height 40px
                    border-radius 50%
                .center
                    flex 1
                    padding-left 10px
                    h3
                        font-size 15px
                        color rgb(80, 80, 80)
                    span
                        font-size 12px
                        color rgb(100, 100, 100)
                .right
                    width 80px
                    padding-right 10px
                    line-height 40px
                    font-size 15px
                    text-align right
            .content
                padding 10px 10px 10px 50px
                border-bottom 1px solid rgba(192, 192, 192, 0.3)
                .comment
                    line-height 20px
                .replied
                    margin 10px 0 10px 0
                    padding 10px 0 10px 10px
                    line-height 20px
                    border 1px solid rgba(192, 192, 192, 0.3)
    .comments-fixed
        position fixed
        top 0
        left 0
        width 100%
        .fixed-title
            height 30px
            line-height 30px
            padding-left 10px
            font-size 13px
            color rgb(100, 100, 100)
            background-color rgb(245, 245, 245)
</style>
