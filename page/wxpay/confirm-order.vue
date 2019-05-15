<template>
    <v-content>
        <div class="confirm-order-w">
            <input type="hidden" v-model="forms.user_id"/>
            <input type="hidden" v-model="forms.activity_id"/>
            <input type="hidden" v-model="forms.user_name"/>
            <div class="order-info">
                <ul>
                    <li>
                        {{detail.activity_title}}
                    </li>
                    <li v-if="flag">
                        <em>{{unitPriceText}}</em>
                        <span>￥{{(detail.order_Price/detail.order_num).toFixed(2)}}</span>
                    </li>
                    <li>
                        <em>{{orderNumText}}</em>
                        <span>{{detail.order_num}}</span>
                    </li>
                    <li>
                        <em>实际付款</em>
                        <span class="total-pay">￥{{detail.order_Price}}</span>
                    </li>
                </ul>
            </div>
            <div class="pay-way" v-if="payWayShow">
                <ul>
                    <li>
                        <em>支付方式</em>
                    </li>
                    <li>
                        <em><i class="ljh5-icons ljh5-weixinzhifu"></i>微信支付</em>
                        <span><input type="radio" name="payway" value="1" checked /></span>
                    </li>
                </ul>
                <div class="payway-bank">
                    <p class="title"><img src="/assert/dist/images/i_payway_unionpay.png" />其他支付方式</p>
                    <div class="bank-cont">
                        <dl>
                            <dt>公司名称</dt>
                            <dd>上海链集电子商务有限公司</dd>
                        </dl>
                        <dl>
                            <dt>公司税号</dt>
                            <dd>91310114MA1GT8X2XG</dd>
                        </dl>
                        <dl>
                            <dt>公司地址</dt>
                            <dd>上海市中山北路2438号中瑞商务大厦7F</dd>
                        </dl>
                        <dl>
                            <dt>公司账号</dt>
                            <dd>8110 2010 1310 0301 984</dd>
                        </dl>
                        <dl>
                            <dt>开户银行</dt>
                            <dd>中信银行股份有限公司上海普陀支行</dd>
                        </dl>
                        <dl>
                            <dt>电话号码</dt>
                            <dd><a href="tel:02162586912">021-6258 6912</a></dd>
                        </dl>
                    </div>
                </div>
                <div class="payway-alipay">
                    <p class="title"><img src="/assert/dist/images/i_payway_alipay.png" />支付宝扫码</p>
                    <div class="alipay-cont"><img src="/assert/dist/images/alipay_qrcode.png" /></div>
                </div>
            </div>
        </div>
        <div class="btn-w">
            <button type="button" v-on:click="toPay" class="btn-apply">立即支付</button>
        </div>
       <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.confirm-order-w{
    background: #f2f2f2;
    ul{
        background: #fff;
        li{
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #f2f2f2;
            em{
                font-style: normal;
                color: #717171;    
                font-size: 16px;
            }
            span{
                color: #202020;
                font-size: 16px;
            }
            .total-pay{
                color: #f30909;
                font-size: 24px;
            }
        }
        li:first-child{
            font-size: 18px;
            color: #202020;
        }
        li:last-child{
            border-bottom: none;
        }
    }
    .order-info{
        //padding: 10px 0 0 0;
        margin: 0 0 6px 0;
    }
    .pay-way{
        .ljh5-weixinzhifu{
            color: #00b700;
            font-size: 18px;
            margin-right: 6px
        }
        input[type=radio] {
            display: inline-block;
            width: 20px;
            height: 20px;
            position: relative;
            overflow: visible;
            border: 0;
            background: 0 0;
            -webkit-appearance: none;
            &:before {
                content: '';
                display: block;
                width: 18px;
                height: 18px;
                border: 1px solid #717171;
                border-radius: 13px;
                background-clip: padding-box;
                position: absolute;
                left: 0;
                top: 0;
            }
            &:after {
                content: '';
                display: block;
                width: 8px;
                height: 8px;
                background: #707070;
                border-radius: 7px;
                position: absolute;
                left: 6px;
                top: 6px;
            }
        }

        .payway-bank {
            background: @color-white;
            border-top: 1px solid @border-color;
            padding: 10px;
            .title {
                font-size: 16px;
                color: @subinfo-color;
                line-height: 26px;
                img {
                    width: 18px;
                    display: inline-block;
                    margin-right: 5px;
                    position: relative;
                    top: 0px;
                }
            }
            .bank-cont {
                padding: 5px 10px;
                margin: 5px 0;
                border: 1px dashed @color-gray-e;
                dl {
                    .flex();
                    justify-content: flex-start;
                    -webkit-justify-content: flex-start;
                    dt {
                        font-size: 14px;
                        color: @subinfo-color;
                        line-height: 24px;
                        flex: 0 0 auto;
                        -webkit-flex: 0 0 auto;
                        margin-right: 10px;
                    }
                    dd {
                        text-align: left;
                        font-size: 14px;
                        color: @content-color;
                        line-height: 24px;
                        flex: 1 1 auto;
                        -webkit-flex: 1 1 auto;
                    }
                }
            }
        }
        .payway-alipay {
            background: @color-white;
            border-top: 1px solid @border-color;
            padding: 10px 10px 50px;
            .title {
                font-size: 16px;
                color: @subinfo-color;
                line-height: 26px;
                img {
                    width: 15px;
                    .border-radius(50%);
                    display: inline-block;
                    margin-right: 5px;
                    position: relative;
                    top: 2px;
                }
            }
            .alipay-cont {
                width: 35%;
                margin: -20px auto 20px;
                text-align: center;
                //.flex();
                img {
                    width: 100%;
                    display: block;
                }
            }
        }
    }
} 
.btn-w{
    position: fixed;
    z-index: 1;
    width: 100%;
    background: @color-white;
    padding: 0 0 10px;
    bottom: 0;
    .btn-apply{
        .btn-red();
        .border-radius(5px);
        display: table-cell;
        width: 80%;
        text-align: center;
        font-size: 20px;
        padding:8px 0px;
        margin: 0 auto;    
    }
}
</style>
<script>
import API from '../../config/api.js'
import Storage from 'store'
var u = navigator.userAgent;
//android终端                                     
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
//ios终端                  
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export default {
    data () {
        return {
            forms: {
                user_id:'',             
                activity_id:'',             
                user_name:''
            },
            wxUrl: '',                          //微信授权url
            wxCode: '',
            openid: '',
            ordercode:'',
            payData:{},
            detail:{},
            unitPriceText:'',
            orderNumText:'',
            flag: false,
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            activity_status: "",             //活动状态
            payWayShow: true,                //内嵌到app 支付方式隐藏 默认h5显示
            orderId: 0,                     //app立即支付 传入参数orderId 
            user:{},
            login: false,                   //登录  
            isSelfApp: false                //判断是否是嵌入到app的标识 默认false 
        }
    },
    mounted () {
        if(this.$route.name == "ConfirmOrder"){
            // if(Storage.get("ljh5user")) {
            //     let user =  Storage.get("ljh5user");
            //     this.forms.user_name= user.user_nickname;
            //     this.forms.user_id = user.user_id;
            // }
            this.isLogin();
        }  
        this.ordercode = this.$route.query.ordercode;
        this.getOrderInfo();
    },
    methods: {
        //进入页面判断是否登录
        isLogin(){            
            this.isSelfApp = u.indexOf('maicai360_app') > -1;
            if(this.isSelfApp){
                this.payWayShow = false;
                this.appIsLogin();
                if(this.login){
                    this.appGetUserInfo();
                }  
            }else{
                this.payWayShow = true;
                if(Storage.get("ljh5user")){
                    this.login = true;
                    this.user = Storage.get("ljh5user");
                    this.forms.user_id = this.user.user_id;
                }
                this.getOpenIdFirst ();
            } 
            this.forms.user_name= this.user.user_nickname;
            this.forms.user_id = this.user.user_id;  
            this.text = this.user;
        },
        getCookie(objname){
            var arrstr = document.cookie.split("; ");
            for(var i = 0;i < arrstr.length;i ++){
                var temp = arrstr[i].split("=");
                if(temp[0] == objname) return unescape(temp[1]);
            }
        },
        //app 判断是否登录
        appIsLogin(){
            if(isAndroid){
                //页面嵌入到app 获取是否登录 调用的方法 针对安卓
                this.login = window.WCJSBridge.isLogin();                                       
            }else if(isIOS){
                //页面嵌入到app 获取是否登录 获取cookie的字段isLogin的值 针对ios
                var value = this.getCookie('isLogin');                                          
                    this.login = value ==="true" ? true : false; 
            }
        },
        //通过app登录获取的用户信息
        appGetUserInfo(){
            if(isAndroid){
                this.user = JSON.parse(window.WCJSBridge.getUserInfo());                                          
            }else if(isIOS){
                this.user = JSON.parse(WCJSBridge.getUserInfo());
            }
        },
        //通过app查看订单详情
        appGoOrderDetail(orderId){
            if(isAndroid){
                window.WCJSBridge.goOrderDetail(orderId);                                          
            }else if(isIOS){
                WCJSBridge.goOrderDetail(orderId);
            }    
        },
        //获取订单信息
        getOrderInfo(){
            this.$http.get(API.getOrderInfo,{params:{ordercode:this.ordercode}}).then((response) => {
                this.detail = response.data.info;
                this.activity_status = this.detail.activity_status;
                if(this.detail.activity_type==2){
                    //地图纸张
                    this.flag = true;
                    this.unitPriceText = '地图单价';
                    this.orderNumText = '共计份数';
                }else{
                    this.unitPriceText = '报名费用';
                    this.orderNumText = '参加人数';
                }
            },(response) => {
                console.log(response.data)
            });      
        },
        getCode () {
            this.$http.get(API.weixinCode).then((response) => {
                this.wxUrl = response.data.uri;
                this.wxUrl = this.wxUrl.replace('\u0026','&');
                window.location.href = this.wxUrl;
            },(response) => {
                console.log(response.data)
            });    
        },
        getOpenIdFirst (){
            this.$http.get(API.weixinOpenID,{params:{code:"",userid:this.forms.user_id}}).then((response) => {
                //console.log(response.data);
                if(response.data.msg == "请先获取code"){
                    if(this.$route.query.code != null){//已授权
                        this.wxCode = this.$route.query.code;   
                        this.getOpenId();     
                    }else{//未授权
                        this.getCode();    
                    }
                }else if(response.data.data){
                    this.openid = response.data.data;
                }
            },(response) => {
                console.log(response.data);
            });
        },
        getOpenId () {
            this.$http.get(API.weixinOpenID,{params:{code:this.wxCode,userid:this.forms.user_id}}).then((response) => {
                this.openid = response.data.data;
                //console.log(response.data);
            },(response) => {
                console.log(response.data);
            });    
        },
        toPay () {
            if(this.isSelfApp){
                this.appGoOrderDetail(this.detail.order_id); 
            }else{
                if(this.activity_status == 1){
                    let orderCode = this.$route.query.ordercode;
                    this.$http.post(API.weixinOrder,{
                                openid:this.openid,
                                ordercode:this.ordercode,
                                userid: this.forms.user_id
                    }).then((response) => {
                        if(response.data.code == "200"){
                            let payObj = {
                                appId:response.data.data.appId,
                                timeStamp:response.data.data.timeStamp, 
                                nonceStr:response.data.data.nonceStr,
                                package:response.data.data.package, 
                                signType:response.data.data.signType,
                                paySign:response.data.data.paySign
                            }
                            WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                    "appId":payObj.appId,                   //公众号名称，由商户传入     
                                    "timeStamp":payObj.timeStamp,           //时间戳，自1970年以来的秒数     
                                    "nonceStr": payObj.nonceStr,            //随机串     
                                    "package": payObj.package,     
                                    "signType":payObj.signType,             //微信签名方式：     
                                    "paySign": payObj.paySign               //微信签名 
                                },
                                function(res){  
                                    if(res.err_msg == "get_brand_wcpay_request:ok" ){ 
                                        window.location.href= "/wxpay/paysuccess?ordercode="+orderCode;
                                    } 
                                }
                            )
                        }else{
                            this.show_dialog(response.data.msg,true,2000,false); 
                        }
                    },(response) => {
                        console.log(response.data);
                    });
                }else if(this.activity_status == 0){
                    this.show_dialog('活动已取消',true,2000,false); 
                }else{
                    this.show_dialog('活动已结束',true,2000,false);    
                }        
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