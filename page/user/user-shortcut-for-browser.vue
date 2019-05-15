<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="false" class="no-footer" :class="appBarShow ? '' : 'app-main'">
            <div class="help-piccont-wrap">
                <div class="cont">
                    <img src="/assert/dist/images/help/help-shortcutforbrowser-01.jpg" />
                    <img src="/assert/dist/images/help/help-shortcutforbrowser-02.jpg" />
                </div>
            </div>
        </v-main>
        <!--<v-footer></v-footer>-->
    </v-content>
</template>
<style lang="less">
.app-shortcut-browser .help-piccont-wrap{
    padding: 0;
}
.app-main{
    .help-piccont-wrap{
        padding: 0;
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
            this.$store.dispatch('set_usercenter_title','旺材有料桌面快捷方式');
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