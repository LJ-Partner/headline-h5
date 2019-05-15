<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="course-fixed-bar">
            <a href="javascript:;" class="bar-detail">
                <div class="bar-detail-logo">
                    <img src="https://p.maicai360.cn/img/get/20180417/24067636595564069687567_png">
                    <p>旺材有料</p>
                </div>
                <a href="http://app.51wctt.com/" class="open">立即打开</a>
            </a>
        </div>
        <v-main class="course-share-w" v-if="!loading" :bottom-method="pullList"  ref="bottom">
            <div class="course-main">
                <div class="main-info">
                    <div class="info-top">
                        <span class="top-cover" v-if="courseDetail.ClassImage">
                            <img :src="courseDetail.ClassImage" />
                        </span>
                        <h1 v-if="courseDetail.ClassName">{{courseDetail.ClassName}}</h1>
                        <p v-if="courseDetail.Teacher">{{courseDetail.Teacher}}</p>
                    </div>
                    <div class="info-audio">
                        <div class="audio-container">
                            <div class="player-wrap" id="playerWrap">
                                <button class="i-play" @click="togglePlaying">
                                    <i class="ljh5-icons " :class="playing?'ljh5-zanting':'ljh5-bofang1'"></i>
                                </button>
                                <div class="play-progress">
                                    <div class="progress-title">{{courseDetail.ClassName}}</div>
                                    <input class="progress-range" v-on:input="clickRange"  type="range" min="0" max="100" :value="inputVal" :data-current="format(currentTime)" :data-max="format(duration)" :data-total="duration"/> 
                                    <!-- <div class="range-input">
                                        <input type="range" class="range" min="0" max="100" value="0" :data-current="format(currentTime)" :data-max="format(duration)">
                                        <span class="range-val"></span>
                                    </div> -->
                                </div>
                                <audio :src="courseDetail.Media" ref="audio" @timeupdate="updateTime" @ended="end" preload @loadedmetadata="onLoadedmetadata"></audio>
                            </div>
                        </div>
                    </div> 
                    <div class="info-pictures" v-if="courseDetail.imageList && courseDetail.imageList.length > 0">
                        <div class="pic-title">
                            <!-- <span class="arrow pre" slot="button-prev"></span> -->
                             <p>本节PPT {{curIndex}}/{{courseDetail.imageList.length}}</p>  
                            <!-- <span class="arrow nex" slot="button-next"></span> -->
                        </div>
                        <div class="pic-group">
                            <swiper :options="swiperOption" ref="mySwiper">
                                <div class="swiper-button-prev arrow pre" slot="button-prev"></div>
                                <div class="swiper-button-next arrow nex" slot="button-next"></div>
                                <swiper-slide class="swiper-item" v-for="(item, index) in courseDetail.imageList">
                                    <span class="item-img">
                                        <img :src="item">
                                    </span>
                                </swiper-slide>
                                <div v-if="courseDetail.imageList.length >=2" class="swiper-pagination"  slot="pagination"></div>
                            </swiper>
                            <p class="fullscreen">
                                <i class="ljh5-icons ljh5-fangda"></i>
                            </p>
                        </div>
                    </div> 
                    <div class="info-text" v-if="courseDetail.details" v-html="courseDetail.details"></div>
                </div> 
                <div class="main-comment">
                    <div class="comment-title">
                        <h2>精选留言</h2>
                        <p>
                            <i class="ljh5-icons ljh5-shuxie"></i>
                            <span>留言</span>
                        </p>
                    </div>
                    <div class="comment-list" v-if="commentList && commentList.length > 0">
                        <dl class="list-item" v-for="item in commentList">
                            <dt>
                                <img src="/Api/V1/User/Avatar/38" />    
                            </dt>
                            <dd>
                                <h3>
                                    <span class="username">{{item.Nickname}}</span>
                                    <span class="prise">
                                        <i class="ljh5-icons ljh5-dianzan2"></i>
                                        <em>{{item.LikeCount}}</em>
                                    </span>
                                </h3> 
                                <p>
                                    {{item.ContentMgs}}    
                                </p>  
                                <span class="date">{{item.CreateTime.split(' ')[0].replace(/\//g,'-')}}</span> 
                                <div class="sub-list" v-if="item.ContentRly">
                                    <dl>
                                        <dd>
                                            <h3>
                                                <span class="username">作者回复</span>
                                            </h3> 
                                            <p>
                                                {{item.ContentRly}}    
                                            </p>  
                                            <span class="date">{{item.RlyCreateTime.split(' ')[0].replace(/\//g,'-')}}</span> 
                                        </dd>    
                                    </dl>
                                </div>
                            </dd>    
                        </dl>
                        <p class="list-bottom">
                            以上留言由 作者 筛选显示
                        </p>
                    </div>
                    <div class="comment-empty" v-else>
                        <img src="https://p.maicai360.cn/img/get/20180508/27771636613677739707625_png" />
                        <p>旺友，请上座！</p>
                    </div>
                </div>
            </div>
        </v-main>
    </v-content>
</template>
<style lang="less">
    @import '../../libs/static/less/mixins.less';
    .course-fixed-bar{
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 999;
        height: 43px;
        background: #2C2E34;
        .bar-detail{
            background: #2C2E34;
            box-sizing: border-box;
            padding: 7px 20px;
            .flex();
            justify-content: space-between;
            font-family: PingFangSC-Regular;
            color: #fff;
            height: 43px;
            box-sizing: border-box;
            .bar-detail-logo{
                .flex();
                justify-content: flex-start;
                align-items: center;
                img{
                    margin: 0 6px 0 0;
                    flex: 0 0 30px;
                    height: 30px;
                    display: flex;
                }
                p{
                    font-size: 16px;
                }
            }
            .open{
                border: 1px solid #F87F5B;
                border-radius: 3px;
                color: #F87F5B;  
                padding:0 9px;
                font-size: 16px; 
            }
        }
    }
    .course-share-w{
        background: #F2F2F2;
        top: 42px;
        bottom: 0;
        z-index: 1;
        padding: 0;
        p{
            word-break: break-all;
            word-wrap: break-word;
        }
        .course-main{
            position: relative;
            z-index: 1;
            .main-info{
                .info-top{
                    border: 1px solid #F2F2F2; 
                    background: #fff;
                    span{
                        width: 100%;
                        height: 0;
                        padding: 0 0 48%;
                        display: block;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                    }
                    h1{
                        font-size: 24px;
                        color: #202020;   
                        padding: 10px 14px; 
                    }
                    p{
                        font-size: 18px;
                        color: #717171;    
                        padding: 0 14px 10px 14px;
                    }
                }
                .info-audio{
                    padding: 14px 14px 0 14px;
                    background: #fff;
                    .audio-container{
                        border: 1px solid #f2f2f2;  
                        height: 64px;
                        box-sizing: border-box;  
                        background: #fff;   
                        .flex();
                        .player-wrap {
                            .flex();
                            justify-content: flex-start;
                            background: #f2f2f2;
                            .i-play{
                                border: none;
                                flex: 0 0 65px;
                                width: 65px;
                                margin: 0 15px 0 0;
                                background: #f2f2f2;
                                i{
                                    font-size: 40px;
                                    color: #F87F5B;
                                }
                            }
                            .play-progress{
                                flex: 1 1 auto;
                                margin: 0 18px 0 0;
                                .progress-title{
                                    padding: 2px 0;
                                    .multi-ellipsis(1);
                                } 
                                input[type=range] { 
                                    outline: none;   
                                    -webkit-appearance: none;/*清除系统默认样式*/    
                                    width:100% !important;    
                                    background: -webkit-linear-gradient(#F87F5B, #F87F5B) no-repeat, #ddd;    
                                    background-size: 0 100%;/*设置左右宽度比例*/    
                                    height: 3px;/*横条的高度*/ 
                                    position: relative;
                                    z-index: 1;
                                    top: -10px;
                                }
                                 /*拖动块的样式*/    
                                input[type=range]::-webkit-slider-thumb {    
                                    -webkit-appearance: none;/*清除系统默认样式*/    
                                    height:10px;/*拖动块高度*/    
                                    width: 10px;/*拖动块宽度*/    
                                    background: #F87F5B;/*拖动块背景*/    
                                    border-radius: 50%; /*外观设置为圆形*/    
                                    border: solid 1px #F87F5B; /*设置边框*/   
                                }
                                .progress-range{
                                    &:before{
                                        position: absolute;
                                        top: 12px;
                                        font-size: 12px;
                                        left: 0;
                                        content: attr(data-current);
                                        color: #b1b1b1;
                                    }
                                    &:after{
                                        position: absolute;
                                        top: 12px;
                                        font-size: 12px;
                                        right: 0;
                                        content: attr(data-max);
                                        color: #b1b1b1;
                                    }
                                }   
                            }
                        } 
                    }
                }
                .info-pictures{
                    background: #fff;
                    padding: 0 14px 10px 14px;
                    margin: 0 0 7px 0;
                    position: relative;
                    z-index: 1;
                    .pic-title{
                        .flex();
                        padding: 21px 0;
                        text-align: center;
                        span{
                            display: flex;
                            width: 20px;
                            height: 20px;
                            flex: 0 0 20px;
                            background: rgba(248,127,91,0.25);
                            border-radius: 50%;
                        }
                        p{
                            flex: 1 1 auto;
                        }
                    } 
                    .pic-group{
                        background: #D8DBD8;
                        border-radius: 3px;   
                        width: 100%; 
                        height: 195px;
                        overflow: hidden;
                        .swiper-container{
                            position: static;
                            .item-img{
                                display: block;
                                height: 0;
                                padding: 0 0 59%;
                                overflow: hidden;
                                border-radius: 5px;
                                img{
                                    max-width: 100%;
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
                                background: #F87F5B;
                            }
                            .arrow{
                                position: absolute;
                                z-index: 10;
                                background-image: none;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background: rgba(248, 127, 91, 0.25);
                                top: 20px;
                                margin:0;
                                -webkit-tap-highlight-color:rgba(255,255,255,0);
                                -webkit-appearance:none;
                                outline:none;
                                &:after{
                                    content: "";
                                    width: 7px;
                                    height: 7px;
                                    display: block;
                                    border-right: 1px solid #717171;
                                    border-bottom: 1px solid #717171;
                                    position: absolute;
                                    top: 6px;
                                    z-index: 5;
                                }
                            }
                            .pre{
                                &:after{
                                    left: 8px;
                                    transform: rotate(135deg);
                                }
                            }
                            .nex{
                                &:after{
                                    transform: rotate(-45deg);   
                                    left: 5px;  
                                }
                            }
                        }
                        .fullscreen{
                            position: absolute;
                            right: 20px;
                            bottom: 10px;
                            z-index: 10;
                            color: #fff;
                        }
                    }  
                }
                .info-text{
                    padding: 10px 14px;
                    background: #fff;
                    border-bottom:  1px solid #D8D8D8;;
                }
            }
            .main-comment{
                padding: 0 14px;
                .comment-title{
                    .flex();
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #D8D8D8;
                    h2{
                        font-size: 16px;
                        color: #202020;
                        flex: 1 1 auto;
                        padding: 10px 0;
                    }
                    p{
                        flex: 0 0 75px;
                        background: #F87F5B;
                        border-radius: 100px;
                        text-align: center;
                        height: 26px;
                        color: #fff;
                    }
                }
                .comment-list{
                    padding: 14px 0;
                    .list-item{
                        .flex();
                        margin: 0 0 20px 0;
                        dt{
                            width: 30px;
                            height: 30px;
                            flex: 0 0 30px;
                            overflow: hidden;
                            border-radius: 50%;
                            margin: 0 4px 0 0;
                            img{
                                width: 30px;
                                height: 30px;
                            }
                        }
                        dd{
                            flex: 1 1 auto;
                            //border-bottom: 1px solid #D8D8D8;
                            h3{
                                .flex();
                                justify-content: space-between;
                                font-family: PingFangSC-Regular;
                                font-size: 15px;
                                color: #A79475;
                                padding: 6px 0;
                                i{
                                    color:#cacaca;
                                }
                                em{
                                    font-style: normal;
                                }
                            }
                            p{
                                font-size: 14px;
                                color: #202020;
                            }
                            .date{
                                font-size: 12px;
                                color: #717171;
                            }
                            .sub-list{
                                border-top: 1px solid #D8D8D8;    
                            }
                        }
                    }
                    .list-bottom{
                        padding: 34px 0 16px 0;
                        text-align: center;
                        font-size: 15px;
                        color: #9C9C9C;
                    }
                }
                .comment-empty{
                    padding: 31px 0 25px 0;
                    text-align: center;
                    font-size: 14px;
                    color: #CACACA;
                    img{
                        width: 24%;
                        margin: 0 0 0 8%;
                    }   
                }
            }
        }
        .pull-up{
            height: 0;
        }
    }
</style>
<script>
import API from '../../config/api.js'
import Storage from 'store'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data(){
        return {
            page: 1,
            curIndex: 0,
            loading:true,
            inputVal:'0',
            sliderTime: 0,
            duration: 0,                                                //播放总时长
            currentTime:0,                                              //播放时间
            playing:false,                                              //是否播放
            isMore: true,                                               //是否有更多数据
            userId: '',                                                 //用户id  
            courseDetail:{},                                            //课程详情    
            commentList:[],                                             //留言列表
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',
                slidesPerView: 1,
                paginationClickable: true,
                //autoplay: 2000,
                //loop: true,
                onSlideChangeEnd: swiper => {  
                    //这个位置放swiper的回调方法  
                    this.curIndex = swiper.activeIndex + 1;
                },  
                onInit: swiper => {
                    this.curIndex = swiper.activeIndex + 1;
                },
                prevButton: '.swiper-button-prev',//上一张
                nextButton: '.swiper-button-next'//下一张
            },
            swiperOption2: {
                slidesPerView: 1,
                simulateTouch: true,
                DOManimation:false,
                direction: 'horizontal'
            }               
        }    
    },
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        if(Storage.get("ljh5user")){
            this.userId = Storage.get("ljh5user").user_id;
        }
        this.getCourseDetail(1,this.userId);
        this.getCommentList(1,1);  
    },
    methods:{
        //获取课程详情
        getCourseDetail(id,uid){
            this.$http.get('http://api.51wctt.com:50010/CourseMaster/ClassDetails',{params:{
                    id: id,
                    uid: uid
                }})
            .then((response)=>{
                this.loading = false;
                if(response.data && response.data.code == '200'){
                    this.courseDetail = response.data.data;
                }
            }, (response)=>{
                console.log(response.data);
            });    
        },  
        //获取评论列表
        getCommentList(classId,pageIndex){
            this.$http.get('http://api.51wctt.com:50010/Message/List',{params:{
                    classId: classId,
                    pageIndex: pageIndex
                }})
            .then((response)=>{
                if(response.data && response.data.code == '200'){
                    if(response.data.data.length > 0){
                        this.commentList = this.commentList.concat(response.data.data);
                    }else{
                        this.isMore = false;     
                    }
                }
            }, (response)=>{
                console.log(response.data);
            });     
        },
        //设置点击播放按钮方法
        togglePlaying(){
            this.playing = !this.playing;                       //改变全局变量playing 的属性
        },
        //下拉加载数据
        pullList(){
            if(this.isMore){
                if(this.page==0){
                    this.page=1;
                } else {
                    this.page++;
                }
                this.getCommentList(1,this.page); 
            }
        },
        format(interval){
            interval = interval | 0;
            const minute = interval/60 | 0;
            const second = this._pad(interval % 60);
            return `${minute}:${second}`;      
        },
        clickRange(){
            var  u = parseInt(this.$el.querySelector('.progress-range').getAttribute('data-total'));
            var  t = this.$el.querySelector('.progress-range').value , a = parseInt(t / 100 * u);
            this.$el.querySelector('.progress-range').style.backgroundSize=  t + '%' + '100%';
            this.update(a);   
        },
        updateTime(e){
            this.currentTime = e.target.currentTime;                                                                    // 获取当前播放时间段
            this.sliderTime = parseInt(this.currentTime / this.duration * 100);
            this.$el.querySelector('.progress-range').style.backgroundSize=  this.sliderTime + '%' + '100%'; 
            this.inputVal = this.sliderTime;
        },
        update(v){
            this.$el.querySelector('.progress-range').setAttribute("data-current", this.format(v))
            // var r = Math.round(e / i * 100)
            // , s = " input[type=range]::-webkit-slider-thumb"
            // , o = "{background-position: " + r + "% 50%;}"
            // , d = this.$el.querySelector("input")
            // , u = "input[type=range]::-webkit-slider-runnable-track"
            // , l = "{background: -webkit-linear-gradient(left, #ffa42f 0%, #ffa42f " + r + "%, #dddddd " + r + "%);}";
            // "manual" == n ? "playing" == this.status ? (t("player-dot" + this.index, s + o),
            // t("player-pos" + this.index, u + l),
            // d.setAttribute("data-current", a(e))) : (t("player-dot" + this.index, s + o),
            // t("player-pos" + this.index, u + l),
            // d.setAttribute("data-current", a(e))) : "auto" == n && "seeking" != this.action && (d.val(r),
            // t("player-dot" + this.index, s + o),
            // t("player-pos" + this.index, u + l),
            //console.log(e)
            
            //this.currentTime = this.format(e); 
        },
        _pad(num,n=2){
            let len = num.toString().length;
            while(len<n){
                num = '0' + num;
                len ++;
            }
            return num;
        },
        updateDuration (state, time) {
            state.duration = time
        },
        onLoadedmetadata(res){
            this.duration = parseInt(res.target.duration);
        },
        end(e){
            this.$el.querySelector('.progress-range').style.backgroundSize=   '0' + '100%'; 
            this.playing = false;
        }
    },
    // 然后watch 监听playing 操作实际的audio 标签的播放暂停
    watch:{
        playing(newPlaying){
            let audio = this.$refs.audio;
            this.$nextTick(() => {
                newPlaying ? audio.play():audio.pause();
            })
        }
    },    
    }
</script>