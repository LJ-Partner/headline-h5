<template>
    <v-content>
        <v-header>     
        </v-header>
        <div class="activity-apply-add-new" :class="isSelfApp ? 'app-main' : ''">
            <form>
                <div class="apply-add-new-form">
                    <input type="hidden" v-model="forms.user_id"/>
                    <input type="hidden" v-model="forms.activity_id"/>
                    <input type="hidden" v-model="forms.user_nickname"/>
                    <div class="item selector">
                        <label>选择套餐:</label>
                        <div class="cell">
                            <span class="selector-radio" v-for="(package,index) in packages">
                                <label class="selector-cont" :for="'package' + (index + 1)" @click="showTip(package.price)">
                                    <span class="radio-tt">套餐{{index + 1}}</span>
                                    <span class="radio-ct">&yen;{{package.price}}</span>
                                </label>
                                <input type="radio" :value="package.id" v-model="forms.price_id" :id="'package' + (index + 1)" :class="{'disabled': package.price == '1088.00'}" disabled="disabled" @click="showTip(package.price)" v-if="package.price == '1088.00'">
                                <input type="radio" :value="package.id" v-model="forms.price_id" :id="'package' + (index + 1)" v-else>
                            </span>
                        </div>
                    </div>
                    <div class="pkg-annotation">
                        <div class="annotation">
                            <p>注释：本次活动价格分为{{packages.length}}份套餐(付款成功后，套餐类型选择由旺材小编审核通过后报名有效)</p>
                            <p v-for="(package,index) in packages">
                                <span class="pkg-tt">套餐{{index + 1}}：</span>
                                <span class="pkg-intro">{{package.text}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="item quantity">
                        <label>选择人数:</label>
                        <div class="cell">
                            <div class="operate">
                                <span class="btn-num" v-on:click="subNum" :class="{'disabled': forms.num <= 1}"></span>
                                <input type="number" class="number" :value="forms.num >= 1 && forms.num <= maxcount ? forms.num : 1" v-model="forms.num" maxlength="3">
                                <span class="btn-num" v-on:click="addNum" :class="{'disabled': forms.num >= maxcount}"></span>
                            </div>
                        </div>
                    </div>
                    <div class="item mt10">
                        <label>联系人 <em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="您的真实姓名" @change="nameChange" v-model="forms.user_name">
                        </div>
                    </div>
                    <div class="item">
                        <label>手机 <em>*</em></label>
                        <div class="cell">
                            <input type="tel" placeholder="您的常用手机号" @change="phoneChange" v-on:keyup="forms.activityApply_phone=forms.activityApply_phone.replace(/[^0-9]/g,'')" maxlength="11" v-model="forms.activityApply_phone"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>座机</label>
                        <div class="cell">
                            <input type="text" placeholder="请输入您的座机" maxlength="12" v-model="forms.user_telephone"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>职务 <em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="如：采购员" v-model="forms.activityApply_duty"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>公司全称 <em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="完整公司名称" v-model="forms.activityApply_company"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>公司所在地</label>
                        <div class="cell">
                            <input type="text" placeholder="如：上海 " v-model="forms.user_location"/>
                        </div>
                    </div>
                    <!--<div class="item">
                        <label>所属行业:</label>
                        <div class="cell">
                            <input type="text" placeholder="请您输入所属行业,如:化工" v-model="forms.activityApply_industry"/>
                        </div>
                    </div>-->
                    <div class="item">
                        <label>经营业务</label>
                        <div class="cell">
                            <input type="text" placeholder="如：变压器销售" v-model="forms.activityApply_product"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>微信号</label>
                        <div class="cell">
                            <input type="text" placeholder="您的微信号" v-model="forms.activityApply_winxin"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>备注</label>
                        <div class="area-box">
                            <textarea maxlength="200" placeholder="如有其他参会人员，请填写姓名、手机号、职务" v-model="forms.user_remark"></textarea>
                        </div>
                    </div>
                    <div class="item selector space-top">
                        <label>报名渠道</label>
                        <div class="cell">
                            <span class="cell-radio">
                                <input type="radio" value="1" v-model="forms.activityApply_channel" id="channel1"><label class="radio-tip" for="channel1">通过微信公众号</label>
                            </span>
                            <span class="cell-radio">
                                <input type="radio" value="2" v-model="forms.activityApply_channel" id="channel2"><label class="radio-tip" for="channel2">通过微信朋友圈</label>
                            </span>
                            <span class="cell-radio">
                                <input type="radio" value="3" v-model="forms.activityApply_channel" id="channel3"><label class="radio-tip" for="channel3">通过朋友介绍</label>
                            </span>
                            <span class="cell-radio">
                                <input type="radio" value="4" v-model="forms.activityApply_channel" id="channel4"><label class="radio-tip" for="channel4">通过网站</label>
                            </span>
                            <span class="cell-radio">
                                <input type="radio" value="5" v-model="forms.activityApply_channel" id="channel5"><label class="radio-tip" for="channel5">通过广告</label>
                            </span>
                            <span class="cell-radio">
                                <input type="radio" value="6" v-model="forms.activityApply_channel" id="channel6"><label class="radio-tip" for="channel5">其他</label>
                            </span>
                        </div>
                    </div>
                    <div class="item selector space-top mt10">
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
                                    <input type="text" placeholder="请输入发票邮寄地址" v-model="invoice_mailing_address" />
                                </div> 
                            </div>    
                        </div>
                    </div>
                    <div class="item space-top">
                        <button type="button" class="btn-apply" v-on:click="addapply">提交</button>
                    </div>
                </div>
            </form>
        </div>
        <!--<div class="mask-wrap" v-show="showMask.show">
            <div class="activity-paywrap">
                <ul class="cont">
                    <li class="title">
                        2017全国取向硅钢产业链供需交流会
                    </li>
                    <li>
                        <span class="field-tt">单价</span>
                        <span class="field-ct"><em>1100</em> 元</span>
                    </li>
                    <li>
                        <span class="field-tt">活动人数</span>
                        <span class="field-ct"><em>5</em> 人</span>
                    </li>
                    <li>
                        <span class="field-tt">应付金额</span>
                        <span class="field-ct"><em>&yen; 5500</em></span>
                    </li>
                    <li>
                        <span class="field-tt">支付方式</span>
                        <span class="field-ct"><i class="ljh5-icons ljh5-weixinzhifu"></i>微信支付</span>
                    </li>
                    <li>
                        <span class="field-tt">实付金额</span>
                        <span class="field-ct"><em class="count-total">&yen; 7940.00</em></span>
                    </li>
                </ul>
                <div class="btn-wrap">
                    <button v-on:click="topay">确认支付</button>
                </div>
                <i class="ljh5-icons ljh5-quancha close" v-on:click="close_mask"></i>
            </div>
        </div>-->
        
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.activity-apply-add-new {
    position: absolute;
    z-index: 1;
    top:45px;
    left:0;
    right:0;
    overflow: auto;
    background: @bg-color;
    .apply-add-new-form {
        margin: 13px 0 0 0;
        .flex-column();
        .item {
            padding:0 10px;
            border-bottom: 1px solid @border-color;
            display: inline-table;
            width:100%;
            background: @color-white;
            label {
                display: table-cell;
                width:30%;
                vertical-align: middle;
                color: @subinfo-color;
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
            .area-box{
                vertical-align: middle;
                display: table-cell;
                padding: 10px 0 0 0;
                textarea{
                    border-radius:5px;
                    border: 1px solid #cacaca;
                    width: 90%;
                    padding:3px 7px;
                    height: 56px;
                    resize: none;
                    box-shadow:0px 0px 0px rgba(0,0,0,0);  
                    -webkit-appearance:none;
                    font-size: 16px;
                    line-height: 24px;
                    font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
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
                 font-size: 16px;
                 color: @subinfo-color;
                 .cell-radio {
                     display: block;
                     width: 100%;
                     margin: 5px 0;
                     .radio-tip {
                         line-height: 26px;
                         position: relative;
                         top:-7px;
                         display: inline-block;
                         margin-left: 7px;
                         color: @subinfo-color;
                         font-size: 16px;
                         min-width: 130px;
                     }
                 }
                 input[type=radio] {
                     .radio();
                     top: -2px;
                 }
                  input[type=text],input[type=tel] {
                     .txt();
                     .border-radius(0px);
                     border: none;
                     width: 100%;
                     font-size: 16px;
                     //color: @lightest-color;
                     line-height: 26px;
                     padding: 10px 10px 10px 0;
                 }
            }

            &.space-top {
                padding-top: 20px;
            }
            &.selector {
                border: 0;
                padding-top: 10px;
                label{
                    display: inline;
                }
                .selector-radio{
                    width: 100%;
                    padding-bottom: 8px;
                    .flex();
                    justify-content: space-between;
                    -webkit-justify-content: space-between;
                    .selector-cont {
                        flex: 1 1 auto;
                        -webkit-flex: 1 1 auto;
                        .flex();
                        .radio-tt {
                            flex: 1 1 auto;
                            -webkit-flex: 1 1 auto;
                            font-size: 16px;
                            color: @subinfo-color;
                        }
                        .radio-ct {
                            flex: 0 0 70px;
                            -webkit-flex: 0 0 70px;
                            align-self: flex-end;
                            font-size: 16px;
                            color: @subinfo-color;
                        }
                    }
                    input[type=radio] {
                        flex: 0 0 20px;
                        -webkit-flex: 0 0 20px;
                        top: 3px;
                    }
                }
            }
            
            &:nth-last-child(1) {
                border-bottom: none;
                padding-bottom: 15px;
            }
        }
        .item:nth-last-child(2){
            label{
                display: inline;
            }
            border-bottom: none;
        }
        .invoiceDetail{
            .item{
                border-bottom: none;
                padding: 10px;
                label{
                    b{
                        font-size: 16px;
                    }
                }
                .cell{
                    input{
                        border:1px dashed #ccc;
                        padding:3px 7px;
                    }
                    p{
                        color: #2ea9df;
                        font-size: 16px;
                    }
                }
            }
        }
        .pkg-annotation{
            width: 100%;
            background: @color-white;
            border-bottom: 1px solid @border-color;
            font-size: 14px;
            color: @lightest-color;
            padding: 0 10px;
            .annotation {
                width: 70%;
                margin-left: 30%;
                border-top: 5px solid @bg-color;
                padding: 8px 0;
                font-size: 14px;
                color: @lightest-color;
                line-height: 22px;
                p{
                    overflow: hidden;
                    .flex();
                    justify-content: flex-start;
                    -webkit-justify-content: flex-start;
                    .pkg-tt{
                        flex: 0 0 55px;
                        -webkit-flex: 0 0 55px;
                    }
                    .pkg-intro{
                        flex: 1 1 auto;
                        -webkit-flex: 1 1 auto;
                    }
                }
            }
        }
        .quantity {
            border: 0;
            padding: 10px;
            border-bottom: 1px solid #f2f2f2;
            .operate{
                font-size: 16px;
                line-height: 30px;
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
                    &:last-child{
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
                    &.disabled {
                        background: @bg-color;
                        color: @lightest-color;
                        &:before,&:after{
                            background: @lightest-color;
                        }
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
        }
        .mt10{
            margin-top: 10px;
        }
    }
   
}
.app-main{
    top: 0;  
    .apply-add-new-form{
        margin-top: 0;
    }  
}
.mask-wrap {
    .activity-paywrap {
        width: 94%;
        max-height: 90%;
        background: #ffffff;
        .border-radius(5px);
        padding: 30px 10px 10px;
        overflow: hidden;
        overflow-y: auto;
        position: relative;
        .cont {
            width: 100%;
            padding: 0 0 10px;
            li {
                padding: 8px 0;
                border-bottom: 1px solid @color-gray-f;
                font-size: 16px;
                line-height: 28px;
                color: #717171;
                .flex();
                justify-content: space-between;
                -webkit-justify-content: space-between;
                span {
                    font-size: 16px;
                    &.field-ct {
                        color: @def-font-color;
                        .ljh5-weixinzhifu {
                            color: #00b700;
                            font-size: 18px;
                            margin-right: 6px;
                        }
                    }
                }
                em {
                    font-size: 17px;
                    font-style: normal;
                    font-family: Arial;
                    &.count-total {
                        color: @color-red;
                    }
                }
                &.title {
                    font-size: 20px;
                    color: @def-font-color;
                    text-align: center;
                    justify-content: center;
                    -webkit-justify-content: center;
                    padding: 10px 0;
                }
            }
        }
        .btn-wrap {
            width: 100%;
            padding: 15px 0;
            .flex();
            button {
                .btn();
                display: inline-block;
                min-width: 70%;
                padding: 5px 10px;
                background: @color-red;
                .border-radius(5px);
                box-shadow: 0px 0px 5px rgba(46,169,223,0.5);
                font-size: 20px;
                line-height: 30px;
                color: #ffffff;
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', SimSun, '\5B8B\4F53', sans-serif;
                letter-spacing: 2px;
                text-indent: 2px;
            }
        }
        .close {
            display: inline-block;
            position: absolute;
            right: 5px;
            top: 5px;
            z-index: 3;
            font-size: 30px;
            color: @color-gray-9;
        }
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
                flag2: false,//是否开发票,默认否
                forms: {
                    user_id:"",
                    activity_id:"",
                    user_nickname:"",
                    user_name:"",                               //姓名
                    activityApply_phone:"",                     //手机
                    activityApply_company:"",                   //公司名称
                    user_location:"",                           //公司所在地
                    activityApply_duty:"",                      //职务
                    //activityApply_industry:"",
                    activityApply_product:"",                   //经营业务    
                    activityApply_winxin:"",                    //微信
                    activityApply_channel:1,                    //报名渠道
                    num: 1,                                     //选择人数
                    price_id: "",                               //会议报名id
                    user_telephone:"",                          //座机
                    user_remark:"",                             //备注
                    invoice_isneed:0                            //是否需要发票
                },
                packages: [],
                maxcount: 999,
                showMask: {
                    show: false,
                    cont: ''
                },
                dialog: {
                    dialogShow: false,
                    dialogCont: "",
                    dialogIsauto: true,
                    dialogLife: 3000,
                    dialogIsclosebtn: false
                },
                invoice_name: "",               //收件人姓名
                invoice_phone: "",              //收件人电话
                invoice_payable:"",             //发票抬头
                invoice_tax_number: "",         //发票税号
                invoice_mailing_address:"",     //发票寄送地址
                invoice_type:2,                 //发票类型 0没有 1普通 2增值税
                invoice_content:"",             //发票内容
                user:{},
                login: false,                   //登录  
                isSelfApp: false                //判断是否是嵌入到app的标识 默认false 
            }
        },
        mounted () {
            if(this.$route.params.id && this.$route.name == "activityApplyAddNew"){
                this.isLogin();
                this.getPackage();
            }          
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
            nameChange(){
                this.invoice_name = this.forms.user_name;
            },
            phoneChange(){
                this.invoice_phone = this.forms.activityApply_phone;
            },
            getPackage () {
                this.loading = true;
                let url = API.acticityApplyPackage + "/" + this.forms.activity_id;
                this.$http.get(url)
                .then((response)=>{
                    this.loading = false;
                    if(response.data.code && response.data.code=="200"){
                        this.packages = response.data.planlist;
                        if(this.packages.length > 0){
                            this.forms.price_id = this.packages[0].id;
                        }
                    }
                    //console.log(this.packages);
                }, (response)=>{
                    console.log(response.data);
                });
            },
            addapply () {
                let self = this;
                let telReg = !!this.forms.activityApply_phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
                let landLineReg = !!this.forms.user_telephone.match(/^0(\d{1,3}-?)?\d{7,8}$/);
                if(isNaN(this.forms.num) || this.forms.num <= 0 || this.forms.num == ""){
                    this.show_dialog("参加人数必须是大于0的数字",true,2000,false);
                } else if(this.forms.user_name == "" || this.forms.activityApply_phone == "" || this.forms.activityApply_company == "" || this.forms.activityApply_duty == "") {
                    this.show_dialog("请把报名信息填写完整",true,2000,false);
                    return false;
                } else if(telReg == false) {
                    this.show_dialog("请输入正确的手机号码",true,2000,false);
                    return false;
                }else if(this.forms.user_telephone && landLineReg == false){
                    this.show_dialog("请输入正确的座机",true,2000,false);
                    return false;
                }else {
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
                                window.location.href = "https://m.maicai360.cn/wxpay/confirmorder?ordercode=" + response.data.orderCode;
                            }else{
                                this.show_dialog('网络错误请重试',true,2000,false);    
                            }
                        }
                    }, (response)=>{
                        console.log(response.data);
                    });
                }
                //this.show_mask();  //微信支付确认窗口
            },
            addNum(){
                if(this.forms.num < this.maxcount){
                    this.forms.num++;　
                }
            },
            subNum(){
                if(this.forms.num > 1){
                    this.forms.num--;
                }
            },
            // show_mask () {
            //     document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollTop - 100;
            //     this.showMask.show = true;
            // },
            // close_mask () {
            //     document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollTop + 100;
            //     this.showMask.show = false;
            // },
            // topay () {
            //     this.show_dialog("跳转支付平台",true,2000,false);
            // },

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
            showTip (price) {
                if(price == "1088.00"){
                    this.show_dialog("放送价名额已满，移步优惠价哦~",true,2000,false);
                }
            }
        }
}
</script>