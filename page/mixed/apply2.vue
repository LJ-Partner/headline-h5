<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="apply-v2">
            <div class="apply-main">
                <div class="bannar-w">
                    <img src="http://p.maicai360.cn/img/get/20171107/55826636456678350067287_png">   
                </div>
                <div class="apply-detail">   
                    <div class="apply-detail-cnt">
                        <div class="group-detail">
                            <div class="group-price">
                                <h3 class="price-tit">
                                    终极团购
                                </h3>
                                <div class="price-cnt">
                                    <p>原价: <sup>¥</sup><del>{{activityDetail.originalPrice}}</del> <sub>/ 人</sub></p>
                                    <dl>
                                        <dt>团满:</dt>
                                        <dd><sup>¥</sup>{{activityDetail.groupFull}}<sub>/ 人</sub></dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="group-num">
                                <h3>秒杀人数</h3>
                                <div class="text">
                                    <p v-html="surplusPersonText"></p>
                                    <span v-if="activityDetail.surplusPerson !== 0"><em>{{activityDetail.surplusPerson}}</em> 位</span>
                                </div>
                            </div>
                        </div>
                        <div class="group-info">
                            <dl>
                                <dt>活动时间</dt>
                                <dd v-html="activityDetail.time">
                                </dd>
                            </dl>
                            <dl>
                                <dt>主办方</dt>
                                <dd>
                                    <p v-html="activityDetail.host"></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>{{address}}</dt>
                                <dd>
                                    <p v-html="activityDetail.place"></p>
                                </dd>
                            </dl>
                        </div>
                        <p class="tips">
                            {{tips}}      
                        </p>
                    </div>
                </div>
                <div class="apply-info">
                    <h2  v-if="activityId == '2'">
                        <img src="http://p.maicai360.cn/img/get/20171107/76512636456679151796720_png">
                    </h2>
                    <h2  v-else>
                        <img src="http://p.maicai360.cn/img/get/20171109/50687636458238359353852_png">     
                    </h2>
                    <div class="apply-info-cnt">
                        <div class="info-w">
                            <div class="info" v-html="activityInfo"></div>
                        </div>
                    </div>
                </div>
                <div class="apply-reg">
                    <h2 v-if="activityId == '2'">
                        <img src="http://p.maicai360.cn/img/get/20171107/67657636456680139708387_png">   
                    </h2> 
                    <h2 v-else>
                        <img src="http://p.maicai360.cn/img/get/20171109/56123636458238886288106_png">   
                    </h2>
                    <div class="apply-reg-cnt">
                        <form class="form-box">
                            <h3>联系人信息<em>( 多人参会客服会直接与您确认其他人参会信息 )</em></h3> 
                            <div class="cell">
                                <input type="text" placeholder="请输入您的公司全称(必填)" v-model="forms.company">
                            </div> 
                            <div class="cell">
                                <input type="text" placeholder="请输入您的姓名(必填)" v-model="forms.name">
                            </div>  
                            <div class="cell">
                                <input type="text" maxlength="11" v-on:keyup="forms.phone=forms.phone.replace(/[^0-9]/g,'')" placeholder="请输入您的手机号(必填)" v-model="forms.phone">
                            </div>
                            <div class="cell">
                                <input type="text" placeholder="请输入您的职位(必填)" v-model="forms.duty">
                            </div>
                            <div class="item">
                                <label>是否需要发票</label>  
                                <div class="cell">
                                    <span class="cell-radio"  >
                                        <input type="radio" name="group" v-model="forms.is_invoice" value="1"  /><span class="radio-tip">是</span>
                                    </span>
                                    <span class="cell-radio">
                                        <input type="radio" name="group" v-model="forms.is_invoice" value="0"   /><span class="radio-tip">否</span>
                                    </span>
                                </div>      
                            </div>
                            <div class="cell" v-if="forms.is_invoice == 1">
                                <input type="text" placeholder="请填写单位名称(必填)" v-model="forms.invoice_header">
                            </div>
                            <div class="cell"  v-if="forms.is_invoice == 1">
                                <input type="text" placeholder="请在此填写纳税人识别号(必填)" v-model="forms.duty_paragraph">
                            </div>
                            <p class="tip">以下为参会权益，我们将根据您的信息，为您对接上下游的企业客户</p>
                            <div class="cell">
                                <input type="text" placeholder="您采购的产品(非必填)" v-model="forms.purchase">
                            </div>
                            <div class="cell">
                                <input type="text" placeholder="您销售的产品(非必填)" v-model="forms.sale">
                            </div>
                            <div class="cell">
                                <input type="text" placeholder="近期有采销需求的产品(非必填)" v-model="forms.future">
                            </div>
                            <div class="btn-apply" @click="addapply()">提交</div>
                        </form>        
                    </div>   
                </div>
            </div>
        </div>
        <v-dialog class="apply-dialog" v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
