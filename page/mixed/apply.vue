<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="apply-w">
            <div class="apply-main">
                <div class="bannar-w" v-if="actPic.type1">
                    <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
                        <swiper-slide class="swiper-item" v-for="(item,index) in actPic.type1" v-if="item.PictureURL!=''">
                            <img :src="item.PictureURL">    
                        </swiper-slide>
                        <div v-if="actPic.type1.length >=2" class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
                <ul class="apply-nav">
                    <li>
                        <a href="#INTRODUCE"><i class="ljh5-icons  ljh5-jieshao"></i> 
                            <p>会议介绍</p>
                        </a>
                    </li>   
                    <li>
                        <a href="#GUESTS"><i class="ljh5-icons  ljh5-jiabin"></i> 
                        <p>会议嘉宾</p>
                        </a>
                    </li>
                    <li>
                        <a href="#REVIEW"><i class="ljh5-icons  ljh5-huigu"></i> 
                        <p>往届会议</p>
                        </a>
                    </li>
                    <li>
                        <a href="#GUIDE"><i class="ljh5-icons  ljh5-meeting-baoming"></i> 
                        <p>会议报名</p>
                        </a>
                    </li> 
                </ul>
                <div class="apply-info">
                    <div class="info-box" id="INTRODUCE" v-if="actInfo.Background">
                        <div class="info-box-tit">
                            <h2>INTRODUCE</h2>
                            <h3>
                                <span>会议介绍</span>
                            </h3>
                        </div> 
                        <div class="info-box-cnt">
                            <div class="detail">
                                <span class="detail-tit">会议背景</span>
                                <div class="detail-box" v-if="actInfo.Background" v-html="actInfo.Background"></div>
                            </div>  
                            <div class="detail">
                                <span class="detail-tit">会议亮点</span>
                                <div class="detail-box" v-if="actInfo.Highlight" v-html="actInfo.Highlight"></div>
                            </div>  
                            <div class="detail">
                                <span class="detail-tit">会议议题</span>
                                <div class="detail-box" v-if="actInfo.Topic" v-html="actInfo.Topic"></div>
                            </div> 
                        </div>      
                    </div> 
                    <div class="info-box" id="GUESTS" v-if="actInfo.Background">
                        <div class="info-box-tit">
                            <h2>GUESTS</h2>
                            <h3>
                                <span>会议嘉宾</span>
                                <em>(排名不分先后)</em>
                            </h3>
                        </div> 
                        <div class="info-box-cnt">
                            <swiper :options="swiperOption"  class="photo-play">
                                <swiper-slide class="swiper-item" v-for="(item,index) in actPic.type2" v-if="item.PictureURL != ''">
                                    <img :src="item.PictureURL">
                                </swiper-slide>
                                <div class="swiper-pagination"  slot="pagination"></div>
                            </swiper> 
                        </div>      
                    </div> 
                    <div class="info-box">
                        <div class="info-box-tit" v-if="actInfo.Background">
                            <h2>PUBLICATION</h2>
                            <h3>
                                <span>合作媒体</span>
                            </h3>
                        </div> 
                        <div class="info-box-cnt">
                            <div class="detail">
                                <div class="detail-box" v-if="actInfo.Media" v-html="actInfo.Media"></div>  
                            </div>
                        </div>      
                    </div>  
                    <div class="info-box" v-if="actInfo.Background">
                        <div class="info-box-tit">
                            <h2>ATTENDEES</h2>
                            <h3>
                                <span>部分参会企业</span>
                            </h3>
                        </div> 
                        <div class="info-box-cnt">
                            <swiper :options="swiperOption" ref="mySwiper" class="img-wrap">
                                <swiper-slide class="swiper-item" v-for="(item,index) in actPic.type6" v-if="item.PictureURL!=''">
                                    <img :src="item.PictureURL">    
                                </swiper-slide>
                                <div class="swiper-pagination"  slot="pagination"></div>
                            </swiper>
                        </div>      
                    </div>
                    <div class="info-box" id="REVIEW" v-if="actInfo.Background">
                        <div class="info-box-tit">
                            <h2>REVIEW</h2>
                            <h3>
                                <span>往届会议回顾</span>
                            </h3>
                        </div> 
                        <div class="info-box-cnt">
                            <swiper :options="swiperOption2"  class="review-play">
                                <swiper-slide class="swiper-item" v-for="(item,index) in actPic.type5" v-if="item.PictureURL!=''">
                                    <img :src="item.PictureURL">
                                </swiper-slide>
                            </swiper>     
                        </div>      
                    </div>
                    <div class="info-box" id="GUIDE">
                        <div class="info-box-tit">
                            <h2>GUIDE</h2>
                            <h3>
                                <span>会议报名</span>
                            </h3>
                        </div> 
                        <div class="info-box-cnt">
                            <ul class="tab-tit">
                                <li :class="{cur: tabIndex === index}" v-for="(item,index) in tabItems" v-on:click="tabShow(index)">
                                    <a href="javascript:;">{{item.name}}</a>
                                </li>
                            </ul>
                            <transition name="apply-fade">
                                <div class="tab-box" v-if="tabIndex == '0'">
                                    <form class="form-box">
                                        <h3>联系人信息<em></em></h3> 
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
                                                <span class="cell-radio">
                                                    <input type="radio" v-model="forms.is_invoice"  value="1" v-on:click="flag2 = true"><span class="radio-tip">是</span>
                                                </span>
                                                <span class="cell-radio">
                                                    <input type="radio" v-model="forms.is_invoice" value="0" v-on:click="flag2 = false"><span class="radio-tip">否</span>
                                                </span>
                                            </div>      
                                        </div>
                                        <div class="cell" v-if="flag2">
                                            <input type="text" placeholder="请填写单位名称(必填)" v-model="forms.invoice_header">
                                        </div>
                                        <div class="cell" v-if="flag2">
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
                                        <button type="button" class="btn-apply" v-on:click="addApply">提交</button>
                                    </form>    
                                </div>
                                <div class="tab-box" v-if="tabIndex == '1'">
                                    <div class="cost">
                                        <div v-if="actPic.type3">
                                            <img :src="item.PictureURL" v-for="(item,index) in actPic.type3" v-if="item.PictureURL != ''">
                                            <div class="apply-empty" v-else>
                                                <v-empty v-bind:emptycont="'暂无相关信息'"></v-empty>   
                                            </div>
                                        </div>
                                        <div class="apply-empty" v-else>
                                            <v-empty v-bind:emptycont="'暂无相关信息'"></v-empty>   
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-box" v-if="tabIndex == '2'">
                                    <div class="cost">
                                        <div v-if="actPic.type4">
                                            <img :src="item.PictureURL" v-for="(item,index) in actPic.type4" v-if="item.PictureURL != ''">
                                            <div class="apply-empty" v-else>
                                                <v-empty v-bind:emptycont="'暂无相关信息'"></v-empty>   
                                            </div>
                                        </div>
                                        <div class="apply-empty" v-else>
                                            <v-empty v-bind:emptycont="'暂无相关介绍'"></v-empty>   
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>      
                    </div>
                </div> 
                <div class="apply-contact">
                    <div class="contact-left">
                        <p><a href="/">关于我们</a></p>
                        <p><em>媒体合作</em></p>
                        <p>手机:<a href="tel:18621706315">18621706315</a></p> 
                        <p>邮箱:<a href="mailto:kevin.luo@51wctt.com">kevin.luo@51wctt.com</a></p>   
                    </div>
                    <div class="contact-right">
                        <p><em>联系我们</em></p>
                        <p>电话：<a :href="'tel:' + contact.tel">{{contact.tel}}</a></p>
                        <p>手机：<a :href="'tel:' + contact.mobile">{{contact.mobile}}</a></p>
                        <p>邮箱：<a :href="'mailto:' + contact.email">{{contact.email}}</a></p>
                        <p>地址：上海市普陀区中山北路2438号中瑞大厦11A</p>
                    </div>    
                </div> 
                <div class="apply-about">
                    <div class="apply-about-pic">
                        <img :src="item.PictureURL" v-for="(item,index) in actPic.type7" v-if="item.PictureURL != ''">
                    </div>
                    <div class="apply-about-text">
                        <h4>旺材有料</h4>
                        <p>“旺材有料”是一款工业品行业的内容分发平台，利用数据挖掘和智能推荐技术为用户呈现未来商业新世界。</p>
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
.apply-w{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background: url(./images/apply-bg.png) repeat;
    background-size: 100% auto;
    @media screen and (min-width:640px){
        max-width: 640px;
        margin: 0 auto;
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
    .apply-nav{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content:center;
        -webkit-justify-content:center;
        align-items: flex-start;
        -webkit-align-items: flex-start;
        padding: 15px 0;
        background: #fff;
        color:#000;
        border-bottom: 1px solid #f2f2f2;
        li{
            -webkit-box-flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            a{
                
                display: block;
                text-align: center;
                position: relative;
                z-index: 1;
                i{
                    color: #6ec7f5;
                    font-size: 26px;
                }
                &:before{
                    content: "";
                    height: 0;
                    font-size: 0;
                    line-height: 0;
                    display: block;
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: #f2f2f2;
                    z-index: 9;
                    width: 1px;
                    height: 100%;
                }
            }
            a:last-child{
                background: none;
            }
            p{
                line-height: normal;
                em{
                    color: #f2954c;
                }
            }
            &:last-child{
                a{
                    i{
                        position: relative;
                        z-index: 1;
                        &:after{
                            content: 'hot';
                            position: absolute;
                            right: -22px;
                            top: -14px;
                            font-size: 16px;
                            font-style: italic;
                            font-family: Georgia;
                            color: #ff4040;
                        }
                    }
                    &:before{
                        width: 0;
                    }
                }
            }
        }
    }
    .apply-info{
        margin: 0 0 15px 0;
        .info-box{
            padding: 10px 0;
            .info-box-tit{
                //margin: 0 0 10px 0;
                padding: 0 10px;
                h2{
                    font-size:  24px;
                    color: #fe9162;
                    font-weight: bold;
                    font-family: '微软雅黑'   
                }
                h3{
                    font-size: 16px;
                    color: #000;
                    padding: 18px 0;
                    span{
                        position: relative;
                        z-index: 1;
                        font-size: 18px;
                        padding: 18px 0;
                        &:before{
                            content: "";
                            width: 20px;
                            height: 20px;
                            font-size: 0;
                            line-height: 0;
                            display: block;
                            position: absolute;
                            bottom: 10px;
                            background: #6ec7f5;
                            border-radius: 50%;
                            right: -5px;
                            z-index: -1;
                        }
                    }
                    em{
                        padding: 0 0 0 20px;
                        font-size: 18px;
                        color: #cacaca;
                    }
                }
            }
            .info-box-cnt{
                .detail{
                    padding: 0 10px;
                    .detail-tit{
                        color: #f68e60;
                        font-size: 18px;
                    }
                    .detail-box{
                        p{
                            font-size: 14px;
                            color: #000;
                            margin: 0 0 8px 0;
                            overflow: hidden;
                        }
                    }            
                }
                .tab-tit{
                    .flex();
                    width: 90%;
                    margin: 0 auto;
                    text-align: center;
                    li{
                        flex: 1 1 auto;
                        border: 1px solid #cacaca;
                        a{
                            display: block;
                            font-size: 16px;
                        }
                        &:nth-child(2){
                            border-left: none;
                            border-right: none;
                        }
                    }
                    .cur {
                        a{
                            position: relative;
                            z-index: 1;
                            color: #89d1f7;
                            &:before{
                                content: '';
                                display: block;
                                width: 100%;
                                height: 100%;
                                border: 1px solid #89d1f7;
                                background-clip: padding-box;
                                position: absolute;
                                left: -1px;
                                top: -1px;    
                            }
                        }
                    }
                }
                .tab-box{
                    background: #fff;
                    border-radius: 5px;
                    font-size: 14px;
                    margin: 15px 10px 0 10px;
                    box-shadow: 0 0 5px #d8d8d8;
                    min-height: 100px;
                    .form-box{
                        padding: 0 10px 20px 10px;
                        h3{
                            line-height: 40px;
                            font-size: 14px;
                            color: #000;
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
                            input{
                                border: none;
                                width: 100%;
                                height: 30px;
                                background: #f2f2f2;
                                border-radius: 5px;
                                padding: 5px 10px;
                            }
                            .cell-radio {
                                display: inline-block;
                                .radio-tip {
                                    position: relative;
                                    display: inline-block;
                                    color: #000;
                                    font-size: 14px;
                                    vertical-align: middle;
                                }
                            }
                            input[type=radio] {
                                display: inline-block;
                                width: 14px;
                                height: 14px;
                                position: relative;
                                overflow: visible;
                                border: 0;
                                background: 0 0;
                                -webkit-appearance: none;
                                vertical-align: middle;
                                &:before {
                                    content: '';
                                    display: block;
                                    width: 12px;
                                    height: 12px;
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
                                    left: 5px;
                                    top: 5px;
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
                            width: 24%;
                            background: #6ec7f5;
                            color: #fff;
                            border-radius: 5px;
                            padding: 7px;
                            font-size: 16px;
                        }
                    }
                    .cost{
                        padding: 9px 10px;
                        img{
                            margin-bottom:10px;
                        }
                    }
                }
                .photo-play,.img-wrap{
                    .swiper-pagination-bullets{
                        bottom: 0;
                        position: relative;
                        z-index: 1;
                    }
                }
                .photo-play{
                    .swiper-item{
                        img{
                            margin: 0 auto;
                        }
                    } 
                }
                .review-play{
                    .swiper-item{
                        width: 80%;
                        margin: 0 10px 0 0;
                        img{
                            border-radius: 5px;
                        }
                    }    
                }
            }
        }
    }
    .apply-contact{
        .flex();
        background: #262626;
        padding: 10px 16px;
        color: #fff;
        @media screen and (min-width:640px){
            justify-content: left;
            -webkit-justify-content: left;     
        }
        .contact-left{
            padding: 0 11px 0 0;
            border-right: 1px solid #fff;
            @media screen and (min-width:640px){
                padding: 0 30px 0 0;     
            }
            p{
                &:first-child{
                    margin-bottom: 10px;
                    a{
                        font-size: 18px;
                    }
                }
            }
        }
        .contact-right{
            padding: 0 0 0 15px;
            @media screen and (min-width:640px){
                padding: 0 0 0 30px;     
            }
        }
        p{
            word-break:break-all; 
            em{
                font-size: 16px;
            }
            a{
                color: #fff;
            }
        }
    }
    .apply-about{
        .flex();
        flex: 1 1 auto;
        align-items: stretch;
        -webkit-align-items: stretch; 
        justify-content: center;
        -webkit-justify-content: center; 
        background-size: 100% 100%;
        padding:12px 14px;
        background: #484848;
        .apply-about-pic{
            .flex();
            text-align: center;
            align-items: center;
            -webkit-align-items: center; 
            justify-content: center;
            -webkit-justify-content: center;
            -ms-justify-content: center;
            @media screen and (min-width:640px){
                text-align: left;
                justify-content: left;
                -webkit-justify-content: left; 
                -ms-justify-content: left;   
                width: 40%;
            }
            img{
                max-width: 100%;
                vertical-align: middle;
                @media screen and (min-width:640px){
                    width: 80%;    
                }
            }
        }
        .apply-about-text{
            .flex-column();
            //flex: 1 1 auto;
            text-align: center;
            align-items: center;
            -webkit-align-items: center; 
            justify-content: center;
            -webkit-justify-content: center;
            color: #fff;
            @media screen and (min-width:640px){   
                width: 60%;
            }
            h4{
                font-size: 16px;
                .flex-column();
                text-align: center;
                align-items: center;
                -webkit-align-items: center; 
                justify-content: center;
                -webkit-justify-content: center;
            }
            p{
                //.flex-column();
                align-items: center;
                -webkit-align-items: center; 
                justify-content: center;
                -webkit-justify-content: center; 
                -ms-justify-content: center; 
                width: 100%;
                text-align: left;
                padding: 0 0 0 10px;
                @media screen and (min-width:320px) and (max-width:649px){   
                    .flex-column();
                }
            }
        }
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
}
.apply-dialog{
    .dialog-cont{
        text-align: center;
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
            actInfo: '',
            actPic: '',
            tabIndex: 0,
            bannar:'',
            guestPic: '',                    //嘉宾图
            costPic: '',                     //费用图
            hotelPic: '',                    //酒店图
            reviewPic: '',                   //往届会议回顾
            joinComPic: '',                  //部分参会企业
            qrCode: '',                      //页尾二维码      
            tabItems:[
                {name: '报名参会'},
                {name: '参会费用'},
                {name: '酒店介绍'}
            ],
            contact:{
                tel:"021-62050209",
                mobile:'18501608561',
                email:'wangcaixiaoer.maicai@163.com'
            },
            flag2: true,                               //是否需要发票
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
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',
                slidesPerView: 1,
                paginationClickable: true,
                autoplay: 2000,
                loop: true,
                paginationBulletRender: function(a, b) {                   
                    return '<span class="dot swiper-pagination-bullet"></span>'
                }
            },
            swiperOption2: {
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : false
                }         
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
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        //获取活动id
        this.activityId = this.$route.params.id;
        //获取信息
        this.getActInfo();
        //分享
        if(this.activityId == '2'){
            this.shareData.title = '|跨界|新鲜|整合| 旺材带你重新定义300+客户参与小金属+焊锡原料订货会议';
        }else if(this.activityId == '3'){
            this.shareData.title = '|跨界|新鲜|整合| 旺材带你重新定义300+客户参与锡+焊锡原料订货会议';
        }else if(this.activityId == '4'){
            this.shareData.title = '|跨界|新鲜|整合| 旺材带你重新定义300+客户参与白银+焊锡原料订货会议';
        }else if(this.activityId == '5'){
            this.shareData.title = '滴~你有一封中国硅钢年会邀请函待启';
            this.shareData.desc = ' 诚邀您与300+行业同仁一起参与，了解行业最新动态、聆听行业大咖成功经验！';
            this.contact.tel = '021-62580627';
            this.contact.mobile = '15821337402';
            this.contact.email = 'kevin.luo@maicai360.cn'; 
        }else if(this.activityId == '6'){
            this.shareData.title = '滴~你有一封锂电正极产业链研讨会邀请函待启';
            this.shareData.desc = ' 价格走势分析，高镍三元技术分享，锂电回收利用前瞻，点我报名噢！';
            this.contact.mobile = '18201858782';
            this.contact.email = 'Sylvia.jiang@maicai360.cn'; 
        }else if(this.activityId == '7'){
            this.shareData.title = '2018年中国电机产业链大会 · 华东站';
            this.shareData.desc = ' 旺材电机联合西莫电机论坛，千人大会火热报名中....诚邀您的参与';
            this.contact.mobile = '18720913772';
        }else if(this.activityId == '9'){
            this.shareData.title = '2018变压器产业链大会早鸟票，先到先得';
            this.shareData.desc = ' 诚邀您参与500+行业同仁变压器供需交流会，现场签单';
            this.contact.tel = '021-62050612';
            this.contact.mobile = '13585615054';
            this.contact.email = 'wendy.zhu@maicai360.cn';
        }else if(this.activityId == '1010'){
            this.shareData.title = '滴~1000+锂电行业同仁邀您无锡一聚';
            this.shareData.desc = ' 1000+超强锂电阵容，开启“会+展”新颖参会模式，聊技术，话供需！7月26-27日，无锡等你！';
            this.contact.tel = '021-62050209';
            this.contact.mobile = '18201858782';
            this.contact.email = 'Sylvia.jiang@maicai360.cn';
        }else if(this.activityId == '1011'){
            this.shareData.title = '2018中国伺服、运动控制与应用发展技术及产业研讨会邀请函待启';
            this.shareData.desc = ' 诚邀您与500+行业同仁一起研讨伺服、运动控制与应用，现场订货，现场签单!';
            this.contact.tel = '021-62580627';
            this.contact.mobile = '15821337402';
            this.contact.email = 'kevin.luo@maicai360.cn';    
        }else if(this.activityId == '1012'){
            this.shareData.title = '嗨，欢迎您参与旺材与西莫举办的北方站电机会议~';
            this.shareData.desc = ' 电机电控减速箱企业一网打尽';
            this.contact.tel = '021-62050159';
            this.contact.mobile = '13621859454';
            this.contact.email = 'mayra.yang@maicai360.cn';    
        }else if(this.activityId == '1013'){
            this.shareData.title = '嘀~您有一张中国汽车百人会未来出行大会的门票待领取';
            this.shareData.desc = ' 诚邀您与众多行业大咖一齐相聚杭州，共襄行业盛宴';
            this.contact.tel = '021-62050209';
            this.contact.mobile = '18201858782';
            this.contact.email = 'Sylvia.jiang@maicai360.cn'; 
        } else if(this.activityId == '1015'){
            this.shareData.title = '滴~您有一封新能源汽车年会邀请函待启';
            this.shareData.desc = ' 诚邀您与300+行业同仁一起参与，共话产业发展趋势';
            this.contact.tel = '021-62050839';
            this.contact.mobile = '13585615054';
            this.contact.email = 'wendy.zhu@51wctt.com'; 
        } else if(this.activityId == '1017'){
            this.shareData.title = '欢迎各位参加新能源汽配展，参观预登记、展位申请！';
            this.shareData.desc = '展示面积达万平，展商超过400+，专业观众超过5万人次，新能源汽车全产业链展示实现无缝对接！';
            this.contact.tel = '13621859454';
            this.contact.mobile = '15821337402';
            this.contact.email = 'kevin.luo@51wctt.com'; 
        }
        else if(this.activityId == '1018'){
            this.shareData.title = '欢迎各位参加新能源汽配展，参观预登记、展位申请！';
            this.shareData.desc = '展示面积达万平，展商超过400+，专业观众超过5万人次，新能源汽车全产业链展示实现无缝对接';
            this.contact.tel = '13621859454';
            this.contact.mobile = '15821337402';
            this.contact.email = 'kevin.luo@51wctt.com'; 
        }
        this.getConfig(this.shareData);
    },
    methods:{
        tabShow(index){
            this.tabIndex = index;
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
                    //分享
                    // if(this.actInfo.ActivityName){
                    //     this.shareData.title = this.actInfo.ActivityName;
                    // }
                }else{
                    // console.log(response.data);
                } 
                this.loading = false;
            }, (response)=>{
                console.log(response.data);
            });   
        },
        addApply(){
            let self = this;
            let telReg = !!this.forms.phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);  
            if(this.forms.company == '' || this.forms.name == '' || this.forms.phone == '' || this.forms.duty == ''){
                this.show_dialog("请把报名信息填写完整",true,2000,false);
                return false;
            }else if(telReg == false){
                this.show_dialog("请填写正确的手机号",true,2000,false);
                return false;    
            }else{
                //需要发票
                if(this.flag2 == true){
                    if(this.forms.invoice_header == '' || this.forms.duty_paragraph == ''){
                        this.show_dialog("请把相关信息填写完整",true,2000,false);   
                        return false;
                    }
                }
                this.$http.post(API.addMixedApply,this.forms)
                .then((response)=>{
                    if(response.data.code && response.data.code=="200"){
                        this.show_dialog("报名信息已提交<br/>稍候将会有工作人员联系您",true,2000,false); 
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
                        }, 3000) 
                    }
                }, (response)=>{
                    this.show_dialog('网络错误请重试',true,2000,false);  
                    return false;
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
            this.$http.post(API.shareNotify, { article_id: this.$route.query.id, user_id: this.user_id, type: "5" }) 
            .then((response) => {
            }, (response) => {
                console.log(response.data);
            });
        },
    }
}
</script>
