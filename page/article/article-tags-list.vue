<template>
    <v-content>
        <v-header v-bind:isBack="false">
            <!--<v-toptab></v-toptab>-->
        </v-header>
         <v-loading v-bind:isloading="loading"></v-loading>
        <v-main class="main-article article-tagslist-wrap" v-if="!loading" :bottom-method="pullTagsArticles" ref="bottom" :class="{'empty-main-wrap': !lists.Articles || lists.Articles.length <= 0}">
            <div class="article-list" v-if="lists.Articles && lists.Articles.length > 0">
                <div class="article-item" v-for="item in lists.Articles">
                    <figure class="article layout2" v-if="item.showtype == '2'">
                        <div class="panel">
                            <a :href="'/article/detail/'+item.id+'/'+type"><h3>{{item.title}}</h3></a>
                            <p>
                                <label class="label" :class="'mark' + item.isorigin" v-if="item.isorigin && item.isorigin != '' && item.isorigin != '0'"></label>
                                <a :href="'/article/author/' + item.author_id" class="attach-label author">{{item.author}}</a>
                                <label class="attach-label hide"><i class="ljh5-icons ljh5-guanzhu"></i>{{item.comments_count}}</label>
                                <label class="attach-label">{{item.date.split(' ')[0].replace(/\//g,'-')}}</label>
                            </p>
                        </div>
                        <div class="show" v-if="item.iscover=='1' && item.cover_url && item.cover_url != ''"><a :href="'/article/detail/'+item.id + '/' + type"><img :src="item.cover_url" /></a></div>
                    </figure>
                    <figure class="article" v-else>
                        <a :href="'/article/detail/'+item.id +'/'+ type">
                            <h3>{{item.title}}</h3>
                            <img :src="item.cover_url" v-if="item.iscover=='1'"/>
                        </a>
                        <p>
                            <label class="label" :class="'mark' + item.isorigin" v-if="item.isorigin && item.isorigin != '' && item.isorigin != '0'"></label>
                            <a :href="'/article/author/' + item.author_id" class="attach-label author">{{item.author}}</a>
                            <label class="attach-label hide"><i class="ljh5-icons ljh5-guanzhu"></i>{{item.comments_count}}</label>
                            <label class="attach-label">{{item.date.split(' ')[0].replace(/\//g,'-')}}</label>
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
.main.main-article {
    &.article-tagslist-wrap {
        top: 47px;
    }
}
</style>
<script>
import API from '../../config/api.js'
export default {
        data(){
            return {
                lists:{

                },
                loading:true,
                page:1,
                total:0,
                type: 2 //1推荐 2普通
            }
        },
        mounted () {
            this.getTagsArticles();
            //console.log(this.$route.params.type)
            this.$store.dispatch('set_channel_cur','article');
        },
        methods: {
            pullTagsArticles(){
                if(this.page==0){
                    this.page=1;
                } else {
                    this.page++;
                }
                let url = API.acticlesTags;
                if(this.$route.params.type && this.$route.name == "articleTags"){
                    url = API.acticlesTags + "/" + this.$route.params.type+"/"+this.page;
                } else {
                    url = API.acticlesTags+"/1"+"/"+this.page;
                }
                this.$refs.bottom.setTranslate(-10,'玩命加载中...');
                this.$http.get(url)
                .then((response)=>{
                    //console.log(response.data);
                    this.loading = false;
                    if(response.data && response.data.Articles && response.data.Articles.length > 0) {
                        for(var key in response.data.Articles){
                            this.lists.Articles.push(response.data.Articles[key]);
                        }
                        this.page = response.data.page;
                        this.total = response.data.total;
                    } else {
                        this.$refs.bottom.clearTranslate();
                        this.total = response.data.total;
                    }
                }, (response)=>{
                    this.loading = false;
                    console.log(response.data);
                });
            },
            getTagsArticles(){
                let url = "";
                if(this.$route.params.id && this.$route.name == "articleTags"){
                    url = API.acticlesTags  + this.$route.params.id;
                } else {
                    return false;
                }
                this.loading = true;
                this.$http.get(url)
                .then((response)=>{
                    //console.log(response.data);
                    this.loading = false;
                    this.lists = response.data;
                }, (response)=>{
                    this.loading = false;
                    console.log(response.data);
                });
            }
        }
    }
</script>
