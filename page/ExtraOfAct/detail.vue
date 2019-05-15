<template>
    <v-content>
        <div class="vote-detail-w">
            <div class="vote-detail-main" id="mainWrap">
                <article class="vote-detail">
                    <a class="covel" v-if="comDetail.img_uri"><img :src="comDetail.img_uri"> </a>
                    <h2>{{comDetail.company_name}}</h2>
                    <p class="vote-data">
                        <span class="total-num">
                            <i class="ljh5-icons ljh5-xin"></i>
                            {{comDetail.votes}}
                        </span>
                        <span class="total-ranking">
                            <i class="ljh5-icons ljh5-toupiao-paiming"></i>
                            {{comDetail.cur_ranking}}
                        </span>
                    </p>
                    <div class="vote-content" v-html="comDetail.introduction"></div>
                </article>
                <div class="vote-comment" id="voteComment">
                    <div class="detail-vote">
                        <a href="javascript:;" class="btn-vote" :class="!canVote?'disabled':''" v-on:click="toVote()">
                            <i class="ljh5-icons ljh5-toupiao"></i>
                        </a>
                        <p>投他一票</p>    
                    </div>
                    <!--
                    <h5 class="comment-header"><em>{{comDetail.comment_count}}</em>条评论</h5>
                    <div class="input-box-w">
                        <input type="text" class="input-box" v-model="user_comment" placeholder="请输入您的评论">
                        <button type="button" class="btn-comment" v-on:click="toComment()">评论</button>
                    </div>
                    <div class="comment-list" v-if="comDetail.comments && comDetail.comments!==null && comDetail.comments.length > 0">
                        <dl class="comment-box" v-for="(item,index) in comDetail.comments">
                            <dt>
                                <img :src="'/Api/V1/User/Avatar/'+item.user_id">
                            </dt>
                            <dd>
                                <div class="commenter-name">
                                    <p>{{item.user_nickname}}</p>
                                    <em v-on:click="giveThumbsUp(item.id)">
                                        <i class="ljh5-icons ljh5-dianzan"></i> {{item.agrees}}
                                    </em>
                                </div>
                                <p class="commenter-content">
                                    {{item.content}}
                                </p>
                                <p class="comment-info">
                                    {{item.time}}
                                </p>
                                <a class="commenter-replay" v-on:click="replyShowBox(item.id,0)">回复</a>
                                <div class="input-box-w" v-if="showId == item.id && show">
                                    <input type="text" class="input-box" v-model="reply_content" placeholder="写下您的回复...">
                                    <button type="button" class="btn-comment"  v-on:click="reply(item.id,0)">回复</button>
                                </div>
                                <div class="replay-w">
                                    <dl class="comment-box" v-for="subitem in item.replays">
                                        <dt>
                                            <img :src="'/Api/V1/User/Avatar/'+subitem.rpl_user_id">    
                                        </dt>
                                        <dd>
                                            <div class="commenter-name">
                                                <p>
                                                    {{subitem.rpl_user_nickname}}
                                                    <span v-if="subitem.be_rpl_user_id != 0 && subitem.be_rpl_user_id != subitem.rpl_id && subitem.be_rpl_user_nickname != subitem.rpl_user_nickname && subitem.be_rpl_user_nickname && subitem.be_rpl_user_nickname != null && subitem.be_rpl_user_nickname != ''">@{{subitem.be_rpl_user_nickname}}
                                                </p>
                                            </div>
                                            <p class="commenter-content">
                                                {{subitem.rpl_content}}
                                            </p> 
                                            <p class="comment-info">
                                                {{subitem.rpl_time}}
                                            </p> 
                                            <a class="commenter-replay" v-on:click="replyShowBox(subitem.rpl_id,1)">回复</a>
                                            <div class="input-box-w" v-if="showId == subitem.rpl_id && subShow">
                                                <input type="text" class="input-box" v-model="reply_content"  placeholder="写下您的回复...">
                                                <button type="button" class="btn-comment"  v-on:click="reply(item.id,subitem.rpl_id)">回复</button>
                                            </div>  
                                        </dd>   
                                    </dl>    
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="no-comment" v-else>
                        <img src="/assert/dist/images/sofa.png" />
                        <p>来了？请您坐沙发</p>
                    </div>
                    -->
                </div>
            </div>
            <footer>
                <a  class="footer-a" v-for="(footItem, index) in footItems" :href="footItem.link?footItem.link:''" v-on:click="footTab(index)">
                    <i class="ljh5-icons " :class="footItem.add"></i>
                    <span>{{footItem.title}}</span>
                </a>
                <a class="footer-a contact-service" :class="{cur: curflag}" v-on:click="toCantact()">
                    <p>联系客服</p>
                </a>
            </footer>
            <transition name="vote-fade-out">
                <div class="detail-mask-wrap" v-if="showMask == 1">
                    <div class="pop-w">
                        <div class="pop">
                            <!--<img src="/assert/dist/images/pop-bg.png" class="pop-bg">
                            <img src="/assert/dist/images/join-tit.png" class="pop-tit">-->
                            <div class="pop-cnt">
                                <img src="http://p.maicai360.cn/img/get/20171031/25281636450584063881573_jpg" class="ewm"  v-if="voteActId == '6'">
                                <img src="http://p.maicai360.cn/img/get/20171124/78171636471365373251613_jpg" class="ewm"  v-if="voteActId == '9'">
                                <img :src="QrCodeUri" class="ewm" v-else-if="QrCodeUri">   
                                <img src="/assert/dist/images/ewm.png" class="ewm" v-else> 
                                <ul class="left">
                                    <li v-if="voteActId == '6' ">电话：<a href="tel:13162353128">131-6235-3128</a> 旺材小编 </li>
                                    <li v-else-if="voteActId == '7' ">电话：<a href="tel:15801718349">158-0171-8349</a> 旺材小编 </li>
                                    <li v-else-if="voteActId == '8' || voteActId == '9'">电话：<a href="tel:17601245905">176-0124-5905</a> 旺材小编 </li>
                                    <li v-else>电话：<a href="tel:18017160592">180-1716-0592</a>旺材小编</li>
                                    <li v-if="voteActId == '6' || voteActId == '7'">微信：huganqi_bianji</li>
                                    <!--<li>电话：<a href="tel:18017160592">180-1716-0592</a>旺材小编</li>
                                    <li>微信：wcxb024</li>-->
                                    <li>传真：021-62586911</li>
                                    <li>官网：<a href="http://www.maicai360.cn" taregt="_blank">www.maicai360.cn</a></li>
                                    <li>邮箱：<a href="mailto:allen.yao@maicai360.cn">allen.yao@maicai360.cn</a></li>
                                    <li>地址：上海市普陀区中山北路2438号中瑞商务大厦7F</li>
                                </ul>
                            </div>
                        </div>
                        <i class="ljh5-icons ljh5-chacha pop-close" v-on:click="close_mask"></i>
                    </div>
                </div>  
            </transition>
        </div>  
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/mixins.less';
.vote-detail-w{
    em{
        font-style: normal;
    }
    img{
        display: block;
        margin: 0 auto;
        max-width: 100%;
    }
    .ljh5-icons{
        font-size: 22px;
    }
    .vote-detail-main{
        position: absolute;
        bottom: 53px;
        left: 0;
        top: 0;
        width: 100%;
        -webkit-overflow-scrolling : touch; 
        background:#f2f2f2;
        overflow-x: hidden;
        overflow-y: auto;
        .vote-detail{
            margin: 0 0 6px 0;
            background: #fff;
            a{
                img{
                    width: 100%;
                }
            }
            h2{
                padding: 10px 10px 0 10px;
                color: #202020;
                font-weight: bold;
                font-size: 16px;
            }
            .vote-data{
                color: #ff4040;
                padding: 0 10px ;
            }
            .vote-content{
                padding: 0 10px;
                p{
                    width: 100% !important;
                    a{
                        span{
                            display: inline !important;
                        }
                    }
                }
                *{
                    width: 100%;
                    overflow: hidden;
                }
                img{
                    max-width: 100%;
                }
            }
        }
        .vote-comment{
            background: #fff;
            padding: 14px 10px;
            .detail-vote{
                text-align: center;
                .btn-vote{
                    padding: 0 26px;
                    background: #ff4040;
                    border-radius: 5px;
                    display: inline-block;
                    height: 30px;
                    line-height: 28px;
                    .ljh5-toupiao{
                        color: #fff;
                        vertical-align: middle;
                    }
                }
                .disabled{
                    background: #ccc;
                }
                p{
                    padding: 4px 0;
                    color: #202020;
                }
            }
            .comment-header{
                position: relative;
                font-weight: 700;
                em{
                    font-family: Georgia;
                    color: #ff4040;
                }
            }
            .input-box-w{
                .flex();
                border: 1px solid #fd3b3b;
                margin: 0 0 10px 0;
                overflow: hidden;
                .input-box{
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                    -ms-flex: 1 1 auto;
                    border: none;
                    padding: 5px 10px;
                    width: 100%;
                }
                .btn-comment{
                    flex: 0 0 50px;
                    -webkit-flex: 0 0 50px;
                    -ms-flex: 0 0 50px;  
                    background: #fd3b3b;
                    color: #fff;  
                    border: none;
                }
            }
            .comment-list{
                .comment-box{
                    .flex();
                    dt{
                        flex: 0 0 35px;
                        -webkit-flex: 0 0 35px;
                        -ms-flex: 0 0 35px;
                        border-radius: 50%;
                        height: 35px;
                        overflow: hidden;
                        margin: 0 5px 0 0;
                    } 
                    dd{
                        flex: 1 1 auto;
                        -webkit-flex: 1 1 auto;
                        -ms-flex: 1 1 auto;
                        .commenter-replay{
                            color: #5a83c0;
                        }
                        .commenter-name{
                            .flex();
                            justify-content: space-between;
                            -webkit-justify-content: space-between;
                            p{
                                color: #2ea9df; 
                            }
                            em{
                                color: #90929a;
                                text-align: right;
                                .ljh5-dianzan{
                                    font-size: 16px;
                                }
                            }
                        }
                    }   
                }
            }
            .no-comment {
                padding: 30px 0;
                color: #90929a;
                text-align: center;
                img {
                    width: 45%;
                    max-width: 130px;
                    display: block;
                    margin: 0 auto 10px;
                }
                p {
                    text-align: center;
                    font-size: 18px;
                    color: #90929a;
                    line-height: 30px;
                    width: 100%;
                }
            }
        }
    }
    footer {
        position: fixed;
        z-index: 30;
        left:0;
        bottom: 0;
        width:100%;
        height: 53px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content:center;
        -webkit-justify-content:center;
        align-items: flex-start;
        -webkit-align-items: flex-start;
        background: #f42f2f;
        color: #fff;
        .footer-a {
            flex:1 1 auto;
            -webkit-flex:1 1 auto;
            text-align: center;
            position: relative;
            color: #9a9ca7;
            padding:5px 0 0;
            .ljh5-icons {
                color: #fff;
            }
            &:before,&:after{
                content: "";
                height: 0;
                line-height: 0;
                display: block;
                position: absolute;
                top: 15px;
                z-index: 9;
                height: 25px;
            }
            &:before{
                width: 1px;
                border-left: 1px solid #cd3f26;
            }
            &:after{
                width: 2px;
                border-left: 2px solid #cc1b16;      
            }
            span {
                position: absolute;
                bottom: -18px;
                margin: auto;
                left: 0;
                right: 0;
                font-size: 13px;
                color: #fff;
            }
            &.cur,&.cur span,&.cur .ljh5-icons {
                color:#feb934;
            }
            &.active,&.active span,&.active .ljh5-icons {
                color:#fff;
            }
            p{
                line-height: 43px;
            }
        }
        .footer-a:first-child{
            &:before,&:after{
                border: none;
            }     
        }
        .contact-service:last-child{
            &.cur{
                color:#feb934;    
            }
            background:#fd3b3b;
            height: 53px;
            color: #fff;
            position: relative;
            z-index: 1;
            &:before,&:after{
                border: none;
            }
            ul{
                position: absolute;
                bottom: 60px;
                width: 88%;
                text-align: center;
                background: #fd3b3b;
                border-radius: 5px;
                left: 6%;
                li{
                    margin: 0 10px;
                    border-bottom: 1px dashed #ff7171;
                    a{
                        display: block;
                        padding: 10px 0;
                        color: #fff;
                    }
                    a:last-child{
                        &:before{
                            content: "";
                            height: 0;
                            font-size: 0;
                            line-height: 0;
                            display: block;
                            position: absolute;
                            bottom: -12px;
                            z-index: 9;
                            border-style: solid;
                            border-width: 6px;
                            left: 50%;
                            margin-left: -3px;
                            border-color: #ff3b3b transparent transparent transparent
                        }   
                    }
                }
                li:last-child{
                    border-bottom: none;
                }
            }
        }
    }
    .detail-mask-wrap {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 30 !important;
        .flex();
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        .pop-w{
            border-radius: 5px;
            width: 88%;
            padding: 8px;
            position: relative;
            background:#fff;
            z-index: 3;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            text-align: center;
            .pop{
                .pop-bg{
                    position: absolute;
                    z-index: 2;
                    width: 100%;
                    left: 0;
                    top: 0;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
                .pop-tit{
                    width: 60%;
                    padding: 35px 0 0 0;
                    position: relative;
                    z-index: 3;
                }
                .pop-cnt{
                    background: #f2f2f2;
                    padding: 10px;
                    position: relative;
                    z-index: 2;
                    top: 0;
                    .left{
                        text-align: left;
                    }
                    .ewm{
                        width: 86%;
                    }
                    ul{
                        margin: 5px 0 0 0;
                        li{
                            font-size: 12px;
                        }                        
                    }
                }
            }
            .pop-close{
                width: 26px;
                height: 26px;
                border: 1px solid #ffffff;
                border-radius: 50%;
                margin: 10px auto;
                text-align: center;
                font-size: 20px;
                color: rgba(255, 255, 255, 0.7);
                line-height: 25px;
                position: absolute;
                bottom: -40px;
                left: 50%;
                margin-left: -13px;
            }
        }
    }
}
</style>
<script>
import API from '../../config/api.js'
import wx from 'weixin-js-sdk'
import CryptoJS from 'crypto-js'
import Storage from 'store'
let Key = CryptoJS.enc.Utf8.parse('1491881073751123');
let Iv = CryptoJS.enc.Utf8.parse('1491881073751123');
export default {
    data(){
        return {
            voteActId:'',
            sendParam:{},                           //send传递的参数
            companyId:'',
            comDetail: '',
            footIndex: '',
            showId: 0,
            user:'',
            showMask: 0,
            dataStatus: 0,                              //是否点过赞了
            curflag: false,
            user_comment: '',
            reply_content: '',
            QrCodeUri:'',                               //联系客服二维码
            replyParams:{
                voting_id:'',
                company_id:'',
                comment_id: '',
                replay_id: '',
                user_id:'',
                comments:''
            },
            canVote:true,
            isDisabled: true,                       //投票按钮是否禁用
            show: false,
            subShow: false,
            footItems:[
                {title:'首页',add:'ljh5-toupiao-shouye',link:'/ExtraOfAct/VoteVtwo?id='+this.$route.query.voteActId},
                {title:'排名',add:'ljh5-toupiao-paiming',link:'/ExtraOfAct/VoteVtwo?id='+this.$route.query.voteActId+'&footIndex=1'},
                {title:'合作媒体',add:'ljh5-toupiaoguanyuwomen',link:'/ExtraOfAct/VoteVtwo?id='+this.$route.query.voteActId+'&footIndex=2'}
            ],
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            shareData:{     //微信分享默认内容
                title: '投我一票 | 中国新能源市场八大储能电池评选(每天10票)',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '帮我投票，我就嫁给你！',
                link: 'https://m.maicai360.cn'+this.$route.path+'?companyId='+this.$route.query.companyId+'&voteActId='+this.$route.query.voteActId,
                success(a) {
                    a.recordShare();
                }
            }
        }    
    },
    mounted() {
        if(Storage.get("ljh5user")) {
            this.user =  Storage.get("ljh5user");
            this.user_id = this.user.user_id;
        }
        this.voteActId = this.$route.query.voteActId;
        this.companyId = this.$route.query.companyId;
        Storage.set('ljh5url', {preUrl: Storage.get('ljh5url') ? Storage.get('ljh5url').curUrl : "", curUrl: window.location.href});
        this.getCompanyInfo();
        this.voteActivity();
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
                            success() {
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
        //获取公司详情
        getCompanyInfo(){
            this.$http.get(API.getCompanyInfo,{params:{voting_id:this.voteActId,company_id:this.companyId,user_id:this.user.user_id || 0}})
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                        this.comDetail = response.data.data;
                        this.canVote = this.comDetail.can_vote;
                        this.comDetail.comments = this.comDetail.comments  != null ? this.comDetail.comments : [];//评论列表
                        if(this.comDetail.company_name){ 
                            this.shareData.title = '投我一票 | (' + this.comDetail.company_name + ')中国新能源市场八大储能电池评选(每天10票)';
                        }
                        this.getConfig(this.shareData);
                }else{
                    //this.$router.go(-1);
                }
            }, (response)=>{
                console.log(response.data);
            });    
        },
        //获取正在进行中的投票活动
        voteActivity(){
            this.$http.get(API.voteActivity,{params:{activity_id:this.voteActId,user_id:this.user.user_id || 0}})
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    this.QrCodeUri = response.data.data.QrCodeUri;
                }else{
                    //this.$router.go(-1);
                }
            }, (response)=>{
                console.log(response.data);
            });    
        },
        //投票
        toVote(){
            let that = this;
            if(that.user){
                let encrypted = CryptoJS.AES.encrypt((this.user.user_phone+'_' + this.companyId + '_' + this.voteActId), Key,{
                    keySize: 128 / 8,
                    iv: Iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                if(that.canVote !== false){
                    if(that.isDisabled){
                        that.$http.post(API.getVote,{user_phone:this.user.user_phone,company_id:this.companyId,activity_id:this.voteActId,cipher_text:encrypted.toString()})
                        .then((response)=>{
                            if(response.data.code && response.data.code=="200"){
                                that.show_dialog('投票成功',true,2000,false);
                                that.comDetail.votes = parseInt(this.comDetail.votes) + 1;
                                that.isDisabled = false;
                                setTimeout(function(){
                                    that.isDisabled = true;
                                },5000);
                                setTimeout(function(){
                                    that.sendParam = {
                                        user_phone:that.user.user_phone,
                                        activity_id:that.voteActId
                                    };
                                    ws.send(JSON.stringify(that.sendParam));
                                },3000);
                            }else{
                                this.canVote = false;
                                that.show_dialog('很抱歉，你今天的投票次数已用完',true,2000,false); 
                            }
                        }, (response)=>{
                            console.log(response.data);
                        });
                    }else{
                        that.show_dialog('5秒过后再试哦',true,2000,false);     
                    }
                }else{
                    that.canVote = false;
                    that.show_dialog('很抱歉，你今天的投票次数已用完',true,2000,false); 
                }    
            }else{
                that.$router.push('/login');
            }
        },
        //评论
        toComment(){
            //判断是否登录
            if(this.user){
                if(this.user_comment != "" && this.user_comment.length<200){
                    this.$http.post(API.companyComment,{voting_id:this.voteActId,company_id:this.companyId,user_id:this.user.user_id,comments:this.user_comment})
                    .then((response)=>{
                        if (response.data.code && response.data.code == '200') {
                            this.show_dialog("评论成功",true,1000,false);
                            let date = new Date();
                            let year = date.getFullYear();
                            let month = date.getMonth()+1;
                            let day = date.getDate();
                            let hour = date.getHours();
                            let minutes = date.getMinutes();
                            let seconds = date.getSeconds();
                            let fulltime = year+'-'+month+'-'+day+" "+hour+":"+minutes+":"+seconds;
                            let newCommet = {
                                content: this.user_comment,
                                id: parseInt(response.data.id),
                                agrees: 0,
                                user_nickname: this.user.user_nickname,
                                replays: [],
                                time: fulltime,//此处应该返回一个服务器端时间，不应该用客户端时间，以确保时间的准确性
                                user_id: this.user.user_id
                            };
                            this.comDetail.comments.unshift(newCommet);
                            this.comDetail.comment_count = parseInt(this.comDetail.comment_count) + 1;//评论数即时+1
                            this.user_comment = "";
                            //this.isShowComment = false;
                            //滚动定位到评论列表顶部
                            let mainWrap = this.$el.querySelector("#mainWrap");
                            let articleComment = this.$el.querySelectorAll("#voteComment")[0];
                            //mainWrap.scrollTop = articleComment.offsetTop;
                            let total = articleComment.offsetTop;
                            let distance = mainWrap.scrollTop;
                            // 平滑滚动，时长500ms，每10ms一跳，共50跳
                            let step = total / 50
                            if (total > distance) {
                                smoothDown()
                            } else {
                                let newTotal = distance - total;
                                step = newTotal / 50;
                                smoothUp();
                            }
                            function smoothDown () {
                                if (distance < total) {
                                    distance += step;
                        　　　　　　 mainWrap.scrollTop = distance;
                                    setTimeout(smoothDown, 10);
                                } else {
                                    mainWrap.scrollTop = total;
                                }
                            }
                            function smoothUp () {
                                if (distance > total) {
                                    distance -= step;
                        　　　　　　 mainWrap.scrollTop = distance;
                                    setTimeout(smoothUp, 10);
                                } else {
                                    mainWrap.scrollTop = total;
                                }
                            }
                        } else {
                            this.user_comment = "";
                            this.show_dialog(response.data.msg,true,1000,false);
                        }
                    }, (response)=>{
                        this.show_dialog("系统出错,请稍候再试",true,1000,false);
                    });
                }else{
                    this.show_dialog("评论字数最少1个字，最多200字！", true, 1000, false);
                }
            }else{
                this.$router.push('/login');
            }  
        },
        replyShowBox(commentId,level){
            if(this.user){
                this.showId = commentId;
                this.replyParams.comment_id = commentId;
                if(level==0){
                    this.show = true;
                    this.subShow = false;
                }else{
                    this.show = false;
                    this.subShow = true;   
                }
            }else{
                this.$router.push('/login');
            }
        },
        //回复
        reply(commentId,replayId){  
            if(this.user){
                if(this.reply_content !=='' && this.reply_content.length < 200){
                    this.$http.post(API.replayComComment,{voting_id:this.voteActId,company_id:this.companyId,comment_id:commentId,replay_id:replayId,user_id:this.user.user_id || 0,comments:this.reply_content})
                    .then((response)=>{
                        if(response.data.code && response.data.code=="200"){
                            //一级回复
                            let newReply = {
                                be_rpl_user_id: response.data.data.be_rpl_user_id,
                                be_rpl_user_nickname: response.data.data.be_rpl_user_nickname,
                                rpl_content: response.data.data.rpl_content,
                                rpl_id: response.data.data.rpl_id,
                                rpl_time: response.data.data.rpl_time,
                                rpl_user_id: response.data.data.rpl_user_id,
                                rpl_user_nickname: response.data.data.rpl_user_nickname
                            }
                            for(var i=0; i < this.comDetail.comments.length; i++) {
                                if(this.comDetail.comments[i].id == commentId) {
                                    this.comDetail.comments[i].replays.push(newReply);
                                }
                                this.show = false;
                                this.subShow = false;
                            }
                            this.comDetail.comment_count = parseInt(this.comDetail.comment_count) + 1;//评论数即时+1                            
                            this.reply_content = '';
                        }else{
                            this.show_dialog(response.data.msg,true,1000,false);     
                        }
                    }, (response)=>{
                        console.log(response.data);
                    });
                }else{
                    this.show_dialog('回复字数最少1个字，最多200字！',true,1000,false);        
                }  
            }else{
                this.$route.push('/login');
            }       
        },
        //评论点赞
        giveThumbsUp(commentId){
            if(this.user){
                this.$http.post(API.giveThumbsUp,{comment_id:commentId,user_id:this.user.user_id})
                .then((response)=>{
                    if (response.data.code && response.data.code == '200') {
                        for(var i=0;i<this.comDetail.comments.length;i++){
                            if(this.comDetail.comments[i].id == parseInt(commentId)) {
                                this.comDetail.comments[i].agrees = response.data.data;
                            }
                        }
                    }
                }, (response)=>{
                    this.show_dialog("提交失败,请稍候再试!",true,1000,false);
                });  
            }else{
                this.$router.push('/login');
            }
        },
        //底部导航切换
        footTab(index){
            this.footIndex = index;
        },
        toCantact(){
            this.showMask = 1;   
            this.curflag = true;
        },
        //分享记录
        recordShare() {
            this.$http.post(API.shareNotify, { article_id: this.$route.query.id, user_id: this.user_id, type: "5" })
            .then((response) => {
            }, (response) => {
                console.log(response.data);
            });
        },
        show_dialog (cont,isauto,life,isclosebtn) {
            this.dialog.dialogShow = true;
            this.dialog.dialogCont = cont;
            this.dialog.dialogIsauto = isauto;
            this.dialog.dialogLife = life;
            this.dialog.dialogIsclosebtn = isclosebtn;
        },
        close_dialog () {
            this.dialog.dialogShow = false;
            this.dialog.dialogCont = "";
            this.dialog.dialogLife = 3000;
        },
        close_mask () {
            this.showMask = 0;
            this.curflag = false;
        }
    }    
}
</script>