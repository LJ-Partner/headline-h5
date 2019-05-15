<template>
    <div class="ljhl-loading" v-if="isloading">
        <div class="ljhl-loading-wrapper">
            <!--<i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>-->
            <img src="https://p.maicai360.cn/img/get/20180316/54108636568191300829339_gif" />
        </div>       
    </div>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.ljhl-loading {
    margin: auto;
    padding: 0px;
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    .ljhl-loading-wrapper{
        margin: auto;
        padding: 0px;
        position: absolute;
        z-index: 3;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width:100%;
        height:150px;
        text-align: center;
        color: @color-red;
        img {
            width: 100px;
            display: block;
            margin: 0 auto;
        }
        .tip {
            font-size: 16px;
            text-align: center;
            color: #90929a;
            line-height: 170%;
            padding: 15px 0;
        }
    }
}
</style>
<script>

export default {
     props: {
        isloading: {
            type: Boolean,
            default:true
        }
    }
}
</script>