<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <div class="feedback-tabcat">
            <ul>
                <li :class="{active: curTab == '0'}" v-on:click="changeTab('0')">我的问题</li>
                <li :class="{active: curTab == '1'}" v-on:click="changeTab('1')">常见问题</li>
            </ul>
            <span class="tab-sign" :class="{chg: curTab == '1'}"></span>
        </div>

        <v-main v-bind:no-padding="true" v-bind:isbg="false" class="feedback-wrap">
            <transition name="feedback-switch">
            <div class="feedback-list-wrap" v-if="curTab == '0'" key="0">
                <div class="feedback-list">
                    <ul v-if="lists.length > 0">
                        <li v-for="item in lists">
                            <div class="self-party">
                                <div class="cont-wrap">
                                    <div class="cont">{{item[3]}}</div>
                                    <p class="time">{{item[4]}}</p>
                                </div>
                                <img :src="avatar_url" class="avatar-show"/>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div class="other-party">
                                <i class="ljh5-icons ljh5-wo avatar"></i>
                                <div class="cont-wrap">
                                    <div class="cont">你好，使用过程中遇到任何问题，都可以在这里反馈给我们！</div>
                                    <p class="time"></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="qa-wrap" v-if="curTab == '1'" key="1">
                <ul>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">使用“旺材有料”一定需要注册吗？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">不需要，进入头条不强制注册，您可以浏览所有文章资讯和活动内容；但需要评论留言、申请报名参加活动、购置地图、进入个人中心设置头像等操作就需要注册并登录。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">如何登录“旺材有料”？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">超级方便，只需要进入注册界面，填写正确的手机号和密码即可。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">注册头条复杂吗？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">超级简单，只需要进入注册界面，填写正确的手机号和短信验证码即可。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">如何搜索我想看的文章？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">也很简单，点击最上方搜索框进入搜索界面，输入关键词然后点击“搜索”即可，每次搜索的历史都会被记录方便您下次再次搜索，整个过程类似我们常用的百度或谷歌搜索引擎一样熟悉。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">“旺材有料”文章每天都更新吗？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">没错，每个分类栏目里的文章每天下午都会有新的内容更新，及时性和更新频率都比较高。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">如何看该作者的所有文章？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">很简单，点击文章详情界面中的“关注”按钮，然后进入底部主菜单“关注”频道，选择您要的作者点击进入即可查看所有该作者的文章。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">如何设置头像？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">进入底部主菜单个人中心“我”，进入后点击上部“上传头像”即可。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">如何收藏文章？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">进入文章详情界面，在文章末尾，点击“收藏”按钮即可，收藏的文章列表都在个人中心的“收藏”里。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">如何修改登录改密码？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">进入个人中心“我”，点击进入“更多设置”，在这里修改密码。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">如何报名参加活动？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">简单，进入底部“活动”频道，先选择一个行业进入查看活动列表，在报名中的活动都可以报名，进入活动点击“立即报名”填写相关信息，如果是收付费活动那么还需要进行支付。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">“旺材有料”有哪几种支付方式？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">目前只支持微信支付。</div>
                        </div>
                    </li>
                    <li>
                        <div class="q">
                            <span class="tt">问：</span>
                            <div class="ct">付款记录在哪里看？</div>
                        </div>
                        <div class="a">
                            <span class="tt">答：</span>
                            <div class="ct">简单，进入底部个人中心“我”，点击查看“我的订单”，可以查看全部历史订单信息。</div>
                        </div>
                    </li>
                </ul>
            </div>
            </transition>
        </v-main>
        <!--<v-footer></v-footer>-->
        <a href="/user/feedbackissue" class="feedbackissue-bar">
            <i class="ljh5-icons ljh5-yijianfankui"></i>
            <span class="ipt-wrap">期待您的宝贵意见~</span>
        </a>
        
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.feedback-tabcat {
    position: fixed;
    top: 46px;
    z-index: 3;
    width: 100%;
    height: 45px;
    background: @color-gray-f;
    border-bottom: 1px solid @color-gray-e;
    ul {
        width: 100%;
        height: 45px;
        .flex();
    }
    li {
        text-align: center;
        font-size: 16px;
        color: @color-gray-6;
        flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        align-self: center;
        &.active {
            color: @color-red;
        }
    }
    .tab-sign {
        width: 50%;
        height: 3px;
        background: @color-red;
        position: absolute;
        left: 0;
        bottom: -1px;
        z-index: 3;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        -o-transition: all 0.2s;
        transition: all 0.2s;
        &.chg {
            left: 50%;
        }
    }
}

