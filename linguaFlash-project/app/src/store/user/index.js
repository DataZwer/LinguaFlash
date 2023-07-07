import { reqRegister, reqLogin, reqUserInfo, reqUpdateUserInfo, reqUpdateUserPassword, reqUpdateUserAvatar } from "@/api"
import { setToken, getToken, clearToken } from '@/utils/token'
import { setRememberMeInfo, getRememberMeInfo, clearRememberMeInfo } from '@/utils/rememberMeInfo'
import { setIsRemember, getIsRemember, clearIsRemember } from '@/utils/isRemember'


//登录与注册模块仓库
const state = {

    token: getToken(),
    userInfo: {},
    isRemember: false,
    rememberMeInfo: {
        username: '',
        nickname: '',
        email: '',
        date: '',
        user_pic: '',
    }
}

const mutations = {

    SETTOKEN(state, token) {
        state.token = token;
    },
    //存储用户信息
    GETUSERINGO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //退出登录情况全部用户信息
    USERLOGOUT(state) {
        state.token = '';
        state.userInfo = {};
        //本地存储数据【token】
        clearToken();
    },
    //是否记住密码
    ISREMEMBER(state) {
        state.rememberPassword = true
        setIsRemember(state.rememberPassword)
    },
    //记住密码时的快速登录所用的信息
    QUICKLOGININFO(state, { username, nickname, email, date, user_pic, password }) {
        state.rememberMeInfo.username = username
        state.rememberMeInfo.nickname = nickname
        state.rememberMeInfo.email = email
        state.rememberMeInfo.date = date
        state.rememberMeInfo.user_pic = user_pic
        setRememberMeInfo(state.rememberMeInfo)
    }
}

const actions = {

    //用户注册
    async userRegister({ commit }, { username, password, email }) {

        let result = await reqRegister(username, password, email)
        console.log(result);
        if (result.status == 0) {
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },

    //用户登录(自动登录版)
    async userLogin({ commit }, { username, password }) {

        let result = await reqLogin(username, password)

        console.log(result);
        if (result.status == 0) {

            commit("SETTOKEN", result.token)
            setToken(result.token)
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }

    },

    //用户登录(不自动登录版)
    // async userLoginNoAuto({commit}, {username, password}){

    //     let result = await reqLogin(username, password)

    //     console.log(result);
    //     if (result.status == 0){

    //         commit("SETTOKEN", result.token)
    //         setToken(result.token)
    //         return 'ok'
    //     } else {
    //         return Promise.reject(result.message)
    //     }

    // },

    //获取用户信息
    async getUserInfo({ commit }) {
        //为什么用户已经登录：但是获取不到用户信息，因为获取用户信息需要携带token
        let result = await reqUserInfo();
        console.log(result);
        if (result.status == 0) {
            commit("GETUSERINGO", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //更新用户的基本信息
    async UpdateUserInfo({ commit }, { nickname, email, gender, introduce }) {
        let result = await reqUpdateUserInfo(nickname, email, gender, introduce)
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //重置密码
    async UpdatePassword({ commit }, { oldPwd, newPwd }) {
        let result = await reqUpdateUserPassword(oldPwd, newPwd)
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //更换头像
    async UpdateUserAvatar({ commit }, { avatar }) {
        let result = await reqUpdateUserAvatar(avatar)
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    }

}
const getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}