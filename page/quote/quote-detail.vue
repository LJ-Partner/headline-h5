<template>
    <v-content>
        <v-loading v-bind:isloading="loading"></v-loading>
        <div class="quote-detail-w">
            <div class="quote-detail">
                <div class="quote-detail-bg">
                    <div class="quote-detail-header">
                        <a class="back" v-on:click="goBack()">
                            <i class="ljh5-icons ljh5-fanhui"></i>
                        </a>
                        <p>{{title}}<span v-if="quoteDetailData.OriginPlace">({{quoteDetailData.OriginPlace}})</span></p>
                        <a class="share" v-show="isSelfApp" v-on:click="shareBoard()">
                            <i class="ljh5-icons ljh5-zhuanfa"></i>
                        </a>
                    </div>
                    <div class="quote-detail-echars-w">
                        <div class="echars-title">
                            <h2>{{Number(this.toPercent(quoteDetailData.Rete)) || 0}}<sub>%</sub></h2>
                            <span>涨跌率</span>
                        </div>
                        <div class="echars-cnt" id="myChart"></div>
                    </div>
                </div>
                <div class="quote-detail-info">
                    <div class="price-box">
                        <dl v-if="quoteDetailData.MaxPrice && quoteDetailData.MaxPrice != null">
                            <dt>{{quoteDetailData.MaxPrice}}</dt>
                            <dd>最高价格</dd>
                        </dl>
                        <dl v-if="quoteDetailData.MinPirce && quoteDetailData.MinPirce != null">
                            <dt>{{quoteDetailData.MinPirce}}</dt>
                            <dd>最低价格</dd>
                        </dl>
                        <dl v-if="quoteDetailData.DayAvg && quoteDetailData.DayAvg != null">
                            <dt>{{quoteDetailData.DayAvg}}</dt>
                            <dd>均价</dd>
                        </dl>
                    </div>
                    <div class="info-box">
                        <dl v-if="quoteDetailData.WeekAvg && quoteDetailData.WeekAvg != null">
                            <dt>
                                <i></i>
                                <span>周均价</span>
                            </dt>
                            <dd>{{quoteDetailData.WeekAvg}}</dd>
                        </dl>
                        <dl v-if="quoteDetailData.MonthAvg && quoteDetailData.MonthAvg != null">
                            <dt>
                                <i></i>
                                <span>月均价</span>
                            </dt>
                            <dd>{{quoteDetailData.MonthAvg}}</dd>
                        </dl>
                         <dl v-if="quoteDetailData.Spec && quoteDetailData.Spec != null">
                            <dt>
                                <i></i>
                                <span>规格</span>
                            </dt>
                            <dd>{{quoteDetailData.Spec}}</dd>
                        </dl> 
                        <dl v-if="quoteDetailData.Unit && quoteDetailData.Unit != null">
                            <dt>
                                <i></i>
                                <span>单位</span>
                            </dt>
                            <dd>{{quoteDetailData.Unit}}</dd>
                        </dl>
                        <dl v-if="quoteDetailData.Change && quoteDetailData.Change != null">
                            <dt>
                                <i></i>
                                <span>涨跌</span>
                            </dt>
                            <dd :class="{ 'up': quoteDetailData.Change > 0, 'down': quoteDetailData.Change < 0,'': quoteDetailData.Change == 0}">
                                <p v-if="quoteDetailData.Change < 0" >
                                    <i class="arrow arrow-down">↑</i>
                                    <span>{{Math.abs(quoteDetailData.Change)}}</span>
                                </p>
                                <p v-else-if="quoteDetailData.Change > 0">
                                    <i class="arrow arrow-up">↑</i>
                                    <span>{{quoteDetailData.Change}}</span>
                                </p>
                                <p v-else>
                                    <span>{{quoteDetailData.Change}}</span>    
                                </p>
                            </dd>
                        </dl>
                        <dl v-if="quoteDetailData.UpdateDate && quoteDetailData.UpdateDate != null">
                            <dt>
                                <i></i>
                                <span>更新日期</span>
                            </dt>
                            <dd>{{quoteDetailData.UpdateDate.replace(/-/g,'/')}}</dd>
                        </dl>
                    </div>
                </div>
            </div>    
        </div>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
