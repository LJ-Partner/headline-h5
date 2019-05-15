<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" class="edit-role-w">
            <form>
                <!-- <ul class="user-nickname">
                    <li>
                        <input type="text" v-model="role" />
                        <input type="text" type="hidden" v-model="forms.role" />
                    </li>
                </ul> -->
                <input type="text" type="hidden" v-model="forms.role" />
                <div class="status-list">
                    <!-- <a href="javascript:void(0);" class="status-item" v-for="item in storage.status" v-on:click="select_status(item.id)" :class="{'active': item.id == custom_cont.status}">
                        <span class="image-wrap"><img :src="item.icon_uri"></span>
                        <span class="name">{{item.title}}</span>
                    </a> -->
                    <a href="javascript:;" class="list-item" v-for="item in storage.status" v-on:click="select_status(item.id)" :class="{'active': item.is_checked}">
                        {{item.title}}
                    </a>
                </div>
            </form>
        </v-main>
        <div class="editrole-subwrap">
            <button type="button" class="btn-sub" v-on:click="reset" :disabled="btn.disabled || len <= 0">{{btn.text}}</button>
        </div>
        <!-- <v-footer></v-footer> -->
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.edit-role-w{
    top: 45px !important;
    // display: flex;
    // flex-direction: column;
    form{
        // display: flex;
        // flex-direction: column;
        .status-list{
            margin: 0 22px;
            text-align: center;
            .flex();
            flex-wrap: wrap;
            justify-content: flex-start;
            .list-item{
                padding: 6px 8px;
                margin: 18px 10px 0 0;
                background: #F2F2F2;
                border-radius: 3px;
            }
            .active{
                background: #ff4040;
                color: #fff;
            }
            .status-item{
                width: 50%;
                display: inline-block;
                text-align: center;
                margin-top: 70px;
                .image-wrap{
                    width: 100px;
                    height: 100px;
                    display: block;
                    border: 2px solid #6b4b3b;
                    .border-radius(50%);
                    margin: 0 auto;
                    position: relative;
                    img{
                        width: 75px;
                        display: block;
                        margin: 0 auto;
                        position: relative;
                        bottom: 46px;
                    }
                }
                .name{
                    width: 100%;
                    display: block;
                    text-align: center;
                    font-size:16px;
                    color: @title-color;
                    line-height: 26px;
                    padding: 10px 0;
                    .transition(all,0.3s,ease);
                }
                &.active{
                    .image-wrap{
                        background-color: #fac15b;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                        .animation(elasticscale,0.8s,ease,1);
                    }
                    .name{
                        color: @color-red;
                        transform: scale(1.3,1.3) translate(0,10px);
                        -ms-transform: scale(1.3,1.3) translate(0,10px);
                        -moz-transform: scale(1.3,1.3) translate(0,10px);
                        -webkit-transform: scale(1.3,1.3) translate(0,10px);
                        -o-transform: scale(1.3,1.3) translate(0,10px);
                    }
                }
            }
        }  
    }
}
.user-nickname {
    background: #ffffff;
    padding: 5px 10px;
    margin-top: 55px;

    input {
        width: 100%;
        height: 36px;
        background: #ffffff;
        border: 0;
        font-size: 16px;
        font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
    }
}

