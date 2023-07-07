import { reqGetUserNoLearnWord, reqUpdateWordLearning, reqGetNeedNoLearnWord, reqUpdatePlanComlpete, reqUpdatePlanTimeStamp, reqAddPlanForUserRegister, reqGetLearnWordBySelect, reqGetUserWordStateById, reqUpdateUserWordIscollect, reqUpdateUserWordNotcollect, reqGetUserNoLearnWordBySelect } from '@/api/index'


const state = {
    userNoLearnWords:[],//用户所有未学会单词
    needNoLearnWords:[],//用户计划所需的未学会单词
    LearnWordBySelect:[],//根据用户选择的已学会单词
    userWordStateById: [],//根据用户选择的单词的状态
    userReviewWordStateById: [],//根据用户选择的单词的状态(复习版)

}

const mutations = {
    GETUSERNOLEARN(state, userNoLearnWords){
        state.userNoLearnWords = userNoLearnWords
    },
    GETNEEDNOLEARN(state, needNoLearnWords){
        state.needNoLearnWords = needNoLearnWords
    },
    GETLEARNWORDBYSELECT(state, LearnWordBySelect){
        state.LearnWordBySelect = LearnWordBySelect
    },
    GETUSERWORDSTATEBYID(state, userWordStateById){
        state.userWordStateById = userWordStateById
    },
    GETUSERREVIEWWORDSTATEBYID(state, userReviewWordStateById) {
        state.userReviewWordStateById = userReviewWordStateById
    }

}

const actions = {

    //获取用户所有还未学会的单词
    async GetUserNoLearn({ commit }) {
        let result = await reqGetUserNoLearnWord()
        console.log(result)
        if (result.status == 0) {
            commit("GETUSERNOLEARN", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    // 根据单词id标记单词为已学会
    async UpdateWordLearning({ commit },{id}){
        let result = await reqUpdateWordLearning(id)
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    //获取用户当天所需的未学会的单词（根据用户学习计划 随机获取）
    async GetNeedNoLearnWord({ commit }){
        let result = await reqGetNeedNoLearnWord()
        console.log(result)
        if (result.status == 0) {
            commit("GETNEEDNOLEARN", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //更新用户当天实际已完成的单词数
    async UpdatePlanComlete({ commit }, { complete }){
        let result = await reqUpdatePlanComlpete(complete)
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //更新用户的学习计划的时间戳为当前时间(更新 complete 用)
    async UpdatePlanTimeStamp({ commit }){
        let result = await reqUpdatePlanTimeStamp()
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //新增学习计划接口(用户注册时添加)
    async AddPlanForUserRegister({ commit }){
        let result = await reqAddPlanForUserRegister()
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //获取用户已学会的单词（根据用户选择 随机获取）
    async GetLearnWordBySelect({ commit },{number}){
        let result = await reqGetLearnWordBySelect(number)
        console.log(result)
        if (result.status == 0) {
            commit("GETLEARNWORDBYSELECT", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //根据单词id获取用户单词的状态
    async GetUserWordStateById({ commit }, {id}){
        let result = await reqGetUserWordStateById(id)
        console.log(result)
        if (result.status == 0) {
            commit("GETUSERWORDSTATEBYID", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //根据单词id获取用户单词的状态(复习版)
    async GetUserReviewWordStateById({ commit }, { id }) {
        let result = await reqGetUserWordStateById(id)
        console.log(result)
        if (result.status == 0) {
            commit("GETUSERREVIEWWORDSTATEBYID", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //根据单词id收藏用户单词接口
    async UpdateUserWordIscollect({ commit },{id}){
        let result = await reqUpdateUserWordIscollect(id)
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //根据单词id取消收藏用户单词接口
    async UpdateUserWordNotcollect({ commit }, { id }) {
        let result = await reqUpdateUserWordNotcollect(id)
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //获取用户未学会的单词（根据用户选择 随机获取）
    async GetUserNoLearnWordBySelect({ commit }, { number }){
        let result = await reqGetUserNoLearnWordBySelect(number)
        console.log(result)
        if (result.status == 0) {
            commit("GETNEEDNOLEARN", result.data);
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