<template>
     <div class="ljh5-dialog"  :class="{hide:!isshow}">
        <div class="dialog-cont" v-html="dialogcont">
            <i class="ljh5-icons ljh5-chacha close" v-if="isclosebtn" v-on:click="close_ljh5_dialog"></i>
        </div>
    </div>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.ljh5-dialog {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    .flex();
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    .dialog-cont {
        max-width: 90%;
        max-height: 70%;
        //overflow: hidden;
        //overflow-y: auto;
        background: rgba(0,0,0,0.7);
        text-align: left;
        font-size: 16px;
        color: #ffffff;
        line-height: 170%;
        padding: 15px;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        position: relative;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        .close {
            display: inline-block;
            position: absolute;
            right: -15px;
            top: -15px;
            z-index: 3;
            width: 30px;
            height: 30px;
            background: rgba(0,0,0,1);
            .border-radius(50%);
            color: #ffffff;
            font-size: 16px;
            text-align: center;
            line-height: 30px;
        }
    }
    .dialog-cont * {
        font-size: 16px;
        color: #ffffff;
        line-height: 170%;
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
        isshow:{
            type: Boolean,
            default: false
        },
        dialogcont: {
            type: String,
            default: ""
        },
        isauto: {
            type: Boolean,
            default: true
        },
        dialoglife: 3000,
        isclosebtn: {
            type: Boolean,
            default: false
        },
        closedialog: {
            type: Function
        }
    },
    mounted () {
        this.autoclose_ljh5_dialog();
    },
    methods: {
        autoclose_ljh5_dialog () {
            let self = this;
            if(this.isshow && this.isauto && self && !self._isDestroyed) {
                this.autotimeout = setTimeout(() => {
                    if(this.closedialog){
                        this.closedialog();
                    }
                    self.isshow = false;
                    self.dialogcont = "";
                    self.dialoglife = 3000;
                    this.destroyTimeout();
                }, self.dialoglife);
            }
        },
        close_ljh5_dialog () {
            if(this.closedialog){
                this.closedialog();
            }
            self.isshow = false;
            self.dialogcont = "";
            self.dialoglife = 3000;
            this.destroyTimeout();
        },
        destroyTimeout () {
            clearTimeout(this.autotimeout);
            return;
        }
    }
}
</script>