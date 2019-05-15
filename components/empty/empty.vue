<template>
    <div class="pub-empty">
        <!--<img :src="emptyicon" />-->
        <img src="../../libs/static/images/empty.png" />
        <p>{{emptycont}}</p>
    </div>
</template>

<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main {
    &.empty-main-wrap {
        .flex-column();
        justify-content: flex-start;
        -webkit-justify-content: flex-start;
        .pub-empty {
            width: 100%;
            //height: 100%;
            background: @color-white;
            text-align: center;
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            align-self: center;
            .flex-column();
            img {
                width: 60%;
                margin: 0 auto 40px;
                display: block;
            }
            p {
                text-align: center;
                font-size: 20px;
                color: @subinfo-color;
                line-height: 34px;
                padding-bottom: 100px;
            }
        }
    }
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props:{
        isshow:{
            type: Boolean,
            default:false
        },
        emptyicon: {
            type: String,
            default: "../../libs/static/images/empty.png"
        },
        emptycont: {
            type: String,
            default: "暂无相关内容"
        }
    }
}
</script>