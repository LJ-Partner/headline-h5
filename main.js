import Vue from 'vue';
import VueRouter from 'vue-router';
import "./libs/static/less/public.less";

import components from './components/index.js';
//import "./resource/fonts/MaterialIcons/material-icons.css";
import "./resource/fonts/shljHeadlineH5/iconfont.css";
import "./resource/fonts/font-awesome-4.7.0/css/font-awesome.css"

import FastClick from 'fastclick';

import store from './store/index.js';
import routes from "./config/route.js";
import Storage from 'store'
//import './websocket/index'
//Vue.config.debug = true;
//Vue.config.devtools = true
Vue.use(VueRouter);
//初始化组件
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
});
//初始化路由
const route = new VueRouter({
    mode: 'history',
    routes,
    base:"/"
});

function getCookie(objname){
    var arrstr = document.cookie.split("; ");
    for(var i = 0;i < arrstr.length;i ++){
        var temp = arrstr[i].split("=");
        if(temp[0] == objname) return unescape(temp[1]);
    }
}
// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
route.beforeEach((to, from, next) => {
    
    if (to.matched.some(record => record.meta.requireAuth)) {
        var u = navigator.userAgent;
        var isAppLogin;
        //判断是否是嵌入到app的标识
        var isSelfApp = u.indexOf('maicai360_app') > -1;
        //android终端
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;    
        //ios终端         
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);                         
        if(isSelfApp){  //是否是嵌入到app的页面,走app的逻辑                                                                
            if(isAndroid){
                //页面嵌入到app 获取是否登录 调用的方法 布尔值 true false
                isAppLogin = window.WCJSBridge.isLogin();                               
            }else if(isIOS){
                //页面嵌入到app 获取是否登录 获取cookie的字段isLogin的值 针对ios                
                var value = getCookie('isLogin');                                       
                    isAppLogin = value ==="true" ? true : false; 
            }
            if(isAppLogin){
                 next();    
            }else{
                //app未登录 调用app登录的方法
                if(isAndroid){
                    window.WCJSBridge.goLogin();
                }else if(isIOS){
                    WCJSBridge.goLogin();    
                }
            }    
        }else{  //走h5的逻辑
            if(Storage.get("ljh5user")){
                next();
            }else{
                next({
                    path: '/login'
                });    
            }
        }
    } else {
        next();
    }
});
//FastClick.attach(document.body);
new Vue({
    
    router:route,
    store:store,
    created () {
         var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?790c45e3e3e61212c61669be73794835";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
        })();
                
    }
}).$mount('#app');