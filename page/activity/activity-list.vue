<template>
    <v-content>
        <!--<v-header></v-header>-->
        <div class="activitylist-header" v-if="appBarShow">活动<span v-if="curCat.name && curCat.name != ''">{{curCat.name}}</span></div>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-main class="activitylist-wrap" :class="[{'empty-main-wrap': !lists.Activity || lists.Activity.length <= 0}]" v-bind:no-padding="false" v-bind:isbg="true" :bottom-method="pullActivity"  ref="bottom" >
            <div class="activity-list" v-if="lists.Activity && lists.Activity.length > 0">
                <figure class="activity" v-for="item in lists.Activity" :class="{disabled: item.endtime_diff <= 0}">
                    <a :href="'/activity/detail/' + item.id + '/' + item.type">
                        <figcaption class="act-show">
                            <img :src="item.coverurl" v-if="item.coverurl && item.coverurl!=''"/>
                            <span class="act-state" v-if="item.type == '1'">
                                <span class="act-type">会议活动</span>
                                <span v-if="item.deadline > 0">火热报名中</span>
                                <span v-else-if="item.starttime_diff <= 0 && item.endtime_diff > 0">活动进行中</span>
                                <span v-else-if="item.endtime_diff <= 0">活动已结束</span>
                                <i class="tail"></i>
                            </span>
                            <span class="act-state" v-else>
                                <span class="act-type">地图活动</span>
                                <span v-if="item.starttime_diff > 0">活动未开始</span>
                                <span v-if="item.starttime_diff <= 0 && item.endtime_diff > 0">活动进行中</span>
                                <span v-if="item.endtime_diff <= 0">活动已结束</span>
                                <i class="tail"></i>
                            </span>
                        </figcaption>
                        <div class="act-panel">
                            <h2>{{item.title}}</h2>
                            <p>{{item.sponsor}}</p>
                            <p>
                                <span class="item">{{item.starttime.split(' ')[0].replace(/\//g,'-')}} - {{item.endtime.split(' ')[0].replace(/\//g,'-')}}</span>
                                <span class="item" v-if="item.type == '1'">
                                    <em v-if="item.id == '11'">{{parseInt(item.apply)+47}}</em>
                                    <em v-else>{{item.apply}}</em>
                                    人报名
                                </span>
                                <span class="item" v-else>
                                    <em v-if="item.id == '1'">{{parseInt(item.apply)+502}}</em>
                                    <em v-else-if="item.id == '24'">{{parseInt(item.apply)+1000}}</em>
                                    <em v-else-if="item.id == '29'">{{parseInt(item.apply)+3000}}</em>
                                    <em v-else-if="item.id == '30'">{{parseInt(item.apply)+617}}</em>
                                    <em v-else-if="item.id == '36'">{{parseInt(item.apply)+550}}</em>
                                    <em v-else-if="item.id == '45'">{{parseInt(item.apply)+2000}}</em>
                                    <em v-else-if="item.id == '35'">{{parseInt(item.apply)+1000}}</em>
                                    <em v-else>{{item.apply}}</em>
                                人申请</span>
                                <!--<span class="item"><em>免费</em></span>-->
                            </p>
                            <v-countdown v-if="item.type == '1'" v-bind:is-interval="true" v-bind:interval-time="item.deadline" v-bind:countdown-title="'距报名截止：'" v-bind:end-tip="'报名已结束'"></v-countdown>
                            <!--<p><i class="ljh5-icons ljh5-weizhi"></i>上海市普陀区中山北路2438号中瑞商务大厦11楼11a</p>-->
                            <span class="guide">进入<i class="ljh5-icons ljh5-xiayibu"></i></span>
                        </div>
                    </a>
                    <div class="act-news-panel" v-if="item.articles && item.articles.length > 0">
                        <p class="panel-tt">活动报道</p>
                        <v-ticker v-bind:row-height="36" v-bind:scroll-count="1" v-bind:total="item.articles.length" v-bind:max-row="item.articles.length < 3 ? item.articles.length : 3" v-bind:speed="500" v-bind:duration="2000" v-bind:flag="item.articles.length > 3 ? false : true">
                            <ul class="ticker">
                                <li v-for="article in item.articles"><h3><a :href="'/article/detail/' + article.article_id + '/'+ type"><i class="ljh5-icons ljh5-laba"></i>{{article.article_title}}</a></h3></li>
                            </ul>
                        </v-ticker>
                    </div>
                </figure>
                <div class="act-publicity-w" v-if="activityId == '69'">
                    <div class="act-publicity">
                        <div class="act-publicitye-pic">
                            <img src="http://p.maicai360.cn/img/get/20170920/45651636415255838225432_jpg">
                        </div>
                        <div class="act-publicitye-text">
                            <p>地图标注</p>
                            <p>地图领取</p>
                            <p>详情请添加小编号</p>
                        </div>
                    </div>
                </div>
            </div>
            <v-empty v-else v-bind:emptycont="'暂无相关活动'"></v-empty>
        </v-main>
        <v-footer></v-footer>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.activitylist-wrap {
    padding: 0;
}

.activitylist-header {
    width: 100%;
    height: 44px;
    background: @color-white;
    text-align: center;
    font-size: 18px;
    color: @def-font-color;
    line-height: 44px;
    .flex();
    position: fixed;
    top: 0;
    z-index: 3;
    span{
        font-size: 18px;
        color: @def-font-color;
        line-height: 44px;
        display: inline-block;
        padding-left: 30px;
        position: relative;
        &:before {
            content: "";
            width: 4px;
            height: 4px;
            display: inline-block;
            background: @subinfo-color;
            .border-radius(50%);
            position: absolute;
            left: 13px;
            top: 20px;
        }
    }
}

.activity-list {
    padding-top: @list-split-height;
    .activity {
        margin-bottom: @list-split-height;
        a {
            width: 100%;
            display: block;
            padding: 0 10px;
        }
        .act-show {
            position: relative;
            img {
                width: 100%;
                display: block;
                vertical-align: top;
                //border-top: 2px solid @color-red;
            }
            .act-state {
                padding: 0 15px 0 10px;
                //.border-left-radius(40px);
                background: @color-red;
                color: @color-white;
                font-size: 13px;
                line-height: 26px;
                text-align: right;
                letter-spacing: 1px;
                height: 26px;
                display: inline-block;
                position: absolute;
                right: -10px;
                bottom: 30px;
                z-index: 3;
                .act-type {
                    display: inline-block;
                    padding-right: 6px;
                    position: relative;
                    &:after {
                        content: "";
                        width: 2px;
                        height: 2px;
                        display: inline-block;
                        background: @color-white;
                        .border-radius(50%);
                        position: absolute;
                        right: 0px;
                        top: 12px;
                        z-index: 9;
                    }
                }
                .tail {
                    width: 10px;
                    height: 26px;
                    background: @color-red;
                    position: absolute;
                    left: -10px;
                    top: 0;
                    z-index: 3;
                    &:before {
                        content: "";
                        height: 0;
                        font-size: 0;
                        line-height: 0;
                        display: block;
                        position: absolute;
                        right: 10px;
                        top: 0;
                        z-index: 9;
                        border-style: solid;
                        border-color: @color-red transparent;
                        border-width: 13px 0 13px 8px;
                    }
                    &:after {
                        content: "";
                        width: 3px;
                        height: 3px;
                        display: inline-block;
                        background: @color-white;
                        .border-radius(50%);
                        position: absolute;
                        right: 0;
                        top: 12px;
                        z-index: 9;
                    }
                }
                &:after {
                    content: "";
                    height: 0;
                    font-size: 0;
                    line-height: 0;
                    display: block;
                    position: absolute;
                    z-index: 9;
                    right: 0;
                    top: -5px;
                    border-style: solid;
                    left: auto;
                    border-width: 5px 0 0 10px;
                    border-color: transparent transparent @color-red @color-red;
                }
            }
        }
        .act-panel {
            background: @color-white;
            padding: 0 8px 5px;
            position: relative;
            h2 {
                .list-title();
                padding: 5px 0 5px;
            }
            p {
                .list-subinfo();
                .item {
                    .list-subinfo();
                    display: inline-block;
                    margin-right: 14px;
                    position: relative;
                    em {
                        font-size: 15px;
                        color: @color-red;
                        font-style: normal;
                        font-weight: bold;
                        display: inline-block;
                        margin: 0 2px;
                    }
                    &:after {
                        content: "";
                        width: 1px;
                        height: 10px;
                        display: inline-block;
                        position: absolute;
                        right: -10px;
                        top: 5px;
                        background: @color-gray-4;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                    &:last-child:after {
                        display: none;
                    }
                }
                .ljh5-weizhi {
                    position: relative;
                    top: 1px;
                    margin-right: 2px;
                }
            }

            .guide {
                position: absolute;
                right: 8px;
                bottom: 2px;
                .list-subinfo();
                font-size: 16px;
                color: @color-blue;
                font-weight: bold;
                i {
                    font-size: 18px;
                    position: relative;
                    top: 1px;
                    margin-left: 2px;
                }
            }
        }

        &.disabled {
            .act-show {
                img {
                    border-color: @color-gray-9;
                }
                .act-state {
                    background: @color-gray-9;
                    .tail {
                        background: @color-gray-9;
                        &:before {
                            border-color: @color-gray-9 transparent;
                        }
                    }
                    &:after {
                        border-color: transparent transparent @color-gray-9 @color-gray-9;
                    }
                }
            }
        }

        .act-news-panel {
            background: @color-white;
            padding: 5px 0 0;
            margin: 0 10px;
            .panel-tt {
                display: block;
                border-top: 1px solid @border-color;
                padding: 8px 10px 0;
                font-size: 17px;
                color: @list-title-color;
                line-height: 150%;
                &:before {
                    content: "";
                    width: 2px;
                    height: 17px;
                    background: @color-red;
                    display: inline-block;
                    position: relative;
                    top: 2px;
                    left: 0;
                    margin-right: 6px;
                }
                &:after {
                    content: "…";
                    display: inline-block;
                    font-size: 18px;
                    color: @color-red;
                    line-height: 15px;
                    position: relative;
                    top: -4px;
                    left: 4px;
                }
            }
            li {
                width: 100%;
                a {
                    font-size: 15px;
                    color: @def-font-color-hover;
                    line-height: 36px;
                    .border-bottom ();
                    height: 36px;
                    .ellipsis();
                    .ljh5-laba {
                        font-size: 18px;
                        color: @color-red;
                        display: inline-block;
                        margin-right: 5px;
                        position: relative;
                        top: 1px;
                    }
                    .ljh5-huobao {
                        font-size: 26px;
                        color: @color-red;
                        line-height: 14px;
                        display: inline-block;
                        border: 1px solid @color-red;
                        .border-radius(3px);
                        padding: 1px 1px 0;
                        position: relative;
                        top: -2px;
                        -webkit-transform: scale(0.8,0.8);
                        -moz-transform: scale(0.8,0.8);
                        -ms-transform: scale(0.8,0.8);
                        -o-transform: scale(0.8,0.8);
                        transform: scale(0.8,0.8);
                    }
                }
                &:last-child {
                    a {
                        border: 0;
                    }
                }
            }
        }
    }
}

.act-publicity-w{
    width: 94%;
    margin: 0 auto;
    .act-publicity{
        .flex();
        flex: 1 1 auto;
        align-items: stretch;
        -webkit-align-items: stretch; 
        justify-content: center;
        -webkit-justify-content: center; 
        background: url(images/xny-activity-bg.png) no-repeat;
        background-size: 100% 100%;
        padding: 20px;
        .act-publicitye-pic{
            width: 50%;
            img{
                max-width: 100%;
                vertical-align: middle;
            }
        }
        .act-publicitye-text{
            .flex-column();
            flex: 1 1 auto;
            text-align: center;
            align-items: center;
            -webkit-align-items: center; 
            justify-content: center;
            -webkit-justify-content: center;
            p{
                .flex-column();
                align-items: center;
                -webkit-align-items: center; 
                justify-content: center;
                -webkit-justify-content: center;  
            }
        }
    }
}
.app-main{
    .activity-list{
        padding-top: 0;
    }
}
</style>

<script>
import API from '../../config/api.js'
import wx from 'weixin-js-sdk'
var u = navigator.userAgent;
//android终端                                     
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
//ios终端                  
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export default {
    data(){
        return {
            lists:{},
            activityId : '',
            type: 2, //1推荐 2普通
            cur:1,
            loading:true,
            Page:1,
            Total:0,
            curCat: {
                type: this.$route.params.type,
                name: ""
            },
            shareData:{     //微信分享自定义内容
                title: '因为关注，所以专业',
                imgUrl: 'https://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台',
                link: 'https://m.maicai360.cn'+this.$route.path
            },
            appBarShow: true
        }
    },
    mounted () {
        this.getActivity();
        this.activityId = this.$route.params.type;
        this.$store.dispatch('set_channel_cur','activity');
        this.getConfig(this.shareData);
        // this.wcApp();
    },
    methods: {
        //微信分享权限注入
        getConfig(shareobj){
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
        pullActivity(){
            if(this.Page==0){
                this.Page=1;
            } else {
                this.Page++;
            }
            let url = API.activity + this.curCat.type + "/" + this.Page;
            // if(this.$route.params.type && this.$route.name == "activityList"){
            //      url = API.activity + "/" + this.$route.params.type+"/"+this.Page;
            //      this.cur = parseInt(this.$route.params.type);
            // } else {
            //     url = API.activity+"/1"+"/"+this.Page;
            //     this.cur = 1;
            // }
            this.$refs.bottom.setTranslate(-10,'玩命加载中...');
            this.$http.get(url)
            .then((response)=>{
                //console.log(this.lists);
                this.loading = false;
                if(response.data && response.data.Activity && response.data.Activity.length > 0) {
                    for(var key in response.data.Activity){
                        this.lists.Activity.push(response.data.Activity[key]);
                    }
                    this.Page = response.data.Page;
                    this.Total = response.data.Total;
                } else {
                    this.$refs.bottom.clearTranslate();
                    this.Total = response.data.Total;
                }
            }, (response)=>{
                console.log(response.data);
                
            });
        },
        getActivity(){
            this.loading = true;
            let url = API.activity + this.curCat.type;
            this.$http.get(url)
            .then((response)=>{
                //console.log(response.data);
                if(response.data && response.data.code =="200"){
                    this.lists = response.data;
                    this.curCat.name = response.data.category;
                }
                this.loading = false;
                this.wcApp();
            }, (response)=>{
                console.log(response.data);
            });
        },
        wcApp(){                                                                                                //判断是否是旺材app
            var isSelfApp = u.indexOf('maicai360_app') > -1;                                                    //判断是否是嵌入到app的标识
            if(isSelfApp){
                this.appBarShow = false; 
                //嵌入到app 活动列表的 title 设置
                if(isAndroid){
                    window.WCJSBridge.setNavgationTitle('活动' + ' · ' + this.curCat.name);  
                }else if(isIOS){
                    WCJSBridge.setNavgationTitle('活动' + ' · ' + this.curCat.name);
                }                                
            }else{
                this.appBarShow = true;
            }
        }
    }
}
</script>