body{
    @media screen and (min-width:640px){
        //background: #000a16;
    }    
}
.apply-v2{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background: #000a16;
    background-size: 100% auto;
    color: #26ecff;
    @media screen and (min-width:640px){
        max-width: 640px;
        margin: 0 auto;
        font-size: 18px;
    }
    img{
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }
    em{
        font-style: normal;
    }
    .swiper-pagination-bullets{
        bottom: 2px;
    }
    .swiper-pagination-bullet{
        background: #8b8b8b;
        opacity: 1;
    }  
    .swiper-pagination-bullet-active{
        background: #6ec7f5;
    }
    .apply-empty{
        .pub-empty{
            padding: 20px 10px;
            img{
                width: 50%;
                margin: 0 auto;
            }
            p{
                line-height: 30px;
                text-align: center;
            }
        }
    }
    .apply-fade{
        transition: opacity .5s linear;
    }
    .apply-fade-enter,
    .apply-fade-leave {
        opacity: 0;
    }
    .apply-detail{
        .apply-detail-cnt{
            width: 88%;
            margin: 0 auto;
            padding: 20px 0;
            .group-detail{
                .flex();
                justify-content: flex-start;
                margin: 0 0 16px 0;
                .group-price{
                    width: 44%;
                    border: 1px solid #2a525e;
                    background: #081929;
                    color: #edba2e;
                    font-weight: 600;
                    font-family: 'Adobe 黑体 Std R';
                    .price-tit{
                        text-align: center;
                        font-size: 14px;
                        color: #edba2e;
                        padding: 5px 0;
                        background: #a50c07;
                        font-weight: 600;
                        @media screen and (min-width:640px){
                            font-size: 20px;
                        }
                    } 
                    .price-cnt{
                        padding: 12px 8px;
                        @media screen and (min-width:320px) and (max-width:340px){
                            padding: 10px 6px;
                        }
                        sub{
                            font-size: 12px;
                        }
                        @media screen and (min-width:640px){
                            p,sub,dt,dd,sup,del{
                                font-size: 18px;    
                            }
                        }
                        dl{
                            dd{
                                padding: 0 0 0 1em;
                                
                            }
                        }
                    }
                }
                .group-num{
                    flex: 1 1 auto;
                    background: url('http://p.maicai360.cn/img/get/20171107/03766636456678763020585_png') no-repeat;
                    background-size: 100% 100%;
                    color: #fff;
                    padding: 2% 0 0 6%;
                    box-sizing: border-box;
                    h3{
                        font-size: 12px;
                        color: #d2ac5e;
                        line-height: 22px;
                        background: #10263d;
                        width: 92%;
                        margin: 2% 0 0 0;
                        padding: 0 0 0 5px;
                    }
                    .text{
                        .flex-column();
                        align-items: center;
                        height: 80%;
                        p{
                            margin: 0 0 20px 0;
                            @media screen and (min-width:320px) and (max-width:340px){
                                font-size: 12px;
                            }
                        }
                        em{
                            font-size: 22px;
                            font-weight: 600;
                        }
                    }
                    @media screen and (min-width:640px){
                        h3,p{
                            font-size: 18px;    
                        }
                        em{
                            font-size: 30px;
                        }
                    }
                }
            } 
            .group-info{
                .flex();
                margin: 0 0 10px 0;
                dl{
                    flex: 1 1 auto;
                    border: 1px solid #2a525e;
                    margin: 0 1px 0 0;
                    dt{
                        text-align: center;
                        background: #a50c07;
                        color: #edba2e;
                    }
                    dd{
                        padding: 10px 0;
                        .flex-column();
                        align-items: center;
                        p{
                            text-align: center;
                        }
                    }
                }
            }
            .tips{
                color: #afafaf;
            }
        }
    }
    .group-info{
        .flex();
    }
    .apply-info{
        .apply-info-cnt{
            width: 96%;
            margin: 13px auto;
            background: #000a16;
            .info-w{
                width: 88%;
                margin: 0 auto 10px;
                background: url('http://p.maicai360.cn/img/get/20171107/87443636456679902409848_png') bottom no-repeat;
                background-size: 100% auto;
                padding: 0 0 25px 0;
                @media screen and (min-width:640px){
                    padding: 0 0 40px 0;
                }
                .info{
                    border-top: 1px solid #2a525e;
                    border-bottom: 1px solid #2a525e;
                    border-left: 2px solid #1fdaeb;
                    border-right: 2px solid #1fdaeb;
                    padding: 15px 5px 0 5px;
                    p{
                        margin: 0 0 16px 0;
                        b{
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
    .apply-reg{
        .apply-reg-cnt{
            width: 96%;
            margin: 0 auto;
            background: #000a16;
            color: #ffc600;
            .form-box{
                padding: 0 10px 20px 10px;
                background: #000a16;
                h3{
                    font-size: 14px;
                    font-weight: bold;
                }
                .item{
                    label{
                        display: block;
                        line-height: 30px;
                        font-weight: bold;
                    }
                }
                .cell{
                    margin: 0 0 10px 0;
                    overflow: hidden;
                    input{
                        width: 100%;
                        height: 30px;
                        background: #081929;
                        border-radius: 5px;
                        padding: 5px 10px;
                        border: 1px solid #1fdaeb;
                        color: #26ecff;
                    }
                    .cell-radio {
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;
                        .radio-tip {
                            position: relative;
                            display: inline-block;
                            color: #fff;
                            font-size: 14px;
                            vertical-align: middle;
                        }
                    }
                    input[type=radio] {
                        display: inline-block;
                        width: 14px;
                        height: 18px;
                        position: relative;
                        overflow: visible;
                        border: 0;
                        background: 0 0;
                        -webkit-appearance: none;
                        vertical-align: middle;
                        &:before {
                            content: '';
                            display: block;
                            width: 16px;
                            height: 16px;
                            border: 1px solid #717171;
                            border-radius: 13px;
                            background-clip: padding-box;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        &:checked:after {
                            content: '';
                            display: block;
                            width: 4px;
                            height: 4px;
                            background: #72d0f4;
                            border-radius: 7px;
                            position: absolute;
                            left: 7px;
                            top: 7px;
                        }
                        &:checked:before{
                            border: 1px solid #72d0f4;    
                        }
                        &:disabled {
                            &:before{
                                border-color: @bg-border-color;
                                background: @bg-color;
                            }
                        }
                    }
                }
                .tip{
                    margin: 0 0 10px 0;
                    font-weight: bold;
                }
                .btn-apply{
                    .btn();
                    display: block;
                    margin: 20px auto 0;
                    width: 28%;
                    color: #fff;
                    border-radius: 5px;
                    padding: 10px;
                    font-size: 16px;
                    background: url('http://p.maicai360.cn/img/get/20171107/48568636456699621135199_png') no-repeat;
                    background-size: 100% 100%;
                    text-indent: -9999px;
                    @media screen and (min-width:640px){
                        width: 18%;
                    }
                }
            }
        }
    }
}
.apply-dialog{
    .dialog-cont{
        text-align: center;
        background: #11253d;
    }    
}
</style>

<script>
import API from '../../config/api.js'
import wx from 'weixin-js-sdk'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data(){
        return {
            loading:true,
            activityId:'',
            activityInfo: '',                           //活动详情
            surplusPersonText:'',                       //剩余名额文本
            tips:'',                                    //活动注释
            address:'活动地址',
            activityDetail:{
                originalPrice: '',                       //原价
                groupFull:'',                            //团满价格
                surplusPerson: '' ,                      //剩余名额
                time:'',                                 //活动时间
                host:'',                                 //主办方
                place:'',                                //活动地址 
                total:'',                                 //团购总数
                discount:''                               //折扣优惠  
            },
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            forms:{
                id: 0,                                 //活动id
                activity_name: '',                      //活动名称
                industry: 0,                           //行业分类
                name: '',                               //报名人姓名
                phone: '',                              //报名人手机
                company: '',                            //报名人公司名
                duty: '',                               //报名人职位
                is_invoice:1,                           //是否需要发票 0不需要 1需要
                invoice_header: '',                     //发票抬头
                duty_paragraph : '',                    //税号
                sale: '',                               //销售的产品
                purchase: '',                            //采购的产品
                future: ''                               //近期采购意向产品
            },
            shareData:{     //微信分享默认内容
                title: '滴~你有一封锡小贵金属年会邀请函待启',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '诚邀您与300+行业同仁一起参与，现场订货，现场签单',
                link: 'https://m.maicai360.cn'+this.$route.path,
                success(a) {
                    a.recordShare();
                }
            }
        }
    },
    mounted(){
        //获取活动id
        this.activityId = this.$route.params.id;
        this.tips = '注释 : 活动时间内填写会议报名表单人数满'+this.activityDetail.total+'人，即享团购'+this.activityDetail.discount+'折优惠。'
        //获取信息
        this.getActInfo(); 
        //获取报名人数
        this.getApplyNum();
        //每隔5s刷一次
        setInterval(() => {
            this.getApplyNum();     
        }, 5000);
        //分享
        if(this.activityId == '2'){
            this.shareData.title = '旺材钜惠双十一，尺度超大~快来围观';
            this.activityDetail = {
                originalPrice: '3800',                                                              //原价
                groupFull:'1999',                                                                   //团满价格
                surplusPerson: '40',                                                                //剩余名额
                time:'<p>2017年11月9日至</p><p>2017年11月13日</p>',                                  //活动时间
                host:'旺材新媒体',                                                                   //主办方
                place:'江苏·苏州',                                                                   //活动地址  
                total: '40',                                                                         //团购总数
                discount:'五'                                                                         //折扣优惠  
            };
            this.activityInfo = '<p>2018年1月5日旺材新媒体旗下旺材锡加工、旺材小金属、旺材贵金属将于江苏苏州举办中国首届锡小贵金属年会暨焊锡原料订货会。会议齐聚小金属、白银、锡产业链客户。旨在打通相关产业链，促进交易流通。会议一经发布，引起行业客户热烈讨论与积极参与，现已参会人数超80人。</p><p>届双十一期间，为感谢行业客户大力支持。旺材推出双十一狂欢终极团购活动，您只需动动手指填写报名资料即可有机会享会议报名价5折参会。活动会在旺材锡加工，旺材小金属，旺材贵金属及旺材合作的各大媒体同步报道发酵。<b>当然，也欢迎您转发本页面到朋友圈邀请您的朋友一起享受本优惠。</b></p>'
        }else if(this.activityId == '5'){
            this.shareData.title = '旺材钜惠双十一，尺度超大~快来围观';
            this.shareData.desc = ' 诚邀您与300+行业同仁一起参与，了解行业最新动态、聆听行业大咖成功经验！';
            this.activityDetail = {
                originalPrice: '2880',                                                              //原价
                groupFull:'1588',                                                                   //团满价格
                surplusPerson: '18',                                                                //剩余名额
                time:'<p>2017年11月9日至</p><p>2017年11月13日</p>',                                  //活动时间
                host:'旺材新媒体',                                                                   //主办方
                place:'广东 佛山',                                                                   //活动地址  
                total: '20',                                                                         //团购总数
                discount:'5.5'                                                                         //折扣优惠  
            };
            this.activityInfo = '<p>旺材新媒体深入市场调研行业现状，了解企业生存发展难题，并策划举办2017中国硅钢年会，旨在为硅钢产业链客户搭建了解行业发展趋势、新技术升级和技术发展方向市场变化、成本控制难题、行业技术标杆及寻求优质合作伙伴的平台。会议将就行业趋势，技术壁垒，相关产业新发展等做进一步解读。</p><p>届双十一期间，为感谢行业客户大力支持，旺材推出双十一狂欢终极团购活动，您只需动动手指填写报名资料即可有机会享受会议报名价5.5折参会。活动会在旺材变压器、旺材电机，旺材电力及旺材合作的各大媒体同步报道发酵。欢迎参加过徐州和无锡会议以及即将参加佛山会议的新老朋友，也欢迎您转发本页面到朋友圈邀请您的朋友一起享受本优惠。</p>';
        }else if(this.activityId == '7'){
            this.shareData.title = '旺材钜惠双十一，尺度超大~快来围观';
            this.address = '会议时间/地址';
            this.shareData.desc = ' 诚邀您与300+行业同仁一起参与，了解行业最新动态、聆听行业大咖成功经验！';
            this.activityDetail = {
                originalPrice: '2980',                                                              //原价
                groupFull:'1980',                                                                   //团满价格
                surplusPerson: '5',                                                                //剩余名额
                time:'<p>2018年2月1日</p><p>9：00--18:00</p>',                                    //活动时间
                host:'旺材新媒体<br/> 旺材电机及其控制',                                                   //主办方
                place:'4月21-22日<br/>无锡新湖铂尔曼大酒店',                                                        //活动地址  
                total: '5',                                                                         //团购总数
                discount:'5.5'                                                                         //折扣优惠  
            };
            this.tips = '注释：本次活动为春节活动第一弹，后续精彩请继续关注期待';
            this.activityInfo = '<p>旺材新媒体深入市场调研行业现状，了解企业生存发展难题，并策划举办2017中国硅钢年会，旨在为硅钢产业链客户搭建了解行业发展趋势、新技术升级和技术发展方向市场变化、成本控制难题、行业技术标杆及寻求优质合作伙伴的平台。会议将就行业趋势，技术壁垒，相关产业新发展等做进一步解读。</p><p>届双十一期间，为感谢行业客户大力支持，旺材推出双十一狂欢终极团购活动，您只需动动手指填写报名资料即可有机会享受会议报名价5.5折参会。活动会在旺材变压器、旺材电机，旺材电力及旺材合作的各大媒体同步报道发酵。欢迎参加过徐州和无锡会议以及即将参加佛山会议的新老朋友，也欢迎您转发本页面到朋友圈邀请您的朋友一起享受本优惠。</p>';
        }
        this.getConfig(this.shareData);
    },
    methods: {
        radioClick(id){
            if(id == 1){
                this.forms.is_invoice = 1;
            }else if(id == 0){
                this.forms.is_invoice = 0;
            }
        },
        getActInfo(){
            this.loading = true;
            this.$http.get(API.getActApplyInfo+'/'+this.activityId)
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    this.actInfo = response.data.data.info;
                    this.actPic = response.data.data.pics;
                    this.forms.id = this.actInfo.ActivityID;
                    this.forms.activity_name = this.actInfo.ActivityName;
                    this.forms.industry = this.actInfo.Industry;
                }else{
                    // console.log(response.data);
                } 
                this.loading = false;
            }, (response)=>{
                console.log(response.data);
            });   
        },
        addapply(){
            let telReg = !!this.forms.phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);  
            if(this.forms.company == '' || this.forms.name == '' || this.forms.phone == '' || this.forms.duty == ''){
                this.show_dialog("请把报名信息填写完整",true,2000,false);
                return false;
            }else if(telReg == false){
                this.show_dialog("请填写正确的手机号",true,2000,false);
                return false;    
            }else{
                if(this.forms.is_invoice == '1'){
                    //需要发票
                    if(this.forms.invoice_header == '' || this.forms.duty_paragraph == ''){
                        this.show_dialog("请把相关信息填写完整",true,2000,false);   
                        return false;
                    }
                }
                this.$http.post(API.addMixedApply,this.forms)
                .then((response)=>{
                    if(response.data.code && response.data.code=="200"){
                        this.show_dialog("报名信息已提交<br/>稍候将会有工作人员联系您",true,2000,false); 
                        this.getApplyNum();
                        setTimeout(() => {
                            this.forms = {
                                name: '',                               //报名人姓名
                                phone: '',                              //报名人手机
                                company: '',                            //报名人公司名
                                duty: '',                               //报名人职位
                                is_invoice:1,                           //是否需要发票 0不需要 1需要
                                invoice_header: '',                     //发票抬头
                                duty_paragraph : '',                    //税号
                                sale: '',                               //销售的产品
                                purchase: '',                            //采购的产品
                                future: ''                               //近期采购意向产品
                            };
                            window.location.reload();     
                        }, 3000); 
                    }
                }, (response)=>{
                    this.show_dialog('网络错误请重试',true,2000,false);  
                    return false;
                });
            } 
        },
        getApplyNum(){
            this.$http.get(API.getMixedApplyNum+'/'+this.activityId)
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    if(response.data.data.limit_count == 0){
                        this.surplusPersonText = '已有<em>'+ response.data.data.count + '</em>个团购者';
                    }else{
                        this.surplusPersonText = '本次会议团购剩余名额';    
                    }
                    this.activityDetail.surplusPerson = response.data.data.limit_count;
                }
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
        },
        //微信分享权限注入
        getConfig(shareobj){
            let that = this;
            this.$http.get(API.weixinShare).then((response) => {
                let data        = response.data,
                    timestamp   = response.data.timestamp,
                    appId       = response.data.appId,
                    nonceStr    = response.data.noncestr,
                    signature   = response.data.signature;
                    wx.config({
                        debug: false,
                        appId:appId,
                        timestamp:timestamp,     
                        nonceStr:nonceStr,       
                        signature:signature,     
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',      //分享到朋友圈
                            'onMenuShareAppMessage',    //分享给朋友
                            'onMenuShareQQ',            //分享到qq            
                            'onMenuShareWeibo',         //分享到腾讯微博
                            'onMenuShareQZone'          //分享到qq空间
                        ]
                    });
                    wx.ready(function() {
                        let shareObj = { // 
                            title: shareobj.title,
                            desc: shareobj.desc,
                            link: shareobj.link,
                            imgUrl: shareobj.imgUrl,
                            success() {
                                shareobj.success(that)
                            }
                        };
                        wx.onMenuShareTimeline(shareObj);
                        wx.onMenuShareAppMessage(shareObj);
                        wx.onMenuShareQQ(shareObj);
                        wx.onMenuShareWeibo(shareObj);
                        wx.onMenuShareQZone(shareObj);
                    });
            },(response) => {
                    console.log(response.data)
            });
        },
        //分享记录
        recordShare() {
            this.$http.post(API.shareNotify, { article_id: this.$route.query.id, user_id: this.user_id, type: "6" })  //双十一报名
            .then((response) => {
            }, (response) => {
                console.log(response.data);
            });
        }
    }       
}
</script>
