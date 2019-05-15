<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="true">
            <form>
                <ul class="user-editpwd">
                    <li>
                        <input type="password" placeholder="输入新密码（不少于6位数字）" v-model="forms.user_pwd" />
                    </li>
                    <li>
                        <input type="password" placeholder="再次输入密码" v-model="forms.user_repwd" />
                    </li>
                </ul>
                <div class="userpwd-subwrap">
                    <button type="button" class="btn-sub" v-on:click="reset" :disabled="btn.disabled">{{btn.text}}</button>
                </div>
            </form>
        </v-main>
        <v-footer></v-footer>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.user-editpwd {
    background: #ffffff;
    padding: 5px 10px;
    margin-top: 55px;
    
    li {
        border-bottom: 1px solid #f0f1f7;
    }
    input {
        width: 100%;
        height: 36px;
        background: #ffffff;
        border: 0;
        font-size: 16px;
        font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
    }
    li:last-child {
        border: 0;
    }
}

.userpwd-subwrap {
    //display: flex;
    .flex();
    background-color: transparent;
    margin: 10px auto;

    .btn-sub {
        .btn-red();
        font-size: 16px;
        letter-spacing: 5px;
        text-indent: 5px;
        padding: 8px 15px;
        .border-radius(20px);
        display: inline-block;
        margin:10px auto;
        font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
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
export default {
        computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
        data(){
            return {
                loading:false,
                forms:{
                    user_pwd:"",
                    user_repwd:""
                },
                btn:{
                    disabled:false,
                    text:'确认'
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
            this.$store.dispatch('set_usercenter_title','重置密码');
            this.$store.dispatch('set_channel_cur','user');
        },
        methods: {
            reset () {
                if(this.forms.user_pwd != this.forms.user_repwd || this.forms.user_repwd == "") {
                    this.show_dialog("两次输入的密码不一致",true,2000,false);
                } else {
                    this.btn.disabled=true;
                    this.btn.text="重置中..";
                    this.$http.post(API.userresetpwd,{
                        user_id:Storage.get("ljh5user").user_id,
                        pwd:this.forms.user_pwd
                    })
                    .then((response)=>{
                        // this.loading = false;
                        this.btn.disabled=false;
                        this.btn.text="确认";
                        //console.log(response.data);
                        if(response.data.code=="500"){
                            this.show_dialog(response.data.msg,true,2000,false);
                        } else if(response.data.code=="200") {
                            this.show_dialog("修改成功",true,1000,false);
                            this.$router.push("/user");
                        }
                    }, (response)=>{
                        this.btn.disabled=false;
                        this.btn.text="确认";
                        this.show_dialog("网络出错，请稍后再试",true,2000,false);
                        console.log(response.data);
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
