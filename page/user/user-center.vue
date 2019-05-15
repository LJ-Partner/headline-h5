<template>
    <v-content>
        
        <v-main v-bind:no-padding="true" v-bind:isbg="true">
            <div class="user-center-panel">
                <!--<span class="ljh5-icons ljh5-wo avatar"></span>-->
                <vue-core-image-upload 
                    v-bind:class="['upload-button']" 
                    v-bind:crop="false" url="/api/V1/User/Avatar/Upload" 
                    extensions="png,gif,jpeg,jpg"
                    v-bind:text="''" 
                    v-bind:crop="true"
                    v-bind:compress="50"
                    v-bind:headers="{auth:user.user_id+','+encrypt()}" 
                    v-on:imageuploaded="imageuploaded">
                </vue-core-image-upload>
                <span class="avatar">                   
                    <img :src="'/Api/V1/User/Avatar/'+ user.user_id" v-if="avatar_url==''" class="avatar-show"/>
                    <img :src="avatar_url" v-else class="avatar-show"/>
                </span>
                <span>{{newUser.user_nickname}}</span>
                <div class="bar">
                    <a href="/user/favorite">
                        <!--<i class="ljh5-icons ljh5-shoucang"></i>-->
                        <img src="/assert/dist/images/i_cllection.png" />
                        收藏
                    </a>
                    <a href="/user/message">
                        <!--<i class="ljh5-icons ljh5-xiaoxitixing"></i>-->
                        <img src="/assert/dist/images/i_message.png" />
                        消息<span class="count" v-if="get_usermessage_count > 0">({{get_usermessage_count}})</span>
                    </a>
                    <a href="/user/attention/author">
                        <!--<i class="ljh5-icons ljh5-guanzhu"></i>-->
                        <img src="/assert/dist/images/i_attention.png" />
                        关注
                    </a>
                   
                </div>
            </div>
            <ul class="user-center-menu">
                <li class="order">
                    <a href="/user/order">
                        <i class="ljh5-icons ljh5-order"></i>
                        我的订单<em class="count" v-if="unpaid && unpaid != '0'">待支付 {{unpaid}}</em>
                    </a>
                </li>
                <li class="history group-split">
                    <a href="/user/history">
                        <i class="ljh5-icons ljh5-history"></i>
                        浏览历史
                    </a>
                </li>
                <li class="feedback">
                    <a href="/user/feedback">
                        <i class="ljh5-icons ljh5-feedback"></i>
                        用户反馈
                    </a>
                </li>
                <li class="baseinfo group-split">
                    <a href="/user/set">
                        <i class="ljh5-icons ljh5-set"></i>
                        个人信息
                    </a>
                </li>
                <li class="about">
                    <a href="/user/about">
                        <i class="ljh5-icons ljh5-about"></i>
                        关于
                    </a>
                </li>
                <li class="help">
                    <a href="/user/help">
                        <i class="ljh5-icons ljh5-help"></i>
                        帮助
                    </a>
                </li>
                <li class="exit">
                    <span v-on:click="confirm_logout">
                        <i class="ljh5-icons ljh5-exit"></i>
                        退出
                    </span>
                </li>
            </ul>
        </v-main>
        <v-footer></v-footer>

        <!--<div class="mask-wrap" v-show="showMask.show">
            <div class="cont-wrap">
                <div class="cont about-cont">
                    <div class="about-show">
                        <span class="logo-mix">
                            <i class="ljh5-icons ljh5-Wtuxing"></i>
                            <i class="ljh5-icons ljh5-kouhaozi"></i>
                        </span>
                        <p class="about-version">版本号：1.8.3</p>
                    </div>
                    <p>“旺材有料”是一款工业品行业的内容分发平台，利用数据挖掘和智能推荐技术为用户呈现未来商业新世界。</p>
                    <p class="ser">客服热线：<a href="tel:021-62580663">021-62580663</a></p>
                </div>
                <div class="btn-wrap">
                    <button v-on:click="close_mask">确定</button>
                </div>
                <!- -<span class="close" v-on:click="close_message"></span>- ->
            </div>
        </div>-->

        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="logOut" :btncancel="cancel_confirm"></v-dialogconfirm>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.user-center-panel {
    padding: 20px 0 0;
    margin-bottom: 6px;
    text-align: center;
    background-color: @color-red;
    background-image: -webkit-gradient(linear, left top, left bottom, from(@color-red), to(#d75a28));
    background-image: -webkit-linear-gradient(top, @color-red, #d75a28);
    background-image: -moz-linear-gradient(top, @color-red, #d75a28);
    background-image: -ms-linear-gradient(top, @color-red, #d75a28);
    background-image: -o-linear-gradient(top, @color-red, #d75a28);
    background-image:linear-gradient(top, @color-red, #d75a28);
    span {
        display: inline-block;
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }
    .upload-button {   
        width: 100px;
        height: 140px;
        overflow: visible;
        color: #fff;
        text-align: center;
        margin: 0 auto;
        color:#fff;
        position: absolute;
        left: 50%;
        top: 5px;
        z-index: 9;
        margin-left: -50px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;
        -webkit-tap-highlight-color: transparent;
        form {
            width: 100% !important;
            height: 100% !important;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            -o-appearance: none;
            appearance: none;
            -webkit-tap-highlight-color: transparent;
        }
        input[type="file"] {
            width: 100%;
            height: 100%;
            display: block;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            -o-appearance: none;
            appearance: none;
            -webkit-tap-highlight-color: transparent;
        }
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
        background: rgba(255,255,255,0.18);
        //padding: 20px;
        position: relative;
        margin: 8px auto;
        .border-radius(50%);
        .avatar-show {
            display: block;
            width: 100%;
            border: 3px solid @color-white;
            .border-radius(50%);
        }
        .uscenter-upload-button {
            display: inline-block;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
            form {
                width: 100% !important;
                height: 100% !important;
            }
            input[type="file"] {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
    .avatar:before {
        font-size: 45px;
        display: inline-block;
        margin: 5px 0 0;
    }

    .bar {
        //background: rgba(255,255,255,0.18);
        .flex();
        margin-top: 20px;
        a {
            text-align: center;
            font-size: 16px;
            color: #ffffff;
            line-height: 28px;
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            margin: 10px 0 5px;
            i {
                display: block;
                font-size: 24px;
            }
            img {
                display: block;
                width: 27px;
                margin: 0 auto;
            }
            .count {
                font-size: 16px;
            }
        }
    }
}

.user-center-menu {
    padding: 0 0 5px;
    li {
        background: #ffffff;
        border-bottom: 1px solid @border-color;
        padding: 0 10px 0 16px;
        a,span {
            display: block;
            padding: 8px 0;
            color: @list-subinfo-color;
            font-size: 15px;
            i {
                width: 26px;
                height: 26px;
                display: inline-block;
                text-align: center;
                font-size: 19px;
                color: @color-white;
                line-height: 26px;
                .border-radius(2px);
                margin-right: 5px;
            }
            .count {
                display: inline-block;
                background: @color-red;
                font-size: 12px;
                color: @color-white;
                line-height: 14px;
                font-style: normal;
                padding: 0 4px;
                .border-radius(8px);
                position: relative;
                left: 3px;
                top: -5px;
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                transform: scale(0.8,0.8);
            }
            &:after {
                content:"";
                width: 8px;
                height: 8px;
                display: inline-block;
                float:right;
                margin-top: 8px;
                border-bottom: 1px solid #aaaaaa;
                border-right: 1px solid #aaaaaa; 
                .rotate(-45deg);
            }
        }
        span {
            &:after {
                display: none;
            }
        }
        &.order {
            a,span {
                i {
                    background: #4fc044;
                }
            }
        }
        &.history {
            a,span {
                i {
                    background: #ff834c;
                }
            }
        }
        &.feedback {
            a,span {
                i {
                    background: #3088e2;
                }
            }
        }
        &.baseinfo {
            a,span {
                i {
                    background: #3088e2;
                }
            }
        }
        &.about {
            a,span {
                i {
                    background: #f7413a;
                }
            }
        }
        &.help {
            a,span {
                i {
                    background: #2fcbdd;
                }
            }
        }
        &.exit {
            a,span {
                i {
                    background: #f7413a;
                }
            }
        }
        &.group-split {
            margin-bottom: 6px;
            border: 0;
        }
        &:last-child {
            border: 0;
        }
    }
}

.mask-wrap {
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
    .cont-wrap {
        width: 94%;
        max-height: 90%;
        background: #ffffff;
        border-top: 3px solid @color-red;
        padding: 10px;
        overflow: hidden;
        overflow-y: auto;
        position: relative;
        .cont {
            font-size: 16px;
            color: #212123;
            line-height: 180%;
            padding-bottom: 10px;
        }
        .close {
            position: absolute;
            right: 10px;
            top: 8px;
            z-index: 9;
            width: 30px;
            height: 30px;
            display: inline-block;
            background: #f1f1f1;
            .border-radius(50%);
            &:before , &:after {
                content: "";
                width: 1px;
                height: 20px;
                display: inline-block;
                background: @color-red;
                position: absolute;
                top: 5px;
                left: 14px;
            }
            &:before {
                .rotate(45deg);
            }
            &:after {
                .rotate(-45deg);
            }
        }
        .btn-wrap {
            width: 100%;
            padding: 15px 0;
            .flex();
            button {
                .btn-red();
                display: inline-block;
                padding: 5px 10px;
                .border-radius(20px);
                font-size: 16px;
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
                letter-spacing: 10px;
                text-indent: 10px;
            }
        }
    }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import CryptoJS from 'crypto-js'
import VueCoreImageUpload  from 'vue-core-image-upload'
import Storage from 'store'
let Key = CryptoJS.enc.Utf8.parse('1491881073751123');
let Iv = CryptoJS.enc.Utf8.parse('1491881073751123');
export default {
        data(){
            return {
                lists:{

                },
                cur:1,
                avatar_url:'',
                user:Storage.get("ljh5user"),
                unpaid: "0",
                showMask: {
                    show: false,
                    cont: ''
                },
                dialogConfirm: {
                    show: false,
                    cont: ""
                }
            }
        },
        components: {
            'vue-core-image-upload': VueCoreImageUpload
        },
        mounted () {
            if(this.isstorage()) {
                this.$store.dispatch('set_channel_cur','user');
            } else {
                //this.$router.push('/user/attention');
                this.$router.push('/user/custom');
            }
            this.get_user();
        },
        computed: {
            ...mapGetters(['get_usermessage_count']),
            newUser () {
                let user = Storage.get("ljh5user");
                this.user = user;
                let user_name = this.user.user_nickname;        
                return this.user;
            }
        },
        methods: {
             isstorage() {
                // if(Storage.get('ljh5user_interest') && Storage.get('ljh5user_interest').company && Storage.get('ljh5user_interest').company != "") {
                //     return true;
                // } else {
                //     return false;
                // }
                return true; //取消角色身份验证
            },
            get_user(){
                let url = API.userCenter + this.user.user_id;    
                this.$http.get(url)
                .then((response)=>{
                    //console.log(response.data);
                    if(response.data && response.data.code == "200"){
                        this.unpaid = response.data.num;
                    }
                }, (response)=>{
                    console.log(response.data);
                });
            },
            confirm_logout () {
                this.dialogConfirm = {
                    show: true,
                    cont: "真的要含泪离去吗？"
                }
            },
            cancel_confirm () {
                this.dialogConfirm = {
                    show: false,
                    cont: ""
                }
            },
            logOut () {
                Storage.remove('ljh5user');
                Storage.remove('ljh5user_visit');
                window.location.reload();
            },
            encrypt () {
                let encrypted = CryptoJS.AES.encrypt(this.user.user_id, Key,{
                    keySize: 128 / 8,
                    iv: Iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encrypted.toString()
            },
            imageuploaded (res) {
                
               if(res.url && res.code=="200"){
                    this.avatar_url = res.url+ '?v='+this.rdom();
                   
               } else {
                   alert(res.msg)
               }
            },
            rdom() {
                var rdm = Math.floor(Math.random() * 201);
               
                return rdm;
            },
            show_mask () {
                this.showMask.show = true;
            },
            close_mask () {
                this.showMask.show = false;
            }
        }     
    }
</script>
