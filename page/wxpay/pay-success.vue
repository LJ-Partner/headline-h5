<template>
    <v-content>
        <div class="pay-status">
            <div class="sta-info">
                <div class="sta-pic">
                    <p></p>
                    <i class="ljh5-icons ljh5-zhengque"></i>
                </div>
                <div class="sta-link">
                    <p >{{text}}</p>
                    <a class="btn-apply" @click="toOrderDetail">订单详情</a>
                </div>
            </div>
            <div class="sta-tip">
                <i class="ljh5-icons ljh5-weixinzhifu"></i>
                <span>微信支付</span>
            </div>
        </div>    
    </v-content>
</template>
<style lang="less">;
@import '../../libs/static/less/mixins.less';
.pay-status{
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .flex-column();
    .sta-info{
        flex: 1 1 auto;
        .sta-pic{
            text-align: center;
            padding:64px 0 0 0;
            p{
                width:70%;
            }
            img{
                width: 70%;
            }
            .ljh5-zhengque{
                font-size: 70px;
                border-radius: 50%;
                color: #1da36a;
            }
        }
        .sta-link{
            padding:5px 0 0 0;
            p{
                text-align: center;
                padding: 10px 0;
                color: #1da36a;
                font-size: 18px;
                display: block;
            }
            .btn-apply{
                padding:3px 7px;
                border:none;
                outline: none;
                -webkit-appearance: none;
                color:#fff;
                background: #1da36a;
                border-radius:5px;
                display: block;
                width: 34%;
                text-align: center;
                font-size: 18px;
                padding:8px 0px;
                margin: 60px auto 0;
            }
        }
    }
    .sta-tip{
        flex: 0 0 65px;
        text-align: center;
        color: #202020;
        .ljh5-weixinzhifu{
            font-size:26px;
            color: #009414;
        }
        span{
            font-size: 18px;
        }
    }
}
</style>
<script>
import API from '../../config/api.js'
export default {
    data () {
        return {
            ordercode: '',
            orderId: '',
            text: ''
        }
    },
    mounted () {
        this.ordercode = this.$route.query.ordercode; 
        this.getOrderInfo();
    },
    methods: {
        getOrderInfo(){
            this.$http.get(API.getOrderInfo,{params:{ordercode:this.ordercode}}).then((response) => {
                this.detail = response.data.info;
                this.orderId = this.detail.order_id;
                if(this.detail.activity_type==2){
                    this.text = '购买地图成功'; 
                }else{
                    this.text = '报名成功';
                }
            },(response) => {
                console.log(response.data)
            });      
        },
        toOrderDetail(){
            window.location.href = '/user/order/detail/' + this.orderId;
        }
    }
}    
</script>
