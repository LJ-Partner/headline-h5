<template>
    <v-content class="course-intro-w">
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="intro-fixed" v-show="!loading">
            <a href="javascript:;" class="bar-detail">
                <div class="bar-detail-logo">
                    <img src="https://p.maicai360.cn/img/get/20180417/24067636595564069687567_png">
                    <p>旺材有料</p>
                </div>
                <a href="javascript:;" class="open">立即打开</a>
            </a>
        </div>
        <div v-show="!loading">
            <div class="course-intro" v-if="detail && detail != null">
                <div class="intro-main">
                    <div class="main-cover" v-show="detail.Cover">
                        <span>
                            <img :src="detail.Cover" alt="">
                        </span>
                        <p v-show="detail.Course">
                        {{detail.Course}}  
                        </p>
                    </div>
                    <div class="main-info">
                        <h3 v-show="detail.Teacher">
                            {{detail.Teacher}}
                        </h3>
                        <p v-show="detail.Describe"> {{detail.Describe}}</p>
                        <ul>
                            <li>
                                <em>{{detail.Buys}}</em>
                                <span>已购买</span>
                            </li>
                            <li>
                                <em>{{detail.ClassNum}}</em>
                                <span>课时</span>
                            </li>
                        </ul>
                    </div>
                    <div class="main-list">
                        <h3>课程内容</h3>
                        <ul class="list" v-show="classList.length > 0">
                            <li class="item" v-for="(item,index) in classList" :class="playing && index == 0 ?'active':''">
                                <button class="i-play"  @click="togglePlaying">
                                    <i class="ljh5-icons" :class="playing?'ljh5-zanting':'ljh5-bofang1'" v-if="index == 0 && item.IsFree == 1"></i>
                                    <div class="des">
                                        <p>{{item.ClassName}}</p>
                                        <!--<span v-if="index == 0">{{item.TimeLong}} / {{item.LearningCount}}次学习</span>-->
                                    </div>
                                </button>
                                <em class="dot" v-else></em>
                                <a :href="'/ExtraOfAct/courseShare?uid=0&classId='+item.ID" class="link" v-show="index == 0 && item.IsFree == 1">
                                    <i class="ljh5-icons ljh5-wengao"></i>    
                                </a>
                            </li>
                            <audio v-show="mediaUrl" :src="mediaUrl" ref="audio" preload></audio> 
                        </ul>
                    </div>
                    <div class="main-content" v-if="detail.CourseIntr" v-html="detail.CourseIntr"></div>
                </div>
            </div>
            <v-empty v-else class="course-share-empty" v-bind:emptycont="'暂无相关内容'"></v-empty>
        </div>
        <div class="intro-bottom" v-show="!loading">
            <a href="javascript:;" class="btn-free open">
                <i class="ljh5-icons ljh5-bofang1"></i>
                <span>试听</span>
            </a>
            <a href="javascript:;" class="btn-join open">
                <span>¥{{detail.price}}</span>
                <em>加入学习</em>    
            </a>
        </div>
    </v-content>
