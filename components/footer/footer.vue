<template>
<footer class="footer" v-if="appBarShow">
	<a href="/" class="footer-a " :class="{'cur': get_channel_cur == 'article' || ''}">
		<i class="ljh5-icons ljh5-footer-news"></i>
		<span>资讯</span>
	</a>
	<a href="/quote" class="footer-a " :class="{'cur': get_channel_cur == 'quote'}">
		<i class="ljh5-icons ljh5-jiagequshi"></i>
		<span>报价</span>
	</a>
	<a href="/activity" class="footer-a " :class="{'cur': get_channel_cur == 'activity'}">
		<i class="ljh5-icons ljh5-footer-activity"></i>
		<span>活动</span>
	</a>
	<!--<a href="/activity" class="footer-a ">
		<i class="ljh5-icons ljh5-baojiaqian"></i>
		<span>报价</span>
	</a>-->
	<!--<a href="/user/message" class="footer-a " :class="{cur:get_channel_cur=='message'}">
		<i class="ljh5-icons ljh5-xiaoxihou" v-if="get_channel_cur=='message'" :class="{newCount:get_usermessage_count > 0}"></i>
		<i class="ljh5-icons ljh5-xiaoxi" v-else :class="{newCount:get_usermessage_count > 0}"></i>
		<span>消息</span>
	</a>-->
	<!-- <a href="/user/attention/author" class="footer-a " :class="{'cur': get_channel_cur == 'attention'}">
		<i class="ljh5-icons ljh5-footer-attention"></i>
		<span>关注</span>
	</a> -->
	 <a href="/user" class="footer-a " :class="{'cur': get_channel_cur == 'user'}">
		<i class="ljh5-icons ljh5-footer-account"></i>
		<span>我的</span>
	</a> 
</footer>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.footer {
	position: fixed;
	z-index: 3;
	left:0;
	bottom: 0;
	width:100%;
	height: 53px;
	padding:5px 0 0;
	display: flex;
	display: -webkit-flex;
	flex-direction: row;
	-webkit-flex-direction: row;
	justify-content:center;
	-webkit-justify-content:center;
	align-items: flex-start;
	-webkit-align-items: flex-start;
	background: #fff;
	border-top: 1px solid @border-color;
	color: @foot-color;
	.footer-a {
		flex:1 1 auto;
		-webkit-flex:1 1 auto;
		text-align: center;
		position: relative;
		color: @foot-color;
		.ljh5-icons {
			font-size: 26px;
			&.newCount {
				position: relative;
				&:after {
					content: "";
					width: 6px;
					height: 6px;
					display: inline-block;
					background: @foot-color-act;
					-moz-border-radius: 50%;
					-webkit-border-radius: 50%;
					border-radius: 50%;
					position: absolute;
					right: -5px;
					top: 2px;
				}
			}
		}
		span {
			position: absolute;
			bottom: -18px;
			margin: auto;
			left: 0;
			right: 0;
			font-size: 13px;
		}
		&.cur,&.cur span {
			color: @foot-color-act;
		}
	}
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store' 
export default{
	computed: mapGetters(['get_channel_cur']),
	data(){
		return{
            appBarShow: true
        }
	},
	methods:{
		wcApp(){                                                    //判断是否是旺材app
            var u = navigator.userAgent;
            var isSelfApp = u.indexOf('maicai360_app') > -1;
            if(isSelfApp){
                this.appBarShow = false;    
            }else{
                this.appBarShow = true;
            }
        }
	},
	mounted() {        
        this.wcApp();
    }
}
</script>
