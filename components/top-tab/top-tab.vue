<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.top-tab {
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
            margin: 0;
            display: inline-block;
            padding: 0 10px;
            font-size: 15px;
            color: @def-font-color;
            line-height: 34px;
            -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
            &.cur {
                font-size: 16px;
                color: @color-red;
            }
        }
        a:first-child{
            position: relative;
            z-index: 1;
            // &.cur{
            //     &:before{
            //         background: #e10000;
            //     }    
            // }
            &:before{
                content: "";
                width: 4px;
                height: 4px;
                display: inline-block;
                border-radius: 50%;
                position: absolute;
                right: 5px;
                top: 5px;
                background: #f64040;
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
</style>
<template>
    <div class="top-tab">
        <div class="top-tab-wrapper" id="topTabWrapper">
            <a :class='{cur:item.articlecategory_id==get_article_num}' v-for="item in newLists.Category" :href="'/article/' + item.articlecategory_id">
                {{item.articlecategory_name}}
            </a>
        </div>
        <span class="cat-handler" @click="isFold = !isFold"></span>
        <transition name="cat-fade-out">
        <div class="cat-layout" v-if="!isFold" @click="isFold = !isFold">
            <div class="cat-cont">
                <a :class='{cur:item.articlecategory_id==get_article_num}' v-for="item in newLists.Category" :href="'/article/' + item.articlecategory_id">
                    {{item.articlecategory_name}}
                </a>
                <!--<div class="cat-fold" @click="isFold = !isFold"><span></span></div>-->
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
    import API from '../../config/api.js'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        computed: mapGetters(['get_article_num']),
        data() {
            return {
                lists: {

                },
                cur:this.$store.getters.get_article_num,
                orderLists: [],
                needcur:287,
                newLists: {
                    Category: []
                },
                isFold: true
            }
        },
        props : {
            shownav: true
        },
        mounted() {
            this.getArticleCategory();
        },
        updated() {
            let topTabWrapper = this.$el.querySelector("#topTabWrapper");
            let topTabWrapperW = topTabWrapper.scrollWidth;
            let screenW = document.body.scrollWidth;
            if (topTabWrapperW > screenW && this.newLists.Category && this.newLists.Category.length > 0) {
                let curItem = topTabWrapper.querySelector("a.cur");
                if (curItem && curItem.offsetLeft + curItem.offsetWidth > screenW) {
                    topTabWrapper.scrollLeft = curItem.offsetLeft - screenW / 2 + curItem.offsetWidth / 2;
                }
            }
        },
        methods: {
            getArticleCategory() {
                this.$http.get(API.allcategory)
                .then((response) => {
                    this.lists = response.data;
                    if(!this.$store.state.article) {
                        this.lists.Category.forEach((item, i) => {  
                            if (item.articlecategory_id == this.needcur) {
                                this.$store.dispatch('set_article_num',this.needcur);
                            } 
                        });
                    }
                    //console.log(response.data);
                    if(this.lists.Category && this.lists.Category.length > 0) {
                        for(var i=0; i<this.lists.Category.length; i++) {
                            this.orderLists.push(this.lists.Category[i].articlecategory_id);
                            for(var j=0; j<this.lists.Category.length; j++) {
                                if(this.orderLists[i] == this.lists.Category[j].articlecategory_id){
                                    this.newLists.Category.push(this.lists.Category[j]);
                                    //this.lists.Category.splice(j,1);
                                    //break;
                                }
                                //console.log("lists:-- " + this.lists.Category[j][0]);
                            }
                        }
                    }
                }, (response) => {
                    // console.log(response.data);
                });
            }
        }
    }

</script>