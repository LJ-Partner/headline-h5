<template>
    <v-content>
        <v-startup v-if="appBarShow"></v-startup>
        <v-loading v-bind:isloading="loading"></v-loading>
        <!--<v-userheader v-bind:show-edit="false"></v-userheader>-->
        <header v-if="appBarShow" class="user-header" >
            <p>{{get_usercenter_title}}</p>
            <a class="back" v-on:click="goBack"><i class="ljh5-icons ljh5-fanhui"></i><!--返回--></a>
            <span class="handle" v-on:click="goBack">跳过</span>
        </header>
        <v-main v-bind:no-padding="true" v-bind:isbg="false" :class="appBarShow?'custom-wrap':'app-main custom-wrap'">
            <form>
                <div class="page" :class="{'hide': cur_step != '1'}">
                    <a v-if="!appBarShow" href="javascript:;" class="skip"><span class="handle" v-on:click="goBack">跳过</span></a>
                    <h1 class="custom-title">放大招，旺材为您定制专属头条</h1>
                    <div class="field-group">
                        <div class="field-wrap">
                            <label class="field-title" for="company">
                                <i class="ljh5-icons ljh5-huodonggongsi"></i>
                                <span>所在企业</span>
                            </label>
                            <div class="field">
                                <input type="text" class="ipt-text" id="company" name="company" v-model="custom_cont.company">
                                <span class="ipt-follow">{{custom_cont.company}}</span>
                            </div>
                        </div>
                        <div class="field-wrap">
                            <label class="field-title" for="position"><i class="ljh5-icons ljh5-huodongzhiwei"></i>公司职位</label>
                            <div class="field">
                                <input type="text" class="ipt-text" id="position" name="position" v-model="custom_cont.position">
                                <span class="ipt-follow">{{custom_cont.position}}</span>
                            </div>
                        </div>
                        <div class="field-wrap">
                            <label class="field-title" for="position"><i class="ljh5-icons ljh5-xingbie"></i>性别</label>
                            <div class="field-radio">
                                <span class="cell-radio">
                                    <input type="radio" name="group" v-model="custom_cont.gender" value="1"  />
                                    <span class="radio-tip">男</span>
                                </span>
                                <span class="cell-radio">
                                    <input type="radio" name="group" v-model="custom_cont.gender" value="0"  />
                                    <span class="radio-tip">女</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- <p class="sect-title">- 选择身份 -</p> -->
                    <p class="sect-title">-选择角色（选择1-3个）-</p>
                    <div class="status-list">
                        <!-- <a href="javascript:void(0);" class="status-item" v-for="item in storage.status" v-on:click="select_status(item.id)" :class="{'active': item.id == custom_cont.status}">
                            <span class="image-wrap"><img :src="item.icon_uri"></span>
                            <span class="name">{{item.title}}</span>
                        </a> -->
                        <a href="javascript:;" class="list-item" v-for="item in storage.status" v-on:click="select_status(item.id)" v-bind:class="{'active': item.is_checked}">
                            {{item.title}}    
                        </a>
                    </div>
                </div>
                <div class="page page2" :class="{'show': cur_step == '2'}">
                    <p class="sect-title">- 选择关注（选择1-3个）-</p>
                    <div class="industry-list">
                        <!-- <a href="javascript:void(0);" class="industry-item" v-for="item in storage.industries" v-bind:class="{'active': item.is_checked}" v-on:click="select_industries(item.id)">
                            <span class="flipper" :class="{'flip': item.is_checked}">
                                <span class="image-wrap active" v-bind:style="{borderColor:item.bg_color, borderStyle:'solid', backgroundColor:item.bg_color}" v-if="item.is_checked"><img :src="item.checked_icon_uri"></span>
                                <span class="image-wrap" v-bind:style="{borderColor:item.bg_color, borderStyle:'dotted'}" v-else><img :src="item.icon_uri"></span>
                                <span class="image-wrap active" v-bind:style="{borderColor:item.bg_color, borderStyle:'solid', backgroundColor:item.bg_color}"><img :src="item.checked_icon_uri"></span>
                                <span class="image-wrap" v-bind:style="{borderColor:item.bg_color, borderStyle:'dotted'}"><img :src="item.icon_uri"></span>
                            </span>
                            <span class="name">{{item.title}}</span>
                        </a> -->
                        <a href="javascript:;" class="list-item" v-for="item in storage.industries" v-bind:class="{'active': item.is_checked}" v-on:click="select_industries(item.id)">
                            {{item.title}}
                        </a>
                    </div>
                    <p class="sect-title">- 您感兴趣的（选择1-3个）-</p>
                    <div class="type-list">
                        <!-- <a href="javascript:void(0);" class="type-item" v-for="item in storage.types" v-bind:class="{'active': item.is_checked}" v-on:click="select_types(item.id)">
                            <span class="item-wrap" v-bind:style="{borderColor:item.bg_color, borderStyle:'solid', backgroundColor:item.bg_color}" v-if="item.is_checked"><span>{{item.title}}</span></span>
                            <span class="item-wrap" v-bind:style="{borderColor:item.bg_color, borderStyle:'dotted', color:item.bg_color}" v-else><span>{{item.title}}</span></span>
                        </a> -->
                        <a href="javascript:;" class="list-item" v-for="item in storage.types" v-bind:class="{'active': item.is_checked}" v-on:click="select_types(item.id)">
                            {{item.title}}
                        </a>
                    </div>
                </div>
            </form>
        </v-main>
        <div class="us-custom-subwrap" :class="{'hide': cur_step != '1'}">
            <button type="button" class="btn btn-full" v-on:click="custom_next">下一步</button>
        </div>
        <div class="us-custom-subwrap multi" :class="{'show': cur_step == '2'}">
            <button type="button" class="btn assist" v-on:click="custom_pre">上一步</button>
            <button type="button" class="btn" v-on:click="custom_sub">完成</button>
        </div>
        <!--<v-footer></v-footer>-->
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.custom-wrap {
    width: 100%;
    overflow-x: hidden;
    background: @color-white;
    top: 46px !important;
    bottom: 50px !important;
    -webkit-overflow-scrolling: auto;
    .skip{
        display: block;
        width: 100%;
        text-align: right;
        padding: 0 10px 0 0;
        line-height: 35px;
        span{
            color: #ff4040;    
        }
    }
    .custom-title{
        width: 100%;
        display: block;
        text-align: center;
        font-size: 20px;
        color: @color-red;
        font-weight: bold;
        background: @color-white;
        padding: 20px 0 5px;
        position: relative;
        &:after{
            content: "";
            width: 40px;
            height: 100%;
            display: block;
            .linear-gradient-color3(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0));
            .rotate(30deg);
            position: absolute;
            left: -40px;
            top: 0;
            .animation(slideShine,3.5s,linear,infinite);
        }
    }
    .page {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .transition(all,0.3s,linear);
        &.hide{
            left: -100%;
        }
        &.page2{
            left: 100%;
            &.show{
                left: 0;
            }
        }
    }
    //版块标题
    .sect-title{
        width: 100%;
        overflow: hidden;
        display: block;
        text-align: center;
        font-size: 16px;
        color: @subinfo-color;
        line-height: 24px;
        clear: both;
        padding: 20px 0 0;
    }
    //输入框
    .field-group{
        padding-bottom: 10px;
    }
    .field-wrap{
        width: 100%;
        height: 40px;
        margin-bottom: 5px;
        .field-title{
            width: 34%;
            height: 40px;
            float: left;
            text-align: right;
            font-size: 16px;
            color: @subinfo-color;
            line-height: 42px;
            padding: 10px 15px 0 22px;
            text-align: left;
            i{
                font-size: 18px;
                position: relative;
                top: 1px;
                margin-right: 3px;
            }
        }
        .field{
            width: 60%;
            float: left;
            border-bottom: 1px solid @lightest-color;
            position: relative;
            .ipt-text{
                width: 100%;
                height: 38px;
                border:none;
                outline: none;
                -webkit-appearance: none;
                background: @color-white;
                text-align: left;
                font-size: 16px;
                line-height: 38px;
                padding-top: 10px;
                position: relative;
                z-index: 5;
            }
            .ipt-follow{
                max-width: 100%;
                height: 30px;
                display: block;
                overflow: hidden;
                line-height: 30px;
                text-align: left;
                font-size: 16px;
                border-bottom: 1px solid @title-color;
                position: absolute;
                left: 0;
                bottom: -1px;
            }
        }
        .field-radio{
            padding: 10px 0 0 0;
            color: #717171;
            height: 38px;
            position: relative;
            z-index: 2;
            top: 8px;
            .cell-radio {
                display: block;
                float: left;
                margin: 0 30px 0 0;
                .radio-tip {
                    position: relative;
                    display: inline-block;
                    font-size: 14px;
                    vertical-align: middle;
                }
            }
            input[type=radio] {
                display: inline-block;
                width: 13px;
                height: 13px;
                position: relative;
                overflow: visible;
                border: 0;
                background: 0 0;
                -webkit-appearance: none;
                vertical-align: middle;
                &:before {
                    content: '';
                    display: block;
                    width: 13px;
                    height: 13px;
                    background: #fff;
                    border: 1px solid #ff4040;
                    border-radius: 13px;
                    background-clip: padding-box;
                    position: absolute;
                    left: 0;
                    top: 0;
                    box-sizing: border-box;
                }
                &:checked:after {
                    content: '';
                    display: block;
                    width: 5px;
                    height: 5px;
                    background: #fff;
                    border-radius: 7px;
                    position: absolute;
                    left: 4px;
                    top: 4px;
                }
                &:checked:before{
                    border: 1px solid #ff4040;    
                    background: #ff4040;
                }
                &:disabled {
                    &:before{
                        border-color: @bg-border-color;
                        background: @bg-color;
                    }
                }
            }
        }
    }
    //身份
    .status-list{
        margin: 0 22px;
        text-align: center;
        .flex();
        flex-wrap: wrap;
        justify-content: flex-start;
        .list-item{
            padding: 6px 8px;
            background: #F2F2F2;
            border-radius: 3px;
            margin: 18px 10px 0 0;
        }
        .active{
            background: #ff4040;
            color: #fff;
        }
        .status-item{
            width: 50%;
            display: inline-block;
            text-align: center;
            margin-top: 70px;
            .image-wrap{
                width: 100px;
                height: 100px;
                display: block;
                border: 2px solid #6b4b3b;
                .border-radius(50%);
                margin: 0 auto;
                position: relative;
                img{
                    width: 75px;
                    display: block;
                    margin: 0 auto;
                    position: relative;
                    bottom: 46px;
                }
            }
            .name{
                width: 100%;
                display: block;
                text-align: center;
                font-size:16px;
                color: @title-color;
                line-height: 26px;
                padding: 10px 0;
                .transition(all,0.3s,ease);
            }
            &.active{
                .image-wrap{
                    background-color: #fac15b;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    .animation(elasticscale,0.8s,ease,1);
                }
                .name{
                    color: @color-red;
                    transform: scale(1.3,1.3) translate(0,10px);
                    -ms-transform: scale(1.3,1.3) translate(0,10px);
                    -moz-transform: scale(1.3,1.3) translate(0,10px);
                    -webkit-transform: scale(1.3,1.3) translate(0,10px);
                    -o-transform: scale(1.3,1.3) translate(0,10px);
                }
            }
        }
    }
    //兴趣行业
    .industry-list{
        margin: 0 30px;
        text-align: center;
        padding: 2px 0 0;
        .flex();
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        .list-item{
            padding: 6px 8px;
            background: #F2F2F2;
            border-radius: 3px;
            margin: 18px 10px 0 0;
            color: #202020;
        }
        .active{
            background: #ff4040;
            color: #fff;
        }
        .industry-item{
            width: 22.5%;
            display: inline-block;
            text-align: center;
            margin-top: 10px;
            //翻牌效果
            .flipper{
                width: 66px;
                height: 66px;
                display: block;
                .border-radius(50%);
                margin: 0 auto;
                position: relative;
                transition: 0.6s; 
                transform-style: preserve-3d;
                .image-wrap{
                    position: absolute;
                    left: 0;
                    top: 0;
                    backface-visibility: hidden; 
                    transition: 0.6s; 
                    transform-style: preserve-3d;
                    transform: rotateY(0deg);
                    z-index: 2;
                    &.active{
                        transform: rotateY(-180deg);
                    }
                }
                &.flip{
                    transform:rotateY(180deg);
                }
            }
            .image-wrap{
                width: 66px;
                height: 66px;
                display: block;
                background-color: @color-white;
                border-width: 2px;
                .border-radius(50%);
                margin: 0 auto;
                position: relative;
                img{
                    width: 52px;
                    height: 52px;
                    display: block;
                    margin: 5px auto 0;
                    position: relative;
                }
            }
            .name{
                width: 100%;
                display: block;
                text-align: center;
                font-size:16px;
                color: @title-color;
                line-height: 26px;
                padding: 10px 0 5px;
                .transition(all,0.3s,ease);
            }
            &.active{
                .image-wrap{
                    box-shadow: 0 0 10px rgba(0,0,0,0.3);
                    //.animation(elasticscale2,0.8s,ease,1);
                }
                .name{
                    color: @color-red;
                }
            }
        }
    }
    //您希望得到的
    .type-list{
        margin: 0 30px;
        text-align: center;
        padding: 2px 0 0;
        .flex();
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        .list-item{
            padding: 6px 8px;
            background: #F2F2F2;
            border-radius: 3px;
            margin: 18px 10px 0 0;
            color: #202020;
        }
        .active{
            background: #ff4040;
            color: #fff;
        }
        .type-item{
            width: 22.5%;
            display: inline-block;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 10px;
            .item-wrap{
                width: 66px;
                height: 66px;
                display: block;
                background-color: @color-white;
                border-width: 2px;
                .border-radius(50%);
                margin: 0 auto;
                position: relative;
                span{
                    width: 44px;
                    display: block;
                    text-align: center;
                    font-size: 18px;
                    line-height: 22px;
                    margin: 10px auto 0;
                    position: relative;
                }
            }
            .name{
                width: 100%;
                display: block;
                text-align: center;
                font-size:16px;
                color: @title-color;
                line-height: 26px;
                padding: 10px 0 5px;
                .transition(all,0.3s,ease);
            }
            &.active{
                .item-wrap{
                    box-shadow: 0 0 10px rgba(0,0,0,0.3);
                    .animation(elasticscale2,0.8s,ease,1);
                    color: @color-white;
                }
                .name{
                    color: @color-red;
                }
            }
        }
    }
}
//底部提交按钮
.us-custom-subwrap {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    .transition(all,0.3s,linear);

    .btn{
        border:none;
        outline: none;
        -webkit-appearance: none;
        background: @color-red;
        display: block;
        text-align: center;
        font-size: 18px;
        color: @color-white;
        font-family: "PingFang SC", "Hiragino Sans GB", Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
        height: 50px;
        line-height: 50px;
        &:disabled {
            background: @color-gray-9;
        }
    }

    .btn-full {
        width: 100%;
    }

    &.hide{
        bottom: 50px;
    }

    &.multi{
        z-index: 2;
        bottom: -50px;
        .btn{
            width: 50%;
            float: left;
            &.assist{
                background-color: rgba(255,64,64,0.8);
            }
        }
        &.show{
            bottom: 0;
        }
    }
}
.user-header-nobg{
    background: #fff;
    position: relative !important;
    z-index: 1;
    .handle{
        color: #ff4040;
    }
}
.main.app-main{
    top: 0 !important;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store' 
var u = navigator.userAgent;
//android终端                                     
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
//ios终端                  
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isSelfApp = u.indexOf('maicai360_app') > -1;        //判断是否是嵌入到app的标识
//let user =  Storage.get("ljh5user")
export default {
    computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
    data(){
        return {
            loading:false,
            lists: [
                
            ],
            user:'',
            selct_items:{},
            cur_step: "1",//当前进度
            storage: {
                status: [],//身份
                industries: [],//兴趣行业
                types: []//您希望得到的
            },
            custom_cont: {
                company: "",
                position: "",
                status: [],
                industries: [],
                types: [],
                gender: 1
            },
            user: Storage.get("ljh5user"),
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            userInterest:'',            //用户选取信息
            appBarShow: true            //嵌入到app header是否显示
        }
    },
    mounted () {
        //Storage.remove('ljh5user_interest');
        this.$store.dispatch('set_usercenter_title','定制我的专属头条');
        this.$store.dispatch('set_channel_cur','user');
        this.isstorage();
        this.getStorage();
        if(isSelfApp){
            this.getUserInterest();                             //获取兴趣相关
            this.appGetUserInfo();                            //获取用户信息相关
        }else{
            if(Storage.get("ljh5user")){
                this.user = Storage.get("ljh5user");
            }
            this.getUserInfo();
        }
    },
    methods: {
        //通过app登录获取的用户信息
        appGetUserInfo(){
            if(isAndroid){
                this.user = JSON.parse(window.WCJSBridge.getUserInfo());                                          
            }else if(isIOS){
                this.user = JSON.parse(WCJSBridge.getUserInfo());
            }
            this.getUserInfo();
        },
        //app返回上层目录
        goBack(){
            if(isSelfApp){
                //活动页面嵌入到app 返回app上一级 调用的方法
                if(isAndroid){
                    window.WCJSBridge.onBack();  
                }else{
                    WCJSBridge.onBack();     
                }                    
            }else{
                if(Storage.get('ljh5url') && Storage.get('ljh5url').curUrl != "") {
                    window.location.href = Storage.get('ljh5url').curUrl;
                } else {
                    this.$router.push('/');
                }
            }
        },
        //app返回首页
        goHome(){
            //活动页面嵌入到app 返回app首页 调用的方法
            if(isAndroid){
                window.WCJSBridge.goHome(); 
            }else if(isIOS){
                WCJSBridge.goHome();
            }                 
        },
        getUserInterest(){
            if(isAndroid){
                window.WCJSBridge.setNavgationTitle('定制我的专属头条');  
                this.userInterest = JSON.parse(window.WCJSBridge.getUserInterest());   
            }else if(isIOS){
                WCJSBridge.setNavgationTitle('定制我的专属头条');
                this.userInterest = JSON.parse(WCJSBridge.getUserInterest());
            }
        },
        isstorage() {
            //内嵌app
            if(isSelfApp){
                this.appBarShow = false; 
            }else{
                this.appBarShow = true; 
            }
        },
        getStorage () {
            let url = API.userCustom; 
            this.$http.get(url)
            .then((response)=>{
                if (response.data.code && response.data.code == 200) {
                    //console.log(response.data);
                    for(var i = 0; i < response.data.data.length; i++){
                        switch(response.data.data[i].type) {
                            case 1: this.storage.status = response.data.data[i].list; break;
                            case 3: this.storage.industries = response.data.data[i].list; break;
                            case 2: this.storage.types = response.data.data[i].list; break;
                            default: break;
                        }
                    }
                }
            }, (response)=>{
                //console.log(response.data);
            });
        },
        //选择身份
        select_status(item){
            for(var i = 0; i < this.storage.status.length; i++) {
                if(this.storage.status[i].id == item){
                    if(this.storage.status[i].is_checked) {
                        this.storage.status[i].is_checked = false;
                        for(var j = 0; j < this.custom_cont.status.length; j++) {
                            if(this.custom_cont.status[j] == item) {
                                this.custom_cont.status.splice(j,1);
                                break;
                            }
                        }
                    } else {
                        if(this.custom_cont.status.length < 3){
                            this.storage.status[i].is_checked = true;
                            this.custom_cont.status.push(item);
                        } else {
                            this.show_dialog("最多选择3个",true,1000,false);
                        }
                    }
                    break;
                }
            }
        },
        //下一步
        custom_next(){
            let result_company = this.custom_cont.company.replace(/(^\s*)|(\s*$)/g, "");
            let result_position = this.custom_cont.position.replace(/(^\s*)|(\s*$)/g, "");
            if(result_company != "" && result_position != ""){
                if(this.custom_cont.status != ""){
                    this.cur_step = "2";
                } else {
                    this.show_dialog("请选择您的身份",true,1500,false);
                    return false;
                }
            } else {
                this.show_dialog("请完善您的资料",true,1500,false);
                return false;
            }
        },
        //选择兴趣行业
        select_industries(item){
            for(var i = 0; i < this.storage.industries.length; i++) {
                if(this.storage.industries[i].id == item){
                    if(this.storage.industries[i].is_checked) {
                        this.storage.industries[i].is_checked = false;
                        for(var j = 0; j < this.custom_cont.industries.length; j++) {
                            if(this.custom_cont.industries[j] == item) {
                                this.custom_cont.industries.splice(j,1);
                                break;
                            }
                        }
                    } else {
                        if(this.custom_cont.industries.length < 3){
                            this.storage.industries[i].is_checked = true;
                            this.custom_cont.industries.push(item);
                        } else {
                            this.show_dialog("最多选择3个",true,1000,false);
                        }
                    }
                    break;
                }
            }
        },
        //您希望得到的
        select_types(item){
            for(var i = 0; i < this.storage.types.length; i++) {
                if(this.storage.types[i].id == item){
                    if(this.storage.types[i].is_checked) {
                        this.storage.types[i].is_checked = false;
                        for(var j = 0; j < this.custom_cont.types.length; j++) {
                            if(this.custom_cont.types[j] == item) {
                                this.custom_cont.types.splice(j,1);
                                break;
                            }
                        }
                    } else {
                        if(this.custom_cont.types.length < 3){
                            this.storage.types[i].is_checked = true;
                            this.custom_cont.types.push(item);
                        } else {
                            this.show_dialog("最多选择3个",true,1000,false);
                        }
                    }
                    break;
                }
            }
        },
        //上一步
        custom_pre(){
            this.cur_step = "1";
        },
        //提交
        custom_sub(){
            if(this.custom_cont.industries.length <= 0){
                this.show_dialog("请选择您感兴趣的行业，至少1个",true,2000,false);
            } else if (this.custom_cont.types.length <= 0){
                this.show_dialog("请选择您希望得到的信息类型，至少1个",true,2000,false);
            } else {
                if( this.user ) {
                    let url=API.userCustomSave;
                    let send_params = {
                        user_id: this.user.user_id,
                        company: this.custom_cont.company,
                        position: this.custom_cont.position,
                        role_ids: this.custom_cont.status.join(),
                        interest_ids: this.custom_cont.industries.join(),
                        hope_ids: this.custom_cont.types.join(),
                        gender: this.custom_cont.gender    
                    }
                    this.$http.post(url,send_params)
                    .then((response)=>{
                        if (response.data.code && response.data.code == 200) {
                            if(isSelfApp){
                                this.goHome();    
                                this.appBarShow = false;  
                            }else{
                                //console.log(response.data);
                                Storage.set('ljh5user_interest', {company: this.custom_cont.company, position: this.custom_cont.position, role: this.custom_cont.status.join(), industries: this.custom_cont.industries.join(), types: this.custom_cont.types.join()});
                                //this.$router.push('/');
                                if(Storage.get('ljh5url') && Storage.get('ljh5url').curUrl != "") {
                                    window.location.href = Storage.get('ljh5url').curUrl;
                                } else {
                                    this.$router.push('/');
                                }    
                            } 
                        } else {
                            this.show_dialog(response.data.msg,true,1000,false);
                        }
                    }, (response)=>{
                        //console.log(response.data);
                    });
                } else {
                    //this.$router.push('/')
                    if(Storage.get('ljh5url') && Storage.get('ljh5url').curUrl != "") {
                        window.location.href = Storage.get('ljh5url').curUrl;
                    } else {
                        this.$router.push('/');
                    }
                }
            }
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
        //获取用户相关信息
        getUserInfo(){
            this.$http.get(API.getUserInfo,{params:{userid:this.user.user_id}})
            .then((response)=>{
                if(response.data.userInfo){
                    this.userInterest = response.data.userInfo; 
                    this.userInterest.company?this.custom_cont.company = this.userInterest.company:this.custom_cont.company = '';
                    this.userInterest.position?this.custom_cont.position = this.userInterest.position:this.custom_cont.position = '';
                    this.userInterest.role_ids?this.custom_cont.status = this.userInterest.role_ids:this.custom_cont.status = []; 
                    this.userInterest.gender?this.custom_cont.gender = this.userInterest.gender:this.custom_cont.gender = '1'; 
                    //标红
                    if(this.custom_cont.status && this.custom_cont.status.length > 0){
                        this.custom_cont.status.map((item,index)=>{
                            this.storage.status.map((subitem,subindex)=>{
                                if(item == subitem.id){
                                    subitem.is_checked = true;    
                                }  
                            })        
                        }) 
                    }
                }
            }, (response)=>{
                console.log(response.data);
            });    
        }
    }
}
</script>
