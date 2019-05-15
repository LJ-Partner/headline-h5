<template>
    <v-content>  
       <v-startup></v-startup>
        <v-header v-bind:is-back="false">
            <v-toptab></v-toptab>
        </v-header>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-main class="main-article" v-if="!loading" :bottom-method="pullArticles" ref="bottom" :class="{'empty-main-wrap': !lists.Articles || lists.Articles.length <= 0,'recPull':!pullFlag}">   
           
            <div class="article-list" v-if="lists.Articles && lists.Articles.length > 0">
                <div class="article-item" v-for="item in lists.Articles">
                    <figure class="article layout2" v-if="item.showtype == '2'">
                        <div class="panel">
                            <a :href="'/article/detail/'+item.id+'/'+type"><h3>{{item.title}}</h3></a>
                            <p>
                                <label class="label" :class="'mark' + item.isorigin" v-if="item.isorigin && item.isorigin != '' && item.isorigin != '0'"></label>
                                <a :href="'/article/author/' + item.author_id" class="attach-label author">{{item.author}}</a>
                                <label class="attach-label hide"><i class="ljh5-icons ljh5-guanzhu"></i>{{item.comments_count}}</label>
                                <label class="attach-label">{{item.date.split(' ')[0].replace(/\//g,'-')}}</label>
                            </p>
                        </div>
                        <div class="show" v-if="item.iscover=='1' && item.cover_url && item.cover_url != ''">
                            <a :href="'/article/detail/'+item.id+'/'+type"><img :src="item.cover_url" /><span class="i-video-play" v-if="curCategory == '223'"></span></a>
                        </div>
                    </figure>
                    <figure class="article" v-else>
                        <a :href="'/article/detail/'+item.id+'/'+type">
                            <h3>{{item.title}}</h3>
                            <div class="show" v-if="item.iscover=='1' && item.cover_url && item.cover_url != ''">
                                <img :src="item.cover_url" v-if="item.iscover=='1'"/>
                                <span class="i-video-play" v-if="curCategory == '223'"></span>
                            </div>
                        </a>
                        <p>
                            <label class="label" :class="'mark' + item.isorigin" v-if="item.isorigin && item.isorigin != ''&& item.isorigin != '0'"></label>
                            <a :href="'/article/author/' + item.author_id" class="attach-label author">{{item.author}}</a>
                            <label class="attach-label hide"><i class="ljh5-icons ljh5-guanzhu"></i>{{item.comments_count}}</label>
                            <label class="attach-label">{{item.date.split(' ')[0].replace(/\//g,'-')}}</label>
                        </p>
                    </figure>
                </div>
                <div v-show="!flag" v-on:click="getArticles(url)" class="click-refresh">点击刷新</div>  
            </div>
            <v-empty v-show="flag" v-else v-bind:emptycont="'暂无相关内容'"></v-empty> 
        </v-main>
        <v-layoutad v-bind:ad-interval="7" v-bind:cur-cat="curCategory" v-bind:ad-cat="'4'" v-bind:ad-link="'/activity/detail/30/2'" v-bind:ad-img="'https://p.maicai360.cn/img/get/20180119/41366636519532726189461_jpg'"></v-layoutad>
        <transition name="vote-fade-out">
            <div class="ljh5-ad-layout" v-if="downShowMask == 1">
                <div class="ad-wrap">
                    <div class="ad-cont">
                        <a href="http://app.51wctt.com/" class="down-pic"><img src="https://p.maicai360.cn/img/get/20180327/10147636577406476006351_png"></a>
                        <i class="ljh5-icons ljh5-chacha close" v-on:click="close_downMask"></i>
                    </div>
                </div>
            </div>
        </transition>
        <!--<v-layoutad v-bind:ad-interval="7" v-bind:cur-cat="curCategory" v-bind:ad-cat="'43'" v-bind:ad-link="'/activity/detail/24/2'" v-bind:ad-img="'http://p.maicai360.cn/img/get/20170908/67078636404710271584962_png'"></v-layoutad>-->
         
        <v-footer></v-footer>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.recPull{
    .pull-up{
        display: none;
    }
}
.main.main-article {
    top: 81px;
    .pub-empty{
        p{
            padding: 0;
        }
    }
}
.article-recTip{
    position: relative;
    z-index: 1;
    top: 81px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #dae8f5;
}
.click-refresh{
    text-align: center;
    color: #4389c7;
    padding: 10px 0;
}
.article-list {
    padding-top: 3px;
}
.article-item {
    &:last-child {
        .article {
            border: 0;
        }
    }
}
.article {
    padding: 10px 0px;
    .border-bottom();
    a {
        display: block;
        color: @list-title-color;
        &:visited {
            color: @list-title-color;
            h3 {
                color: @list-subinfo-color;
            }
        }
        &:hover,&:active {
            color: @list-title-color;
        }
    }
    h3 {
        .list-title();
        display: block;
        margin:0 0 8px;
    }
    .show {
        width: 100%;
        position: relative;
        .i-video-play {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background: url(/assert/dist/images/btn_video_play.png) no-repeat 50%;
            background-size: 50px;
        }
    }
    img {
        width: 100%;
        display: block;
        margin-bottom: 10px;
    }
    p {
        .list-subinfo();
        font-size: 10px;
    }
    .label {
        .border-radius(3px);
        display: inline-block;
        padding:3px 3px 0;
        margin-left: -3px;
        margin-right: 0;
        font-size: 10px;
        line-height: 10px;
        -webkit-transform: scale(0.7,0.7);
        -moz-transform: scale(0.7,0.7);
        -ms-transform: scale(0.7,0.7);
        -o-transform: scale(0.7,0.7);
        transform: scale(0.7,0.7);
        &.mark0 {
            border: 0;
            display: none;
            padding: 0;
            margin: 0;
            &:after {
                content:"";
                display: none;
            }
        }
        &.mark1 {
            color:#f39800;//金橙
            border:1px solid #f39800;
            &:after {
                content:"原创";
            }
        }
        &.mark2 {
            color:#e60039;//红--火热
            border:1px solid #e60039;
            &:after {
                content:"热门";
            }
        }
        &.mark3 {
            color:#4d81ad;//灰蓝
            border:1px solid #4d81ad;
            &:after {
                content:"广告";
            }
        }
        &.mark4 {
            color:#e60039;//红//紫--高贵7000e2
            border:1px solid #e60039;
            &:after {
                content:"精华";
            }
        }
        &.mark5 {
            color:#ea5504;//橙
            border:1px solid #ea5504;
            &:after {
                content:"价格";
            }
        }
        &.mark6 {
            color:#ea5504;//橙
            border:1px solid #ea5504;
            &:after {
                content:"行情";
            }
        }
        &.mark7 {
            color:#4d81ad;//灰蓝
            border:1px solid #4d81ad;
         
            &:after {
                content:"图集";
            }
        }
    }
    .attach-label {
        .list-subinfo();
        font-size: 10px;
        color: #999999;
        display: inline-block;
        margin-right: 5px;
        .ljh5-guanzhu {
            font-size: 14px;
            margin-right: 2px;
            position: relative;
            top: 2px;
        }
        &.author {
            //color: #2ea9df;
            color: #999999;
        }
        &.hide {
            display: none;
        }
    }

    &.layout2 {
        .flex();
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding: 14px 0;
        .panel {
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            .flex-column();
            justify-content: space-between;
            -webkit-justify-content: space-between;
            h3 {
                margin-top: -4px;
                .multi-ellipsis(2);
            }
            p {
                margin-bottom: -4px;
            }
        }
        .show {
            flex: 0 0 115px;
            -webkit-flex: 0 0 115px;
            align-self: flex-start;
            max-height: 72px;
            overflow: hidden;
            margin-left: 10px;
            position: relative;
            img {
                margin: 0;
            }
        }
    }
}
.ljh5-ad-layout{
    .ad-wrap{
        .ad-cont{
            .down-pic{
                img{
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import wx from 'weixin-js-sdk'
import Storage from 'store'
export default {       
        data(){
            return {
                downShowMask: 0,                      //下载弹窗
                lists:{},
                loading:true,
                type: 1,        //推荐1 普通2
                page:1,
                flag: true,
                pullFlag: true,
                total:0,
                recCid:"",
                shareData:{     //微信分享默认内容
                    title: '因为关注，所以专业',
                    imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                    desc: '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台',
                    link: 'https://m.maicai360.cn'+this.$route.path
                },
                recParams:{},
                url:"",
                //curCategory: this.$route.params.type ? this.$route.params.type : "245" //当前分类，用于显示定向Ad
                curCategory: this.$route.params.type ? this.$route.params.type : "287" //当前分类，用于显示定向Ad
            }
        },
        mounted () {
            if(this.curCategory=="287"){
                this.url = API.articleRecommend;
                let type = this.$route.params.type ? this.$route.params.type : "287";
                if (!Storage.get("ljh5user") && !Storage.get("cid")) {
                    this.getRecCid();
                }else if(!Storage.get("ljh5user") && Storage.get("cid")){
                    this.recCid = Storage.get("cid");
                    this.recParams.user_id = "";
                    this.recParams.cid = Storage.get("cid")?Storage.get("cid"):"";
                    this.getArticles(this.url);
                    //this.getHisArticles(this.recCid);
                }else{
                    let user = Storage.get("ljh5user");
                    this.user_id = user.user_id;
                    this.recParams.user_id = Storage.get("ljh5user")?Storage.get("ljh5user").user_id:"";
                    this.recParams.cid = "";
                    //this.getRecArticles(this.recCid);
                    //this.getHisArticles(this.recCid);
                    this.getArticles(this.url);
                }
                this.type = 1;
                this.flag = false;
            }else{
                this.type = 2;
                this.url = API.acticles;
                let type = this.$route.params.type ? this.$route.params.type : "287";
                this.url = API.acticles + "/" + type;
                this.getArticles(this.url);
            }
            this.$store.dispatch('set_article_num',this.$route.params.type);
            this.$store.dispatch('set_channel_cur','article');
            this.getConfig(this.shareData);
            if(this.curCategory != '4'){
                this.showPop();
            }
        },
        methods: {
            //显示弹框
            showPop(){
                sessionStorage.setItem('downShow',1);
                this.downShowMask = sessionStorage.getItem('downShow');
            },
            close_downMask(){
                this.downShowMask = 0;
            },
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
            pullArticles(){
                if(this.page==0){
                    this.page=1;
                } else {
                    this.page++;
                }
                let url;
                let type = this.$route.params.type ? this.$route.params.type : "287";
                let cid = this.recCid;
                if(this.curCategory=="287"){
                    this.pullFlag = false;
                   
                }else{
                    url = API.acticles;
                    url = API.acticles + "/" + type + "/" + this.page;
                    this.$http.get(url)
                    .then((response)=>{
                        //console.log(response.data);
                        this.loading = false;
                        if(response.data && response.data.Articles && response.data.Articles.length > 0) {
                            for(var key in response.data.Articles){
                                this.lists.Articles.push(response.data.Articles[key]);
                            }
                            this.page = response.data.page;
                            this.total = response.data.total;
                        } else {
                            this.$refs.bottom.clearTranslate();
                            this.total = response.data.total;
                        }
                    }, (response)=>{
                        this.loading = false;
                        console.log(response.data);
                    });
                }
                this.$refs.bottom.setTranslate(-10,'玩命加载中...');
            },
            getArticles(url){
                this.loading = true;
                this.$http.get(url,{params:{user_id:this.recParams.user_id,cid:this.recParams.cid}})
                .then((response)=>{
                    //console.log(response.data);
                    this.loading = false;
                    this.lists = response.data;
                    this.page = response.data.page;
                    this.total = response.data.total;
                }, (response)=>{
                    this.loading = false;
                    console.log(response.data);
                });
            },
            //获取推荐cid
            getRecCid(){
                this.$http.get(API.artRecCid)
                .then((response)=>{
                   this.recCid = response.data.cid;
                   Storage.set("cid",this.recCid);
                   this.recParams.cid = Storage.get("cid")?Storage.get("cid"):"";
                   this.recParams.user_id = "";
                   this.getArticles(this.url);
                   //this.getRecArticles(this.recCid);
                   //this.getHisArticles(this.recCid);
                }, (response)=>{
                    console.log(response.data);
                });
            },
            //获取推荐文章
            getRecArticles(cid){
                let url = API.articleRecommend;
                let type = this.$route.params.type ? this.$route.params.type : "287";
                url = API.articleRecommend + "/" + type;
                this.loading = true;
                this.$http.get(API.articleRecommend,{params:{user_id:Storage.get("ljh5user")?Storage.get("ljh5user").user_id:"",cid:cid}})
                .then((response)=>{
                    this.loading = false;
                    this.recLists = response.data;
                    this.page = response.data.page;
                    this.total = response.data.total;
                }, (response)=>{
                    this.loading = false;
                    console.log(response.data);
                });
            },
            //获取历史推荐文章
            getHisArticles(cid){
                this.loading = true;
                this.$http.get(API.articleHisRecommend,{params:{user_id:Storage.get("ljh5user")?Storage.get("ljh5user").user_id:"",cid:cid}})
                .then((response)=>{
                    this.loading = false;
                    this.lists = response.data;
                    this.page = response.data.page;
                    this.total = response.data.total;
                }, (response)=>{
                    this.loading = false;
                });
            }
        }
    }
</script>