.main.feedback-wrap {
    .feedback-list-wrap ,.qa-wrap{
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        margin-top: 92px;
    }
    .feedback-list {
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        ul {
            width: 100%;
            padding: 0 10px;
            margin: 0 auto;
        }
        li {
            width: 100%;
            margin: 20px auto 10px;
            .other-party {
                .flex();
                .avatar {
                    order: -1;
                    -webkit-order: -1;
                    flex: 0 0 40px;
                    -webkit-flex: 0 0 40px;
                    align-self: flex-start;
                    background: @color-gray-f;
                    .border-radius(50%);
                    width: 40px;
                    height: 40px;
                    overflow: hidden;
                    margin-right: 20px;
                    text-align: center;
                    font-size: 30px;
                    color: @color-gray-6;
                    line-height: 50px;
                }
                .cont-wrap {
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                    align-self: flex-start;
                    .cont {
                        background: @color-gray-f;
                        .border-radius(5px);
                        box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
                        padding: 5px 10px;
                        font-size: 14px;
                        line-height: 22px;
                        position: relative;
                        &:before {
                            content: "";
                            width: 12px;
                            height: 12px;
                            .rotate(45deg);
                            background: @color-gray-f;
                            box-shadow: -2px 2px 1px rgba(0,0,0,0.1);
                            position: absolute;
                            top: 6px;
                            left: -5px;
                            z-index: 1;
                        }
                    }
                    .time {
                        font-size: 14px;
                        color: @color-gray-9;
                        line-height: 30px;
                        height: 30px;
                    }
                }
            }

            .self-party {
                .flex();
                .avatar-show {
                    order: 2;
                    -webkit-order: 2;
                    flex: 0 0 40px;
                    -webkit-flex: 0 0 40px;
                    align-self: flex-start;
                    .border-radius(50%);
                    width: 40px;
                    height: 40px;
                    overflow: hidden;
                    margin-left: 20px;
                    text-align: center;
                    font-size: 30px;
                    color: @color-gray-6;
                    line-height: 50px;
                }
                .cont-wrap {
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                    align-self: flex-start;
                    order: -1;
                    -webkit-order: -1;
                    .cont {
                        background: @color-white;
                        .border-radius(5px);
                        box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
                        padding: 5px 10px;
                        font-size: 14px;
                        line-height: 22px;
                        position: relative;
                        &:before {
                            content: "";
                            width: 12px; 
                            height: 12px; 
                            .rotate(45deg); 
                            background: @color-white;
                            box-shadow: 2px -2px 1px rgba(0,0,0,0.1);
                            position: absolute;
                            top: 6px;
                            right: -5px;
                            z-index: 1;
                        }
                    }
                    .time {
                        font-size: 14px;
                        color: @color-gray-9;
                        line-height: 30px;
                        height: 30px;
                    }
                }
            }
        }
    }


    .qa-wrap {
        ul {
            width: 100%;
            padding: 20px 0;
            li {
                width: 100%;
                padding: 0 10px 20px;
                .q,.a {
                    width: 100%;
                    .flex();
                    .tt {
                        order: -1;
                        -webkit-order: -1;
                        flex: 0 0 30px;
                        -webkit-flex: 0 0 30px;
                        align-self: flex-start;
                        font-size: 14px;
                        color: @def-font-color;
                        line-height: 22px;
                    }
                    .ct {
                        flex: 1 1 auto;
                        -webkit-flex: 1 1 auto;
                        align-self: flex-start;
                        font-size: 14px;
                        color: @def-font-color;
                        line-height: 22px;
                    }
                }
                .q {
                    padding-bottom: 5px;
                    .tt,.ct {
                        font-weight: bold;
                    }
                }
            }
        }
    }

    .feedback-switch-enter-active {
        -ms-transition: all .2s linear;
        -moz-transition: all .2s linear;
        -webkit-transition: all .2s linear;
        -o-transition: all .2s linear;
        transition: all .2s linear;
    }
    .feedback-switch-leave-active {
        -ms-transition: all .1s linear;
        -moz-transition: all .1s linear;
        -webkit-transition: all .1s linear;
        -o-transition: all .1s linear;
        transition: all .1s linear;
    }
    .feedback-switch-enter {
        //opacity: 0;
        -ms-transform: translateX(100%);
        -moz-transform: translateX(100%);
        -webkit-transform: translateX(100%);
        -o-transform: translateX(100%);
        transform: translateX(100%);
    }
    .feedback-switch-leave-active {
        opacity: 0;
    }
}

