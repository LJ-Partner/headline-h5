<template>
    <v-content>
        <div class="demo">
            <button v-on:click="wcApp()">测试</button>
            <p>{{text}}</p>
            <p>{{a}}</p>
            <p>{{login}}</p>
        </div>
    </v-content>
</template>
<style>

</style>
<script>
export default {
    data(){
        return {
            text: '',
            a:'',
            login:''
        }   
    },
    mounted() {
        //this.appIsLogin();
        //this.appUserId();    
        this.judgment();
    },
    updated() {

    },
    methods:{
        wcApp(){                                                //判断是否是旺材app
            var u = navigator.userAgent;
            var isSelfApp = u.indexOf('maicai360_app') > -1;
        },
        appIsLogin(){                                           //判断是否登录 true false
            var t =   window.WCJSBridge.isLogin();
            this.text = t;      
            window.WCJSBridge.isLogin();    
        },
        appUserId(){                                            //获取用户id
            var s =   window.WCJSBridge.getUserId();  
            this.text = s;                                       
            window.WCJSBridge.getUserId();    
        },
        judgment(){
            var u = navigator.userAgent;
            var isAppLogin;
            var isSelfApp = u.indexOf('maicai360_app') > -1;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            this.text = 'isLogin:' + this.getCookie('isLogin');
            this.a = 'userId:' + this.getCookie('userId');
            if(isSelfApp){
                if(isAndroid){
                    isAppLogin = window.WCJSBridge.isLogin();
                }else if(isIOS){
                    var value = this.getCookie('isLogin');  
                        isAppLogin = value ==="true" ? true : false; 
                    this.login = isAppLogin;    
                }
            }
        },
        getCookie(objname){
            var arrstr = document.cookie.split("; ");
            for(var i = 0;i < arrstr.length;i ++){
                var temp = arrstr[i].split("=");
                if(temp[0] == objname) return unescape(temp[1]);
            }
        }
    }    
}
</script>