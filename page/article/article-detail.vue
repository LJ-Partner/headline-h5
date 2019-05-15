<template>
    <v-content>
        <v-header>
            <transition name="articledetail-slide-fade-up">
            <v-toptab v-show="isShownav"></v-toptab>
            </transition>
        </v-header>
        <v-loading v-bind:isloading="loading"></v-loading>
        <v-main class="main-article articleDetail-wrap" id="mainWrap" :class="{'hide-nav':!isShownav , 'openAppBar':openAppBar,'notouch over': notouch}" @articlecont-height="showPart"><!-- :class="{'hide-nav':!isShownav}"-->
            <div id="articleMain"><!-- v-if="!loading"-->
                <article class="article-detail empty-main-wrap" v-if="!detail || detail.content ==''">
                    <v-empty v-bind:emptycont="'相关内容已不存在'"></v-empty>
                </article>
                <article class="article-detail" id="articleDetail" v-else>
                    <p>{{text}}</p>
                    <h1>{{detail.title}}</h1>
                    <p class="article-info">
                        <a :href="'/article/author/' + detail.author_id" class="attach-label label-author">{{detail.author_name}}</a>
                        <label class="attach-label hide">{{detail.read_count}}人读过</label>
                        <label class="attach-label">{{detail.releasetime}}</label>
                        <span class="btn-attention" :class="{off:attentionAuthor.isAttention == '1'}" v-on:click="toAttention">{{attentionAuthor.txt}}</span>
                    </p>
                    <!--<img :src="detail.coverurl" v-if="detail.coverurl && detail.coverurl!=''" />-->
                    <div id="articleCont" class="article-cont" v-html="detail.content" :class="{'fold': isContFold}"></div>
                    <!--<router-link class="show-full" :to="{name: 'login', query: {from: locationLink}}" v-if="isFold"><span>查看全部</span></router-link>-->
                    <transition name="articledetail-fade-out">
                        <div class="show-full" v-on:click="showFull" v-if="isFold"><span><i></i>点击展开全文</span></div>
                    </transition>
                    <div class="showpart-space" v-if="showpartSpace"></div>

                    <div class="article-tags" v-if="!loading">
                        <a v-for="tag in detail.tags" :href="'/article/tags/'+tag[0]">{{tag[1]}}</a>
                    </div>
                    <!-- <div class="article-supplement" v-if="!loading">
                        声明：此文章版权归本文作者所有，未经许可不得转载或商用
                    </div> -->
                    <div class="article-supplement" v-if="detail.copyright_notice">
                        {{detail.copyright_notice}}
                    </div>
                    <div class="article-share" v-if="!loading">
                        <span class="article-share-item " :class="{'selected': detail.isLiked == '1'}" v-on:click="articlelike(detail.id,'like')">
                            <i class="ljh5-icons ljh5-dianzan" :class="{'ljh5-dianzan2': detail.isLiked == '1'}"></i>
                            <em>{{detail.like_count}}</em>
                        </span>
                        <span class="article-share-item dislike " :class="{'selected': detail.isDisLiked == '1'}" v-on:click="articlelike(detail.id,'unlike')">
                            <i class="ljh5-icons ljh5-buxihuan" :class="{'ljh5-buxihuan2': detail.isDisLiked == '1'}"></i>
                            <em>{{detail.dislike_count}}</em>
                        </span>
                        <span class="article-share-item " :class="{selected: detail.isCollectioned == '1'}" v-on:click="articleCollect(detail.id)">
                            <i class="ljh5-icons ljh5-shoucang" :class="{'ljh5-shoucang1': detail.isCollectioned == '1'}"></i>
                            <em>{{detail.collectionText}}</em>
                        </span>

                    </div>
                </article>
                <aside class="article-enjoy" v-if="!loading && detail.attentions && detail.attentions.length > 0">
                    <p class="sect-title">猜您感兴趣的</p>
                    <div class="article-item" v-for="item in detail.attentions">
                        <figure class="article layout2">
                            <div class="panel">
                                <a :href="'/article/detail/'+ item[0] +'/'+ type">
                                    <h3>{{item[1]}}</h3>
                                </a>
                                <p>
                                    <label class="label" :class="'mark' + item[3]" v-if="item[3] && item[3] != '' && item[3] != '0'"></label>
                                    <label class="attach-label author">{{item[2]}}</label>
                                    <label class="attach-label">{{item[7].split(' ')[0].replace(/\//g,'-')}}</label>
                                </p>
                            </div>
                            <div class="show" v-if="item[5]=='1' && item[6] && item[6] != ''">
                                <a :href="'/article/detail/'+item[0]+'/'+ type "><img :src="item[6]" /></a>
                            </div>
                        </figure>
                    </div>
                </aside>
                <aside id="articleComment" class="article-comment" v-if="!loading && detail.comment_list && detail.comment_list.length > 0">
                    <p class="sect-title">热门评论({{detail.commment_count}})</p>
                    <transition-group name="outin-comment" tag="div">
                        <dl v-for="item in detail.comment_list" :key="item">
                            <dd><img class="commenter-icon " :src="'/Api/V1/User/Avatar/'+item.user_id" /></dd>
                            <dt>
                                <p class="commenter-name">
                                    {{item.nickname}}
                                    <span class="handle-reply" v-on:click="showReplyIpt(item.id,0,0,null,item.user_id,item.nickname,item.content)"><i class="ljh5-icons ljh5-comments"></i>回复</span>
                                    <span class="handle-praise" v-on:click="CommmentLike(item.id,item.user_id)"><i class="ljh5-icons ljh5-dianzan"></i><em>{{item.likecount}}</em></span>
                                </p>
                                <p class="commenter-content">{{item.content}}</p>
                                <p class="comment-info">
                                    <label>{{item.time.replace(/\//g,'-')}}</label>
                                    <span class="del-commt" @click="confirm_delComment(item.id,item.user_id,item.replays.length)" v-if="user && user.user_id == item.user_id">删除</span>
                                </p>
                                <div class="reply-wrap" v-if="item.replays && item.replays.length > 0">
                                    <dl v-for="subitem in item.replays">
                                        <dt>
                                            <p class="commenter-name">
                                                {{subitem.rpl_user_nickname}} <span v-if="subitem.be_rpl_user_id != 0 && subitem.be_rpl_user_id != subitem.rpl_user_id && subitem.be_rpl_user_nickname && subitem.be_rpl_user_nickname != null && subitem.be_rpl_user_nickname != ''">@{{subitem.be_rpl_user_nickname}}</span>
                                            </p>
                                            <p class="commenter-content">{{subitem.rpl_content}}</p>
                                            <p class="comment-info">
                                                <label>{{subitem.rpl_time.replace(/\//g,'-')}}</label>
                                                <span class="handle-reply" v-on:click="showReplyIpt(item.id,subitem.rpl_id,subitem.rpl_user_id,subitem.rpl_user_nickname,subitem.rpl_user_id,subitem.rpl_user_nickname,subitem.rpl_content)"><i class="ljh5-icons ljh5-comments"></i>回复</span>
                                                <!--<span class="del-commt" @click="confirm_delComment(subitem.rpl_id,subitem.rpl_user_id)" v-if="user && user.user_id == item.user_id">删除</span>-->
                                            </p>
                                        </dt>
                                    </dl>
                                </div>
                            </dt>
                            <!--<div class="reply-ipt-panel" v-if="item.id == comment_reply.rootid && comment_reply.isShowIpt">
                                <input type="text" placeholder="文明社会，理性评论" v-model="comment_reply.cont" />
                                <span class="btn-sub-reply" @click="subReply">提交</span>
                            </div>-->
                        </dl>
                    </transition-group>
                </aside>
                <aside id="articleComment" class="article-comment" v-else>
                    <p class="sect-title">热门评论({{detail.commment_count}})</p>
                    <div class="no-comment">
                        <img src="/assert/dist/images/sofa.png" />
                        <p>来了？请您坐沙发</p>
                    </div>
                </aside>

                <transition name="articledetail-slide-fade">
                    <div class="go-act" v-if="goact" v-on:click="closeAct">
                        <a :href="'/activity/detail/' + detail.activity_id + '/' + detail.activity_type"><img src="/assert/dist/images/btn_actdetail.png" /></a>
                        <i class="ljh5-icons ljh5-chacha close"></i>
                    </div>
                </transition>
            </div>
        </v-main>


        <div class="article-bottom-fixed">
            <div class="open-app-fixed-bar" v-if="openAppBar">
                <a href="javascript:;" class="bar-detail">
                    <div class="bar-detail-logo">
                        <img src="https://p.maicai360.cn/img/get/20180417/24067636595564069687567_png" />
                        <div class="banner-label">
                            <p>旺材有料</p> 
                            <!-- <p class="title-sub">因为关注，所以专业</p>  -->
                        </div>
                    </div>
                    <a href="http://app.51wctt.com/" class="open">
                        立即打开    
                    </a>
                </a>
                <a href="javascript:;" v-on:click="openApp()">
                    <i class="ljh5-icons ljh5-cuowu"></i>
                </a>
            </div>
            <section class="article-input-comment">
                <div class="input-comment" @click="showComment">
                    <!--<input type="text" v-model="user_comment" placeholder="快来参与讨论吧~~" id="commentIpt" v-on:focus="showInput">-->
                    您的评论对我们很重要
                    <i class="ljh5-icons ljh5-pencil"></i>
                </div>
                <div class="comment-handler">
                    <span class="handle comment-count" @click="toCommentList">
                        <i class="ljh5-icons ljh5-xiaoxi"></i>
                        <em v-if="parseInt(detail.commment_count) > 0">{{detail.commment_count}}</em>
                    </span>
                    <span class="handle collect" :class="{selected: detail.isCollectioned == '1'}" v-on:click="articleCollect(detail.id)">
                        <i class="ljh5-icons ljh5-shoucang" :class="{'ljh5-shoucang1': detail.isCollectioned == '1'}"></i>
                    </span>
                </div>
                <!--<div class="input-confirm">
                    <button type="button" class="btn" v-on:click="articleCommment(user.user_id,detail.id)">发表</button>
                </div>-->
            </section>
        </div>
        <transition name="articledetail-slide-fade">
            <a href="javascript:void(0);" class="gotop" v-if="gotop" v-on:click="goTop"></a>
        </transition>

        <transition name="comment-fade-out">
        <div class="layout-comment-add" v-show="isShowComment" v-if="user">
            <div class="comment-add">
                <p class="comment-add-title">您的评论对我们很重要：</p>
                <textarea v-model="user_comment" placeholder="快来参与讨论吧~~" id="commentAddIpt"></textarea>
                <div class="comment-handler">
                    <button type="button" class="btn-sub" v-on:click="articleCommment(user.user_id,detail.id)">发表评论</button>
                </div>
            </div>
            <span class="close" @click="hideComment"></span>
        </div>
        </transition>

        <transition name="comment-fade-out">
        <div class="layout-comment-add" v-if="comment_reply.isShowIpt">
            <div class="comment-add">
                <div class="comment-add-quote">回复 <span class="author">{{comment_reply.be_nickname}}</span>： {{comment_reply.be_cont}}</div>
                <textarea v-model="comment_reply.cont" placeholder="文明社会，理性发言"></textarea>
                <div class="comment-handler">
                    <button type="button" class="btn-sub" @click="subReply">提交</button>
                </div>
            </div>
            <span class="close" @click="hideReply"></span>
        </div>
        </transition>

        <v-zoom v-bind:is-show-zoom="zoom.isShowZoom" v-bind:zoom-img="zoom.zoomImg" v-bind:is-tool="zoom.isTool" v-bind:zoom-imgs="zoom.zoomImgs" ref="zoom" v-on:clear-zoom="clearZoom"></v-zoom>

        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
        <v-dialogconfirm v-if="dialogConfirm.show" v-bind:isshow="dialogConfirm.show" v-bind:dialogcont="dialogConfirm.cont" :btnconfirm="delComment" :btncancel="cancel_confirm"></v-dialogconfirm>
    </v-content>
</template>
<style lang="less">
    @import '../../libs/static/less/validation.less';
    @import '../../libs/static/less/mixins.less';
    .articledetail-slide-fade-up-enter-active {
        -ms-transition: all .3s ease;
        -moz-transition: all .3s ease;
        -webkit-transition: all .3s ease;
        -o-transition: all .3s ease;
        transition: all .3s ease;
    }
    
    .articledetail-slide-fade-up-leave-active {
        -ms-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -moz-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -webkit-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -o-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    }
    
    .articledetail-slide-fade-up-enter,
    .articledetail-slide-fade-up-leave-active {
        opacity: 0;
        -ms-transform: translateY(-20px);
        -moz-transform: translateY(-20px);
        -webkit-transform: translateY(-20px);
        -o-transform: translateY(-20px);
        transform: translateY(-20px);
    }
    
    .main.main-article {
        //top: 81px;
        -ms-transition: all .3s ease;
        -moz-transition: all .3s ease;
        -webkit-transition: all .3s ease;
        -o-transition: all .3s ease;
        transition: all .3s ease;
        &.hide-nav {
            //top: 47px;
            -ms-transition: all .3s ease;
            -moz-transition: all .3s ease;
            -webkit-transition: all .3s ease;
            -o-transition: all .3s ease;
            transition: all .3s ease;
        }
        &.articleDetail-wrap {
            top: 0;
            padding: 81px 0 20px;
        }
    }
    .openAppBar{
        bottom: 110px;
    }
    .article-detail {
        padding: 10px 0 0;
        h1 {
            .detail-title();
            font-weight: bold;
            padding: 5px 10px;
        }
        img {
            width: 100%;
            display: block;
        }
        .label {
            .border-radius(10px);
            padding: 0px 3px;
            display: inline-block;
            margin-right: 5px;
            &.stick {
                color: @color-red;
                border: 1px solid @color-red;
                &:after {
                    content: "置顶";
                }
            }
            &.origin {
                color: #ff8a00;
                border: 1px solid #ff8a00;
                &:after {
                    content: "原创";
                }
            }
            &.advertisement {
                color: #2ea9df;
                border: 1px solid #2ea9df;
                &:after {
                    content: "广告";
                }
            }
        }
        .attach-label {
            .detail-subinfo();
            display: inline-block;
            margin-right: 5px;
        }
        .article-info {
            .detail-subinfo();
            padding: 3px 10px 10px;
            position: relative;
            .label-author {
                color: #2ea9df;
            }
            .hide {
                display: none;
            }
            .btn-attention {
                display: inline-block;
                position: absolute;
                right: 10px;
                top: 0;
                background: @color-blue;
                border: 1px solid @color-blue;
                .border-radius(5px);
                padding: 1px 8px;
                font-size: 14px;
                color: @color-white;
                line-height: 20px;
                &.off {
                    background: transparent;
                    border-color: #d6d7de;
                    color: @color-gray-9;
                }
            }
        }
        .article-cont {
            max-width: 100%;
            overflow: hidden;
            .detail-content();
            padding: 0 10px;
            margin: 15px auto;
            iframe {
                height: auto !important;
            }
            * {
                
                margin: 0;
                max-width: 100%;
                word-break: break-all;
                word-wrap: break-word;
            }
            p {
                padding-bottom: 5px;
            }
            &.fold {
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
            border-top: 1px solid @border-color;
            margin: 20px auto 10px;
            span {
                display: inline-block;
                text-align: center;
                font-size: 15px;
                color: @color-blue;
                line-height: 30px;
                background: @color-white;
                padding: 0 20px;
                position: relative;
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
        .article-tags {
            padding: 0 10px;
            a {
                font-size: 14px;
                color: #49494a;
                line-height: 24px;
                .border-radius(6px);
                background: #f0f1f7;
                padding: 1px 10px;
                display: inline-block;
                margin: 6px 10px 0 0;
                &:visited,
                &:hover,
                &:active {
                    color: #49494a;
                }
            }
        }
        .article-supplement {
            .detail-lightest();
            padding: 0 10px;
            margin: 15px auto;
        }
        .article-share {
            padding: 10px;
            margin-bottom: 10px;
            .flex();
            justify-content: space-between;
            -webkit-justify-content: space-between;
            .article-share-item {
                text-align: center;
                flex: 1 1 auto;
                -webkit-flex: 1 1 auto;
                border: 1px solid @border-color;
                .border-radius(20px);
                width: 30%;
                padding: 0;
                margin: 0 10px;
                i {
                    padding: 0 4px 0 0;
                    font-size: 17px;
                    color: @subinfo-color;
                    line-height: 30px;
                    display: inline-block;
                }
                em {
                    font-style: normal;
                    display: inline-block;
                    font-size: 14px;
                    color: @subinfo-color;
                    line-height: 30px;
                    position: relative;
                }
                &.selected {
                    border-color: @color-red;
                    i,
                    em {
                        color: @color-red;
                    }
                    &.dislike {
                        border-color: @color-gray-6;
                        i,
                        em {
                            color: @color-gray-6;
                        }
                    }
                }
                &:first-child,
                &:last-child {
                    margin: 0;
                }
            }
        }
        &.empty-main-wrap {
            .flex-column();
            justify-content: flex-start;
            -webkit-justify-content: flex-start;
            .pub-empty {
                width: 100%;
                //height: 100%;
                background: @color-white;
                text-align: center;
                flex: 1 1 auto;
                -webkit-flex: 1 1 auto;
                align-self: center;
                .flex-column();
                img {
                    width: 60%;
                    margin: 0 auto 40px;
                    display: block;
                }
                p {
                    text-align: center;
                    font-size: 20px;
                    color: @subinfo-color;
                    line-height: 34px;
                    padding-bottom: 100px;
                }
            }
        }
    }
    
    .article-enjoy {
        padding: 15px 10px 0;
        border-top: 6px solid @bg-color;
        .sect-title {
            font-size: 16px;
            padding-left: 10px;
            margin-bottom: 8px;
            border-left: 4px solid @color-red;
            line-height: 16px;
            color: #90929a;
        }
    }
    
    .article-comment {
        padding: 20px 10px 0px;
        margin-top: 10px;
        border-top: 6px solid @bg-color;
        .sect-title {
            font-size: 16px;
            padding-left: 10px;
            border-left: 4px solid @color-red;
            line-height: 16px;
            color: #90929a;
            margin-bottom: 5px;
        }
        .no-comment {
            padding-top: 10px;
            color: #90929a;
            text-align: center;
            img {
                width: 45%;
                max-width: 130px;
                display: block;
                margin: 20px auto 10px;
            }
            p {
                text-align: center;
                font-size: 18px;
                color: #90929a;
                line-height: 30px;
                width: 100%;
            }
        }
        dl {
            display: block;
            width: 100%;
            overflow: hidden;
            padding: 10px 0 8px;
            border-bottom: 1px solid #f0f1f7;
            -webkit-transition: all 0.5s;
            -moz-transition: all 0.5s;
            -ms-transition: all 0.5s;
            -o-transition: all 0.5s;
            transition: all 0.5s;
            dd {
                display: block;
                width: 12%;
                float: left;
                text-align: left;
                .commenter-icon {
                    .border-radius(50%);
                    width: 95%;
                    display: block;
                    margin-top: 4px;
                }
            }
            dt {
                display: block;
                vertical-align: top;
                padding: 0 0 0 10px;
                width: 88%;
                float: right;
                .commenter-name {
                    color: #2ea9df;
                    font-size: 14px;
                    line-height: 22px;
                    padding-bottom: 2px;
                    .handle-praise {
                        display: inline-block;
                        float: right;
                        font-size: 14px;
                        color: #90929a;
                        margin-left: 15px;
                        em {
                            font-style: normal;
                            font-size: 16px;
                            display: inline-block;
                            margin-left: 3px;
                        }
                    }
                    .handle-reply {
                        display: inline-block;
                        float: right;
                        font-size: 14px;
                        color: #90929a;
                        margin-left: 15px;
                        .ljh5-icons {
                            display: inline-block;
                            margin-right: 3px;
                            position: relative;
                            top: 1px;
                        }
                        em {
                            font-style: normal;
                            font-size: 16px;
                            display: inline-block;
                            margin-left: 3px;
                        }
                    }
                }
                .commenter-content {
                    font-size: 14px;
                    color: #46484c;
                    line-height: 24px;
                    padding-bottom: 1px;
                    word-break: break-all;
                    word-wrap: break-word;
                }
                .comment-info {
                    display: block;
                    overflow: hidden;
                    label {
                        font-size: 12px;
                        color: #90929a;
                        display: inline-block;
                        margin-right: 10px;
                    }
                    .del-commt {
                        float: right;
                        text-align: right;
                        color: @subinfo-color;
                    }
                    .handle-reply {
                        display: inline-block;
                        float: right;
                        font-size: 14px;
                        color: #90929a;
                        margin-left: 15px;
                        .ljh5-icons {
                            display: inline-block;
                            margin-right: 3px;
                            position: relative;
                            top: 1px;
                        }
                        em {
                            font-style: normal;
                            font-size: 16px;
                            display: inline-block;
                            margin-left: 3px;
                        }
                    }
                }
                .reply-wrap {
                    background: #fafafa;
                    border: 1px solid @color-gray-e;
                    .border-radius(3px);
                    padding: 0 10px;
                    margin-top: 5px;
                }
                dl {
                    border-bottom: 1px dashed @color-gray-e;
                    padding: 5px 0;
                    dt {
                        width: 100%;
                        padding: 0;
                        .commenter-name {
                            line-height: 20px;
                            padding-bottom: 0;
                        }
                        .commenter-content {
                            line-height: 22px;
                            padding-bottom: 0;
                        }
                        .comment-info {
                            .handle-reply {
                                float: none;
                            }
                        }
                    }
                }
            }
            .reply-ipt-panel {
                width: 100%;
                .flex();
                //background: #fafafa;
                padding: 10px 0;
                input {
                    flex: 1 1 auto;
                    -webkit-flex: 1 1 auto;
                    padding: 5px 10px;
                    font-size: 14px;
                    line-height: 20px;
                    color: #555;
                    background-color: #fff;
                    background-image: none;
                    border: 1px solid #ccc;
                    .border-radius(4px);
                    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
                    -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
                    -ms-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
                    -o-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
                    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
                    -webkit-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                    -moz-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                    -ms-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                    -o-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                    transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                    resize: none;
                }
                .btn-sub-reply {
                    flex: 0 0 50px;
                    -webkit-flex: 0 0 50px;
                    display: inline-block;
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: normal;
                    text-align: center;
                    color: #333;
                    vertical-align: middle;
                    cursor: pointer;
                    background-color: #fff;
                    background-image: none;
                    border: 1px solid #ccc;
                    .border-radius(4px);
                    white-space: nowrap;
                    padding: 5px 10px;
                    margin-bottom: 0;
                    margin-left: 10px;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.05);
                    -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.05);
                    -ms-box-shadow: 0 1px 1px rgba(0,0,0,0.05);
                    -o-box-shadow: 0 1px 1px rgba(0,0,0,0.05);
                    box-shadow: 0 1px 1px rgba(0,0,0,0.05);
                }
            }
            &:last-child {
                border: 0;
            }
        }

        .outin-comment-enter, .outin-comment-leave-active {
            opacity: 0;
            -ms-transform: translateX(30px);
            -moz-transform: translateX(30px);
            -webkit-transform: translateX(30px);
            -o-transform: translateX(30px);
            transform: translateX(30px);
        }
        .outin-comment-leave-active {
            position: absolute;
        }
    }
    
    .article-bottom-fixed{
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        z-index: 9;
        a{
            color: #fff;
            .ljh5-cuowu{
                font-size: 24px;   
            }
        }
        .open-app-fixed-bar{
            padding: 4px 10px;
            margin: 0 10px 10px 10px;
            background: rgba(0,0,0,.7);
            border-radius: 5px;
            .flex();
            align-items: center;
            justify-content: space-between;
            .bar-detail{
                .flex();
                align-items: center;
                justify-content: space-between;
                .bar-detail-logo{
                    .flex();
                    align-items: center;
                    justify-content: flex-start;
                    i{
                        font-size: 30px;
                        color: #ff424b;
                        margin: 0 5px 0 0;
                    }
                    img{
                        width: 30px;
                        display: block;
                        margin: 0 10px 0 0;
                    }
                }
            }
            .open{
                background: #ff424b;
                font-size: 14px;
                color: #fff;
                text-align: center;
                border-radius: 5px;
                padding: 2px 8px;
                margin: 0 10px 0 0;
            }
        }
    }
    .article-input-comment {
        .flex();
        padding: 10px;
        //position: absolute;
        z-index: 3;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        background: #fff;
        border-top: 1px solid #f0f1f7;
        .need-login {
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            padding: 0px 5px;
            a {
                display: block;
                background: @color-red;
                color: #fff;
                .border-radius(20px);
                text-align: center;
                font-size: 16px;
                line-height: 32px;
            }
        }
        .input-comment {
            //.flex();
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            //padding: 0px 5px;
            position: relative;

            background: @bg-color;
            border:1px solid @border-color;
            .border-radius(20px);
            padding: 5px 5px 5px 30px;
            font-size: 16px;
            color: @title-color;
            line-height: 20px;
            height: 32px;
            input[type="text"] {
                .txt();
                flex: 1 1 auto;
                -webkit-flex: 1 1 auto;
                padding: 15px 10px 15px 35px;
                .border-radius(20px);
                font-size: 16px;
                line-height: 24px;
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '微软雅黑', SimSun, '宋体', sans-serif;
            }
            i {
                display: inline-block;
                position: absolute;
                left: 8px;
                top: 5px;
                font-size: 18px;
                color: @title-color;
            }
        }
        .comment-handler {
            height: 32px;
            flex: 0 0 100px;
            -webkit-flex: 0 0 100px;
            text-align: right;
            .handle {
                display: inline-block;
                text-align: right;
                margin-left: 15px;
                margin-top: 3px;
                position: relative;
                i {
                    font-size: 28px;
                    color: @subinfo-color;
                }
                em {
                    display: inline-block;
                    background: @color-red;
                    .border-radius(10px);
                    font-size: 12px;
                    color: @color-white;
                    line-height: 14px;
                    font-style: normal;
                    padding: 0 6px;
                    position: absolute;
                    right: -8px;
                    top: -5px;
                    -webkit-transform: scale(0.7,0.7);
                    -moz-transform: scale(0.7,0.7);
                    -ms-transform: scale(0.7,0.7);
                    -o-transform: scale(0.7,0.7);
                    transform: scale(0.7,0.7);
                }
                &.selected {
                    i {
                        color: @color-red;
                    }
                }
            }
        }
        .input-confirm {
            .flex();
            .btn {
                .btn();
                .border-radius(20px);
                flex: 1 1 auto;
                -webkit-flex: 1 1 auto;
                background: #ffffff;
                border: 1px solid @color-red;
                color: @color-red;
                font-size: 16px;
                line-height: 26px;
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '微软雅黑', SimSun, '宋体', sans-serif;
                height: 32px;
            }
        }
    }

    .layout-comment-add {
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.98);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9;
        .comment-add {
            padding: 10px;
            .comment-add-title {
                font-size: 16px;
                color: @detail-title-color;
                line-height: 30px;
                padding-bottom: 5px;
            }
            .comment-add-quote {
                font-size: 14px;
                color: @detail-title-color;
                line-height: 24px;
                padding: 10px 0;
                margin-bottom: 5px;
                .multi-ellipsis(2);
                .author {
                    font-size: 16px;
                    color: @color-blue;
                }
            }
            textarea {
                width: 100%;
                height: 90px;
                overflow: hidden;
                background: #fafafa;
                border: 1px solid @color-gray-d;
                .border-radius(2px);
                padding: 7px 10px;
                resize: none;
                -webkit-appearance: none;
                font-size: 15px;
                line-height: 20px;
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '微软雅黑', SimSun, '宋体', sans-serif;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
                -moz-box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
                -ms-box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
                -o-box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
                box-shadow: inset 0 0 5px rgba(0,0,0,0.12);
                -webkit-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                -moz-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                -ms-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                -o-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
            }
            textarea:focus,textarea:active {
                border-color: #ff6666;
                -webkit-box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
                -moz-box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
                -ms-box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
                -o-box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
                box-shadow: inset 0 0 5px rgba(255,64,64,0.12);
                -webkit-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                -moz-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                -ms-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                -o-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
                transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
            }
            .comment-handler {
                width: 100%;
                padding: 0;
                margin-top: 15px;
                .btn-sub {
                    width: 100%;
                    height: 40px;
                    background: @btn-bg;
                    border: 0;
                    .border-radius(5px);
                    font-size: 16px;
                    color: @btn-color;
                    line-height: 40px;
                }
            }
        }
        .close {
            width: 70px;
            height: 70px;
            background: rgba(0,0,0,0.8);
            .border-radius(50%);
            position: absolute;
            right: -35px;
            top: -35px;
            &:after {
                content: "关闭";
                display: inline-block;
                font-size: 14px;
                color: @color-white;
                line-height: 16px;
                position: absolute;
                left: 6px;
                bottom: 12px;
            }
        }
    }
    .comment-fade-out-enter-active, .comment-fade-out-leave-active {
        -ms-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -moz-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -webkit-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -o-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    }
    .comment-fade-out-enter, .comment-fade-out-leave-active {
        //opacity: 0;
        -ms-transform: translateY(100%);
        -moz-transform: translateY(100%);
        -webkit-transform: translateY(100%);
        -o-transform: translateY(100%);
        transform: translateY(100%);
    }
    
    .articledetail-slide-fade-enter-active {
        -ms-transition: all .3s ease;
        -moz-transition: all .3s ease;
        -webkit-transition: all .3s ease;
        -o-transition: all .3s ease;
        transition: all .3s ease;
    }
    .articledetail-slide-fade-leave-active {
        -ms-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -moz-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -webkit-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -o-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    }
    
    .articledetail-slide-fade-enter,
    .articledetail-slide-fade-leave-active {
        opacity: 0;
        -ms-transform: translateX(30px);
        -moz-transform: translateX(30px);
        -webkit-transform: translateX(30px);
        -o-transform: translateX(30px);
        transform: translateX(30px);
    }
    
    .gotop {
        width: 40px;
        height: 40px;
        display: block;
        position: fixed;
        right: 5px;
        bottom: 125px;
        z-index: 3;
        background: #fff;
        border:2px solid #d6d7de;
        .border-radius(50%);
        &:before {
            content: "";
            width: 12px;
            height: 12px;
            border-top: 2px solid #d6d7de;
            border-right: 2px solid #d6d7de;
            .rotate(-45deg);
            position: absolute;
            left: 12px;
            top: 15px;
        }
    }
    
    .go-act {
        width: 230px;
        display: block;
        position: fixed;
        right: 5px;
        bottom: 170px;
        z-index: 4;
        img {
            width: 100%;
            display: block;
        }
        .close {
            width: 20px;
            height: 20px;
            display: block;
            border: 1px solid @def-font-color;
            .border-radius(50%);
            text-align: center;
            font-size: 12px;
            color: @def-font-color;
            line-height: 20px;
            position: absolute;
            right: 0;
            top: -5px;
            z-index: 3;
        }
    }

    .notouch {
		-webkit-touch-action: none;
		-moz-touch-action: none;
		-ms-touch-action: none;
		touch-action: none;
	}
    .over {
        overflow: hidden;
    }
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import API from '../../config/api.js'
    import wx from 'weixin-js-sdk'
    import Storage from 'store'
    var u = navigator.userAgent;
    //android终端                                     
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
    //ios终端                  
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    export default {
        data() {
            return {
                detail: {},
                user: Storage.get("ljh5user"),
                user_comment: "",
                recCookie:"",
                type:1,                 //1推荐 2普通
                isShowComment: false,//显示评论输入框
                comment_reply: {
                    rootid: 0,//目标评论的根评论id
                    id: 0,//目标评论id
                    isShowIpt: false,//是否显示回复输入框
                    cont: "",//回复内容
                    be_user_id: 0,//目标评论的user_id
                    be_user_nickname: "",//目标评论的用户昵称
                    comment_user_id: 0,
                    be_nickname: "",//目标评论的用户昵称
                    be_cont: ""//目标评论的内容
                },
                loading: true,
                gotop: false,//返回顶部
                goact: false,//查看活动
                dialog: {
                    dialogShow: false,
                    dialogCont: "",
                    dialogIsauto: true,
                    dialogLife: 3000,
                    dialogIsclosebtn: false
                },
                dialogConfirm: {
                    show: false,
                    cont: "",
                    item_id: 0,
                    user_id: 0,
                    reply_count: 0
                },
                attentionAuthor: {
                    isAttention: "0",
                    txt: "关注作者"
                },
                shareData: {     //微信分享默认内容
                    title: '因为关注，所以专业',
                    imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                    desc: '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台',
                    link: 'https://m.maicai360.cn' + this.$route.path,
                    success(a) {
                        a.recordShare();
                    }
                },
                user_id: "",
                locationLink: window.location.href,
                isFold: false,//显示部分内容
                isContFold: false,
                showpartSpace: true, 
                showpartTimes: 0,
                isShownav: true,//显示导航菜单
                initTop: 47,
                headHeight: 47,
                notouch: false,
                zoom: {
                    isShowZoom: false,//图片缩放窗口
                    zoomImg: "",//图片地址
                    isTool: true,//是否显示工具栏
                    zoomImgs: []//图组
                },
                openAppBar: true,
                isSelfApp: false,
                text:''    
            }
        },
        mounted() {
            this.type = this.$route.params.type;
            this.isSelfApp = u.indexOf('maicai360_app') > -1;
            if (this.$route.params.id && this.$route.name == "articleDetail") {
                if (Storage.get("ljh5user")) {
                    let user = Storage.get("ljh5user");
                    this.user_id = user.user_id;
                    this.getArticleDetail();
                }else if(!Storage.get("ljh5user") && !this.recCookie){
                    this.getRecCid();
                }
            }
            //console.log(this.resetComments)
            this.$store.dispatch('set_channel_cur', 'article');
            this.scrollInit();
            //this.Goback('//m.maicai360.cn');
            //this.showPartInit();
        },
        methods: {
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
            appZoomPic(position,imageUrls){
                if(isAndroid){
                    window.WCJSBridge.goLookImage(position,imageUrls);                                                 //查看图片 
                }else if(isIOS){
                    WCJSBridge.goLookImage(position,imageUrls);
                } 
            },
            //获取推荐cid
            getRecCid(){
                this.$http.get(API.artRecCid)
                .then((response)=>{
                   this.recCid = response.data.cid;
                   this.getArticleDetail();
                }, (response)=>{
                    console.log(response.data);
                });
            },
            getArticleDetail() {
                let _params = {};
                _params.type = this.$route.params.type;
                let url = API.articleDetail + '/' + this.$route.params.id;
                this.loading = true;
                if(!this.user_id){
                    _params.cid = this.recCid;
                    _params.userid = "";
                }else{
                    _params.userid = this.user_id;
                    _params.cid = "";    
                }
                
                this.$http.get(url, {params:_params})
                .then((response) => {
                    this.loading = false;
                    var count = response.data.count == null ? [] : response.data.count.split(",");
                    let detail = response.data;
                    detail.count = count;
                    detail.read_count = count.length > 0 ? count[0] : 0;//浏览数
                    detail.collect_count = count.length > 0 ? count[1] : 0;//收藏数
                    detail.commment_count = count.length > 0 ? count[2] : 0;//评论数
                    detail.comment_list = detail.comment_list != null ? detail.comment_list : [];//评论列表
                    detail.like_count = count.length > 0 ? count[4] : 0;////喜欢
                    detail.dislike_count = count.length > 0 ? count[3] : 0;//不喜欢
                    detail.like_count = parseInt(detail.like_count,10);
                    detail.dislike_count = parseInt(detail.dislike_count,10);
                    detail.releasetime = detail.releasetime.split(' ')[0].replace(/\//g,'-');//发布时间
                    this.attentionAuthor.isAttention = detail.isfollow;
                    if(this.attentionAuthor.isAttention == "1"){
                        this.attentionAuthor.txt = "已关注";
                    } else {
                        this.attentionAuthor.txt = "关注作者";
                    }
                    this.detail = detail;
                    if(this.detail.isCollectioned == '1'){
                        this.detail.collectionText = "已收藏";
                    } else {
                        this.detail.collectionText = "收藏";
                    }
                    this.detail.isLiked = "0";
                    this.detail.isDisLiked = "0";
                    if(this.detail.activity_id != "0" && this.detail.activity_id != "" && this.detail.activity_type != "0" && detail.activity_type != ""){//显示查看活动按钮
                        this.goact = true;
                    }
                    this.$store.dispatch('set_article_num',this.detail.category1_id);
                    //微信分享自定义tit,des,img
                    if(this.detail.title){ 
                        this.shareData.title = this.detail.title;
                    }
                    if(this.detail.content){
                        this.shareData.desc = this.detail.content.replace(/<[^>]+>/g,""); 
                        if(this.shareData.desc!=""){
                            this.shareData.desc = this.shareData.desc.substr(0,100);
                        }else{
                            this.shareData.desc = '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台';

                        }
                    }
                    //console.log(this.detail);
                    /*if(this.detail.coverurl){
                        this.shareData.imgUrl = this.detail.coverurl;    
                    }*/
                    this.getConfig(this.shareData);
                }, (response) => {
                    this.loading = false;
                });
            },
            articlelike(id, like) {
                let self = this;
                if (Storage.get("ljh5user")) {
                    this.$http.post(API.userArticleLike, {
                        id: id,
                        like: like,
                        user_id: Storage.get("ljh5user").user_id
                    })
                        .then((response) => {
                            //console.log(typeof response.data.count);
                            if (response.data.code && response.data.code == '200') {
                                this.show_dialog(response.data.msg, true, 1000, false);
                                if (like == "like") {
                                    this.detail.like_count += 1;
                                    this.detail.isLiked = "1";
                                } else if (like == "unlike") {
                                    this.detail.dislike_count += 1;
                                    this.detail.isDisLiked = "1";
                                }
                            } else {
                                this.show_dialog("您已经点过了", true, 1000, false);
                            }
                        }, (response) => {
                            this.show_dialog("系统出错,请稍候再试", true, 1000, false);
                        });

                } else {
                    this.$router.push("/login");
                }
            },
            articleCollect(id) {
                let self = this;
                if (Storage.get("ljh5user")) {
                    this.$http.post(API.userArticleCollect, {
                        article_id: id,
                        user_id: Storage.get("ljh5user").user_id
                    })
                    .then((response) => {
                        //console.log(typeof response.data.count);
                        //console.log(response.data);
                        if (response.data.code && response.data.code == '200') {
                            if(response.data.iscollected == 1) {
                                this.detail.isCollectioned = "1";
                                this.detail.collectionText = "已收藏";
                                this.show_dialog("收藏成功", true, 1000, false);
                            } else {

                                this.detail.isCollectioned = "0";
                                this.detail.collectionText = "收藏";
                                this.show_dialog("已取消",true,1000,false);
                            }
                        } else {
                            this.show_dialog("系统出错,请稍候再试",true,1000,false);
                        }
                    }, (response) => {
                        this.show_dialog("系统出错,请稍候再试",true,1000,false);
                    });
                } else {
                    this.$router.push('/login');
                }

            },
            //////评论
            showComment () {
                if(this.user) {
                    this.isShowComment = true;
                    let commentAddIpt = this.$el.querySelector("#commentAddIpt");
                    commentAddIpt.focus();
                } else {
                    this.$router.push('/login');
                }
            },
            hideComment () {
                this.isShowComment = false;
            },
            articleCommment(userid, artid) {  //应该加一个发表时间间隔限制，比如3分钟（计时器）后才能再次发表评论，以防止刷屏
                let self = this;
                if (this.user_comment != "" && this.user_comment.length < 200) {
                    this.$http.post(API.userArticleCommment, {
                        article_id: artid,
                        user_id: userid,
                        commt_content: this.user_comment
                    })
                    .then((response) => {
                        if (response.data.code && response.data.code == '200') {
                            //console.log(response.data);
                            this.show_dialog("评论成功",true,1000,false);
                            let date = new Date();
                            let year = date.getFullYear();
                            let month = date.getMonth()+1;
                            let day = date.getDate();
                            let hour = date.getHours();
                            let minutes = date.getMinutes();
                            let seconds = date.getSeconds();
                            let fulltime = year+'-'+month+'-'+day+" "+hour+":"+minutes+":"+seconds;
                            let newCommet = {
                                content: this.user_comment,
                                id: parseInt(response.data.id),
                                likecount: 0,
                                nickname: this.user.user_nickname,
                                replays: [],
                                time: fulltime,//此处应该返回一个服务器端时间，不应该用客户端时间，以确保时间的准确性
                                user_id: this.user.user_id
                            };
                            this.detail.comment_list.unshift(newCommet);
                            this.detail.commment_count = parseInt(this.detail.commment_count) + 1;//评论数即时+1
                            this.user_comment = "";

                            this.isShowComment = false;
                            //滚动定位到评论列表顶部
                            let mainWrap = this.$el.querySelector("#mainWrap");
                            let articleComment = this.$el.querySelectorAll("#articleComment")[0];
                            //mainWrap.scrollTop = articleComment.offsetTop;
                            let total = articleComment.offsetTop;
                            let distance = mainWrap.scrollTop;
                            // 平滑滚动，时长500ms，每10ms一跳，共50跳
                            let step = total / 50
                            if (total > distance) {
                                smoothDown()
                            } else {
                                let newTotal = distance - total;
                                step = newTotal / 50;
                                smoothUp();
                            }
                            function smoothDown () {
                                if (distance < total) {
                                    distance += step;
                        　　　　　　 mainWrap.scrollTop = distance;
                                    setTimeout(smoothDown, 10);
                                } else {
                                    mainWrap.scrollTop = total;
                                }
                            }
                            function smoothUp () {
                                if (distance > total) {
                                    distance -= step;
                        　　　　　　 mainWrap.scrollTop = distance;
                                    setTimeout(smoothUp, 10);
                                } else {
                                    mainWrap.scrollTop = total;
                                }
                            }
                        } else {
                            this.user_comment = "";
                            this.show_dialog(response.data.msg,true,1000,false);
                        }
                    }, (response) => {
                        this.show_dialog("系统出错,请稍候再试",true,1000,false);
                    });
                } else {
                    this.show_dialog("评论字数最少1个字，最多200字！", true, 1000, false);
                }
            },
            CommmentLike(comment_id, user_id) {
                if (!this.user) {
                    this.$router.push('/login');
                }
                else if (user_id == this.user.user_id) {
                    this.show_dialog("不能对自己的评论点赞!", true, 1000, false);
                } else {
                    this.$http.post(API.userArticleCommmentLike, {
                        comment_id: comment_id,
                        user_id: this.user.user_id //当前点赞的用户id
                    })
                    .then((response) => {
                        if (response.data.code && response.data.code == '200') {
                            for(var i=0; i < this.detail.comment_list.length; i++) {
                                if(this.detail.comment_list[i].id == parseInt(comment_id)) {
                                    this.detail.comment_list[i].likecount = parseInt(this.detail.comment_list[i].likecount) + 1;
                                }
                            }
                            this.show_dialog("操作成功!",true,1000,false);
                        } else {
                            this.show_dialog("您已经点过赞了!",true,1000,false);
                        }
                    }, (response) => {
                        //console.log(response.data);
                        this.show_dialog("提交失败,请稍候再试!",true,1000,false);
                    });
                }
            },
            delComment(){
                if (!this.user) {
                    this.$router.push('/login');
                }
                else if (this.dialogConfirm.user_id == this.user.user_id) {
                    this.$http.post(API.userArticleCommmentDel, {
                        article_id: this.$route.params.id,
                        comment_id: this.dialogConfirm.item_id,
                        user_id: this.user.user_id //当前评论的用户id
                    })
                    .then((response) => {
                        if (response.data.code && response.data.code == '200') {
                            for(var i=0; i < this.detail.comment_list.length; i++) {
                                if(this.detail.comment_list[i].id == this.dialogConfirm.item_id) {
                                    this.detail.comment_list.splice(i,1);
                                }
                            }
                            //即时更新评论数量
                            this.detail.commment_count = parseInt(this.detail.commment_count) > 0 ? parseInt(this.detail.commment_count) - (this.dialogConfirm.reply_count + 1) : 0;
                            this.detail.commment_count = parseInt(this.detail.commment_count) > 0 ? this.detail.commment_count : 0;
                            //this.show_dialog("已删除",true,1000,false);
                        } else {
                            this.show_dialog(response.data.msg,true,1000,false);
                        }
                    }, (response) => {
                        //console.log(response.data);
                        this.show_dialog("提交失败,请稍候再试!",true,1000,false);
                    });
                } else {
                    this.show_dialog("不能删除别人的评论!",true,1000,false);
                }
                this.dialogConfirm.show = false;
            },
            showReplyIpt (comment_rootid,comment_id,be_user_id,be_user_nickname,comment_user_id,be_nickname,be_cont) {
                this.comment_reply.id = comment_id;
                this.comment_reply.isShowIpt = true;
                this.comment_reply.be_user_id = be_user_id;
                this.comment_reply.be_user_nickname = be_user_nickname;
                this.comment_reply.comment_user_id = comment_user_id;
                this.comment_reply.be_nickname = be_nickname;
                this.comment_reply.be_cont = be_cont;
                if(comment_rootid != this.comment_reply.rootid) {
                    this.comment_reply.rootid = comment_rootid;
                    this.comment_reply.cont = "";
                } else {
                    if(comment_id != this.comment_reply.id){
                        this.comment_reply.cont = "";
                    }
                }
            },
            subReply () {
                if (!this.user) {
                    this.$router.push('/login');
                } 
                // else if (this.comment_reply.be_user_id == this.user.user_id || this.comment_reply.comment_user_id == this.user.user_id) {
                //     this.show_dialog("不能回复自己的评论！", true, 1000, false);
                // }
                else if (this.comment_reply.cont == "") {
                    this.show_dialog("请写点您的看法吧！", true, 1000, false);
                } else {
                    this.$http.post(API.userArticleCommmentReply, {
                        article_id: this.$route.params.id,
                        comment_id: this.comment_reply.rootid,
                        replay_id: this.comment_reply.id,
                        user_id: this.user.user_id,
                        content: this.comment_reply.cont
                    })
                    .then((response) => {
                        if (response.data.code && response.data.code == '200') {
                            //console.log(response.data);
                            let newReply = {
                                be_rpl_user_id: response.data.data.be_rpl_user_id,
                                be_rpl_user_nickname: response.data.data.be_rpl_user_nickname,
                                rpl_content: response.data.data.rpl_content,
                                rpl_id: response.data.data.rpl_id,
                                rpl_time: response.data.data.rpl_time,
                                rpl_user_id: response.data.data.rpl_user_id,
                                rpl_user_nickname: response.data.data.rpl_user_nickname
                            }
                            for(var i=0; i < this.detail.comment_list.length; i++) {
                                if(this.detail.comment_list[i].id == this.comment_reply.rootid) {
                                    this.detail.comment_list[i].replays.push(newReply);
                                }
                            }
                            this.detail.commment_count = parseInt(this.detail.commment_count) + 1;
                            this.comment_reply.rootid = 0;
                            this.comment_reply.id = 0;
                            this.comment_reply.isShowIpt = false;
                            this.comment_reply.cont = "";
                        } else {
                            this.show_dialog(response.data.msg,true,1000,false);
                        }
                    }, (response) => {
                        //console.log(response.data);
                        this.show_dialog("提交失败，请稍候再试！",true,1000,false);
                    });
                }
            },
            hideReply () {
                this.comment_reply.isShowIpt = false;
            },
            //滚动定位到评论列表顶部
            toCommentList () {
                let mainWrap = this.$el.querySelector("#mainWrap");
                let articleComment = this.$el.querySelectorAll("#articleComment")[0];
                //mainWrap.scrollTop = articleComment.offsetTop;
                let total = articleComment.offsetTop;
                let distance = mainWrap.scrollTop;
                // 平滑滚动，时长500ms，每10ms一跳，共50跳
                let step = total / 50
                if (total > distance) {
                    smoothDown()
                } else {
                    let newTotal = distance - total;
                    step = newTotal / 50;
                    smoothUp();
                }
                function smoothDown () {
                    if (distance < total) {
                        distance += step;
            　　　　　　 mainWrap.scrollTop = distance;
                        setTimeout(smoothDown, 10);
                    } else {
                        mainWrap.scrollTop = total;
                    }
                }
                function smoothUp () {
                    if (distance > total) {
                        distance -= step;
            　　　　　　 mainWrap.scrollTop = distance;
                        setTimeout(smoothUp, 10);
                    } else {
                        mainWrap.scrollTop = total;
                    }
                }
            },
            toAttention () {
                if(Storage.get("ljh5user")) {
                    this.$http.post(API.authorFollow, {
                        userid: Storage.get("ljh5user").user_id,
                        authorid: this.detail.author_id
                    })
                    .then((response) => {
                        if (response.data.code && response.data.code == '200') {
                            //console.log(response.data);
                            if(response.data.isfollowed == 1) {
                                this.attentionAuthor.isAttention = "1";
                                this.attentionAuthor.txt = "已关注";
                            } else {
                                this.attentionAuthor.isAttention = "0";
                                this.attentionAuthor.txt = "关注作者";
                            }
                        } else {
                            this.show_dialog(response.data.msg,true,1000,false);
                        }
                    }, (response) => {
                        this.show_dialog("系统出错,请稍候再试",true,1000,false);
                    });
                } else {
                    this.$router.push("/login");
                }
            },
            //提示框
            show_dialog (cont,isauto,life,isclosebtn) {
                this.dialog.dialogShow = true;
                this.dialog.dialogCont = cont;
                this.dialog.dialogIsauto = isauto;
                this.dialog.dialogLife = life;
                this.dialog.dialogIsclosebtn = isclosebtn;
            },
            close_dialog() {
                this.dialog.dialogShow = false;
                this.dialog.dialogCont = "";
                this.dialog.dialogLife = 3000;
            },
            //确认框
            confirm_delComment (comment_id, user_id, reply_count) {
                this.dialogConfirm = {
                    show: true,
                    cont: "确定要删除此条评论吗？",
                    item_id: comment_id,
                    user_id: user_id,
                    reply_count: reply_count
                }
            },
            cancel_confirm () {
                this.dialogConfirm = {
                    show: false,
                    cont: "",
                    item_id: 0,
                    user_id: 0,
                    reply_count: 0
                }
            },
            //返回顶部
            goTop() {
                let mainWrap = this.$el.querySelector("#mainWrap");
                let distance = mainWrap.scrollTop;
                let total = mainWrap.scrollTop;
                let steps = 20;
                if(total <= 1000) {
                    steps = 10;
                } else if(total > 1000 && total <= 2000) {
                    steps = 20;
                } else if(total > 2000 && total <= 4000) {
                    steps = 50;
                } else {
                    steps = 80;
                }
                if(steps <= 20){
                    // 平滑滚动，时长500ms，每10ms一跳，共50跳
                    let step = distance / steps;
                    this.smoothScrollTop = setInterval(() => {
                        distance -= step;
        　　　　　　     mainWrap.scrollTop = distance;
                        if(mainWrap.scrollTop <= 0) {
                            clearInterval(this.smoothScrollTop);
                        }
                    },10);
                } else {//内容太长时滚动效果不好，所以取消
                    mainWrap.scrollTop = 0;
                }
            },
            scrollInit() {
                this.bindWatchScrollForTop();
            },
            bindWatchScrollForTop() {
                let mainWrap = this.$el.querySelector("#mainWrap");
                if (mainWrap) {
                    mainWrap.addEventListener('scroll', this.watchScrollForTop);
                }
            },
            //显示隐藏返回顶部按钮 | 显示隐藏导航菜单
            watchScrollForTop () {
                let self = this;
                let mainWrap = this.$el.querySelector("#mainWrap");
                if (mainWrap.scrollTop > 600) {
                    this.gotop = true;
                } else {
                    this.gotop = false;
                }

                this.showpartSpace = false;
                if (mainWrap.scrollTop > this.headHeight) {
					this.isShownav = false;
                } else {
					this.isShownav = true;
                }
                if (mainWrap.scrollTop > this.initTop) {
					this.isShownav = false;
                } else if (mainWrap.scrollTop < this.initTop) {
					this.isShownav = true;
                }
                this.initTop = mainWrap.scrollTop >= this.headHeight ? mainWrap.scrollTop : this.headHeight;

                if(mainWrap.scrollHeight == mainWrap.offsetHeight + mainWrap.scrollTop){
                    mainWrap.addEventListener('touchmove', this.prevtDefault(event),false);
                    this.notouch = true;
                }
                if(this.notouch){
                    this.recoverTouch = setTimeout(function(){
                        self.notouch = false;
                    },500);
                }
            },
            prevtDefault(event) {
                event.preventDefault();
            },
            //评论输入框IOS下显示bug-fix
            showInput() {
                let curInput = this.$el.querySelector("#commentIpt");
                setTimeout(function () {
                    curInput.scrollIntoView(true);
                }, 100);
            },
            //关闭查看活动按钮
            closeAct() {
                this.goact = false;
            },
            //分享记录
            recordShare() {
                this.$http.post(API.shareNotify, { article_id: this.$route.params.id, user_id: this.user_id, type: "1" })
                    .then((response) => {
                    }, (response) => {
                        console.log(response.data);
                    });
            },
            //展示部分内容
            showPart(contHeight) {
                let that = this;
                if(this.showpartTimes <= 0){
                    this.loading = false;
                    let articleCont = this.$el.querySelector("#articleCont");
                    //if(articleCont.scrollHeight > 600){
                    if(contHeight > 600){
                        this.isFold = true;
                        this.isContFold = true;
                        this.showpartTimes++;
                    } else {
                        this.isFold = false;
                        this.isContFold = false;
                    }
                }

                //show缩放层
                let artCont = this.$el.querySelector("#articleCont");
                let imgs = artCont.querySelectorAll("img");
                for(var i=0; i<imgs.length; i++) {
                    let self = this;
                    let imgUrlArr;
                    let index;
                    this.zoom.zoomImgs.push(imgs[i].src);
                    imgUrlArr = this.zoom.zoomImgs;
                    imgs[i].index = i;
                    imgs[i].addEventListener('click', function(event){
                        that.text = index;
                        if(that.isSelfApp){
                            that.appZoomPic(this.index,imgUrlArr);
                        }else{
                            self.zoom.isShowZoom = true;
                            self.zoom.zoomImg = event.target.src;
                            self.$refs.zoom.hammer(self.zoom.zoomImg);
                        }
                    }, false);
                }
            },
            showFull() {
                let self = this;
                this.isFold = false;
                this.slowShowCont = setTimeout(function(){
                    self.isContFold = false;
                },500);
            },
            showPartInit() {
                this.showPart();
            },
            //清空图片缩放数据
            clearZoom () {
                this.zoom.isShowZoom = false;
                this.zoom.zoomImg = "";
            },
            //返回上层
            Goback(url){
                setTimeout(function () {
                    if (history.length < 3) {               //注意这里 历史列表中URL的数量,满足条件说明这个页面是首次打开，而不是从首页或者其他页面跳转过来的。
                        var state = {title: "index",url: url};
                        window.history.replaceState(state, "index", url);
                        state = {title: "index",url: ""};
                        window.history.pushState(state, "index", "");
                    }
                    window.addEventListener("popstate", function (e) {
                        if (window.history.state != null && window.history.state.url != "") {
                            location.href = window.history.state.url
                        }
                    });
                }, 1500); 
            },
            openApp(){
                this.openAppBar = false;
            }
        }
    }
</script>