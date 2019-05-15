<template>
    <v-content>
        <!--<v-header v-bind:is-search="false" v-bind:is-register="true" v-bind:is-login="false">
        </v-header>-->
        <v-centermain class="accout-wrap">
            <div class="account-main">
                <div class="account-head">
                    <!--<a href="/"><img src="../../libs/static/images/logo_show.png" /></a>-->
                    <!--<a href="/">
                        <span class="logo-mix">
                            <i class="ljh5-icons ljh5-Wtuxing"></i>
                            <i class="ljh5-icons ljh5-kouhaozi"></i>
                        </span>
                    </a>-->
                    <a href="/">
                        <span class="logo-f-wrap">
                            <i class="ljh5-icons ljh5-zi1"></i>
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
                        <div class="field mix">
                            <input type="text" placeholder="请输入手机号码" v-model="forms.user_phone" maxlength="11" />
                            <i class="ljh5-icons ljh5-phone"></i>
                            <button class="get-captcha" type="button" :disabled="btncaptcha.disabled" v-on:click="sendcaptcha">{{btncaptcha.text}}</button>
                        </div>
                    </div>
                    <div class="cell">
                        <div class="field">
                            <input type="text" placeholder="请输入验证码" v-model="forms.captcha" maxlength="5" />
                            <i class="ljh5-icons ljh5-verification"></i>
                        </div>
                    </div>
                    <div class="cell">
                        <div class="field">
                            <input type="password" placeholder="请输入密码" v-model="forms.user_pwd" />
                            <i class="ljh5-icons ljh5-lock"></i>
                        </div>
                    </div>
                    <div class="cell">
                        <div class="field">
                            <input type="password" placeholder="请确认密码" v-model="forms.user_repwd" />
                            <i class="ljh5-icons ljh5-lock"></i>
                        </div>
                    </div>
                    <div class="cell wrapper ">
                        <button type="button" v-on:click="findpwd" :disabled="btn.disabled" class="acct-btn">{{btn.text}}</button>
                    </div>
                    <div class="hyperchannel">
                        <a href="/login">返回登录</a>
                    </div>
                </form>
                </div>
            </div>
            <!--<div class="account-foot" id="accountFoot">
               <a href="/login">返回登录</a>
            </div>-->
        </v-centermain>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
</style>
<script>
import CryptoJS from 'crypto-js'
import API from '../../config/api.js'
let Key = CryptoJS.enc.Utf8.parse('1491881073751123');
let Iv = CryptoJS.enc.Utf8.parse('1491881073751123');
let winheight = window.innerHeight;
export default {
    data () {
        return {
            forms:{
                user_phone:"",
                user_pwd:"",
                user_repwd:"",
                captcha:""
            },
            btn:{
                disabled:false,
                text:'确认'
            },
            msg: {
                type:true,
                text:""
            },
            winheight: false,
            btncaptcha: {
                disabled:false,
                text:'获取验证码'
            },
            isphone:()=>{
                return !!this.forms.user_phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
            },
            dialog: {
                dialogShow: false,
                dialogCont: ""
            }
        }
    },
    mounted () {
        this.$store.dispatch('set_channel_cur','user');
        //this.init();
    },
    methods: {
        findpwd () {
            //let user_phone = this.user_phone;
            let encrypted = CryptoJS.AES.encrypt(this.forms.user_phone, Key,{
                keySize: 128 / 8,
                iv: Iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            //console.log(encrypted.toString());
            //校验手机
            if (this.isphone()) {
                this.btn.disabled=true;
                this.btn.text="设置中..";
                this.$http.post(API.userFindPWD,{
                            captcha:this.forms.captcha,
                            cipher_text:encrypted.toString(),
                            user_phone:this.forms.user_phone,
                            user_pwd:this.forms.user_pwd,
                            user_rep_pwd:this.forms.user_repwd
                        })
                    .then((response)=>{
                    // this.loading = false;
                        this.btn.disabled=false;
                        this.btn.text="确认";
                        //console.log(response.data);
                        if(response.data.code=="500"){
                                //this.msg.type=false;
                                //this.msg.text=response.data.msg;
                                this.showdialog_limit(1500,response.data.msg);
                        } else if(response.data.code=="200") {
                            // Storage.set('ljh5user', response.data.info);
                                //this.msg.type=true;
                                //this.msg.text = response.data.msg;
                                this.showdialog_limit(1500,"修改成功!");
                        }
                    
                    }, (response)=>{
                        this.btn.disabled=false;
                        this.btn.text="确认";
                        this.msg="网络出错,请稍后再试";
                        console.log(response.data);
                    });
                } else {
                     this.showdialog_limit(1500,'手机格式错误')
                }
        },
        sendcaptcha(){
            let user_phone = this.forms.user_phone;
            let encrypted = CryptoJS.AES.encrypt(user_phone, Key,{
                keySize: 128 / 8,
                iv: Iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            //console.log(encrypted.toString());
            //
            if(this.isphone()) {
                this.$http.post(API.sendCaptchaFindPWD,{cipher_text:encrypted.toString(),phone:this.forms.user_phone})
                .then((response)=>{
                 
                   if(response.data.code=="200") {
                        this.countdown();
                        this.showdialog_limit(1500,"已成功发送,请注意查收");
                   } else {
                       this.showdialog_limit(1500,response.data.msg);
                   }
                   
                }, (response)=>{
                   this.showdialog_limit(1500,"系统异常,请稍后再试");
                    
                });
            } else {
                this.showdialog_limit(1500,'手机格式错误')
            }
          
        },
        countdown () {
            let resendtime = 180;
            this.btncaptcha.disabled = true;
            this.countdown = setInterval(() => {
                if(resendtime > 0) {
                    resendtime--;
                    this.btncaptcha.text = "等待(" + resendtime + ")";
                } else {
                    this.btncaptcha.disabled = false;
                    this.btncaptcha.text = "获取验证码";
                    this.destroyTimeout();
                }
            }, 1000)
        },
        destroyTimeout () {
            
            clearInterval(this.countdown)
        },
        showdialog_limit(time, msg) {
            let self = this;
            self.dialog.dialogShow = true;
            self.dialog.dialogCont = msg;
            if (self && !self._isDestroyed) {
                setTimeout(() => {

                    self.dialog.dialogShow = false;
                    self.dialog.dialogCont = "";

                }, time);
            }
        }
        // ,
        // init() {
        //     this.bindWinResizeEvents();
        // },
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