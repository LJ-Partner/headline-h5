<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.header {      
    z-index: 4;
    //overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    .header-wrapper {
        .flex();
        flex-wrap: nowrap;
        -webkit-flex-wrap: nowrap;
        background: @color-red;
        padding: 8px 0;
        position: relative;
        z-index: 1;
        height: 47px;
        overflow: hidden;
        .header-back {
            display: inline-block;
            text-align: left;
            font-size: 15px;
            color: #ffffff;
            padding: 0 5px 0 3px;
            height: 47px;
            order: -1;
            -webkit-order: -1;
            flex: 0 0 30px;
            -webkit-flex: 0 0 30px;
            align-self: center;
            i {
                display: inline-block;
                font-size: 18px;
                line-height: 30px;
                padding: 8px 5px 5px 5px;
            }
        }
        .header-logo {
            height:24px;
            text-align: left;
            background-size: contain;
            margin-left: 10px;
            margin-right: 15px;
            order: 0;
            -webkit-order: 0;
            flex: 0 0 68px;
            -webkit-flex: 0 0 68px;
            align-self: center;
            a {
                font-size: 34px;
                color: #fff;
            }
        }
        .header-search {
            background: @color-white;
            .border-radius(5px);
            text-align: left;
            font-size: 14px;
            color: @color-gray-9;
            position: relative;
            padding-left: 25px;
            margin:0 12px 0 0;
            height: 30px;
            line-height: 30px;
            order: 1;
            -webkit-order: 1;
            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            align-self: center;
            .sch-ipt{
                border: none;
                background: none;
                flex: 1 1 auto;
                -webkit-flex: 1 1 auto;
            }
            i {
                position: absolute;
                left: 5px;
                top: -1px;
                font-size: 16px;
                color: @color-gray-9;
            }
        }
        .header-message {
            display: inline-block;
            font-size: 22px;
            color: @color-white;
            order: 2;
            -webkit-order: 2;
            flex: 0 0 22px;
            -webkit-flex: 0 0 22px;
            align-self: center;
            margin-right: 10px;
            &.newCount {
                position: relative;
				&:after {
					content: "";
					width: 6px;
					height: 6px;
					display: inline-block;
					background: @color-white;
					-moz-border-radius: 50%;
					-webkit-border-radius: 50%;
					border-radius: 50%;
					position: absolute;
					right: -5px;
					top: 2px;
				}
            }
        }
    }
}
</style>
<template>
    <header class="header" v-if="appBarShow">
        <div class="header-wrapper">
            <a class="header-back" v-if="isBack" v-on:click="goBack"><i class="ljh5-icons ljh5-fanhui"></i><!--返回--></a>
            <div class="header-logo">
                <a href="/" class="ljh5-icons ljh5-appzitiicon-copy"></a>
            </div>
            <a href="/search" class="header-search">
                <i class="ljh5-icons ljh5-sousuo"></i>
                您想搜点什么呢…
                <!--<input autocomplete="off" type="search" placeholder="您想搜点什么呢…" name="searchkey"  class="sch-ipt">-->
            </a>
            <a href="/user/message" class="ljh5-icons ljh5-dingbuxiaoxi header-message" :class="{newCount:get_usermessage_count > 0}"></a>
        </div>
        <slot></slot>   
    </header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../../config/api.js'
import Storage from 'store' 
export default {
    computed: mapGetters(['get_usermessage_count','get_pre_url','get_cur_url']),
    props:{
        isBack:{
            type: Boolean,
            default: true
        },
        isSearch:{
            type: Boolean,
            default:true
        },
        isLogin:{
            type: Boolean,
            default:false
        },
        isRegister:{
            type: Boolean,
            default:false
        }
    },
	data () {
		return {
			user:Storage.get("ljh5user"),
            appBarShow: true
		}
	},
	mounted () {
		this.count_message();
        this.setUrl();
        this.wcApp();
	},
	methods: {
		count_message() {
			if(this.user) {
				this.$http.get(API.userMessageCount + this.user.user_id)
				.then((response)=>{
					if(response.data.code=="500"){
						console.log(response.data.msg);
						this.$store.dispatch('set_usermessage_count',0);
					} else if(response.data.code=="200") {
						if(response.data.count > 0) {
							this.$store.dispatch('set_usermessage_count',response.data.count);
						} else {
							this.$store.dispatch('set_usermessage_count',0);
						}
						//console.log(response.data);
					}
				}, (response)=>{
					//console.log(response.data);
				});
			} else {
				this.$store.dispatch('set_usermessage_count',0);
			}
		},
        goBack () {
            // if(Storage.get('ljh5url') && Storage.get('ljh5url').preUrl != ""){
            //     console.log(Storage.get('ljh5url').preUrl);
            //     window.location.href = Storage.get('ljh5url').preUrl;
            // } else {
            //     this.$router.go(-1);
            // }
            this.$router.go(-1);
        },
        setUrl () {
            // if(this.$route.name == "index" || this.$route.name == "article" || this.$route.name == "articleType" || this.$route.name == "activityList") {
            //     // this.$store.dispatch('set_pre_url',window.location.href);
            //     // this.$store.dispatch('set_cur_url',"");
            //     Storage.set('ljh5url', {preUrl: window.location.href, curUrl: ""});
            // } else if(this.$route.name == "articleDetail" || this.$route.name == "activityDetail") {
            //     // console.dir(this.$store.getters);
            //     // this.$store.dispatch('set_pre_url',this.get_pre_url);
            //     // this.$store.dispatch('set_cur_url',window.location.href);
            //     Storage.set('ljh5url', {preUrl: Storage.get('ljh5url').preUrl, curUrl: window.location.href});
            // } else if(this.$route.name == "activityApplyAddNew" || this.$route.name == "ActivityMapApplyNew") {
            //     // this.$store.dispatch('set_pre_url',this.get_cur_url);
            //     // this.$store.dispatch('set_cur_url',window.location.href);
            //     Storage.set('ljh5url', {preUrl: Storage.get('ljh5url').curUrl, curUrl: window.location.href});
            // } else {
            //     // this.$store.dispatch('set_pre_url',"");
            //     // this.$store.dispatch('set_cur_url',"");
            //     Storage.remove('ljh5url');
            // }

            if(this.$route.name == "index" || this.$route.name == "article") {
                Storage.set('ljh5url', {preUrl: window.location.href, curUrl: window.location.href});
            } else {
                Storage.set('ljh5url', {preUrl: Storage.get('ljh5url') ? Storage.get('ljh5url').curUrl : "", curUrl: window.location.href});
            }
            // console.log("preUrl: " + Storage.get('ljh5url').preUrl);
            // console.log("curUrl: " + Storage.get('ljh5url').curUrl);
        },
        wcApp(){                                                    //判断是否是旺材app
            var u = navigator.userAgent;
            var isSelfApp = u.indexOf('maicai360_app') > -1;
            if(isSelfApp){
                this.appBarShow = false;    
            }else{
                this.appBarShow = true;
            }
        }
	}
}
</script>