<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="false" class="feedback-issue-wrap">
            <div class="feedback-field">
                <textarea class="feedback-ipt" autofocus="true" maxlength="200" placeholder="请输入您的宝贵意见~" v-on:click="onFocus" v-model="feedbackCont"></textarea>
                <div class="curType" :class="{open:isShowTypeLibrary}" v-on:click="showTypeLibrary">{{curType.text}}</div>
                <button type="button" class="btn-sub" v-on:click="issueOpinion">确认提交</button>
            </div>
        </v-main>
        <v-footer></v-footer>
        
        <transition name="feedbacktype-fade">
        <div class="mask-wrap-feedbacktype" v-if="isShowTypeLibrary">
            <div class="cont-wrap">
                <p class="title">请选择所属类别：</p>
                <ul v-if="lists.length > 0">
                    <li v-for="item in lists" :class="{selected: item[0]==curType.id}" v-on:click="chooseType(item[0],item[1])">
                        {{item[1]}}
                        <i class="ljh5-icons ljh5-gouxuan" v-if="item[0]==curType.id"></i>
                    </li>
                </ul>
            </div>
        </div>
        </transition>

        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.feedback-issue-wrap {
    .feedback-field {
        margin-top: 55px;
        padding: 0 15px;
        .feedback-ipt {
            width: 100%;
            height: 56px;
            padding: 5px 10px;
            background: #f6f6f6;
            border: 0;
            .border-radius(4px);
            font-size: 15px;
            line-height: 22px;
            font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
            resize: none;
        }
        .curType {
            width: 100%;
            height: 36px;
            padding: 0 10px;
            background: #f6f6f6;
            border: 0;
            .border-radius(4px);
            font-size: 15px;
            line-height: 36px;
            position: relative;
            margin-top: 5px;
            &:after {
                content: "";
                width: 12px;
                height: 12px;
                border-bottom: 1px solid @def-font-color;
                border-right: 1px solid @def-font-color;
                .rotate(45deg);
                position: absolute;
                right: 15px;
                top: 7px;
                -webkit-transition: all 0.2s;
                -moz-transition: all 0.2s;
                -ms-transition: all 0.2s;
                -o-transition: all 0.2s;
                transition: all 0.2s;
            }
            &.open {
                &:after {
                    .rotate(-135deg);
                    top: 15px;
                }
            }
        }
        .btn-sub {
            width: 100%;
            height: 40px;
            padding: 0 5px;
            background: @color-red;
            border: 0;
            .border-radius(4px);
            font-size: 18px;
            color: @color-white;
            line-height: 40px;
            letter-spacing: 2px;
            text-indent: 2px;
            font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
            margin-top: 15px;
        }
    }
}

.mask-wrap-feedbacktype {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    .flex();
    justify-content: center;
    align-items: center;
    .cont-wrap {
        width: 90%;
        max-height: 90%;
        background: #ffffff;
        .border-radius(5px);
        padding: 10px 0;
        overflow: hidden;
        overflow-y: auto;
        position: relative;
        .title {
            width: 100%;
            padding: 15px 15px 10px;
            font-size: 18px;
            color: @def-font-color;
            line-height: 30px;
        }
        li {
            width: 100%;
            padding: 0 15px;
            border-bottom: 1px solid @color-gray-f;
            font-size: 18px;
            color: @def-font-color;
            line-height: 46px;
            &.selected {
                color: @color-blue;
                position: relative;
                i {
                    font-size: 26px;
                    color: @color-blue;
                    position: absolute;
                    right: 15px;
                    top: -1px;
                }
            }
            &:last-child {
                border: 0;
            }
        }
    }
}
.feedbacktype-fade-enter-active {
    -ms-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear;
}
.feedbacktype-fade-leave-active {
    -ms-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear;
}
.feedbacktype-fade-enter, .feedbacktype-fade-leave-active {
    //opacity: 0;
    -ms-transform: translateX(100%);
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    -o-transform: translateX(100%);
    transform: translateX(100%);
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
            user: Storage.get("ljh5user"),
            feedbackCont: "",
            curType: {
                id: 0,
                text: "",
            },
            isShowTypeLibrary: false,
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
        this.$store.dispatch('set_usercenter_title','意见反馈');
        this.get_type();
        this.$store.dispatch('set_channel_cur','user');
    },
    methods: {
        get_type () {
            this.loading=true;
            this.$http.get(API.feedbackCategory)
            .then((response)=>{
                //console.log(response.data);
                if(response.data.code=="500"){
                    //this.show_dialog(response.data.msg,true,2000,false);
                } else {
                    this.lists= response.data.MessageCategoryList;
                    this.curType = {
                        id: this.lists[0][0],
                        text: this.lists[0][1]
                    };
                }
                this.loading=false;
            }, (response)=>{
                //console.log(response.data);
            });
        },
        showTypeLibrary () {
            this.isShowTypeLibrary = !this.isShowTypeLibrary;
        },
        chooseType (id,text) {
            this.curType = {
                id: id,
                text: text
            };
            this.isShowTypeLibrary = false;
        },
        issueOpinion() {
            let self = this;
            if (this.feedbackCont.length >= 10 && this.feedbackCont.length <= 200) {
                this.$http.post(API.feedbackIssue, {
                    user_id: parseInt(this.user.user_id),
                    categoryid: parseInt(this.curType.id),
                    message: this.feedbackCont
                })
                    .then((response) => {
                        if (response.data.code && response.data.code == '200') {
                            this.$router.push("/user/feedback");
                        } else {
                            //this.user_feedback = "";
                            this.show_dialog(response.data.msg,true,1500,false);
                        }
                    }, (response) => {
                        this.show_dialog("系统出错,请稍候再试",true,1500,false);
                    });
            } else {
                this.show_dialog("反馈内容最少10字，最多200字！",true,1500,false);
            }
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
        onFocus(){
            let _this = this;
            _this.$el.querySelector(".feedback-ipt").focus();
        }
    }
}
</script>
