<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="true"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="true" v-if="!loading" :class="{'empty-main-wrap': lists.length <= 0}">
            <div class="user-message" v-bind:class="{'userfedit': get_usercenter_switchbtn.status}" v-if="lists.length > 0">
                <ul>
                    <li v-for="item in lists">
                        <a href="javascript:void(0);" v-on:click="show_message(item)" :class="{new:contains(item.id)}">
                            <!--<figcaption class="show" v-if="item[3]!=''">
                                <img :src="item[3]" />
                            </figcaption>-->
                            <div class="cont">
                                <p class="info">
                                    <span>{{item.msg_createtime}}</span>
                                    <span class="status" v-if="contains(item.id)">新消息</span>
                                </p>
                                <p class="cont-ct">{{item.msg_content}}</p>
                            </div>
                        </a>
                        <span class="btn-del" v-on:click="confirm_del_message(item.id)"><i></i></span>
                    </li>
                </ul>
            </div>
            <v-empty v-else v-bind:emptycont="'暂无新消息'"></v-empty>
        </v-main>
        <v-footer></v-footer>

        <div class="mask-wrap" v-show="showMessage.show">
            <div class="message-wrap">
                <p class="info">{{showMessage.time}}</p>
                <div class="cont">
                    {{showMessage.cont}}
                </div>
                <div class="btn-wrap">
                    <button v-on:click="close_message">确定</button>
                </div>
                <!--<span class="close" v-on:click="close_message"></span>-->
            </div>
        </div>
        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="del_message" :btncancel="cancel_confirm"></v-dialogconfirm>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.user-message {
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
        color: #212123;
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
            p {
                font-size: 16px;
                color: #999999;
                line-height: 27px;
                padding-bottom: 5px;
            }
            .cont-ct {
                 width: 100%;
                 height: 30px;
                 overflow: hidden;
                 position: relative;
                 /*white-space:nowrap; 
                 word-break:keep-all; 
                 text-overflow:ellipsis; 
                 -o-text-overflow:ellipsis;
                 display: -webkit-box; 
                 -webkit-box-orient: vertical;
                 -webkit-line-clamp: 2; */
                 &:after {
                     content: "···";
                     display: inline-block;
                     height: 100%;
                     background: #ffffff;
                     padding: 0 3px;
                     font-size: 18px;
                     position: absolute;
                     right: 0;
                     top: 0;
                 }
            }
            .info {
                font-size: 13px;
                color: #90929a;
                padding-bottom: 2px;
                span {
                    display: inline-block;
                    margin-right: 5px;
                    &.status {
                        font-size: 12px;
                        line-height: 14px;
                        padding: 1px 4px;
                        border: 1px solid #90929a;
                        .border-radius(20px);
                    }
                }
            }
        }
        &.new {
            p {
                color: #212123;
            }
            .info {
                span {
                    &.status {
                        color: #ffffff;
                        border-color: @color-red;
                        background: @color-red;
                    }
                }
            }
        }
    }
    
    li:last-child a {
        border: 0;
    }

    &.userfedit .btn-del {
        display: block;
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

.message-wrap {
    width: 94%;
    max-height: 90%;
    background: #ffffff;
    border-top: 3px solid @color-red;
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    .info {
        font-size: 15px;
        color: #90929a;
        line-height: 170%;
        padding: 5px 0 10px;
    }
    .cont {
        font-size: 16px;
        color: #212123;
        line-height: 180%;
        padding-bottom: 10px;
    }
    .cont * {
        font-size: 16px;
        color: #212123;
        line-height: 180%;
    }
    .close {
        position: absolute;
        right: 10px;
        top: 8px;
        z-index: 9;
        width: 30px;
        height: 30px;
        display: inline-block;
        background: #f1f1f1;
        .border-radius(50%);
        &:before , &:after {
            content: "";
            width: 1px;
            height: 20px;
            display: inline-block;
            background: @color-red;
            position: absolute;
            top: 5px;
            left: 14px;
        }
        &:before {
            .rotate(45deg);
        }
        &:after {
            .rotate(-45deg);
        }
    }
    .btn-wrap {
        width: 100%;
        padding: 15px 0;
        .flex();
        button {
            .btn-red();
            display: inline-block;
            padding: 5px 10px;
            .border-radius(20px);
            font-size: 16px;
            font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
            letter-spacing: 10px;
            text-indent: 10px;
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
    computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title','get_usermessage_count']),
    data(){
        return {
            lists:[],
            loading:false,
            showMessage:{
                id: 0,
                time: "",
                cont: "",
                show:false,
                new: []
            },
            dialogConfirm: {
                show: false,
                cont: "",
                item_id: 0
            }
        }
    },
    mounted () {
        this.$store.dispatch('set_usercenter_title','我的消息');
        this.get_message();
        this.$store.dispatch('set_channel_cur','user');
    },
    methods: {
        get_message () {
            this.loading=true;
            this.$http.get(API.userMessage + user.user_id)
            .then((response)=>{
                //console.log(response.data);
                this.lists= response.data;
                this.loading=false;

                for(var i=0; i < response.data.length; i++) {
                    if(response.data[i].msg_isread == 0) { //读取：判断是否未读信息
                        this.showMessage.new.push(response.data[i].id);
                    }
                }
            }, (response)=>{
                //console.log(response.data);
            });
        },

        show_message (message) {
            this.showMessage.id = message.id;
            this.showMessage.time = message.msg_createtime;
            this.showMessage.cont = message.msg_content;
            this.showMessage.show = true;
            for(var i = 0; i < this.showMessage.new.length; i++) {
                if(this.showMessage.new[i] == message.id){
                    this.showMessage.new.splice(i,1);

                    //修改未读字段为已读
                    this.$http.post(API.userReadedMessage + message.id,{
                        userid:user.user_id                          
                    })
                    .then((response)=>{
                        if(response.data.code=="500"){
                            console.log(response.data.msg);
                        } else if(response.data.code=="200") {
                            //window.location.reload();
                            //console.log(response.data);
                        }
                    }, (response)=>{
                    });

                    //判断是否有未读消息
                    this.$http.get(API.userMessageCount + user.user_id)
                    .then((response)=>{
                        if(response.data.code=="500"){
                            console.log(response.data.msg);
                            this.$store.dispatch('set_usermessage_count',0);
                        } else if(response.data.code=="200") {
                            if(response.data.count > 0) {
                                this.$store.dispatch('set_usermessage_count',response.data.count - 1);
                            } else {
                                this.$store.dispatch('set_usermessage_count',0);
                            }
                        }
                        //console.log(response.data);
                    }, (response)=>{
                        //console.log(response.data);
                    });
                }
            }
        },
        close_message () {
            this.showMessage.id = 0;
            this.showMessage.time = "";
            this.showMessage.cont = "";
            this.showMessage.show = false;
        },
        contains(message_id) {
            for(var i = 0; i < this.showMessage.new.length; i++) {
                if(this.showMessage.new[i] == message_id){
                    return true;
                }
            }
            return false;  
        },
        confirm_del_message (item_id) {
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
        del_message () {
            this.loading=true;
            this.$http.post(API.userDelMessage,{
                msg_id:this.dialogConfirm.item_id
            })
            .then((response)=>{
                this.loading=false;
                if(response.data.code=="500"){
                    alert(response.data.msg);
                } else if(response.data.code=="200") {
                    window.location.reload();
                    //console.log(response.data);
                }
            }, (response)=>{
                console.log(response.data);
            });
        }
    }
}
</script>
