<template>
    <div class="ljh5-ticker" :style="'height: ' + rowHeight * maxRow + 'px;'">
        <slot></slot>
    </div>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.ljh5-ticker {
    overflow: hidden;
    .ticker{
        -webkit-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
    }
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            rolled_count : 0,//卷起（滚动过）的行数
            initMargin: 0//容器的margin
        }
    },
    mounted () {
        this.rolled_count = this.scrollCount;
        if(!this.flag || this.total <= this.maxRow){
            let time = setInterval(()=>{
                this.rolled_count += this.scrollCount;
                this.scrollTicker();
                if(this.flag == true){
                    clearInterval(time)
                }
            },this.duration)
        }
    },
    props : {
        rowHeight: 0,//行高
        scrollCount: 1,//每次滚动的行数
        total: 1,//总行数
        maxRow: 3,//容器可视行数
        speed: 500,//滚动速度
        duration: 2000,//滚动间隔时间
        flag: false,//关闭滚动
        autostart: true//自动--暂未开发
    },
    methods: {
        scrollTicker () {
            if(this.scrollCount < this.total && this.rolled_count < this.total -1){
                this.initMargin -= this.rowHeight * this.scrollCount;
                this.$el.querySelector(".ticker").style.marginTop = this.initMargin + "px";
            } else {
                //this.flag = true;
                this.$el.querySelector(".ticker").style.marginTop = 0;
                this.rolled_count = this.scrollCount;
                this.initMargin = 0;
            }
        }
    }
}
</script>