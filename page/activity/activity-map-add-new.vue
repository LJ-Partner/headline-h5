<template>
    <v-content>
        <v-header>     
        </v-header>
        <div class="activity-map-add-new" :class="isSelfApp ? 'app-main' : ''">
            <form>
                <div class="map-add-new-form">
                    <input type="hidden" v-model="forms.user_id"/>
                    <input type="hidden" v-model="forms.activity_id"/>
                    <input type="hidden" v-model="forms.user_nickname"/>
                    <div class="item">
                        <label>姓名 <em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="请填写您的姓名" @change="nameChange" v-model="forms.user_name">
                        </div>
                    </div>
                    <div class="item">
                        <label>手机 <em>*</em></label>
                        <div class="cell">
                            <input type="tel" placeholder="请您输入11位手机号" maxlength="11" @change="phoneChange" v-on:keyup="forms.activityApply_phone=forms.activityApply_phone.replace(/[^0-9]/g,'')" v-model="forms.activityApply_phone"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>职务 <em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="请输入您的职务，如:经理" v-model="forms.activityApply_duty"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>公司全称 <em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="请输入贵公司全称" v-model="forms.activityApply_company"/>
                        </div>
                    </div>
                    <div class="item" v-if="!showMapChannel && !flag">
                        <label>公司地址 </label>
                        <div class="cell">
                            <input type="text" placeholder="请输入贵公司所在地,如:上海" v-model="activityApply_address"/>
                        </div>
                    </div>
                    <div class="item" v-else>
                        <label>收货地址 <em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="请输入您的收货地址" v-model="user_harvestaddress"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>主营产品<em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="请输入贵公司经营业务,如:电机销售" v-model="forms.activityApply_product"/>
                        </div>
                    </div>
                    <div class="mt10">
                        <div class="item">
                            <label>微信号</label>
                            <div class="cell">
                                <input type="text" placeholder="请输入您的微信号" v-model="forms.activityApply_winxin"/>
                            </div>
                        </div>
                        <div class="item">
                            <label>QQ</label>
                            <div class="cell">
                                <input type="text" placeholder="请输入您的qq号" v-on:keyup="forms.activityApply_user_qq=forms.activityApply_user_qq.replace(/[^0-9]/g,'')"  v-model="forms.activityApply_user_qq"/>
                            </div>
                        </div>
                        <div class="item">
                            <label>邮箱</label>
                            <div class="cell">
                                <input type="text" placeholder="请输入您的邮箱号" v-model="forms.activityApply_user_mail" />
                            </div>
                        </div>
                        <div class="item" v-if="!flag"><span>微信，QQ，邮箱至少填一项</span></div>
                    </div>
                    
                    <div class="item mt10" v-if="showMapMode">
                        <label>选择数量</label>
                        <div class="cell">
                            <span class="cell-radio">
                                <input type="radio"  value="1" v-model="forms.mapmode" v-on:click="flag = false"><span class="radio-tip">电子地图</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="2" v-model="forms.mapmode" v-on:click="flag = true"><span class="radio-tip">纸质地图</span>
                            </span>
                            <div class="operate" v-if="flag">
                                <span class="btn-num" v-on:click="subNum" :class="{'disabled': forms.count <= 1}"></span>
                                <input type="number" class="number"  v-model="forms.count">
                                <span class="btn-num last" v-on:click="addNum"></span>
                                 <em>份</em>
                            </div>
                        </div>
                    </div>
                    <!--<div class="item mt10" v-if="showMapChannel">
                        <label>选择数量</label>
                        <div class="cell">
                            <div class="operate">
                                <span class="btn-num" v-on:click="subNum" :class="{'disabled': forms.count <= 1}"></span>
                                <input type="number" class="number"  v-model="forms.count">
                                <span class="btn-num last" v-on:click="addNum"></span> 
                                <em>份</em>
                            </div>
                        </div>
                    </div>-->
                    <div class="item mt10">
                        <label>活动获取渠道</label>
                        <div class="cell">
                            <span class="cell-radio">
                                <input type="radio"  value="1" v-model="forms.activityApply_channel"><span class="radio-tip">通过微信公众号</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="2" v-model="forms.activityApply_channel"><span class="radio-tip">通过微信朋友圈</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="3" v-model="forms.activityApply_channel"><span class="radio-tip">通过朋友介绍</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="4" v-model="forms.activityApply_channel"><span class="radio-tip">通过网站</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="5" v-model="forms.activityApply_channel"><span class="radio-tip">通过广告</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="6" v-model="forms.activityApply_channel"><span class="radio-tip">其他</span>
                            </span>
                        </div>
                    </div>
                    <div class="item mt10" v-if="flag2">
                        <label>是否需要发票</label>  
                        <div class="cell">
                            <span class="cell-radio">
                                <input type="radio"  value="1" v-model="forms.invoice_isneed" v-on:click="flag2 = true"><span class="radio-tip">是</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="0" v-model="forms.invoice_isneed" v-on:click="flag2 = false"><span class="radio-tip">否</span>
                            </span>
                        </div>      
                    </div>
                    <div class="invoiceDetail" v-if="flag2">
                        <div class="billingInfo">
                            <div class="item">
                                <label><b>开票信息</b></label>    
                            </div>
                            <div class="item">
                                <label>发票类型</label> 
                                <div class="cell">
                                    <p>增值税普通发票</p>
                                </div>   
                            </div>
                            <div class="item">
                                <label>发票抬头 <em>*</em></label>   
                                <div class="cell">
                                    <input type="text" placeholder="请输入正确的发票抬头" v-model="invoice_payable" />
                                </div> 
                            </div>
                            <div class="item">
                                <label>发票税号 <em>*</em></label>   
                                <div class="cell">
                                    <input type="text" placeholder="请输入您的公司税号" v-model="invoice_tax_number" />
                                </div> 
                            </div>
                            <div class="item">
                                <label>发票内容 </label>   
                                <div class="cell">
                                    服务费
                                </div> 
                            </div>
                        </div>
                        <div class="postInfo">
                            <div class="item">
                                <label><b>邮寄信息</b></label>    
                            </div>
                            <div class="item">
                                <label>收件人姓名 <em>*</em></label>  
                                <div class="cell">
                                    <input type="text" placeholder="请输入您的姓名" v-model="invoice_name"/>
                                </div>  
                            </div>
                            <div class="item">
                                <label>收件人电话 <em>*</em></label>    
                                <div class="cell">
                                    <input type="text" placeholder="请输入您的手机号" maxlength="11" v-on:keyup="invoice_phone=invoice_phone.replace(/[^0-9]/g,'')" v-model="invoice_phone"/>
                                </div>
                            </div>
                            <div class="item">
                                <label>邮寄地址 </label>   
                                <div class="cell">
                                    <input type="text" placeholder="请输入发票邮寄地址"  v-model ="invoice_mailing_address" />
                                </div> 
                            </div>    
                        </div>
                    </div>
                    <div class="item">
                        <button type="button" class="btn-apply" v-on:click="addapply">提交</button>    
                    </item>
                </div>
            </form>
        </div>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.activity-map-add-new {
    background: #f2f2f2;
    position: absolute;
    z-index: 1;
    top:45px;
    left:0;
    right:0;
    overflow: auto;
    .map-add-new-form {
        .flex-column();
        .item {
            flex:1 1 auto;
            -webkit-flex:1 1 auto;
            padding:10px;
            border-bottom: 1px solid #f0f1f7;
            display: inline-table;
            width:100%;
            background: #fff;
            span{
                font-size: 14px;
                color: @color-red;
            }
            label {
                width:30%;
                color: #717171;
                font-size: 16px;
                em{
                    color: @color-red;
                    font-size: 20px;
                    position: relative;
                    z-index:  1;
                    top: 4px;
                    font-style: normal;
                }
            }
            .btn-apply {
                .btn-red();
                .border-radius(5px);
                display: table-cell;
                width: 80%;
                text-align: center;
                font-size: 20px;
                padding:8px 0px;
                margin: 0 auto;
            }
            .cell {
                display: table-cell;
                width:70%;
                vertical-align: middle;
                .cell-radio {
                    display: block;
                    .radio-tip {
                        line-height: 26px;
                        position: relative;
                        top:-7px;
                        display: inline-block;
                        margin-left: 7px;
                        color:#717171;
                        font-size: 16px;
                        vertical-align: middle;
                    }
                }
                .operate{
                    font-size: 16px;
                    line-height: 30px;
                    em{
                        font-size: 16px;
                        line-height: 30px;
                        top: -4px;
                        position: relative;
                        font-style: normal;
                    }
                    .btn-num{
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        background: none;
                        border: 1px solid @btn-bg-gray;
                        .border-radius(5px);
                        font-size: 20px;
                        color: @subinfo-color;
                        position: relative;
                        bottom: -5px;
                        &:before{
                            content: "";
                            width: 13px;
                            height: 2px;
                            display: inline-block;
                            background: @subinfo-color;
                            position: absolute;
                            left: 8px;
                            top: 13px;
                        }
                        &.disabled {
                            background: @bg-color;
                            color: @lightest-color;
                            &:before,&:after{
                                background: @lightest-color;
                            }
                        }
                    }
                    .last{
                        &:after{
                            content: "";
                            width: 2px;
                            height: 12px;
                            display: inline-block;
                            background: @subinfo-color;
                            position: absolute;
                            left: 13px;
                            top: 8px;
                        }
                    }
                    .number{
                        width: 60px;
                        height: 30px;
                        .border-radius(5px);
                        border:1px solid @btn-bg-gray;
                        text-align: center;
                        font-size: 18px;
                        color: @def-font-color;
                        padding: 0 10px;
                        margin: 0 1px;
                        position: relative;
                        top: -5px;
                    }
                }
                input[type=radio] {
                    .radio();
                }
                input[type=text],input[type=tel] {
                    .txt();
                    .border-radius(0px);
                        border:none;
                        width: 100%;
                        color:#202020;
                        font-size: 16px;
                }
            }
            // &:nth-last-child(1) {
            //     border-bottom: none;
            // }
        }
        .invoiceDetail{
            .item{
                border-bottom: none;
                label{
                    b{
                        font-size: 16px;
                    }
                }
                .cell{
                    input{
                        border:1px dashed #ccc;
                    }
                    p{
                        color: #2ea9df;
                        font-size: 16px;
                    }
                }
            }
        }
        .item:nth-child(15){
            border-bottom: none;
        }
        .mt10{
            margin-top: 10px;
        }
    }
}
.app-main{
    top: 0;  
    .map-add-new-form{
        margin-top: 0;
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
    data(){
        return {
            flag: false, //电子地图
            flag2: false, //是否开发票
            forms: {
                user_id:"",             
                activity_id:"",             
                user_nickname:"",               
                user_name:"",                //姓名
                activityApply_phone:"",     //手机
                activityApply_duty:"",      //职务
                activityApply_company:"",   //公司全称
                activityApply_product:"",   //经营业务
                activityApply_winxin:"",
                activityApply_user_qq:"",
                activityApply_user_mail:"",
                activityApply_channel:1,
                mapmode:1,
                count: 1,                       //需要传的份数
                invoice_isneed:0                //是否需要发票
            },
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            showMapMode:false,
            showMapChannel:false,
            activityApply_address:"",   //公司地址
            user_harvestaddress:"",     //收货地址
            invoice_name: "",           //收件人姓名
            invoice_phone: "",          //收件人电话
            invoice_payable:"",         //发票抬头
            invoice_tax_number: "",     //发票税号
            invoice_mailing_address:"", //发票寄送地址
            invoice_type:2,             //发票类型 0没有 1普通 2增值税
            invoice_content:"",         //发票内容  
            login: false,               //登录  
            isSelfApp: false           //判断是否是嵌入到app的标识 默认false 
        }
    },
    mounted () {
        if(this.$route.params.id && this.$route.name == "ActivityMapApplyNew"){
            this.isLogin();
        }
        this.getMapMode(); 
    },
    methods: {
        //进入页面判断是否登录
        isLogin(){            
            this.isSelfApp = u.indexOf('maicai360_app') > -1;
            if(this.isSelfApp){
                this.appIsLogin();
                if(this.login){
                    this.appGetUserInfo();
                }  
            }else{
                if(Storage.get("ljh5user")){
                    this.login = true;
                    this.user = Storage.get("ljh5user");
                }
            }
            this.forms.activity_id = this.$route.params.id; 
            this.forms.user_nickname= this.user.user_nickname;
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
        //通过app进入订单列表
        appGoOrderList(){
            if(isAndroid){
                window.WCJSBridge.goOrderList();                                          
            }else if(isIOS){
                WCJSBridge.goOrderList();
            }
        },
        nameChange(){
            this.invoice_name = this.forms.user_name;
        },
        phoneChange(){
            this.invoice_phone = this.forms.activityApply_phone;
        },
        getMapMode(){
            let user_id = !Storage.get("ljh5user")?0:Storage.get("ljh5user").user_id;
            let url = API.activityDetail+'?id='+this.forms.activity_id+"&type="+2+"&user_id="+user_id;
            this.$http.get(url).then((response) => {
                this.forms.mapmode = response.data.activity_mapmode;
                if(this.forms.mapmode == 1){
                    this.showMapChannel = false;
                    this.showMapMode = false;
                    this.flag = false;
                }else if(this.forms.mapmode == 2){
                    this.showMapChannel = true;
                    this.showMapMode = false;
                    this.flag = true;
                }else if(this.forms.mapmode == 3){
                    this.forms.mapmode = 1;
                    this.showMapMode = true;
                }
            },(response) => {
                console.log(response.data)
            });
        },
        addapply () {
            let telReg = !!this.forms.activityApply_phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
            let emailReg = !!this.forms.activityApply_user_mail.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
            if(!this.flag){
                this.forms.activityApply_address = this.activityApply_address;
                //电子
                if(this.forms.user_name == "" || this.forms.activityApply_phone == "" || this.forms.activityApply_company =="" || this.forms.activityApply_duty == "" || this.forms.activityApply_product==''){
                    this.show_dialog("请把相关必要信息填写完整",true,2000,false);
                    return false;
                }
            }else{
                //纸质
                this.forms.user_harvestaddress = this.user_harvestaddress;
                if(this.forms.user_nickname == "" || this.forms.activityApply_phone == "" || this.forms.activityApply_company =="" || this.forms.activityApply_duty == "" || this.forms.user_harvestaddress == "" || this.forms.activityApply_product==''){
                    this.show_dialog("请把相关必要信息填写完整",true,2000,false);
                    return false;
                }
            }
            if(telReg == false){
                this.show_dialog("请输入正确的手机号码",true,2000,false);
                return false;
            }else if(this.forms.activityApply_user_mail && emailReg == false){
                this.show_dialog("请输入正确的邮箱",true,2000,false);
                return false;
            }else{
                //需要发票
                if(this.flag2 == true){
                    let telReg2 = !!this.invoice_phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
                    if(this.invoice_name == "" || this.invoice_phone == "" || this.invoice_payable == "" || this.invoice_tax_number == ""){
                        this.show_dialog("请把相关必要信息填写完整",true,2000,false);
                        return false;
                    }else if(telReg2 == false){
                        this.show_dialog("请输入正确的手机号码",true,2000,false);
                        return false;
                    }else{
                        this.forms.invoice_type = this.invoice_type;
                        this.forms.invoice_name = this.invoice_name;
                        this.forms.invoice_phone = this.invoice_phone;
                        this.forms.invoice_payable = this.invoice_payable;
                        this.forms.invoice_tax_number = this.invoice_tax_number;
                        this.forms.invoice_mailing_address = this.invoice_mailing_address;
                    }
                }
                this.$http.post(API.activityMapApply,this.forms)
                .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    if(response.data.orderCode){
                        if(response.data.orderPrice && response.data.orderPrice > 0){
                            window.location.href = "https://m.maicai360.cn/wxpay/confirmorder?ordercode=" + response.data.orderCode;
                        }else{
                            if(this.isSelfApp){
                                this.appGoOrderList();
                            }else{
                               window.location.href = "/user/order";
                            }
                        }
                    }else{
                        this.show_dialog('网络错误请重试',true,2000,false);    
                    }
                } else {
                    this.show_dialog(response.data.msg,true,2000,false);
                }
                }, (response)=>{
                    console.log(response.data);
                });
            }
        },
        show_mask () {
            document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollTop - 100;
            this.showMask.show = true;
        },
        close_mask () {
            document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollTop + 100;
            this.showMask.show = false;
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
        },
        addNum(){
            this.forms.count ++;　
        },
        subNum(){
            this.forms.count --;
            if(this.forms.count < 1){
                this.forms.count = 1;
            }
        }
    }
}
</script>