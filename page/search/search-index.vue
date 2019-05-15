<template>
    <v-content>
        <v-main v-bind:no-padding="true">
            <div class="schindex">
                <div class="sch-field">
                    <a class="header-back"  v-on:click="$router.go(-1)"><i class="ljh5-icons ljh5-fanhui"></i></a>
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
                        <input autocomplete="off" autofocus="true" type="search"  placeholder="您想搜点什么呢…" name="searchkey" v-model="search.textFull" class="sch-ipt" v-on:click="onFocus">
                    </div>
                    <!--<router-link class="search" :class="{active:search.textFull}" :to="{name: 'searchresult',query: { page: search.page,textFull:search.textFull }}">搜索</router-link>-->
                    <button type="button" v-on:click="pushtoresult" class="search-btn">搜索</button>
                </div>
                <div class="sch-tags" v-if="search.history.length > 0">
                    <p class=tag-title>历史搜索</p>
                    <i class="ljh5-icons ljh5-shanchu tag-handle" v-on:click="clearAllSearchStorage"></i>
                    <div class="tag-lists">
                        <router-link :to="{name: 'searchresult',query: { page: search.page,textFull:item }}" v-for="item in search.history">{{item}}</router-link>
                    </div>
                </div>
                <div class="sch-tags">
                    <p class=tag-title>热搜</p>
                    <div class="tag-lists">
                        <router-link v-for="item in hotTagList" :to="{name: 'searchresult',query: { page: search.page,textFull:item }}">{{item}}</router-link>
                      <!--  <a href="/search/result/">2016年十大烂片</a>
                        <a href="/search/result/">大唐荣耀</a>
                        <a href="/search/result/">Apple</a>
                        <a href="/search/result/">小程序</a>
                        <a href="/search/result/">巴萨6-1逆转巴黎</a>
                        <a href="/search/result/">剑仙李白</a>
                        <a href="/search/result/">爱乐之城</a>
                        <a href="/search/result/">家政行业</a>
                        <a href="/search/result/">特朗普</a>
                        <a href="/search/result/">三生三世十里桃花</a>
                        <a href="/search/result/">欢乐好声音</a>
                        <a href="/search/result/">当你告诉我你爱我时，我为什么要相信你，因为我早已知道你一辈子都在骗人</a>
                        <a href="/search/result/">永不消逝的奇迹--发生在西库利亚那城的故事</a>
                        -->
                    </div>
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
.schindex {
    input{
        -webkit-tap-highlight-color: rgba(0,0,0,0)
    }
    padding:0 10px;
    .sch-field {
        position: relative;
        padding: 18px 0;
        vertical-align: middle;
        font-size: 14px;
        color: rgba(0,0,0,.4);
        text-align: center;
        border-bottom: 1px solid #f0f1f7;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content:center;
        -webkit-justify-content:center;
        align-items: center;
        -webkit-align-items: center;
        .header-back {
            position: absolute;
            left: 0;
            top: 22px;
            font-size: 15px;
            color:rgba(0, 0, 0, 0.4);
            i {
                font-size: 18px;
                padding-right: 2px;
                display: inline-block;
            }
        }
        .clear-keywords{
            position: absolute;
            right: 35px;
            top: 23px;
            content: '';
            width: 20px;
            height: 20px;
            background-position: 0 0;
            background: url('../../libs/static/images/ico-close.png') no-repeat;
            background-size: 20px 20px;
        }
        .sch-w{
            width:100%;
            margin:0 5px 0 30px;
            position: relative;
            z-index: 5;
            em{
                display: block;
                width: 30px;
                height: 27px;
                position: absolute;
                top: 24px;
                color: #d81e06;
                .ljh5-Wtuxing{
                    font-size: 20px;
                }
            }
            .sch-type {
                display: block;
                width: 62px;
                height: 34px;
                padding: 0 20px 0 10px;
                text-align: left;
                font-size: 14px;
                color: @title-color;
                line-height: 34px;
                position: absolute;
                left: 0;
                top: 0;
                // &:after {
                //     content: "";
                //     width: 1px;
                //     height: 22px;
                //     display: inline-block;
                //     background: @color-gray-9;
                //     position: absolute;
                //     right: 0;
                //     top: 7px;
                // }
                &:before {
                    content: "";
                    width: 0;
                    height: 0;
                    font-size: 0;
                    line-height: 0;
                    border-style: solid;
                    border-width: 5px 5px 0;
                    border-color: @color-gray-9 transparent;
                    position: absolute;
                    right: 8px;
                    top: 15px;
                    z-index: 3;
                    -ms-transition: all .3s ease;
                    -moz-transition: all .3s ease;
                    -webkit-transition: all .3s ease;
                    -o-transition: all .3s ease;
                    transition: all .3s ease;
                }
                .type-name {
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 0 20px 0 10px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 4;
                }
                .type-list {
                    width: 100%;
                    background: @color-gray-f;
                    .border-radius(5px);
                    position: absolute;
                    left: 0;
                    top: 4px;
                    z-index: 5;
                    li {
                        padding: 0 10px;
                        text-align: left;
                        font-size: 14px;
                        color: @title-color;
                        line-height: 26px;
                        &.selected {
                            color: @color-blue;
                        }
                    }
                }
                .type-fade-out-enter-active, .type-fade-out-leave-active {
                    -ms-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -moz-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -webkit-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    -o-transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                    transition: all .3s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                }
                .type-fade-out-enter, .type-fade-out-leave-active {
                    opacity: 0;
                    -ms-transform: translateY(30px);
                    -moz-transform: translateY(30px);
                    -webkit-transform: translateY(30px);
                    -o-transform: translateY(30px);
                    transform: translateY(30px);
                }
                &.open {
                    &:before {
                        .rotate(-180deg);
                    }
                    .type-name {
                        z-index: 1;
                    }
                    .type-list {
                        z-index: 2;
                    }
                }
            }
            .sch-ipt {
                display: block;
                font-size: 14px;
                height: 34px;
                padding: 0 10px 0 65px;
                background: @color-gray-f;
                border: 0;
                width: 100%;
                .border-radius(5px);
                font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '微软雅黑', SimSun, '宋体', sans-serif;
                &::-webkit-input-placeholder {
                    color: #999999;
                }
                &::-moz-placeholder {
                    color: #999999;
                }
                &:-moz-placeholder {
                    color: #999999;
                }
                &:-ms-input-placeholder {
                    color: #999999;
                }
                &::placeholder {
                    color: #999999;
                }
                &::-webkit-search-decoration,
                &::-webkit-search-cancel-button {
                    display: block;
                }
            }
        }
        .search {
            position: absolute;
            right: 0;
            top: 23px;
            font-size: 14px;
            display: block;
            color: rgba(0, 0, 0, 0.4);
            .ljh5-sousuo{
                display: inline-block;
            }
        }
        .search-btn {
            .btn();
            background: none;
            padding:0px;
            top:25px;
            color: @color-red;
            width:40px;
        }
        .active{
            color: @color-red;
        }
        
    }
    .sch-sub {
        position: absolute;
        right: 15px;
        top: 12px;
        height: 30px;
        width: 50px;
        padding: 0;
        text-align: center;
        line-height: 24px;
        .btn-red();
        .border-radius(20px);
        font-size: 14px;
        font-family: Helvetica, Verdana, Arial, 'Microsoft YaHei', '微软雅黑', SimSun, '宋体', sans-serif;
    }

    .sch-tags {
        margin: 15px auto 0;
        padding-bottom: 10px;
        position: relative;
        border-bottom: 1px solid #f0f1f7;
        .tag-title {
            font-size: 14px;
            color: #999999;
            line-height: 20px;
            margin-right: 40px;
            padding-bottom: 5px;
        }
        .tag-handle {
            position: absolute;
            right: 0;
            top: -3px;
            font-size: 14px;
            color: #999999;
        }
        .tag-lists {
            width: 100%;
            a,span {
                display: inline-block;
                border: 1px solid #dddddd;
                .border-radius(5px);
                padding: 2px 10px;
                margin: 10px 10px 0 0;
                font-size: 16px;
            }
        }
    }
    .sch-tags:last-child{
        border:none;
    }
}
</style>

