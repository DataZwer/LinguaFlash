import { reqGetUserForeign, reqGetAllForeigns, reqUpdateUserForeign, reqGetUserPlan, reqGetAllSubjects, reqGetUserSubjects, reqAddUserSubject, reqDeleteUserSubject, reqUpdatePlan, reqUpdateUserCollectWords, reqUpdateUserLearnedWords, reqUserBuySubject } from "@/api"

const state = {
    ForModFlag:false,
    SubModFlag:false,
    PlanModFlag:false,
    userForeign: {},
    allForeigns:{},
    userPlan:[],
    allSubjects:[],
    SubModInfo:{},
    userSubjects:[]
};

const mutations = {
    //存储用户所选的外语课程
    GETUSERFOREIGN(state, userForeign) {
        state.userForeign = userForeign;
    },
    //存储所有外语课程
    GETALLFOREIGNS(state, allForeigns){
        state.allForeigns = allForeigns
    },
    //存储用户学习计划
    GETUSERPLAN(state, userPlan){
        state.userPlan = userPlan
    },
    //存储所有主题课程
    GETALLSUBJECTS(state, allSubjects){
        state.allSubjects = allSubjects
    },
    //存储主题课程模态框信息
    GETSUBMODINFO(state, SubModInfo){
        state.SubModInfo = SubModInfo
    },
    //存储用户的主题课程
    GETUSERSUBJECTS(state, userSubjects){
        state.userSubjects = userSubjects
    }

};

const actions = {
    //获取用户所选外语课程
    async GetUserForeign({ commit }) {
        let result = await reqGetUserForeign()
        console.log(result);
        if (result.status == 0) {
            commit("GETUSERFOREIGN", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //查询所有外语课程
    async GetAllForeigns({ commit }){
        let result = await reqGetAllForeigns()
        console.log(result);
        if (result.status == 0) {
            commit("GETALLFOREIGNS", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //更新用户所选外语课程
    async UpdateUserForeign({ commit }, { foreign_courses}){
        let result = await reqUpdateUserForeign(foreign_courses)
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //获取用户学习计划
    async GetUserPlan({ commit }){
        let result = await reqGetUserPlan()
        console.log(result);
        if (result.status == 0) {
            commit("GETUSERPLAN", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //获取所有主题课程
    async GetAllSubjects({ commit }){
        let result = await reqGetAllSubjects()
        console.log(result);
        if (result.status == 0) {
            commit("GETALLSUBJECTS", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //获取用户已激活的主题课程
    async GetUserSubjects({ commit }){
        let result = await reqGetUserSubjects()
        console.log(result);
        if (result.status == 0) {
            commit("GETUSERSUBJECTS", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //根据主题课程Id增加用户主题课程
    // async AddUserSubject({ commit },{id}){
    //     let result = await reqAddUserSubject(id)
    //     console.log(result);
    //     if (result.status == 0) {
    //         return 'ok';
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },
    //根据主题课程Id购买主题课程
    async AddUserSubject({ commit },{id}){
        let result = await reqUserBuySubject(id)
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //删除用户已激活的主题课程
    async DeleteUserSubject({ commit },{id}){
        let result = await reqDeleteUserSubject(id)
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //修改用户的计划学习单词数
    async UpdateUserPlan({ commit }, { complete }){
        let result = await reqUpdatePlan(complete)
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //更新用户的收藏单词数信息接口
    async UpdateUserCollectWords({ commit }) {
        let result = await reqUpdateUserCollectWords()
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //更新用户的已学会单词数信息接口
    async UpdateUserLearnedWords({ commit }) {
        let result = await reqUpdateUserLearnedWords()
        console.log(result);
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    }
    

};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}