<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-userheader v-bind:show-edit="false"></v-userheader>
        <v-main v-bind:no-padding="true" v-bind:isbg="false" class="attention-wrap">
            <form>
                <div class="user-attention">
                    <p>关注领域，更好地探索旺材有料</p>
                    <span v-for="item in lists" v-bind:class="{selected:item.concerned}" v-on:click="select_item(item)">{{item.name}}</span>
                </div>
            </form>
        </v-main>
        <div class="usattention-subwrap">
            <button type="button" class="btn-sub" v-on:click="sub_attention">选好了</button>
        </div>
        <!--<v-footer></v-footer>-->
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.attention-wrap {
    .flex();
    justify-content: center;
    align-items: center;
}
.user-attention {
    background: #ffffff;
    padding: 5px 10px;
    margin: 55px 0 30px;
    text-align: center;

    p {
        text-align: center;
        font-size: 18px;
        display: block;
        width: 100%;
        padding: 15px 0;
    }

    span {
        display: inline-block;
        border: 1px solid #d6d7de;
        .border-radius(5px);
        padding: 5px 10px;
        margin: 8px;
        font-size: 14px;
    }

    .selected {
        border-color: @color-red;
        color: @color-red;
    }
}

.usattention-subwrap {
    .flex();
    width: 100%;
    background: #ffffff;
    border-top: 1px solid #eeeeee;
    box-shadow: 0 -15px 30px #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;

    .btn-sub {
        .btn-red();
        font-size: 16px;
        letter-spacing: 5px;
        text-indent: 5px;
        width: 80%;
        padding: 8px 15px;
        .border-radius(4px);
        display: inline-block;
        margin:10px auto;
        font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
        &:disabled {
            background: #9a9ca7;
        }
    }
}

.user-result-msg {
    text-align: center;
    font-size: 14px;

    &.error {
        color: @color-red;
    }
    &.verify {
        color: #69d20a;
    }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store' 
//let user =  Storage.get("ljh5user")
export default {
    computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
    data(){
        return {
            loading:false,
            lists: [
                
            ],
            selct_items:{},
            user: Storage.get("ljh5user"),
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
        Storage.remove('ljh5user_interest');
        if(this.isstorage()) {
            this.$store.dispatch('set_usercenter_title','定制我的专属头条 - 旺材有料');
            this.getAttention();    
            this.$store.dispatch('set_channel_cur','user');
        } else {
            this.$router.push('/user')
        }
    },
    methods: {
        isstorage() {
            if(Storage.get('ljh5user_interest')) {
                return false;
            } else {
                return true;
            }
        },
        select_item (item) {
            for(var i = 0; i < this.lists.length; i++) {
                if(this.lists[i] == item){
                    if(this.lists[i].concerned) {
                        this.lists[i].concerned = false;
                        delete  this.selct_items['id'+this.lists[i].id] ;
                    } else {
                        this.lists[i].concerned = true;
                        this.selct_items['id'+this.lists[i].id] = this.lists[i];
                    }
                }
            }
            //console.log(this.selct_items)
        },
        sub_attention () {
            let selct_count = 0 ;
            
            for (var k in this.selct_items) {
                if (this.selct_items.hasOwnProperty(k) && this.selct_items[k]) {
                    ++selct_count;
                }
            }

            if(selct_count == 0) {
                this.show_dialog("最少选择1个",true,1500,false);
            } else {
                //alert("您选择了：" + selct_count);
                //window.location.href = "/user";
                let arr=[];
                for(var key in this.selct_items) {
                    arr.push(this.selct_items[key].id);
                    // console.log(this.selct_items[key].id)
                }
                
                if( this.user ) {
                    let url=API.articleAttentionSave;
                    this.$http.post(url,
                    {
                        interested: arr.join(),
                        user_id:this.user.user_id
                    })
                    .then((response)=>{
                        //console.log(response.data);
                        Storage.set('ljh5user_interest',arr);
                        //this.$router.push('/');
                        if(Storage.get('ljh5url') && Storage.get('ljh5url').curUrl != "") {
                            window.location.href = Storage.get('ljh5url').curUrl;
                        } else {
                            this.$router.push('/');
                        }
                    }, (response)=>{
                        console.log(response.data);
                        
                    });
                } else {
                    //this.$router.push('/')
                    if(Storage.get('ljh5url') && Storage.get('ljh5url').curUrl != "") {
                        window.location.href = Storage.get('ljh5url').curUrl;
                    } else {
                        this.$router.push('/');
                    }
                }
            }
        },
        getAttention () {
            let url = API.articleAttention; 
            this.$http.get(url)
                .then((response)=>{
                //console.log(response.data);
                this.lists = response.data;
            }, (response)=>{
                console.log(response.data);
                
            });
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
