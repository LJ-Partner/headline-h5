<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="true">
            <ul class="user-set-menu">
                <li>
                    <a href="javascript:void(0);" class="no-sign"><!-- 无跳转标识，加no-sign --><!--/user/avatar-->
                        <span class="field-tt">头像</span>
                        <span class="field-val">
                            <span class="avatar">
                                <!--<img src="../../libs/static/images/avatar.jpg" />-->
                                <img :src="'/Api/V1/User/Avatar/'+ user.user_id+'?v='+rdom()" v-if="avatar_url==''" />
                                <img :src="avatar_url" v-else/>
                            </span>
                        </span>
                        <vue-core-image-upload 
                            v-bind:class="['uscenter-upload-button']" 
                            v-bind:crop="false" url="/api/V1/User/Avatar/Upload" 
                            extensions="png,gif,jpeg,jpg"
                            v-bind:text="''" 
                            v-bind:crop="true"
                            v-bind:compress="50"
                            v-bind:headers="{auth:user.user_id+','+encrypt()}" 
                            v-on:imageuploaded="imageuploaded">
                        </vue-core-image-upload>
                    </a>
                </li>
                <li>
                    <a href="/user/nickname">
                        <span class="field-tt">昵称</span>
                        <span class="field-val">{{userInfo.nickname}}</span>
                    </a>
                </li>
                <!--
                <li>
                    <a href="/user/gender">
                        <span class="field-tt">性别</span>
                        <span class="field-val">女</span>
                    </a>
                </li>
                -->
                <li>
                    <a href="/user/editpwd">
                        <span class="field-tt">密码重置</span>
                    </a>
                </li>
                <li>
                    <a href="/user/editcompany">
                        <span class="field-tt">所在公司</span>
                        <span class="field-val">{{userInfo.company}}</span>
                    </a>
                </li>
                <li>
                    <a href="/user/editposition">
                        <span class="field-tt">公司职位</span>
                        <span class="field-val">{{userInfo.position}}</span>
                    </a>
                </li>
                <li>
                    <a href="/user/editrole">
                        <span class="field-tt">角色</span>
                        <span class="field-val">{{userInfo.roleName}}</span>
                    </a>
                </li>
            </ul>
        </v-main>
        <v-footer></v-footer>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.user-set-menu {
    background: #ffffff;
    padding: 5px 10px;
    margin-top: 55px;

    li {
        border-bottom: 1px solid #f0f2f7;
        position: relative;

        .chgavatar {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 8;
            opacity: 0;
            input {
                width: 100%;
                height: 100%;
            }
        }
    }
    a {
        display: table;
        width: 100%;
        overflow:hidden;
        padding: 8px 0;
        color: #666666;
        font-size: 15px;
        position: relative;
        i {
            color: @color-red;
            font-size: 15px;
            padding-right: 5px;
        }
        .field-tt {
            display: table-cell;
            vertical-align: middle;
            font-size: 15px;
        }
        .field-val {
            display: inline-block;
            float: right;
            margin-right: 25px;
            color: #aaaaaa;
            font-size: 15px;
        }
        .avatar {
            width: 60px;
            height: 60px;
            overflow: hidden;
            display: block;
            //border: 1px solid #cccccc;
            .border-radius(50%);

            img {
                width: 100%;
                display: block;
                .border-radius(50%);
            }
            i:before {
                font-size: 45px;
                display: inline-block;
                margin: 12px 0 0 6px;
                color: #cccccc;
            }
        }
        .uscenter-upload-button {
            display: inline-block;
            width: 100%;
            height: 100%;
            overflow: visible;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
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
            .info-aside {
                top: 46px;
            }
        }
        &:after {
            content:"";
            width: 8px;
            height: 8px;
            display: inline-block;
            position: absolute;
            right: 3px;
            top: 40%;
            border-bottom: 1px solid #aaaaaa;
            border-right: 1px solid #aaaaaa; 
            .rotate(-45deg);
        }
        
    }
    
    li:last-child {
        border: 0;
    }

    .no-sign .field-val {
        margin-right: 0;
    }
    .no-sign:after {
        display: none;
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
        computed: {
            ...mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
            newUser () {
                let user = Storage.get("ljh5user");
                this.user = user;
                let user_name = this.user.user_nickname;
                if(user_name.length>16) {
                    let replace_str = user_name.substring(5,15);
                    this.user.user_nickname = this.user.user_nickname.replace(replace_str,'**');
                }
               
                return this.user;
           }
        },
        data(){
            return {
                loading:false,
                avatar_url:'',
                user:Storage.get("ljh5user"),
                userInfo:'',
                user_interest:{
                    company:'',
                    position:'',
                    role:''
                }
            }
        },
        components: {
            'vue-core-image-upload': VueCoreImageUpload
        },
        mounted () {
            this.$store.dispatch('set_usercenter_title','个人信息');
            this.$store.dispatch('set_channel_cur','user');
            if(Storage.get("ljh5user_interest")){
                this.user_interest = Storage.get("ljh5user_interest");
            }
            this.getUserInfo();
        },
        methods: {
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
                console.log(res.url)
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
            getUserInfo(){
                this.$http.get(API.getUserInfo,{params:{userid:this.user.user_id}})
                .then((response)=>{
                    this.userInfo = response.data.userInfo;
                    this.userInfo.roleName = this.userInfo.roleNames.join();
                    Storage.set("ljh5user_interest",this.userInfo);
                }, (response)=>{
                    console.log(response.data);
                });    
            }
        }
    }
</script>



