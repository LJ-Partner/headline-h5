<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="true" :class="{'empty-main-wrap': !lists || lists.length <= 0}">
            <div class="user-attentionAuthor" v-if="lists.length > 0">
                <transition-group name="outin-list" tag="ul">
                    <li v-for="item in lists" :id="'item' + item.author_id" :key="item">
                        <a :href="'/article/author/'+item.author_id">
                            <div class="cont">
                                <h3>{{item.author_name}}</h3>
                                <p>
                                    <span><i class="ljh5-icons ljh5-xihuan"></i>{{item.attentioncount}}人关注</span>
                                </p>
                            </div>
                        </a>
                        <span class="btn-del" v-on:click="confirm_del_attentionauthor(item.author_id)">取消关注</span>
                    </li>
                </transition-group>
            </div>
            <v-empty v-else v-bind:emptycont="'您的关注为空'"></v-empty>
        </v-main>
        <v-footer></v-footer>
        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="del_attentionauthor" :btncancel="cancel_confirm"></v-dialogconfirm>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.user-attentionAuthor {
    width: 100%;
    overflow: hidden;
    padding: 0 10px;
    margin-top: 50px;
    ul {
        width: 100%;
        margin: 0 auto;
    }
    li {
        width: 100%;
        //display: flex;
        //justify-content: space-around;
        .flex();
        padding: 5px 15px;
        margin: 6px auto;
        background: @color-white;
        .border-radius(5px);
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
        -ms-transition: all 1s;
        -o-transition: all 1s;
        transition: all 1s;
    }
    a {
        padding: 8px 0;
        color: #666666;
        font-size: 15px;
        flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        order: -1;
        -webkit-order: -1;
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
                padding-bottom: 3px;
            }
            span {
                display: inline-block;
                margin-right: 5px;
                font-size: 14px;
                color: @color-gray-9;
                i {
                    margin-right: 2px;
                    font-size: 14px;
                }
            }
        }
    }
    li:last-child a {
        border: 0;
    }

    .btn-del {
        text-align: center;
        align-self: center;
        flex: 0 0 70px;
        -webkit-flex: 0 0 70px;
        margin-left: 30px;
        border: 1px solid @color-gray-9;
        color: @color-gray-6;
        .border-radius(5px);
        padding: 1px 0;
    }

    &.userfedit .btn-del {
        display: block;
    }

    .outin-list-enter, .outin-list-leave-active {
        opacity: 0;
        -ms-transform: translateX(30px);
        -moz-transform: translateX(30px);
        -webkit-transform: translateX(30px);
        -o-transform: translateX(30px);
        transform: translateX(30px);
    }
    .outin-list-leave-active {
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
            dialogConfirm: {
                show: false,
                cont: "",
                author_id: 0
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
        this.$store.dispatch('set_usercenter_title','我关注的作者');
        this.get_attentionauthor();
        this.$store.dispatch('set_channel_cur','attention');
    },
    methods: {
        get_attentionauthor () {
            this.loading=true;
            this.$http.get(API.authorFollowList + Storage.get("ljh5user").user_id)
            .then((response)=>{
                this.lists= response.data.List;
                this.loading=false;
            }, (response)=>{
                // console.log(response.data);
            });
        },

        confirm_del_attentionauthor (author_id) {
            this.dialogConfirm = {
                show: true,
                cont: "确定要取消关注吗？",
                author_id: author_id
            }
        },
        cancel_confirm () {
            this.dialogConfirm = {
                show: false,
                cont: "",
                author_id: 0
            }
        },
        del_attentionauthor () {
            //this.loading=true;
            this.$http.post(API.authorUnFollow,{
                userid:user.user_id,
                authorid:this.dialogConfirm.author_id
            })
            .then((response)=>{
                this.loading=false;
                if(response.data.code=="500"){
                    this.show_dialog(response.data.msg,true,2000,false);
                } else if(response.data.code=="200") {
                    for(var i=0; i<this.lists.length; i++) {
                        if(this.lists[i].author_id == this.dialogConfirm.author_id) {
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
