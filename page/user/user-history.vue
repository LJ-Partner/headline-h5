<style lang="less" scoped>
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.mainhistory {
    bottom: 106px;
}
.user-history {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    margin-top: 55px;
    position: relative;
    ul {
        width: 94%;
        margin: 0 auto;
    }
    li {
        width: 100%;
        //display: flex;
        //justify-content: space-around;
        .flex();
        margin-top: 5px;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
    }
    .btn-del {
        text-align: center;
        order: -1;
        -webkit-order: -1;
        align-self: center;
        flex: 0 0 30px;
        -webkit-flex: 0 0 30px;
        margin-right: 5px;
        display: none;
        -webkit-transition: all 1.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 1.5s;
        i {
            width: 22px;
            height: 22px;
            display: inline-block;
            background: @color-red;
            .border-radius(50%);
            position: relative;

            &:before {
                content: '';
                width: 12px;
                height: 3px;
                display: inline-block;
                background: #ffffff;
                .border-radius(2px);
                position: absolute;
                left: 5px;
                top: 9px;
            }
        }
    }
    a {
        border-bottom: 1px solid #f0f2f7;
        padding: 8px 0;
        color: #666666;
        font-size: 15px;
        flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        .flex();
        .show {
            overflow: hidden;
            margin:3px 0 0 10px;
            flex: 0 0 90px;
            -webkit-flex: 0 0 90px;

            img {
                width: 100%;
            }
        }
        .cont {
            font-size: 15px;
            order: -1;
            flex: 1;
            -webkit-flex: 1;

            h3 {
                font-size: 16px;
                color: #212123;
                padding-bottom: 5px;
            }
            span {
                display: inline-block;
                margin-right: 5px;
                font-size: 12px;
                color: #90929a;
            }
        }
    }
    li:last-child a {
        border: 0;
    }
    &.userfedit .btn-del {
        display: block;
        -webkit-transition: all 1.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 1.5s;
    }

    .outin-favorite-enter, .outin-favorite-leave-active {
        opacity: 0;
        -ms-transform: translateX(30px);
        -moz-transform: translateX(30px);
        -webkit-transform: translateX(30px);
        -o-transform: translateX(30px);
        transform: translateX(30px);
    }
    .outin-favorite-leave-active {
        position: absolute;
    }

    .empty {
        text-align: center;
        font-size: 18px;
        color: #90929a;
        padding: 30px 0;
        i {
            display: block;
            font-size: 34px;
            font-weight: bold;
            color: #90929a;
            margin: 15px auto;
        }
    }
}
.clearall-history {
    position: fixed;
    left: 0;
    bottom: 53px;
    text-align: center;
    .flex();
    width: 100%;
    background: #ffffff;
    padding: 10px 0;
    z-index: 9;
    a {
        min-width: 60%;
        height: 36px;
        display: inline-block;
        padding: 0 15px;
        font-size: 18px;
        color: #ffffff;
        line-height: 36px;
        background: @color-red;
        .border-radius(20px);
    }
}
</style>
<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="true"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="true" :class="{mainhistory:lists && lists.length > 0,'empty-main-wrap': lists.length <= 0}">
            <div class="user-history" v-bind:class="{userfedit:get_usercenter_switchbtn.status}" v-if="lists && lists.length > 0">
                <transition-group name="outin-favorite" tag="ul">
                    <li v-for="item in lists" :key="item">
                        <a :href="'/article/detail/'+item.Article_id+'/'+type">
                           <!-- <figcaption class="show" v-if="item[3]!=''">
                                <img :src="item[3]" />
                            </figcaption>-->
                            <div class="cont">
                                <h3>{{item.Article_title}}</h3>
                            </div>
                        </a>
                        <span class="btn-del" v-on:click="confirm_del_history('single',item.Article_id)"><i></i></span>
                    </li>
                </transition-group>
            </div>
            <v-empty v-else v-bind:emptycont="'暂无历史，快去阅读喜欢的文章吧！'"></v-empty>            
        </v-main>
        <div class="clearall-history" v-if="lists && lists.length > 0"><a href="javascript:void(0);" v-on:click="confirm_del_history('all')">清空所有历史记录</a></div>
        <v-footer></v-footer>
        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="del_history" :btncancel="cancel_confirm"></v-dialogconfirm>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store' 

export default {
    computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
    data(){
        return {
            lists:[],
            loading:false,
            type: 2, //1推荐 2普通
            user:Storage.get("ljh5user"),
            dialogConfirm: {
                show: false,
                cont: "",
                item_id: 0,
                delType: "single"
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
        this.$store.dispatch('set_usercenter_title','我的浏览历史');
        this.get_history();
        this.$store.dispatch('set_channel_cur','user');
    },
    methods: {          
        get_history () {
            this.loading=true;
            this.$http.get(API.userHistory + this.user.user_id)
            .then((response)=>{
                //console.log(response.data);
                this.lists= response.data;
                this.loading=false;
                //console.log(this.lists);
            }, (response)=>{
                // console.log(response.data);
            });
        },
        confirm_del_history (deltype,item_id) {
            this.dialogConfirm = {
                show: true,
                cont: deltype == "all" ? "真的要全部清除吗？" : "确定要删除吗？",
                item_id: item_id ? item_id : 0,
                delType: deltype
            }
        },
        cancel_confirm () {
            this.dialogConfirm = {
                show: false,
                cont: "",
                item_id: 0,
                delType: "single"
            }
        },
        del_history () {
            //this.loading=true;
            this.dialogConfirm.show = false;
            if(this.dialogConfirm.delType == "all") {
                this.$http.post(API.userClearHistory, {
                    userid: this.user.user_id
                })
                .then((response)=>{
                    this.loading=false;
                    if(response.data.code=="500"){
                        this.show_dialog(response.data.msg,true,2000,false);
                    } else if(response.data.code=="200") {
                        //window.location.reload();
                        this.lists = [];
                    }
                }, (response)=>{
                    console.log(response.data);
                });
            } else {
                this.$http.post(API.userDelHistory,{
                    article_id: this.dialogConfirm.item_id,
                    userid: this.user.user_id
                })
                .then((response)=>{
                    this.loading=false;
                    if(response.data.code=="500"){
                        this.show_dialog(response.data.msg,true,2000,false);
                    } else if(response.data.code=="200") {
                        //window.location.reload();
                        //console.log(response.data);
                        for(var i=0; i<this.lists.length; i++) {
                            if(this.lists[i].Article_id == this.dialogConfirm.item_id) {
                                this.lists.splice(i,1);
                            }
                        }
                    }
                }, (response)=>{
                    console.log(response.data);
                });
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
        }
    }
}
</script>