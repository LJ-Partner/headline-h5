<template>
    <v-content class="express-share-c">
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="express-fixed-bar" v-show="!loading">
            <a href="javascript:;" class="bar-detail">
                <div class="bar-detail-logo">
                    <img src="https://p.maicai360.cn/img/get/20180417/24067636595564069687567_png">
                    <p>旺材有料</p>
                </div>
                <a href="javascript:;" class="open">立即打开</a>
            </a>
        </div>
        <v-main class="express-share-w"  v-show="!loading">
            <div class="express-main" v-if="expressDetail">
                <div class="main-info">
                    <div class="info-top">
                        <h1 v-if="expressDetail.Title">{{expressDetail.Title}}</h1>
                        <p>
                            <a><img src="https://p.maicai360.cn/img/get/20180716/27216636673367717966665_jpg"></a>
                            <span>工程那些事儿</span>
                        </p>
                    </div>
                    <div class="info-audio">
                        <div class="audio-container">
                            <div class="player-wrap" id="playerWrap">
                                <button class="i-play" @click="togglePlaying">
                                    <i class="ljh5-icons " :class="playing?'ljh5-zanting':'ljh5-bofang1'"></i>
                                </button>
                                <div class="play-progress">
                                    <div class="progress-title">{{expressDetail.Title}}</div>
                                     <div class="progress-wrap">  
                                        <v-progressBar :percent="percent" @percentChange="setProgress"></v-progressBar>  
                                        <div class="time-group">
                                            <span class="time time-l">{{format(currentTime)}}</span>  
                                            <span class="time time-r">{{format(duration)}}</span> 
                                        </div> 
                                    </div>  
                                </div>
                                <audio class="audio" v-show="expressDetail.Media" :src="expressDetail.Media" ref="audio" @timeupdate="updateTime" @ended="end"  @loadedmetadata="loadedmetadata" preload></audio>
                            </div>
                        </div>
                    </div>  
                    <div id="articleCont" ref="cont" class="info-text" v-show="expressDetail.ContentNew" v-html="expressDetail.ContentNew" :class="{'fold': isContFold}"></div>
                    <transition name="articledetail-fade-out">
                        <div class="show-full" v-on:click="showFull" v-if="isFold"><span><i></i>点击展开全文</span></div>
                    </transition> 
                </div> 
            </div>
            <v-empty v-else class="course-share-empty" v-bind:emptycont="'相关内容已不存在'"></v-empty>
        </v-main>
    </v-content>
