<template>
    <transition name="zoom-fade-out">
        <div class="zoom-layout" id="zoomArea" v-show="isShowZoom && zoomImg != ''" @click="closeZoom">
            <div class="zoom-wrap">
                <div class="zoom-cont"><img id="zoomTarget" :src="zoomImg" /></div>
            </div>
            <div class="zoom-tool" v-if="isTool">
                <i class="ljh5-icons ljh5-huodongfanhui replace" :class="{'disabled': this.isFirst}" @click="previous" v-if="zoomImgs.length > 1"><i></i></i>
                <i class="ljh5-icons ljh5-sousuo zoomout" @click="zoomout"><i></i></i>
                <i class="ljh5-icons ljh5-sousuo zoomin" @click="zoomin"><i></i></i>
                <i class="ljh5-icons ljh5-arr-next replace" :class="{'disabled': this.isLast}" @click="next" v-if="zoomImgs.length > 1"><i></i></i>
                <i class="ljh5-icons ljh5-chacha close" @click="closeZoom"></i>
            </div>
        </div>
    </transition>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.zoom-layout {
    width: 100%;
    height: 100%;
    //.flex-column();
    background: rgba(0,0,0,1);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    overflow: auto;
    -webkit-touch-action: auto !important;
    -moz-touch-action: auto !important;
    -ms-touch-action: auto !important;
    -o-touch-action: auto !important;
    touch-action: auto !important;
    -webkit-user-drag: auto !important;
    -moz-user-drag: auto !important;
    -ms-user-drag: auto !important;
    -o-user-drag: auto !important;
    user-drag: auto !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 1) !important;
    -webkit-user-select: auto !important;
    user-select: auto !important;
    -webkit-touch-select: auto !important;
    touch-select: auto !important;

    -webkit-touch-callout: auto !important;
    touch-callout: auto !important;

    -webkit-touch-zooming: auto !important;
    touch-zooming: auto !important;

    -webkit-overflow-scrolling : touch;

    .zoom-wrap {
        width: 100%;
        height: 100%;
        display: table;
        //.flex-column();
        background: rgba(0,0,0,1);
        // position: fixed;
        // left: 0;
        // top: 0;
        // z-index: 99;
        overflow: auto;
        -webkit-touch-action: auto !important;
        -moz-touch-action: auto !important;
        -ms-touch-action: auto !important;
        -o-touch-action: auto !important;
        touch-action: auto !important;
        -webkit-user-drag: auto !important;
        -moz-user-drag: auto !important;
        -ms-user-drag: auto !important;
        -o-user-drag: auto !important;
        user-drag: auto !important;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 1) !important;
        -webkit-user-select: auto !important;
        user-select: auto !important;
        -webkit-touch-select: auto !important;
        touch-select: auto !important;

        -webkit-touch-callout: auto !important;
        touch-callout: auto !important;

        -webkit-touch-zooming: auto !important;
        touch-zooming: auto !important;

        -webkit-overflow-scrolling : touch;
        .zoom-cont {
            width: 100%;
            height: 100%;
            overflow: auto;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }
        img {
            width: 100%;
            display: block;
            vertical-align: top;
            //-webkit-flex: 0 0 auto;
            //flex: 0 0 auto;
            -webkit-touch-action: auto !important;
            -moz-touch-action: auto !important;
            -ms-touch-action: auto !important;
            -o-touch-action: auto !important;
            touch-action: auto !important;
            -webkit-user-drag: auto !important;
            -moz-user-drag: auto !important;
            -ms-user-drag: auto !important;
            -o-user-drag: auto !important;
            user-drag: auto !important;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 1) !important;
            -webkit-user-select: auto !important;
            user-select: auto !important;
            -webkit-touch-select: auto !important;
            touch-select: auto !important;

            -webkit-touch-callout: auto !important;
            touch-callout: auto !important;

            -webkit-touch-zooming: auto !important;
            touch-zooming: auto !important;

            -webkit-overflow-scrolling : touch; 
        }
    }
    .close {
        display: none;
        width: 26px;
        height: 26px;
        background: rgba(255,255,255,0.3);
        border: 1px solid @color-white;
        .border-radius(50%);
        text-align: center;
        font-size: 20px;
        color: rgba(255,255,255,0.7);
        line-height: 25px;
        position: fixed;
        right: 15px;
        top: 15px;
        z-index: 100;
    }
}
.zoom-tool {
    width: 230px;
    background: rgba(0,0,0,0.3);
    .border-radius(4px);
    position: fixed;
    left: 50%;
    bottom: 50px;
    z-index: 100;
    text-align: center;
    padding: 3px 8px;
    margin-left: -115px;
    //.flex();
    .ljh5-icons {
        width: 30px;
        height: 30px;
        display: inline-block;
        .border-radius(50%);
        position: relative;
        text-align: center;
        font-size: 31px;
        line-height: 30px;
        color: rgba(255,255,255,0.7);
        margin: 0 10px;
    }
    .zoomout {
        i{
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            &:before,&:after {
                content: "";
                position: absolute;
                display: inline-block;
                background: rgba(255,255,255,0.7);
            }
            &:before {
                width: 15px;
                height: 2px;
                left: 6px;
                top: 13px;
            }
            &:after {
                width: 2px;
                height: 14px;
                left: 12px;
                top: 7px;
            }
        }
    }
    .zoomin {
        i{
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            &:before {
                content: "";
                position: absolute;
                display: inline-block;
                background: rgba(255,255,255,0.7);
            }
            &:before {
                width: 15px;
                height: 2px;
                left: 6px;
                top: 13px;
            }
        }
    }
    .replace {
        font-size: 26px;
    }
    .close {
        display: none;
        width: 26px;
        height: 26px;
        background: rgba(255,255,255,0.3);
        border: 1px solid @color-white;
        .border-radius(50%);
        text-align: center;
        font-size: 20px;
        color: rgba(255,255,255,0.7);
        line-height: 25px;
        position: fixed;
        right: 15px;
        top: 15px;
        z-index: 100;
    }
    .disabled {
        color: rgba(255,255,255,0.2);
    }
}
.zoom-fade-out-enter-active, .zoom-fade-out-leave-active {
    -ms-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    -moz-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    -webkit-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    -o-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
}
.zoom-fade-out-enter, .zoom-fade-out-leave-active {
    opacity: 0;
    -webkit-transform: scale(0,0);
    -moz-transform: scale(0,0);
    -ms-transform: scale(0,0);
    -o-transform: scale(0,0);
    transform: scale(0,0);
}
</style>
<script>
//import { mapGetters, mapActions } from 'vuex'
//import Hammer from '../../libs/Hammer/hammer.min-v2.0.8.js'
import Hammer from '../../libs/Hammer/hammer.js'
export default {
    data() {
        return {
            toolAct: false,//工具栏操作中
            isFirst: false,//是否第一张
            isLast: false//是否最后一张
        };
    },
    props:{
        isShowZoom: false,//图片缩放窗口
        zoomImg: "",//图片地址
        isTool: false,//是否显示工具栏，默认不显示
        zoomImgs: []//图组，默认单张
    },
    // mounted () {
    //     this.autoclose_ljh5_dialog();
    // },
    methods: {
        //图片缩放
        hammer (curImg) {
            //var zoomArea = this.$el.querySelector("#zoomArea");
            var zoomArea = this.$el;
            var zoomTarget = zoomArea.querySelector("#zoomTarget");
            //var scale_init =1;
            var mc = new Hammer.Manager(zoomArea);
            var pinch = new Hammer.Pinch();
            zoomTarget.style.width = "101%";
            mc.add([pinch]);
            mc.on("pinchout", function(ev) {
                //myElement.textContent += ev.type +" ";
                //scale_init = scale_init++;
                //zoomArea.querySelectorAll("img")[0].style.webkitTransform = 'scale('+scale_init+1+')';
                var widthStr = zoomTarget.style.width.split("%")[0];
                zoomTarget.style.width = parseInt(widthStr) >= 500 ? "500%" : parseInt(widthStr) + 2 + "%";
            });
            mc.on("pinchin", function(ev) {
                //myElement.textContent += ev.type +" ";
                //scale_init = scale_init--;
                //zoomArea.querySelectorAll("img")[0].style.webkitTransform = 'scale('+scale_init-1+')';
                var widthStr = zoomTarget.style.width.split("%")[0];
                zoomTarget.style.width = parseInt(widthStr) <= 100 ? "100%" : parseInt(widthStr) - 2 + "%";
            });
            //zoomArea.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            this.zoomImg = curImg;
            this.checkIndex();
        },
        //放大
        zoomout () {
            this.toolAct = true;
            var zoomArea = this.$el;
            var zoomTarget = zoomArea.querySelector("#zoomTarget");
            //zoomTarget.style.width = "101%";
            var widthStr = zoomTarget.style.width.split("%")[0];
            zoomTarget.style.width = parseInt(widthStr) >= 500 ? "500%" : parseInt(widthStr) + 10 + "%";
        },
        //缩小
        zoomin () {
            this.toolAct = true;
            var zoomArea = this.$el;
            var zoomTarget = zoomArea.querySelector("#zoomTarget");
            //zoomTarget.style.width = "101%";
            var widthStr = zoomTarget.style.width.split("%")[0];
            zoomTarget.style.width = parseInt(widthStr) <= 100 ? "100%" : parseInt(widthStr) - 10 + "%";
        },
        //上一张
        previous () {
            this.toolAct = true;
            var zoomArea = this.$el;
            var zoomTarget = zoomArea.querySelector("#zoomTarget");
            zoomTarget.style.width = "101%";
            if(!this.isFirst) {
                this.zoomImg = this.zoomImgs[this.zoomImgs.indexOf(this.zoomImg) - 1];
            }
            this.checkIndex();
        },
        //下一张
        next () {
            this.toolAct = true;
            var zoomArea = this.$el;
            var zoomTarget = zoomArea.querySelector("#zoomTarget");
            zoomTarget.style.width = "101%";
            if(!this.isLast) {
                this.zoomImg = this.zoomImgs[this.zoomImgs.indexOf(this.zoomImg) + 1];
            }
            this.checkIndex();
        },
        //检查当前图片在数组中的位置
        checkIndex () {
            let index = this.zoomImgs.indexOf(this.zoomImg);
            let length = this.zoomImgs.length;
            if(length <= 1) {
                this.isFirst = true;
                this.isLast = true;
            } else {
                if(index < 1){
                    this.isFirst = true;
                    this.isLast = false;
                } else if(index >= length - 1) {
                    this.isLast = true;
                    this.isFirst = false;
                } else {
                    this.isFirst = false;
                    this.isLast = false;
                }
            }
        },
        closeZoom () {
            if(!this.toolAct){
                this.isShowZoom = false;
                this.zoomImg = "";
                this.$emit('clear-zoom');
            } else {
                this.toolAct = false;
            }
        }
    }
}
</script>