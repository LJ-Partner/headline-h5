<template>
    <div class="ljh5-dialog-confirm" :class="{hide:!isshow}">
        <div class="cont-wrap">
            <div class="cont">
                <i class="ljh5-icons ljh5-guanyu"></i>
                {{dialogcont}}
            </div>
            <div class="btn-wrap">
                <button v-on:click="close_ljh5_dialog_confirm" class="cancel">取消</button>
                <button v-on:click="ljh5_dialog_confirm" class="confirm">确定</button>
            </div>
            <span class="close" v-on:click="close_ljh5_dialog_confirm" v-if="isshowclosebtn"></span>
        </div>
    </div>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.ljh5-dialog-confirm {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    .flex();
    justify-content: center;
    align-items: center;
    .cont-wrap {
        width: 90%;
        max-height: 90%;
        background: #ffffff;
        .border-radius(5px);
        padding: 20px 0 0;
        overflow: hidden;
        overflow-y: auto;
        position: relative;
        .cont {
            width: 100%;
            font-size: 18px;
            color: #212123;
            line-height: 180%;
            padding: 0 20px 20px;
            //.flex();
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            display: flex;
            display: -webkit-flex;
            flex-direction: row;
            -webkit-flex-direction: row;
            justify-content: start;
            -webkit-justify-content: start;
            align-items: start;
            .ljh5-guanyu {
                font-size: 24px;
                color: @warning;
                order: -1;
                -webkit-order: -1;
                flex: 0 0 30px;
                -webkit-flex: 0 0 30px;
                margin-right: 5px;
                margin-top: -1px;
            }
        }
        .close {
            position: absolute;
            right: 10px;
            top: 0;
            z-index: 9;
            width: 30px;
            height: 24px;
            display: inline-block;
            background: @btn-bg;
            .border-bottom-radius(5px);
            &:before , &:after {
                content: "";
                width: 1px;
                height: 20px;
                display: inline-block;
                background: @btn-color;
                position: absolute;
                top: 1px;
                left: 14px;
            }
            &:before {
                .rotate(45deg);
            }
            &:after {
                .rotate(-45deg);
            }
        }
        .btn-wrap {
            width: 100%;
            padding: 0;
            border-top: 1px solid @border-color;
            .flex();
            justify-content: space-between;
            -webkit-justify-content: space-between;
            button {
                .btn();
                display: inline-block;
                padding: 10px 0;
                margin: 0 10px;
                background-color: transparent;
                //.border-radius(20px);
                text-align: center;
                font-size: 18px;
                line-height: 30px;
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
                letter-spacing: 10px;
                text-indent: 10px;
                width: 50%;
                &.confirm {
                    color: @color-blue;
                }
                &.cancel {
                    color: @btn-bg-gray-color;
                    border-right: 1px solid @border-color;
                    // border: 1px solid #d6d7de;
                    // background-color:#f0f1f7;
                    // background-image: -webkit-linear-gradient(#f0f1f7, #d6d7de, #f0f1f7);
                    // background-image: -moz-linear-gradient(#f0f1f7, #d6d7de, #f0f1f7);
                    // background-image: -ms-linear-gradient(#f0f1f7, #d6d7de, #f0f1f7);
                    // background-image: -o-linear-gradient(#f0f1f7, #d6d7de, #f0f1f7);
                    // background-image:linear-gradient(#f0f1f7, #d6d7de, #f0f1f7);
                }
            }
        }
    }
    &.hide {
        display: none;
    }
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props:{
        isshow: {
            type: Boolean,
            default: false
        },
        dialogcont: {
            type: String,
            default: ""
        },
        btnconfirm: {
            type: Function
        },
        btncancel: {
            type: Function
        },
        isshowclosebtn: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ljh5_dialog_confirm () {
            if(this.btnconfirm){
                this.btnconfirm();
            }
            this.isshow = false;
            this.dialogcont = "";
        },
        close_ljh5_dialog_confirm () {
            if(this.btncancel){
                this.btncancel();
            }
            this.isshow = false;
            this.dialogcont = "";
        }
    }
}
</script>