<template>
    <v-content>
        <header class="orderDetail-header">
            <p class="header-title">订单详情</p>
            <a class="back" href="/user/order"><i class="ljh5-icons ljh5-fanhui"></i><!--返回--></a>
        </header>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-main class="orderDetail-wrap" v-bind:isbg="true" v-if="!loading" :class="{'empty-main-wrap': detail == null || !detail}">
            <div class="order-detail" v-if="detail">
                <div class="panel-state" v-if="detail.order_status == 1">
                    <p class="title">待支付</p>
                    <p class="tip" v-if="detail.activity_type == 1"><span>感谢您的参与，祝您会议愉快</span></p>
                    <p class="tip" v-else-if="detail.activity_type == 2"><span>感谢您的购买，欢迎再次光顾</span></p>
                    <i class="ljh5-icons ljh5-lishi i-state"></i>
                </div>
                <div class="panel-state" v-else-if="detail.order_status == 2">
                    <p class="title">已成交</p>
                    <p class="tip" v-if="detail.activity_type == 1"><span>感谢您的参与，祝您会议愉快</span></p>
                    <p class="tip" v-else-if="detail.activity_type == 2"><span>感谢您的购买，欢迎再次光顾</span></p>
                    <i class="ljh5-icons ljh5-zhengque i-state"></i>
                </div>
                <div class="panel-state" v-else-if="detail.order_status == 3">
                    <p class="title">已取消</p>
                    <p class="tip"><span class="cancel">感谢您的参与，如有疑问请随时联系我们</span></p>
                    <i class="ljh5-icons ljh5-cuowu i-state"></i>
                </div>
                <div class="panel-payway">
                    <i class="ljh5-icons ljh5-weixinzhifu"></i>
                    微信支付
                    <em><i>&yen;</i>{{detail.order_price}}</em>
                    <!--<a class="btn-order btn-cancel" v-if="detail.order_status == 1 && detail.endtime_diff > 0" @click="confirm_cancelOrder">取消订单</a>-->
                    <a class="btn-order btn-again" :href="detail.activity_type == 1 ? '/activity/apply/add/new/' + detail.activity_id : '/activity/map/apply/new/'+ detail.activity_id" v-if="detail.endtime_diff > 0">再次购买</a>
                    <a class="btn-order btn-pay" v-if="detail.order_status == 1 && detail.endtime_diff > 0" @click="topay(detail.order_code)">立即支付</a>
                </div>
                <div class="panel-order">
                    <div class="panel-title">
                        订单编号:{{detail.order_code}}
                        <span class="sub-title">{{detail.order_time}}</span>
                    </div>
                    <div class="pro-title"><a :href="'/activity/detail/' + detail.activity_id + '/' + detail.activity_type">{{detail.activity_title}}</a></div>
                    <dl>
                        <dt>{{detail.activity_type == 1 ? '套餐价格' : '地图价格'}}</dt>
                        <dd>&yen; {{detail.unit_price}}</dd>
                    </dl>
                    <dl v-if="detail.activity_type == 1">
                        <dt>套餐描述</dt>
                        <dd>{{detail.price_description}}</dd>
                    </dl>
                    <dl v-if="detail.activity_type == 1">
                        <dt>参加人数</dt>
                        <dd>{{detail.order_num}}人</dd>
                    </dl>
                    <dl v-if="detail.activity_type == 2">
                        <dt>购买数量</dt>
                        <dd>{{detail.order_num}}份</dd>
                    </dl>
                    <dl>
                        <dt>总计</dt>
                        <dd>&yen; {{detail.order_price}}</dd>
                    </dl>
                    <dl>
                        <dt>实付款</dt>
                        <dd>&yen; {{detail.order_price}}</dd>
                    </dl>
                </div>
                <div class="panel-cont" v-if="detail.activity_type == 1">
                    <div class="panel-title">
                        会议信息
                    </div>
                    <dl>
                        <dt>会议时间</dt>
                        <dd>{{detail.activity_starttime.split(' ')[0].replace(/\//g,'-')}} 至 {{detail.activity_endtime.split(' ')[0].replace(/\//g,'-')}}</dd>
                    </dl>
                    <dl>
                        <dt>会议地址</dt>
                        <dd>{{detail.activity_address}}</dd>
                    </dl>
                    <dl>
                        <dt>报名咨询</dt>
                        <dd><a :href="'tel:' + detail.activity_consult">{{detail.activity_consult}}</a></dd>
                    </dl>
                    <dl>
                        <dt>赞助咨询</dt>
                        <dd><a :href="'tel:' + detail.activity_business">{{detail.activity_business}}</a></dd>
                    </dl>
                </div>
                <div class="panel-cont">
                    <div class="panel-title">
                        {{detail.activity_type == 1 ? '报名信息' : '购买信息'}}
                    </div>
                    <dl>
                        <dt>{{detail.activity_type == 1 ? '姓名' : '购买人'}}</dt>
                        <dd>{{detail.user_name}}</dd>
                    </dl>
                    <dl v-if="detail.activity_type == 1">
                        <dt>公司名称</dt>
                        <dd>{{detail.user_company}}</dd>
                    </dl>
                    <dl v-if="detail.activity_type == 1">
                        <dt>参与人数</dt>
                        <dd>{{detail.order_num}}人</dd>
                    </dl>
                    <dl v-else-if="detail.activity_type == 2">
                        <dt>购买数量</dt>
                        <dd>{{detail.order_num}}份</dd>
                    </dl>
                    <dl v-if="detail.activity_type == 2">
                        <dt>地图类型</dt>
                        <dd>{{detail.activity_mapmode == 1 ? '电子地图' : '纸质地图'}}</dd>
                    </dl>
                    <dl v-if="detail.activity_type == 2">
                        <dt>邮寄地址</dt>
                        <dd>{{detail.user_harvestaddress}}</dd>
                    </dl>
                    <dl>
                        <dt>联系电话</dt>
                        <dd>{{detail.user_phone}}</dd>
                    </dl>
                </div>
                <div class="panel-cont" v-if="detail.activity_type == 1 && detail.invoice_payable != ''">
                    <div class="panel-title">
                        发票信息
                    </div>
                    <dl>
                        <dt>发票抬头</dt>
                        <dd>{{detail.invoice_payable}}</dd>
                    </dl>
                    <dl>
                        <dt>发票税号</dt>
                        <dd>{{detail.invoice_tax_number}}</dd>
                    </dl>
                    <dl>
                        <dt>收件人</dt>
                        <dd>{{detail.invoice_name}}</dd>
                    </dl>
                    <dl>
                        <dt>联系电话</dt>
                        <dd>{{detail.invoice_phone}}</dd>
                    </dl>
                    <dl>
                        <dt>收件地址</dt>
                        <dd>{{detail.invoice_mailing_address}}</dd>
                    </dl>
                </div>
            </div>
            <v-empty v-else v-bind:emptycont="'此订单已不存在'"></v-empty>
        </v-main>

        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="cancelOrder" :btncancel="cancel_confirm"></v-dialogconfirm>
    </v-content>
</template>
<style lang="less">
    @import '../../libs/static/less/validation.less';
    @import '../../libs/static/less/mixins.less';
    .orderDetail-header {
        width: 100%;
        height: 38px;
        background: @color-blue;
        padding: 0 10px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 3;
        color: @color-white;
        line-height: 38px;
        .header-title {
            display: block;
            text-align: center;
            font-size: 16px;
        }
        .back {
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            text-align: left;
            font-size: 15px;
            color: @color-white;
            padding: 0 5px 0 7px;
            .flex();
            i {
                font-size: 20px;
                padding-right: 2px;
            }
        }
    }
    .main.orderDetail-wrap {
        top: 36px;
        bottom: 0;
        padding: 0;
        .panel-state {
            width: 100%;
            background: @color-blue;
            padding: 0 10px 15px 40px;
            color: @color-white;
            position: relative;
            .i-state {
                position: absolute;
                left: 10px;
                top: 3px;
                font-size: 18px;
            }
            .title {
                font-size: 20px;
                line-height: 150%;
            }
            .tip {
                font-size: 12px;
                line-height: 20px;
                span {
                    display: inline-block;
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    transform: scale(0.8,0.8);
                    margin-left: -17px;
                    &.cancel {
                        margin-left: -23px;
                    }
                }
            }
        }
        .panel-payway {
            width: 100%;
            background: @color-white;
            padding: 8px 10px;
            margin-bottom: 10px;
            text-align: left;
            font-size: 14px;
            color: @title-color;
            line-height: 26px;
            .ljh5-weixinzhifu {
                font-size: 20px;
                color: #00b700;
                display: inline-block;
                position: relative;
                top: 2px;
                margin-right: 3px;
            }
            em {
                font-style: normal;
                font-size: 14px;
                color: @color-red;
                display: inline-block;
                margin-left: 15px;
                i {
                    font-style: normal;
                    font-size: 12px;
                    display: inline-block;
                    margin-right: 2px;
                }
            }
            .btn-order {
                display: inline-block;
                float: right;
                border: 1px solid @color-blue;
                .border-radius(5px);
                font-size: 13px;
                color: @color-blue;
                line-height: 23px;
                padding: 1px 6px 0;
                margin-left: 10px;
                &.btn-again {
                    
                }
                &.btn-pay {
                    background: @btn-bg;
                    border-color: @btn-border;
                    color: @btn-color;
                }
                &.btn-cancel {
                    color: @btn-bg-gray-color;
                    border-color: @btn-bg-gray;
                }
            }
        }
        .panel-order {
            background: @color-white;
            margin: 0 10px 10px;
            .border-radius(5px);
            overflow: hidden;
            .panel-title {
                background: #fafafa;
                padding: 4px 10px;
                font-size: 14px;
                color: @detail-title-color;
                line-height: 26px;
                .sub-title {
                    float: right;
                    text-align: right;
                    font-size: 12px;
                    color: @detail-subinfo-color;
                }
            }
            .pro-title {
                font-size: 18px;
                color: @detail-title-color;
                line-height: 150%;
                padding: 10px;
                a {
                    font-size: 18px;
                    color: @detail-title-color;
                    line-height: 150%;
                }
            }
            dl {
                font-size: 14px;
                color: @detail-subinfo-color;
                line-height: 32px;
                .border-bottom();
                padding: 0;
                margin: 0 10px;
                dt {
                    display: inline-block;
                }
                dd {
                    display: inline-block;
                    float: right;
                    text-align: right;
                    color: @detail-title-color;
                }
                &:last-child {
                    border: 0;
                    color: @detail-title-color;
                    dd {
                        color: @color-red;
                    }
                }
            }
        }
        .panel-cont {
            background: @color-white;
            padding-bottom: 5px;
            margin: 0 10px 10px;
            .border-radius(5px);
            overflow: hidden;
            .panel-title {
                background: #fafafa;
                padding: 2px 10px;
                margin-bottom: 4px;
                font-size: 14px;
                color: @detail-title-color;
                line-height: 26px;
            }
            dl {
                font-size: 14px;
                color: @detail-subinfo-color;
                line-height: 26px;
                padding: 0 10px;
                .flex();
                dt {
                    display: inline-block;
                    flex: 0 0 70px;
                    -webkit-flex: 0 0 70px;
                }
                dd {
                    display: inline-block;
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                }
            }
        }
    }
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import API from '../../config/api.js'
    import wx from 'weixin-js-sdk'
    import Storage from 'store'
    export default {
        data() {
            return {
                detail: {},
                user: Storage.get("ljh5user"),
                loading: true,
                dialog: {
                    dialogShow: false,
                    dialogCont: "",
                    dialogIsauto: true,
                    dialogLife: 3000,
                    dialogIsclosebtn: false
                },
                dialogConfirm: {
                    show: false,
                    cont: "",
                    item_id: 0
                }
            }
        },
        mounted() {
            if (this.$route.params.id && this.$route.name == "orderDetail") {
                this.getOrderDetail(this.$route.params.id);
            }
        },
        methods: {
            getOrderDetail(id) {
                let url = API.orderDetail;
                this.loading = true;
                this.$http.get(url,{params:{
                    order_id: id
                }})
                .then((response) => {
                    if(response.data && response.data.code == "200") {
                        this.loading = false;
                        this.detail = response.data.data;
                        //console.log(this.detail);
                    } else {
                        this.show_dialog(response.data.msg,true,1000,false);
                    }
                }, (response) => {
                    this.loading = false;
                });
            },
            topay (orderCode) {
                window.location.href = "/wxpay/confirmorder?ordercode=" + orderCode;
            },
            //提示框
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
            //确认框
            confirm_cancelOrder () {
                this.dialogConfirm = {
                    show: true,
                    cont: "确定要取消该订单吗？",
                    item_id: this.$route.params.id
                }
            },
            cancel_confirm () {
                this.dialogConfirm = {
                    show: false,
                    cont: "",
                    item_id: 0
                }
            },
            cancelOrder () {
                this.$http.post(API.orderCancel, {
                    user_id: user.user_id,
                    order_id: this.dialogConfirm.item_id
                })
                .then((response)=>{
                    if(response.data.code && response.data.code=="200"){
                        
                    }
                }, (response)=>{
                    //console.log(response.data);
                });
                this.dialogConfirm.show = false;
            }
        }
    }
</script>