</template>
<style lang="less">
    @import '../../libs/static/less/validation.less';
    @import '../../libs/static/less/mixins.less';
    .express-share-c{
        height: 100%;
    }
    img{
        max-width: 100%;
        width: 100%;
    }
    .express-fixed-bar{
        a,button,input,textarea,div{
            -webkit-tap-highlight-color:rgba(255,255,255,0);
            -webkit-appearance:none;
            outline:none;
        }
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1;
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
    .express-share-w{
        //background: #F2F2F2;
        top: 42px;
        bottom: 0;
        z-index: 1;
        padding: 0;
        p{
            word-break: break-all;
            word-wrap: break-word;
        }
        .express-main{
            position: relative;
            z-index: 1;
            .main-info{
                .info-top{
                    border: 1px solid #F2F2F2; 
                    background: #fff;
                    h1{
                        font-size: 24px;
                        color: #202020;   
                        padding: 10px 14px; 
                    }
                    p{
                        font-size: 18px;
                        color: #717171;    
                        padding: 0 14px 10px 14px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        a{
                            width: 35px;
                            height: 35px;
                            margin-right: 10px;
                            border-radius: 50%;
                            img{
                                border-radius: 50%;
                            }
                        }
                    }
                }
                .info-audio{
                    padding: 14px;
                    background: #fff;
                    .audio-container{
                        border: 1px solid #f2f2f2;  
                        height: 64px;
                        box-sizing: border-box;  
                        background: #fff;   
                        .flex();
                        .player-wrap {
                            .flex();
                            justify-content: flex-start;
                            background: #f2f2f2;
                            .i-play{
                                border: none;
                                flex: 0 0 65px;
                                width: 65px;
                                margin: 0 15px 0 0;
                                background: #f2f2f2;
                                i{
                                    font-size: 40px;
                                    color: #F87F5B;
                                }
                            }
                            .play-progress{
                                flex: 1 1 auto;
                                margin: 0 18px 0 0;
                                .progress-title{
                                    padding: 2px 0;
                                    .multi-ellipsis(1);
                                } 
                                .progress-wrap{
                                    .time-group{
                                        display: flex;
                                        justify-content: space-between;
                                        flex-direction: row;
                                    }
                                }
                                input[type=range] { 
                                    outline: none;   
                                    -webkit-appearance: none;/*清除系统默认样式*/    
                                    width:100% !important;    
                                    background: -webkit-linear-gradient(#F87F5B, #F87F5B) no-repeat, #ddd;    
                                    background-size: 0 100%;/*设置左右宽度比例*/    
                                    height: 3px;/*横条的高度*/ 
                                    position: relative;
                                    z-index: 1;
                                    top: -10px;
                                }
                                 /*拖动块的样式*/    
                                input[type=range]::-webkit-slider-thumb {    
                                    -webkit-appearance: none;/*清除系统默认样式*/    
                                    height:10px;/*拖动块高度*/    
                                    width: 10px;/*拖动块宽度*/    
                                    background: #F87F5B;/*拖动块背景*/    
                                    border-radius: 50%; /*外观设置为圆形*/    
                                    border: solid 1px #F87F5B; /*设置边框*/   
                                }
                                .progress-range{
                                    &:before{
                                        position: absolute;
                                        top: 12px;
                                        font-size: 12px;
                                        left: 0;
                                        content: attr(data-current);
                                        color: #b1b1b1;
                                    }
                                    &:after{
                                        position: absolute;
                                        top: 12px;
                                        font-size: 12px;
                                        right: 0;
                                        content: attr(data-max);
                                        color: #b1b1b1;
                                    }
                                }   
                            }
                        } 
                    }
                }
                .info-text{
                    padding: 10px 14px;
                    background: #fff;
                    border-bottom:  1px solid #D8D8D8;
                    position: relative;
                    z-index: 1;
                }
                .fold {
                    position: relative;
                    max-height: 600px;
                    overflow: hidden;
                    transition: max-height .32s cubic-bezier(.95, .05, .795, .035), -webkit-mask-size .22s cubic-bezier(.95, .05, .795, .035);
                    transition: mask-size .22s cubic-bezier(.95, .05, .795, .035), max-height .32s cubic-bezier(.95, .05, .795, .035);
                    transition: mask-size .22s cubic-bezier(.95, .05, .795, .035), max-height .32s cubic-bezier(.95, .05, .795, .035), -webkit-mask-size .22s cubic-bezier(.95, .05, .795, .035);
                    -webkit-mask-image: linear-gradient(#000 calc(100% - 30px), transparent);
                    mask-image: linear-gradient(#000 calc(100% - 30px), transparent);
                    -webkit-mask-size: 100% 100%;
                    mask-size: 100% 100%;
                }
                .articledetail-fade-out-leave-active {
                    -ms-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -moz-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -webkit-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -o-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                }
                .articledetail-fade-out-enter, .articledetail-fade-out-leave-active {
                    opacity: 0;
                    -ms-transform: translateY(20px);
                    -moz-transform: translateY(20px);
                    -webkit-transform: translateY(20px);
                    -o-transform: translateY(20px);
                    transform: translateY(20px);
                }
                .show-full {
                    display: block;
                    text-align: center;
                    border-top: 1px solid #d8d8d8;
                    margin: 20px auto 10px;
                    span {
                        display: inline-block;
                        text-align: center;
                        font-size: 15px;
                        color: @color-blue;
                        line-height: 30px;
                        padding: 0 20px;
                        position: relative;
                        background: #fff;
                        top: -15px;
                        i {
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                            background: @color-blue;
                            .border-radius(50%);
                            position: relative;
                            top: 2px;
                            margin-right: 5px;
                            &:after {
                                content: "";
                                display: inline-block;
                                width: 5px;
                                height: 5px;
                                border-right: 1px solid @color-white;
                                border-bottom: 1px solid @color-white;
                                .rotate(45deg);
                                position: absolute;
                                left: 5px;
                                top: 4px;
                            }
                        }
                    }
                }
            }
        }
        .pull-up{
            height: 0;
        }
    }
    .express-share-empty{
        .flex-column();
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        height: 100%;
        background: #fff;
        align-items: center;
        img{
            width: 80%;
            margin: 10px auto;
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
            isFold: false,                                              //显示部分内容
            isContFold: false,
            showpartSpace: true, 
            showpartTimes: 0,
            loading:true,
            percent:'',
            dataSize:[],
            duration: 0,                                                //播放总时长
            currentTime:0,                                              //播放时间
            playing:false,                                              //是否播放
            userId: '',                                                 //用户id  
            expressDetail:'',                                            //课程详情 
            shareData:{                                                 //微信分享自定义内容
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
            isSelfApp: u.indexOf('maicai360_app') > -1                                                                 
        }    
    },
    //定义这个sweiper对象  
    computed: {
    },  
    mounted() {
        if(Storage.get("ljh5user")){
            this.userId = Storage.get("ljh5user").user_id;
        }
        if(this.$route.query.id){
            this.getexpressDetail(this.$route.query.id);
        }
        this.$nextTick(() =>{
            let self = this;
            wx.ready(function () {
                let _audio = new Audio();
                _audio.src = self.expressDetail.Media; //audio链接
                _audio.addEventListener('loadedmetadata', function() {
                    self.duration = _audio.duration;
                });
            });
        });
        this.toOpenApp();
    },
    updated () {
        this.$nextTick(() =>{
            let self = this;
            if(self.$el.querySelector('.info-text')){
                if(self.showpartTimes <= 0){
                    self.loading = false;
                    let articleCont = self.$el.querySelector('.info-text');
                    this.text = articleCont.offsetHeight;
                    if(articleCont.offsetHeight > 600){
                        self.isFold = true;
                        self.isContFold = true;
                        self.showpartTimes++;
                    } else {
                        self.isFold = false;
                        self.isContFold = false;
                    }
                }
            }
        })
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
        },
        //获取那些事儿详情
        getexpressDetail(id){
            this.$http.get('http://api.51wctt.com:50010/ExpNews/Share',{params:{
                    id: id
                }})
            .then((response)=>{
                this.loading = false;
                if(response.data && response.data.code == '200'){
                    this.expressDetail = response.data.data;
                    if(this.expressDetail.Title){ 
                        this.shareData.title =  this.expressDetail.Title;
                        this.appShareData.title =  this.expressDetail.Title;
                    }
                    if(this.expressDetail.ContentNew){
                        this.shareData.desc = this.expressDetail.ContentNew.replace(/<[^>]+>/g,"");
                        this.appShareData.content = this.expressDetail.ContentNew.replace(/<[^>]+>/g,"");
                        if(this.shareData.desc!=""){
                            this.shareData.desc = this.shareData.desc.substr(0,100);
                            this.appShareData.content = this.appShareData.content.replace(/<[^>]+>/g,"");
                        }else{
                            this.shareData.desc = '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台';
                            this.appShareData.content = this.shareData.desc;
                        } 
                    }
                    this.getConfig(this.shareData);
                    if(this.isSelfApp){
                        var that = this;
                        that.appShareDetail(that.appShareData.targetUrl,that.appShareData.thumbImageUrl,that.appShareData.title,that.appShareData.content);
                    }
                    console.log(this.shareData)
                    console.log(this.appShareData)
                }
            }, (response)=>{
                console.log(response.data);
            });    
        },  
        //设置点击播放按钮方法
        togglePlaying(){
            this.playing = !this.playing;                       //改变全局变量playing 的属性
        },
        format(interval){
            interval = interval | 0;
            const minute = interval/60 | 0;
            const second = this._pad(interval % 60);
            return `${minute}:${second}`;      
        },
        //补零
        _pad(num,n=2){
            let len = num.toString().length;
            while(len<n){
                num = '0' + num;
                len ++;
            }
            return num;
        },
        updateTime(e){
            this.currentTime = e.target.currentTime;                                                                    // 获取当前播放时间段
            this.percent = Math.min(1, this.currentTime / this.duration); 
        },
        // 设置进度  
        setProgress(percent) {  
            // 根据子组件传过来的百分比设置播放进度  
            this.$refs.audio.currentTime = this.duration * percent;
            // 拖动后设置歌曲播放  
            if (!this.playing) {  
                this.togglePlaying()  
            }  
        }, 
        //加载获取音频总时长 
        loadedmetadata(res){
            this.duration = parseInt(res.target.duration);
        },
        //音频播放完处理
        end(e){
            this.reset();
        },
        //音频相关参数重置
        reset(){
            this.playing = false;
            this.currentTime = '0';
            this.percent = Math.min(1, this.currentTime / this.duration); 
        },
        showFull() {
            let self = this;
            this.isFold = false;
            this.slowShowCont = setTimeout(function(){
                self.isContFold = false;
            },500);
        },
    },
    // 然后watch 监听playing 操作实际的audio 标签的播放暂停
    watch:{
        playing(newPlaying){
            let audio = this.$refs.audio;
            this.$nextTick(() => {
                newPlaying ? audio.play():audio.pause();
            })
        }
    },    
}
</script>