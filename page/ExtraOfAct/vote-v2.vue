<template>
    <v-content>
        <div class="vote-w3" v-if="showMask!=0">
            <div class="vote-main">
                <header ref="headerW">
                    <div class="bannar-w">
                        <swiper :options="swiperOption" ref="mySwiper" class="swiper-box" v-show="actDetail.Banners!==null" v-if="actDetail.Banners && actDetail.Banners!==null">
                            <swiper-slide class="swiper-item" v-for="(item, index) in actDetail.Banners">
                                <a v-if="item.Link" :href="item.Link" target="_blank"><img :src="item.Uri"> </a>
                                <a v-else href="javascript:;"><img :src="item.Uri"> </a>
                            </swiper-slide>
                            <div v-if="banners.length >=2" class="swiper-pagination"  slot="pagination"></div>
                        </swiper>
                        <div class="count-down" :class="{relative: actDetail.Banners==null}" v-if="actDetail.CutOffTimeDiff > 0" >
                            <div class="last-days">
                                <div class="span-w" v-if="str.length > 1">
                                    <span v-for="item in str">{{item}}</span>
                                </div>
                                <div class="span-w" v-else>
                                    <span>0</span>
                                    <span v-for="item in str">{{item}}</span>
                                </div>
                            </div>
                            <!--<p>倒计时</p>-->
                        </div>
                    </div>
                    <div class="announcement" v-show="actDetail.Notices!==null" v-if="actDetail.Notices!==null">
                        <span class="ico-speaker">
                            <img src="/assert/dist/images/vote-v2/xialaba1.gif">
                        </span>
                        <ul id="marqueebox" ref="box" v-show="actDetail.Notices!==null">
                            <li v-for="(item,index) in actDetail.Notices">
                                <a v-if="item.Link" :href="item.Link" target="_blank">{{item.Title}} </a>
                                <a v-else> {{item.Title}}</a>
                            </li>
                            <li v-for="(item,index) in actDetail.Notices">
                                <a v-if="item.Link" :href="item.Link" target="_blank">{{item.Title}} </a>
                                <a v-else> {{item.Title}}</a>
                            </li>
                        </ul>
                    </div>
                     <ul class="nav-bar" v-if="actDetail.ID==6">
                        <li>
                            <a href="http://cn.mikecrm.com/dF1NmL9">
                                <i class="ljh5-icons ljh5-baoming"></i>
                                <p>
                                    在线报名
                                </p>
                            </a>
                           
                        </li>
                        <li>
                            <a v-on:click="footTab(3)">
                                <i class="ljh5-icons ljh5-toupiao-paiming"></i>
                                <p>
                                    活动说明
                                </p>
                               
                            </a>
                           
                        </li>
                         <li>
                            <a href="https://m.maicai360.cn/article/96">
                                <i class="ljh5-icons ljh5-wenzhang"></i>
                                <p>
                                    白银资讯
                                </p>
                               
                            </a>
                           
                        </li>
                        <li>
                            <a href="http://mp.weixin.qq.com/s/_X0QLCa0AdQ4cIMXaOlRig">
                                <i class="ljh5-icons ljh5-wenzhang"></i>
                                <p>
                                    会议报名
                                </p>
                               
                            </a>
                           
                        </li>
                    </ul>
                     <ul class="nav-bar" v-else-if="actDetail.ID==7">
                        <li>
                            <a href="http://cn.mikecrm.com/nlrwXc9">
                                <i class="ljh5-icons ljh5-baoming"></i>
                                <p>
                                    在线报名
                                </p>
                               
                            </a>
                           
                        </li>
                        <li>
                            <a v-on:click="footTab(3)">
                                <i class="ljh5-icons ljh5-toupiao-paiming"></i>
                                <p>
                                    活动说明
                                </p>
                               
                            </a>
                           
                        </li>
                         <li>
                            <a href="https://m.maicai360.cn/article/43">
                                <i class="ljh5-icons ljh5-wenzhang"></i>
                                <p>
                                    行业资讯
                                </p>
                               
                            </a>
                           
                        </li>
                        <li>
                            <a href="https://m.maicai360.cn/mixed/Apply/5">
                                <i class="ljh5-icons ljh5-wenzhang"></i>
                                <p>
                                    会议报名
                                </p>
                               
                            </a>
                           
                        </li>
                    </ul>
                    <ul class="nav-bar" v-else>
                        <li v-for="(navBarItem, index) in navBarItems">
                            <a v-if="index != 1" :href="navBarItem.link?navBarItem.link:''">
                                <i class="ljh5-icons " :class="navBarItem.add"></i>
                                <p v-if="index == 3">
                                    {{navBarItem.title}}
                                </p>
                                <p v-else>
                                    {{navBarItem.title}}    
                                </p>
                            </a>
                            <a v-else v-on:click="footTab(3)">
                                <i class="ljh5-icons " :class="navBarItem.add"></i>
                                <p>{{navBarItem.title}}</p>
                            </a>
                        </li>
                    </ul>
                    <div class="search-w" v-if="companyDetail">
                        <div class="search-box">
                            <input type="text" class="search-ipt" v-model="searchVal" placeholder="输入您想投票的公司名称">
                            <button type="button" class="search-btn" v-on:click="toSearch()">搜索</button>
                        </div>
                    </div>
                    <div class="count" v-if="(footIndex == '1' || footIndex == '3') && companyDetail" >
                        <div class="count-box">
                            参与公司 
                            <em>{{companyDetail.total_companies}}</em>
                        </div>
                        <div class="count-box">
                            参与投票 
                            <em>{{companyDetail.total_votes}}</em>   
                        </div>
                    </div>
                </header>
                <section class="main-home" v-if="footIndex == '0'">
                    <div class="vote-total-w">
                        <div class="vote-total-pic">
                            <span>
                                <img src="/assert/dist/images/vote-v2/logo2.png">
                            </span>   
                        </div>
                        <div class="vote-total-txt">
                            <div class="vote-detail">
                                <span><i class="ljh5-icons ljh5-huodonggongsi"></i> 参与公司 </span>
                                <p>{{companyDetail.total_companies}}</p>
                            </div>
                            <div class="vote-detail">
                                <span><i class="ljh5-icons ljh5-zongtoupiaoshu"></i> 总票数 </span>
                                <p>{{companyDetail.total_votes}}</p>
                            </div>
                        </div>
                    </div>
                    <ul class="vote-list">
                        <li class="vote-list-box" v-for="(item,index) in area" :id="'item' + (index + 1)">
                            <div class="list-box-pic">
                                <a :href="'/ExtraOfAct/VoteDetail?companyId='+item.company_id+'&voteActId='+activityId">
                                    <span><img :src="item.IconUri"></span>
                                    <h3 v-html="item.company_name.trim()"></h3>
                                </a>    
                            </div>
                            <div class="list-box-detail">
                                <p>
                                    <span v-if="index < 3">
                                        <img :src= rankImg[index].url>
                                    </span>
                                    <span v-else>
                                        NO. {{index+1}}
                                    </span>
                                    <em>综合票数:{{item.votes}}</em>
                                </p>  
                                <!--<p>口碑评论 : <b>88</b></p>--> 
                                <div class="btn-wrap">
                                    <a href="javascript:;" v-if = "actDetail.CutOffTimeDiff <= 0" class="btn-vote disabled">投票</a> 
                                    <a href="javascript:;" v-else-if = "!canVote" class="btn-vote disabled">投票</a>
                                    <a href="javascript:;" v-else class="btn-vote" v-on:click="toVote(item.company_id)">投票</a>  
                                    <a :href="'/ExtraOfAct/VoteDetail?companyId='+item.company_id+'&voteActId='+activityId" class="btn-comment">评论</a>        
                                </div>
                            </div>
                        </li>     
                    </ul>
                    <div class="vote-empty" v-else>
                        <v-empty v-bind:emptycont="'暂无相关公司'"></v-empty>   
                    </div>   
                </section>
                <!--排名-->
                <section class="main-order" v-if="footIndex == '1'">
                    <div class="detail-box" v-if="companyDetail">
                        <table class="order-detail">
                            <th class="detail-item">
                                <td class="item-ranking">名次</td>
                                <td class="item-name">公司名称</td>
                                <td class="item-count">票数</td>
                            </th>
                            <tr class="detail-item" v-for="(item,index) in area">
                                <td class ="item-ranking"  v-if="index < 8">
                                    <img :src= rankImg[index].url v-if="index < 3">
                                    <img :src= rankImg[3].url v-else>
                                    <span v-if="index >= 3">{{index+1}}</span>
                                </td>
                                <td class ="item-ranking" v-else-if="index < 3">
                                    <img :src= rankImg[index].url >
                                </td>
                                <td class="item-ranking" v-else>
                                    <em>{{index+1}}</em>
                                </td>
                                <td class="item-name" v-if="index < 8">
                                    <b>{{item.company_name}}</b>  
                                </td>
                                <td class="item-name" v-else>
                                    {{item.company_name}}  
                                </td>
                                <td class="item-count">{{item.votes}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="vote-empty" v-else>
                        <v-empty v-bind:emptycont="'暂无相关排名'"></v-empty>   
                    </div>
                </section>
                <!--活动说明-->
                <section class="main-rule" v-if="footIndex == '3'">
                    <div class="rule-info detail-box" >
                        <div class="info-box" v-if="actDetail.RuleContent" v-html="actDetail.RuleContent"></div>
                        <div class="info-box vote-empty" v-else>
                            <v-empty v-bind:emptycont="'暂无相关说明'"></v-empty>
                        </div>
                    </div>
                </section>
                <!--关于我们-->
                <section class="main-about" v-if="footIndex == '2'">
                    <div class="about-info">
                        <div class="info-box" v-if="actDetail.PartnerMedia" v-html="actDetail.PartnerMedia"></div>
                        <div class="info-box vote-empty" v-else>
                            <v-empty v-bind:emptycont="'暂无相关说明'"></v-empty>
                        </div>
                               
                    </div>
                </section>
            </div>
            <footer>
                <a  class="footer-a" :class="{cur: footIndex === index,active: curflag}"  v-for="(footItem, index) in footItems" v-on:click="footTab(index)">
                    <i class="ljh5-icons " :class="footItem.add"></i>
                    <span>{{footItem.title}}</span>
                </a>
                <a class="footer-a contact-service" v-on:click="toCantact(4)" :class="{cur: curflag}">
                    <p>联系客服</p>
                </a>
            </footer>
        </div>
        <div class="empty-w" v-else>
            <v-empty v-bind:emptycont="'活动已结束'"></v-empty>   
        </div>
        <transition name="vote-fade-out">
            <div class="vote-mask-wrap" v-if="showMask == 1">
                <div class="pop-w">
                    <div class="pop">
                        <!--<img src="/assert/dist/images/pop-bg.png" class="pop-bg">
                        <img src="/assert/dist/images/join-tit.png" class="pop-tit">-->
                        <div class="pop-cnt">
                            <img src="http://p.maicai360.cn/img/get/20171031/25281636450584063881573_jpg" class="ewm"  v-if="actDetail.ID == 6"> 
                            <img src="http://p.maicai360.cn/img/get/20171124/78171636471365373251613_jpg" class="ewm"  v-else-if="actDetail.ID == 9"> 
                            <img :src="actDetail.QrCodeUri" v-else-if="actDetail.ID == 8" class="ewm">
                            <img src="/assert/dist/images/ewm.png" class="ewm" v-else>  
                            <ul class="left">
                                <li v-if="actDetail.ID == 6 ">电话：<a href="tel:13162353128">131-6235-3128</a> 旺材小编 </li>
                                <li v-else-if="actDetail.ID == 7 ">电话：<a href="tel:15801718349">158-0171-8349</a> 旺材小编 </li>
                                <li v-else-if="actDetail.ID == 8 || actDetail.ID == 9">电话：<a href="tel:17601245905">176-0124-5905</a> 旺材小编 </li>
                                <li v-else>电话：<a href="tel:18017160592">180-1716-0592</a>旺材小编</li>
                                <li v-if="actDetail.ID == 6 || actDetail.ID == 7">微信：huganqi_bianji</li>
                                <li v-else>微信：wcxb024</li>
                                <li>传真：021-62586911</li>
                                <li>官网：<a href="http://www.maicai360.cn" taregt="_blank">www.maicai360.cn</a></li>
                                <li>邮箱：<a href="mailto:allen.yao@maicai360.cn">allen.yao@maicai360.cn</a></li>
                                <li>地址：上海市普陀区中山北路2438号中瑞商务大厦7F</li>
                            </ul>
                        </div>
                    </div>
                    <i class="ljh5-icons ljh5-chacha pop-close" v-on:click="close_mask"></i>
                </div>
            </div>  
        </transition>
        <transition name="vote-fade-out">
            <div class="vote-mask-wrap" v-if="ewmShowMask == 1 && actDetail.QrCodeUri">
                <div class="pop-w pop-s">
                    <div class="pop1">
                        <img src="/assert/dist/images/vote-v2/pop-mask-bg.png" class="pop-bg">
                        <!--<img src="/assert/dist/images/join-tit.png" class="pop-tit">-->
                        <div class="pop-cnt">
                            <span class="img-w">
                                <img :src="actDetail.QrCodeUri"  v-if="actDetail.QrCodeUri" class="ewm">
                                <img src="/assert/dist/images/ewm.png" class="ewm" v-else>
                            </span>
                            <!--<img src="/assert/dist/images/ewm.png" class="ewm">-->
                            <img src="/assert/dist/images/vote-v2/vote-num.png" class="vote-num">   

                            <p v-if="actDetail.ID==6">
                             500人白银深加工行业</br>
                                <em>投票交流群</em></br>
                                等你加入
                            </p>
                            <p v-else-if="actDetail.ID==7">
                             500人冲片行业</br>
                                <em>投票交流群</em></br>
                                等你加入
                            </p>
                            <p v-else-if="actDetail.ID==8 || actDetail.ID==9">
                              500人变压器铁芯</br>
                                <em>投票交流群</em></br>
                                等你加入
                            </p>
                            <p v-else>
                                500人储能电池</br>
                                <em>投票交流群</em></br>
                                等你加入
                            </p> 
                        </div>
                    </div>
                    <i class="ljh5-icons ljh5-chacha pop-close" v-on:click="close_ewmMask"></i>
                </div>
            </div>  
        </transition> 
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/mixins.less';
.vote-w3{
    -webkit-overflow-scrolling : touch; 
    em{
        font-style: normal;
    }
    img{
        display: block;
        margin: 0 auto;
        max-width: 100%;
    }
    .ljh5-icons{
        font-size: 22px;
    }
    section{
        padding: 10px 10px 0 10px;
        min-height: 230px;
    }
    .detail-box{
        background:#fff;
        border-radius: 5px;
        border: 1px dashed #ff4040;
        border-bottom: none;
        border-bottom-right-radius:0;
        border-bottom-left-radius:0;
    }
    .box-tit{
        text-align: center;
        span{
            background: #ffe0e0;
            color: #ff3333;
            border-radius: 5px;
            padding: 5px 12px;
            font-weight: 900;
            display: inline-block;
            margin: 10px 0; 
            border: 1px dashed #ff4040;   
        }
    } 
    .vote-empty{
        background: #fff;
        .pub-empty{
            padding: 20px 10px;
            img{
                width: 50%;
            }
            p{
                line-height: 30px;
                text-align: center;
            }
        }
    }
    .vote-main{
        overflow-y: auto;
        overflow-x: hidden;
        //position: absolute;
        z-index: 1;
        top: 0;
        padding-bottom: 25px;
        left: 0;
        right: 0;
        background: #f2f2f2;
        // -webkit-overflow-scrolling: touch;
        header{
            .bannar-w{
                position: relative;
                z-index: 1;
                .swiper-box{
                    min-height: 100px;
                }
                .count-down{
                    position: absolute;
                    z-index: 3;
                    padding: 2px 3px;
                    right: 0;
                    top: 0;
                    text-align: right;
                    p{
                        color: #ff3434;
                        font-size: 14px;
                        text-align: center;
                        em{
                            color: #202020;
                            font-size: 12px;
                        }
                    }
                    .last-days{
                        padding: 2px;
                        .span-w{
                            text-align: left;
                            position: relative;
                            z-index: 1;
                            .flex();
                            align-items: center;
                            span{
                                background: #ff6f6f;
                                text-align: center;
                                line-height: 29px;
                                color: #fff;
                                border-radius: 4px;
                                font-size: 16px;
                                font-family: 'Agency FB Bold';
                                padding: 3px 6px;
                                margin: 0 3px 0 0;
                            }
                            &:before{
                                content: "";
                                font-size: 0;
                                line-height: 0;
                                display: block;
                                position: absolute;
                                top: 17px;
                                z-index: 9;
                                width: 100%; 
                                background: #fff;
                                height: 1px;  
                                left: 0;   
                            }
                            span:last-child{
                                margin-right: 0;
                            }
                        }
                        b{
                            padding: 0 0 0 4px;
                            
                        }
                    }
                }
                .relative{
                    position: relative !important;
                }
                img{
                    width: 100%;
                    max-width: 100%;
                    display: block;
                }
                .pic-car{
                    position: absolute;
                    z-index: 2;
                    right: 0;
                    bottom: -9px;
                    width: 26%;
                }
                .swiper-wrapper{
                    a{
                        display: block;
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
                    background: #ffeb66;
                }
            }
            .announcement{
                background: #fff;
                font-size: 16px;
                .flex();
                justify-content: center;
                -webkit-justify-content: center;
                align-items: center;
                -webkit-align-items: center;
                #marqueebox{
                    height:30px;
                    line-height:30px;
                    text-align: center;
                    overflow:hidden;
                    a{
                        color: #ff6f6f;
                        display: block;
                    }
                }
                .ico-speaker{
                    flex: 0 0 20px;
                    -webkit-flex: 0 0 20px;
                    img{
                        width: 70%;
                    }
                }
            }
            .nav-bar{
                display: flex;
                display: -webkit-flex;
                flex-direction: row;
                -webkit-flex-direction: row;
                justify-content:center;
                -webkit-justify-content:center;
                align-items: flex-start;
                -webkit-align-items: flex-start;
                padding: 10px 0;
                margin: 10px 0;
                background: #fff;
                color:#202020;
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
                            color: #ff4040;
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
                }
            }
            .search-w{
                padding:5px 10px;
                margin: 0 0 10px 0;
                background: #fff;
                .search-box{
                    .flex();
                    background: #fff;
                    border: 1px solid #ff4040;
                    border-radius: 5px;
                    font-size: 14px;
                    .search-ipt{
                        flex: 1 1 auto;   
                        -webkit-flex: 1 1 auto;
                        -ms-flex: 1 1 auto;
                        height: 28px;
                        border: none;
                        background:#f2f2f2;
                        color: #717171;
                        border-radius: 5px;
                        padding: 0 5px;
                    }
                    .search-btn{
                        flex: 0 0 60px;
                        -webkit-flex: 0 0 60px;
                        -ms-flex: 0 0 60px;
                        border: none;
                        color: #fff;
                        background: #ff4040;
                        border-top-right-radius:4px;
                        border-bottom-right-radius:4px;
                    }
                }
                
            }
            .count{
                .flex();
                justify-content:space-between;
                -webkit-justify-content:space-between;
                padding: 0 10px;
                margin: 10px 0 0 0;
                font-size: 14px;
                color: #f2954d;
                .count-box{
                    justify-content:center;
                    -webkit-justify-content:center;
                    align-items: center;
                    -webkit-align-items: center;
                    text-align: center;
                    em{
                        color: #ff4b4b;
                        text-align: center;
                    }
                }
            }
        }
        .main-home{
            padding: 0;
            .vote-total-w{
                .flex();
                margin: 0 0 10px 0;
                background: #fff;
                .vote-total-pic{
                    padding: 10px;
                    background: #ff3f40; 
                    width: 50%;   
                    span{
                        height: 0;
                        display: block;
                        padding: 0 0 26%;
                    }
                } 
                .vote-total-txt{
                    flex: 1 1 auto;
                    .vote-detail{
                        .flex();
                        justify-content:left;
                        -webkit-justify-content:left;
                        align-items:center;
                        -webkit-justialign-items:center;
                        padding: 6px 12px 0;
                        color: #f3954d; 
                        span{
                            font-size: 18px;
                        } 
                        p{
                            color: #ff3f40;
                            flex: 1 1 auto;
                            text-align: right;
                            font-size: 18px;
                        } 
                    }
                }   
            }
            .vote-list{
                overflow: hidden;
                padding: 10px 10px 30px 10px;
                background: #fff;
                .vote-box{
                    background: #fff;
                    margin: 0px 2% 10px 2%;
                    width: 46%;
                    height: auto;
                    float: left;
                    padding: 0 0 10px 0;
                    .vote-info{
                        .flex-column();
                        //display:block;
                        width: 100%;
                        span{
                            height: 0;
                            padding: 0 0 68% 0;
                            display:block;
                            overflow: hidden;
                            img{
                                width: 100%;
                            }
                        }
                        h3{
                            line-height: 18px;
                            color: #202020;
                            padding: 0px 8px;
                            font-size: 15px;
                            margin-top: 3px;
                            .multi-ellipsis(2);
                            height: 36px;
                            justify-content:center;
                            -webkit-justify-content:center;
                        } 
                    }
                    .vote-detail{
                        .flex();
                        justify-content:center;
                        -webkit-justify-content:center;
                        align-items:center;
                        -webkit-justialign-items:center;
                        padding: 6px 8px 0;
                        color: #ff4040;
                        .btn-vote{
                            flex: 0 0 50px;
                            -webkit-flex: 0 0 50px;
                            -ms-flex: 0 0 50px;
                            background: #ff4040;
                            text-align: center;
                            border-radius: 5px;
                            vertical-align: middle;
                            .ljh5-toupiao{
                                color:#fff; 
                            }
                        }
                        .disabled{
                            background: #ccc;
                        }
                        p{
                            flex: 1 1 auto;
                            -webkit-flex: 1 1 auto;
                            -ms-flex: 1 1 auto; 
                            text-align: right;   
                        }
                    }
                }
                .vote-box:nth-child(2n+1){
                    top: -30px;
                    position: relative;
                    z-index: 1;
                } 
                .vote-box:first-child{
                    top: 0;
                    .vote-info{
                        background: #ff4040;
                        margin: 0 0 8px 0;
                    }
                    .vote-detail{
                        color: #f2954c;
                        padding: 0 5px;
                        span{
                            font-size: 12px;
                        }
                        p{
                            color: #ff4040;
                            font-size: 16px;
                        }
                    }
                } 

                .vote-list-box{
                    .flex();
                    justify-content: center;
                    -webkit-justify-content: center;
                    align-items: center;
                    -webkit-align-items: center;
                    padding: 8px 0;
                    .list-box-pic{
                        width: 45%;
                        border: 1px solid #cacaca;
                        text-align:center;
                        a{
                            display: block;
                            span{
                                height: 0;
                                padding: 0 0 35%;
                                display: block;
                                overflow: hidden;    
                            }
                            img{
                                width: 100%;
                            }
                        }
                        h3{
                            .flex-column();
                            align-items: center;
                            -webkit-align-items: center;
                            justify-content: center;
                            -webkit-justify-content: center;
                            border-top: 1px solid #cacaca;
                            color: #ff4040;
                            font-size: 15px;
                            flex: 1 1 auto;
                        }
                    }
                    .list-box-detail{
                        margin-left: 4%;
                        flex: 1 1 auto;
                        .flex-column();
                        p{
                            font-size: 15px;
                            // padding: 2px 0;
                            margin: 0 0 15px 0;
                            span{
                                width: 28%;
                                font-size: 15px;
                                color: #ff3f40;
                                img{
                                    display: inline-block;
                                    vertical-align: middle;
                                    width: 16%;
                                }
                            }
                            em{
                                font-size: 15px;
                                color: #ff3f40;
                            }
                            b{
                                font-weight: normal;
                                color: #f0954e;
                                font-size: 15px;
                                padding: 0 2px;
                            }
                        }
                        .btn-wrap{
                            .flex();
                            a{
                                width: 48%;
                                background: #ff3f40;
                                border-radius: 5px;
                                color: #fff;
                                text-align: center;
                                &:last-child{
                                    margin: 0 0 0 4%;
                                    background: #f3954d;
                                }
                            }
                            .disabled{
                                background: #ccc;    
                            }
                        }
                    }
                } 
            }
        } 
        .main-order{
            padding: 0 0 28px 0;
            .order-detail{
                th,td{
                    color: #ff4040;
                    font-size: 14px;
                }
                width: 100%;
                background: #fff;
                border-radius: 5px;
                .detail-item{
                    .flex();
                    align-items: center;
                    -webkit-align-items: center;
                    justify-content: center;
                    -webkit-justify-content: center;  
                    text-align: center;
                    line-height: 32px;
                    border-bottom: 1px solid #ff8989;
                    padding:10px 5px;
                    .item-ranking{
                        width: 45px;
                        flex: 0 0 45px;
                        -webkit-flex: 0 0 45px;
                        position: relative;
                        z-index: 1;
                        span{
                            position: absolute;
                            width: 100%;
                            text-align: center;
                            left: 0;
                            top: -4px;
                            font-size: 12px;
                            color: #fff;
                        }
                        img{
                            width: 60%;
                            display: inline-block;
                            vertical-align: middle;
                            align-items: center;
                            -webkit-align-items: center;
                            justify-content: center;
                            -webkit-justify-content: center;
                        }
                        em{
                            border-radius: 50%;
                            background: #ff3434;
                            color: #fff;
                            font-size: 12px;
                            padding:5px 7px;;
                            font-style: normal;
                        }
                    }
                    .item-name{
                        flex: 1 1 auto;
                        -webkit-flex: 1 1 auto;
                        b{
                            font-weight: normal;
                            color: #f2954c;
                        }
                    } 
                    .item-count{
                        flex: 0 0 74px;
                        -webkit-flex: 0 0 74px;
                        overflow: hidden;
                    } 
                }
                .detail-item:last-child{
                    border-bottom: none;
                }
            }
        }
        .main-rule{
            .rule-info{
                color: #202020;
                padding: 10px 0 10px 0;
                .red{
                    color: rgb(239, 41, 41);
                }
                .mb10{
                    margin: 0 0 10px 0;
                }
                a{
                    //color: #fff;
                }
                b{
                    font-style: normal;
                    color: #ff4040;
                }
                .center{
                    text-align: center;
                    padding: 0 0 10px 0;
                }
                .info-box{
                    border-bottom: 1px dashed #ff7171;
                    margin: 0 10px;
                    p{
                        width: 100% !important;
                        a{
                            span{
                                display: inline !important;
                            }
                        }
                    }
                    img{
                        max-width: 100%;
                    }
                    .img-w{
                        padding: 5px;
                        border-radius: 5px;
                        width: 60%;
                        background-color: rgb(223, 241, 238);
                        margin: 10px auto 0;
                        .img-box{
                            border: 1px dashed rgb(74, 179, 172);
                            padding: 10px;
                            img{
                                width: 80%;
                            }
                            span{
                                display: block;
                                text-align: center;
                                margin: 8px 0 0 0;
                                color: rgb(7, 107, 115);
                            }
                        }
                    }
                    .box-cnt{
                        li{
                            margin:0 0 10px 0;
                            .flex();
                            em{
                                flex:0 0 70px;
                                -webkit-flex:0 0 70px;
                            }
                            p{
                                flex: 1 1 auto;
                                webkit-flex: 1 1 auto;
                            }
                        }
                    }
                    ol{
                        padding: 0 0 10px 0;
                        li{
                            .flex();
                            margin: 0 0 10px 0;
                            em{
                                flex:0 0 22px;
                                -webkit-flex:0 0 22px;
                            }
                            .space{
                                flex: 1 1 auto;
                                webkit-flex: 1 1 auto;
                                .img1{
                                    width: 100%;
                                    border-radius: 10px;  
                                    margin: 10px auto;  
                                }
                                .img-group{
                                    position: relative;
                                    z-index: 1;
                                    img{
                                        margin: 10px 0 0 0;
                                    }
                                    .img2{
                                        width: 60%;
                                    }
                                    .img3{
                                        width: 40%;
                                        position: absolute;
                                        bottom: 10%;
                                        left: 50%;
                                        padding: 5px;
                                        background: #fff;
                                    }
                                }
                                .img-bg{
                                    padding: 7%;
                                    background: rgb(239, 239, 239);   
                                    width: 86%;
                                    margin: 10px auto 0; 
                                }
                                .img4{
                                    width: 100%;
                                }
                            }
                        }
                        .com-list-bg{
                            background: rgba(153, 210, 200, 0.298039);
                            padding: 10px;
                            .com-list{
                                margin:10px 0 0 0;
                                padding: 0 10px;   
                            }
                        }
                    } 
                    &:last-child{
                        border-bottom: none;
                    }   
                }
            }
        }
        .main-about{
            overflow-x: hidden;
            padding: 0 0 28px 0;
            .about-info{
                background: #fff;
                .info-box {
                    margin: 0 10px;
                    padding: 10px 0 0 0;
                    dl{
                        dt{
                            img{
                                width: 50%;
                                padding: 6px;
                                border: 1px dashed #ff3434;
                            }
                        }
                        dd{
                            text-align: center;
                            line-height: 85px;
                        }
                    }
                    dl:nth-child(even){
                        margin: 28px 0 0 0;
                    }
                }
            }
        }
    }
    .vote-fade-out-enter-active, .vote-fade-out-leave-active {
        -ms-transition: all 0.5s linear;
        -moz-transition: all 0.5s linear ;
        -webkit-transition: all 0.5s linear ;
        -o-transition: all 0.5s linear ;
        transition: all 0.5s linear ;
    }
    .vote-fade-out-enter, .vote-fade-out-leave-active {
        opacity: 0;
        -ms-transform: translateY(-100%);
        -moz-transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
        -o-transform: translateY(-100%);
        transform: translateY(-100%);
    }
    footer {
        position: fixed;
        z-index: 30;
        left:0;
        bottom: 0;
        width:100%;
        height: 53px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content:center;
        -webkit-justify-content:center;
        align-items: flex-start;
        -webkit-align-items: flex-start;
        background: #f42f2f;
        color: #fff;
        .footer-a {
            flex:1 1 auto;
            -webkit-flex:1 1 auto;
            text-align: center;
            position: relative;
            color: #9a9ca7;
            padding:5px 0 0;
            .ljh5-icons {
                color: #fff;
            }
            &:before,&:after{
                content: "";
                height: 0;
                line-height: 0;
                display: block;
                position: absolute;
                top: 15px;
                z-index: 9;
                height: 25px;
            }
            &:before{
                width: 1px;
                border-left: 1px solid #cd3f26;
            }
            &:after{
                width: 2px;
                border-left: 2px solid #cc1b16;      
            }
            span {
                position: absolute;
                bottom: -18px;
                margin: auto;
                left: 0;
                right: 0;
                font-size: 13px;
                color: #fff;
            }
            &.cur,&.cur span,&.cur .ljh5-icons {
                color:#feb934;
            }
            &.active,&.active span,&.active .ljh5-icons {
                color:#fff;
            }
            p{
                line-height: 43px;
            }
        }
        .footer-a:first-child{
            &:before,&:after{
                border: none;
            }     
        }
        .contact-service:last-child{
            &.cur{
                color:#feb934;    
            }
            background:#fd3b3b;
            height: 53px;
            color: #fff;
            position: relative;
            z-index: 1;
            &:before,&:after{
                border: none;
            }
            ul{
                position: absolute;
                bottom: 60px;
                width: 88%;
                text-align: center;
                background: #fd3b3b;
                border-radius: 5px;
                left: 6%;
                li{
                    margin: 0 10px;
                    border-bottom: 1px dashed #ff7171;
                    a{
                        display: block;
                        padding: 10px 0;
                        color: #fff;
                    }
                    a:last-child{
                        &:before{
                            content: "";
                            height: 0;
                            font-size: 0;
                            line-height: 0;
                            display: block;
                            position: absolute;
                            bottom: -12px;
                            z-index: 9;
                            border-style: solid;
                            border-width: 6px;
                            left: 50%;
                            margin-left: -3px;
                            border-color: #ff3b3b transparent transparent transparent
                        }   
                    }
                }
                li:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
.vote-mask-wrap {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 30 !important;
    .flex();
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    .pop-w{
        border-radius: 5px;
        width: 88%;
        padding: 8px;
        position: relative;
        background:#fff;
        z-index: 3;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        text-align: center;
        .pop{
            .pop-bg{
                position: absolute;
                z-index: 2;
                width: 100%;
                left: 0;
                top: 0;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
            .pop-tit{
                width: 60%;
                padding: 35px 0 0 0;
                position: relative;
                z-index: 3;
            }
            .pop-cnt{
                background: #f2f2f2;
                padding: 10px;
                position: relative;
                z-index: 2;
                top: 0;
                .left{
                    text-align: left;
                }
                .ewm{
                    width: 86%;
                }
                ul{
                    margin: 5px 0 0 0;
                    li{
                        font-size: 12px;
                    }                        
                }
            }
        }
        .pop1{
            .pop-bg{
                //position: absolute;
                z-index: 2;
                width: 100%;
                left: 0;
                top: 0;
            }
            .pop-tit{
                width: 60%;
                padding: 20px 0 0 0;
                position: relative;
                z-index: 3;
            }
            .pop-cnt{
                //padding: 10px;
                z-index: 2;
                position: absolute;
                bottom: 6.5%;
                left: 0;
                width: 100%;
                text-align: center;
                p{
                    em{
                        color: #f42f2f;
                        font-style: normal;
                    }
                }
                .img-w{
                    height: 0;
                    padding: 0 0 56% 0;
                    display: block;
                    overflow: hidden;
                }
                .left{
                    text-align: left;
                }
                img{
                    display: block;
                    margin: 0 auto;
                }
                .ewm{
                    width: 56%;
                }
                .vote-num{
                    width: 40%;
                    margin: 5px auto;
                }
                ul{
                    margin: 5px 0 0 0;
                    li{
                        font-size: 12px;
                    }
                }
            }
        }

        .pop-close{
            width: 26px;
            height: 26px;
            border: 1px solid #ffffff;
            border-radius: 50%;
            margin: 10px auto;
            text-align: center;
            font-size: 20px;
            color: rgba(255, 255, 255, 0.7);
            line-height: 25px;
            position: absolute;
            bottom: -40px;
            left: 50%;
            margin-left: -13px;
        }
    }
    .pop-s{
        width: 80%;
    }
}
.empty-w{
    height: 100%;
    .pub-empty{
        .flex-column(); 
        padding: 45% 0; 
        text-align: center;
        img{
            width: 60%;
            margin: 0 auto 40px;
            display: block;
        } 
    } 
}
</style>
<script>
import API from '../../config/api.js'
import wx from 'weixin-js-sdk'
import CryptoJS from 'crypto-js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Storage from 'store'
let Key = CryptoJS.enc.Utf8.parse('1491881073751123');
let Iv = CryptoJS.enc.Utf8.parse('1491881073751123');
export default {
    data(){
        return {
            activityId: '',
            sendParam:{},                           //send传递的参数
            user: '',
            user_id:'',
            actDetail: '',
            balanceDays: '',
            banners:'',
            companyDetail: '',
            area:'',
            flag: false,                            //默认没搜到数据
            canVote:true,
            showMask: 0,                            //弹窗是否显示
            ewmShowMask: 0,
            isDisabled: true,                       //投票按钮是否禁用
            footIndex: 0,
            curflag: false,
            searchVal:'',
            //mtHeight: 0,
            // voteBoxheight: 0,
            // firstBoxHeight: 0,
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',
                slidesPerView: 1,
                paginationClickable: true,
                autoplay: 2000,
                loop: true,
                mousewheelControl: true
            },
            navBarItems:[
                {title:'在线报名',add:'ljh5-baoming',link:'http://cn.mikecrm.com/ausXVqU'},
                {title:'活动说明',add:'ljh5-toupiao-paiming'},
                {title:'相关软文',add:'ljh5-wenzhang',link:'https://m.maicai360.cn/article/128'},
                {title:'神回复',add:'ljh5-jiangbei',link:'http://mp.weixin.qq.com/s/GKuhKBErJWMiZjCm6dmcqA'}
            ],
            rankImg:[                                           
                {url:'/assert/dist/images/vote-v2/vote_ranking_1.png'},
                {url:'/assert/dist/images/vote-v2/vote_ranking_2.png'},
                {url:'/assert/dist/images/vote-v2/vote_ranking_3.png'},
                {url:'/assert/dist/images/vote-v2/vote_ranking_common.png'}
            ],
            footItems:[
                {title:'首页',add:'ljh5-toupiao-shouye'},
                {title:'排名',add:'ljh5-toupiao-paiming'},
                {title:'合作媒体',add:'ljh5-toupiaoguanyuwomen'}
            ],
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            shareData:{     //微信分享默认内容
                title: ' 每日十票，为我助力 | 中国十大白银流通品牌评选',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '帮我投票，我就嫁给你！',
                link: 'https://m.maicai360.cn'+this.$route.path+'?id='+this.$route.query.id,
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
        if(Storage.get("ljh5user")) {
            this.user =  Storage.get("ljh5user");
            this.user_id = this.user.user_id;
        }
        this.activityId = this.$route.query.id;
        if(this.$route.query.footIndex){
            this.footIndex = this.$route.query.footIndex;
            let urlFootIndex = parseInt(this.footIndex);
            this.footTab(urlFootIndex);
        }
        Storage.set('ljh5url', {preUrl: Storage.get('ljh5url') ? Storage.get('ljh5url').curUrl : "", curUrl: window.location.href});
        this.voteActivity();
        this.showPop();
        if(this.$route.query.id=='6'){
            this.shareData.title = '每日十票，为我助力 | 中国十大白银流通品牌评选';   
        }else if(this.$route.query.id=='7'){
            this.shareData.title = '每日十票，为我助力 | 中国十大最值得信赖电机冲片服务商评选'; 
        }else if(this.$route.query.id=='8'){
            this.shareData.title = '每日十票，为我助力 | 中国十大最值得信赖电力变压器铁芯供应商评选'; 
            this.navBarItems[0].link = 'http://cn.mikecrm.com/Wm2FpyP';
            this.navBarItems[2].link = 'https://m.maicai360.cn/article/4';
            this.navBarItems[3].title = '会议报名';
            this.navBarItems[3].link = 'https://m.maicai360.cn/mixed/Apply/5';
        }else if(this.$route.query.id=='9'){
            this.shareData.title = '每日十票，为我助力 | 中国十大最具影响力变压器企业评选'; 
            this.navBarItems[0].link = 'http://cn.mikecrm.com/lQ40xvL';
            this.navBarItems[2].link = 'https://m.maicai360.cn/article/4';
            this.navBarItems[3].title = '会议报名';
            this.navBarItems[3].link = 'https://m.maicai360.cn/mixed/Apply/5';
        }
        this.getConfig(this.shareData);
        //this.firstBoxHeight = this.$el.querySelectorAll('.vote-box')[0].offsetHeight;
    },
    updated() {
        
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
        //公告滚动
        startmarquee(lh,speed,delay,id){
            let t;
            let p=false;
            let o=this.$el.querySelector(id);
            o.onmouseover=function(){p=true}
            o.onmouseout=function(){p=false}
            o.scrollTop = 0;
            function start() {
                t = setInterval(scrolling,speed);
                if(!p) o.scrollTop += 2;
            }
            function scrolling(){
                if(o.scrollTop%lh!=0){
                    o.scrollTop += 2;
                    if(o.scrollTop>=o.scrollHeight/2) o.scrollTop = 0;
                }else{
                    clearInterval(t);
                    setTimeout(start,delay);
                }
            }
            setTimeout(start,delay);
        },
        //公司列表
        voteComList(){
            let that = this;
            that.sendParam = {
                user_phone:this.user.user_phone,
                activity_id:this.activityId
            };
            ws.onopen = function(evt) { 
                ws.send(JSON.stringify(that.sendParam));
            };
            ws.addEventListener("message", function(evt) {
                // 处理数据
                let data = JSON.parse(evt.data);
                if(that.activityId==data.voting_id){
                    that.companyDetail = data.company_data;
                }
                if(that.companyDetail !== null){
                    let len = that.companyDetail.areas.length;
                    let arr = [];
                    for(var i=0;i<len;i++){
                       let companies= that.companyDetail.areas[i].companies;
                       for(var j=0;j<companies.length;j++){
                            arr.push(companies[j]);
                       }
                    }
                    that.area = arr;
                    if(arr.length % 2 != 0){
                        if(that.$el.querySelector('.main-home')){
                            that.$el.querySelector('.main-home').style.paddingBottom = 30 + 'px';
                        }
                    }
                    // that.$nextTick(function(){
                    //     that.voteBoxheight = that.$el.querySelector('#item1').offsetHeight;
                    //     that.mtHeight = parseInt(that.voteBoxheight - that.firstBoxHeight);
                    //     for(var i=0;i<that.$el.querySelectorAll('.top').length;i++){
                    //         that.$el.querySelectorAll('.top')[i].style.top = -(that.mtHeight-1) + 'px';  
                    //     }
                    // });
                }
            });
        },
        //获取正在进行中的投票活动
        voteActivity(){
            this.$http.get(API.voteActivity,{params:{activity_id:this.activityId,user_id:this.user_id || 0}})
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                        this.actDetail = response.data.data;
                        this.balanceDays = Math.ceil((this.actDetail.CutOffTimeDiff)/(60*60*24));
                        this.banners = this.actDetail.Banners;
                        this.canVote = this.actDetail.CanVote;
                        this.DailyVoteCount = this.actDetail.DailyVoteCount;
                        this.str = (this.balanceDays.toString()).split('');
                        //this.startmarquee(30,20,3000,"#marqueebox");     
                }else{
                    //this.$router.go(-1);
                }
            }, (response)=>{
                console.log(response.data);
            });    
        },
        //投票
        toVote(id){
            let that = this;
            if(that.user){
                let encrypted = CryptoJS.AES.encrypt((this.user.user_phone+'_' + id + '_' + this.activityId), Key,{
                    keySize: 128 / 8,
                    iv: Iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                if(that.canVote !== false ){
                    if(that.isDisabled){
                        that.$http.post(API.getVote,{user_phone:this.user.user_phone,company_id:id,activity_id:this.activityId,cipher_text:encrypted.toString()})
                        .then((response)=>{
                            if(response.data.code && response.data.code=="200"){
                                that.show_dialog('投票成功',true,2000,false);
                                that.isDisabled = false;
                                setTimeout(function(){
                                    that.isDisabled = true;
                                },5000);
                                setTimeout(function(){
                                    that.sendParam = {
                                        user_phone:that.user.user_phone,
                                        activity_id:that.activityId
                                    };
                                    ws.send(JSON.stringify(that.sendParam));
                                },3000);
                            }else{
                                this.canVote = false;
                                that.show_dialog('很抱歉，你今天的投票次数已用完',true,2000,false); 
                            }
                        }, (response)=>{
                            console.log(response.data);
                        });
                    }else{
                        that.show_dialog('5秒过后再试哦',true,2000,false);
                    }
                }else{
                    this.canVote = false;
                    that.show_dialog('很抱歉，你今天的投票次数已用完',true,2000,false);
                }
            }else{
                //that.$router.push('/login');
                window.location.href = '/login?web_page_source=2';
            }
        },
        //搜索
        toSearch(){
            if(this.searchVal !=""){
                let reg = new RegExp(this.searchVal);
                if(this.footIndex!=0){
                    this.footIndex = 0;
                    this.$nextTick(function(){
                        for(var i=0;i<this.area.length;i++){
                            if(this.area[i].company_name.match(reg)){
                                document.body.scrollTop = this.$el.querySelector('#item'+(i+1)).offsetTop;
                                this.flag = true;
                                return false;
                            }
                        }
                    });
                }else{
                    for(var i=0;i<this.area.length;i++){
                        if(this.area[i].company_name.match(reg)){
                            document.body.scrollTop = this.$el.querySelector('#item'+(i+1)).offsetTop;
                            this.flag = true;
                            return false;
                        }
                    }
                    if(!this.flag){
                        this.show_dialog('请输入正确的公司名称',true,2000,false);  
                    }
                }
                this.flag = false;
            }else{
                this.show_dialog('请输入公司名称',true,2000,false);    
            }  
        },
        //底部导航切换
        footTab(index){
            this.footIndex = index;
            this.curflag = false;
            document.body.scrollTop = 0;
        },
        //联系客服
        toCantact(){
            this.showMask = 1;   
            this.curflag = true;
        },
        //分享记录
        recordShare() {
            this.$http.post(API.shareNotify, { article_id: this.$route.query.id, user_id: this.user_id, type: "4" })
            .then((response) => {
            }, (response) => {
                console.log(response.data);
            });
        },
        //显示弹框
        showPop(){
            sessionStorage.setItem('show',0);
            this.ewmShowMask = sessionStorage.getItem('show');
        },
        close_ewmMask() {
            this.ewmShowMask = 0;
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
        close_mask () {
            this.showMask = 0;
        }
    }    
}
</script>