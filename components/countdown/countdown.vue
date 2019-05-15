<template>
    <div class="ljh5-countdown">
        <p v-html="time"></p>
    </div>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.ljh5-countdown {
    .ctdown-time,.ctdown-end {
        color: @color-red;
    }
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            time : '',
            flag : false
        }
    },
    mounted () {
        let time = setInterval(()=>{
            if(this.flag == true){
                clearInterval(time)
            }
            this.intervalTime--;
            this.countDown();
        },1000)
    },
    props : {
        beginTime: {//开始时间
            type : String
        },
        endTime: {//结束时间
            type : String
        },
        intervalTime: {//当前距结束时间的差值
            type: String
        },
        isInterval: true,//有无差值
        countdownTitle: "",//倒计时标题
        endTip: ""//倒计时结束提示
    },
    methods: {
        countDown () {
            let intervalTime;
            if(this.isInterval){
                intervalTime = parseInt(this.intervalTime);
            } else {
                const endTime = new Date(this.endTime);
                const beginTime = this.beginTime && this.beginTime != "" ? new Date(this.beginTime) : new Date();
                intervalTime = parseInt((endTime.getTime()-beginTime.getTime())/1000);
            }

            if(intervalTime <= 0) {
                this.flag = true;
                this.$emit('time-end');
                this.time = "<span class='ctdown-end'>" + this.endTip + "</span>";
            } else {
                let d = parseInt(intervalTime/(24*60*60));
                let dStr = "<span class='ctdown-num ctdown-day'>" + d + "</span>";
                let h;
                if(d > 0){
                    h = "<span class='ctdown-num ctdown-hour'>" + this.formate(parseInt(intervalTime/(60*60)%24)) + "</span>";
                } else {
                    h = "<span class='ctdown-num ctdown-hour'>" + parseInt(intervalTime/(60*60)%24) + "</span>";
                }
                let m = "<span class='ctdown-num ctdown-minute'>" + this.formate(parseInt(intervalTime/60%60)) + "</span>";
                let s = "<span class='ctdown-num ctdown-second'>" + this.formate(parseInt(intervalTime%60)) + "</span>";
                let time;
                if(d > 0) {
                    time = `<span class='ctdown-time'>${dStr}天${h}小时${m}分${s}秒</span>`;
                } else {
                    time = `<span class='ctdown-time'>${h}小时${m}分${s}秒</span>`;
                }
                if(this.countdownTitle != ""){
                    this.time = "<span class='ctdown-tt'>" + this.countdownTitle + "</span>";
                    this.time = this.time + time;
                } else {
                    this.time = time;
                }
            }
        },
        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        }
    }
}
</script>