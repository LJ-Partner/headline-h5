<template>
    <v-content class="course-share-c">
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="course-fixed-bar" v-show="!loading">
            <a href="javascript:;" class="bar-detail">
                <div class="bar-detail-logo">
                    <img src="https://p.maicai360.cn/img/get/20180417/24067636595564069687567_png">
                    <p>旺材有料</p>
                </div>
                <a href="javascript:;" class="open">立即打开</a>
            </a>
        </div>
        <v-main class="course-share-w"  v-show="!loading">
            <div class="course-main" v-if="courseDetail && courseDetail != 'null'">
                <div class="main-info">
                    <div class="info-top">
                        <h1 v-if="courseDetail.Title">{{courseDetail.Title}}</h1>
                        <p v-if="courseDetail.CreateTime">{{(courseDetail.CreateTime)}}</p>  
                    </div>
                    <div class="info-audio">
                        <div class="audio-container">
                            <div class="player-wrap" id="playerWrap">
                                <button class="i-play" @click="togglePlaying">
                                    <i class="ljh5-icons " :class="playing?'ljh5-zanting':'ljh5-bofang1'"></i>
                                </button>
                                <div class="play-progress">
                                    <div class="progress-title">{{courseDetail.Title}}</div>
                                     <div class="progress-wrap">  
                                        <v-progressBar :percent="percent" @percentChange="setProgress"></v-progressBar>  
                                        <div class="time-group">
                                            <span class="time time-l">{{format(currentTime)}}</span>  
                                            <span class="time time-r">{{format(duration)}}</span> 
                                        </div> 
                                    </div>  
                                </div>
                                <audio class="audio" v-show="courseDetail.Media" :src="courseDetail.Media" ref="audio" @timeupdate="updateTime" @ended="end"  @loadedmetadata="loadedmetadata" preload></audio>
                            </div>
                        </div>
                    </div> 
                    <div id="articleCont" ref="cont" class="info-text" v-show="courseDetail.ContentNew" v-html="courseDetail.ContentNew" :class="{'fold': isContFold}"></div>
                     <transition name="articledetail-fade-out">
                        <div class="show-full" v-on:click="showFull" v-if="isFold"><span><i></i>点击展开全文</span></div>
                    </transition> 
                </div> 
            </div>
            <v-empty v-else class="course-share-empty" v-bind:emptycont="'相关内容已不存在'"></v-empty>
        </v-main>
    </v-content>
</template>
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
            text:'',
            isFold: false,                                              //显示部分内容
            isContFold: false,
            showpartTimes: 0,
            loading:true,
            percent:'',
            duration: 0,                                                //播放总时长
            currentTime:0,                                              //播放时间
            playing:false,                                              //是否播放
            userId: '',                                                 //用户id  
            courseDetail:'',                                            //课程详情   
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
    components: {
    },
    computed: {  
    },  
    mounted() {
        if(Storage.get("ljh5user")){
            this.userId = Storage.get("ljh5user").user_id;
        }
        if(this.$route.query.id){
            this.getCourseDetail(this.$route.query.id,0);
        }
        this.toOpenApp();
    },
    updated () {
        this.$nextTick(() =>{
            let self = this;
            if(self.$el.querySelector('.info-text')){
                if(self.showpartTimes <= 0){
                    self.loading = false;
                    let articleDetail = self.$el.querySelector('.info-text');
                    if(articleDetail.offsetHeight > 600){
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
        //打开app下载
        toOpenApp(){
            let openArr = this.$el.querySelectorAll('.open');
            var u = navigator.userAgent;
            //android终端                                     
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
            //ios终端                  
            var isIOS = u.indexOf("applewebkit");
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
        //通过app分享
        appShareDetail(targetUrl,thumbImageUrl,title,content){
            if(isAndroid){
                window.WCJSBridge.setShareOfActivity(targetUrl,thumbImageUrl, title, content);                                         
            }else if(isIOS){
                WCJSBridge.setShareOfActivity(targetUrl,thumbImageUrl, title, content);    
            }
        },
        //获取课程详情
        getCourseDetail(id,uid){
            this.$http.get('http://api.51wctt.com:50010/ExpNews/Share',{params:{
                    id: id,
                    uid: uid
                }})
            .then((response)=>{
                this.loading = false;
                if(response.data && response.data.code == '200'){
                    this.courseDetail = response.data.data;
                    if(this.courseDetail != null){
                        if(this.courseDetail.Title){ 
                            this.shareData.title =  this.courseDetail.Title;
                            this.appShareData.title =  this.courseDetail.Title;
                        }
                        if(this.courseDetail.ContentNew){
                            this.shareData.desc = this.courseDetail.ContentNew.replace(/<[^>]+>/g,"");
                            this.appShareData.content = this.courseDetail.ContentNew.replace(/<[^>]+>/g,"");
                            if(this.shareData.desc!=""){
                                this.shareData.desc = this.shareData.desc.substr(0,100);
                                this.appShareData.content = this.appShareData.content.replace(/<[^>]+>/g,"");
                            }else{
                                this.shareData.desc = '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台';
                                this.appShareData.content = this.shareData.desc;
                            } 
                        }
                    }
                    this.getConfig(this.shareData);
                    if(this.isSelfApp){
                        var that = this;
                        that.appShareDetail(that.appShareData.targetUrl,that.appShareData.thumbImageUrl,that.appShareData.title,that.appShareData.content);
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