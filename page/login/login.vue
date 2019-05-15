<template>
    <v-content>
        <!--<v-header v-bind:is-search="false" v-bind:is-register="false" v-bind:is-login="true">
        </v-header>-->
        <v-centermain class="accout-wrap" id="accoutWrap">
            <div class="account-main">
                <div class="account-head">
                    <!--<a href="/"><img src="../../libs/static/images/logo_show.png" /></a>-->
                    <!--<a href="/">
                        <span class="logo-mix">
                            <i class="ljh5-icons ljh5-Wtuxing"></i>
                            <i class="ljh5-icons ljh5-kouhaozi"></i>
                        </span>
                        <span class="logo"><img src="/assert/dist/images/logo.png" /></span>
                    </a>-->
                    <a href="/">
                        <span class="logo-f-wrap">
                            <i class="ljh5-icons ljh5-appzitiicon-copy"></i>
                            <span class="logo-f-sub">
                                <i class="ljh5-icons ljh5-logo-f-subpre"></i>
                                <i class="ljh5-icons ljh5-logo-f-subnext"></i>
                            </span>
                        </span>
                    </a>
                </div>
                <div class="field-group">
                <form>
                    <!--<div class="cell wrapper">
                        <span class="tip-error" v-if="!msg.type"><i class="ljh5-icons ljh5-quancha" v-if="msg.text!=''"></i>{{msg.text}}</span>
                        <span class="tip-verify" v-else-if="msg.type"><i class="ljh5-icons ljh5-gouxuan" v-if="msg.text!=''"></i>{{msg.text}}</span>
                    </div>-->
                    <div class="cell">
                        <div class="field">
                            <input type="tel" placeholder="请输入手机号码" v-model="forms.user_phone" maxlength="11" />
                            <i class="ljh5-icons ljh5-phone"></i>
                        </div>
                    </div>
                    <div class="cell">
                        <div class="field">
                            <input type="password" placeholder="请输入密码" v-model="forms.user_pwd" />
                            <i class="ljh5-icons ljh5-lock"></i>
                        </div>
                    </div>
                    <div class="cell wrapper ">
                        <button type="button" v-on:click="login" class="acct-btn" :disabled="btn.disabled">{{btn.text}}</button>
                    </div>
                    <div class="hyperchannel">
                        <a :href="regUrl">新用户？注册账号</a>
                        <a href="/user/findpwd">忘记密码？点此找回</a>
                    </div>
                </form>
                </div>
            </div>
            <!--<div class="account-foot" id="accountFoot">
               <a href="/register">新用户？注册账号</a>
            </div>-->
        </v-centermain>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.accout-wrap {
    flex-flow: column;
    -webkit-flex-flow: column;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    width: 100%;
    background: @color-white;
    padding: 0;
}
.account-head {
    display: block;
    margin: 30px auto 3px;
    text-align: center;
    height: 60px;
    img {
        width: 90%;
        //max-width: 200px;
        display: block;
        margin: 0 auto;
    }
}
.logo-mix {
    // width: 320px;
    // height: 180px;
    // overflow: hidden;
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    line-height: 60px;
    .ljh5-icons {
        font-size: 70px;
    }
    .ljh5-Wtuxing {
        // display: inline-block;
        // width: 70px;
        // height: 70px;
        // overflow: hidden;
        color: #c91919;
    }
    .ljh5-kouhaozi {
        // display: block;
        // width: 155px;
        // height: 75px;
        // overflow: hidden;
        font-size: 76px;
        margin-left: -10px;
    }
}
.logo {
    display: inline-block;
    margin: 0 auto;
    img {
        width: 220px;
        display: block;
        vertical-align: top;
        margin: 0 auto;
    }
}
.logo-f-wrap{
    display:inline-block;
    width: 200px;
    .ljh5-appzitiicon-copy{
        display:block;
        font-size: 54px;
        color: @color-red;
        line-height: 100%;
        width: 164px;
        height: 82px;
        overflow: hidden;
        margin: 0 auto;
    }
    .logo-f-sub {
        display: block;
        font-size: 68px;
        color: #ff6666;
        line-height: 100%;
        width: 156px;
        height: 68px;
        overflow: hidden;
        margin: -32px auto 0;
        .flex();
        justify-content: space-between;
        -webkit-justify-content: space-between;
        .ljh5-icons {
            font-size: 68px;
        }
    }
}
.account-foot {
    align-self: flex-end;
    width: 100%;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    a {
        display: block;
        background: @color-red;
        text-align: center;
        font-size: 16px;
        line-height: 44px;
        color: #ffffff;
    }
}

