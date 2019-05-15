<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="vote-v3" v-show="!loading" v-if="contFlag">
            <div class="vote-main">
                <header ref="headerW">
                    <div class="bannar-w">
                        <swiper :options="swiperOption" ref="mySwiper" class="swiper-box" v-show="data.Banners!==null" v-if="data.Banners && data.Banners!==[]">
                            <swiper-slide class="swiper-item" v-for="(item, index) in data.Banners">
                                <a v-if="item.Link" :href="item.Link" target="_blank"><img :src="item.Url"> </a>
                                <a v-else href="javascript:;"><img :src="item.Url"> </a>
                            </swiper-slide>
                            <div class="swiper-pagination" v-if="data.Banners.length >=2"  slot="pagination"></div>
                        </swiper>
                        <div class="count-down" :class="{relative: data.Banners==null}" v-if="ActivitiewInfo.CutOffTimeDiff > 0">
                            <div class="last-days">
                                <div class="span-w" v-if="str.length > 1">
                                    <span v-for="item in str">{{item}}</span>
                                </div>
                                <div class="span-w" v-else>
                                    <span>0</span>
                                    <span v-for="item in str">{{item}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="announcement" v-show="data.Notices!==[]">
                        <span class="ico-speaker">
                            <img src="https://p.maicai360.cn/img/get/20180209/51633636537957472124553_gif">
                        </span>
                        <ul id="marqueebox" ref="box" v-show="data.Notices!==[]">
                            <li v-for="(item,index) in data.Notices">
                                <a v-if="item.Link" :href="item.Link" target="_blank">{{item.Title}} </a>
                                <a v-else> {{item.Title}}</a>
                            </li>
                            <li v-for="(item,index) in data.Notices">
                                <a v-if="item.Link" :href="item.Link" target="_blank">{{item.Title}} </a>
                                <a v-else> {{item.Title}}</a>
                            </li>
                        </ul>
                    </div>
                    <ul class="nav-bar" v-if="data.ActivityRegedit!==null">
                        <li v-for="(item,index) in data.ActivityRegedit">
                            <a :href="item.ActivityUrl">
                                <i :class="'ljh5-icons'+ ' ' + item.iconClass"></i>
                                <p>
                                    {{item.ActivityName}}
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" v-on:click="footTab(3)">
                                <i class="ljh5-icons ljh5-shuoming"></i>
                                <p>
                                    活动说明
                                </p>
                            </a>
                        </li>
                    </ul>
                    <div class="search-w">
                        <div class="search-box">
                            <input type="text" class="search-ipt" v-model="searchVal" placeholder="输入您想投票的公司名称">
                            <button type="button" class="search-btn" v-on:click="toSearch()">搜索</button>
                        </div>
                    </div>
                </header>
                <!--首页-->
                <section class="main-home" v-if="footIndex == '0'">
                    <div class="vote-total-w">
                        <div class="vote-total-pic">
                            <span>
                                <img src="https://p.maicai360.cn/img/get/20180209/34082636537957663570774_png">
                            </span>   
                        </div>
                        <div class="vote-total-txt">
                            <div class="vote-detail">
                                <span><i class="ljh5-icons ljh5-huodonggongsi"></i>参与公司</span>
                                <p>{{data.TotalCompanyCount}}</p>
                            </div>
                            <div class="vote-detail">
                                <span><i class="ljh5-icons ljh5-zongtoupiaoshu"></i>总票数</span>
                                <p>{{data.TotalVotingCount}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="vote-list-w">
                        <ul class="vote-list-tab" v-show="data.column!==null">
                            <li v-for="(item,index) in data.column" >
                                <a href="javascript:;"  v-on:click="tab(index,item.ID)" :class="{cur: activeIndex === index}">
                                    {{item.ColumnName}}
                                </a>
                            </li>
                        </ul>
                        <ul class="vote-list" v-if="area.length > 0">
                            <li class="vote-list-box" v-for="(subItem,subIndex) in area" :id="'item' + (subIndex + 1)">
                                <div class="list-box-pic">
                                    <a :href="'/ExtraOfAct/VoteThreeDetail?companyId='+subItem.Id+'&activityId='+subItem.VotingActivityId+'&meetingid='+meetingid">
                                        <span><img :src="subItem.IconUrl"></span>
                                        <h3 v-html="subItem.CompanyName.trim()"></h3>
                                    </a>    
                                </div>
                                <div class="list-box-detail">
                                    <p>
                                        <i class="ljh5-icons ljh5-xunzhang" v-if="subIndex < 3"></i>
                                        <span v-else>
                                            NO. {{subIndex+1}}
                                        </span>
                                        <em>综合票数:{{subItem.VotingCount}}</em>
                                    </p>  
                                    <div class="btn-wrap">
                                        <a href="javascript:;" v-if = "ActivitiewInfo.CutOffTimeDiff <= 0" class="btn-vote disabled">投票</a> 
                                        <a href="javascript:;" v-else-if = "!canVote" class="btn-vote disabled">投票</a>
                                        <a href="javascript:;" v-else class="btn-vote" v-on:click="toVote(subItem.Id,subItem.VotingActivityId)">投票</a>  
                                        <a :href="'/ExtraOfAct/VoteThreeDetail?companyId='+subItem.Id+'&activityId='+subItem.VotingActivityId" class="btn-comment">评论</a>       
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="vote-empty" v-else>
                            <v-empty v-bind:emptycont="'暂无相关公司'"></v-empty>   
                        </div>
                    </div>
                </section>
                <!--排名-->
                <section class="main-order" v-if="footIndex == '1'">
                    <div class="main-order-detail" v-if="data">
                        <div class="count">
                            <div class="count-box">
                                参与公司 
                                <em>{{rankData.CompanyCount}}</em>
                            </div>
                            <div class="count-box">
                                参与投票 
                                <em>{{rankData.TotalVotingCount}}</em>   
                            </div>
                        </div>
                        <div class="detail-box">
                            <ul  class="order-tab" v-show="data.column!==null">
                                <li v-for="(item,index) in data.column" >
                                    <a href="javascript:;"  v-on:click="rankTab(index,item.ID)" :class="{cur: rankActIndex === index}">
                                        {{item.ColumnName}}
                                    </a>
                                </li>
                            </ul>
                            <table class="order-detail" v-if="rankData">
                                <th class="detail-item">
                                    <td class="item-ranking">名次</td>
                                    <td class="item-name">公司名称</td>
                                    <td class="item-count">票数</td>
                                </th>
                                <tr class="detail-item" v-for="(item,index) in rankData.CompanyInfoRank">
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
                                        <b>{{item.CompanyName}}</b>  
                                    </td>
                                    <td class="item-name" v-else>
                                        {{item.CompanyName}}  
                                    </td>
                                    <td class="item-count">{{item.VotingCount}}</td>
                                </tr>
                            </table>
                            <div class="vote-empty" v-else>
                                <v-empty v-bind:emptycont="'暂无相关排名'"></v-empty>   
                            </div>
                        </div>
                    </div>                    
                </section>
                <!--活动说明-->
                <section class="main-rule" v-if="footIndex == '3'">
                    <div class="rule-info detail-box" >
                        <div class="info-box" v-if="ActivitiewInfo.RuleContent" v-html="ActivitiewInfo.RuleContent"></div>
                        <div class="info-box vote-empty" v-else>
                            <v-empty v-bind:emptycont="'暂无相关说明'"></v-empty>
                        </div>
                    </div>
                </section>
                <!--关于我们-->
                <section class="main-about" v-if="footIndex == '2'">
                    <div class="about-info">
                        <div class="info-box" v-if="ActivitiewInfo.PartnerMedia" v-html="ActivitiewInfo.PartnerMedia"></div>
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
                    <i class="ljh5-icons ljh5-kefu"></i>
                    <span>联系客服</span>
                </a>
            </footer>
            <div class="right-nav" :class="rightMenuShow?'':'right-default'" v-if="rightNavShow && rightListData.length > 0 ">
                <a href="javascript:;" class="btn-right-nav" v-on:click="rightListShow()">
                    <i class="ljh5-icons ljh5-tiaozhuan"></i>
                </a> 
                <div class="right-list" v-if="rightMenuShow">
                    <span><img src="https://p.maicai360.cn/img/get/20180209/32436636537958066267304_png" /></span>
                    <ul>
                        <li v-for="(item, index) in rightListData"> 
                            <a :href="'/ExtraOfAct/VoteVthree?groupId='+item.ID" :class="item.ID == groupId?'cur':''">{{item.GroupName}}</a>
                        </li>
                    </ul>
                </div> 
            </div>
        </div>
        <div class="empty-w" v-else>
            <v-empty v-bind:emptycont="'暂无相关数据'"></v-empty>   
        </div>
        <transition name="vote-fade-out">
            <div class="vote-mask-wrap" v-if="ewmShowMask == 1">
                <div class="pop-w">
                    <div class="pop">
                        <div class="pop-cnt">
                            <span class="pic-w">
                                <img src="https://p.maicai360.cn/img/get/20180209/47806636537958645729618_png"> 
                            </span>
                            <ul class="left">
                                <li>电话：<a href="tel:15801718349">158-0171-8349</a> 旺材小编 </li>
                                <li>微信：huganqi_bianji</li>
                                <li>传真：021-62586911</li>
                                <li>官网：<a href="http://www.maicai360.cn" taregt="_blank">www.maicai360.cn</a></li>
                                <li>邮箱：<a href="mailto:allen.yao@maicai360.cn">allen.yao@maicai360.cn</a></li>
                                <li>地址：上海市普陀区中山北路2438号中瑞商务大厦7F</li>
                            </ul>
                        </div>
                    </div>
                    <i class="ljh5-icons ljh5-chacha pop-close" v-on:click="close_ewmMask"></i>
                </div>
            </div>  
        </transition>
        <transition name="vote-fade-out">
            <div class="vote-mask-wrap" v-if="showMask == 1 && ActivitiewInfo.QrCodeUri">
                <div class="pop-w pop-s">
                    <div class="pop1">
                        <img src="https://p.maicai360.cn/img/get/20180615/64852636646792864037294_jpg" class="pop-bg">                        
                        <div class="pop-cnt">
                            <span class="img-w">
                                <img :src="ActivitiewInfo.QrCodeUri"  v-if="ActivitiewInfo.QrCodeUri" class="ewm">
                                <img src="https://p.maicai360.cn/img/get/20180209/17854636537959792715739_png" class="ewm" v-else>
                            </span>
                            <img  src="https://p.maicai360.cn/img/get/20180209/46480636537959975335680_png" class="vote-num">   
                            <p>
                             <span>工业领域从业者的资讯聚集地</span></br>
                                <em>原材料价格查询一键分享</em></br>
                                更多场景工具等你来发现
                            </p>
                        </div>
                    </div>
                    <i class="ljh5-icons ljh5-chacha pop-close" v-on:click="close_mask"></i>
                </div>
            </div>  
        </transition> 
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/mixins.less';
.vote-v3{
    -webkit-overflow-scrolling : touch; 
    background: rgb(242, 242, 242);
    p{
        word-break: break-all;
    }
    em{
        font-style: normal;
    }
    img{
        display: block;
        max-width: 100%;
    }
    .ljh5-icons{
        font-size: 22px;
    }
    .relative{
        position: relative !important;
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
                margin: 0 auto;
            }
            p{
                line-height: 30px;
                text-align: center;
            }
        }
    }
    .vote-main{
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
                                //background: #fff;
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
                margin: 10px 0 0 0;
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
                padding:0 15px 10px 15px;
                background: #fff;
                .search-box{
                    .flex();
                    background: #fff;
                    border: 1px solid #ff4040;
                    border-radius: 8px;
                    font-size: 14px;
                    .search-ipt{
                        flex: 1 1 auto;   
                        -webkit-flex: 1 1 auto;
                        -ms-flex: 1 1 auto;
                        height: 28px;
                        border: none;
                        background:#f2f2f2;
                        color: #717171;
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                        padding: 0 5px;
                    }
                    .search-btn{
                        flex: 0 0 60px;
                        -webkit-flex: 0 0 60px;
                        -ms-flex: 0 0 60px;
                        border: none;
                        color: #fff;
                        background: #ff4040;
                        border-top-right-radius:7px;
                        border-bottom-right-radius:7px;
                    }
                }
                
            }
        }
        .main-home{
            padding: 0 0 53px 0;
            .vote-total-w{
                .flex();
                margin: 10px 0;
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
                        @media screen and (min-width:320px) and (max-width: 375px){
                            span{
                                font-size: 12px;
                                display: flex;
                            }
                            p{
                                font-size: 14px;
                            }
                        }
                    }
                }   
            }
            .vote-list-w{
                background: #fff;
                .vote-list-tab{
                    .flex();
                    align-items: center;
                    justify-content: center;
                    padding: 5px 0;
                    text-align: center;
                    border-bottom: 1px solid #f2f2f2;
                    li{
                        flex: 1 1 auto;
                        a{
                            color: #717171;
                            display: block;
                            position: relative;
                            z-index: 1;
                            &:before{
                                content: "";
                                height: 0;
                                font-size: 0;
                                line-height: 0;
                                display: block;
                                position: absolute;
                                top: 0;
                                right: 0;
                                z-index: 9;
                                width: 1px;
                                height: 70%;
                                background: #cacaca;
                                top: 15%;
                            }
                        }
                        &:last-child{
                            a{
                                &:before{
                                    background: none;
                                }
                            }
                        }
                        .cur{
                            color: #ff4040;
                            &:after{
                                content: "";
                                height: 0;
                                font-size: 0;
                                line-height: 0;
                                display: block;
                                position: absolute;
                                right: 0;
                                z-index: 9;
                                width: 50%;
                                height: 2px;
                                background: #ff4040;
                                bottom: -5px;
                                left: 25%;   
                            }    
                        }
                    }
                } 
                .vote-list{
                    overflow: hidden;
                    padding: 0 10px;
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
                                color: #2F2F2F;
                                font-size: 13px;
                                flex: 1 1 auto;
                            }
                        }
                        .list-box-detail{
                            margin-left: 4%;
                            flex: 1 1 auto;
                            .flex-column();
                            p{
                                font-size: 15px;
                                margin: 0 0 15px 0;
                                display: flex;
                                i{
                                    color: #f3954d;
                                }
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
        }
        .main-order{
            padding: 0 0 53px 0;
            .count{
                .flex();
                justify-content:space-between;
                -webkit-justify-content:space-between;
                padding: 5px 10px;
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
            .detail-box{
                margin: 0 10px;
            }
            .order-tab{
                .flex();
                align-items: center;
                justify-content: center;
                padding: 5px 0;
                text-align: center;
                border-bottom: 1px solid #f2f2f2;
                background:#fff;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                li{
                    flex: 1 1 auto;
                    a{
                        color: #717171;
                        display: block;
                        position: relative;
                        z-index: 1;
                        &:before{
                            content: "";
                            height: 0;
                            font-size: 0;
                            line-height: 0;
                            display: block;
                            position: absolute;
                            top: 0;
                            right: 0;
                            z-index: 9;
                            width: 1px;
                            height: 70%;
                            background: #cacaca;
                            top: 15%;
                        }
                    }
                    &:last-child{
                        a{
                            &:before{
                                background: none;
                            }
                        }
                    }
                    .cur{
                        color: #ff4040;
                        &:after{
                            content: "";
                            height: 0;
                            font-size: 0;
                            line-height: 0;
                            display: block;
                            position: absolute;
                            right: 0;
                            z-index: 9;
                            width: 50%;
                            height: 2px;
                            background: #ff4040;
                            bottom: -5px;
                            left: 25%;   
                        }    
                    }
                }
            } 
            .order-detail{
                th,td{
                    color: #ff4040;
                    font-size: 14px;
                }
                width: 100%;
                background: #fff;
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
                            display: block;
                            width: 20px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            margin: 0 auto;
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
            padding: 0 0 53px 0;
            .rule-info{
                color: #202020;
                padding: 10px 0 0 0;
                .red{
                    color: rgb(239, 41, 41);
                }
                .mb10{
                    margin: 0 0 10px 0;
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
                    border-radius: 5px;
                    padding: 5px;
                    background: #fff;
                    word-break: break-all;
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
            padding: 0 0 53px 0;
            overflow-x: hidden;
            .about-info{
                background: #fff;
                margin: 10px 10px 0 10px;
                border-radius: 5px;
                word-break: break-all;
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
    }
    .right-nav{
        position: fixed;
        bottom: 10%;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn-right-nav{
            width: 25px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #1FAB89;
            border-right: none;
            background: #fff;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            color: #1FAB89;
            position: relative;
            z-index: 2;
        }
        .right-list{
            position: relative;
            z-index: 1;
            right: 0;
            -webkit-align-items:center;
            -webkit-justify-content: center;
            .flex-column();
            top:0;
            bottom: 0;
            span{
                display: block;
                width: 56px;
                height: 0;
                padding: 0 0 125%;
                position: absolute;
                z-index: 2;
                top: -70px;
            }
            ul{
                width: 56px;
                text-align: center;
                border: 1px solid #1FAB89;
                border-right: none;
                border-radius: 8px;
                background:#fff;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                li{
                    a{
                        display: block;
                        padding: 5px 0;
                    }
                    .cur{
                        background: #1FAB89;
                        color: #fff;
                    }
                }
                
                li:last-child{
                    .cur{
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 7px;     
                    }
                       
                } 
                li:first-child{
                    .cur{
                        border-top-left-radius: 7px;    
                    }
                }
            }
        }
    }  
    .right-default{
        .btn-right-nav{
            right: 0;
        }
    }
}
.vote-mask-wrap{
    .pop-w{
        .pop{
            .pop-cnt{
                .pic-w{
                    display: block;
                    height: 0;
                    padding: 0 0 80%;
                    overflow: hidden;
                    width: 80%;
                    margin: 0 auto;
                    img{
                        display: block;
                        max-width: 100%;
                    }
                }
            }
        }
        .pop1 {
            .pop-cnt {
                .vote-num {
                    visibility: hidden;
                }
                .img-w{
                    padding: 0 0 50% 0;
                }
                .ewm{
                    width: 50%;
                }
                p{
                    span{
                        font-size: 16px;
                        font-weight: 900;
                    }
                }
            }
        }
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
            loading: true,
            contFlag: true,                                 //页面是否有内容
            data:'',
            groupId:'',
            user: '',
            user_id:'',
            meetingid:1,
            isDisabled: true,                               //投票按钮是否禁用
            canVote:true,                                   //是否能投票
            searchVal:'',                                   //搜索值
            footIndex: 0,                                   //底部切换索引    
            flag: false,                                    //默认没搜到数据
            curflag: false,                                 //底部高亮显示
            showMask: 0,                                    //弹窗是否显示
            ewmShowMask: 0,                                 //联系客服弹窗
            rightNavShow: true,                             //右侧固定悬浮
            rightMenuShow: true,                            //右侧固定menu
            rightListData:'',                               //右侧固定数据    
            balanceDays:'',
            str:'',   
            ActivitiewInfo:'', 
            activeIndex: 0,
            rankActIndex: 0,   
            rankData:'',                                    //排名数据 
            area:[],
            shareData:{     //微信分享默认内容
                title: '投我一票 | 中国新能源市场八大储能电池评选(每天10票)',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '中国十大诚信无取向硅钢贸易商&五大优质硅钢加工分条配套商评选',
                link: 'https://m.maicai360.cn'+this.$route.path+'?groupId='+this.$route.query.groupId
            },
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',
                slidesPerView: 1,
                paginationClickable: true,
                autoplay: 2000,
                loop: true,
                mousewheelControl: true
            },
            rankImg:[                                           
                {url:'https://p.maicai360.cn/img/get/20180209/05487636537960224412912_png'},
                {url:'https://p.maicai360.cn/img/get/20180209/63246636537960342196720_png'},
                {url:'https://p.maicai360.cn/img/get/20180209/02286636537960473910439_png'},
                {url:'https://p.maicai360.cn/img/get/20180209/83434636537960605203860_png'}
            ],
            footItems:[
                {title:'首页',add:'ljh5-shouye_'},
                {title:'排名',add:'ljh5-toupiao-paiming'},
                {title:'关于我们',add:'ljh5-toupiaoguanyuwomen'}
            ],
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
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
        if(this.$route.query.footIndex){
            this.footIndex = this.$route.query.footIndex;
            let urlFootIndex = parseInt(this.footIndex);
            this.footTab(urlFootIndex);
        }
        if(this.$route.query.groupId){
            this.groupId = this.$route.query.groupId;
        }else{
            if(this.$route.query.meetingid){
                this.meetingid =  this.$route.query.meetingid;   
            }else{
                this.groupId = 1;    
            }
            if(this.meetingid == 2){
                this.groupId = 6;
            }else{
                this.groupId = 1;
            }
        }
        if(this.$route.query.meetingid){
            this.meetingid = this.$route.query.meetingid;
            this.shareData.link = 'https://m.maicai360.cn'+this.$route.path+'?groupId='+this.groupId+'&meetingid='+this.meetingid;
        }else{
            this.meetingid = 1;    
        }
        Storage.set('ljh5url', {preUrl: Storage.get('ljh5url') ? Storage.get('ljh5url').curUrl : "", curUrl: window.location.href});
        this.showPop();   
        this.getVoteData();
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
        //获取投票数据
        getVoteData(){
            this.$http.get(API.getVoteInfo,{params:{groupid:this.groupId,userid:this.user_id || 0,meetingid:this.meetingid }})
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    this.data = response.data.data;
                    this.data.ActivityRegedit[0].iconClass = 'ljh5-baoming';
                    this.data.ActivityRegedit[1].iconClass = 'ljh5-shuoming';
                    this.data.ActivityRegedit[2].iconClass = 'ljh5-LOGOtubiao';
                    this.rightListData = this.data.group;
                    this.area = this.data.CompaniesInfo;
                    this.ActivitiewInfo = this.data.ActivitiewInfo;
                    this.balanceDays = Math.ceil((this.ActivitiewInfo.CutOffTimeDiff)/(60*60*24));
                    this.str = (this.balanceDays.toString()).split('');
                    this.canVote = this.ActivitiewInfo.CanVote;
                    if(this.$route.query.footIndex == 1){
                        if(this.data.column.length > 0){
                            this.rankTab(0,this.data.column[0].ID); 
                        }
                    }
                    if(this.data.ActivitiewInfo.Name){
                        this.shareData.title = '投我一票 | '+ this.data.ActivitiewInfo.Name;
                        if(this.meetingid == 1){
                            this.shareData.desc = '我的未来 由你决定，每日每人10票，请为我投票';
                        }else if(this.meetingid == 2){
                            this.groupId = 6;
                            this.shareData.desc = this.data.ActivitiewInfo.Name;
                        }
                    }
                    this.getConfig(this.shareData);
                    this.startmarquee(30,20,3000,"#marqueebox");
                }else{
                    this.contFlag = false;
                }
                this.loading = false;
            }, (response)=>{
                this.loading = false;
            });        
        },
        //活动切换
        tab(index,id){
            this.area = [];
            this.activeIndex = index;
            this.$http.get(API.getVoteActvity,{params:{columnid:id}})
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    this.area = response.data.data;
                }else{
                    this.area = '';
                    //this.show_dialog(response.data.msg,true,2000,false);    
                }
            }, (response)=>{
                this.show_dialog(response.data.msg,true,2000,false);
            });
        },
        //排名切换
        rankTab(index,id){
            this.searchVal = '';
            this.rankActIndex = index;
            this.$http.get(API.getVoteRankDefault,{params:{columnid:id}})
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    this.rankData = response.data.data;
                }else{
                    this.rankData = '';
                    //this.show_dialog(response.data.msg,true,2000,false);
                }
            }, (response)=>{
                this.show_dialog(response.data.msg,true,2000,false);
            });
        },
        //投票
        toVote(comId,actId){
            let that = this;
            if(that.user){
                let encrypted = CryptoJS.AES.encrypt((this.user.user_phone+'_' + comId + '_' + actId), Key,{
                    keySize: 128 / 8,
                    iv: Iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                if(that.canVote !== false ){
                    if(that.isDisabled){
                        that.$http.post(API.getToVote,{user_phone:this.user.user_phone,company_id:comId,activity_id:actId,cipher_text:encrypted.toString()})
                        .then((response)=>{
                            if(response.data.code && response.data.code=="200"){
                                that.show_dialog('投票成功,请刷新后查看',true,2000,false);
                                that.isDisabled = false;
                                setTimeout(function(){
                                    that.isDisabled = true;
                                },5000);
                                //window.location.reload();
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
                window.location.href = '/login?web_page_source=2';
            }
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
        //搜索
        toSearch(){
            if(this.searchVal !=""){
                let reg = new RegExp(this.searchVal);
                if(this.footIndex!=0){
                    this.footIndex = 0;
                    this.$nextTick(function(){
                        for(var i=0;i<this.area.length;i++){
                            if(this.area[i].CompanyName.match(reg)){
                                document.body.scrollTop = this.$el.querySelector('#item'+(i+1)).offsetTop;
                                this.flag = true;
                                return false;
                            }
                        }
                        if(!this.flag){
                            this.show_dialog('请输入正确的公司名称',true,2000,false);  
                        }
                    });
                }else{
                    for(var i=0;i<this.area.length;i++){
                        if(this.area[i].CompanyName.match(reg)){
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
            if(index == 0){
                this.rightNavShow = true;
            }else if(index == 1){
                if(!this.$route.query.footIndex){
                    if(this.data.column.length > 0){
                        this.rankTab(0,this.data.column[0].ID); 
                    } 
                }
                this.rightNavShow = false;
            }else {
                this.rightNavShow = false;
            }
        },
        //联系客服
        toCantact(){
            this.ewmShowMask = 1;   
            this.curflag = true;
        },
        //显示弹框
        showPop(){
            sessionStorage.setItem('show',1);
            this.showMask = sessionStorage.getItem('show');
        },
        //关闭弹框
        close_ewmMask() {
            this.ewmShowMask = 0;
            this.curflag = false;
        },
        close_mask(){
            this.showMask = 0;
        },
        //右侧固定悬浮
        rightListShow(){
            if(this.rightMenuShow){
                this.rightMenuShow = false;
            }else{
                this.rightMenuShow = true;     
            }
        },
        //dialog 展示
        show_dialog (cont,isauto,life,isclosebtn) {
            this.dialog.dialogShow = true;
            this.dialog.dialogCont = cont;
            this.dialog.dialogIsauto = isauto;
            this.dialog.dialogLife = life;
            this.dialog.dialogIsclosebtn = isclosebtn;
        },
        //dialog 关闭
        close_dialog () {
            this.dialog.dialogShow = false;
            this.dialog.dialogCont = "";
            this.dialog.dialogLife = 3000;
        }   
    }    
}
</script>