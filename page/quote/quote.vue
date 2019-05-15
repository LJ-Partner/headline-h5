<template>
    <div class="quote-w">
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="quote">
            <div class="quote-header">
                <v-userheader v-bind:show-edit="false"></v-userheader>
                <div class="quote-tab">
                    <div class="top-tab-wrapper">
                        <a :class='{cur:item.Id==id}' v-for="item in priceData.MetalCategory" @click="tab(item.Id)">
                            <span>{{item.MetalCategory}}</span>
                        </a>
                    </div>
                    <span class="cat-handler" @click="isShow = !isShow"></span> 
                    <transition name="cat-fade-out">
                        <div class="cat-layout" v-if="!isShow" @click="isShow = !isShow">
                            <div class="cat-cont">
                                <a :class='{cur:item.Id==id}' v-for="item in priceData.MetalCategory" @click="tab(item.Id)">
                                    {{item.MetalCategory}}
                                </a>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
            <v-main :class="listData.length > 0?'quote-main':'quote-main quote-main-empty'"  :bottom-method="pullArticles" ref="bottom">
                <div class="quote-table" v-if="listData && listData.length>0">
                    <ul>
                        <li>
                            <a>
                                <div class="name-size">
                                    <p>名称/规格</p>
                                </div>
                                <div class="average-price">
                                    <div class="average-price-detail">
                                        均价/高低价格    
                                    </div>
                                </div>
                                <div class="rise-full">
                                    涨跌    
                                </div>
                            </a>
                        </li>
                        <li :class="{ 'up': item.Change > 0, 'down': item.Change < 0,'': item.Change == 0}" v-for="item in listData">
                            <a :href="'/quote/detail?id=' + item.Id+'&catId='+catId+'&VarietyCategoryId='+item.VarietyCategoryId">
                                <div class="name-size">
                                    <p>
                                        {{item.VarietyCategory}}<span v-if="item.OriginPlace">({{item.OriginPlace}})</span>
                                    </p>
                                    <em>
                                            {{item.Spec}}
                                    </em>
                                </div>
                                <div class="average-price">
                                    <div class="average-price-detail">
                                        <p>
                                            <b>{{item.DayAvg}}</b>
                                            {{item.Unit}}
                                        </p>
                                        <em>{{item.MinPrice}}-{{item.MaxPrice}}</em>
                                    </div>
                                </div>
                                <div class="rise-full">
                                    <p v-if="item.Change < 0">
                                        <i class="arrow arrow-down">↑</i>
                                        <span>{{Math.abs(item.Change)}}</span>
                                    </p>
                                    <p v-else-if="item.Change > 0">
                                        <i class="arrow arrow-up">↑</i>
                                        <span>{{item.Change}}</span>
                                    </p>
                                    <p v-else="item.Change == 0">
                                        <i class="line">0</i>
                                    </p>
                                    <em>{{item.ReleaseDate.replace(/\//g, '')}}</em>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- <div class="pull-up"><span>{{pullUpTitle}}</span></div> -->
                </div>
                <v-empty v-else v-bind:emptycont="'暂无相关内容'"></v-empty>
            </v-main>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.container{
    width: 100%;
    height: 100%;
}
.quote-w{
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    .quote{
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
        .quote-header{
            z-index: 4;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            .user-header{
                position: relative;
                z-index: 1;
                background: linear-gradient(-180deg, #FD8A6E 0%, #FE6C6C 100%);
            }
            .quote-tab {
                width: 100%;
                height: 34px;
                background: @color-white;
                .border-bottom();
                position: relative;
                .top-tab-wrapper {
                    white-space: nowrap;
                    overflow: hidden;
                    overflow-x: scroll;
                    padding-right: 34px;
                    &::-webkit-scrollbar {
                        display: none
                    }
                    a {
                        display: inline-block;
                        margin: 0 10px;
                        font-size: 15px;
                        color: @def-font-color;
                        line-height: 34px;
                        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
                        &.cur {
                            span{
                                position: relative;
                                z-index: 1;
                                display: block;
                                &:after{
                                    content:'';
                                    position: absolute;
                                    bottom: 0;
                                    height: 2px;
                                    width: 100%;
                                    background: #FD886E;
                                    left: 0;
                                }
                            }
                        } 
                    }
                }
                .cat-handler {
                    width: 34px;
                    height: 33px;
                    display: block;
                    background: @color-white;
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 3;
                    &:before {
                        content: "";
                        width: 10px;
                        height: 10px;
                        display: block;
                        border-right: 1px solid @subinfo-color;
                        border-bottom: 1px solid @subinfo-color;
                        .rotate(45deg);
                        position: absolute;
                        left: 10px;
                        top: 7px;
                        z-index: 5;
                    }
                    &:after {
                        content: "";
                        width: 1px;
                        height: 30px;
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 2px;
                        box-shadow: -3px 0 6px rgba(0,0,0,0.1);
                    }
                }
            }
            .cat-layout {
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                position: fixed;
                left: 0;
                top: 47px;
                z-index: 9;
                .cat-cont {
                    width: 100%;
                    background: @color-white;
                    padding: 5px 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    .flex();
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    a {
                        min-width: 73px;
                        display: inline-block;
                        padding: 0 5px;
                        margin: 7px 10px;
                        text-align: center;
                        font-size: 15px;
                        color: @def-font-color;
                        line-height: 30px;
                        background: @bg-color;
                        .border-radius(3px);
                        -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
                        &.cur {
                            background: @color-red;
                            font-size: 16px;
                            color: @color-white;
                        }
                    }
                    .cat-fold {
                        width: 100%;
                        height: 30px;
                        text-align: center;
                        .flex();
                        position: relative;
                        margin-top: 5px;
                        span {
                            width: 100%;
                            background: @color-white;
                            padding-top: 8px;
                            &:before {
                                content: "";
                                width: 10px;
                                height: 10px;
                                display: inline-block;
                                border-right: 1px solid @subinfo-color;
                                border-top: 1px solid @subinfo-color;
                                .rotate(-45deg);
                            }
                        }
                        &:after {
                            content: "";
                            width: 100%;
                            height: 1px;
                            display: block;
                            background: @border-color;
                            position: absolute;
                            //box-shadow: 0 -3px 6px rgba(0,0,0,0.2);
                        }
                    }
                }
            }
            .cat-fade-out-enter-active, .cat-fade-out-leave-active {
                -ms-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                -moz-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                -webkit-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                -o-transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
                transition: all .5s cubic-bezier(1.0, 0.2, 0.3, 1.0);
            }
            .cat-fade-out-enter, .cat-fade-out-leave-active {
                //opacity: 0;
                -ms-transform: translateY(-100%);
                -moz-transform: translateY(-100%);
                -webkit-transform: translateY(-100%);
                -o-transform: translateY(-100%);
                transform: translateY(-100%);
            }
        }
        .quote-main{
            padding: 0;
            top: 81px;
            bottom: 53px;
            overflow-y: auto;
            z-index: 1;
            position: absolute;
            left: 0;
            width: 100%;
            -webkit-overflow-scrolling: touch;
            em{
                font-style: normal;
            }
            .quote-tab{
                width: 100%;
                height: 34px;
                background: #ffffff;
                border-bottom: 1px solid #F9F9F9;
                position: relative;
                ul{
                    white-space: nowrap;
                    overflow: auto;
                    overflow-x: scroll;
                    padding-right: 34px;
                    line-height: 34px;
                    &::-webkit-scrollbar{
                        background: 0 0;
                        width: 0;
                        position: relative;
                    }
                    &::-webkit-scrollbar-track {
                        background: 0 0;
                    }
                    &::-webkit-scrollbar-thumb {
                        background: transparent;
                        border-radius: 10px;
                    }
                    &::-webkit-scrollbar-button {
                        width: 0;
                        height: 0;
                        display: none;
                    }
                    &::-webkit-scrollbar-corner {
                        background-color: transparent;
                    }
                    li{
                        padding: 0 10px;
                        display: inline-block;
                        overflow-x: scroll;
                        &::-webkit-scrollbar{
                            background: 0 0;
                            width: 0;
                            position: relative;
                        }
                        &::-webkit-scrollbar-track {
                            background: 0 0;
                        }
                        &::-webkit-scrollbar-thumb {
                            background: transparent;
                            border-radius: 10px;
                        }
                        &::-webkit-scrollbar-button {
                            width: 0;
                            height: 0;
                            display: none;
                        }
                        &::-webkit-scrollbar-corner {
                            background-color: transparent;
                        }
                    }
                    .cur{
                        a{
                            position: relative;
                            z-index: 1;
                            &:after{
                                content:'';
                                position: absolute;
                                bottom: 0;
                                height: 2px;
                                width: 100%;
                                background: #FD886E;
                                left: 0;
                            }
                        }
                    }
                }
                ul::-webkit-scrollbar {
                    display: none;
                }
                .cat-handler{
                    width: 34px;
                    height: 33px;
                    display: block;
                    background: @color-white;
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 3;
                    &:before {
                        content: "";
                        width: 10px;
                        height: 10px;
                        display: block;
                        border-right: 1px solid @subinfo-color;
                        border-bottom: 1px solid @subinfo-color;
                        .rotate(45deg);
                        position: absolute;
                        left: 10px;
                        top: 7px;
                        z-index: 5;
                    }
                    &:after {
                        content: "";
                        width: 1px;
                        height: 30px;
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 2px;
                        box-shadow: -3px 0 6px rgba(0,0,0,0.1);
                    }
                }
            }
            .quote-table{
                ul{
                    li{
                        a{
                            display: block;
                            .flex();
                            padding: 4px 3.7%;
                            text-align: center;
                            border-bottom: 1px solid #f9f9f9;
                            box-sizing: border-box;
                            align-items: center;
                        }
                        .name-size,.average-price,.rise-full{
                            flex: 1 1 0;
                        }
                        .name-size{
                            text-align: left;
                            flex-grow: 1.8;
                            margin: 0 10px 0 0;
                            // display: flex;
                            // align-items: center;
                            // justify-content: flex-start;
                        }
                        .rise-full{
                            text-align: right;
                        }
                        .average-price{
                            text-align: left;  
                            flex-grow: 2;      
                        }
                        &:first-child{
                            color: #202020;
                            font-family: PingFangSC-Medium;
                        }
                        p{
                            font-size: 13px;
                            color: #202020;
                            b{
                                font-weight:normal;
                                display: inline-block;
                                width: 58px;
                            }
                            sub{
                                font-size: 10px;
                            }
                        }
                        em{
                            font-size: 10px;
                            color: #717171;
                        }
                    }
                    .up{
                        p{
                            color: #FF4040;
                        }
                    }
                    .down{
                        p{
                            color: #4CC166;
                        }
                    }
                    .rise-full{
                        .line{
                            position: relative;
                            z-index: 1;
                            width: 10px;
                            margin: 0 auto;
                            text-align: center;
                            display: inline-block;
                            color: #000;
                            font-style: normal;
                            // &:before{
                            //     position: absolute;
                            //     z-index: 2;
                            //     width: 10px;
                            //     height: 1px;
                            //     background: #000;
                            //     content: '';
                            //     left: 50%;
                            //     margin-left: -5px;
                            // }
                        }
                        .arrow{
                            position: relative;
                            z-index: 1;
                            text-indent:-9999px;
                            display: inline-block;
                            width: 10px;
                            margin: 0 auto;
                            text-align: center;
                            &:before{
                                content: "";
                                width: 4px;
                                height: 4px;
                                display: block;
                                position: absolute;
                                z-index: 5;
                            }
                            &:after{
                                content: "";
                                width: 1px;
                                height: 12px;
                                position: absolute;
                                top: 4px;
                                left: 2px;
                            }
                        }
                        .arrow-up{
                            &:before{
                                transform: rotate(225deg);   
                                border-right: 1px solid #FF4040;
                                border-bottom: 1px solid #FF4040;
                                top: 4px;
                            }
                            &:after{
                                background: #FF4040;
                            }
                        }
                        .arrow-down{
                            &:before{
                                transform: rotate(45deg);
                                border-right: 1px solid #4CC166;
                                border-bottom: 1px solid #4CC166;
                                top: 10px;
                            }
                            &:after{
                                background: #4CC166;
                            }
                        }
                    }
                } 
                .pull-up{
                    width: 100%;
                    height: 40px;
                    text-align: center;
                    font-size: 14px;
                    line-height: 40px;
                    padding: 0;
                    color: #9a9ca7;
                }
            }
        }
        .quote-main-empty{
            .pull-up{
                display: none;
            }
        }
        .pub-empty{
            .flex-column();
            @media screen and (min-width:320px) and (max-width: 374px){
                min-height: 360px;
            }
            min-height: 500px;
            img{
                width: 60%;
                margin: 0 auto;
                display: block;
            }
            p{
                text-align: center;
                font-size: 14px;
                color: #717171;
                line-height: 34px;
                padding-bottom: 100px;
            }
        } 
    }
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store'
export default {
        computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
        data(){
            return {
                loading:true,                           //loading动画
                priceData:'',                           //价格数据
                isShow: true,                           //导航下拉 弹窗是否展示
                id:1,                                   //类别id 默认钴锂
                page: 1,                                //分页，初始值为1   
                listData: [],                           //列表数据
                isMore: true,                           //判断是否有更多数据
                pullUpTitle: '没有更多数据了哦',         //下拉加载文本 
                catId: 1                                //类别id
            }
        },
        mounted () {
            this.$store.dispatch('set_usercenter_title','国内报价');
            this.$store.dispatch('set_channel_cur','quote');
            Storage.set('ljh5url', {preUrl: Storage.get('ljh5url') ? Storage.get('ljh5url').curUrl : "", curUrl: window.location.href});
            if(this.$route.query.catId){
                this.tab(this.$route.query.catId);
            }else{
                this.getPrice(this.id,this.page);        
            }
        },
        methods:{
            getPrice(id,page){
                this.loading = true;
                this.$http.get(API.getQuoteList,{params:{id:this.id,pageIndex:page}})
                .then((response)=>{
                    if(response.data.code && response.data.code == "200"){
                        this.priceData = response.data.data;
                        if(this.page == 1){
                            this.listData = this.priceData.PriceResult.list;
                        }else{
                            this.listData = this.listData.concat(this.priceData.PriceResult.list);
                        }
                    }
                    this.loading = false;
                }, (response)=>{
                    this.loading = false;
                });
            },
            tab(id){
                this.id = id;
                this.page = 1;
                this.$el.querySelector('.quote-main').scrollTop = 0;
                this.isMore = true;
                this.catId = id;
                this.$refs.bottom.setTranslate(-10,'');                     //清空文本文字
                this.getPrice(id,this.page);              
            },
            pullArticles(){
                if(this.isMore){
                    if(this.page==0){
                        this.page=1;
                    } else {
                        this.page++;
                    }
                    this.$http.get(API.getQuoteList,{params:{id:this.id,pageIndex:this.page}})
                    .then((response)=>{
                        this.loading = false;
                        this.priceData = response.data.data;
                        if(response.data.data && this.priceData.PriceResult.list && this.priceData.PriceResult.list.length> 0) {
                            for(var key in this.priceData.PriceResult.list){
                                this.listData.push(this.priceData.PriceResult.list[key]);
                            }
                        } else {
                            this.isMore = false;
                            this.$refs.bottom.clearTranslate();
                            //this.total = response.data.total;
                        }
                    }, (response)=>{
                        this.loading = false;
                        //console.log(response.data);
                    });
                    this.$refs.bottom.setTranslate(-10,'玩命加载中...');
                }
            }
        }
    }
</script>