<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="false">
            <div class="about-cont">
                <div class="about-show">
                    <!--<span class="logo-mix">
                        <i class="ljh5-icons ljh5-Wtuxing"></i>
                        <i class="ljh5-icons ljh5-kouhaozi"></i>
                    </span>-->
                    <span class="logo"><img src="/assert/dist/images/logo.png" /></span>
                    <p class="about-version">版本号：2.1.1</p>
                </div>
                <p>“旺材有料”是一款工业品行业的内容分发平台，利用数据挖掘和智能推荐技术为用户呈现未来商业新世界。</p>
                <p class="ser">客服热线：<a href="tel:021-62580663">021-62580663</a></p>
                <div class="qrcode-wrap">
                    <p class="sect-title">旺材旗下微信公众号有：</p>
                    <ul>
                        <li v-for="item in qrcode_list">
                            <div class="qrcode-title">{{item.title}}</div>
                            <div class="qrcode-show"><a :href="item.link"><img :src="item.img" /></a></div>
                        </li>
                    </ul>
                </div>
            </div>
        </v-main>
        <v-footer></v-footer>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.app-main{
    .about-cont{
        padding: 0;
    }
}
.about-cont {
    padding: 50px 0 0;
    .about-show {
        display: block;
        padding: 0 10px;
        margin: 30px auto;
        text-align: center;
        *.about-version {
            font-size: 14px !important;
            //color: #9a9ca7 !important;
            text-align: center;
        }
    }
    p {
        padding: 0 10px;
    }
    .ser {
        padding-top: 10px;
        padding-bottom: 20px;
    }
    .qrcode-wrap {
        padding: 15px 0;
        border-top: 6px solid @bg-color;
        .sect-title {
            text-align: center;
            font-size: 18px;
            //font-weight: bold;
        }
        ul {
            width: 100%;
            overflow: hidden;
            li {
                width: 50%;
                float: left;
                margin-top: 15px;
                .qrcode-title {
                    width: 100%;
                    text-align: center;
                    font-size: 16px;
                    line-height: 200%;
                }
                .qrcode-show {
                    width: 100%;
                    margin: 0 auto;
                    img {
                        width: 70%;
                        max-width: 130px;
                        display: block;
                        border: 1px solid @bg-color;
                        padding: 10px;
                        margin: 0 auto;
                    }
                }
            }
        }
    }
}
.about-cont * {
    font-size: 16px;
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
                qrcode_list: [
                    {
                        title: "旺材电力",
                        img: "/assert/dist/images/wechatqrcode/dianli.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3NjE0Njk1NA==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材变压器",
                        img: "/assert/dist/images/wechatqrcode/bianyaqi.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxMDQ3ODU3Mg==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材电机",
                        img: "/assert/dist/images/wechatqrcode/dianji.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0MDU0NDMyMQ==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材锡加工",
                        img: "/assert/dist/images/wechatqrcode/xijiagong.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1MjUzODQ1Mg==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材小金属",
                        img: "/assert/dist/images/wechatqrcode/xiaojinshu.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3NjUxMDAzMw==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材铝加工",
                        img: "/assert/dist/images/wechatqrcode/lvjiagong.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI5MjQzMjIxOA==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材银加工",
                        img: "/assert/dist/images/wechatqrcode/yinjiagong.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwNjU4MDQ3NQ==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材钴锂",
                        img: "/assert/dist/images/wechatqrcode/guli.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0ODc5NTQ4NQ==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材压铸",
                        img: "/assert/dist/images/wechatqrcode/yazhu.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NTcwMTgyNw==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材流体机械",
                        img: "/assert/dist/images/wechatqrcode/yasuoji.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5NzA3MDQxMA==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材互感器",
                        img: "/assert/dist/images/wechatqrcode/huganqi.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0Njk0MTIzMQ==&scene=124#wechat_redirect"
                    },
                    {
                        title: "旺材蓄电池",
                        img: "/assert/dist/images/wechatqrcode/xudianchi.png",
                        link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyMzA0NDc2Ng==&scene=124#wechat_redirect"
                    }
                ]
            }
        },
        mounted () {
            this.$store.dispatch('set_usercenter_title','关于旺材有料');
            this.$store.dispatch('set_channel_cur','user');
        }
    }
</script>