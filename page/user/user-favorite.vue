<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="true"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="true" v-if="!loading" :class="{'empty-main-wrap': lists.length <= 0}">
            <div class="user-favorite" v-bind:class="{userfedit:get_usercenter_switchbtn.status}" v-if="lists.length > 0">
                <transition-group name="outin-favorite" tag="ul">
                    <li v-for="item in lists" :key="item">
                        <a :href="'/article/detail/'+item[1]+'/'+type">
                            <figcaption class="show" v-if="item[3]!=''">
                                <img :src="item[3]" />
                            </figcaption>
                            <div class="cont">
                                <h3>{{item[2]}}</h3>
                                <!--<p>
                                    <span>旺材变压器</span>
                                    <span>1890评</span>
                                    <span>1天以前</span>
                                </p>-->
                            </div>
                        </a>
                        <span class="btn-del" v-on:click="confirm_del_collect(item[0])"><i></i></span>
                    </li>
                </transition-group>
            </div>
            <v-empty v-else v-bind:emptycont="'暂无收藏，快去阅读喜欢的文章吧！'"></v-empty>
        </v-main>
        <v-footer></v-footer>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="del_collect" :btncancel="cancel_confirm"></v-dialogconfirm>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.user-favorite {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    margin-top: 55px;
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
        //display: flex;
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
            type: 2, //1推荐 2 普通
            loading:false,
            dialogConfirm: {
                show: false,
                cont: "",
                item_id: 0
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
        this.$store.dispatch('set_usercenter_title','我的收藏');
        this.get_collect();
        this.$store.dispatch('set_channel_cur','user');
    },
    methods: {
        get_collect () {
            this.loading=true;
            this.$http.get(API.usercollect + user.user_id)
            .then((response)=>{
                this.lists= response.data.Collects;
                this.loading=false;
            }, (response)=>{
                // console.log(response.data);
            });
        },
        confirm_del_collect (item_id) {
            this.dialogConfirm = {
                show: true,
                cont: "确定要删除吗？",
                item_id: item_id
            }
        },
        cancel_confirm () {
            this.dialogConfirm = {
                show: false,
                cont: "",
                item_id: 0
            }
        },
        del_collect () {
            this.loading=true;
            this.$http.post(API.userdelcollect,{
                id:this.dialogConfirm.item_id,
                userid:user.user_id
            })
            .then((response)=>{
                this.loading=false;
                if(response.data.code=="500"){
                    this.show_dialog(response.data.msg,true,2000,false);
                } else if(response.data.code=="200") {
                    //window.location.reload();
                    //console.log(response.data);
                    for(var i=0; i<this.lists.length; i++) {
                        if(this.lists[i][0] == this.dialogConfirm.item_id) {
                            this.lists.splice(i,1);
                        }
                    }
                }
            }, (response)=>{
                console.log(response.data);
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
        }
    }
}
</script>
