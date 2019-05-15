<template>
    <v-content>
        <div class="vote-cont-w">
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
                        <!--<p>距离<em>投票结束</em>还有</p>-->
                        
                        <div class="last-days">
                            <div class="span-w" v-if="str.length > 1">
                                <span v-for="item in str">{{item}}</span>
                            </div>
                            <div class="span-w" v-else>
                                <span>0</span>
                                <span v-for="item in str">{{item}}</span>
                            </div>
                            <!--<b>天</b>-->
                        </div>
                        <p>倒计时</p>
                    </div>
                    <!--<img src="/assert/dist/images/vote_ico_car.png" class="pic-car" v-show="actDetail.Banners!==null" v-if="actDetail.Banners!==null">-->
                </div>
                <div class="announcement" v-show="actDetail.Notices!==null" v-if="actDetail.Notices!==null">
                    <span class="ico-speaker">
                         <img src="/assert/dist/images/ico-speaker.gif">
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
                <div class="count" v-if="companyDetail!==null">
                    <div class="count-box">
                        参与公司 
                        <p>{{companyDetail.total_companies}}</p>
                    </div>
                    <div class="act-vote-logo">
                        <!--<img src="/assert/dist/images/act-vote-logo.png">-->
                        <i class="ljh5-icons ljh5-LOGOtubiao"></i>
                        <i class="ljh5-icons ljh5-icon-test"></i>
                    </div>
                    <div class="count-box">
                        参与投票 
                        <p>{{companyDetail.total_votes}}</p>   
                    </div>
                </div>
            </header>
            <!--首页-->
            <section class="main-home" v-if="footIndex == '0'">
                <div class="tab-tit-w">
                    <ul class="tab-tit" :class="{'fix-top': isToFixed}">
                        <li :class="{cur: activeIndex === index}" v-for="(item, index) in area" v-on:click="tab(index)"><a href="javascript:;">{{item.area_name}}</a></li>
                    </ul>
                </div>
                <div class="tab-con" >
                    <ul v-for="(item, index1) in area" v-if="activeIndex === index1">
                        <li v-for="(item,index) in item.companies">
                            <div class="co-logo">
                                <em v-if="index < 9"></em>
                                <span v-if="index < 9">{{index+1}}</span>
                                <img :src="item.IconUri" alt="">
                            </div>
                            <div class="co-info">
                                <div class="detail">
                                    <p :class="{tag: index< 3}">{{item.company_name.trim()}}</p>
                                    <span>{{item.votes}}票</span>
                                </div>
                                <button v-if="actDetail.CutOffTimeDiff <= 0" class="disabled btn-vote">投票</button>
                                <button v-show="!canVote" v-else-if = "!canVote" class="disabled btn-vote">投票</button>
                                <button v-else class="btn-vote" v-on:click="toVote(item.company_id,index1,index)">投票</button>
                                <div class="status status-up" v-if="item.upordown == 1"></div>
                                <div class="status-level" v-if="item.upordown == 0"></div>
                                <div class=" status status-down" v-if="item.upordown == -1"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <!--排名-->
            <section class="main-order" v-if="footIndex == '1'">
                <div class="tab-tit-w">
                    <ul class="tab-tit" :class="{'fix-top': isToFixed}">
                        <li :class="{cur: secIndex === index}" v-for="(item, index) in area" v-on:click="secTab(index)"><a href="javascript:;">{{item.area_name}}</a></li>
                    </ul>
                </div>
                <div class="detail-box">
                    <table class="order-detail" v-for="(item, index) in area" v-if="secIndex === index">
                        <th class="detail-item">
                            <td class="item-ranking">名次</td>
                            <td class="item-name">公司名称</td>
                            <td class="item-count">票数</td>
                        </th>
                        <tr v-for="(item,index) in item.companies" class="detail-item">
                            <td class ="item-ranking"  v-if="index < 10 && (item.area_name == '华东' || item.area_name == '华北')">
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
                            <td class="item-name">
                                {{item.company_name.trim()}}    
                            </td>
                            <td class="item-count">{{item.votes}}</td>
                        </tr>
                    </table>
                </div>
            </section>
            <!--规则-->
            <section class="main-rule"  v-if="footIndex == '2'">
                <div class="rule-info detail-box">
                    <div class="info-box">
                        <div class="box-tit">
                            <span>活动时间</span>
                        </div>
                        <p class="center"><em>2017年6月14日—7月11日<br/>（截止时间18:00）</em></p>
                    </div>
                    <div class="info-box">
                        <div class="box-tit">
                            <span>参选对象</span>
                        </div>
                        <p class="center">中国电机行业生产企业</p>
                    </div>
                    <div class="info-box">
                        <div class="box-tit">
                            <span>活动流程</span>
                        </div>
                        <ul class="box-cnt">
                            <li>
                                <em>第一阶段：</em>
                                <p>推荐|报名参选（拟定2017年6月24日——2017年7月24日）</p>
                            </li>
                            <li><em>第二阶段：</em><p>实名投票（拟定2017年6月29日——2017年8月18日）</p></li>
                            <li><em>第三阶段：</em><p>入围名单公布（拟定2017年8月19日）</p></li>
                            <li><em>第四阶段：</em><p>颁奖典礼（拟定2017年8月25日）</p></li>
                        </ul>
                    </div>
                    <div class="info-box">
                        <div class="box-tit">
                            <span>报名方式</span>
                        </div>
                        <ol>
                            <li>
                                <em>1）</em>
                                <div class="space">
                                    <p>
                                        通过填写线上报名表单的方式进行线上报名。（扫码填写报名表）
                                    </p>
                                    <div class="img-w">
                                        <div class="img-box">
                                            <img src="/assert/dist/images/vote-rule-ewm1.png">
                                            <span>扫我报名</span>
                                        </div>
                                    </div> 
                                </div>
                            </li>  
                            <li>
                                <em>2）</em>
                                <div class="space">
                                    <p>通过<b>添加客服微信(wc_dj6)</b>进行预约报名。</p>
                                    <div class="img-w">
                                        <div class="img-box">
                                            <img src="/assert/dist/images/vote-rule-ewm2.png">
                                            <span>快扫快扫</span>
                                        </div>
                                    </div>
                                </div>
                            </li>  
                            <li>
                                <em>3）</em>
                                <div class="space">
                                    <p>通过电话进行报名。</p>
                                    <p>客服热线：<a href="tel:13162353128"><b>131-6235-3128</b></a></p>
                                </div>
                            </li>
                            <li>
                                <em>4）</em>
                                <div class="space">
                                    <p>通过发送公司信息到指定邮箱的方式进行报名。</p> 
                                    <p>邮箱：<a href="mailto:allen.yao@maicai360.cn">allen.yao@maicai360.cn</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div class="info-box">
                        <div class="box-tit">
                            <span>投票说明</span>
                        </div>
                        <ol>
                            <li>
                                <em>1）</em>
                                <div class="space">
                                    <p>本次投票将完全本着公开、公平、公正的原则，杜绝恶意刷票，软件刷票等行为，一旦发现刷票行为将对其刷票结果进行清空，情节严重的将取消参选资格。</p>
                                </div>
                            </li>
                            <li>
                                <em>2）</em>
                                <div class="space">
                                    <p>旺材有料是本次评选投票唯一渠道</p>
                                </div>
                            </li>
                            <li>
                                <em>3）</em>
                                <div class="space">
                                    <p>每个手机号每天可投十票，参选企业票数上不封顶</p>
                                </div>
                            </li>
                            <li>
                                <em>4）</em>
                                <div class="space">
                                    <p>本次线上投票，将会票选出六大赛区共计32家入围企业</p>
                                </div>
                            </li>
                            <li class="com-list-bg">
                                <div class="com-list">
                                    <p>中国电机华东市场  10家（华东市场电机采购首选品牌）</p>
                                    <p>中国电机华北市场  10家（华北市场电机采购首选品牌）</p>
                                    <p>中国电机华南市场  3家 （华南市场电机采购首选品牌）</p>
                                    <p>中国电机华中市场  3家 （华中市场电机采购首选品牌）</p>
                                    <p>中国电机东北市场  3家 （东北市场电机采购首选品牌）</p>
                                    <p>中国电机西部市场  3家 （西部市场电机采购首选品牌）</p>
                                </div>
                            </li>
                            <li>入围企业将受邀参加2017中国电机采购首选品牌的颁奖典礼。</li>
                            <li>
                                <em>5）</em>
                                <div class="space">
                                    <b>旺材新媒体保留评选活动的最终解释权</b>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div class="info-box">
                        <div class="box-tit">
                            <span>奖项设置</span>
                        </div>
                        <ol>
                            <li>
                                <em>1. </em>
                                <div class="space">
                                    <p><b>2017中国电机六大市场采购首选品牌奖杯和荣誉证书</b></p>
                                    <img src="/assert/dist/images/vote-rule-pic1.jpg" class="img1">
                                    <p class="mb10">获奖企业代表将受邀参加2017中国电机六大市场采购首选品牌颁奖典礼，授予定制奖杯及荣誉证书，并与颁奖嘉宾合影留念，这将是企业发展重要肯定及宝贵财富；</p>
                                    <p>届时将会在各大媒体同步直播整个投票及颁奖仪式，<b>并将后续在今日头条、一点资讯、搜狐新闻</b>等平台公布获奖结果。</p>
                                    <div class="img-group">
                                        <img src="/assert/dist/images/vote-rule-pic2.jpg" class="img2">
                                        <img src="/assert/dist/images/vote-rule-pic3.jpg" class="img3">
                                    </div>
                                </div>
                             </li>
                             <li>
                                <em>2. </em>
                                <div class="space">
                                    <p><b>价值1888元的2017中国无取向硅钢产业链供需交流会会议门票一张</b>（限获奖企业高管使用）。</p>
                                    <div class="img-bg">
                                        <img src="/assert/dist/images/vote-rule-pic4.jpg" class="img4">
                                    </div>
                                </div>
                             </li>
                             <li>
                                <em>3. </em>
                                <div class="space">
                                    <p><b>2017中国无取向硅钢产业链供需交流会会议现场电机展览免费展位一个。</b>（仅限各市场线上投票票数榜首企业）相关企业可以携带企业明星产品参会，并在会议现场的固定展台进行公开展览，宣传企业产品，吸引客户。</p>
                                </div>
                             </li>
                             <li>
                                <em>4. </em>
                                <div class="space">
                                    <p><b>六大市场前30强企业名单将会在《2017旺材电机产业链分布图》中进行公示。</b>《2017旺材电机产业链分布图》将会通过邮寄，参展参会、客户拜访等方式送达到原料供应、第三方及电机终端应用企业。</p>
                                    <div class="img-bg">
                                          <img src="/assert/dist/images/vote-rule-pic5.png" class="img4">
                                    </div>    
                                </div>
                             </li>
                             <li>
                                <em>5. </em>
                                <div class="space">
                                    <p><b>旺材新媒体旗下旺材电机企业专访一次。</b>相关企业报道软文将在旺材新媒体平台及电机下游（家电、新能源汽车等）平台进行发布，向行业发出最强音！</p>
                                    <div class="img-bg">
                                         <img src="/assert/dist/images/vote-rule-pic6.png" class="img4">
                                    </div>
                                </div>
                             </li>
                        </ol>
                    </div>
                    <div class="info-box">
                        <div class="box-tit">
                            <span>主办方介绍</span>
                        </div>
                        <p class="mb10"><b>旺材新媒体</b>创办于2016年7月，一经推出便受到客户的热烈追捧，并凭借在内容端及客户端的独特优势迅速跻身国内工业品一线资讯平台。目前，旺材新媒体已覆盖包括硅钢、白银、锡，小金属等十几个种类，数十个相关应用行业，并逐渐摸索出一套与之相匹配的资讯体系，形成包括旺材行情、技术干货、市场热点等深受客户喜爱的特色内容板块。</p>
                        <p class="mb10">旺材新媒体致力于服务中小型企业采购决策流程相关人员，以创新的+互联网模式服务于行业客户，形成以微信公众平台、今日头条、喜马拉雅等主流资讯分发渠道，采取社群化运营模式，,力求打造旺材工业品生态体系。旺材新媒体通过纯互联网的运作模式为客户提供了诸多类型的旺材系列服务产品，如：行业会议、产业链分布图、行业年度报告、下游企业名录等多种旺材系列产品，充分满足了客户多样化的服务需求。</p>
                    </div>
                    <div class="info-box">
                        <div class="box-tit">
                            <span>联系客服</span>
                        </div>
                        <ul>
                            <li>电话：<a href="tel:13611835465">136-1183-5464 </a>旺材小编</li>
                            <li>微信：wcxb001</li>
                            <li>传真：021-62586911</li>
                            <li>官网：<a href="http://www.maicai360.cn" taregt="_blank">www.maicai360.cn</a></li>
                            <li>邮箱：<a href="mailto:allen.yao@maicai360.cn">allen.yao@maicai360.cn</a></li>
                            <li>地址：上海市普陀区中山北路2438号中瑞商务大厦7F</li>
                        </ul>
                    </div>
                </div>
            </section>
            <footer>
                <a :class="{cur: footIndex === index,active: flag}" class="footer-a"  v-for="(item, index) in footItems" v-on:click="footTab(index)">
                    <i class="ljh5-icons " :class="item.add"></i>
                    <span>{{item.title}}</span>
                </a>
                <!--<a class="footer-a bm-link" v-if="actDetail.ActivityId !== 0" :href="'/activity/detail/' + actDetail.ActivityId + '/' + actDetail.ActivityType">
                    <p>会议咨询</p>
	            </a>-->
                <a class="footer-a bm-link" @click="subMenu" v-bind:class="{cur: flag}">
                    <p>会议咨询</p>
                    <transition name="slide-fade">
                        <ul v-if="show">
                            <li v-if="actDetail.ActivityId !== 0" ><a :href="'/activity/detail/' + actDetail.ActivityId + '/' + actDetail.ActivityType">会议报名</a></li>
                            <li><a href="javascript:;" v-on:click="newsListShow">活动报道</a></li>
                            <li><a href="javascript:;" v-on:click="aboutCntShow">关于</a></li>
                        </ul>
                    </transition>
	            </a>
            </footer>
            <transition name="vote-fade-out">
                <div class="mask-wrap" v-if="showMask == 1 && actDetail.QrCodeUri">
                    <div class="pop-w">
                        <div class="pop">
                            <img src="/assert/dist/images/pop-bg.png" class="pop-bg">
                            <img src="/assert/dist/images/join-tit.png" class="pop-tit">
                            <div class="pop-cnt">
                                <span class="img-w">
                                    <img :src=actDetail.QrCodeUri class="ewm">
                                </span>
                                <p>
                                    小编美女邀您加入评选 </br>
                                    <em>投票互动群</em></br> 
                                    快来为您的企业拉票吧
                                </p> 
                            </div>
                        </div>
                        <i class="ljh5-icons ljh5-chacha pop-close" v-on:click="close_mask"></i>
                    </div>
                </div>  
            </transition>
            <div class="mask-wrap" v-if="newsShow == 1">
                <div class="pop-w">
                    <div class="pop-news" v-if="newsCnt">
                        <div class="tit">
                            <img src="/assert/dist/images/vote-new-pic.png" class="vote-new-pic">
                            <p>
                                <span>活动报道</span>
                            </p>
                        </div>
                        <ul>
                            <li v-for="(newsItem, i) in newListArr">
                                <em><i class="ljh5-icons ljh5-meitibaodao"></i></em>
                                <a :href="newsItem.url" target="_blank">{{newsItem.title}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="pop-about" v-if="aboutCnt">
                        <div class="tit">
                            <img src="/assert/dist/images/vote-new-pic.png" class="vote-new-pic">
                            <p>
                                <span>关于</span>
                            </p>
                        </div>
                        <div class="about-cnt"> 
                            <p>“旺材新媒体”是工业品领域的知名资讯服务平台，汇聚了业内原料行情、市场热点、生产技术、知识见解、行业趋势。微信公众号“旺材电机”和“旺材压缩机”是旺材旗下的两个重要领域，专注于为电机、压缩机行业提供有价值的资讯。</p>
                            <div class="about-ewm">
                                <dl>
                                    <dt><img src="/assert/dist/images/wechatqrcode/dianji.png"></dt>
                                    <dd>旺材电机</dd>
                                </dl>
                                <dl>
                                    <dt><img src="/assert/dist/images/wechatqrcode/yasuoji.png"></dt>
                                    <dd>旺材压缩机</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <i class="ljh5-icons ljh5-chacha pop-close" v-on:click="close_newsmask"></i>
                </div>
            </div>
        </div>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
 </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/mixins.less';
.vote-cont-w{
    -webkit-overflow-scrolling : touch; 
    em{
        font-style: normal;
    }
    img{
        display: block;
        margin: 0 auto;
    }
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
                //background: #fff;
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
                        // display: inline-flex;
                        // display: -webkit-inline-box;
                        // display: -ms-inline-flexbox;
                        // height: 34px;
                        .flex();
                        //  justify-content: center;
                        // -webkit-justify-content: center;
                        align-items: center;
                        span{
                            background: #ff6f6f;
                            text-align: center;
                            line-height: 29px;
                            color: #fff;
                            border-radius: 4px;
                            font-size: 16px;
                            font-family: 'Agency FB Bold';
                            // font-weight: 600;
                            padding: 3px 6px;
                            margin: 0 3px 0 0;
                        }
                        &:before{
                            content: "";
                            height: 0;
                            font-size: 0;
                            line-height: 0;
                            display: block;
                            position: absolute;
                            top: 48px;
                            z-index: 9;
                            width: 56px;
                            //border: 1px solid #fff;       
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
            background: #fbca12;
            font-size: 16px;
            color: #ff6f6f;
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
                    color: #000;
                    display: block;
                }
            }
            .ico-speaker{
                flex: 0 0 20px;
                -webkit-flex: 0 0 20px;
                img{
                    width: 70%;
                }
                // color: #000;
                // line-height: 30px;
                // padding: 0 5px 0 0;
            }
        }
        .count{
            .flex();
            justify-content:space-between;
            -webkit-justify-content:space-between;
            justify-content:center;
            -webkit-justify-content:center;
            align-items:center;
            -webkit-justialign-items:center;
            padding:5px;
            font-size: 14px;
            color: #f2954d;
            .count-box{
                justify-content:center;
                -webkit-justify-content:center;
                align-items: center;
                -webkit-align-items: center;
                text-align: center;
                // -webkit-box-ordinal-group: 2;
                // -ms-flex-order: -1;
                // order: -1;
                // -webkit-order: -1;
                // -webkit-box-flex: -1;
                // -ms-flex: 1 1 auto;
                // flex: 1 1 auto;
                // -webkit-flex: 1 1 auto;
                // -webkit-box-align: center;
                // -ms-flex-align: center;
                // align-items: center;
                // -webkit-align-items: center;
                p{
                    color: #000;
                    font-size: 20px;
                    text-align: center;
                }
            }
            .act-vote-logo{
                align-items:center;
                -webkit-align-items:center;
                flex: 1 1 auto;
                -webkit-flex: 1 1 auto;
                text-align: center;
                .ljh5-LOGOtubiao{
                    color: #c8291d;
                    font-size: 30px;
                }
                .ljh5-icon-test{
                    color: #353535;
                    position:relative;
                    top: -1px;
                    font-size: 24px;
                }
            }
        }
    }
    .fix-top{
        position: fixed;
        top: 0;
        z-index: 5;
        width:100%;
        background: #fff;
    }
    section{
        padding: 0 0 53px 0;
        .tab-tit-w{
            height: 47px;
            .tab-tit{
                .flex();
                justify-content:center;
                border-top:1px solid #ffdede;
                border-bottom:1px solid #ffdede;
                li{
                    flex:auto;
                    -webkit-flex:auto;
                    text-align:center;
                    border-right:1px solid #ffdede;
                    padding: 10px 0;
                    display: block;
                    &.cur{
                        background: #ff4b4b;
                        a{
                            color:#fff;
                        }
                    }
                }
                li:last-child{
                    border-right: none;
                }
            }
        }
        .detail-box{
            margin:10px;
            font-size: 14px;
            color: #ffeb66;
            border-radius: 5px;
            background: #ff4b4b;
        }
    }
    .main-home{
        .tab-con{
            padding:10px; 
            ul{
                li{
                    .flex();
                    justify-content: space-between;
                    -webkit-justify-content: space-between;
                    align-items:center;
                    -webkit-align-items:center;
                    margin-bottom: 10px;
                    position: relative;
                    z-index: 3;
                    .co-logo{
                        width: 50px;
                        max-height: 75px;
                        overflow: hidden;
                        order: -1;
                        -webkit-order: -1;
                        flex: 0 0 50px;
                        -webkit-flex: 0 0 50px;
                        background: #e8e8e8;
                        align-items:stretch;
                        -webkit-align-items:stretch;
                        justify-content: center;
                        -webkit-justify-content: center;
                        img{
                            width: 100%;
                        }
                        em{
                            position: absolute;
                            z-index: 2;
                            left: 0;
                            top: 0;
                            &:before{
                                content: "";
                                height: 0;
                                font-size: 0;
                                line-height: 0;
                                display: block;
                                position: absolute;
                                top: 0;
                                z-index: 9;
                                border-style: solid;
                                border-width: 13px;
                                border-color: #ff3b3b transparent transparent #ff3b3b;
                            }
                        }
                        span{
                            position: absolute;
                            z-index: 3;
                            left: 0;
                            top: 0; 
                            width: 15px;
                            height: 15px;
                            line-height: 20px;
                            color: #fff; 
                            text-align: center;  
                        }
                    }
                    .co-info{
                        background: #ff4b4b;
                        flex: 1 1 auto;
                        -webkit-flex: 1 1 auto;
                        .flex();
                        justify-content: space-between;
                        -webkit-justify-content: space-between;
                        align-items:center;
                        -webkit-align-items:center;
                        position: relative;
                        z-index: 1;
                        .detail{
                            color: #fff;
                            padding: 0 0 0 5px;
                            -webkit-box-ordinal-group: 2;
                            -ms-flex-order: -1;
                            order: -1;
                            -webkit-order: -1;
                            -webkit-box-flex: -1;
                            -ms-flex: 1 1 auto;
                            flex: 1 1 auto;
                            -webkit-flex: 1 1 auto;
                            align-items:center;
                            -webkit-align-items:center;
                            p{
                                font-size: 14px;
                            }
                            .tag{
                                color: #e6e818;
                            }
                            span{
                                font-size: 14px;
                            } 
                        }
                        .btn-vote{
                            .btn();
                            font-size: 14px;
                            background: #feb733;
                            text-align: center;
                            color: #fff;
                            height: 26px;
                            padding: 4px;
                            overflow: hidden;
                            border-radius: 5px;
                            -ms-flex-order: 1;
                            order: 1;
                            -webkit-order: 1;
                            -webkit-box-ordinal-group: 0;
                            -webkit-box-flex: 0;
                            align-items:center;
                            -webkit-align-items:center;
                            flex: 0 0 40px;
                            -webkit-flex: 0 0 40px;
                            -ms-flex: 0 0 40px;
                        }
                        .disabled{
                            background: #ccc;
                        }
                        .status,.status-level{
                            background: #fff;
                            border-radius: 50%;
                            border: 1px solid #ffae3d;
                            width: 22px;
                            height: 22px;
                            position: relative;
                            -webkit-box-ordinal-group: 3;
                            -ms-flex-order: 2;
                            order: 2;
                            -webkit-order: 2;
                            -webkit-box-flex: 0;
                            -ms-flex: 0 0 22px;
                            flex: 0 0 22px;
                            -webkit-flex: 0 0 22px;
                            margin:0 5px 0 5px;
                            align-items:center;
                            -webkit-align-items:center;
                        }
                        .status-level {
                            &:before{
                                width: 12px;
                                height: 2px;
                                background: #f2954c;
                                content: "";
                                font-size: 0;
                                position: absolute;
                                top: 9px;
                                left: 4px;
                            }
                        }
                        .status{
                            &:before,&:after{
                                content: "";
                                height: 0;
                                font-size: 0;
                                line-height: 0;
                                position: absolute;
                                z-index: 9;
                                border-style: solid;
                            }
                            &:before{
                                left: 5px;
                                border-width: 0px 5px 5px 5px;
                                border-color: transparent transparent #e74b47 transparent;
                            }
                            &:after{
                                left: 8px;
                                height: 3px;
                                border-width: 2px;
                                border-color: #e74b47;   
                            }
                        }
                        .status-up{
                            &:before{
                                top: 4px;
                            }
                            &:after{
                                top: 9px;
                            }
                        }
                        .status-down {
                            &:before{
                                bottom: 4px;
                                left: 5px;
                                border-width: 0px 5px 5px 5px;
                                border-color: transparent transparent #35b974 transparent;  
                                transform:rotate(180deg);
                                -ms-transform:rotate(180deg); 	/* IE 9 */
                                -moz-transform:rotate(180deg); 	/* Firefox */
                                -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
                                -o-transform:rotate(180deg);  
                            }
                            &:after{
                                border-color: #35b974; 
                                bottom: 9px;  
                            }
                        }
                    }
                }
            }   
        }    
    }
    .main-order{
        .order-detail{
            th,td{
                color: #fff;
                font-size: 14px;
            }
            width: 100%;
            color: #fff;
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
                    color: #ffeb66;
                    span{
                        position: absolute;
                        width: 100%;
                        text-align: center;
                        left: 0;
                        top: -4px;
                        font-size: 12px;
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
                    color: #ffeb66;
                } 
                .item-count{
                    color: #fff;
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
            margin:0 10px 10px 10px;
            color: #fff;
            .red{
                color: rgb(239, 41, 41);
            }
            .mb10{
                margin: 0 0 10px 0;
            }
            a{
                color: #fff;
            }
            b{
                font-style: normal;
                color: #ffeb66;
            }
            .center{
                text-align: center;
                padding: 0 0 10px 0;
            }
            .info-box{
                border-bottom: 1px dashed #ff7171;
                padding: 0 10px;
                // p{
                //     text-align: center;
                //     padding: 0 0 10px 0;
                // }
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
                .box-tit{
                    text-align: center;
                    span{
                        background: #ff8080;
                        color: #ff3333;
                        border-radius: 5px;
                        padding: 5px 12px;
                        font-weight: 900;
                        display: inline-block;
                        margin: 10px 0;    
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
                                //box-shadow: rgb(204, 204, 204) 0.3em 0.3em 0.3em;   
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
                            // background: rgb(74, 179, 172);    
                        }
                    }
                } 
                &:last-child{
                    border-bottom: none;
                }   
            }
        }
    }
    footer {
        position: fixed;
        z-index: 3;
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
                font-size: 22px;
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
        .bm-link:last-child{
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
.mask-wrap {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    .flex();
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    .pop-w{
        border-radius: 5px;
        width: 80%;
        padding: 8px;
        position: relative;
        background:#fff;
        z-index: 3;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
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
                padding: 20px  15px 20px 15px;
                position: relative;
                top: -10px;
                z-index: 2;
                .img-w{
                    height: 0;
                    padding: 0 0 90% 0;
                    display: block;
                    overflow: hidden;
                    .ewm{
                        width: 90%;
                    }
                }
                p{
                    padding: 10px 0 0 0;
                    line-height: 22px;
                    text-align: center;
                    font-size: 14px;
                    em{
                        color: #ff2424;
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
        .tit{
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 7px 0 4px 0;
            .vote-new-pic{
                position: absolute;
                width: 32%;
                left: 5%;
                bottom: 5px;
                z-index: 5;
            }
            p{
                display: inline-flex;
                display: -webkit-inline-box;
                display: -ms-inline-flexbox;
                padding: 5px 7px;
                border-bottom: 2px solid #cacaca;
                span{
                    padding:5px 0;
                    border-bottom: 1px solid #cacaca;
                    color: #202020;
                    font-size: 16px;
                }
            }
        }
        .pop-news{
            background: #f2f2f2;
            ul{
                width: 100%;
                li{
                    padding: 8px 0;
                    border-bottom: 1px solid #fff;
                    position: relative;
                    z-index: 1;
                    &:before{
                        border-bottom: 1px dashed #cacaca;     
                        content: "";
                        font-size: 0;
                        position: absolute;
                        width: 100%;
                        top: -1px;
                        z-index: 9;
                    }
                    .flex();
                    em{
                        -ms-flex: 0 0 22px;
                        -webkit-flex: 0 0 22px;
                        flex: 0 0 22px;
                        text-align: center;
                        .ljh5-meitibaodao{
                            color: #999;
                            font-size: 18px;    
                        }
                    }
                    a{
                        -ms-flex: 1 1 auto;
                        flex: 1 1 auto;
                        -webkit-flex: 1 1 auto;
                        color: #4f8ce8;
                        font-size: 14px;
                    }
                }
                :first-child{
                    &:before{
                        border: none;
                    }
                }
            }
        }
        .pop-about{
            background: #ff4040;
            color: #fff;
            font-size: 14px;
            .tit{
                p{
                    border-bottom: 2px solid #fff;
                    span{
                        color: #fff;
                        border-bottom: 1px solid #fff;    
                    }
                }
            }
            .about-cnt{
                p{
                    padding:12px;
                }
                .about-ewm{
                    display: flex;
                    justify-content: space-between;
                    -webkit-justify-content: space-between;
                    -ms-justify-content: space-between;
                    -o-content: space-between;
                    text-align: center;
                    padding: 15px 12px;
                    border-top: 1px dashed #fff;
                    dl{
                        dt{
                            img{
                                width: 90%;
                            }
                        }
                        dd{
                            line-height: 30px;
                        }
                    }
                }
            }
        }
    }
    
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease-in;
}
.slide-fade-enter, .slide-fade-leave-active {
    -ms-transform: translateY(50px);
    -moz-transform: translateY(50px);
    -webkit-transform: translateY(50px);
    -o-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
}
</style>
<script>
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import API from '../../config/api.js'
import wx from 'weixin-js-sdk'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Storage from 'store'
export default {
    data(){
        return {
            show: false,
            newsShow: false,
            newsCnt: false,
            aboutCnt: false,
            flag: false,
            activeIndex: 0, 
            secIndex: 0,
            footIndex: 0,
            activityId: "",
            companyDetail: "",
            area:"",
            banners:"",
            actDetail: "",
            balanceDays: "",                        
            str: "",
            user: "",
            isToFixed: false,
            isDisabled: true,                       //投票按钮是否禁用
            showMask: 0,                            //弹窗是否显示
            canVote:true,                          //能不能投票
            DailyVoteCount:"",                      //每人每天能投的票数    
            sendParam:{},                           //send传递的参数         
            user_id:"", 
            footItems:[
                {title:'首页',add:'ljh5-toupiao-shouye'},
                {title:'排名',add:'ljh5-toupiao-paiming'},
                {title:'规则',add:'ljh5-toupiao-guize'}
            ],
            rankImg:[                                           
                {url:'/assert/dist/images/vote_ranking_1.png'},
                {url:'/assert/dist/images/vote_ranking_2.png'},
                {url:'/assert/dist/images/vote_ranking_3.png'},
                {url:'/assert/dist/images/vote_ranking_common.png'}
            ],
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',
                slidesPerView: 1,
                paginationClickable: true,
                autoplay: 2000,
                loop: true,
                autoplayDisableOnInteraction: false,
                mousewheelControl: true
            },
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            },
            shareData: {     //微信分享默认内容
                title: '投我一票,2017中国电机市场采购首选品牌评选',
                imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                desc: '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台',
                link: 'https://m.maicai360.cn' + this.$route.path,
                success(a) {
                    a.recordShare();
                }
            },
            newListArr:[
                {title:'你是否也被刷屏了？电机采购首选品牌评选，第一周周榜公布！',url:'http://mp.weixin.qq.com/s/Yz7d2ltORsCwv9aLVnyj-Q'},
                {title:'我将亲赴中国电机采购首选品牌颁奖晚会',url:'http://mp.weixin.qq.com/s/mEuTGR8EUKOhvdzCuOdX-g'},
                {title:'电机企业的福音 | 中国电机六大市场采购首选品牌评选火热进行',url:'http://mp.weixin.qq.com/s/0V9hUzvUbclE53eBzcmnIQ'},
                {title:'对不起，明天别再找我，我要去参加电机市场采购首选品牌评选',url:'http://mp.weixin.qq.com/s/JCsQTDZTD0PsutyMCpa8Hg'}
            ]
        }    
    },
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        if (this.$route.name == "VoteIndex") {
            if(Storage.get("ljh5user")) {
                this.user =  Storage.get("ljh5user");
                this.user_id = this.user.user_id;
            }
        }
        this.activityId = this.$route.params.id;
        this.voteComList();
        //this.firstComList();
        this.voteActivity();
        this.showPop();
        window.addEventListener('scroll', this.toFixedUp);
        //this.clearClickNum();
        this.getConfig(this.shareData);
        Storage.set('ljh5url', {preUrl: Storage.get('ljh5url') ? Storage.get('ljh5url').curUrl : "", curUrl: window.location.href});
        if (!!window.WebSocket && window.WebSocket.prototype.send){
            //alert('支持');
        }else{
            //alert('不支持')
        } 
    },
    methods:{
        //微信分享权限注入
        getConfig(shareobj) {
            let that = this;
            this.$http.get(API.weixinShare).then((response) => {
                let data = response.data,
                    timestamp = response.data.timestamp,
                    appId = response.data.appId,
                    nonceStr = response.data.noncestr,
                    signature = response.data.signature;
                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',      //分享到朋友圈
                        'onMenuShareAppMessage',    //分享给朋友
                        'onMenuShareQQ',            //分享到qq            
                        'onMenuShareWeibo',         //分享到腾讯微博
                        'onMenuShareQZone'          //分享到qq空间
                    ]
                });
                wx.ready(function () {
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
            }, (response) => {
                console.log(response.data)
            });
        },
        tab(index){
            this.secIndex = 0;
            this.activeIndex = index;
            this.show = false;
            this.flag = false;
        },
        secTab(index){
            this.activeIndex = 0;
            this.secIndex = index;
            this.show = false;
            this.flag = false;
        },
        footTab(index){
            this.activeIndex = 0;
            this.secIndex = 0;
            document.body.scrollTop = 0;
            this.footIndex = index;
            this.show = false;
            this.flag = false;
        },
        firstComList(){
            this.$http.post(API.firstComList,{activity_id:this.activityId})
            .then((response)=>{
                if(response.data.code && response.data.code=="200"){
                    this.companyDetail = response.data.data;
                    if(this.companyDetail !== null){
                        this.area = this.companyDetail.areas;
                    }
                }
            }, (response)=>{
                console.log(response.data);
            });    
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
                    that.area = that.companyDetail.areas;
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
                        this.startmarquee(30,20,3000,"#marqueebox");
                }else{
                    this.$router.go(-1);
                }
            }, (response)=>{
                console.log(response.data);
            });    
        },
        toVote(id,index1,index){
            let that = this;
            let pIndex = parseInt(index1);
            let sIndex = parseInt(index);
            //判断是否登录
            if(that.user){
                if(that.canVote !== false ){ //判断是否能投
                    if(that.isDisabled){
                        that.$http.post(API.getVote,{user_phone:this.user.user_phone,company_id:id,activity_id:this.activityId})
                        .then((response)=>{
                            if(response.data.code && response.data.code=="200"){
                                // let companyId = id;
                                // num = num + 1;
                                // clickDetail.num = num;
                                // companyArr.push(companyId);
                                // clickDetail.companyArr = that.unique(companyArr);
                                // Storage.set("clickDetail",clickDetail);
                                //this.voteComList();
                                // this.area[pIndex].companies[sIndex].votes++;
                                // this.companyDetail.total_votes++;
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
                window.location.href = '/login?web_page_source=1';
            }
        },
        //数组去重
        unique(arr){
            let newArr = [];
            for(let i=0, len=arr.length; i<len; i++){
            if(arr.indexOf(arr[i]) == i){
                    newArr.push(arr[i]);
                }
            }
            return newArr;
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
        //滚动到一定距离 tab选项固定到顶部
        toFixedUp(){
            let headerHeight = this.$el.querySelector('header').offsetHeight;;
            if(document.body.scrollTop > headerHeight){
                this.isToFixed = true;
            }else{
                this.isToFixed = false;
            }
        },
        //今日23点59分59秒清除num
        clearClickNum(){
            timestamp = new Date().getTime()+10;                                                       //当前时间戳
            expiretime = new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1;   //今日23点59分59秒
            if(Storage.get('expiretime')){
                expiretime = Storage.get('expiretime');
                if(parseInt(timestamp) < parseInt(expiretime)){
                    if(Storage.get("clickDetail")) {
                        num =  Storage.get("clickDetail").num;
                    } 
                }else{
                    num = 0;
                    localStorage.removeItem('clickDetail');    
                }
            }else{
                Storage.set('expiretime',expiretime);    
            }
        },
        //显示弹框
        showPop(){
            sessionStorage.setItem('show',1);
            this.showMask = sessionStorage.getItem('show');
        },
        //分享记录
        recordShare() {
            this.$http.post(API.shareNotify, { article_id: this.$route.params.id, user_id: this.user_id, type: "3" })
                .then((response) => {
                }, (response) => {
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
        subMenu() {
            this.show = !this.show;
            this.flag = true;
        },
        close_mask () {
            this.showMask = 0;
        },
        close_newsmask() {
            this.newsShow = 0;
        },
        newsListShow(){
            this.newsShow = 1;     
            this.newsCnt = true;
            this.aboutCnt = false;
        },
        aboutCntShow(){
            this.newsShow = 1;  
            this.newsCnt = false;
            this.aboutCnt = true;   
        }
    }    
}
</script>