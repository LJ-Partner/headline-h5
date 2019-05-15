let host = window.location.host;
let ws; 
if(host == "m.maicai360.cn"){
    ws = new WebSocket("ws://120.132.20.145:8123"); //m.maicai360.cn 
}else{
    ws = new WebSocket("ws://120.132.20.145:8123"); //b.maicai360.cn
}
global.ws = ws 