<template>
    <v-content class="express-list-w">
        <div class="express-fixed-bar">
            <a href="javascript:;" class="bar-detail">
                <div class="bar-detail-logo">
                    <img src="https://p.maicai360.cn/img/get/20180417/24067636595564069687567_png">
                    <p>旺材有料</p>
                </div>
                <a href="javascript:;" class="open">立即打开</a>
            </a>
        </div>
        <div class="express-list">
            <div class="list-main">
                <div class="main-cover">
                    <span>
                        <img :src="ExpNewsBanner">
                    </span>
                    <p>工程那些事儿</p>
                </div>
                <div class="main-info">
                    <!-- <div class="info-detail">
                        <dl>
                            <dt>
                                <i class="ljh5-icons ljh5-bofang1"></i>
                                <span>播放全部</span>
                            </dt>
                            <dd>
                                已更新{{count}}条
                            </dd>
                        </dl>
                        <p class="sort">
                            <i>
                                <img src="../../libs/static/images/icon/icon_daoxu.png" alt="">
                            </i>
                            <span>倒序</span>
                        </p>
                    </div> -->
                    <div class="info-list">
                        <ul class="list">
                            <li class="item" :class="playing && cur_music ==index ? 'active':''"  v-for="(item,index) in list" >
                                <button class="i-play"  @click="clickPlay(index)"  :data-index="index">
                                    <i class="ljh5-icons " :class="playing && cur_music ==index ?'ljh5-zanting':'ljh5-bofang1'"></i>
                                    <div class="des">
                                        <p>{{item.Title}}</p>
                                        <span>{{item.CreateTime.split(' ')[0].replace(/\//g,'-')}}    时长{{item.TimeLong}}    </span>
                                    </div>
                                </button>
                                <a :href="'/ExtraOfAct/expressShare?id='+item.ID" class="link">
                                    <i class="ljh5-icons ljh5-wengao"></i>    
                                </a>
                            </li>
                        </ul> 
                        <audio ref="audio" v-if="isShow" src="" ></audio> 
                    </div>
                </div>
            </div>
        </div>
    </v-content>
</template>
<style lang="less">
    @import '../../libs/static/less/validation.less';
    @import '../../libs/static/less/mixins.less';
    .express-list-w{
        .express-fixed-bar{
            z-index: 100;
        }
        .express-list{
            position: relative;
            z-index: 1;
            top:43px;
            .list-main{
                .main-cover{
                    position: relative;
                    z-index: 1;
                    span{
                        display: block;
                        height: 0;
                        padding: 0 0 48%;
                        overflow: hidden;
                    }
                    p{
                        font-family: PingFang-SC-Medium;
                        font-size: 17px;
                        color: #FFFFFF;
                        position: absolute;
                        left: 14px;
                        bottom: 14px;
                        .multi-ellipsis(1);
                    }
                }
                .main-info{
                    .info-detail{
                        padding:7px 14px;
                        color: #717171;
                        display: flex;
                        justify-content: space-between;
                        dl{
                            .flex();
                            justify-content: flex-start;
                            dt{
                                margin: 0 7px 0 0;
                                span{
                                    position: relative;
                                    z-index: 1;
                                    padding: 0 7px 0 0;
                                    font-size: 12px;
                                    &:after{
                                        content: '';
                                        position: absolute;
                                        z-index: 2;
                                        width: 2px;
                                        background:  #CACACA;
                                        height: 100%;
                                        right: 0;
                                        top: 0px;
                                    }
                                }
                            }
                        }
                        .sort{
                            font-size: 12px;
                            line-height: 26px;
                            display: flex;
                            align-items: center;
                            i{
                                width: 16px;
                                line-height: 16px;
                                margin: 0 4px 0 0;
                            }
                        }
                    }
                    .info-list{
                        .list{
                            .item{
                                padding:10px 14px;
                                border-bottom: 1px solid #F2F2F2;
                                justify-content: space-between;
                                align-items: center;
                                line-height: 20px;
                                display: flex;
                                .i-play{
                                    border: none;
                                    background: none;
                                    display: flex;
                                    flex: 1 1 auto;
                                    align-items: center; 
                                    i{
                                        font-size: 22px;
                                        color: #cacaca;
                                        text-align: left;
                                        width: 30px; 
                                    }
                                }
                                .des{
                                    font-size: 16px;
                                    color: #202020;
                                    flex: 1 1 auto;
                                    text-align: left;
                                    p{
                                        margin: 0 0 4px 0;
                                        .multi-ellipsis(1);
                                    }
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
            curIndex:'',
            curFlag: true,
            cur_music: '',
            list:'',
            ExpNewsBanner:'',                                                            //列表   
            count:'',                                                            //数目 
            musicList:[],
            isShow:false ,
            playing: false,
            tempIndex:  '',
            shareData:{                                                 //微信分享自定义内容
                title: '知行学院 | 工程那些事儿',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '了不起的工程师尽在“工程那些事儿”',
                link: 'http://m.maicai360.cn'+this.$route.path ,
                success(a){
                    //a.recordShare();         
                }
            }                                                            
        }    
    },
    //定义这个sweiper对象  
    computed: {
    },  
    components: {
    },
    mounted() {
        this.getExpressList(1,1);
        this.getConfig(this.shareData);
        this.toOpenApp();
    },
    updated () {
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
        getExpressList(page,sort){
           this.$http.get('http://api.51wctt.com:50010/ExpNews/List',{params:{
                    pageIndex: page,
                    sortType: sort
                }})
            .then((response)=>{
                if(response.data.code == 200){
                    this.ExpNewsBanner = response.data.data.ExpNewsBanner;
                    if(response.data.data.list){
                        this.list = response.data.data.list;
                        this.list.forEach(element => {
                        let obj = {
                                title:element.Title,
                                url:element.Media
                            }
                            this.musicList.push(obj);
                        });
                        this.isShow=true; 
                    }
                    this.count = response.data.data.count;
                }
            }, (response)=>{
                console.log(response.data);
            });
        },
        play(){
            this.$refs.audio.play();
        },
        clickPlay(index){
            this.cur_music= index;
            // 切换时视图刷新是异步的，所以需要在刷新后执行播放方法
            this.$nextTick(
                ()=>{
                    this.$refs.audio.src=this.musicList[index]['url'];
                    this.$refs.audio.currentTime = 10;
                    if(!this.playing||this.tempIndex!=this.cur_music){
                        this.tempIndex = index; //记录在播放的音频文件是那个
                        this.$refs.audio.play();
                        this.playing = true;
                    }else{
                        this.$refs.audio.pause();
                        this.playing = false;
                    }
                }
            )
        }
    }   
}
</script>