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
                            <input type="tel" placeholder="请输入手机号码" v-model="forms.user_phone" maxlength="11" />
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
                    <div class="cell wrapper ">
                        <button type="button" v-on:click="register" class="acct-btn" :disabled="btn.disabled">{{btn.text}}</button>
                    </div>
                    <div class="hyperchannel">
                        <a href="/login">已有账号？直接登录</a>
                    </div>
                </form>
                </div>
            </div>
            <!--<div class="account-foot" id="accountFoot">
               <a href="/login">已有账号？直接登录</a>
            </div>-->
        </v-centermain>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import CryptoJS from 'crypto-js'
import API from '../../config/api.js'
import Storage from 'store'
let Key = CryptoJS.enc.Utf8.parse('1491881073751123');
let Iv = CryptoJS.enc.Utf8.parse('1491881073751123');
let winheight = window.innerHeight;
export default {
    computed: mapGetters(['get_usermessage_count']),
    data () {
        return {
            forms:{
                user_phone:"",
                user_pwd:"",
                captcha:""
            },
            btn:{
                disabled:false,
                text:'注册'
            },
            msg: {
                type:true,
                text:""
            },
            btncaptcha: {
                disabled:false,
                text:'获取验证码'
            },
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            webPageSource: ''   // 注册来源 1=老版的投票 2=新版的投票 0 = 其他
        }
    },
    mounted () {
        // console.log(Storage.get("ljh5user"));
        // this.init();
        this.webPageSource = parseInt(this.$route.query.web_page_source);
        if(!this.webPageSource){
            this.webPageSource = 0;     
        }
    },
    methods: {
        register () {
            let self = this;
            //let user_phone = this.user_phone;
            let encrypted = CryptoJS.AES.encrypt(this.forms.user_phone, Key,{
                keySize: 128 / 8,
                iv: Iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            //console.log(encrypted.toString());
            //
            var telReg = !!this.forms.user_phone.match(/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/);
            //如果手机号码不能通过验证
            if(telReg == false){
                this.show_dialog("请输入正确的手机号码",true,2000,false);
                return false;
            }

            this.btn.disabled=true;
            this.btn.text="注册中..";
            this.$http.post(API.register,{
                        captcha:this.forms.captcha,
                        cipher_text:encrypted.toString(),
                        user_phone:this.forms.user_phone,
                        user_pwd:this.forms.user_pwd,
                        channel: 1,//注册通道，1：H5，2：PC，3：IOS，4：ANDROID
                        web_page_source: this.webPageSource // 注册来源 1=老版的投票 2=新版的投票 0 = 其他
                    })
                .then((response)=>{
                    this.btn.disabled=false;
                    this.btn.text="注册";
                   
                   if(response.data.code=="500"){
                        this.msg.type=false;
                        this.msg.text=response.data.msg;
                        this.show_dialog(response.data.msg,true,2000,false);
                   } else if(response.data.code=="200") {
                       Storage.set('ljh5user', response.data.info);
                        this.msg.type=true;
                        this.msg.text = response.data.msg;
                        //设置未读消息为true
                        let user = Storage.get("ljh5user");
                        this.$http.get(API.userMessageCount + user.user_id)
                        .then((response)=>{
                            if(response.data.code=="500"){
                                //console.log(response.data.msg);
                                this.show_dialog(response.data.msg,true,2000,false);
                                this.$store.dispatch('set_usermessage_count',0);
                            } else if(response.data.code=="200") {
                                if(response.data.count > 0) {
                                    this.$store.dispatch('set_usermessage_count',response.data.count);
                                } else {
                                    this.$store.dispatch('set_usermessage_count',0);
                                }
                                //console.log(response.data);
                            }
                        }, (response)=>{
                            //console.log(response.data);
                        });
                        //this.$router.push('/user/attention');
                        this.$router.push('/user/custom');
                   }
                  
                }, (response)=>{
                    this.btn.disabled=false;
                    this.btn.text="注册";
                    this.msg="网络出错,请稍后再试";
                    //console.log(response.data);
                });
        },
        sendcaptcha(){
            let self = this;
            if(!this.btncaptcha.disabled) {
                let user_phone = this.forms.user_phone;
                let encrypted = CryptoJS.AES.encrypt(user_phone, Key,{
                    keySize: 128 / 8,
                    iv: Iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                //console.log(encrypted.toString());
                //
                var telReg = !!this.forms.user_phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
                //如果手机号码不能通过验证
                if(telReg == false){
                    this.show_dialog("请输入正确的手机号码",true,2000,false);
                    return false;
                }
                this.$http.post(API.sendCaptcha,{cipher_text:encrypted.toString(),phone:this.forms.user_phone})
                    .then((response)=>{
                    // this.loading = false;
                    // this.detail = response.data;
                    if(response.data.code=="200"){
                            let resendtime = 180;
                            this.btncaptcha.disabled = true;
                            this.intervalid1 = setInterval(() => {
                                if(resendtime > 0) {
                                    resendtime--;
                                    this.btncaptcha.text = "等待(" + resendtime + ")";
                                } else {
                                    this.btncaptcha.disabled = false;
                                    this.btncaptcha.text = "获取验证码";
                                    this.beforeDestroy();
                                }
                            }, 1000)
                        } else {
                            this.show_dialog(response.data.msg,true,2000,false);
                        }
                    }, (response)=>{
                        console.log(response.data);
                    });
            } else {
                this.show_dialog("请勿频繁发送",true,2000,false);
            }
        },
        beforeDestroy () {
            clearInterval(this.intervalid1)
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