<template>
    <v-content>
        <!--<v-header></v-header>-->
        
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="activity-new-header" >
            <a class="back" v-on:click="goHome()">
                <i class="ljh5-icons ljh5-fanhui"></i>
            </a>
            <h2>
                活动
            </h2>
            <!-- <div class="order-type">
                <p>热门参与</p>
                <div class="triangle-w">
                    <i class="triangle triangle-top"></i>
                        <i class="triangle triangle-bottom"></i> 
                </div>
            </div> -->
        </div>
        <v-main class="activity-new-wrap" :class="{'no-bottom':!isSelfAppFlag}" v-bind:no-padding="true" v-bind:isbg="true" :bottom-method="pullActivity"  ref="bottom">
             <ul class="activity-new-list" v-if="lists.Activity && lists.Activity.length > 0"> 
                <li class="list-item" v-for="item in lists.Activity">
                    <a :href="'/activity/detail/' + item.id + '/' + item.type +'?catName='+item.category_name" :class="{ongoing: item.endtime_diff > 0}">
                        <div class="item-header">
                            <h3>{{item.category_name}}</h3>
                            <span v-if="item.deadline > 0">报名中</span>
                            <span v-else-if="item.starttime_diff <= 0 && item.endtime_diff > 0">进行中</span>
                            <span v-else-if="item.endtime_diff <= 0">已结束</span>
                        </div>
                        <div class="item-cnt">
                            <div class="show">
                                <span>
                                    <img :src="item.coverurl" v-if="item.coverurl && item.coverurl!=''"/>
                                </span>
                            </div>
                            <div class="detail">
                                <h4>{{item.title}}</h4>
                                <p>{{item.sponsor}}</p>
                                <span>{{item.starttime.split(' ')[0].replace(/\//g,'-')}} ~ {{item.endtime.split(' ')[0].replace(/\//g,'-')}}</spam>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <p v-if="item.price == '0'">免费</p>
                            <p v-else>
                                <em>￥</em>{{item.price}}起
                            </p>
                            <span>
                                <i v-if="item.id == '1'">{{parseInt(item.apply)+502}}</i>
                                <i v-else-if="item.id == '51'">{{parseInt(item.apply)+135}}</i>
                                <i v-else-if="item.id == '24'">{{parseInt(item.apply)+1000}}</i>
                                <i v-else-if="item.id == '29'">{{parseInt(item.apply)+3000}}</i>
                                <i v-else-if="item.id == '30'">{{parseInt(item.apply)+617}}</i>
                                <i v-else-if="item.id == '36'">{{parseInt(item.apply)+19462}}</i>
                                <i v-else-if="item.id == '39'">{{parseInt(item.apply)+1039}}</i>
                                <i v-else-if="item.id == '45'">{{parseInt(item.apply)+2000}}</i>
                                <i v-else-if="item.id == '35'">{{parseInt(item.apply)+1000}}</i>
                                <i v-else>{{item.apply}}</i>
                                <em>人申请</em>
                            </span>
                        </div>
                    </a>
                </li>   
            </ul> 
            <v-empty  v-else v-bind:emptycont="'暂无相关活动'"></v-empty>
        </v-main>
        <!-- <div class="vote-enter">
            <i class="ljh5-icons ljh5-zongtoupiaoshu"></i>
            <i class="ljh5-icons ljh5-ziti_toupiao"></i>
        </div> -->
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
        <v-footer v-if="isSelfAppFlag"></v-footer>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less'; 
.activity-new-header{
    .flex();
    justify-content: space-between;
    padding: 8px 10px;
    color: #202020;
    font-family: PingFangSC-Regular;
    background: #fff;
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 44px;
    .back{
        i{
            font-size: 20px;
        }
    }
    h2{
        font-size: 18px;
        flex: 1 1 auto;
        text-align: center;
    }
    .order-type{
        font-size: 14px;
        color: #2C2C2C;
        .flex();
        flex: 0 0 72px;
        justify-content: space-between;
        align-items: center;
        .triangle-w{
            position: relative;
            z-index: 1;
            .triangle{
                width:0; 
                height:0;
                border-width:5px;
                border-style:solid;
                position: absolute;
                right: 0;
            }
            .triangle-top{
                //border-color:#202020 transparent transparent transparent;
                border-color:transparent transparent #202020 transparent;
                top: -10px;
            }
            .triangle-bottom{
                border-color:#202020 transparent transparent transparent;    
                top: 2px;
            }
        }
    }
} 
.activity-new-wrap{
    .activity-new-list{
        margin: 51px 0 0 0;
        .list-item{
            background: #fff;
            margin: 0 0 7px 0;
            a{
                display: block;
                padding: 0 14px;
                font-family: PingFangSC-Regular;
                em{
                    font-style: normal;
                }
                .item-header{
                    padding: 7px 0;
                    .flex();                    
                    justify-content: space-between;
                    h3{
                        font-size: 16px;
                        color: #202020;
                    }
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
                .item-cnt{
                    .flex();
                    padding: 7px 0;
                    justify-content: flex-start;
                    align-items: center;
                    border-top: 1px solid #F2F2F2;
                    border-bottom: 1px solid #F2F2F2;
                    .show{
                        flex: 0 0 43%;
                        width: 43%;
                        margin: 0 7px 0 0;
                        span{
                            height: 0;
                            padding: 0 0 60%;
                            display: block;
                            overflow: hidden;
                            img{
                                max-width: 100%;
                            }
                        }
                    }
                    .detail{
                        color: #717171;
                        h4{
                            
                            font-size: 15px;
                            color: #202020;
                            .multi-ellipsis(2);
                        }  
                        p{
                            font-size: 13px;
                            .multi-ellipsis(2);
                        }  
                        span{
                            font-size: 12px;
                        }
                    }
                }
                .item-bottom{
                    .flex();
                    align-items: center;
                    justify-content: space-between;
                    padding: 9px 0;
                    p{
                        font-size: 16px;
                        color: #C9C9C9;
                    }
                    span{
                        font-size: 16px;
                        color: #202020;
                        i{
                            font-style: normal;  
                            font-size: 16px;
                            font-weight: 900;
                        }
                        em{
                            font-size: 14px;
                            color: #999;
                        }
                    }
                }
            }
            .ongoing{
                .item-header{
                    span{
                        color: #FF4040;
                    }
                }
                .item-bottom{
                    p{
                        color: #FF4040;    
                    }
                }    
            }
        }
    } 
    .pub-empty{
        .flex-column();
        height: 100%;
        background: #fff;
        align-items: center;
        img{
            max-width: 100%;
            width: 80%;
        }
        p{
            font-size: 16px;
            text-align: center;
            line-height: 45px;
        }
    }
}
.activity-new-wrap.no-bottom{
    bottom: 0;
}
.vote-enter{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #FF4040;
    position: fixed;
    z-index: 10;
    right: 4px;
    .flex-column();
    align-items: center;
    bottom: 120px;
    i{
        color: #fff;
        &:first-child{
            font-size: 28px;
            top: 4px;
            position: relative;
            z-index: 1;
        }
        &:last-child{
            font-size: 30px;
            top: -2px;
            position: relative;
            z-index: 1;
        }
    }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
var u = navigator.userAgent;
//android终端                                     
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
//ios终端                  
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isSelfApp = u.indexOf('maicai360_app') > -1;        //判断是否是嵌入到app的标识
export default {
    computed: {
        ...mapGetters(['get_usercenter_switchbtn','get_usercenter_title'])
    },
    data(){
        return {
            isSelfAppFlag:true,
            lists:[],
            loading:true,
            Page:1,
            Total:0,
            isMore: true,                                           //是否还有更多数据
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
        this.$store.dispatch('set_usercenter_title','活动');
        this.$store.dispatch('set_channel_cur','activity');
        if(isSelfApp){
            this.isSelfAppFlag = false;
        }
        this.getActivityList();
    },
    methods: {
        goBack(){
            if(isSelfApp){
                //活动页面嵌入到app 返回app上一级 调用的方法
                if(isAndroid){
                    window.WCJSBridge.onBack();  
                }else{
                    WCJSBridge.onBack();     
                }                    
            }else{
                this.$router.go(-1);
            }
        },
        goHome(){
            if(isSelfApp){
                //活动页面嵌入到app 返回app首页 调用的方法
                if(isAndroid){
                    window.WCJSBridge.goHome(); 
                }else if(isIOS){
                    WCJSBridge.goHome();
                }                        
            }else{
                var home = document.querySelector('.back');
                home.setAttribute('href', '/')
            }    
        },
        //获取活动列表
        getActivityList(){
            this.loading = true;
            let url = API.getAllActivityList + '/' + this.Page;
            //let url = 'http://m.maicai360.cn/Api/V1/ActivityList/' + this.Page;
            this.$http.get(url)
            .then((response)=>{
                if(response.data && response.data.code =="200"){
                    this.lists = response.data;
                }
                this.loading = false;
            }, (response)=>{
                console.log(response.data);
            });
        },
        //下拉加载数据
        pullActivity(){
            if(this.isMore){
                if(this.Page==0){
                    this.Page=1;
                } else {
                    this.Page++;
                }
                let url = API.getAllActivityList + '/' + this.Page;
                //let url = 'http://m.maicai360.cn/Api/V1/ActivityList/' + this.Page;
                this.$refs.bottom.setTranslate(-10,'玩命加载中...');
                this.$http.get(url)
                .then((response)=>{
                    this.loading = false;
                    if(response.data && response.data.Activity && response.data.Activity.length > 0) {
                        for(var key in response.data.Activity){
                            this.lists.Activity.push(response.data.Activity[key]);
                        }
                        this.Page = response.data.Page;
                        this.Total = response.data.Total;
                    } else {
                        this.isMore = false;
                        this.$refs.bottom.clearTranslate();
                        this.Total = response.data.Total;
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
