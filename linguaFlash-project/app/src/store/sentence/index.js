import { reqGetUserNeedSentence, reqUpdateUserSentenceProficiency, reqUpdatePlanSentenceComplete, reqUpdateUserPlanSentenceComplete, reqUpdatePlanSentencePlan } from '@/api/index'


const state = {
    UserNeedSentence: [],//用户当天所需要的的句子
}

const mutations = {
    GETUSERNEEDSENTENCE(state, UserNeedSentence) {
        state.UserNeedSentence = UserNeedSentence
    },
}

const actions = {


    //获取用户当天所需要的的句子
    async GetUserNeedSentence({ commit }) {
        let result = await reqGetUserNeedSentence()
        console.log(result)
        if (result.status == 0) {
            commit("GETUSERNEEDSENTENCE", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //修改用户的句子的熟练度 +1 加到5时修改islearned为1(已学会)
    async UpdateUserSentenceProficiency({ commit }, { id }){
        let result = await reqUpdateUserSentenceProficiency(id)
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //修改用户句子实际完成的单词数(和时间戳)
    async UpdatePlanSentenceComplete({ commit }) {
        let result = await reqUpdatePlanSentenceComplete()
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //修改用户句子实际完成的单词数(和时间戳)传参
    async UpdateUserPlanSentenceComplete({ commit }, { complete }) {
        let result = await reqUpdateUserPlanSentenceComplete(complete)
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //修改用户的计划学习句子数
    async UpdateUserPlanSentencePlan({ commit },{ complete}){
        let result = await reqUpdatePlanSentencePlan(complete)
        console.log(result)
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