<template>
    <transition name="ad-fade-out">
        <div class="ljh5-ad-layout" v-if="curCat == adCat && !isAdShowed && adImg != ''">
            <div class="ad-wrap">
                <div class="ad-cont">
                    <a :href="adLink"><img :src="adImg" /></a>
                    <i class="ljh5-icons ljh5-chacha close" @click="closeAd"></i>
                </div>
            </div>
        </div>
    </transition>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.ljh5-ad-layout {
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
    .ad-wrap {
        width: 80%;
        max-height: 95%;
        overflow: hidden;
        overflow-y: auto;
        position: relative;
        .ad-cont {
            .flex-column();
            img {
                width: 100%;
                overflow: hidden;
                display: block;
            }
            .close {
                display: inline-block;
                width: 26px;
                height: 26px;
                border: 1px solid @color-white;
                .border-radius(50%);
                margin: 10px auto;
                text-align: center;
                font-size: 20px;
                color: rgba(255,255,255,0.7);
                line-height: 25px;
            }
        }
    }
}

.ad-fade-out-enter-active, .ad-fade-out-leave-active {
    -ms-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    -moz-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    -webkit-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    -o-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
}
.ad-fade-out-enter, .ad-fade-out-leave-active {
    //opacity: 0;
    -ms-transform: translateY(100%);
    -moz-transform: translateY(100%);
    -webkit-transform: translateY(100%);
    -o-transform: translateY(100%);
    transform: translateY(100%);
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import Storage from 'store'
export default {
    data () {
        return {
            isAdShowed: true//是否已显示过
        }
    },
    props : {
        maxTimes: 0,//显示次数，默认无限次
        adInterval: 7,//显示周期，单位：d
        
        curCat: "0",//当前分类，用于显示定向Ad
        adCat: "0",//要显示Ad的分类，默认全部显示
        adLink: "",//广告链接
        adImg: "",//广告图片

        isAnimation: true,//是否有进场、离场动画----预留
        playType: "slider",//动画方式，默认滑动
        comeinDirection: "up",//进场方向，默认由下到上
        leaveDirection: "down",//离场方向，默认由上到下
        autoClose: false,//自动关闭----预留
        autoCloseInterval: 5000//停留时间，单位：ms
    },
    mounted () {
        this.showAd();
    },
    methods: {
        showAd () {
            //定向Ad
            this.curCat = this.curCat != "0" ? this.curCat : "4";
            if(this.curCat == this.adCat || this.adCat == '0'){
                if(Storage.get("ljh5_cat" + this.adCat + "_adshowed")){//已显示过
                    if(this.maxTimes > 0) {//限制次数
                        //一生显示1次
                        //this.isAdShowed = true;
                        //设置缓存已显次数
                    } else {//不限次数
                        let curDate = new Date();
                        let preDate = new Date(Storage.get("ljh5_cat" + this.adCat + "_adshowed"));
                        let diffDate ;
                        //电机一天一次
                        if(this.adCat == '43'){
                            this.adInterval = 1;    
                            diffDate =  Math.ceil((curDate.getTime() -preDate.getTime())/(1000*60*60*24)); 
                            if((Storage.get("ad_info"))){
                                if((curDate.getTime()-Storage.get("ad_info").time)/(1000*60*60*24) >= 1){ 
                                    this.isAdShowed = false;
                                    localStorage.removeItem('ad_info'); 
                                    Storage.set("ad_info",{'show_ad':1,'time':curDate.getTime()});
                                }else{
                                    if(Storage.get("ad_info").show_ad == 1){
                                        this.isAdShowed = true;
                                    }    
                                }
                            }else{
                                if(diffDate >= this.adInterval) { 
                                    this.isAdShowed = false;
                                    Storage.set("ljh5_cat" + this.adCat + "_adshowed", curDate);
                                    Storage.set("ad_info",{'show_ad':1,'time':curDate.getTime()});
                                } else {
                                    this.isAdShowed = true;
                                }
                            }
                        }else{
                            diffDate = curDate.getDate() - preDate.getDate();
                            if(diffDate >= this.adInterval) { 
                                this.isAdShowed = false;
                                Storage.set("ljh5_cat" + this.adCat + "_adshowed", curDate);
                            } else {
                                this.isAdShowed = true;
                            }
                        }
                    }
                } else {//没显示过
                    this.isAdShowed = false;
                    let showDate = new Date();
                    //Storage.set("ljh5_adshowed", showDate.toLocaleDateString());
                    Storage.set("ljh5_cat" + this.adCat + "_adshowed", showDate);
                }
            }
        },
        //关闭定向Ad
        closeAd () {
            this.curCat = "0";
            this.isAdShowed = true;
        }
    }
}
</script>