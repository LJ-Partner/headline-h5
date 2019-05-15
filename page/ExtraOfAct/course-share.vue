<template>
    <v-content class="course-share-c">
        <v-loading v-bind:isloading="loading"></v-loading>
         <div class="course-fixed-bar" v-show="!loading">
            <a href="javascript:;" class="bar-detail">
                <div class="bar-detail-logo">
                    <img src="https://p.maicai360.cn/img/get/20180417/24067636595564069687567_png">
                    <p>旺材有料</p>
                </div>
                <a href="javascript:;" class="open">立即打开</a>
            </a>
        </div> 
        <v-main class="course-share-w"  v-show="!loading" :bottom-method="pullList"  ref="bottom">
            <div class="course-main" v-if="courseDetail">
                <div class="main-info">
                    <div class="info-top">
                        <span class="top-cover" v-show="courseDetail.ClassImage">
                            <img :src="courseDetail.ClassImage" />
                        </span>
                        <h1 v-if="courseDetail.ClassName">{{courseDetail.ClassName}}</h1>
                        <p v-if="courseDetail.Teacher">{{courseDetail.Teacher}}</p>
                    </div>
                    <div class="info-audio">
                        <div class="audio-container">
                            <div class="player-wrap" id="playerWrap">
                                <button class="i-play" @click="togglePlaying">
                                    <i class="ljh5-icons " :class="playing?'ljh5-zanting':'ljh5-bofang1'"></i>
                                </button>
                                <div class="play-progress">
                                    <div class="progress-title">{{courseDetail.ClassName}}</div>
                                     <div class="progress-wrap">  
                                        <v-progressBar :percent="percent" @percentChange="setProgress"></v-progressBar>  
                                        <div class="time-group">
                                            <span class="time time-l">{{format(currentTime)}}</span>  
                                            <span class="time time-r">{{format(duration)}}</span> 
                                        </div> 
                                    </div>  
                                </div>
                                <audio class="audio" v-show="courseDetail.Media" :src="courseDetail.Media" ref="audio" @timeupdate="updateTime" @ended="end"  @loadedmetadata="loadedmetadata" preload></audio>
                            </div>
                        </div>
                    </div> 
                    <div class="info-pictures" v-if="courseDetail.imageList && courseDetail.imageList.length > 0">
                        <div class="pic-title">
                             <p>本节PPT {{curIndex}}/{{courseDetail.imageList.length}}</p>  
                        </div>
                        <div class="pic-group">
                            <span class="group-ppt">
                                <img src="https://p.maicai360.cn/img/get/20180515/88816636619895766393518_png"  />
                            </span>
                            <swiper :options="swiperOption" ref="mySwiper">
                                <div class="swiper-button-prev arrow pre" slot="button-prev"></div>
                                <div class="swiper-button-next arrow nex" slot="button-next"></div>
                                <swiper-slide class="swiper-item" v-for="(item, index) in courseDetail.imageList">
                                    <img class="img-detail" :src="item" v-on:click="imagePreview(index, courseDetail.imageList)">
                                    <p class="fullscreen">
                                        <i class="ljh5-icons ljh5-fangda" v-on:click="imagePreview(index, courseDetail.imageList)"></i>
                                    </p>
                                </swiper-slide>
                                <!-- <div v-if="courseDetail.imageList.length >=2" class="swiper-pagination"  slot="pagination"></div> -->
                            </swiper>
                        </div>
                    </div> 
                    <div id="articleCont" ref="cont" class="info-text" v-show="courseDetail.details" v-html="courseDetail.details" :class="{'fold': isContFold}"></div>
                    <transition name="articledetail-fade-out">
                        <div class="show-full" v-on:click="showFull" v-if="isFold"><span><i></i>点击展开全文</span></div>
                    </transition> 
                </div> 
                <div class="main-comment">
                    <div class="comment-title">
                        <h2>精选留言</h2>
                        <a class="open" href="javascript:;">
                            <i class="ljh5-icons ljh5-shuxie"></i>
                            <span>留言</span>
                        </a>
                    </div>
                    <div class="comment-list" v-if="commentList && commentList.length > 0">
                        <dl class="list-item" v-for="item in commentList">
                            <dt>
                                <img :src='"/Api/V1/User/Avatar/"+item.UserID' />    
                            </dt>
                            <dd>
                                <h3>
                                    <span class="username">{{item.Nickname}}</span>
                                    <span class="prise">
                                        <i class="ljh5-icons ljh5-dianzan2"></i>
                                        <em>{{item.LikeCount}}</em>
                                    </span>
                                </h3> 
                                <p>
                                    {{item.ContentMgs}}    
                                </p>  
                                <span class="date">{{item.CreateTime.split(' ')[0].replace(/\//g,'-')}}</span> 
                                <div class="sub-list" v-if="item.ContentRly">
                                    <dl>
                                        <dd>
                                            <h3>
                                                <span class="username">作者回复</span>
                                            </h3> 
                                            <p>
                                                {{item.ContentRly}}    
                                            </p>  
                                            <span class="date">{{item.RlyCreateTime.split(' ')[0].replace(/\//g,'-')}}</span> 
                                        </dd>    
                                    </dl>
                                </div>
                            </dd>    
                        </dl>
                        <p class="list-bottom">
                            以上留言由 作者 筛选显示
                        </p>
                    </div>
                    <div class="comment-empty" v-else>
                        <img src="https://p.maicai360.cn/img/get/20180508/27771636613677739707625_png" />
                        <p>旺友，请上座！</p>
                    </div>
                </div>
            </div>
            <v-empty v-else class="course-share-empty" v-bind:emptycont="'相关内容已不存在'"></v-empty>
        </v-main>
        <div class="pswp" ref="pswb" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter"></div>
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
    </v-content>
</template>
<style lang="less">
    @import '../../libs/static/less/validation.less';
    @import '../../libs/static/less/mixins.less';
    .course-share-c{
        height: 100%;
    }
    img{
        max-width: 100%;
    }
    .course-fixed-bar{
        a,button,input,textarea,div{
            -webkit-tap-highlight-color:rgba(255,255,255,0);
            -webkit-appearance:none;
            outline:none;
        }
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1;
        height: 43px;
        background: #2C2E34;
        .bar-detail{
            background: #2C2E34;
            box-sizing: border-box;
            padding: 7px 20px;
            .flex();
            justify-content: space-between;
            font-family: PingFangSC-Regular;
            color: #fff;
            height: 43px;
            box-sizing: border-box;
            .bar-detail-logo{
                .flex();
                justify-content: flex-start;
                align-items: center;
                img{
                    margin: 0 6px 0 0;
                    flex: 0 0 30px;
                    height: 30px;
                    display: flex;
                    width: 30px;
                }
                p{
                    font-size: 16px;
                }
            }
            .open{
                border: 1px solid #F87F5B;
                border-radius: 3px;
                color: #F87F5B;  
                padding:0 9px;
                font-size: 16px; 
            }
        }
    }
    .course-share-w{
        background: #F2F2F2;
        top: 42px;
        bottom: 0;
        z-index: 1;
        padding: 0;
        p{
            word-break: break-all;
            word-wrap: break-word;
        }
        .course-main{
            position: relative;
            z-index: 1;
            .main-info{
                .info-top{
                    border: 1px solid #F2F2F2; 
                    background: #fff;
                    span{
                        width: 100%;
                        height: 0;
                        padding: 0 0 48%;
                        display: block;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                    }
                    h1{
                        font-size: 24px;
                        color: #202020;   
                        padding: 10px 14px; 
                    }
                    p{
                        font-size: 18px;
                        color: #717171;    
                        padding: 0 14px 10px 14px;
                    }
                }
                .info-audio{
                    padding: 14px 14px 0 14px;
                    background: #fff;
                    .audio-container{
                        border: 1px solid #f2f2f2;  
                        height: 64px;
                        box-sizing: border-box;  
                        background: #fff;   
                        .flex();
                        .player-wrap {
                            .flex();
                            justify-content: flex-start;
                            background: #f2f2f2;
                            .i-play{
                                border: none;
                                flex: 0 0 65px;
                                width: 65px;
                                margin: 0 15px 0 0;
                                background: #f2f2f2;
                                i{
                                    font-size: 40px;
                                    color: #F87F5B;
                                }
                            }
                            .play-progress{
                                flex: 1 1 auto;
                                margin: 0 18px 0 0;
                                .progress-title{
                                    padding: 2px 0;
                                    .multi-ellipsis(1);
                                } 
                                .progress-wrap{
                                    .time-group{
                                        display: flex;
                                        justify-content: space-between;
                                        flex-direction: row;
                                    }
                                }
                                input[type=range] { 
                                    outline: none;   
                                    -webkit-appearance: none;/*清除系统默认样式*/    
                                    width:100% !important;    
                                    background: -webkit-linear-gradient(#F87F5B, #F87F5B) no-repeat, #ddd;    
                                    background-size: 0 100%;/*设置左右宽度比例*/    
                                    height: 3px;/*横条的高度*/ 
                                    position: relative;
                                    z-index: 1;
                                    top: -10px;
                                }
                                 /*拖动块的样式*/    
                                input[type=range]::-webkit-slider-thumb {    
                                    -webkit-appearance: none;/*清除系统默认样式*/    
                                    height:10px;/*拖动块高度*/    
                                    width: 10px;/*拖动块宽度*/    
                                    background: #F87F5B;/*拖动块背景*/    
                                    border-radius: 50%; /*外观设置为圆形*/    
                                    border: solid 1px #F87F5B; /*设置边框*/   
                                }
                                .progress-range{
                                    &:before{
                                        position: absolute;
                                        top: 12px;
                                        font-size: 12px;
                                        left: 0;
                                        content: attr(data-current);
                                        color: #b1b1b1;
                                    }
                                    &:after{
                                        position: absolute;
                                        top: 12px;
                                        font-size: 12px;
                                        right: 0;
                                        content: attr(data-max);
                                        color: #b1b1b1;
                                    }
                                }   
                            }
                        } 
                    }
                }
                .info-pictures{
                    background: #fff;
                    padding: 0 14px 10px 14px;
                    margin: 0 0 7px 0;
                    position: relative;
                    z-index: 1;
                    .pic-title{
                        .flex();
                        padding: 21px 0;
                        text-align: center;
                        span{
                            display: flex;
                            width: 20px;
                            height: 20px;
                            flex: 0 0 20px;
                            background: rgba(248,127,91,0.25);
                            border-radius: 50%;
                        }
                        p{
                            flex: 1 1 auto;
                        }
                    } 
                    .pic-group{
                        background: #D8DBD8;
                        border-radius: 3px;   
                        width: 100%; 
                        height: 195px;
                        overflow: hidden;
                        .group-ppt{
                            position: absolute;
                            right: 14px;
                            top: 67px;
                            z-index: 2;
                            width: 6%;
                        }
                        .swiper-container{
                            position: static;
                            height: 100%;
                            .item-img{
                                display: block;
                                height: 0;
                                padding: 0 0 59%;
                                overflow: hidden;
                                border-radius: 5px;
                                text-align: center;
                                img{
                                    max-width: 100%;
                                }
                            }
                            .swiper-pagination{
                                bottom: 5px;
                            }
                            .swiper-pagination-bullet{
                                background: #fff;
                                opacity: 1;
                            }
                            .swiper-pagination-bullet-active{
                                background: #F87F5B;
                            }
                            .arrow{
                                position: absolute;
                                z-index: 10;
                                background-image: none;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background: rgba(248, 127, 91, 0.25);
                                top: 20px;
                                margin:0;
                                -webkit-tap-highlight-color:rgba(255,255,255,0);
                                -webkit-appearance:none;
                                outline:none;
                                &:after{
                                    content: "";
                                    width: 7px;
                                    height: 7px;
                                    display: block;
                                    border-right: 1px solid #717171;
                                    border-bottom: 1px solid #717171;
                                    position: absolute;
                                    top: 6px;
                                    z-index: 5;
                                }
                            }
                            .pre{
                                &:after{
                                    left: 8px;
                                    transform: rotate(135deg);
                                }
                            }
                            .nex{
                                &:after{
                                    transform: rotate(-45deg);   
                                    left: 5px;  
                                }
                            }
                        }
                        .fullscreen{
                            position: absolute;
                            right: 20px;
                            bottom: 16px;
                            z-index: 10;
                            color: #F87F5B;
                            width: 16px;
                            height: 16px;
                            line-height: 16px;
                        }
                    }  
                }
                .info-text{
                    padding: 10px 14px;
                    background: #fff;
                    border-bottom:  1px solid #D8D8D8;
                    position: relative;
                    z-index: 1;
                }
                .fold {
                    position: relative;
                    max-height: 600px;
                    overflow: hidden;
                    transition: max-height .32s cubic-bezier(.95, .05, .795, .035), -webkit-mask-size .22s cubic-bezier(.95, .05, .795, .035);
                    transition: mask-size .22s cubic-bezier(.95, .05, .795, .035), max-height .32s cubic-bezier(.95, .05, .795, .035);
                    transition: mask-size .22s cubic-bezier(.95, .05, .795, .035), max-height .32s cubic-bezier(.95, .05, .795, .035), -webkit-mask-size .22s cubic-bezier(.95, .05, .795, .035);
                    -webkit-mask-image: linear-gradient(#000 calc(100% - 30px), transparent);
                    mask-image: linear-gradient(#000 calc(100% - 30px), transparent);
                    -webkit-mask-size: 100% 100%;
                    mask-size: 100% 100%;
                }
                .articledetail-fade-out-leave-active {
                    -ms-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -moz-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -webkit-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -o-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                }
                .articledetail-fade-out-enter, .articledetail-fade-out-leave-active {
                    opacity: 0;
                    -ms-transform: translateY(20px);
                    -moz-transform: translateY(20px);
                    -webkit-transform: translateY(20px);
                    -o-transform: translateY(20px);
                    transform: translateY(20px);
                }
                .show-full {
                    display: block;
                    text-align: center;
                    border-top: 1px solid #d8d8d8;
                    margin: 20px auto 10px;
                    span {
                        display: inline-block;
                        text-align: center;
                        font-size: 15px;
                        color: @color-blue;
                        line-height: 30px;
                        padding: 0 20px;
                        position: relative;
                        background: #f2f2f2;
                        top: -15px;
                        i {
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                            background: @color-blue;
                            .border-radius(50%);
                            position: relative;
                            top: 2px;
                            margin-right: 5px;
                            &:after {
                                content: "";
                                display: inline-block;
                                width: 5px;
                                height: 5px;
                                border-right: 1px solid @color-white;
                                border-bottom: 1px solid @color-white;
                                .rotate(45deg);
                                position: absolute;
                                left: 5px;
                                top: 4px;
                            }
                        }
                    }
                }
            }
            .main-comment{
                padding: 0 14px;
                .comment-title{
                    .flex();
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #D8D8D8;
                    h2{
                        font-size: 16px;
                        color: #202020;
                        flex: 1 1 auto;
                        padding: 10px 0;
                    }
                    a{
                        flex: 0 0 75px;
                        background: #F87F5B;
                        border-radius: 100px;
                        text-align: center;
                        height: 26px;
                        color: #fff;
                    }
                }
                .comment-list{
                    padding: 14px 0;
                    .list-item{
                        .flex();
                        margin: 0 0 20px 0;
                        dt{
                            width: 30px;
                            height: 30px;
                            flex: 0 0 30px;
                            overflow: hidden;
                            border-radius: 50%;
                            margin: 0 4px 0 0;
                            img{
                                width: 30px;
                                height: 30px;
                            }
                        }
                        dd{
                            flex: 1 1 auto;
                            //border-bottom: 1px solid #D8D8D8;
                            h3{
                                .flex();
                                justify-content: space-between;
                                font-family: PingFangSC-Regular;
                                font-size: 15px;
                                color: #A79475;
                                padding: 6px 0;
                                i{
                                    color:#cacaca;
                                }
                                em{
                                    font-style: normal;
                                }
                            }
                            p{
                                font-size: 14px;
                                color: #202020;
                            }
                            .date{
                                font-size: 12px;
                                color: #717171;
                            }
                            .sub-list{
                                border-top: 1px solid #D8D8D8;    
                            }
                        }
                    }
                    .list-bottom{
                        padding: 34px 0 16px 0;
                        text-align: center;
                        font-size: 15px;
                        color: #9C9C9C;
                    }
                }
                .comment-empty{
                    padding: 31px 0 25px 0;
                    text-align: center;
                    font-size: 14px;
                    color: #CACACA;
                    img{
                        width: 24%;
                        margin: 0 0 0 8%;
                    }   
                }
            }
        }
        .pull-up{
            height: 0;
        }
    }
    .course-share-empty{
        .flex-column();
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        height: 100%;
        background: #fff;
        align-items: center;
        img{
            width: 80%;
            margin: 10px auto;
        }
    }
    .pswp{
        .pswp__button{
            background-image: none;
        }   
        .pswp__button--arrow--left,.pswp__button--arrow--right{
            &:before{
                background-image: none !important;    
            }
        }
    }
    @media all and (orientation : landscape) { /*　　这是匹配横屏的状态，横屏时的css代码　　*/
        
    } 
    @media all and (orientation : portrait){ /*　　这是匹配竖屏的状态，竖屏时的css代码　　*/
        .pswp{
            .pswp__scroll-wrap{
                .pswp__container{
                    .pswp__item{
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        .pswp__zoom-wrap{
                            height: 100%;
                            align-items: center;
                            justify-content: center;
                            display: flex;
                            flex-direction: column;
                            flex: 1 1 auto; 
                            transform: translate3d(0px,0px, 0px) scale(1) !important;
                            .pswp__img--placeholder--blank{
                                display: none !important;
                            }
                            .pswp__img{
                                display: block;
                                max-width: 100%;
                                position: static;
                            }  
                        }
                    }
                }
            }
        }
    }
</style>
<script>
import API from '../../config/api.js'
import Storage from 'store'
import wx from 'weixin-js-sdk'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import UI from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
var u = navigator.userAgent;
//android终端                                     
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
//ios终端                  
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export default {
    data(){
        return {
            isFold: false,                                              //显示部分内容
            isContFold: false,
            showpartSpace: true, 
            showpartTimes: 0,
            page: 1,
            curIndex: 0,
            loading:true,
            percent:'',
            dataSize:[],
            slideIndex: 0,                                             //图片滑动的索引 
            len:'',                                                     //图片长度   
            popShow: false,                                             //弹窗关闭
            duration: 0,                                                //播放总时长
            currentTime:0,                                              //播放时间
            playing:false,                                              //是否播放
            isMore: true,                                               //是否有更多数据
            userId: '',                                                 //用户id  
            courseDetail:'',                                            //课程详情    
            commentList:[],                                             //留言列表
            swiperOption: {
                //pagination: '.swiper-pagination',
                direction: 'horizontal',
                slidesPerView: 1,
                paginationClickable: true,
                onSlideChangeEnd: swiper => {  
                    //这个位置放swiper的回调方法  
                    this.curIndex = swiper.activeIndex + 1;
                    this.slideIndex = swiper.activeIndex;
                },  
                onInit: swiper => {
                    this.curIndex = swiper.activeIndex + 1;
                    this.slideIndex = swiper.activeIndex;
                },
                prevButton: '.swiper-button-prev',//上一张
                nextButton: '.swiper-button-next'//下一张
            },
            shareData:{                                                 //微信分享自定义内容
                title: '因为关注，所以专业',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台',
                link: 'http://m.maicai360.cn'+this.$route.path + '?classId='+this.$route.query.classId,
                success(a){
                    //a.recordShare();         
                }
            },
            appShareData:{
                targetUrl:'http://m.maicai360.cn'+this.$route.path + '?classId='+this.$route.query.classId,
                thumbImageUrl:'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                title:'因为关注，所以专业',
                content:'旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台'    
            },
            isSelfApp: u.indexOf('maicai360_app') > -1                                                                 
        }    
    },
    components: {
        swiper,
        swiperSlide
    },
    //定义这个sweiper对象  
    computed: {  
        swiper() {  
            return this.$refs.mySwiper.swiper;  
        }
    },  
    mounted() {
        if(Storage.get("ljh5user")){
            this.userId = Storage.get("ljh5user").user_id;
        }
        if(this.$route.query.classId){
            this.getCourseDetail(this.$route.query.classId,0);
            this.getCommentList(this.$route.query.classId,this.page);
        }
        this.$nextTick(() =>{
            let self = this;
            wx.ready(function () {
                let _audio = new Audio();
                _audio.src = self.courseDetail.Media; //audio链接
                _audio.addEventListener('loadedmetadata', function() {
                    self.duration = _audio.duration;
                });
            });
        });
        this.toOpenApp();
    },
    updated () {
        this.$nextTick(() =>{
            let self = this;
            if(self.$el.querySelector('.info-text')){
                if(self.showpartTimes <= 0){
                    self.loading = false;
                    let articleCont = self.$el.querySelector('.info-text');
                    this.text = articleCont.offsetHeight;
                    if(articleCont.offsetHeight > 600){
                        self.isFold = true;
                        self.isContFold = true;
                        self.showpartTimes++;
                    } else {
                        self.isFold = false;
                        self.isContFold = false;
                    }
                }
            }
        })
    },
    methods:{
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
                            success(){
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
        //通过app分享
        appShareDetail(targetUrl,thumbImageUrl,title,content){
            if(isAndroid){
                window.WCJSBridge.setShareOfActivity(targetUrl,thumbImageUrl, title, content);                                         
            }else if(isIOS){
                WCJSBridge.setShareOfActivity(targetUrl,thumbImageUrl, title, content);    
            }
        },
        //打开app下载
        toOpenApp(){
            let openArr = this.$el.querySelectorAll('.open');
            if(isAndroid){
                for(let i=0;i<openArr.length;i++){
                    openArr[i].setAttribute('href','http://app.51wctt.com/APP/Download');
                }
            }else if(isIOS){
                for(let j=0;j<openArr.length;j++){
                    openArr[j].setAttribute('href','https://itunes.apple.com/cn/app/wangcaiyouliao/id1361931749');    
                }
            } 
        },
        //获取课程详情
        getCourseDetail(id,uid){
            this.$http.get('http://api.51wctt.com:50010/CourseMaster/ClassDetails',{params:{
                    id: id,
                    uid: uid
                }})
            .then((response)=>{
                this.loading = false;
                if(response.data && response.data.code == '200'){
                    this.courseDetail = response.data.data;
                    this.len = this.courseDetail.imageList.length;
                    if(this.courseDetail.ClassName){ 
                        this.shareData.title =  this.courseDetail.ClassName;
                        this.appShareData.title =  this.courseDetail.ClassName;
                    }
                    if(this.courseDetail.details){
                        this.shareData.desc = this.courseDetail.details.replace(/<[^>]+>/g,"");
                        this.appShareData.content = this.courseDetail.details.replace(/<[^>]+>/g,"");
                        if(this.shareData.desc!=""){
                            this.shareData.desc = this.shareData.desc.substr(0,100);
                            this.appShareData.content = this.appShareData.content.replace(/<[^>]+>/g,"");
                        }else{
                            this.shareData.desc = '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台';
                            this.appShareData.content = this.shareData.desc;
                        } 
                    }
                    if(this.courseDetail.ClassImage){   
                        this.appShareData.thumbImageUrl = this.courseDetail.ClassImage;    
                    }
                    this.getConfig(this.shareData);
                    if(this.isSelfApp){
                        var that = this;
                        that.appShareDetail(that.appShareData.targetUrl,that.appShareData.thumbImageUrl,that.appShareData.title,that.appShareData.content);
                    }
                }
            }, (response)=>{
                console.log(response.data);
            });    
        },  
        //获取评论列表
        getCommentList(classId,pageIndex){
            this.$http.get('http://api.51wctt.com:50010/Message/List',{params:{
                    classId: classId,
                    pageIndex: pageIndex
                }})
            .then((response)=>{
                if(response.data && response.data.code == '200'){
                    if(response.data.data.length > 0){
                        this.commentList = this.commentList.concat(response.data.data);
                    }else{
                        this.isMore = false;     
                    }
                }
            }, (response)=>{
                console.log(response.data);
            });     
        },
        //设置点击播放按钮方法
        togglePlaying(){
            this.playing = !this.playing;                       //改变全局变量playing 的属性
        },
        //下拉加载数据
        pullList(){
            if(this.isMore){
                if(this.page==0){
                    this.page=1;
                } else {
                    this.page++;
                }
                this.getCommentList(this.$route.query.classId,this.page); 
            }
        },
        format(interval){
            interval = interval | 0;
            const minute = interval/60 | 0;
            const second = this._pad(interval % 60);
            return `${minute}:${second}`;      
        },
        //补零
        _pad(num,n=2){
            let len = num.toString().length;
            while(len<n){
                num = '0' + num;
                len ++;
            }
            return num;
        },
        updateTime(e){
            this.currentTime = e.target.currentTime;                                                                    // 获取当前播放时间段
            this.percent = Math.min(1, this.currentTime / this.duration); 
        },
        // 设置进度  
        setProgress(percent) {  
            // 根据子组件传过来的百分比设置播放进度  
            this.$refs.audio.currentTime = this.duration * percent;
            // 拖动后设置歌曲播放  
            if (!this.playing) {  
                this.togglePlaying()  
            }  
        }, 
        //加载获取音频总时长 
        loadedmetadata(res){
            this.duration = parseInt(res.target.duration);
        },
        //音频播放完处理
        end(e){
            this.reset();
        },
        //音频相关参数重置
        reset(){
            this.playing = false;
            this.currentTime = '0';
            this.percent = Math.min(1, this.currentTime / this.duration); 
        },
        //图片放大
        imagePreview (currentIndex, imageArray) {
            let that = this;
            this.$nextTick(() =>{
                var items = [];
                var item = {};
                var imgArr = this.$el.querySelectorAll('.img-detail');
                for(var i=0;i<imgArr.length;i++){
                    item = {
                        src: imgArr[i].src,
                        w: imgArr[i].naturalWidth, 
                        h: imgArr[i].naturalHeight
                    }
                    this.dataSize.push(item.w+'x'+item.h)
                    items.push(item);
                }
                var options = {
                    history: true,
                    focus: false,
                    index: currentIndex,
                    tapToClose: true
                }
                var pswpElement = this.$refs.pswb;
                var gallery = new PhotoSwipe(pswpElement, UI, items, options);
                    gallery.init();
                    gallery.listen('close', function() {});
            })
        },
        showFull() {
            let self = this;
            this.isFold = false;
            this.slowShowCont = setTimeout(function(){
                self.isContFold = false;
            },500);
        },
    },
    // 然后watch 监听playing 操作实际的audio 标签的播放暂停
    watch:{
        playing(newPlaying){
            let audio = this.$refs.audio;
            this.$nextTick(() => {
                newPlaying ? audio.play():audio.pause();
            })
        }
    }   
}
</script>