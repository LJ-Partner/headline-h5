<template>
    <div class="center-main" v-if="bg && bg!=''" :style="bg">
        <slot></slot>
    </div>
    <div class="center-main" v-else>
        <slot></slot>
    </div>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.center-main {
    .flex-column();
    overflow: auto;
    padding:0px 15px;
    position: absolute;
    z-index: 1;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: #f0f1f7;
}
</style>
<script>
export default {
     props: {
        bg: {
            type: String,
            default:""
        }
    }
}
</script>