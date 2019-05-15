<template>
    <div class="main" v-if="!noPadding && !isbg"><!-- :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }"-->
        <slot></slot>
        <slot name="bottom">
            <div class="pull-up" :class="{end:pullend}" v-if="bottomMethod && allowpullup">           
                <span class="">{{pulluptext}}</span>
            </div>
        </slot>
    </div>
    <div class="main" v-else-if="!noPadding && isbg" style="background: #f2f2f2;" :class="appBarShow ? '' : 'app-main'">
        <slot></slot>
        <slot name="bottom">
            <div class="pull-up" :class="{end:pullend}" v-if="bottomMethod && allowpullup">           
                <span class="">{{pulluptext}}</span>
            </div>
      </slot>
    </div>
    <div class="main" v-else-if="noPadding && !isbg" style="top:0px;padding:0px 0px;" :class="appBarShow ? '' : 'app-main'">
        <slot></slot>
        <slot name="bottom">
            <div class="pull-up" :class="{end:pullend}" v-if="bottomMethod && allowpullup">           
                <span class="">{{pulluptext}}</span>
            </div>
        </slot>  
    </div>
    <div class="main" v-else style="top:0px;padding:0px 0px;background: #f2f2f2;">
        <slot></slot>
        <slot name="bottom">
            <div class="pull-up" :class="{end:pullend}" v-if="bottomMethod && allowpullup">           
                <span class="">{{pulluptext}}</span>
            </div>
        </slot>
    </div>
</template>
<style lang="less">
.main {
    overflow-y: auto;
    padding:0px 10px;
    position: absolute;
    z-index: 1;
    top:45px;
    bottom:53px;
    left:0;
    right:0;
    -webkit-overflow-scrolling: touch;
    .pull-up {
        width:100%;
        height: 30px;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        padding: 0;
        color:#9a9ca7;
        &.end {
            color: #9a9ca7;
            span {
                color: #9a9ca7;
            }
        }
    }
}
.app-main{
    bottom: 0;
    top: 0;
    background: #fff !important; 
}
</style>
<script>
export default {
    props: {
        noPadding: {
            type: Boolean,
            default:false
        },
        isbg: {
            type: Boolean,
            default:false
        },
        maxDistance: {
            type: Number,
            default: 0
        },
        bottomMethod: {
            type: Function
        }
    },
    data() {
        return {
            translate: 0,   
            pulluptext: '',
            allowpullup: true,
            pullend: false,
            isscroll: true,
            isComputed: false,
            appBarShow: true
        };
    },
    methods: {
        clearTranslate() {
            // setTimeout(() => {
            //      this.translate = 0;
            //      this.pulluptext='亲，已经跑到尽头了哦~';
            //      this.allowpullup = true;
            //      this.pullend = true;
            //      this.isscroll = false;
            // }, 200);
            this.translate = 0;
            this.pulluptext='亲，已经跑到尽头了哦~';
            this.allowpullup = true;
            this.pullend = true;
            this.isscroll = false;
        },
        setTranslate(val,text) { 
            if(!this.pullend) {
                this.pullend = false;
            }
            this.pulluptext=text;
            this.allowpullup = true; 
            this.translate = val;
        },
        bindScrollEvents() {
            this.$el.addEventListener('scroll', this.scrollEvents);
        },
        init() {
            this.bindScrollEvents();
        },
        scrollEvents () {
            if(this.allowpullup && this.bottomMethod) {
                let self = this;
                let scrollLimit = self.$el.scrollHeight - self.$el.offsetHeight;
                var pullUp = self.$el.querySelector(".pull-up");
                let pullUpTop = pullUp.offsetTop;
                
                if(pullUpTop <= self.$el.offsetHeight + self.$el.scrollTop && self.isscroll) {
                    //if(this.bottomMethod){
                        self.bottomMethod();
                        self.isscroll = false;
                        this.resetScroll = setTimeout(function(){
                            self.isscroll = true;
                            //this.clearReset();
                            //clearTimeout(this.resetScroll);
                        },1500);
                    //}
                }
            }
        },
        wcApp(){                                                    //判断是否是旺材app
            var u = navigator.userAgent;
            var isSelfApp = u.indexOf('maicai360_app') > -1;
            if(isSelfApp){
                this.appBarShow = false;    
            }else{
                this.appBarShow = true;
            }
        }
    },
    mounted() {
        //this.uuid = Math.random().toString(36).substring(3, 8);
        this.init();
        this.wcApp();
    },
    updated(){
        //详情页显示部分内容
        let articleCont = this.$el.querySelector("#articleCont");
        if(!this.isComputed && articleCont){
            this.$emit('articlecont-height', articleCont.scrollHeight);
            this.isComputed = true;
        }
    }
};
</script>