<template>
    <v-content>
        <v-header>     
        </v-header>
        <div class="activity-apply-add-new">
            <form>
                <div class="apply-add-new-form">
                    <input type="hidden" v-model="forms.apply_id"/>
                    <input type="hidden" v-model="forms.user_id"/>
                    <div class="item">
                        <label>姓名<em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="您的真实姓名" v-model="forms.activityApply_name">
                        </div>
                    </div>
                     <div class="item">
                        <label>手机<em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="您的常用手机号" v-on:keyup="forms.activityApply_phone=forms.activityApply_phone.replace(/[^0-9]/g,'')" v-model="forms.activityApply_phone"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>职务<em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="如:采购员" v-model="forms.activityApply_duty"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>公司全称<em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="完整公司名称" v-model="forms.activityApply_company"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>公司所在地<em>*</em></label>
                        <div class="cell">
                            <input type="text" placeholder="如：上海" v-model="forms.activityApply_address"/>
                        </div>
                    </div>
                    <!--<div class="item">
                        <label>所属行业:</label>
                        <div class="cell">
                            <input type="text" placeholder="输入所属行业,如:化工" v-model="forms.activityApply_industry"/>
                        </div>
                    </div>-->
                    <div class="item">
                        <label>经营业务</label>
                        <div class="cell">
                            <input type="text" placeholder="如：变压器销售" v-model="forms.activityApply_product"/>
                        </div>
                    </div>
                    <div class="item">
                        <label>微信号</label>
                        <div class="cell">
                            <input type="text" placeholder="您的微信号" v-model="forms.activityApply_winxin"/>
                        </div>
                    </div>
                     <div class="item">
                        <label>报名渠道</label>
                        <div class="cell">
                            <span class="cell-radio">
                                <input type="radio"  value="1" v-model="forms.activityApply_channel"><span class="radio-tip">通过微信公众号</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="2" v-model="forms.activityApply_channel"><span class="radio-tip">通过微信朋友圈</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="3" v-model="forms.activityApply_channel"><span class="radio-tip">通过朋友介绍</span>
                            </span>
                            <span class="cell-radio">
                                <input type="radio"  value="4" v-model="forms.activityApply_channel"><span class="radio-tip">通过网站</span>
                            </span>
                             <span class="cell-radio">
                                <input type="radio"  value="5" v-model="forms.activityApply_channel"><span class="radio-tip">通过广告</span>
                            </span>
                        </div>
                    </div>
                    <div class="item">
                        <button type="button" class="btn-apply" v-on:click="update_apply">提交</button>
                    </div>
                </div>
              </form>
        </div>
        <v-dialog v-if="dialog.dialogShow" v-bind:isshow="dialog.dialogShow" v-bind:dialogcont="dialog.dialogCont" v-bind:isauto="dialog.dialogIsauto" v-bind:dialoglife="dialog.dialogLife" v-bind:isclosebtn="dialog.dialogIsclosebtn" :closedialog="close_dialog"></v-dialog>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
</style>
<script>
import API from '../../config/api.js'
import Storage from 'store'
export default {
    data(){
        return {
            forms: {
            
            },
            apply_id: this.$route.params.activityapply_id,
            activity_id: this.$route.params.id,
            dialog: {
                dialogShow: false,
                dialogCont: "",
                dialogIsauto: true,
                dialogLife: 3000,
                dialogIsclosebtn: false
            }
        }
    },
    mounted () {
        if(this.apply_id){
            this.getapplyDetail(); 
        } else {
            this.$router.go(-1);
        }
    },
    methods: {
        getapplyDetail(){
            this.loading = true;
            let url = API.activityApplyDetail;
            this.$http.get(url,{params:{apply_id: this.apply_id}})
            .then((response)=>{
                //console.log(response.data);
                if(response.data.code && response.data.code=="200"){
                    this.forms = response.data.detail;
                    this.forms.apply_id = response.data.detail.apply_id ? response.data.detail.apply_id : this.apply_id;
                    // this.forms.user_id = Storage.get("ljh5user") ? Storage.get("ljh5user").user_id : "";
                    this.loading = false;
                }
                //console.log(this.forms);
            }, (response)=>{
                console.log(response.data);
            });
        },
        update_apply () {
            var telReg = !!this.forms.activityApply_phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
            if(this.forms.activityApply_name == "" || this.forms.activityApply_phone == "" || this.forms.activityApply_company == "" || this.forms.user_location == "" || this.forms.activityApply_duty == "") {
                this.show_dialog("请把报名信息填写完整",true,2000,false);
                return false;
            } else if(telReg == false) {
                this.show_dialog("请输入正确的手机号码",true,2000,false);
                return false;
            } else {
                this.$http.post(API.activityApplyUpdate,this.forms)
                .then((response)=>{
                    //console.log(response.data);
                    if(response.data.code && response.data.code=="200"){
                        this.$router.push('/activity/apply/add/'+ this.activity_id);
                    } else {
                        this.show_dialog(response.data.msg,true,2000,false);
                    }
                    // console.log(this.lists.length);
                }, (response)=>{
                    console.log(response.data);
                });
            }
        },
        show_dialog (cont,isauto,life,isclosebtn) {
            this.dialog.dialogShow = true;
            this.dialog.dialogCont = cont;
            this.dialog.dialogIsauto = isauto;
            this.dialog.dialogLife = life;
            this.dialog.dialogIsclosebtn = isclosebtn;
        },
        close_dialog () {
            this.dialog.dialogShow = false;
            this.dialog.dialogCont = "";
            this.dialog.dialogLife = 3000;
        }
    }
}
</script>