<script>
import API from '../../config/api.js'
import Storage from 'store'
export default {
        data(){
            return {
                hotTagList:['变压器','宝钢','电机','硅钢','工艺','市场需求','价格','电网','新能源','电动汽车'],
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
                        id: 0,
                        name: "所有"
                    },
                    textFull:"",
                    history:[]
                },
                isShowTypeList: false,
                dialog: {
                    dialogShow: false,
                    dialogCont: "",
                    dialogIsauto: true,
                    dialogLife: 3000,
                    dialogIsclosebtn: false
                }
            }
        },
        mounted () {
            this.$store.dispatch('set_channel_cur','article');
            //console.log(this.$route.params.type)
            this.getSearchStorage();
            //this.onFocus();
            //this.hotSearchTags();
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
            pushtoresult () {
                let keyWord = this.search.textFull.replace(/(^\s*)|(\s*$)/g, "");
                if(keyWord != ""){
                    this.$router.push({
                        name:"searchresult",
                        query:{
                            page:this.search.page,
                            search_type: this.search.type.id,
                            textFull:keyWord
                        }});
                    //this.$router.push({name:'searchresult'})
                }else{
                    this.show_dialog("请输入关键字！",true,2000,false);
                    this.search.textFull = "";
                }
            },
            onFocus(){
                let _this = this;
                _this.$el.querySelector(".sch-ipt").focus();
            },
            getSearchStorage (){
                //console.log('s:',this.search.textFull)
                if(Storage.get("ljh5user_search")){
                    this.search.history = Storage.get("ljh5user_search");
                }
            },
            clearAllSearchStorage() {
                Storage.remove('ljh5user_search');
                this.search.history=[];
            },
            //大家都在搜
            hotSearchTags(){
                let url = API.acticleDetail + "113";
                this.$http.get(url)
                    .then((response) => {
                        this.loading = true;
                        let detail = response.data;
                        this.hotTagList = detail;
                    }, (response) => {
                        this.loading = false;

                    });
            }
        }
    }
</script>
