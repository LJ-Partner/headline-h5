<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="apply-v3">
            <div class="apply-main">
                <div class="bannar-w">
                    <img src="https://p.maicai360.cn/img/get/20180131/02124636530100084361068_jpg" v-if="activityId == '7'">   
                    <img src="https://p.maicai360.cn/img/get/20180202/37474636531784358126613_jpg" v-if="activityId == '8'"> 
                    <img src="https://p.maicai360.cn/img/get/20180309/30147636562075473182835_jpg" v-else>
                </div>
                <div class="apply-detail">   
                    <div class="apply-detail-cnt">
                        <div class="group-detail-bg">
                            <div class="group-detail">
                                <div class="group-price">
                                    <h3 class="price-tit">
                                        终极团购
                                    </h3>
                                    <div class="price-cnt" v-if="activityId == '7' || activityId == '8'">
                                        <p>原价: <sup>¥</sup><del>{{activityDetail.originalPrice}}</del> <sub>/ 人</sub></p>
                                        <dl>
                                            <dt>团满:</dt>
                                            <dd><sup>¥</sup>{{activityDetail.groupFull}}<sub>/ 人</sub></dd>
                                        </dl>
                                    </div>
                                    <div class="price-cnt" v-else>
                                        <img src="https://p.maicai360.cn/img/get/20180309/74656636562097138158298_jpg" />
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
                        </div>
                        <p class="tips">
                            {{tips}}      
                        </p>
                    </div>
                </div>
                <div class="apply-info">
                    <h2 >
                        <img src="https://p.maicai360.cn/img/get/20180131/70643636530154238934129_png">     
                    </h2>
                    <div class="apply-info-cnt">
                        <div class="info-w">
                            <div class="info" v-html="activityInfo"></div>
                        </div>
                    </div>
                </div>
                <div class="apply-reg">
                    <h2>
                        <img src="https://p.maicai360.cn/img/get/20180131/62670636530155853082658_png">   
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
                            <div class="relative">
                                <div class="cell ">
                                    <input type="text" placeholder="近期有采销需求的产品(非必填)" v-model="forms.future">
                                </div>
                                <img src="https://p.maicai360.cn/img/get/20180131/32122636530197764023904_png" class="img" />
                            </div>
                            <div class="btn-apply" @click="addapply()">
                                <img src="https://p.maicai360.cn/img/get/20180131/73320636530156805580392_png" />
                            </div>
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
.apply-v3{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background: #000;
    background-size: 100% auto;
    color: #26ecff;
    padding: 0 8px;
    box-sizing: border-box;
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
    .apply-main{
        background: #C31A13;
        padding-bottom: 25px;
        .apply-detail{
            .apply-detail-cnt{
                width: 92%;
                margin: 0 auto;
                padding: 20px 0;
                .group-detail-bg{
                    background: url('https://p.maicai360.cn/img/get/20180131/13820636530152814470568_png') center no-repeat;
                    background-size: 100% 100%;
                    padding: 6px 10px;
                    box-sizing: border-box;
                    .group-detail{
                        .flex();
                        justify-content: flex-start;
                        margin: 0 0 16px 0;
                        .group-price{
                            width: 46%;
                            border: 2px solid #fbca8f;
                            background: #fbca8f;
                            color: #edba2e;
                            font-weight: 600;
                            font-family: 'Adobe 黑体 Std R';
                            .price-tit{
                                text-align: center;
                                font-size: 14px;
                                color: #fbca8f;
                                padding: 5px 0;
                                background: #a50c07;
                                font-weight: 600;
                                @media screen and (min-width:640px){
                                    font-size: 20px;
                                }
                            } 
                            .price-cnt{
                                padding: 12px 8px;
                                background: #fbca8f;
                                color: #a50c07;
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
                                p{
                                    font-size: 16px;
                                }
                                dl{
                                    dd{
                                        padding: 0 0 0 1em;
                                        font-size: 22px;
                                    }
                                }
                            }
                            .price-cnt2{
                                background: #fbca8f;
                                color: #a50c07;
                                font-size: 12px;  
                                @media screen and (min-width:320px) and (max-width:375px){
                                    li{
                                        p{
                                            em{
                                                font-size: 10px;
                                            }
                                        }
                                    }   
                                } 
                            }
                        }
                        .group-num{
                            flex: 1 1 auto;
                            background: url('https://p.maicai360.cn/img/get/20180131/23354636530161454398209_png') no-repeat;
                            background-size: 100% 100%;
                            color: #fbcc93;
                            //padding: 2% 0 0 6%;
                            box-sizing: border-box;
                            border: 4px solid #f7e8cd;
                            margin: 0 0 0 10px;
                            h3{
                                font-size: 12px;
                                color: #a50c07;
                                line-height: 22px;
                                background: #fbd09c;
                                width: 92%;
                                margin: 5px auto 0;
                                padding:0 15px;
                                border-radius: 20px;
                            }
                            .text{
                                .flex-column();
                                align-items: center;
                                height: 80%;
                                p{
                                    @media screen and (min-width:320px) and (max-width:340px){
                                        font-size: 12px;
                                    }
                                }
                                em{
                                    font-size: 26px;
                                    font-weight: 600;
                                    @media screen and (min-width:320px) and (max-width:340px){
                                        font-size: 18px;
                                    }
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
                        //margin: 0 0 10px 0;
                        dl{
                            flex: 1 1 0;
                            border: 2px solid #fbca8f;
                            margin: 0 3px 0 0;
                            background: #fbca8f;
                            dt{
                                text-align: center;
                                background: #a50c07;
                                color: #fbca8f;                        }
                            dd{
                                padding: 10px 0;
                                height: 100px;
                                .flex-column();
                                align-items: center;
                                p{
                                    text-align: center;
                                    color: #a50c07;
                                }
                            }
                            &:last-child{
                                margin-right: 0;
                            }
                        }
                        @media screen and (min-width:320px) and (max-width:375px){
                            dl{
                                dt{
                                    font-size: 12px;
                                }
                                dd{
                                    p{
                                        font-size: 12px;
                                    }
                                }    
                            }
                        }
                    }
                } 
                .tips{
                    color: #fff;
                }
            }
        }
        .group-info{
            .flex();
        }
        .apply-info{
            color: #ba2019;
            .apply-info-cnt{
                width: 100%;
                .info-w{
                    width: 90%;
                    margin: 0 auto;
                    background:url('https://p.maicai360.cn/img/get/20180131/68733636530156473554147_png') bottom no-repeat;
                    background-size: 100% auto;
                    padding: 0 0 25px 0;
                    @media screen and (min-width:640px){
                        padding: 0 0 40px 0;
                    }
                    .info{
                        padding: 15px 6% 0 6%;
                        background-image: linear-gradient(90deg, #fbcc93 0%, #feb564 100%);
                        p{
                            padding: 0 0 16px 0;
                            text-indent: 2em;
                            b{
                                color: #fff;
                            }
                            &:last-child{
                                text-indent: 0;
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
                color: #fbcc93;
                .form-box{
                    padding: 0 10px 20px 10px;
                    background: #C31A13;
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
                            //background: #feb564;
                            border-radius: 5px;
                            padding: 5px 10px;
                            border: none;
                            color: #ba2019;
                            background-image: linear-gradient(90deg, #fbcc93 0%, #feb564 100%);
                            &::-webkit-input-placeholder {

                                /* WebKit browsers */
                                color: #ba2019 !important;
                            }
                            &:-moz-placeholder {

                                /* Mozilla Firefox 4 to 18 */
                                color: #ba2019 !important;
                            }
                            &::-moz-placeholder {

                                /* Mozilla Firefox 19+ */
                                color: #ba2019 !important;
                            }
                            &:-ms-input-placeholder {

                                /* Internet Explorer 10+ */
                                color: #ba2019 !important;
                            }
                        }
                        .cell-radio {
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;
                            .radio-tip {
                                position: relative;
                                display: inline-block;
                                color: #fbca8f;
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
                                border: 1px solid #fbca8f;
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
                                background: #fbca8f;
                                border-radius: 7px;
                                position: absolute;
                                left: 7px;
                                top: 7px;
                            }
                            &:checked:before{
                                border: 1px solid #fbca8f;    
                            }
                            &:disabled {
                                &:before{
                                    border-color: @bg-border-color;
                                    background: @bg-color;
                                }
                            }
                        }
                    }
                    .relative{
                        position: relative;
                        z-index: 1;
                        .img{
                            width: 42%;
                            margin: 0;
                            position: absolute;
                            z-index: 1;
                            top: 30px;
                            left: 0;
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
                        width:50%;
                        padding: 0;
                        @media screen and (min-width:640px){
                            width: 25%;
                        }
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
            surplusPersonText:'本次会议团购剩余名额',      //剩余名额文本
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
                title: '新能源电机“千人大会”参团中，就差你一个啦，快上车~',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '',
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
        //获取信息
        this.getActInfo(); 
        //获取报名人数
        this.getApplyNum();
        //每隔5s刷一次
        setInterval(() => {
            this.getApplyNum();     
        }, 5000);
        //分享
        if(this.activityId == '7'){
            this.address = '会议时间/地址';
            this.activityDetail = {
                originalPrice: '2980',                                                                //原价
                groupFull:'2018',                                                                    //团满价格
                surplusPerson: '5',                                                                  //剩余名额
                time:'<p>2月5日-2月14日</p>',                                                 //活动时间
                host:'旺材新媒体<br/> 旺材电机及其控制',                                              //主办方
                place:'4月21-22日<br/>无锡新湖铂尔曼大酒店',                                          //活动地址  
                total: '50',                                                                        //团购总数
                discount:'5.5'                                                                     //折扣优惠  
            };
            this.tips = '注释：本次活动为春节活动第一弹，后续精彩请继续关注期待';
            this.activityInfo = '<p>旺材电机及其控制&西莫电机论坛共同打造新能源电机产业链大会，会议将于2018年4月21-22日无锡新湖铂尔曼大酒店举行。</p><p>会议将邀请行业1500+来自新能源汽车电机领域相关行业协会/学会/联盟、新能源驱动电机厂商、硅钢/漆包线/磁性材料/铜铝材、铁芯冲片/轴承/转轴/机壳端盖/铸件/绝缘材料/传感器等配件商、横剪纵剪/开平机/送料机/冲床/模具/绕线机/性能检测设备/电焊机/自动化产线/磁钢装配等设备供应商、电机控制系统及装置、高校科研院所、整车企业等行业一线大佬透过高端演讲对话及互动交流形式，从市场及技术应用不同层面探讨产业发展热点。</p><p>碰撞智慧，共迎绿色的未来！</p>';
        }else if(this.activityId == '8'){
            this.address = '会议时间/地址';
            this.shareData.imgUrl= 'https://p.maicai360.cn/img/get/20180202/56800636531958918743198_jpg';
            this.shareData.title = '老板说只有一天！5800元年会红包奉送，三百人正极材料大会参会名额等你来占！';
            this.shareData.desc = '三百人正极材料大会参会名额等你来占！';
            this.activityDetail = {
                originalPrice: '3180',                                                                //原价
                groupFull:'2018',                                                                    //团满价格
                surplusPerson: '5',                                                                  //剩余名额
                time:'<p>2月6日-2月14日</p>',                                                       //活动时间
                host:'旺材新媒体<br/>  旺材锂电',                                                    //主办方
                place:'3月23-24日<br/>江苏常州香格里拉大酒店',                                          //活动地址  
                total: '20',                                                                        //团购总数
                discount:'5.5'                                                                     //折扣优惠  
            };
            this.tips = '注释：本次活动为春节活动第二弹，后续精彩请继续关注期待';
            this.activityInfo = '<p>旺材新媒体&真锂研究共同打造正极材料产业链大会，会议将于2018年3月23-24日常州香格里拉大酒店举行。</p><p>会议将邀请行业300+来自正极材料上下游行业相关协会/学会/联盟、钴锂镍矿商、盐类产品生产商、正极材料企业、锂电池企业以及相关配套的设备、金融、高校科研院所等行业一线大佬透过高端演讲对话及互动交流形式，从市场及技术应用不同层面探讨产业发展热点。</p><p>碰撞智慧，共迎绿色的未来！</p>';
        }else if(this.activityId == '10'){
            this.address = '会议时间/地址';
            this.shareData.imgUrl= 'https://p.maicai360.cn/img/get/20180202/56800636531958918743198_jpg';
            this.shareData.title = '@变压器全产业链，一起GO，一起购';
            this.shareData.desc = '500人变压器原材料供需会参会名额等你来占';
            this.activityDetail = {
                originalPrice: '3180',                                                                //原价
                groupFull:'2018',                                                                    //团满价格
                surplusPerson: '30',                                                                 //剩余名额
                time:'<p>2018年5月24日-5月25日</p>',                                                 //活动时间
                host:'旺材新媒体<br/>  旺材变压器',                                                    //主办方
                place:'无锡新湖铂尔曼大酒店',                                                         //活动地址  
                total: '30',                                                                        //团购总数
                discount:'5.5'                                                                     //折扣优惠  
            };
            this.tips = '';
            this.activityInfo = '<p>旺材新媒体&旺材变压器共同打造2018变压器产业链大会暨第二届变压器原材料供需交流会，会议将于2018年5月24-25日无锡新湖铂尔曼大酒店举行。</p>此次会议将邀请行业500+来自变压器产业链上下游相关企业，原材料、配套商、铁芯、变压器等变压器产业链所属企业，打造变压器行业标杆性的产业链大会, 从变压器原材料供应现状、变压器行业发展趋势、高效立体卷铁芯变压器技术、智能电网产业推动等多方面共同为您解读变压器行业最新发展趋势。<p></p><p>我们期望通过会中带展的模式，实现采销双方的无缝对接。为大量配套企业提供一个直面客户，立体展示的机会。</p>';
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
            this.$http.post(API.shareNotify, { article_id: this.$route.query.id, user_id: this.user_id, type: "7" })  //双十一报名
            .then((response) => {
            }, (response) => {
                console.log(response.data);
            });
        }
    }       
}
</script>
