<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="false">
            <div class="help-wrap">
                <ul class="list">
                    <li><a href="/user/shortcutforwechat">如何在微信中快速打开旺材有料？</a></li>
                    <!--<li><a href="/user/shortcutforbrowser">如何在浏览器中快速打开旺材有料？</a></li>-->
                    <li><a href="/user/shortcutforbrowser">如何在手机桌面建立旺材有料快捷方式？</a></li>
                </ul>
            </div>
        </v-main>
        <v-footer></v-footer>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.help-wrap {
    padding: 50px 0 0;
    .list {
        width: 100%;
        background: #ffffff;
        li {
            a {
                display: block;
                border-bottom: 1px solid @border-color;
                padding: 8px 10px 8px 16px;
                color: @list-subinfo-color;
                font-size: 15px;
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
                loading:false
            }
        },
        mounted () {
            this.$store.dispatch('set_usercenter_title','帮助');
            this.$store.dispatch('set_channel_cur','user');
        }
    }
</script>