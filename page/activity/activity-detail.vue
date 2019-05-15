<template>
    <v-content>
        <v-header></v-header>
        <v-loading v-bind:isloading="loading"></v-loading>        
        <v-main class="activitydetail-wrap" v-bind:no-padding="false" v-bind:isbg="true" v-if="!loading" :class="isSelfApp ? 'app-main' : ''">
            <div class="activitycont-wrap">
                <div class="activitydetail-base">
                    <img class="activitydetail-show" :src="detail.activity_coverurl" />                   
                    <h1>{{detail.activity_title}}</h1>
                    <dl v-if="detail.type == 1">
                        <dd>
                            <i class="ljh5-icons ljh5-lishi"></i>
                            <span class="item-content">报名截止：{{detail.activity_deadline.split(' ')[0].replace(/\//g,'-')}}</span>
                        </dd>
                        <dd>
                            <i class="ljh5-icons ljh5-lishi"></i>
                            <span class="item-content">活动时间：{{detail.activity_starttime.split(' ')[0].replace(/\//g,'-')}} 至 {{detail.activity_endtime.split(' ')[0].replace(/\//g,'-')}}</span>
                        </dd>
                        <dd>
                            <i class="ljh5-icons ljh5-woqian"></i>
                            <span class="item-content">主办方：{{detail.activity_sponsor}}</span>
                        </dd>
                        <dd>
                            <i class="ljh5-icons ljh5-weizhi"></i>
                            <span class="item-content">活动地址：{{detail.activity_address}}</span>
                        </dd>
                        <!--<dd class="stress">
                            <i class="ljh5-icons ljh5-jiage"></i>
                            <div class="item-content">费用套餐：
                                <div class="pkg-cont">
                                    <p v-for="(package,index) in detail.planlist">
                                        <span class="pkg-tt">套餐{{index + 1}}</span>
                                        <span class="pkg-ct">&yen;{{package.price}}</span>
                                    </p>
                                </div>
                                <div class="pkg-annotation">
                                    <p v-for="(package,index) in detail.planlist">
                                        <span class="pkg-tt">套餐{{index + 1}}：</span>
                                        <span class="pkg-ct">{{package.text}}</span>
                                    </p>
                                </div>
                            </div>
                        </dd>-->
                    </dl>
                    <dl v-else>
                        <dd>
                            <i class="ljh5-icons ljh5-lishi"></i>
                            <span class="item-content">活动时间：{{detail.activity_starttime.split(' ')[0].replace(/\//g,'-')}} 至 {{detail.activity_endtime.split(' ')[0].replace(/\//g,'-')}}</span>
                        </dd>
                        <dd>
                            <i class="ljh5-icons ljh5-woqian"></i>
                            <span class="item-content">主办方：{{detail.activity_sponsor}}</span>
                        </dd>
                        <dd class="stress" v-if="detail.activity_mapmode == '1' || detail.activity_mapmode == '3'">
                            <i class="ljh5-icons ljh5-jiage"></i>
                            <span class="item-content">费用：&yen;{{detail.activity_eprice}} / 份（电子版）</span>
                        </dd>
                        <dd class="stress" v-if="detail.activity_mapmode == '2' || detail.activity_mapmode == '3'">
                            <i class="ljh5-icons ljh5-jiage"></i>
                            <span class="item-content">费用：&yen;{{detail.activity_pprice}} / 份（纸质版）</span>
                        </dd>
                    </dl>
                </div>

                <div class="activitydetail-intro">
                    <div class="intro-sect-pkg" v-if="detail.type == 1">
                        <p class="sect-tt"><span>套餐价格</span></p>
                        <ul class="sect-pkg">
                            <li v-for="(package,index) in detail.planlist">
                                <i class="ordernum">{{index + 1}}</i>
                                <div class="pkg-cont-wrap">
                                    <div class="pkg-cont">
                                        <span class="pkg-tt">套餐{{index + 1}}</span>
                                        <span class="pkg-price"><i>&yen;</i>{{package.price}}</span>
                                    </div>
                                    <p class="pkg-description">{{package.text}}</p>
                                </div>
                            </li>
                        </ul>
                        <!-- <div class="extra-tip special-price" v-if="detail.type == 1 && detail.category_id == 43">
                            <p class="tip-title">会议现场报名价：</p>
                            <dl>
                                <dt>上游及第三方配套：</dt>
                                <dd>2188元/人</dd>
                            </dl>
                            <dl>
                                <dt>下游及终端企业：</dt>
                                <dd>888元/人</dd>
                            </dl>
                        </div> -->
                        <!-- <div class="extra-tip" v-if="detail.type == 1">
                            <dl>
                                <dt>上游企业：</dt>
                                <dd>钢厂、钢贸、冲片企业、第三方…</dd>
                            </dl>
                            <dl>
                                <dt>下游企业：</dt>
                                <dd>电机生产企业、电机下游企业…</dd>
                            </dl>
                        </div> -->
                    </div>
                    <div class="intro-sect">
                        <p class="sect-tt"><span>活动内容</span></p>
                        <div class="sect-cont" v-html="detail.activity_content"></div>
                    </div>
                    <!--<div class="intro-sect" v-if="detail.type == 1">
                        <p class="sect-tt"><span>发言嘉宾</span></p>
                        <div class="sect-guests">{{detail.activity_guest}}</div>
                    </div>-->
                    <div class="intro-sect ser">
                        <p class="sect-tt"><span>活动咨询</span></p>
                        <div class="sect-ser">
                            <dl>
                                <dd v-if="detail.activity_consult || detail.activity_consult == null" >
                                    <a class="to-tel" v-on:click="goTel(detail.activity_consult,$event)">
                                        <span class="ser-cont">
                                            <span class="item-tt">报名咨询</span>
                                            <span>{{detail.activity_consult}}</span>
                                        </span>
                                        <span class="ico-tel"><img src="/assert/dist/images/tel.gif" /></span>
                                    </a>
                                </dd>
                                <dd v-if="detail.activity_business || detail.activity_business == null">
                                    <a  class="sponsorship-tel" v-on:click="goTel(detail.activity_business,$event)">
                                        <span class="ser-cont">
                                            <span class="item-tt">赞助咨询</span>
                                            <span>{{detail.activity_business}}</span>
                                        </span>
                                        <span class="ico-tel"><img src="/assert/dist/images/tel.gif" /></span>
                                    </a>
                                </dd>
                                <dd v-if="detail.activity_other_consultation || detail.activity_other_consultation == null">
                                    <span class="item-tt">其他</span>
                                    <div class="other-list" >
                                        <a v-if="item" v-for="item in otherList" v-on:click="goTel(item,$event)">
                                            <p>{{item}}</p>
                                            <span class="ico-tel"><img src="/assert/dist/images/tel.gif" /></span>
                                        </a>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </v-main>

        <div class="activitydetail-apply" v-if="detail.type == 1 && detail.deadline_diff > 0 && detail.can_apply == 1">
            <a v-on:click="signUp" class="sign-link">立即报名</a>
            <span class="hat"></span>
        </div>
        <div class="activitydetail-apply disabled" v-if="detail.type == 1 && detail.deadline_diff > 0 && detail.can_apply == 0">
            <span>你已经报过名了</span>
            <span class="hat"></span>
        </div>
        <div class="activitydetail-apply disabled" v-else-if="detail.type == 1 && detail.starttime_diff <= 0 && detail.endtime_diff > 0">
            <span>报名已结束</span>
            <span class="hat"></span>
        </div>
        <div class="activitydetail-apply disabled" v-else-if="detail.type == 1 && detail.deadline_diff <= 0 && detail.starttime_diff > 0 && detail.endtime_diff > 0">
            <span>报名已结束</span>
            <span class="hat"></span>
        </div>
        <div class="activitydetail-apply disabled" v-else-if="detail.type == 1 && detail.endtime_diff <= 0">
            <span>活动已结束</span>
            <span class="hat"></span>
        </div>

        <div class="activitydetail-apply" v-else-if="detail.type == 2 && detail.starttime_diff <= 0 && detail.endtime_diff > 0 && detail.can_apply == 1">
            <a v-on:click="signUp" class="sign-link">立即申请</a>
            <span class="hat"></span>
        </div>
        <div class="activitydetail-apply disabled" v-else-if="detail.type == 2 && detail.starttime_diff <= 0 && detail.endtime_diff > 0 && detail.can_apply == 0">
            <span>你已经申请过</span>
            <span class="hat"></span>
        </div>
        <div class="activitydetail-apply disabled" v-else-if="detail.type == 2 && detail.endtime_diff <= 0">
            <span>活动已结束</span>
            <span class="hat"></span>
        </div>
        <div class="activitydetail-apply disabled" v-else-if="detail.type == 2 && detail.starttime_diff > 0">
            <span>活动未开始</span>
            <span class="hat"></span>
        </div>

        
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.activitydetail-wrap {
    bottom: 47px;
    overflow-x: hidden;
    .activitycont-wrap {
        background: @color-white;
        margin-top: 10px;
    }
}
.activitydetail-base {
    .activitydetail-show {
        width: 100%;
        display: block;
        vertical-align: top;
    }
    h1 {
        .detail-title();
        padding:9px 10px;
        border-top:1px solid @color-gray-e;
    }
    dd {
        padding:9px 10px;
        line-height: 100%;
        color: @color-gray-6;
        width:100%;
        .flex();
        border-top: 1px solid @border-color;
        i.ljh5-icons {
            order: -1;
            -webkit-order: -1;
            flex: 0 0 22px;
            -webkit-flex: 0 0 22px;
            align-self: flex-start;
            font-size: 16px;
            font-style: normal;
            padding-top: 3px;
        }
        .item-content {
            font-size: 15px;
            line-height: 22px;
            text-align: left;
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            .pkg-cont {
                float: right;
                width: 100%;
                padding-left: 75px;
                margin-top: -23px;
                font-size: 15px;
                p {
                    font-size: 15px;
                    line-height: 24px;
                    .flex();
                    justify-content: space-between;
                    -webkit-justify-content: space-between;
                    span {
                        font-size: 15px;
                        line-height: 24px;
                    }
                }
            }
            .pkg-annotation {
                clear: both;
                width: 100%;
                padding-left: 75px;
                padding-top: 5px;
                font-size: 14px;
                color: @subinfo-color;
                line-height: 22px;
                p {
                    font-size: 14px;
                    color: @subinfo-color;
                    line-height: 22px;
                    padding-bottom: 5px;
                    span {
                        font-size: 14px;
                        color: @subinfo-color;
                        line-height: 22px;
                    }
                }
            }
        }
        &.stress {
            color: @color-red;
        }
    }
}
.activitydetail-intro {
    padding: 0;
    .intro-sect-pkg {
        padding:0;
        border-top:3px solid @color-gray-e;
        .sect-tt {
            text-align: left;
            font-size: 18px;
            color: @color-gray-3;
            line-height: 30px;
            font-weight: bold;
            padding:10px 10px 5px;
            display: block;
            span {
                display: inline-block;
                font-size: 18px;
                color: @color-gray-3;
                line-height: 30px;
                padding-left: 10px;
                position: relative;
                &:before {
                    content: "";
                    width: 1px;
                    height: 18px;
                    display: inline-block;
                    background: @color-red;
                    position: absolute;
                    left: 0;
                    top: 5px;
                }
            }
        }
        .sect-pkg {
            li {
                .border-bottom();
                padding: 7px 10px 10px 40px;
                position: relative;
                .ordernum {
                    width: 22px;
                    height: 22px;
                    display: inline-block;
                    background: @color-blue;
                    .border-radius(50%);
                    text-align: center;
                    font-size: 16px;
                    color: @color-white;
                    line-height: 22px;
                    font-style: normal;
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    &:after {
                        content: "";
                        width: 0;
                        height: 0;
                        display: block;
                        position: absolute;
                        bottom: -2px;
                        left: 4px;
                        border: 10px transparent solid;
                        border-top-color: @color-blue;
                        border-width: 5px 7px 0px 7px;
                    }
                }
                .pkg-cont-wrap {
                    .pkg-cont {
                        .flex();
                        justify-content: space-between;
                        -webkit-justify-content: space-between;
                        .pkg-tt {
                            font-size: 16px;
                            color: @title-color;
                            line-height: 30px;
                        }
                        .pkg-price {
                            font-size: 20px;
                            color: @color-red;
                            line-height: 30px;
                            i {
                                font-size: 12px;
                                color: @subinfo-color;
                                font-style: normal;
                                display: inline-block;
                                margin-right: 3px;
                                position: relative;
                                top: -7px;
                            }
                        }
                    }
                    .pkg-description {
                        font-size: 14px;
                        color: @subinfo-color;
                        line-height: 22px;
                    }
                }
                &:last-child {
                    border: 0;
                }
            }
        }
        .extra-tip {
            padding: 6px 10px;
            margin: 10px;
            border: 1px dashed @lightest-color;
            dl {
                .flex();
                justify-content: flex-start;
                -webkit-justify-content: flex-start;
                font-size: 14px;
                color: @subinfo-color;
                line-height: 22px;
                dt {
                    flex: 0 0 75px;
                    -webkit-flex: 0 0 75px;
                }
                dd {
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                }
            }
            &.special-price{
                dl{
                    dt{
                        flex: 0 0 135px;
                        -webkit-flex: 0 0 135px;
                    }
                }
            }
        }
    }
    .intro-sect {
        padding:0 10px;
        border-top:3px solid @color-gray-e;
        color: @color-gray-4;
        .sect-tt {
            text-align: left;
            font-size: 18px;
            color: @color-gray-3;
            line-height: 30px;
            font-weight: bold;
            padding:10px 0 15px;
            display: block;
            span {
                display: inline-block;
                font-size: 18px;
                color: @color-gray-3;
                line-height: 30px;
                padding-left: 10px;
                position: relative;
                &:before {
                    content: "";
                    width: 1px;
                    height: 18px;
                    display: inline-block;
                    background: @color-red;
                    position: absolute;
                    left: 0;
                    top: 5px;
                }
            }
        }
        .sect-cont, .sect-guests {
            padding-bottom: 10px;
        }
        .sect-cont,.sect-cont * {
            //.detail-content();
            word-wrap: break-word;
        }
        .sect-guests,.sect-guests * {
            .detail-content();
            word-wrap: break-word;
        }
        .sect-ser {
            margin-top: -5px;
            dd {
                border-top: 1px solid @border-color;
                text-align: left;
                font-size: 16px;
                color: @color-gray-3;
                line-height: 26px;
                padding: 10px 0;
                .flex();
                justify-content: flex-start;
                align-items: center;
                a{
                    .flex();
                    justify-content: space-between;
                    -webkit-justify-content: space-between;
                }
                .ico-tel {
                    flex: 0 0 20px;
                    -webkit-flex: 0 0 20px;
                }
                .ser-cont {
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                }
                .item-tt {
                    display: inline-block;
                    padding-right: 10px;
                    width: 74px;
                }
                .other-list{
                    flex: 1 1 auto;
                    a{
                        display: flex;
                        flex: 1 1 auto;
                        align-items: center;
                        margin-bottom: 5px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                }
                * {
                    font-size: 16px;
                    word-wrap: break-word;
                }
            }
        }
        img {
            width: 100%;
            max-width: 100%;
        }
        &.ser {
            padding: 0;
            .sect-tt ,.sect-ser dd {
                padding-left: 10px;
                padding-right: 10px;
            }
        }
    }
}

.activitydetail-apply {
    position: fixed;
    left:0;
    bottom:0;
    z-index: 3;
    width:100%;
    height:44px;
    padding:0;
    background: @color-red;
    text-align: center;
    display: block;
    a,span {
        color: @color-white;    
        vertical-align: middle;
        font-size: 18px;
        line-height: 30px;
        font-weight: bold;
        letter-spacing: 2px;
        padding:7px 0px;
        display: block;
    }
    &:before,&:after {
        content: "";
        height: 0;
        font-size: 0;
        line-height: 0;
        display: block;
        position: absolute;
        top: -15px;
        z-index: 9;
        border-style: solid;
    }
    &:before {
        left: 0;
        border-width: 0 3px 15px 7px;
        border-color: transparent @color-red @color-red transparent;
    }
    &:after {
        right: 0;
        border-width: 0 7px 15px 3px;
        border-color: transparent transparent @color-red @color-red;
    }
    .hat {
        width: 100%;
        height: 3px;
        display: block;
        padding: 0 10px;
        position: absolute;
        top: -3px;
        &:before {
            content: "";
            width: 100%;
            height: 3px;
            display: block;
            background: #977373;
        }
    }
    &.disabled {
        background: @color-gray-9;
        &:before {
            border-color: transparent @color-gray-9 @color-gray-9 transparent;
        }
        &:after {
            border-color: transparent transparent @color-gray-9 @color-gray-9;
        }
    }
}
.main.app-main{
    top: 0;
    .activitycont-wrap{
        margin-top: 0;
    }    
}
</style>
<script>
import API from '../../config/api.js'
import Storage from 'store'
import wx from 'weixin-js-sdk'
var u = navigator.userAgent;
//android终端                                     
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
//ios终端                  
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export default {
    data(){
        return {
            detail:{},
            telList:[],
            loading:true,
            curCatName: this.$route.query.catName,
            shareData:{     //微信分享自定义内容
                title: '因为关注，所以专业',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台',
                link: 'https://m.maicai360.cn'+this.$route.path,
                success(a){
                    a.recordShare();         
                }
            },
            appShareData:{
                targetUrl:'https://m.maicai360.cn'+this.$route.path,
                thumbImageUrl:'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                title:'因为关注，所以专业',
                content:'旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台'    
            },
            activity_id: this.$route.params.id,
            user:{},
            user_id:'',
            login: false,                                                                     //登录  
            isSelfApp: false                                                                 //判断是否是嵌入到app的标识 默认false
        }
    },
    mounted () {
        if(this.$route.params.id && this.$route.params.type && this.$route.name == "activityDetail"){
            this.isLogin();
            this.getactivityDetail(this.$route.params.id,this.$route.params.type);
        }
        if(this.user.user_id){
            this.getActivityBrowser(this.$route.params.id)
        }
        this.$store.dispatch('set_channel_cur','activity');
    },
    methods: {
        getCookie(objname){
            var arrstr = document.cookie.split("; ");
            for(var i = 0;i < arrstr.length;i ++){
                var temp = arrstr[i].split("=");
                if(temp[0] == objname) return unescape(temp[1]);
            }
        },
        getActivityBrowser(id){
            this.$http.post(API.AddActivityBrowser,{
                activityId: id,
                uid: this.user ? this.user.user_id : 0
            })
            .then((response)=>{
                
            }, (response)=>{
                console.log(response.data);
            });
        },
        //app 判断是否登录
        appIsLogin(){
            if(isAndroid){
                //页面嵌入到app 获取是否登录 调用的方法 针对安卓
                this.login = window.WCJSBridge.isLogin();                                       
            }else if(isIOS){
                //页面嵌入到app 获取是否登录 获取cookie的字段isLogin的值 针对ios
                var value = this.getCookie('isLogin');                                          
                    this.login = value ==="true" ? true : false; 
            }
        },
        //安卓打电话
        goTel(tel,event){
            let _this = event.currentTarget;
            if(this.isSelfApp){
                if(isAndroid){
                    window.WCJSBridge.goTelPhone(tel);
                }else{
                    _this.setAttribute('href', 'tel:' + tel);
                }                    
            }else{
                _this.setAttribute('href', 'tel:' + tel);  
            }
        },
        //app 登录界面
        appGoLogin(){
            if(isAndroid){  
                window.WCJSBridge.goLogin();                                           
            }else if(isIOS){
                WCJSBridge.goLogin();   
            }    
        },
        //进入页面判断是否登录
        isLogin(){
            this.isSelfApp = u.indexOf('maicai360_app') > -1; 
            if(this.isSelfApp){
                this.appIsLogin();
                if(this.login){
                    this.appGetUserInfo();
                }  
                //this.appShareIconShow();
            }else{
                if(Storage.get("ljh5user")){
                    this.login = true;
                    this.user = Storage.get("ljh5user");
                }
            }
            this.user_id = this.user.user_id;
        },
        //通过app登录获取的用户信息
        appGetUserInfo(){
            if(isAndroid){
                this.user = JSON.parse(window.WCJSBridge.getUserInfo());                                          
            }else if(isIOS){
                this.user = JSON.parse(WCJSBridge.getUserInfo());
            }
        },
        //app分享按钮是否显示
        appShareIconShow(){
            if(isAndroid){
                window.WCJSBridge.setShareOfActivityIsShow(true);                               //设置 活动分享按钮是否显示  默认不显示  
                window.WCJSBridge.setNavgationTitle('活动' + ' · ' + this.curCatName);  
            }else if(isIOS){
                WCJSBridge.setShareOfActivityIsShow(true);  
                WCJSBridge.setNavgationTitle('活动' + ' · ' + this.curCatName);    
            }
        },
        //通过app分享
        appShareDetail(id,targetUrl,thumbImageUrl,title,content){
            if(isAndroid){
                window.WCJSBridge.setShareOfActivity(id,targetUrl,thumbImageUrl, title, content);                                         
            }else if(isIOS){
                WCJSBridge.setShareOfActivity(id,targetUrl,thumbImageUrl, title, content);    
            }
        },
        //微信分享权限注入
        getConfig(shareobj){
            let that = this;
            this.$http.get(API.weixinShare).then((response) => {
                let data        = response.data,
                    timestamp   = response.data.timestamp,
                    appId       = response.data.appId,
                    nonceStr    = response.data.noncestr,
                    signature   = response.data.signature;
                    wx.config({
                        debug: false,
                        appId:appId,
                        timestamp:timestamp,     
                        nonceStr:nonceStr,       
                        signature:signature,     
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',      //分享到朋友圈
                            'onMenuShareAppMessage',    //分享给朋友
                            'onMenuShareQQ',            //分享到qq            
                            'onMenuShareWeibo',         //分享到腾讯微博
                            'onMenuShareQZone'          //分享到qq空间
                        ]
                    });
                    wx.ready(function() {
                        let shareObj = { // 
                            title: shareobj.title,
                            desc: shareobj.desc,
                            link: shareobj.link,
                            imgUrl: shareobj.imgUrl,
                            success(){
                                shareobj.success(that)
                            }
                        };
                        wx.onMenuShareTimeline(shareObj);
                        wx.onMenuShareAppMessage(shareObj);
                        wx.onMenuShareQQ(shareObj);
                        wx.onMenuShareWeibo(shareObj);
                        wx.onMenuShareQZone(shareObj);
                    });
            },(response) => {
                    console.log(response.data)
            });
        },
        getactivityDetail(id,type){
            this.loading = true;
            //let url = API.activityDetail + id + "/" + type + "/" + this.user ? this.user.user_id : 0;    
            let url = API.activityDetail;
            this.$http.get(url,{params:{
                id: id,
                type: type,
                user_id: this.user ? this.user.user_id : 0
            }})
            .then((response)=>{
                this.loading = false;
                this.detail = response.data;
                this.otherList = this.detail.activity_other_consultation;
                this.otherList = this.otherList.split('|');
                //console.log(response.data);
                if(this.detail.activity_title){ 
                    this.shareData.title =  this.detail.activity_title;
                    this.appShareData.title = this.detail.activity_title;
                }
                if(this.detail.activity_content){
                    this.shareData.desc = this.detail.activity_content.replace(/<[^>]+>/g,"");
                    this.appShareData.content = this.detail.activity_content.replace(/<[^>]+>/g,"");
                    if(this.shareData.desc!="" || this.appShareData.content !=""){
                        this.shareData.desc = this.shareData.desc.substr(0,100);
                        this.appShareData.content = this.shareData.desc.substr(0,100);
                    }else{
                        this.shareData.desc = '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台';
                        this.appShareData.content = this.shareData.desc;
                    } 
                }
                if(this.detail.activity_coverurl){
                    this.appShareData.thumbImageUrl = this.detail.activity_coverurl;    
                }
                // if(this.detail.activity_coverurl){
                //     this.shareData.imgUrl = this.detail.activity_coverurl;    
                // }
                this.getConfig(this.shareData);
                if(this.isSelfApp){
                    var that = this;
                    that.appShareIconShow();
                    that.appShareDetail(this.activity_id,that.appShareData.targetUrl,that.appShareData.thumbImageUrl,that.appShareData.title,that.appShareData.content);
                }
            }, (response)=>{
                console.log(response.data);
            });
        },
        //分享记录
        recordShare(){
            this.$http.post(API.shareNotify,{article_id:this.activity_id,user_id:this.user_id,type:"2"})
            .then((response)=>{
            }, (response)=>{
                console.log(response.data);
            });
        },
        //立即报名
        signUp(){
            var signLink = document.querySelector('.sign-link');
            if(this.login){
                if(this.detail.type == 2){
                    signLink.setAttribute('href', '/activity/map/apply/new/'+ this.activity_id);
                }else{
                    signLink.setAttribute('href', '/activity/apply/add/new/'+ this.activity_id);
                }    
            }else{
                if(this.isSelfApp){
                    this.appGoLogin();    
                }else{
                    signLink.setAttribute('href', '/login');       
                }
            }
        }
    }
}
</script>