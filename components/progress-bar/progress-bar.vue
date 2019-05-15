<template>  
    <div class="progress-bar" ref="progressBar" @click="progressClick">  
        <div class="bar-inner">  
            <div class="progress"  ref="progress"></div>  
                <div class="progress-btn-wrapper" ref="progressBtn"  
                @touchstart = "progressTouchStart"  
                @touchmove = "progressTouchMove"  
                @touchend = "progressTouchEnd"  
                >  
                <div class="progress-btn"></div>  
            </div>  
        </div>  
    </div>  
</template>  
  
<script>  
    // 进度条按钮宽度,由于style中没有设置width,因此只能用clientWidth获取  
    export default {  
        data() {  
            return {  
                btnWidth: {  
                type: Number,  
                default: 0  
                },  
                touchInfo: {  
                initiated: false  
                }  
            }  
        },  
        props: {  
            percent: {  
                type: Number,  
                default: 0  
            }  
        },  
    mounted() {  
        this.btnWidth = document.getElementsByClassName('progress-btn')[0].clientWidth  
    },  
    methods: {  
        // 点击按钮  
        progressTouchStart(e) {  
            // 记录touch事件已经初始化  
            this.touchInfo.initiated = true  
            // 点击位置  
            this.touchInfo.startX = e.touches[0].pageX  
            // 点击时进度条长度  
            this.touchInfo.left = this.$refs.progress.clientWidth  
        },  
        // 开始移动  
        progressTouchMove(e) {  
            if (!this.touchInfo.initiated) {  
                return  
            }  
            // 计算移动距离  
            const moveX = e.touches[0].pageX - this.touchInfo.startX  
            // 设置偏移值  
            const offsetWidth = Math.min(Math.max(0, this.touchInfo.left + moveX),  
                this.$refs.progressBar.clientWidth - this.btnWidth)  
            this._setOffset(offsetWidth)  
        },  
        // 移动结束  
        progressTouchEnd(e) {  
            this.touchInfo.initiated = false  
            // 向父组件派发事件,传递当前百分比值  
            this._triggerPercent()  
        },  
        // 进度条点击事件  
        progressClick(e) {  
            // 设置进度条及按钮偏移  
            this._setOffset(e.offsetX)  
            // 通知父组件播放进度变化  
            this._triggerPercent()  
        },  
        _triggerPercent() {  
            const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth  
            const percent = Math.min(1, this.$refs.progress.clientWidth / barWidth)  
            this.$emit('percentChange', percent)  
        },  
        // 设置偏移  
        _setOffset(offsetWidth) {  
        // 设置进度长度随着百分比变化  
        this.$refs.progress.style.width = `${offsetWidth}px`  
        // 设置按钮随着百分比偏移  
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`  
        }  
    },  
    watch: {  
        // 监听歌曲播放百分比变化  
        percent(newPercent, oldPercent) {  
            if (newPercent >= 0 && !this.touchInfo.initiated) {  
                // 进度条总长度  
                const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth  
                const offsetWidth = barWidth * newPercent  
                // 设置进度条及按钮偏移  
                this._setOffset(offsetWidth)  
            }  
        }  
    }  
  }  
</script>  
  
<style lang="less">  
    .progress-bar{
        height:4px;
        -webkit-tap-highlight-color:rgba(255,255,255,0);
        -webkit-appearance:none;
        outline:none;
        .bar-inner{
            position:relative;
            z-index: 1;
            height:4px;  
            background: #D8D8D8; 
            .progress{
                position:absolute;  
                height:100%;  
                background:#F87F5B; 
            }
            .progress-btn-wrapper{
                position:absolute;  
                z-index:1;
                top: -3px;
                border-radius: 50%;
                background:#F87F5B; 
                box-sizing: border-box;
                .progress-btn{
                    position:relative;  
                    width: 10px;
                    height: 10px; 
                    box-sizing:border-box;   
                    border-radius:50%;  
                    background:#F87F5B;
                    z-index: 2;
                }  
            }
        } 
    }  
</style> 