.feedbackissue-bar {
    width: 100%;
    height: 50px;
    background: @color-gray-f;
    border-top: 1px solid @color-gray-e;
    padding: 0 10px;
    position: fixed;
    bottom: 0;
    z-index: 3333;
    .flex();
    i {
        background: @color-white;
        border: 1px solid @color-gray-e;
        .border-radius(3px);
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 22px;
        color: @color-gray-6;
        line-height: 38px;
        order: -1;
        -webkit-order: -1;
        align-self: center;
        flex: 0 0 40px;
        -webkit-flex: 0 0 40px;
    }
    .ipt-wrap {
        background: @color-white;
        border: 1px solid @color-gray-e;
        .border-radius(3px);
        padding: 0 10px;
        height: 40px;
        color: @color-gray-9;
        font-size: 14px;
        line-height: 40px;
        flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        align-self: center;
    }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store' 
let user =  Storage.get("ljh5user");
export default {
    computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
    data(){
        return {
            lists:[],
            loading:false,
            curTab: "0",
            avatar_url: ""
        }
    },
    mounted () {
        this.$store.dispatch('set_usercenter_title','意见反馈');
        this.get_avatar();
        this.get_feedback();
        this.$store.dispatch('set_channel_cur','user');
        //this.showLatest();
    },
    methods: {
        get_feedback () {
            this.loading=true;
            this.$http.get(API.feedbackList + user.user_id)
            .then((response)=>{
                if(response.data.code=="500"){
                    //this.show_dialog(response.data.msg,true,2000,false);
                } else {
                    this.lists= response.data.MessageList;
                }
                this.loading=false;
            }, (response)=>{
                //console.log(response.data);
            });
        },
        changeTab (curTabId) {
            if(this.curTab != curTabId) {
                this.curTab = curTabId;
            }
        },
        get_avatar () {
            this.avatar_url = this.avatar_url == "" ? '/Api/V1/User/Avatar/'+ user.user_id+'?v=' + this.rdom() : this.avatar_url;
        },
        rdom() {
            var rdm = Math.floor(Math.random() * 201);
            return rdm;
        }/*,
        showLatest () {
            var feedbackWrap = this.$el.querySelector(".feedback-wrap");
            if(this.curTab == "0") {
                feedbackWrap.scrollTop = feedbackWrap.scrollHeight;
                console.log(feedbackWrap.scrollHeight);
                console.log(feedbackWrap.offsetHeight);
                console.log(feedbackWrap.scrollTop);
                console.log(window.innerHeight);
            }
        }*/
    }
}
</script>
