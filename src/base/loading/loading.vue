<template>
    <div class="loading">
        <img width="24" height="24" src="./loading.gif" class="img">
        <p class="desc">{{title}}</p>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        title: {
            type: String,
            default: "正在载入..."
        }
    }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.loading
    height 100%
    width 100%
    text-align center
    .desc
        line-height 20px
        font-size $font-size-small
        color $color-text-l
</style>