</template>
<style lang="less">
    @import '../../libs/static/less/validation.less';
    @import '../../libs/static/less/mixins.less';
    .course-intro-w{
        background: #F2F2F2;
        overflow-x: hidden;
        em{
            font-style: normal;
        }
        .intro-fixed{
            a,button,input,textarea,div{
                -webkit-tap-highlight-color:rgba(255,255,255,0);
                -webkit-appearance:none;
                outline:none;
            }
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 100;
            height: 43px;
            background: #2C2E34;
            .bar-detail{
                background: #2C2E34;
                box-sizing: border-box;
                padding: 7px 20px;
                .flex();
                justify-content: space-between;
                font-family: PingFangSC-Regular;
                color: #fff;
                height: 43px;
                box-sizing: border-box;
                .bar-detail-logo{
                    .flex();
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        margin: 0 6px 0 0;
                        flex: 0 0 30px;
                        height: 30px;
                        display: flex;
                        width: 30px;
                    }
                    p{
                        font-size: 16px;
                    }
                }
                .open{
                    border: 1px solid #F87F5B;
                    border-radius: 3px;
                    color: #F87F5B;  
                    padding:0 9px;
                    font-size: 16px; 
                }
            }
        }
        .course-intro{
            .intro-main{
                margin: 43px 0 0 0;
                padding: 0 0 49px 0;
                .main-cover{
                    position: relative;
                    z-index: 1;
                    span{
                        padding: 0 0 48%;
                        height: 0;
                        display: block;
                        overflow: hidden;
                    }
                    p{
                        position: absolute;
                        left: 14px;
                        bottom: 14px;
                        color: #fff;
                        font-size: 15px;
                        .multi-ellipsis(1);
                    }
                }
                .main-info{
                    padding: 20px 14px 0;
                    font-family: PingFangSC-Regular;
                    color: #433E41;
                    font-size: 14px;
                    line-height: 20px;
                    margin: 0 0 7px 0;
                    background: #fff;
                    h3{
                        font-size: 16px;
                        margin: 0 0 10px 0;
                    }
                    ul{
                        padding: 20px 0;
                        .flex();
                        li{
                            flex: 1 1 auto;
                            .flex-column();
                            text-align: center;
                            position: relative;
                            z-index: 1;
                            em{
                                font-size: 16px;
                                color: #202020;
                                margin: 0 0 7px 0;
                            }
                            span{
                                font-size: 12px;
                                color: #717171;    
                            }
                            &:first-child{
                                &:before{
                                    content: '';
                                    width: 2px;
                                    background:#F2F2F2;  
                                    height: 68%;
                                    right: 0;
                                    top: 16%; 
                                    position: absolute;
                                    z-index: 2;
                                }
                            }
                        }
                    }
                }
                .main-list{
                    background: #fff;
                    padding: 10px 0 0 0;
                    margin: 0 0 7px 0;
                    h3{
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        color: #202020;
                        padding: 0 14px;
                    }
                    .list{
                        .item{
                            padding:10px 14px;
                            .flex();
                            border-bottom: 1px solid  #F2F2F2;
                            justify-content: space-between;
                            align-items: center;
                            line-height: 20px;
                            .i-play{
                                border: none;
                                background: none;
                                display: flex;
                                align-items: center; 
                                i{
                                    font-size: 22px;
                                    color: #cacaca;
                                    margin: 0 7px 0 0;
                                    width: 30px; 
                                }
                            }
                            .dot{
                                width: 30px;   
                                margin: 0 7px 0 0; 
                                position: relative;
                                z-index: 1;
                                &:after{
                                    content:'';
                                    width: 5px;
                                    height: 5px;
                                    position: absolute;
                                    left: 50%;
                                    top: 50%; 
                                    margin-top: -2.5px;
                                    margin-left: -2.5px;
                                    background:  #CACACA;
                                    border-radius: 50%;
                                }
                            }
                            .des{
                                font-size: 16px;
                                color: #202020;
                                flex: 1 1 auto;
                                span{
                                    font-size: 12px;
                                    color: #9C9C9C;
                                }
                            }
                            .link{
                                i{
                                    color: #9C9C9C;   
                                    font-size: 18px; 
                                }
                            }
                            &:last-child{
                                border-bottom: none;
                            }
                        }
                        .active{
                            .i-play{
                                i{
                                    color: #F87F5B;
                                }
                            }
                            .des{
                                p{
                                        color: #F87F5B;    
                                }
                            }
                        }
                    }
                }
                .main-content{
                    background:#fff;
                    padding: 10px 14px;
                    word-wrap: break-word;
                }
            } 
        }  
        .intro-bottom{
            display: flex;
            justify-content: space-between;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            z-index: 2;
            height: 49px;
            align-items: center;
            line-height: 49px;
            a{
                
                text-align: center;
                display: block;
                height: 100%;
                font-family: PingFangSC-Regular;
                &:first-child{
                    width: 99px;
                    background: #F8EBE7;
                    color: #202020;
                }
                &:last-child{
                    flex: 1 1 auto;
                    background: #F87F5B;
                    color: #fff;
                }
                em,span{
                    font-size: 17px;
                }
                i{
                    font-size: 18px;
                }
            }
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
            loading:true,
            detail:'',                                                           //详情 
            classList:'',                                                        //课程列表 
            price:'',                                                            //课程价格  
            playing:false,                                                       //是否播放  
            mediaUrl:'',                                                         //音频路径 
            shareData:{                                                          //微信分享自定义内容
                title: '因为关注，所以专业',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台',
                link: 'http://m.maicai360.cn'+this.$route.path + '?id='+this.$route.query.id,
                success(a){
                    //a.recordShare();         
                }
            },
            appShareData:{
                targetUrl:'http://m.maicai360.cn'+this.$route.path + '?id='+this.$route.query.id,
                thumbImageUrl:'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                title:'因为关注，所以专业',
                content:'旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台'    
            },
            isSelfApp: u.indexOf('maicai360_app') > -1 ,
            classId:''                                                            
        }    
    },
    //定义这个sweiper对象  
    computed: { 
    },  
    mounted() {
        if(this.$route.query.id){
            this.getDetail(this.$route.query.id,0);
        }
        this.toOpenApp();
    },
    methods:{
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
        //获取课程详情
        getDetail(id,uid){
            this.$http.get('http://api.51wctt.com:50010/CourseMaster/Details',{params:{
                    id: id,
                    uid: uid
                }})
            .then((response)=>{
                this.loading = false;
                if(response.data && response.data.code == '200'){
                    this.detail = response.data.data.master?response.data.data.master:null;
                    this.classList = response.data.data.classList?response.data.data.classList:null;
                    //Price 正常价格 SpecialPrice 优惠价格（优惠价格大于0 取优惠价格）
                    if(this.detail){
                        if(this.detail.Course){ 
                            this.shareData.title =  this.detail.Course;
                            this.appShareData.title =  this.detail.Course;
                        }
                        if(this.detail.Describe){
                            this.shareData.desc = this.detail.Describe.replace(/<[^>]+>/g,"");
                            this.appShareData.content = this.detail.Describe.replace(/<[^>]+>/g,"");
                            if(this.shareData.desc!=""){
                                this.shareData.desc = this.shareData.desc.substr(0,100);
                                this.appShareData.content = this.appShareData.content.replace(/<[^>]+>/g,"");
                            }else{
                                this.shareData.desc = '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台';
                                this.appShareData.content = this.shareData.desc;
                            } 
                        }
                        if(this.detail.Cover){   
                            this.appShareData.thumbImageUrl = this.detail.Cover;    
                        }
                        if(this.detail.SpecialPrice && this.detail.SpecialPrice > 0){
                            this.detail.price = this.detail.SpecialPrice;
                        }else{
                            this.detail.price = this.detail.Price;
                        }
                        this.getConfig(this.shareData);
                        if(this.isSelfApp){
                            var that = this;
                            that.appShareDetail(that.appShareData.targetUrl,that.appShareData.thumbImageUrl,that.appShareData.title,that.appShareData.content);
                        }
                    }
                    if(this.classList){
                        this.classList.forEach((item,index)=>{
                            if(index == 0 && item.IsFree == 1){
                                this.mediaUrl =  item.Media;   
                            }
                        });
                    }
                }
            }, (response)=>{
                console.log(response.data);
            });    
        },
        //设置点击播放按钮方法
        togglePlaying(){
            this.playing = !this.playing;                       //改变全局变量playing 的属性
        }, 
        //通过app分享
        appShareDetail(targetUrl,thumbImageUrl,title,content){
            if(isAndroid){
                window.WCJSBridge.setShareOfActivity(targetUrl,thumbImageUrl, title, content);                                         
            }else if(isIOS){
                WCJSBridge.setShareOfActivity(targetUrl,thumbImageUrl, title, content);    
            }
        },
        //打开app下载
        toOpenApp(){
            let openArr = this.$el.querySelectorAll('.open');
            if(isAndroid){
                for(let i=0;i<openArr.length;i++){
                    openArr[i].setAttribute('href','http://app.51wctt.com/APP/Download');
                }
            }else if(isIOS){
                for(let j=0;j<openArr.length;j++){
                    openArr[j].setAttribute('href','https://itunes.apple.com/cn/app/wangcaiyouliao/id1361931749');    
                }
            } 
        }
    },
    // 然后watch 监听playing 操作实际的audio 标签的播放暂停
    watch:{
        playing(newPlaying){
            let audio = this.$refs.audio;
            this.$nextTick(() => {
                newPlaying ? audio.play():audio.pause();
            })
        }
    }   
}
</script>