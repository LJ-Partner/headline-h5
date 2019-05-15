<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="false" class="no-footer" :class="appBarShow ? '' : 'app-main'">
            <div class="help-piccont-wrap">
                <div class="cont">
                    <img src="/assert/dist/images/help/help-shortcutforwechat-01.jpg" />
                    <img src="/assert/dist/images/help/help-shortcutforwechat-02.jpg" />
                </div>
            </div>
        </v-main>
        <!--<v-footer></v-footer>-->
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.no-footer {
    bottom: 0;
}
.app-main{
    .help-piccont-wrap{
        padding: 0;
    }
}
.help-piccont-wrap {
    padding: 46px 0 0;
    .cont {
        width: 100%;
        img {
            width: 100%;
            max-width: 750px;
            overflow: hidden;
            display: block;
            margin: 0 auto;
            vertical-align: top;
        }
    }
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import CryptoJS from 'crypto-js'
import Storage from 'store'
let Key = CryptoJS.enc.Utf8.parse('1491881073751123');
let Iv = CryptoJS.enc.Utf8.parse('1491881073751123');
export default {
        computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
        data(){
            return {
                loading:false,
                appBarShow: true
            }
        },
        mounted () {
            this.$store.dispatch('set_usercenter_title','在微信中快速打开旺材有料');
            this.$store.dispatch('set_channel_cur','user');
            this.wcApp();
        },
        methods:{
            wcApp(){                                                    //判断是否是旺材app
                var u = navigator.userAgent;
                var isSelfApp = u.indexOf('maicai360_app') > -1;
                if(isSelfApp){
                    appBarShow = false;
                }else{
                    appBarShow = true;    
                }
            }
        }
    }
</script>