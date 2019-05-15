<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <!--<v-userheader v-bind:show-edit="false"></v-userheader>-->
        
        <v-main v-bind:no-padding="true" v-if="!loading" v-bind:isbg="true" :bottom-method="pullOrder" ref="bottom" class="orderlist-wrap" :class="{empty: lists.length <= 0}">
            <div class="order-tab">
                <ul>
                    <li :class="{active: curTab == 0}" v-on:click="changeTab(0)">全部订单</li>
                    <li :class="{active: curTab == 1}" v-on:click="changeTab(1)">待支付</li>
                    <li :class="{active: curTab == 2}" v-on:click="changeTab(2)">已支付</li>
                </ul>
            </div>
            <transition-group name="outin-orderlist" tag="ul" class="order-list" v-if="lists.length > 0">
                <li v-for="item in lists" :key="item">
                    <a :href="'/user/order/detail/' + item.order_id" class="od-list-main">
                        <div class="od-head">
                            <span class="act-type" v-if="item.activity_type == 1">会议活动</span>
                            <span class="act-type" v-else>地图活动</span>
                            <span class="act-cat">{{item.articlecategory_name}}</span>
                            <span class="od-state complete" v-if="item.order_status == 2">已完成</span>
                            <span class="od-state disabled" v-else-if="item.order_status == 3">已取消</span>
                            <span class="od-state tobepaid" v-else-if="item.order_status == 1 && item.endtime_diff > 0">待支付</span>
                            <span class="od-state disabled" v-else-if="item.order_status == 1 && item.endtime_diff <= 0">活动已结束</span>
                        </div>
                        <div class="od-main">
                            <div class="act-show"><img :src="item.activity_coverurl"></div>
                            <div class="act-main">
                                <h3>{{item.activity_title}}</h3>
                                <p>{{item.order_code}}</p>
                                <p>{{item.order_createtime}}</p>
                            </div>
                            <div class="act-count">
                                <p class="price"><i>&yen;</i>{{item.order_Price}}</p>
                                <p class="quantity" v-if="item.activity_type == 1"><i class="ljh5-icons ljh5-chacha"></i>{{item.order_num}}人</p>
                                <p class="quantity" v-else><i class="ljh5-icons ljh5-chacha"></i>{{item.order_num}}份</p>
                            </div>
                        </div>
                    </a>
                    <div class="od-count">
                        <span class="total">合计：<em><i>&yen;</i>{{item.order_Price}}</em></span>
                    </div>
                    <div class="od-handle" v-if="item.order_status == 1">
                        <span class="od-btn del" v-if="item.order_status == 1" v-on:click="confirm_delOrder(item.order_id)">取消订单</span>
                        <span class="od-btn topay" v-if="item.order_status == 1 && item.activity_status == 1" v-on:click="topay(item.order_code)">去支付</span>
                    </div>
                </li>
            </transition-group>
            <div class="order-empty" v-else>
                <img src="/assert/dist/images/order_empty.png" />
                <p>亲，您还没有相关订单哦~</p>
            </div>
        </v-main>
        <v-footer></v-footer>
        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="delOrder" :btncancel="cancel_confirm"></v-dialogconfirm>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.main.orderlist-wrap {
    //bottom: 0;
    &.empty {
        .flex-column();
        justify-content: flex-start;
        -webkit-justify-content: flex-start;
    }
    .order-tab {
        width: 100%;
        height: 40px;
        background: @color-white;
        position: relative;
        margin: 7px auto;
        flex: 0 0 40px;
        -webkit-flex: 0 0 40px;
        align-self: flex-start;
        ul {
            width: 90%;
            height: 40px;
            margin: 0 auto;
            .flex();
            justify-content: space-between;
            -webkit-justify-content: space-between;
        }
        li {
            max-width: 70px;
            height: 100%;
            border-bottom: 2px solid @color-white;
            text-align: center;
            font-size: 17px;
            color: @subinfo-color;
            line-height: 40px;
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            //align-self: center;
            -webkit-transition: all 0.2s;
            -moz-transition: all 0.2s;
            -ms-transition: all 0.2s;
            -o-transition: all 0.2s;
            transition: all 0.2s;
            &.active {
                color: @link-active-color;
                border-color: @color-red;
            }
        }
    }

    .order-list {
        width: 100%;
        overflow: hidden;
        margin: 0 auto;
        li {
            width: 100%;
            margin: 0 auto 7px;
            -webkit-transition: all 0.5s;
            -moz-transition: all 0.5s;
            -ms-transition: all 0.5s;
            -o-transition: all 0.5s;
            transition: all 0.5s;
            .od-list-main {
                width: 100%;
                display: block;
            }
            .od-head {
                width: 100%;
                height: 36px;
                background: @color-white;
                padding: 0 10px;
                font-size: 15px;
                color: @title-color;
                line-height: 36px;
                .flex();
                justify-content: space-between;
                -webkit-justify-content: space-between;
                .act-type {
                    font-size: 15px;
                    order: -1;
                    -webkit-order: -1;
                    flex: 0 0 80px;
                    -webkit-flex: 0 0 80px;
                    padding-right: 15px;
                    position: relative;
                    &:after {
                        content: "";
                        width: 3px;
                        height: 3px;
                        display: inline-block;
                        background: @subinfo-color;
                        .border-radius(50%);
                        position: absolute;
                        right: 8px;
                        top: 16px;
                    }
                }
                .act-cat {
                    font-size: 15px;
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                }
                .od-state {
                    font-size: 15px;
                    &.complete {
                        color: @color-red;
                    }
                    &.tobepaid {
                        color: @warning;
                    }
                    &.disabled {
                        color: @disabled;
                    }
                }
            }
            .od-main {
                width: 100%;
                background: @bg-color;
                padding: 8px 10px;
                .flex();
                justify-content: space-between;
                -webkit-justify-content: space-between;
                .act-show {
                    width: 64px;
                    height: 64px;
                    overflow: hidden;
                    .border-radius(5px);
                    order: -1;
                    -webkit-order: -1;
                    flex: 0 0 64px;
                    -webkit-flex: 0 0 64px;
                    align-self: flex-start;
                    margin-right: 18px;
                    img {
                        height: 100%;
                        min-width: 100%;
                        display: block;
                        .border-radius(5px);
                        margin-left: -20%;
                    }
                }
                .act-main {
                     order: 1;
                    -webkit-order: 1;
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                    align-self: flex-start;
                    h3 {
                        font-size: 14px;
                        color: @title-color;
                        line-height: 22px;
                        font-weight: normal;
                        margin-top: -4px;
                        padding-bottom: 5px;
                    }
                    p {
                        font-size: 13px;
                        line-height: 20px;
                        color: @subinfo-color;
                    }
                }
                .act-count {
                     order: 2;
                    -webkit-order: 2;
                    flex: 0 0 70px;
                    -webkit-flex: 0 0 70px;
                    align-self: flex-start;
                    margin-left: 10px;
                    text-align: right;
                    .price {
                        font-size: 15px;
                        color: @title-color;
                        line-height: 22px;
                        font-weight: bold;
                        display: block;
                        margin-top: -4px;
                        i {
                            display: inline-block;
                            margin-right: 2px;
                            font-style: normal;
                        }
                    }
                    .quantity {
                        font-size: 15px;
                        color: @subinfo-color;
                        line-height: 22px;
                        i {
                            font-size: 12px;
                            display: inline-block;
                            margin-right: 3px;
                            position: relative;
                            top: -1px;
                            -webkit-transform: scale(0.7,0.7);
                            -moz-transform: scale(0.7,0.7);
                            -ms-transform: scale(0.7,0.7);
                            -o-transform: scale(0.7,0.7);
                            transform: scale(0.7,0.7);
                        }
                    }
                }
            }
            .od-count {
                width: 100%;
                height: 30px;
                display: block;
                background: @color-white;
                padding: 3px 10px 33px;
                text-align: right;
                font-size: 14px;
                color: @title-color;
                line-height: 30px;
                .total {
                    text-align: right;
                    padding-left: 20px;
                    em {
                        font-size: 15px;
                        font-weight: bold;
                        font-style: normal;
                        i {
                            display: inline-block;
                            margin-right: 2px;
                            font-style: normal;
                        }
                    }
                }
            }
            .od-handle {
                width: 100%;
                height: 36px;
                background: @color-white;
                padding: 0 10px;
                margin-top: -5px;
                text-align: right;
                font-size: 15px;
                color: @title-color;
                line-height: 36px;
                .od-btn {
                    font-size: 15px;
                    color: @btn-border;
                    line-height: 24px;
                    display: inline-block;
                    border: 1px solid @btn-border;
                    .border-radius(5px);
                    margin: 0 0 0 20px;
                    padding: 0 5px;
                    &.topay {
                        color: @btn-border;
                        border: 1px solid @btn-border;
                    }
                    &.del {
                        color: @btn-bg-gray-color;
                        border: 1px solid @btn-bg-gray;
                    }
                }
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .outin-orderlist-enter, .outin-orderlist-leave-active {
        opacity: 0;
        -ms-transform: translateX(30px);
        -moz-transform: translateX(30px);
        -webkit-transform: translateX(30px);
        -o-transform: translateX(30px);
        transform: translateX(30px);
    }
    .outin-orderlist-leave-active {
        position: absolute;
    }

    .order-empty {
        width: 100%;
        //height: 100%;
        background: @color-white;
        text-align: center;
        flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        align-self: center;
        .flex-column();
        img {
            width: 60%;
            margin: 0 auto 40px;
            display: block;
        }
        p {
            text-align: center;
            font-size: 20px;
            color: @subinfo-color;
            line-height: 34px;
            padding-bottom: 100px;
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
            curTab: 0,
            page: 1,
            pageSize: 10,
            pageTotal: 1,
            curStatus: 0,
            dialogConfirm: {
                show: false,
                cont: "",
                order_id: 0
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
        //this.$store.dispatch('set_usercenter_title','我的订单');
        this.get_order(0);
        this.$store.dispatch('set_channel_cur','user');
        //this.showLatest();
    },
    methods: {
        get_order (orderStatus) {
            this.loading=true;
            this.page = 1;
            this.$http.get(API.orderList,{params:{
                user_id: user.user_id,
                order_status: orderStatus ? orderStatus : 0,
                page: this.page,
                size: this.pageSize
            }})
            .then((response)=>{
                //console.log(response.data);
                if(response.data && response.data.code=="200"){
                    if(response.data.data){
                        this.lists = response.data.data.list;
                        //this.pageTotal = response.data.data.allpages;
                    } else {
                        this.lists = [];
                        //this.pageTotal = 1;
                    }
                } else {
                    this.lists = [];
                    //this.pageTotal = 1;
                    this.show_dialog(response.data.msg,true,2000,false);
                }
                this.loading=false;
            }, (response)=>{
                //console.log(response.data);
            });
        },
        pullOrder(){
            if(this.page == 0){
                this.page = 1;
            } else {
                this.page++;
            }
            let url = API.orderList;
            this.$refs.bottom.setTranslate(-10,'玩命加载中...');
            this.$http.get(url,{params:{
                user_id: user.user_id,
                order_status: this.curStatus,
                page: this.page,
                size: this.pageSize
            }})
            .then((response)=>{
                //console.log(this.lists);
                //console.log(response.data);
                this.loading = false;
                if(response.data && response.data.code=="200" && response.data.data && response.data.data.list.length > 0) {
                    for(var key in response.data.data.list){
                        this.lists.push(response.data.data.list[key]);
                    }
                    //this.pageTotal = response.data.data.allpages;
                } else {
                    this.$refs.bottom.clearTranslate();
                }
            }, (response)=>{
                console.log(response.data);
            });
        },
        changeTab (curTabId) {
            if(this.curTab != curTabId) {
                this.curTab = curTabId;
                this.curStatus = curTabId;
                this.get_order(curTabId);
            }
        },
        topay (orderCode) {
            window.location.href = "/wxpay/confirmorder?ordercode=" + orderCode;
        },
        confirm_delOrder (order_id) {
            this.dialogConfirm = {
                show: true,
                cont: "确定要取消该订单吗？",
                order_id: order_id
            }
        },
        cancel_confirm () {
            this.dialogConfirm = {
                show: false,
                cont: "",
                order_id: 0
            }
        },
        delOrder () {
            this.$http.post(API.orderCancel, {
                user_id: user.user_id,
                order_id: this.dialogConfirm.order_id
            })
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    for(var i=0; i<this.lists.length; i++) {
                        if(this.lists[i].order_id == this.dialogConfirm.order_id) {
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
        }
    }
}
</script>
