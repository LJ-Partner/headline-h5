<template>
    <v-content>
        <v-main v-bind:no-padding="true" :bottom-method="pullSearchArticles" ref="bottom" :class="{'empty-main-wrap': !flag || !lists.Articles || lists.Articles.length <= 0}">
            <div class="schindex">
                <div class="sch-field">
                    <router-link class="header-back" :to="{name: 'searchindex'}"><i class="ljh5-icons ljh5-fanhui"></i></router-link>
                    <div class="sch-w">
                        <!--<em>
                            <i class="ljh5-icons ljh5-Wtuxing"></i>
                        </em>-->
                        <div class="sch-type" :class="{'open': isShowTypeList}">
                            <span class="type-name" @click="showTypeList(null)">{{search.type.name}}</span>
                            <transition name="type-fade-out">
                            <ul class="type-list" v-show="isShowTypeList">
                                <li v-for="item in searchType" :class="{'selected': item.typeid == search.type.id}" @click="showTypeList(item)">{{item.typename}}</li>
                            </ul>
                            </transition>
                        </div>
                        <input autocomplete="off" autofocus="true" type="search" placeholder="您想搜点什么呢…" name="searchkey"  v-model="search.textFull" class="sch-ipt" v-on:click="onFocus">
                    </div>
                   <!--<router-link class="search" :class="{active:search.textFull}" :to="{name: 'searchresult',query: { page: search.page,textFull:search.textFull }}">搜索</router-link>-->
                   <button type="button" v-on:click="searchArticles" class="search-btn">搜索</button>
                </div>
            </div>

            <v-empty v-else v-bind:emptycont="'请输入搜索关键字！'" v-if="!this.flag"></v-empty>
            <v-empty v-else v-bind:emptycont="'没有查到相关内容'" v-else-if="!lists.Articles || lists.Articles.length <= 0"></v-empty>

            <div class="article-list schresult" v-else>
                <div class="article-item" v-for="item in lists.Articles">
                    <figure class="article layout2" v-if="item.showtype == '2'">
                        <div class="panel">
                            <a :href="'/article/detail/'+item.id +'/'+type"><h3 v-html="item.title"></h3></a>
                            <p>
                                <label class="label" :class="'mark' + item.isorigin" v-if="item.isorigin && item.isorigin != '' && item.isorigin!='0'"></label>
                                <label class="attach-label author" v-html="item.author"></label>
                                <label class="attach-label">{{item.comments_count}}人阅读</label>
                                <label class="attach-label" v-if="item.iscover !='1' || !item.cover_url || item.cover_url == ''">{{item.date.split(' ')[0].replace(/\//g,'-')}}</label>
                            </p>
                        </div>
                        <div class="show" v-if="item.iscover=='1' && item.cover_url && item.cover_url != ''"><a :href="'/article/detail/'+item.id+'/'+type"><img :src="item.cover_url" /></a></div>
                    </figure>
                    <figure class="article" v-else>
                        <a :href="'/article/detail/'+item.id+'/'+type">
                            <h3 v-html="item.title"></h3>
                            <img :src="item.cover_url" v-if="item.iscover=='1'"/>
                        </a>
                        <p>
                            <label class="label" :class="'mark' + item.isorigin" v-if="item.isorigin && item.isorigin != ''"></label>
                            <label class="attach-label author" v-html="item.author"></label>
                            <label class="attach-label">{{item.comments_count}}人阅读</label>
                            <label class="attach-label">{{item.date.split(' ')[0].replace(/\//g,'-')}}</label>
                        </p>
                    </figure>
                </div>
            </div>
        </v-main> 
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
        <v-footer></v-footer>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.schresult {
    padding:0 10px;
    .article {
        h3 {
            highlight {
                color: @color-red;
                font-size: 18px;
            }
        }
        .attach-label {
            highlight {
                color: @color-red;
                font-size: inherit;
            }
        }
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
                type: 2,//1推荐 2普通
                searchType: [
                    {
                        typeid: 0,
                        typename: "所有"
                    },
                    {
                        typeid: 1,
                        typename: "文章"
                    },
                    {
                        typeid: 2,
                        typename: "视频"
                    }
                ],
                search:{
                    page:1,
                    type: {
                        id: this.$route.query.search_type,
                        name: "所有"//this.searchType[parseInt(this.$route.query.search_type)].typename
                    },
                    textFull:this.$route.query.textFull
                },
                isShowTypeList: false,
                dialog: {
                    dialogShow: false,
                    dialogCont: "",
                    dialogIsauto: true,
                    dialogLife: 3000,
                    dialogIsclosebtn: false
                },
                flag: true
            }
        },
        mounted () {
            if(this.$route.query.search_type == 0){
                this.search.type.id = this.searchType[0].typeid;
                this.search.type.name = this.searchType[0].typename;
            } else if (this.$route.query.search_type == 1) {
                this.search.type.id = this.searchType[1].typeid;
                this.search.type.name = this.searchType[1].typename;
            } else if (this.$route.query.search_type == 2) {
                this.search.type.id = this.searchType[2].typeid;
                this.search.type.name = this.searchType[2].typename;
            } else {
                this.search.type.id = this.searchType[0].typeid;
                this.search.type.name = this.searchType[0].typename;
            }
            this.searchArticles();
            //console.log(this.$route.params.type)
            this.$store.dispatch('set_channel_cur','article');
        },
        methods: {
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
            showTypeList (item) {
                this.isShowTypeList = !this.isShowTypeList;
                if(item){
                    this.search.type.id = item.typeid;
                    this.search.type.name = item.typename;
                }
            },
            resetUrl () {
                this.$router.push({ 
                    name: 'searchresult',
                    query: { 
                        page: this.search.page,
                        search_type: this.search.type.id,
                        textFull:this.search.textFull
                    }
                })
            },
            onFocus(){
                let _this = this;
                _this.$el.querySelector(".sch-ipt").focus();
            },
            setSearchStorage (){
                //console.log('s:',this.search.textFull)
                if(Storage.get("ljh5user_search")){
                    if(!Storage.get("ljh5user_search").includes(this.search.textFull)){
                        let arr_ = Storage.get("ljh5user_search");
                        arr_.push(this.search.textFull);
                        Storage.set('ljh5user_search',arr_);
                    }
                } else {
                    let arr =[];
                    if(this.search.textFull!=null && this.search.textFull) {
                         arr.push(this.search.textFull);
                        Storage.set('ljh5user_search',arr);
                    }
                   
                }
            },
            pullSearchArticles() {
                if(this.search.page==0){
                   this.search.page=1;
                } else {
                    this.search.page++;
                }
                let keyWord = this.search.textFull.replace(/(^\s*)|(\s*$)/g, "");
                let url = API.articleSearch+"/"+this.search.page;
                let userid = Storage.get("ljh5user")==undefined?null:Storage.get("ljh5user").user_id;
                this.$refs.bottom.setTranslate(-10,'玩命加载中...');
                this.$http.get(url,{
                    params: {
                        search_type: this.search.type.id,
                        TextFull: keyWord,
                        userid: userid
                    }
                })
                .then((response)=>{
                    let lists = response.data;
                    if(lists && lists.Articles && lists.Articles.length > 0) {
                        let regKeyWord = "<highlight>" + this.search.textFull + "</highlight>";
                        let regS = new RegExp(this.search.textFull, "gi");
                        for(var key in lists.Articles){
                            lists.Articles[key].title = lists.Articles[key].title.replace(regS, regKeyWord);
                            lists.Articles[key].author = lists.Articles[key].author.replace(regS, regKeyWord);
                            this.lists.Articles.push(lists.Articles[key]);
                        }
                        this.search.page = lists.page;
                    } else {
                        this.$refs.bottom.clearTranslate();
                    }
                }, (response)=>{
                    //console.log(response.data);
                });
            },
            searchArticles(){
                this.search.page = 1;
                this.resetUrl();
                let keyWord = this.search.textFull.replace(/(^\s*)|(\s*$)/g, "");
                if(keyWord != ""){
                    this.flag = true;
                    let url = API.articleSearch +"/" + this.search.page;              
                    let userid = Storage.get("ljh5user")==undefined?null:Storage.get("ljh5user").user_id
                    this.setSearchStorage();
                    //console.log(url)
                    this.$http.get(url,{
                        params: {
                            search_type: this.search.type.id,
                            TextFull: keyWord,
                            userid: userid
                        }
                    })
                    .then((response)=>{
                        let lists = response.data;
                        this.lists = lists;
                        if(!this.lists || !this.lists.Articles || this.lists.Articles.length <= 0){
                            this.$refs.bottom.setTranslate(0,'');
                        } else {
                            let regKeyWord = "<highlight>" + this.search.textFull + "</highlight>";
                            let regS = new RegExp(this.search.textFull, "gi");
                            for(var i=0; i<lists.Articles.length; i++){
                                lists.Articles[i].title = lists.Articles[i].title.replace(regS, regKeyWord);
                                lists.Articles[i].author = lists.Articles[i].author.replace(regS, regKeyWord);
                            }
                            this.lists = lists;
                        }
                    }, (response)=>{
                        //console.log(response.data);
                    });
                }else{
                    this.flag = false;
                    this.$refs.bottom.setTranslate(0,'');
                    this.search.textFull = "";
                    //this.show_dialog("请输入关键字！",true,2000,false);
                }
            }
        },
        watch:{
            '$route' (to, from) {
                // 对路由变化作出响应...
                
                //this.searchArticles();
            }
       }
    }
</script>
