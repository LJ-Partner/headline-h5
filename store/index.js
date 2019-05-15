import Vue from 'vue'
import vueResource from 'vue-resource';
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(vueResource);
export default new Vuex.Store({
	state:{
		usercenter:{//用户中心header
			switchbtn:{
				status:false,
				text:'编辑'
			},
			title:''
		},
		channel:{//底部工具栏当前频道
			cur:''
		},
		article:'',
		messageCount: 0,//未读消息数量
		preurl:'',//上一级url
		cururl: ''//当前url
	},
	mutations: {
		set_usercenter_switchbtn (state,obj) {
			state.usercenter.switchbtn = obj;
		},
		set_usercenter_title (state,obj){
			state.usercenter.title = obj;
		},
		set_channel_cur (state,str) {
			state.channel.cur = str;
		},
		set_usermessage_count (state,str) {
			state.messageCount = str;
		},
		set_article_num (state,n) {
			state.article = n;
		},
		set_pre_url (state,str) {
			state.preurl = str;
		},
		set_cur_url (state,str) {
			state.cururl = str;
		}
	},
	actions: {
		set_usercenter_switchbtn (context,obj) {
			context.commit('set_usercenter_switchbtn',obj)
		},
		set_usercenter_title (context,str){
			context.commit('set_usercenter_title',str);
		},
		set_channel_cur (context,str){
			context.commit('set_channel_cur',str);
		},
		set_usermessage_count (context,str) {
			context.commit('set_usermessage_count',str);
		},
		set_article_num (context,n) {
			context.commit('set_article_num',n);
			//state.article = n;
		},
		set_pre_url (context,str) {
			context.commit('set_pre_url',str);
		},
		set_cur_url (context,str) {
			context.commit('set_cur_url',str);
		}
	},
	getters: {
		get_usercenter_switchbtn (context) {
			return context.usercenter.switchbtn;
		},
		get_usercenter_title (context){
			return context.usercenter.title;
		},
		get_channel_cur (context){
			return context.channel.cur;
		},
		get_usermessage_count (context){
			return context.messageCount;
		},
		get_article_num (context) {
			return context.article;
		},
		get_pre_url (context){
			return context.preurl;
		},
		get_cur_url (context){
			return context.cururl;
		}
	}
});