.editrole-subwrap {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    transition: all 0.3s linear;
    background-color: #fff;
    .btn-sub {
        border: none;
        outline: none;
        -webkit-appearance: none;
        background: #ff4040;
        display: block;
        text-align: center;
        font-size: 18px;
        color: #ffffff;
        font-family: "PingFang SC", "Hiragino Sans GB", Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
        height: 50px;
        line-height: 50px;
        width: 100%;
        &:disabled {
            background: #9a9ca7;
        }
    }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store' 
let user = Storage.get("ljh5user");
let user_interest =  Storage.get("ljh5user_interest");
export default {
        computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
        data(){
            return {
                loading:false,
                roleArr:[{id:1,name:'老板'},{id:2,name:'采购'},{id:3,name:'销售'},{id:4,name:'技术'},{id:5,name:'其他'}],
                forms:{
                    role:''
                },
                btn:{
                    disabled:false,
                    text:'确认'
                },
                len:'',
                dialog: {
                    dialogShow: false,
                    dialogCont: "",
                    dialogIsauto: true,
                    dialogLife: 3000,
                    dialogIsclosebtn: false
                },
                storage: {
                    status: []                          //身份
                },
                custom_cont: {
                    status: []
                }
            }
        },
        mounted () {
            this.$store.dispatch('set_usercenter_title','修改角色');
            this.$store.dispatch('set_channel_cur','user');
            if(user_interest){
                this.custom_cont.status = user_interest.role_ids;
                this.len = this.custom_cont.status;
            }else{
                this.btn.disabled = true;
            }
            this.getRoleList();
        },
        methods: {
            //选择身份
            select_status(item){
                for(var i = 0; i < this.storage.status.length; i++) {
                    if(this.storage.status[i].id == item){
                        if(this.storage.status[i].is_checked) {
                            this.storage.status[i].is_checked = false;
                            for(var j = 0; j < this.custom_cont.status.length; j++) {
                                if(this.custom_cont.status[j] == item) {
                                    this.custom_cont.status.splice(j,1);
                                    break;
                                }
                            }
                        } else {
                            if(this.custom_cont.status.length < 3){
                                this.storage.status[i].is_checked = true;
                                this.custom_cont.status.push(item);
                            } else {
                                this.show_dialog("最多选择3个",true,1000,false);
                            }
                        }
                        break;
                    }
                }
                this.len = this.custom_cont.status.length;
            },
            getRoleList () {
                let url = API.userCustom; 
                this.$http.get(url)
                .then((response)=>{
                    if (response.data.code && response.data.code == 200) {
                        //console.log(response.data);
                        for(var i = 0; i < response.data.data.length; i++){
                            switch(response.data.data[i].type) {
                                case 1: this.storage.status = response.data.data[i].list; break;
                                default: break;
                            }
                        }
                        if(this.custom_cont.status && this.custom_cont.status.length > 0){
                            this.custom_cont.status.map((item,index)=>{
                                this.storage.status.map((subitem,subindex)=>{
                                    if(item == subitem.id){
                                        subitem.is_checked = true;    
                                    }  
                                })        
                            }) 
                        } 
                    }
                }, (response)=>{
                    //console.log(response.data);
                });
            },
            reset () {
                if(this.custom_cont.status == "") {
                    this.show_dialog("请选择您的角色",true,2000,false);
                } else {
                    this.btn.disabled=true;
                    this.btn.text="修改中..";
                    let send_params = {
                        user_id:parseInt(user.user_id),
                        content:this.custom_cont.status.join(','),    
                    };
                    this.$http.post(API.updateRole,send_params)
                    .then((response)=>{
                        // this.loading = false;
                        this.btn.disabled=false;
                        this.btn.text="确认";
                        if(response.data.code=="500"){
                            this.show_dialog(response.data.msg,true,2000,false);
                        } else if(response.data.code=="200") {
                            if(user_interest){
                                user_interest.role_ids = this.custom_cont.status;
                                Storage.set('ljh5user_interest', user_interest);
                            }else{
                                Storage.set('ljh5user_interest', {role_ids:this.custom_cont.status});   
                            }
                            this.$router.push("/user");
                        }
                    }, (response)=>{
                        this.btn.disabled=false;
                        this.btn.text="确认";
                        this.show_dialog("网络出错,请稍后再试",true,2000,false);
                    });
                }
            },
            //提示框
            show_dialog (cont,isauto,life,isclosebtn) {
                this.dialog.dialogShow = true;
                this.dialog.dialogCont = cont;
                this.dialog.dialogIsauto = isauto;
                this.dialog.dialogLife = life;
                this.dialog.dialogIsclosebtn = isclosebtn;
            },
            close_dialog() {
                this.dialog.dialogShow = false;
                this.dialog.dialogCont = "";
                this.dialog.dialogLife = 3000;
            },
        }
    }
</script>
