<template>
    <transition name="start-fade-out">
        <div class="start-w" v-if="show">
            <div class="start-head">
                <div class="start-countdown">
                    <span v-on:click="doopacity">跳过({{countdown}}s)</span>
                </div>
                <div class="start-show">
                    <span class="logo-mix">
                        <i class="ljh5-icons ljh5-Wtuxing"></i>
                        <i class="ljh5-icons ljh5-kouhaozi"></i>
                    </span>
                </div>
            </div>
            <a class="start" :href="startInfo.url?startInfo.url:''">
                <div class="start-cnt">
                    <div class="cnt-img" v-if="startInfo.image">
                        <img :src="startInfo.image" />
                    </div>
                    <div class="cnt-bottom">
                        <img src="https://p.maicai360.cn/img/get/20180507/11621636612979712627735_png" />
                        <p>Copyright @ 2017 51wctt.com All Rights Reserved</p>
                    </div>
                </div>
                <!-- <div class="start-skip">
                    <a href="javascript:void(0);" v-on:click="doopacity">直接进入</a>
                </div> -->
            </a>
        </div>
    </transition>
</template>
<style lang="less" scoped>
    @import '../../libs/static/less/mixins.less';
    .start-fade-out-enter-active, .start-fade-out-leave-active {
        -ms-transition: all 0.5s linear;
        -moz-transition: all 0.5s linear ;
        -webkit-transition: all 0.5s linear ;
        -o-transition: all 0.5s linear ;
        transition: all 0.5s linear ;
    }
    .start-fade-out-enter, .start-fade-out-leave-active {
        opacity: 0;
        -ms-transform: translateY(-100%);
        -moz-transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
        -o-transform: translateY(-100%);
        transform: translateY(-100%);
    }
    .start-w{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        .start-head{
            position: absolute;
            width: 100%;
            z-index: 10;
            .start-show {
                width: 100%;
                text-align: center;
                position: absolute;
                z-index: 1;
                bottom: 0;
                display: none;
                .logo-mix {
                    margin: 100px auto 30px;
                }
            }
            .start-countdown {
                position: relative;
                right: 0;
                top: 0;
                z-index: 3;
                text-align: right;
                padding: 10px 3%;
                span {
                    display: inline-block;
                    background: #f0f1f7;
                    .border-radius(4px);
                    padding: 3px 10px;
                    font-size: 14px;
                    color: #9a9ca7;
                }
            }
        }
        .start {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 9;
            display: flex;
            flex-direction: column;    
            background: #fff;
            img{
                max-width: 100%;
            }
            //background: rgba(255,255,255,1) url(https://p.maicai360.cn/img/get/20180319/46036636570642387347214_png) no-repeat;
            //background-size: 100% 100%;
            // -webkit-background-size: 10px 10px;
            // -moz-background-size: 10px 10px;
            // background-size: 10px 10px; 
            // background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, #fcfcfc), color-stop(.25, transparent), to(transparent)),
            //                   -webkit-gradient(linear, 0 100%, 100% 0, color-stop(.25, #fcfcfc), color-stop(.25, transparent), to(transparent)),
            //                   -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.75, transparent), color-stop(.75, #fcfcfc)),
            //                   -webkit-gradient(linear, 0 100%, 100% 0, color-stop(.75, transparent), color-stop(.75, #fcfcfc));
            // background-image: -moz-linear-gradient(45deg, #fcfcfc 25%, transparent 25%, transparent),
            //                   -moz-linear-gradient(-45deg, #fcfcfc 25%, transparent 25%, transparent),
            //                   -moz-linear-gradient(45deg, transparent 75%, #fcfcfc 75%),
            //                   -moz-linear-gradient(-45deg, transparent 75%, #fcfcfc 75%);
            // background-image: -o-linear-gradient(45deg, #fcfcfc 25%, transparent 25%, transparent),
            //                   -o-linear-gradient(-45deg, #fcfcfc 25%, transparent 25%, transparent),
            //                   -o-linear-gradient(45deg, transparent 75%, #fcfcfc 75%),
            //                   -o-linear-gradient(-45deg, transparent 75%, #fcfcfc 75%);
            // background-image: linear-gradient(45deg, #fcfcfc 25%, transparent 25%, transparent),
            //                   linear-gradient(-45deg, #fcfcfc 25%, transparent 25%, transparent),
            //                   linear-gradient(45deg, transparent 75%, #fcfcfc 75%),
            //                   linear-gradient(-45deg, transparent 75%, #fcfcfc 75%);
            .start-cnt{
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: #fff;
                position: absolute;
                z-index: 2;
                .flex-column();
                justify-content: flex-start;
                .cnt-img{
                    display: flex;
                    flex: 1 1 auto;
                    img{
                        width: 100%;
                    }
                }
                .cnt-bottom{
                    height: 21%;
                    padding: 10px 0;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    flex: 1 1 auto;
                    align-items: center;
                    img{
                        width: 50%;
                    }
                }
            }
            .start-skip {
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 50px;
                text-align: center;
                a {
                    font-size: 18px;
                    letter-spacing: 2px;
                    display: inline-block;
                    position: relative;
                    &:before,&:after {
                        content: "";
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        border-top: 1px solid #212123;
                        border-right: 1px solid #212123;
                        .rotate(45deg);
                        position: absolute;
                        right: -9px;
                        top: 7px;
                    }
                    &:before {
                        right: -18px;
                    }
                }
            }
        }
    }
</style>

<script>
import API from '../../config/api.js'
import Storage from 'store'
export default {
    data () {
        return {
            show:true,
            countdown: 3,
            startInfo:{}
        }
    },
    mounted () {
        if(sessionStorage.getItem('ljh5user_visit')) {
            this.show = false;
        } else {
            this.play();
        }
        this.getStartInfo();
    },
    methods:{
        doopacity () {
            this.show = false;
            sessionStorage.setItem('ljh5user_visit',1);
            //Storage.set("ljh5user_visit",1);
        },
        play (){
            let ctdown = 3;
            this.start_countdown = setInterval(() => {
                if(ctdown > 0) {
                    ctdown--;
                    this.countdown = ctdown;
                } else {
                    this.beforeDestroy();
                    this.doopacity();
                }
            }, 1000)
        },
        beforeDestroy () {
            clearInterval(this.start_countdown)
        },
        getStartInfo(){
            this.$http.get(API.getStartDetail)
            .then((response)=>{
                if(response.data.code == '200'){
                    this.startInfo = response.data.data;
                }
            }, (response)=>{
                console.log(response.data);
            });    
        }
    }
}
</script>
