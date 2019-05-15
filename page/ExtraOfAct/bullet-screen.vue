<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <!--<v-userheader v-bind:show-edit="false"></v-userheader>-->
        <v-main v-bind:no-padding="true" v-bind:isbg="false" class="wrap-bullet-screen">
            <div class="bullet-screen-wrap">
                <div class="bullet-screen">
                    <div class="cont-wrap" v-if="bulletscreenSwitch">
                        <div class="item" v-for="(item,index) in newList" :style="'top:' + item.style.top + 'px;' 
                        + 'font-size:' + item.style.size + 'px;' 
                        + 'animation-delay:' + item.style.show + 's;'">
                            <!--<span class="author">{{item.author_name}}：</span>-->
                            <span class="cont" :style="'color: #' + item.style.color">{{item.cont}}</span>
                        </div>
                        <div class="item" v-for="(item,index) in list" :style="'top:' + item.style.top + 'px;' 
                        + 'font-size:' + item.style.size + 'px;' 
                        + 'animation-delay:' + item.style.show + 's;'">
                            <!--<span class="author">{{item.author_name}}：</span>-->
                            <span class="cont" :style="'color: #' + item.style.color">{{item.cont}}</span>
                        </div>
                    </div>
                    <div class="mask"></div>
                    <div class="foil"></div>
                </div>
                
            </div>
        </v-main>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
        <!--<v-footer></v-footer>-->
        <div class="bullet-screen-send-wrap" v-if="bulletscreenSwitch">
            <!--<p class="title">快给弹幕交流墙加砖吧：</p>-->
            <i class="ljh5-icons ljh5-huodongfanhui btn-back" @click="goBack"></i>
            <textarea v-model="bulletCont" maxlength="30" placeholder="快给弹幕交流墙加砖吧(限30字)"></textarea>
            <button type="button" class="btn-sub" :class="{'disabled': btnSend.disabled}" :disabled="btnSend.disabled" @click="subBullet">{{btnSend.text}}</button>
        </div>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.wrap-bullet-screen {
    bottom: 51px;
}
.bullet-screen-wrap {
    height: 100%;
    padding: 0px 0 0;
    .bullet-screen {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .cont-wrap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9;
            .item {
                width: 100%;
                color: @color-white;
                position: absolute;
                left: 100%;
                top: 0;
                -webkit-animation: across 15s linear;
                -moz-animation: across 15s linear;
                -o-animation: across 15s linear;
                animation: across 15s linear;
                -webkit-animation-fill-mode: forwards;
                -moz-animation-fill-mode: forwards;
                -o-animation-fill-mode: forwards;
                animation-fill-mode: forwards;
                // text-shadow: 0 0 1px #fff,
                //             0 0 2px #fff,
                //             0 0 3px #fff;
                .author {
                    color: @color-blue;
                }
                .cont {
                    display: inline-block;
                    line-height: 120%;
                }
                * {
                    font-size: inherit;
                }
            }
        }
        .mask {
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
        }
        .foil {
            width: 100%;
            height: 100%;
            background: url(http://pic.qiantucdn.com/58pic/26/56/32/92g58PIC26p_1024.jpg) no-repeat center center;
            background-size: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
        }
    }
}
.bullet-screen-send-wrap {
    width: 100%;
    height: 50px;
    background: @bg-color;
    padding: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 5;
    .flex();
    .title {
        font-size: 16px;
        color: @detail-title-color;
        line-height: 30px;
        padding-bottom: 5px;
    }
    .btn-back {
        width: 50px;
        height: 100%;
        text-align: center;
        font-size: 28px;
        color: @subinfo-color;
        flex: 0 0 50px !important;
        -webkit-flex: 0 0 50px !important;
        order: -1;
        -webkit-order: -1;
        align-self: flex-start;
        .flex-column();
    }
    textarea {
        flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        order:  0;
        -webkit-order: 0;
        //width: 100%;
        height: 50px;
        overflow: hidden;
        background: #fafafa;
        border: 1px solid @color-gray-d;
        //.border-radius(2px);
        padding: 5px 10px;
        resize: none;
        -webkit-appearance: none;
        font-size: 15px;
        line-height: 20px;
        font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '微软雅黑', SimSun, '宋体', sans-serif;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
        -moz-box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
        -ms-box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
        -o-box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
        box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
        -webkit-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
        -moz-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
        -ms-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
        -o-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
        transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
    }
    textarea:focus,textarea:active {
        border-color: #ff6666;
        -webkit-box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
        -moz-box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
        -ms-box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
        -o-box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
        box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
        -webkit-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
        -moz-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
        -ms-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
        -o-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
        transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
    }
    .btn-sub {
        flex: 0 0 80px;
        -webkit-flex: 0 0 80px;
        order: 2;
        -webkit-order: 2;
        align-self: flex-end;
        //width: 100%;
        height: 100%;
        background: @btn-bg;
        border: 0;
        //.border-radius(5px);
        font-size: 16px;
        color: @btn-color;
        line-height: 40px;
        margin-left: 5px;
        &.disabled {
            background: @btn-bg-gray;
        }
    }
}
</style>
<script>
//import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store'
let maxTop = window.innerHeight - 51 - 100;
export default {
        //computed: mapGetters(['get_usercenter_title']),
        data(){
            return {
                loading: false,
                bulletscreenSwitch: false,//弹幕开关
                newList: [],//新发言列表
                list: [],
                pool: [],//发言库
                bulletCont: "",
                btnSend: {
                    disabled: false,//发言按钮是否失效
                    text: "发送"
                },
                dialog: {
                    dialogShow: false,
                    dialogCont: "",
                    dialogIsauto: true,
                    dialogLife: 3000,
                    dialogIsclosebtn: false
                }
            }
        },
        mounted () {
            // this.$store.dispatch('set_usercenter_title','弹弹');
            // this.$store.dispatch('set_channel_cur','activity');
            
            this.getItems();
            //this.loopItems();
        },
        methods: {
            getItems () {
                let lists = [
                    {
                        cont: "飞雪连天射白鹿",
                        author_id: "1",
                        author_name: "旺材变压器",
                        style: {
                            top: this.randomTop(),
                            show: this.randomShow(),
                            size: this.randomSize(),
                            color: this.randomColor()
                        }
                    },
                    {
                        cont: "笑书神侠倚碧鸳",
                        author_id: "2",
                        author_name: "旺材电机",
                        style: {
                            top: this.randomTop(),
                            show: this.randomShow(),
                            size: this.randomSize(),
                            color: this.randomColor()
                        }
                    },
                    {
                        cont: "上海电气集团上海电机厂有限公司 13812345678",
                        author_id: "3",
                        author_name: "上海电气集团上海电机厂有限公司",
                        style: {
                            top: this.randomTop(),
                            show: this.randomShow(),
                            size: this.randomSize(),
                            color: this.randomColor()
                        }
                    }
                ];
                this.pool = lists;
                this.list = lists;

                this.bulletscreenSwitch = true;
            },
            //间歇循环
            loopItems () {
                if(this.bulletscreenSwitch) {
                    this.loop = setInterval(() => {
                        this.list = [];
                        setTimeout(() => {
                            this.list = this.pool;
                        }, 500);
                    }, 60000)
                }
            },
            //发布
            subBullet () {
                if(Storage.get("ljh5user")){
                    if(!this.btnSend.disabled){
                        let newCont = this.bulletCont.replace(/(^\s*)|(\s*$)/g, "");
                        if(newCont != ""){
                            let newBullet = {
                                cont: newCont,
                                author_id: Storage.get("ljh5user").user_id,
                                author_name: Storage.get("ljh5user").user_nickname,
                                style: {
                                    top: this.randomTop(),
                                    show: this.randomShow(),
                                    size: this.randomSize(),
                                    color: this.randomColor()
                                }
                            }
                            this.newList.unshift(newBullet);
                            
                            setTimeout(() => {//新发言滚动消失后清空
                                this.newList = [];
                            }, 15000);

                            //加一个时间限制，防止刷屏
                            let resendtime = 15;
                            this.btnSend.disabled = true;
                            this.resendlife = setInterval(() => {
                                if(resendtime > 0) {
                                    resendtime--;
                                    this.btnSend.text = "发送(" + resendtime + ")";
                                    // if(resendtime < 30) {
                                    //     this.pool.unshift(newBullet); //写进库 发言内容，发言人id，发言人昵称，发言时间
                                    // }
                                } else {
                                    this.btnSend.disabled = false;
                                    this.btnSend.text = "发送";
                                    this.clearRendlife();
                                }
                            }, 1000);
                        } else {
                            this.show_dialog("请输入您想说的话！",true,2000,false);
                            return false;
                        }
                    }
                    this.bulletCont = "";
                } else {
                    Storage.set('ljh5url', {preUrl: Storage.get('ljh5url') ? Storage.get('ljh5url').preUrl : "", curUrl: window.location.href});
                    this.$router.push("/login");
                }
            },
            clearRendlife () {
                clearInterval(this.resendlife);
            },
            randomTop () {
                return parseInt(Math.random()*maxTop);
            },
            randomShow () {
                return parseInt(Math.random()*5);
            },
            randomSize () {
                return 14 + parseInt(Math.random()*16);
            },
            randomColor () {
                return (Math.random() * 0x1000000 << 0).toString(16);
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
            goBack () {
                // if(Storage.get('ljh5url') && Storage.get('ljh5url').preUrl != ""){
                //     console.log(Storage.get('ljh5url').preUrl);
                //     window.location.href = Storage.get('ljh5url').preUrl;
                // } else {
                //     this.$router.go(-1);
                // }
                this.$router.go(-1);
            }
        }
    }
</script>