button,a{
    -webkit-tap-highlight-color:rgba(255,255,255,0)
}
.quote-header{
    background: #FE6C6C;
}
.quote-detail-w{
    font-family: PingFangSC-Regular;
    .quote-detail{
        .quote-detail-bg{
            background: linear-gradient(-180deg, #FD8A6E 0%, #FE6C6C 100%) !important;
            .quote-detail-header{
                width: 100%;
                height: 46px;
                padding: 0px 15px;
                color: #ffffff;
                line-height: 46px;   
                position: relative;
                z-index: 1; 
                .flex();
                p{
                    text-align: center;
                    font-size: 18px;
                    flex: 1 1 auto
                }
                .back{
                    font-size: 15px;
                    color: #ffffff;
                    i{
                        font-size: 18px;
                        padding-right: 2px;
                    }
                }
                .share{
                    i{
                        font-size: 18px;
                        color: #fff;
                    }
                }
            }
            .quote-detail-echars-w{
                height: 240px;            
                position: relative;
                z-index: 1;
                bottom: -8px;
                .echars-title{
                    position: absolute;
                    z-index: 2;
                    left: 8%;
                    color: #fff;
                    top: 0;
                    h2{
                        font-size: 28px;
                        font-family: PingFangSC-Regular;
                        letter-spacing: 1px;
                        line-height: 25px;
                        sub{
                            font-size: 18px;
                            top: -6px;
                            position: relative;
                            z-index: 1;
                        }
                    }
                    span{
                        font-size: 10px;
                        position: relative;
                        z-index: 1;
                        top: -10px;
                    }
                }
                .echars-cnt{
                    height: 100%;
                }
            }
        }
        .quote-detail-info{
            background: #fff;
            .price-box{
                .flex();
                text-align: center;
                margin: 0 10px;
                box-shadow: 0 2px 4px 0 #DFC0BC;
                background: #fff;
                box-sizing: border-box;
                position: relative;
                top: -20px;
                z-index: 1;
                dl{
                    flex: 1 1 auto;
                    padding: 5px 0;
                    font-family: PingFangSC-Regular;
                    dt{
                        font-size: 16px;
                        color: #FF4040;
                    }
                    dd{
                        font-size: 10px;
                        color: #717171;                
                    }
                }    
            }
            .info-box{
                dl{
                    .flex();
                    justify-content: space-between;
                    margin: 0 7.3%;    
                    border-bottom: 1px solid #f2f2f2;
                    padding: 2% 0;
                    dt{
                        .flex();
                        flex: 1 1 auto;
                        justify-content: flex-start;
                        align-items: center;
                        i{
                            width: 11px;
                            height: 11px;
                            background: transparent; /* Can be set to transparent */
                            border-radius: 11px;
                            display: block;
                            margin: 0 2% 0 0;
                        }
                        span{
                            font-size: 15px;
                            color: #202020;
                        }
                        
                    }
                    dd{
                        font-size: 15px;
                        color: #202020;
                        p{
                            i{
                                font-style: normal;
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
                    .up{
                        color:#FF4040;
                    }
                    .down{
                        color: #4CC166;
                    }
                    &:nth-child(1){
                        dt{
                            i{
                                border: 3px #FDB92B solid;     
                            }
                        }
                    }
                    &:nth-child(2){
                        dt{
                            i{
                                border: 3px #86ECF4 solid;     
                            }
                        }
                    }
                    &:nth-child(3){
                        dt{
                            i{
                                border: 3px #799CF5 solid;     
                            }
                        }
                    }
                    &:nth-child(4){
                        dt{
                            i{
                                border: 3px #F486EC solid;     
                            }
                        }
                    }
                    &:nth-child(5){
                        dt{
                            i{
                                border: 3px #FC793E solid;     
                            }
                        }
                    }
                    &:nth-child(6){
                        dt{
                            i{
                                border: 3px #8FD159 solid;     
                            }
                        }
                    }
                }
            }
        } 
    }
}

</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import CryptoJS from 'crypto-js'
import Storage from 'store'
import wx from 'weixin-js-sdk'
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/line');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
var u = navigator.userAgent;
//android终端                                     
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   
//ios终端                  
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export default {
        computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
        data(){
            return {
                user_id:'',
                loading:true,                                               //loading动画
                quoteDetailData:'',                                         // 数据对象
                chart: null,                                                // 初始化空对象
                loading:false,                                              //loading动画 默认true
                id: '',                                                     //单个id
                title: '',                                                  //标题
                shareData:{     //微信分享自定义内容
                    title: '今日旺材行情',
                    imgUrl: 'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                    desc: '旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台',
                    link: 'https://m.maicai360.cn'+this.$route.path+'?id='+this.$route.query.id+'&catId='+this.$route.query.catId+'&VarietyCategoryId='+this.$route.query.VarietyCategoryId,
                    success(a){
                        //a.recordShare();         
                    }
                },
                appShareData:{
                    type:'',
                    id:'',
                    targetUrl: 'https://m.maicai360.cn'+this.$route.path+'?id='+this.$route.query.id+'&catId='+this.$route.query.catId+'&VarietyCategoryId='+this.$route.query.VarietyCategoryId,
                    thumbImageUrl:'http://p.maicai360.cn/img/get/2017-5-17%7Chlh5_71758_636306421367543995_030501192375381958/jpg',
                    title:'今日旺材行情',
                    content:'旺材新媒体旗下一款为行业用户量身定制寻求资源、行情、产经新闻、社交等内容为主的分发平台'    
                },
                isSelfApp: false
            }
        },
        mounted () {
            this.id = this.$route.query.id;
            this.$nextTick(function() {
                // this.drawLine();
                this.drawLine();
            });
            this.$store.dispatch('set_channel_cur','user');
            if (Storage.get("ljh5user") && this.$route.query.VarietyCategoryId && this.$route.query.VarietyCategoryId != "") {
                let user = Storage.get("ljh5user");
                this.user_id = user.user_id;
                this.AddVisitedHistory(this.user_id,this.$route.query.VarietyCategoryId);
            }
            this.isSelfApp = u.indexOf('maicai360_app') > -1; 
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
                                success(){
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
            //通过app分享
            appShareDetail(id,targetUrl,thumbImageUrl,title,content){
                if(isAndroid){
                    window.WCJSBridge.setShareOfActivity(id,targetUrl,thumbImageUrl, title, content);                                         
                }else if(isIOS){
                    WCJSBridge.setShareOfActivity(id,targetUrl,thumbImageUrl, title, content);    
                }
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let that = this;
                let map_xAxis=[];
                let map_series=[];
                let minPrice;
                let maxPrice;
                that.chart = echarts.init(document.getElementById('myChart'));
                that.$http.get(API.getQuoteDetail,{params:{id:that.id}})
                .then((response)=>{
                    if(response.data.code && response.data.code == "200"){
                        that.quoteDetailData = response.data.data;
                        that.title = that.quoteDetailData.VarietyCategory || '';
                        that.quoteDetailData.OriginPlace = that.quoteDetailData.OriginPlace || '';
                        that.quoteDetailData.Spec = that.quoteDetailData.Spec || '';
                        that.quoteDetailData.UpdateDate = that.quoteDetailData.UpdateDate.replace(/-/g, '/').substring(5) || '';
                        this.$store.dispatch('set_usercenter_title',that.title);
                        const map = that.quoteDetailData.WeekPrice;
                        //const map = [["07-09",60],["07-10",91],["07-11",92],["07-24",60],["07-25",44],["07-26",127],["07-27",114],["07-28",86],["07-29",73],["07-30",52],["07-31",69],["08-01",86],["08-02",118],["08-03",56],["08-04",91],["08-05",121],["08-06",127],["08-07",78],["08-08",79],["08-09",46],["08-10",46],["08-11",46],["08-12",46],["08-13",46],["08-14",149]];
                        map.forEach(function(value, key, mapObj) {
                            map_xAxis.push((value.Date.replace(/-/g, '/').substring(5)));
                            map_series.push(value.AvgPrice);
                            // map_xAxis.push(value[0].replace(/-/g, '/'));
                            // map_series.push(value[1]);
                        });
                        minPrice = Math.min.apply(null, map_series) || '';
                        maxPrice = Math.max.apply(null, map_series) || ''; 
                        that.shareData.desc = that.title + '('+that.quoteDetailData.OriginPlace +')'+ ' ' + that.quoteDetailData.Spec + ' ' + minPrice + '~' + maxPrice + ' ' + that.quoteDetailData.UpdateDate;
                        that.appShareData.content = this.shareData.desc;
                        that.getConfig(that.shareData);
                        if(that.isSelfApp){
                            that.appShareDetail('',that.appShareData.targetUrl,that.appShareData.thumbImageUrl,that.appShareData.title,that.appShareData.content);
                        }
                    }
                    that.loading = false;
                })
                .then((response)=>{
                    // 绘制图表
                    var option = {
                        grid:{
                            width: 'auto',
                            x: '20',
                            x2: '10',
                            bottom: '38px',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer : {         
                                // 坐标轴指示器，坐标轴触发有效  
                                type : 'line',
                                lineStyle:{
                                    color: '#fff'
                                }
                                // 默认为直线，可选为：'line' | 'shadow'  
                            }
                        },
                        xAxis: [{
                            boundaryGap: false,
                            data: map_xAxis,
                            axisLine: {
                                show: false
                            },
                            splitLine:{
                                show: false,
                                // lineStyle: {
                                //     // 分隔线线的类型
                                //     type: 'solid',
                                //     color: ['#fff']
                                // }
                            },
                            axisTick:{
                                show: false
                            }
                        }],
                        yAxis: [{
                            boundaryGap: false,
                            axisLabel:{
                                //inside: true
                            },
                            nameLocation: 'end',
                            //min: 0,
                            min:Math.min.apply(null, map_series),
                            max:Math.max.apply(null, map_series),
                            position: 'right',
                            splitLine: {
                                show: false,
                                // lineStyle: {
                                //     // 分隔线线的类型
                                //     type: 'solid',
                                //     color: ['#fff']
                                // }
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: false 
                        }],
                        toolbox: {
                            left: 'center',
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        dataZoom: [{
                            startValue: '07-09'
                        }, {
                            type: 'inside'
                        }],
                        series: {
                            type: 'line',
                            data: map_series,
                            itemStyle: {
                                normal: {
                                    color: "#fff",          // 会设置点和线的颜色，所以需要下面定制 line
                                    borderColor: "#fff",    // 点边线的颜色
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: "#fff",          // 线条颜色
                                }
                            },
                            //symbol: 'none',                 //去掉特定圆点
                            areaStyle: {
                                normal: {
                                    //面积部分阴影
                                    color: new echarts.graphic.LinearGradient(255, 255, 255, 1, [{
                                        offset: 0,
                                        color: 'rgba(255, 249, 246, 0.25)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(240, 240, 240, 0.25)'
                                    }])                              
                                }
                            },
                            markLine: {
                                silent: true,
                                data: [{
                                    yAxis: 50
                                }, {
                                    yAxis: 100
                                }, {
                                    yAxis: 150
                                }, {
                                    yAxis: 200
                                }, {
                                    yAxis: 300
                                }]
                            }
                        },
                        textStyle:{
                            color: '#fff'
                        }
                    };
                    var option2 = {
                        tooltip : {
                            trigger: 'axis',
                            position:function(p){   //其中p为当前鼠标的位置
                                return [p[0] - 10, p[1] + 10];
                            },
                            axisPointer: {
                                type: ''
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: map_xAxis,
                            axisLine: {
                                show: false
                            },
                            splitLine:{
                                show: false
                            },
                            axisTick:{
                                show: false
                            }
                        },
                        yAxis: {
                            show: false,
                            min:Math.min.apply(null, map_series),
                            max:Math.max.apply(null, map_series),
                            splitLine: {
                                show: false
                            }
                        },
                        series: [{
                            data: map_series,
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: "#fff",          // 会设置点和线的颜色，所以需要下面定制 line
                                    borderColor: "#fff",    // 点边线的颜色
                                    borderWidth: 3
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: "#fff",          // 线条颜色
                                    width: 3
                                }
                            }
                        }],
                        textStyle:{
                            color: '#fff'
                        }
                    };
                    that.chart.setOption(option);
                    // setTimeout(function (){  
                    //     window.onresize = function () {  
                    //         that.chart.resize();
                    //     }  
                    // },200);
                    window.addEventListener("resize",function() {  
                        that.chart.resize();  
                    });
                }, (response)=>{
                    this.loading = false;
                });
            },
            goBack(){
                if(this.isSelfApp){
                    //活动页面嵌入到app 返回app上一级 调用的方法
                    if(isAndroid){
                        window.WCJSBridge.onBack();  
                    }else{
                        WCJSBridge.onBack();     
                    }                    
                }else{
                    this.$router.push('/quote?catId='+this.$route.query.catId)
                    //this.$router.go({name: 'Quote', query: { name: '123' }});
                    //this.$router.go(-1);
                }
            },
            toPercent(point){
                let str = 0;
                if(point != 0){
                    str = Number(point*100).toFixed(2);
                }else{
                    str = 0;
                }
                return str;
            },
            AddVisitedHistory(_userid,_VarietyCategoryId){
                this.$http.post(API.quoteAddVisitedHistory,{userid:_userid,VarietyCategoryId:_VarietyCategoryId})
                .then((response)=>{
                    
                }, (response)=>{
                    console.log(response.data);
                });     
            },
            shareBoard(){
                if(isAndroid){
                    window.WCJSBridge.showShareBoard(this.appShareData.type,this.appShareData.id,this.appShareData.targetUrl,this.appShareData.thumbImageUrl,this.appShareData.title,this.appShareData.content);                                         
                }else if(isIOS){
                   WCJSBridge.showShareBoard(this.appShareData.type,this.appShareData.id,this.appShareData.targetUrl,this.appShareData.thumbImageUrl,this.appShareData.title,this.appShareData.content);    
                }    
             }
        }
    }
</script>