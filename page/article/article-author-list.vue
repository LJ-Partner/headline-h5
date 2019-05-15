<template>
    <v-content>  
        <v-startup></v-startup>
        
        <header class="articleAuthor-header" >
            <p class="header-title">{{lists.authorname}}</p>
            <a class="back" v-on:click="$router.go(-1)"><i class="ljh5-icons ljh5-fanhui"></i><!--返回--></a>
            <!--<span class="handle" v-on:click="checkbtn" v-if="showEdit">{{get_usercenter_switchbtn.text}}</span>-->
            <transition name="slide-fade">
                <div class="count-bar" v-if="topCountBar">
                    <p class="count"><i class="ljh5-icons ljh5-guanzhurenwu"></i><em>{{lists.followcount}}</em>人关注</p>
                    <p class="handle">
                        <span class="btn-attention" :class="{off:attentionAuthor.isAttention == '1'}" v-on:click="toAttention">{{attentionAuthor.txt}}</span>
                    </p>
                </div>
            </transition>
        </header>
        <v-loading v-bind:isloading="loading"></v-loading>
       
        <v-main class="main-articleAuthor" id="articleAuthorWrap" v-bind:no-padding="true" v-bind:isbg="true" :bottom-method="pullAuthorArticles" ref="bottom" :class="{'empty-main-wrap': !lists.Articles || lists.Articles.length <= 0}">
            <div class="article-list" v-if="lists.Articles && lists.Articles.length > 0">
                <div class="article-item" v-for="item in lists.Articles">
                    <figure class="article layout2" v-if="item.showtype == '2'">
                        <div class="panel">
                            <a :href="'/article/detail/'+item.article_id+'/'+type"><h3>{{item.article_title}}</h3></a>
                            <p>
                                <label class="label" :class="'mark' + item.isorigin" v-if="item.isorigin && item.isorigin != '' && item.isorigin != '0'"></label>
                                <label class="attach-label author">{{item.author_name}}</label>
                                <label class="attach-label hide"><i class="ljh5-icons ljh5-guanzhu"></i>{{item.comment_count}}</label>
                                <label class="attach-label">{{item.time.split(' ')[0].replace(/\//g,'-')}}</label>
                            </p>
                        </div>
                        <div class="show" v-if="item.iscover=='1' && item.coverurl && item.coverurl != ''"><a :href="'/article/detail/'+item.article_id+'/'+type"><img :src="item.coverurl" /></a></div>
                    </figure>
                    <figure class="article" v-else>
                        <a :href="'/article/detail/'+item.article_id+'/'+type">
                            <h3>{{item.article_title}}</h3>
                            <img :src="item.coverurl" v-if="item.iscover=='1'"/>
                        </a>
                        <p>
                            <label class="label" :class="'mark' + item.isorigin" v-if="item.isorigin && item.isorigin != '' && item.isorigin != '0'"></label>
                            <label class="attach-label author">{{item.author_name}}</label>
                            <label class="attach-label hide"><i class="ljh5-icons ljh5-guanzhu"></i>{{item.comment_count}}</label>
                            <label class="attach-label">{{item.time.split(' ')[0].replace(/\//g,'-')}}</label>
                        </p>
                    </figure>
                </div>
            </div>
            <v-empty v-else v-bind:emptycont="'暂无相关内容'"></v-empty>
        </v-main>    
         
        <v-footer></v-footer>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.articleAuthor-header {
	position: fixed;
	z-index: 3;
	left:0;
	top: 0;
	width:100%;
	height: 46px;
	background: @color-white;
    color: @def-font-color;
    line-height: 46px;
	.header-title {
		display: block;
		text-align: center;
		font-size: 18px;
	}
    .back {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        text-align: left;
        font-size: 15px;
        color: @def-font-color;
        padding: 0 5px 0 7px;
        .flex();
        i {
            font-size: 20px;
            padding-right: 2px;
        }
    }
    .count-bar {
        text-align: center;
        line-height: 20px;
        padding-bottom: 8px;
        background: @color-white;
        .count {
            font-size: 14px;
            color: @color-gray-6;
            i {
                margin-right: 2px;
                font-size: 13px;
                position: relative;
                top: -1px;
            }
            em {
                color: @color-blue;
                font-style: normal;
            }
        }
        .handle {
            display: block;
            color: @def-font-color;
            padding: 6px 0 0;
            .btn-attention {
                display: inline-block;
                background: @color-blue;
                border: 1px solid @color-blue;
                .border-radius(5px);
                padding: 0 5px;
                font-size: 12px;
                color: @color-white;
                &.off {
                    background: transparent;
                    border-color: @bg-border-color;
                    color: @detail-subinfo-color;
                }
            }
        }
    }
    .slide-fade-enter-active {
        -ms-transition: all .3s ease;
        -moz-transition: all .3s ease;
        -webkit-transition: all .3s ease;
        -o-transition: all .3s ease;
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        -ms-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -moz-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -webkit-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        -o-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
        transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
        -ms-transform: translateY(-20px);
        -moz-transform: translateY(-20px);
        -webkit-transform: translateY(-20px);
        -o-transform: translateY(-20px);
        transform: translateY(-20px);
        opacity: 0;
    }
}

.main.main-articleAuthor {
    top: 46px !important;
    padding-top: 56px !important;
    .article {
        border: 0;
        background: #ffffff;
        padding-left: 10px;
        padding-right: 10px;
        margin: 6px 0;
    }
}
</style>

<script>
import API from '../../config/api.js'
import Storage from 'store'
export default {       
        data(){
            return {
                lists:{

                },
                type: 2, //1推荐 2普通
                loading:true,
                page:1,
                total:0,
                topCountBar: true,
                attentionAuthor: {
                    isAttention: "1",
                    txt: "已关注"
                }
            }
        },
        mounted () {
            this.getAuthorArticles();
            this.$store.dispatch('set_channel_cur','attention');
            this.initForTopBar();
        },
        methods: {
            pullAuthorArticles(){
               if(this.page==0){
                   this.page=1;
               } else {
                    this.page++;
               }
               let url = API.acticlesAuthor;
               url = API.acticlesAuthor + this.$route.params.id + "/" + this.page;
                this.$refs.bottom.setTranslate(-10,'玩命加载中...');
                this.$http.get(url, {params: {userid:Storage.get("ljh5user")?Storage.get("ljh5user").user_id:""} })
                .then((response)=>{
                    this.loading = false;
                    if(response.data && response.data.Articles && response.data.Articles.length > 0) {
                        for(var key in response.data.Articles){
                            this.lists.Articles.push(response.data.Articles[key]);
                        }
                        this.total = response.data.total;
                        this.page = response.data.page;
                    } else {
                        this.$refs.bottom.clearTranslate();
                        this.total = response.data.total;
                    }
                }, (response)=>{
                    this.loading = false;
                    //console.log(response.data);
                });
            },
            getAuthorArticles(){
                let url = "";
                if(this.$route.params.id && this.$route.name == "articleAuthor"){
                     url = API.acticlesAuthor  + this.$route.params.id;
                } else {
                    return false;
                }
                this.loading = true;
                this.$http.get(url, {params: {userid:Storage.get("ljh5user")?Storage.get("ljh5user").user_id:""} })
                .then((response)=>{
                    //console.log(response.data);
                    this.loading = false;
                    this.lists = response.data;
                    this.attentionAuthor.isAttention = this.lists.isfollow;
                    if(this.attentionAuthor.isAttention == "1"){
                        this.attentionAuthor.txt = "已关注";
                    } else {
                        this.attentionAuthor.txt = "关注";
                    }
                }, (response)=>{
                    this.loading = false;
                    //console.log(response.data);
                });
            },
            toAttention () {
                if(Storage.get("ljh5user")) {
                    this.$http.post(API.authorFollow, {
                        userid: Storage.get("ljh5user").user_id,
                        authorid: this.$route.params.id
                    })
                    .then((response) => {
                        if (response.data.code && response.data.code == '200') {
                            if(response.data.isfollowed == 1) {
                                this.attentionAuthor.isAttention = "1";
                                this.attentionAuthor.txt = "已关注";
                            } else {
                                this.attentionAuthor.isAttention = "0";
                                this.attentionAuthor.txt = "关注";
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

            initForTopBar() {
                this.bindScrollEvents();
            },
            bindScrollEvents() {
                this.$el.querySelector("#articleAuthorWrap").addEventListener('scroll', this.scrollEvents);
            },
            scrollEvents () {
                let articleAuthorWrap = this.$el.querySelector("#articleAuthorWrap");
                if(articleAuthorWrap.scrollTop > 300) {
                    this.topCountBar = false;
                } else {
                    this.topCountBar = true;
                }
            }
        }
    }
</script>
