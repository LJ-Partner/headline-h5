<template>
<header class="user-header" v-if="appBarShow">
	<p>{{get_usercenter_title}}</p>
	<a class="back" v-on:click="$router.go(-1)"><i class="ljh5-icons ljh5-fanhui"></i><!--返回--></a>
	<span class="handle" v-on:click="checkbtn" v-if="showEdit">{{get_usercenter_switchbtn.text}}</span>
</header>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.user-header {
	position: fixed;
	z-index: 3;
	left:0;
	top: 0;
	width:100%;
	height: 46px;
	padding:0px 15px;
	background: @color-red;
    color: #ffffff;
    line-height: 46px;

	p {
		display: block;
		text-align: center;
		font-size: 18px;
	}
    .back {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        text-align: left;
        font-size: 15px;
        color: #ffffff;
        padding: 0 5px 0 7px;

        i {
            font-size: 18px;
            padding-right: 2px;
        }
    }
    .handle {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 0;
        text-align: right;
        font-size: 13px;
        color: #ffffff;
    }
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
export default{
    computed: mapGetters(['get_usercenter_switchbtn','get_usercenter_title']),
    data(){
        return{
            appBarShow: true
        }
    },
    methods:{
        checkbtn(){
            let switchbtn = {
				status: false,
				text: '编辑'
			};
            let title = '我的账户';
            if(this.get_usercenter_switchbtn.status == false){
                switchbtn.status = true;
                switchbtn.text = '完成';
                this.$store.dispatch('set_usercenter_switchbtn',switchbtn);
            }else{
                switchbtn.status=false;
                switchbtn.text = '编辑';
                this.$store.dispatch('set_usercenter_switchbtn',switchbtn);
            }
           // console.log(this.get_usercenter_switchbtn.status)
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
    },
    mounted() {        
        this.wcApp();
    },
    props:{
        showEdit:{
            type: Boolean,
            default:false
        }
    }
}
</script>
