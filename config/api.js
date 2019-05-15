export default {
    base: "/api/v1",
    acticles: "/api/v1/Articles",
    acticlesTags: "/api/V1/Articles/Tags/",
    acticlesAuthor: "/api/V1/Author/Article/",
    //acticleDetail: "/api/V1/Articles/detail/",
    articleDetail: "/api/V1/Articles/detail",
    activityCategory: "/api/v1/activity/category",
    activity: "/api/v1/activity/",
    activityDetail: "/api/V1/ActivityNew/detail",
    activityApplyAdd: "/api/V1/ActivityNew/ApplyActivity",
    activityApplyAddedList: "/api/V1/ActivityNew/MeetingApplyList",
    activityApplyDetail: "/api/V1/ActivityNew/MeetingApplyDetail",
    activityApplyUpdate: "/api/V1/ActivityNew/MeetingApplyUpdate",
    acticityApplyDel: "/api/V1/ActivityNew/MeetingApplyDel",
    acticityApplyPackage: "/api/V1/Activity/Meeting/plan",
    login: "/api/V1/User/Login",
    register: "/api/v1/User/register",
    userArticleLike: "/api/V1/User/Article/like",
    userArticleCollect: "/api/V1/User/Article/Collect",
    userArticleCommment: "/api/V1/User/Article/Comment",
    userArticleCommmentLike: "/api/V1/User/Article/Comment/Like",
    userArticleCommmentDel: "/api/V1/ArticleNew/DeleteComment",
    userArticleCommmentReply: "/api/V1/ArticleNew/Replay",
    articleSearch: "/api/V1/Articles/search",
    articleAttention: "/api/V1/User/attention",
    articleAttentionSave: "/api/V1/User/attention/save",
    userCustom: "/api/V1/usernew/GetUserChooseItems",                                   //角色、兴趣定制
    userCustomSave: "/api/V1/usernew/UserChoose",
    userCenter: "/api/V1/User/UnpaidNum/",
    usercollect: "/api/V1/User/Collect/",
    userdelcollect: "/api/V1/User/Collect/Delete",
    userMessage: "/api/V1/User/msg/list/",
    userReadedMessage: "/api/V1/User/msg/readed/",
    userMessageCount: "/api/V1/User/msg/count/",
    userDelMessage: "/api/V1/User/msg/delete/",
    userHistory: "/api/V1/User/browse/",
    userDelHistory: "/api/V1/User/browse/delete",
    userClearHistory: "/api/V1/User/browse/delete/All",
    usereditnickname: "/api/V1/User/NickName",
    userresetpwd: "/api/V1/User/pwd",
    userFindPWD: "/api/V1/User/pwd/find",
    authorFollow: "/api/V1/User/follow",
    authorUnFollow: "/api/V1/User/unfollow",
    authorFollowList: "/api/V1/User/follow/list/",
    sendCaptcha: "/api/V1/User/Captcha",
    sendCaptchaFindPWD: "/api/V1/User/Captcha/findpwd",
    allcategory: "/api/v1/ArticleCategory",
    feedbackCategory: "/api/v1/Message/Category",
    feedbackIssue: "/api/v1/Message/Add",
    feedbackList: "/api/v1/Message/List/",
    weixinShare: "/Api/V1/WxApi/Signature",
    weixinCode:"/Api/V1/wxpay/GetCode",
    weixinOpenID:"/Api/V1/wxpay/GetOpenid",
    weixinOrder:"/Api/V1/wxpay/CreateWxOrder",
    activityMapApply:"/Api/V1/ActivityNew/ApplyActivity",                               //地图报名提交
    getOrderInfo:"/Api/V1/order/getorderinfo",                                          //查询订单信息
    orderList:"/Api/V1/order/GetOrderList",
    orderDetail:"/Api/V1/order/GetOrderFullInfo",
    orderCancel:"/Api/V1/order/CancelOrder",
    shareNotify: "/Api/V1/WxApi/ShareNotify",                                           //记录分享
    voteActivity: "/api/V1/Voting/GetVotingActivity",                                   //获取正在进行中的投票活动 get
    firstComList: "/api/V1/Voting/GetCompanies",                                        //公司列表 get
    //getVote: "/api/V1/Voting/Vote",                                                   //投票 post
    getVote: "/api/V1/Voting/DoVote",                                                   //投票 post
    canVoting: "/Api/V1/Voting/CanVote",
    actVoteEnter: "/Api/V1/Voting/GetOnGoingActivity",                                  //活动投票入口
    articleRecommend: "/api/V1/articlenew/getrecomment",                                //文章推荐 
    articleHisRecommend: "/api/V1/articlenew/gethistoryrecomment",                      //文章历史推荐  
    artRecCid:"/api/v1/ArticleNew/getcid",                                              //推荐获取cookie
    getCompanyInfo: '/api/V1/Voting/GetCompanyInfo',                                    //获取投票详情
    companyComment: '/api/V1/Voting/Comment',                                           //公司评论
    replayComComment: '/api/V1/Voting/Replay',                                          //回复公司评论接口
    giveThumbsUp: '/api/V1/Voting/Agree',                                               //评论点赞
    getActApplyInfo: '/api/V1/mixed/Apply/',                                            //获取报名活动详情
    addMixedApply: '/api/V1/mixed/Apply/Add',                                           //新活动会议报名  
    getMixedApplyNum: '/Api/V1/Mixed/Enroll',                                           //获取会议报名剩余名额
    getRightGroup: '/Activity/Group',                                                   //获取投票三期右侧分组
    getVoteInfo: '/Activity/GetActivity',                                               //获取投票三期相关信息
    getVoteComDetail: '/Activity/CompanyInfo',                                          //获取投票单个公司详情
    getVoteActvity: '/Activity/VotingCompany',                                          //获取单个活动投票
    getVoteRankDefault: '/Activity/Ranking',                                            //获取单个活动排名  
    getToVote:'/Activity/Voting',                                                       //投票三期投票   
    voteToComment:'/Activity/Comment',                                                  //投票三期评论     
    voteToReply:'/Activity/Reply',                                                      //投票三期回复
    voteToThumbsUp: '/Activity/Agree',                                                  //投片三期点赞 
    getApplyUrl:'/Activity/ActivityUrl',                                                //获取地址
    getQuoteList: '/Api/V1/Price/PriceResult',                                          //获取价格列表
    getQuoteDetail: '/Api/V1/Price/GetDetial',                                           //获取单个详情  
    updateUserInfo: '/Api/V1/User/UserRegistInfoUpdate',                                  //修改用户信息 
    getUserInfo: '/Api/V1/User/GetUserInfo',                                               //获取用户信息  
    getAllActivityList: '/Api/V1/ActivityList',                                            //获取所有活动列表
    quoteAddVisitedHistory: '/Api/V1/Price/AddVisitedHistory',                              //用户访问记录
    getStartDetail: '/Api/V1/IndexAd',                                                       //启动页图片
    updateRole:'/Api/V1/User/UserRolesUpdate',                                               //用户中心更改角色
    AddActivityBrowser:'/ActivityNew/AddActivityBrowserHistory'                              //记录活动浏览记录
}
