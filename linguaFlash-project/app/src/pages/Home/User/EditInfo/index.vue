<template>
    <div class="user-infomation user-edit">
        <ul>
            <form id="modify-info" data-vv-scope="form-1">
                <li>
                    <div class="info-til">昵称</div>
                    <div class="info-bod">
                        <i class="bi bi-person-circle"></i>
                        <input class="edit-input" type="text" placeholder="设置你的昵称" name="nickname"
                             id="nickname" v-model="nickname" v-validate="{ required: true, regex: /^\S{1,12}$/ }">
                        <span class="bi tipstow bi-exclamation-lg email-span"
                            style="display: none;"></span>
                    </div>
                    <div class="edit-message"></div>
                </li>
                <li>
                    <div class="info-til">电子邮箱</div>
                    <div class="info-bod">
                        <i class="bi bi-envelope-fill"></i>
                        <input class="edit-input" type="text" placeholder="设置你的电子邮箱" value="email" name="editEmail"
                            id="email" v-model="email" v-validate="{ required: true, regex: /^([a-zA-Z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/ }">
                        <span class="bi tipstow bi-exclamation-lg email-span"
                            style="display: none;"></span>
                        <!-- <i class="bi bi-file-earmark-lock-fill"></i> -->
                    </div>
                    <div class="edit-message"></div>
                </li>
                <li>
                    <div class="info-til">性别</div>
                    <div class="info-bod" id="gender">
                        <i class="bi bi-gender-male edit-gender"></i>
                        <span class="gender"><label for="man">男</label></span>
                        <input class="gender-radio" type="radio" name="gender" id="man" value="男" v-model="gender">
                        <i class="bi bi-gender-female edit-gender"></i>
                        <span class="gender"><label for="woman">女</label></span>
                        <input class="gender-radio" type="radio" name="gender" id="woman" value="女" v-model="gender">
                    </div>
                </li>
                <li>
                    <div class="info-til">用户简介</div>
                    <div class="info-bod">
                        <i class="bi bi-file-earmark-person-fill"></i>
                        <input class="edit-input" type="text" placeholder="点击设置你的简介" value="people" v-model="introduce">
                    </div>
                </li>
                <input type="submit" @click.prevent="UpdateUserInfo" ref="ConfirmChange" class="user-info-sub" value="确认修改" style="display: none;">
            </form>
            <li>
                <a href="javascript:" class="password">
                    <div class="password-main">
                        <p>设置密码</p>
                        <p>在此输入密码</p>
                    </div>
                    <div class="password-arrow"><i class="bi bi-caret-right-fill"></i></div>
                    <!-- <i class="bi bi-caret-down-fill"></i> -->
                </a>
                <form id="password-form" data-vv-scope="form-2">
                    <div class="password-creator" style="display: none;">
                        <div class="password-before"><i class="bi bi-shield-lock"></i>
                            <input class="password-input old" type="password" ref="oldPwd" placeholder="请输入旧的密码" v-model="oldPwd" name="oldPwd" v-validate="{ required: true, regex: /^[\w!-@#$%^&*]{6,16}$/ }">
                            <i class="bi distin bi-eye-slash"></i>
                            <!-- <i class="bi bi-eye"></i> -->
                            <i class="bi tips"></i>
                            <!-- <i class="bi bi-check-lg"></i> bi-exclamation-lg-->
                        </div>

                        <div class="password-before"><i class="bi bi-shield-lock"></i>
                            <input class="password-input new" type="password" ref="newPwd" placeholder="请设置新的密码" v-model="newPwd" name="newPwd" v-validate="{ required: true, is_not:oldPwd, regex: /^[\w!-@#$%^&*]{6,16}$/}">
                            <i class="bi distin bi-eye-slash"></i>
                            <!-- <i class="bi bi-eye"></i> -->
                            <i class="bi tipstow"></i>
                            <!-- <i class="bi bi-exclamation-lg"></i> -->
                        </div>
                        <div class="password-btn">
                            <span></span>
                            <input class="password-save" type="submit" value="保存设置" @click.prevent="UpdatePassword">
                        </div>
                    </div>
                </form>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'

import { Message } from 'element-ui';
import {setPassword, details, setInfo, dropDown} from '../../../../js/User/index'
export default {
    name:'EditInfo',
    data() {
        return {
            nickname:'',
            email:'',
            gender:'',
            introduce:'',
            oldPwd:'',
            newPwd:''
        }
    },
    mounted() {
        
        setPassword(),
        details(),
        setInfo(),
        dropDown(),
        $(".user-button").hide();
        $(".user-info-sub").show();
        this.nickname = this.userInfo.nickname;
        this.email = this.userInfo.email
        this.gender = this.userInfo.gender
        this.introduce = this.userInfo.introduce
    },
    methods: {
        async UpdateUserInfo(){
            const success = await this.$validator.validateAll('form-1');
            // console.log(success);
            if(success){
                // this.$refs.ConfirmChange.style.cursor = 'pointer'
                const {nickname, email, gender, introduce} = this
                if(nickname !== this.userInfo.nickname || email !== this.userInfo.email || gender !== this.userInfo.gender || introduce !==this.userInfo.introduce){
                    try {
                        await this.$store.dispatch('user/UpdateUserInfo',{nickname, email, gender, introduce});
                        await this.$store.dispatch('user/getUserInfo');
                        Message({
                            type:'success',
                            message: '修改成功！',
                            customClass:'messageSuccess',
                            duration:2500
                        })

                    } catch (error) {
                        Message({
                            type:'error',
                            message: '修改失败！'+error,
                            customClass:'messageError',
                            duration:2500
                        })
                    }
                }else{
                    Message({
                        type:'error',
                        message: '未修改个人信息',
                        customClass:'NotModifyInfo',
                        duration:2500
                    })
                }
            }else{
                // this.$refs.ConfirmChange.style.cursor = 'not-allowed'
            }
        },
        async UpdatePassword(){
            const success = await this.$validator.validateAll('form-2');
            // console.log(success);
            if(success){
                const {oldPwd, newPwd} = this

                try {

                    await this.$store.dispatch('user/UpdatePassword',{oldPwd, newPwd});
                    Message({
                            type:'success',
                            message: '修改密码成功！',
                            customClass:'messageSuccess',
                            duration:2500
                        })
                        this.oldPwd=''
                        this.newPwd=''
                } catch (error) {
                    Message({
                            type:'error',
                            message: '修改失败！'+error,
                            customClass:'messageError',
                            duration:2500
                        })
                }

            }
        }
    },
    computed:{
		...mapState('user',['userInfo'])
        
	},
    
}
</script>

<style>
.NotModifyInfo{
    min-width: 169px !important;
}
</style>