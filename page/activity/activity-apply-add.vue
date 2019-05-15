<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <!--<v-header></v-header>-->
        <v-main class="actapply-list-wrap" :class="{'empty-main-wrap': lists.length <= 0}" v-if="!loading" v-bind:no-padding="true" v-bind:isbg="true">
            <transition-group name="outin-actapplylist" tag="ul" v-if="lists.length > 0">
                <li v-for="item in lists" :id="'item' + item.apply_id" :key="item">
                    <router-link class="cont" :to="{ name: 'activityApplyEdit', params: {
                            activityapply_id:item.apply_id
                        }}">
                        <dl>
                            <dd>
                                <i class="ljh5-icons ljh5-huodongzhiwei"></i>
                                <p>
                                    <span class="name">{{item.name}}</span>
                                    {{item.duty}}
                                </p>
                            </dd>
                            <dd>
                                <i class="ljh5-icons ljh5-huodonggongsi"></i>
                                <p>{{item.company}}</p>
                            </dd>
                            <dd>
                                <i class="ljh5-icons ljh5-huodongshouji"></i>
                                <p>{{item.phone}}</p>
                            </dd>
                        </dl>
                    </router-link>
                    <span class="handle">
                        <i class="ljh5-icons ljh5-shanchu" v-on:click="confirm_deleteApply(item.apply_id)"></i>
                    </span>
                </li>
            </transition-group>
            <v-empty v-else v-bind:emptycont="'活动名额有限，赶快来抢吧！'"></v-empty>
        </v-main>

        <div class="actapply-panel">
            <span class="back" v-on:click="$router.go(-1)"><i class="ljh5-icons ljh5-huodongfanhui"></i></span>
            <a class="add" :href="addnewurl">
                <i class="ljh5-icons ljh5-huodongtianjia"></i>
                添加
            </a>
            <a class="checkout" v-if="lists.length > 0" @click="checkout">去结算</a>
            <a class="checkout disabled" v-else @click="showTip('请先添加报名信息')">去结算</a>
        </div>
        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="deleteApply" :btncancel="cancel_confirm"></v-dialogconfirm>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.actapply-list-wrap {
    position: absolute;
    top:0;
    bottom: 44px;
    left:0;
    right:0;
    z-index: 1;
    overflow: auto;
    background: @bg-color;
    padding:0;
    ul {
        width: 100%;
        margin: 0 auto;
    }
    li {
        .flex();
        width: 100%;
        background: @color-white;
        margin-top: 6px;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
        .cont {
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            order: -1;
            -webkit-order: -1;
            padding-left: 15px;
            dd {
                padding-right: 15px;
                .flex();
                i{
                    flex: 0 0 30px;
                    -webkit-flex: 0 0 30px;
                    order: -1;
                    -webkit-order: -1;
                    align-self: flex-start;
                    font-size: 20px;
                    color: @lightest-color;
                    line-height: 28px;
                }
                p {
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                    font-size: 14px;
                    color: @subinfo-color;
                    line-height: 24px;
                    padding: 2px 0;
                    .name {
                        color: @title-color;
                        font-weight: bold;
                        padding-right: 5px;
                    }
                }
            }
        }
        .handle {
            flex: 0 0 80px;
            -webkit-flex: 0 0 80px;
            align-self: stretch;
            background: @btn-bg-gray;
            text-align: center;
            i{
                height: 100%;
                font-size: 24px;
                color: @color-white;
                .flex();
                &:before {
                    align-self: center;
                }
            }
        }
    }

    .outin-actapplylist-enter, .outin-actapplylist-leave-active {
        opacity: 0;
        -ms-transform: translateX(30px);
        -moz-transform: translateX(30px);
        -webkit-transform: translateX(30px);
        -o-transform: translateX(30px);
        transform: translateX(30px);
    }
    .outin-actapplylist-leave-active {
        position: absolute;
    }
}
.actapply-panel {
        position: fixed;
        z-index: 9;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 44px;
        background: @color-white;
        border-top: 1px solid @split-color;
        text-align: center;
        .flex();
        .back{
            flex: 0 0 50px;
            -webkit-flex: 0 0 50px;
            order: -1;
            -webkit-order: -1;
            align-self: flex-start;
            text-align: center;
            color: @lightest-color;
            line-height: 44px;
            height: 100%;
            i {
                font-size: 26px;
            }
        }
        .add {
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            order: 0;
            -webkit-order: 0;
            text-align: center;
            font-size: 18px;
            color: @lightest-color;
            line-height: 44px;
            letter-spacing: 2px;
            text-indent: 2px;
            i {
                font-size: 26px;
                display: inline-block;
                line-height: 30px;
                position: relative;
                top: 2px;
            }
        }
        .checkout {
            flex: 0 0 110px;
            -webkit-flex: 0 0 110px;
            order: 1;
            -webkit-order: 1;
            background: @btn-bg;
            text-align: center;
            font-size: 18px;
            color: @color-white;
            line-height: 44px;
            letter-spacing: 2px;
            text-indent: 2px;
            &.disabled {
                background: @btn-bg-gray;
            }
        }
    }
</style>
<script>
import API from '../../config/api.js'
import Storage from 'store'
export default {
    data(){
        return {
            loading:false,
            addnewurl:"javascript:;",
            lists:[],
            forms:[],
            dialogConfirm: {
                show: false,
                cont: "",
                activityapply_id: 0
            },
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            user: Storage.get("ljh5user"),
            activity_id: this.$route.params.id
        }
    },
    mounted () {
        let url = "";
        if(this.activity_id && this.$route.name == "activityApplyAdd"){
            url = '/activity/apply/add/new/' + this.activity_id;
        } else {
            url = "javascript:;";
        }
        this.addnewurl = url;
        if(this.user) {
            this.getActivityApplyAddedList(this.user.user_id);
        }
    },
    methods: {
        getActivityApplyAddedList (userid) {            
            if(userid && this.activity_id && this.$route.name == "activityApplyAdd") {
                this.loading=true;
                this.$http.get(API.activityApplyAddedList,{params:{
                    activity_id: this.activity_id,
                    user_id: userid
                }})
                .then((response)=>{
                    //console.log(response.data);
                    this.lists = response.data;
                    this.loading=false;
                }, (response)=>{
                    console.log(response.data);
                });
            }
        },
        checkout () {
            var urlStr = "我要去结算：";

            if(Storage.get("ljh5user") && this.activity_id ) {
                urlStr = urlStr + "/pay/confirmOrder/" + this.activity_id;
            } else {
                urlStr = urlStr + "请先登录"
            }
            this.show_dialog(urlStr,true,1500,false);
        },
        showTip(msg) {
            this.show_dialog(msg,true,1500,false);
        },
        confirm_deleteApply (activityapply_id) {
            this.dialogConfirm = {
                show: true,
                cont: "确定要删除吗？",
                activityapply_id: activityapply_id
            }
        },
        cancel_confirm () {
            this.dialogConfirm = {
                show: false,
                cont: "",
                activityapply_id: 0
            }
        },
        deleteApply () {
            this.$http.post(API.acticityApplyDel,{id:this.dialogConfirm.activityapply_id})
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    //window.location.reload();
                    for(var i=0; i<this.lists.length; i++) {
                        if(this.lists[i].apply_id == this.dialogConfirm.activityapply_id) {
                            //this.forms.splice(i,1);
                            this.lists.splice(i,1);
                        }
                    }
                }
            }, (response)=>{
                //console.log(response.data);
            });
            this.dialogConfirm.show = false;
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
        //去结算
        toSettle(){
            
        }
    }
}
</script>