import ArticleDetail from "../page/article/article-detail.vue"
import ArticleList from '../page/article/article-list.vue'
import ArticleTagsList from '../page/article/article-tags-list.vue'
import ArticleAuthorList from '../page/article/article-author-list.vue'
import Activity from '../page/activity/activity.vue'
import ActivityList from '../page/activity/activity-list.vue'
import ActivityDetail from '../page/activity/activity-detail.vue'
import ActivityApplyAdd from '../page/activity/activity-apply-add.vue'
import ActivityApplyAddNew from '../page/activity/activity-apply-add-new.vue'
import ActivityApplyEdit from '../page/activity/activity-apply-edit.vue'
import ActivityMapApplyNew from '../page/activity/activity-map-add-new.vue'
import Login from '../page/login/login.vue'
import Register from '../page/register/register.vue'
import UserCenter from '../page/user/user-center.vue'
import UserSet from '../page/user/user-set.vue'
import UserNickname from '../page/user/user-nickname.vue'
import UserEditpwd from '../page/user/user-editpwd.vue'
import UserFindpwd from '../page/user/user-findpwd.vue'
import UserFavorite from '../page/user/user-favorite.vue'
import UserAttention from '../page/user/user-attention.vue'
import UserCustom from '../page/user/user-custom.vue'
import UserAttentionAuthor from '../page/user/user-attention-author.vue'
import UserAvatar from '../page/user/user-avatar.vue'
import userHistory from '../page/user/user-history.vue'
import UserMessage from '../page/user/user-message.vue'
import UserFeedback from '../page/user/user-feedback.vue'
import UserFeedbackIssue from '../page/user/user-feedback-issue.vue'
import UserAbout from '../page/user/user-about.vue'
import UserHelp from '../page/user/user-help.vue'
import UserShortcutForWeChat from '../page/user/user-shortcut-for-wechat.vue'
import UserShortcutForBrowser from '../page/user/user-shortcut-for-browser.vue'
import UserEditCompany from '../page/user/user-editcompany.vue'
import UserEditPosition from '../page/user/user-editposition.vue'
import UserEditRole from '../page/user/user-editrole.vue'
import Order from '../page/user/user-order.vue'
import OrderDetail from '../page/user/user-order-detail.vue'
import SearchIndex from '../page/search/search-index.vue'
import SearchResult from '../page/search/search-result.vue'
import ConfirmOrder from '../page/wxpay/confirm-order.vue'
import WxPaySuccess from '../page/wxpay/pay-success.vue'
import VoteIndex from '../page/vote/index.vue'
import BulletScreen from '../page/ExtraOfAct/bullet-screen.vue'
import VoteVtwo from '../page/ExtraOfAct/vote-v2.vue'
import VoteVthree from '../page/ExtraOfAct/vote-v3.vue'
import VoteDetail from '../page/ExtraOfAct/detail.vue'
import VoteThreeDetail from '../page/ExtraOfAct/vote-v3-detail.vue'
import courseShare from '../page/ExtraOfAct/course-share.vue'
import courseIntro from '../page/ExtraOfAct/course-intro.vue'
import expressShare from '../page/ExtraOfAct/express-share.vue'
import expressList from '../page/ExtraOfAct/express-list.vue'
import quickReport from '../page/ExtraOfAct/quick-report.vue'
import MixedApply from '../page/mixed/apply.vue'
import demo from '../page/ExtraOfAct/demo.vue'
import MixedApply2 from '../page/mixed/apply2.vue'
import MixedApply3 from '../page/mixed/apply3.vue'
import Quote from '../page/quote/quote.vue'
import QuoteDetail from '../page/quote/quote-detail.vue'
// 这里的路由是相对于base设置的,需要命中的路由放在前面，顺序错误会导致无法命中路由
const routers = [{
    path: "/article",
    name: "article",
    component: ArticleList
}, {
    path: "/article/:type",
    name: "articleType",
    component: ArticleList
}, {
    path: "/article/tags/:id",
    name: "articleTags",
    component: ArticleTagsList
}, {
    path: "/article/author/:id",
    name: "articleAuthor",
    component: ArticleAuthorList
}, {
    path: "/article/detail/:id/:type",
    name: "articleDetail",
    component: ArticleDetail
}, {
    path: "/activity",
    name: "activity",
    component: Activity
}, {
    path: "/activity/list/:type",
    name: "activityList",
    component: ActivityList
}, {
    path: "/activity/detail/:id/:type",
    name: "activityDetail",
    component: ActivityDetail
}, {
    path: "/activity/apply/add/:id",
    name: "activityApplyAdd",
    component: ActivityApplyAdd,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/activity/apply/add/new/:id",
    name: "activityApplyAddNew",
    component: ActivityApplyAddNew,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/activity/apply/edit/:id",
    name: "activityApplyEdit",
    component: ActivityApplyEdit,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/activity/map/apply/new/:id",
    name: "ActivityMapApplyNew",
    component: ActivityMapApplyNew,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/login",
    name: "login",
    component: Login
}, {
    path: "/register",
    name: "register",
    component: Register
}, {
    path: "/user",
    name: "usercenter",
    component: UserCenter,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/history",
    name: "userhistory",
    component: userHistory,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/set",
    name: "userset",
    component: UserSet,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/nickname",
    name: "nickname",
    component: UserNickname,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/editpwd",
    name: "editpwd",
    component: UserEditpwd,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/editcompany",
    name: "editcompany",
    component: UserEditCompany,
    meta: {
        requireAuth: true,
    }
},{
    path: "/user/editposition",
    name: "editposition",
    component: UserEditPosition,
    meta: {
        requireAuth: true,
    }
},{
    path: "/user/editrole",
    name: "editrole",
    component: UserEditRole,
    meta: {
        requireAuth: true,
    }
},{
    path: "/user/findpwd",
    name: "findpwd",
    component: UserFindpwd,

}, {
    path: "/user/favorite",
    name: "favorite",
    component: UserFavorite,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/attention",
    name: "attention",
    component: UserAttention,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/custom",
    name: "custom",
    component: UserCustom,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/attention/author",
    name: "attentionAuthor",
    component: UserAttentionAuthor,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/avatar",
    name: "avatar",
    component: UserAvatar,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/message",
    name: "message",
    component: UserMessage,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/feedback",
    name: "feedback",
    component: UserFeedback,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/feedbackIssue",
    name: "feedbackIssue",
    component: UserFeedbackIssue,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/about",
    name: "about",
    component: UserAbout,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/help",
    name: "help",
    component: UserHelp,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/shortcutforwechat",
    name: "shortcutforwechat",
    component: UserShortcutForWeChat,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/shortcutforbrowser",
    name: "shortcutforbrowser",
    component: UserShortcutForBrowser,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/order",
    name: "order",
    component: Order,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/user/order/detail/:id",
    name: "orderDetail",
    component: OrderDetail,
    meta: {
        requireAuth: true,
    }
}, {
    path: "/search",
    name: "searchindex",
    component: SearchIndex
}, {
    path: "/search/result",
    name: "searchresult",
    component: SearchResult
}, {
    path: "/activity/map/apply/new/:id",
    name: "ActivityMapApplyNew",
    component: ActivityMapApplyNew,
    meta: {
        requireAuth: true,
    }
},
{
    path: "/wxpay/confirmorder",
    name: "ConfirmOrder",
    component: ConfirmOrder,
    meta: {
        requireAuth: true,
    }
},
{
    path: "/wxpay/paysuccess",
    name: "WxPaySuccess",
    component: WxPaySuccess,
    meta: {
        requireAuth: true,
    }
},
{
    path: "/vote/:id",
    name: "VoteIndex",
    component: VoteIndex
}, {
    path: "/ExtraOfAct/BulletScreen",
    name: "BulletScreen",
    component: BulletScreen
},{
    path: "/ExtraOfAct/VoteVtwo",
    name: "VoteVtwo",
    component: VoteVtwo
},{
    path: "/mixed/apply/:id(8|10)",
    name: "MixedApply",
    component: MixedApply3
},{
    path: "/mixed/apply/:id(2|5)",
    name: "MixedApply",
    component: MixedApply2
},{
    path: "/mixed/apply/:id",
    name: "MixedApply",
    component: MixedApply
},{
    path: "/ExtraOfAct/VoteVthree",
    name: "VoteVthree",
    component: VoteVthree
},{
    path: "/ExtraOfAct/VoteThreeDetail",
    name: "VoteThreeDetail",
    component: VoteThreeDetail
},{
    path: "/ExtraOfAct/courseShare",
    name: "courseShare",
    component: courseShare
},{
    path: "/ExtraOfAct/courseIntro",
    name: "courseIntro",
    component: courseIntro
},{
    path: "/ExtraOfAct/expressShare",
    name: "expressShare",
    component: expressShare
},{
    path: "/ExtraOfAct/expressList",
    name: "expressList",
    component: expressList
},{
    path: "/ExtraOfAct/quickReport",
    name: "quickReport",
    component: quickReport
},{
    path: "/ExtraOfAct/VoteDetail",
    name: "VoteDetail",
    component: VoteDetail
},{
    path: "/ExtraOfAct/demo",
    name: "demo",
    component: demo
},{
    path: "/Quote",
    name: "Quote",
    component: Quote,
    meta: {
        requireAuth: true,
    }
},{
    path: "/Quote/Detail",
    name: "QuoteDetail",
    component: QuoteDetail
},{
    path: "/",
    name: "index",
    component: ArticleList
}, {
    path: '*',
    name: 'home',
    component: ArticleList
}];


export default routers;