.account-main {
    .flex-column();
    flex: 0 1 auto;
    -webkit-flex: 0 1 auto;
    padding: 0 15px;
    .field-group {
        width: 100%;
        padding: 45px 10px 0;
        margin: 0 auto;
    }
   .cell {
        flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        margin:15px auto;
       .flex();
       .field {
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            .flex();
            width:100%;
            position: relative;
            input[type='text'],input[type='password'],input[type='tel']{
                padding: 10px 8px 0 38px;
                font-size: 16px;
                background: #ffffff;
                border: 0;
                border-bottom: 1px solid @border-color;
                outline: none;
                -webkit-appearance: none;
                height: 40px;
                flex: 1 1 auto;
                -webkit-flex: 1 1 auto;
                color: #9a9ca7;
                letter-spacing: 1px;
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
                width: 90%;
                .transition(all, .5s, ease);
                &:focus,&:active {
                    border-color: #ff6666;
                    .transition(all, .5s, ease);
                }
            }
            .ljh5-icons{
                display: inline-block;
                position: absolute;
                left: 0;
                top: 12px;
                width: 29px;
                height: 26px;
                border-right: 1px solid @border-color;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: 0 0;
                font-size: 20px;
                color: @lightest-color;
            }
            .get-captcha {
                bottom:4px;
                right:0;
                position: absolute;
                z-index: 2;
                background: none;
                border: 0;
                border-left: 1px solid @border-color;
                outline: none;
                -webkit-appearance: none;
                text-align: right;
                font-size: 15px;
                color: @color-red;
                line-height: 29px;
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
                padding: 0;
                width: 90px;
                height: 26px;
                &:disabled {
                    color: @lightest-color;
                }
           }
           &.mix input[type='text'] {
               padding-right: 110px;
           }
       }
       .acct-btn {
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            font-size: 22px;
            color: #ffffff;
            padding: 0;
            letter-spacing: 4px;
            text-indent: 4px;
            font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
            line-height: 46px;
            background: @color-red;
            border:none;
            .border-radius(5px);
            outline: none;
            -webkit-appearance: none;
            &:disabled {
               background: #ff6d6d;
               color: #ff9c9c;
            }
       }
       &.wrapper {
           background: none;
           padding: 15px 0;
           margin: 0 auto;
       }
       .tip-error {
           color: @color-red;
           height: 20px;
       }
       .tip-verify {
           color: #69d20a;
           height: 20px;
       }
   }
   .hyperchannel {
       width: 100%;
       .flex();
       justify-content: space-between;
        -webkit-justify-content: space-between;
       a {
           font-size: 14px;
           color: @subinfo-color;
       } 
   }
   .service {
       display: block;
       text-align: center;
       font-size: 13px;
       color: #9a9ca7;
       padding-top: 5px;
       a {
           color: #2ea9df;
       }
       span {
           color: #69d20a;
           font-size: 14px;
       }
   }
}
</style>
<script>
import CryptoJS from 'crypto-js'
import API from '../../config/api.js'
import Storage from 'store'
let Key = CryptoJS.enc.Utf8.parse('1491881073751123');
let Iv = CryptoJS.enc.Utf8.parse('1491881073751123');
let winheight = window.innerHeight;
export default {
    data () {
        return {
            forms:{
                user_phone:"",
                user_pwd:""              
            },
            btn:{
                disabled:false,
                text:'登录'
            },
            msg: {
                type:true,
                text:""
            },
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            webPageSource: '', // 注册来源 1=老版的投票 2=新版的投票 0 = 其他
            regUrl: ''
        }
    },
    mounted () {
        this.init();
        this.webPageSource = this.$route.query.web_page_source;
        if(this.webPageSource){
            this.regUrl = '/register?web_page_source='+ this.webPageSource;   
        }else{
            this.regUrl = '/register';
        }
    },
    methods: {
        login () {
             let self = this;
             let encrypted = CryptoJS.AES.encrypt(this.forms.user_phone, Key,{
                keySize: 128 / 8,
                iv: Iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            
            var telReg = !!this.forms.user_phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
            //如果手机号码不能通过验证
            if(telReg == false){
                this.show_dialog("请输入正确的手机号码",true,2000,false);
                return false;
            }

            this.btn.disabled=true;
            this.btn.text="登录中..";
            this.$http.post(API.login,{
                        cipher_text:encrypted.toString(),
                        user_phone:this.forms.user_phone,
                        user_pwd:this.forms.user_pwd,
                        fromClient: 1                         //来源 1:h5  2:android 3:iOS      
                    })
                .then((response)=>{
                   // this.loading = false;
                   // this.detail = response.data;
                    this.btn.disabled=false;
                    this.btn.text="登录";
                    if(response.data.code=="500"){
                        this.show_dialog(response.data.msg,true,2000,false);
                   } else if(response.data.code=="200") {
                        //console.log(response.data);
                        Storage.set('ljh5user', response.data.info);
                        //取回用户已感兴趣的列表,并填充localstorage
                        if(response.data.isinterest==1) {
                            Storage.set('ljh5user_interest', {company: response.data.interest.company, position: response.data.interest.position, role_ids: response.data.interest.role_ids, interest_ids: response.data.interest.interest_ids, types: response.data.interest.hope_ids,gender: response.data.interest.gender});
                        }else {
                            if(response.data.isinterest==2){
                                Storage.set('ljh5user_interest', {company: response.data.interest.company, position: response.data.interest.position, role_ids: response.data.interest.role_ids,gender: response.data.interest.gender});
                            }else{
                                Storage.set('ljh5user_interest', {company: '', position: '', role: '',gender:''});
                            }
                            this.$router.push('/user/custom');
                            return false;
                        }
                        if(Storage.get('ljh5url') && Storage.get('ljh5url').curUrl != "") {
                            window.location.href = Storage.get('ljh5url').curUrl;
                        } else {
                            this.$router.push('/user');
                        }
                   }
                }, (response)=>{
                    this.btn.disabled=false;
                    this.btn.text="登录";
                    this.show_dialog("网络出错,请稍后再试",true,2000,false);
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

        init() {
            if(Storage.get('ljh5user')){
                if(Storage.get('ljh5url') && Storage.get('ljh5url').curUrl != "") {
                    window.location.href = Storage.get('ljh5url').curUrl;
                } else {
                    this.$router.push('/user');
                }
            }
            //this.bindWinResizeEvents();
        }
        // ,
        // bindWinResizeEvents() {
        //     window.addEventListener('resize', this.winresize);
        // },
        // winresize () {
        //     let accountFoot = this.$el.querySelector("#accountFoot");
        //     if(window.innerHeight < winheight) {
        //         accountFoot.style.position = "absolute";
        //         accountFoot.style.top = "1000px";
        //         accountFoot.style.bottom = "auto";
        //     } else {
        //         accountFoot.style.position = "fixed";
        //         accountFoot.style.top = "auto";
        //         accountFoot.style.bottom = 0;
        //     }
        // }
    }
}
</script>