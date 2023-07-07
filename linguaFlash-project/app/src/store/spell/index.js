import { reqGetLearnWordBySelect } from '@/api/index'


const state = {
    LearnWordBySelect: [],//根据用户选择的已学会单词
    // userWordStateById: [],//根据用户选择的单词的状态

}

const mutations = {
    GETLEARNWORDBYSELECT(state, LearnWordBySelect) {
        state.LearnWordBySelect = LearnWordBySelect
    },
    // GETUSERWORDSTATEBYID(state, userWordStateById) {
    //     state.userWordStateById = userWordStateById
    // },

}

const actions = {


    //获取用户已学会的单词（根据用户选择 随机获取）
    async GetLearnWordBySelect({ commit }, { number }) {
        let result = await reqGetLearnWordBySelect(number)
        console.log(result)
        if (result.status == 0) {
            commit("GETLEARNWORDBYSELECT", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    // //根据单词id获取用户单词的状态
    // async GetUserWordStateById({ commit }, { id }) {
    //     let result = await reqGetUserWordStateById(id)
    //     console.log(result)
    //     if (result.status == 0) {
    //         commit("GETUSERWORDSTATEBYID", result.data);
    //         return 'ok';
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },

    // //根据单词id收藏用户单词接口
    // async UpdateUserWordIscollect({ commit }, { id }) {
    //     let result = await reqUpdateUserWordIscollect(id)
    //     console.log(result)
    //     if (result.status == 0) {
    //         return 'ok';
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },

    // //根据单词id取消收藏用户单词接口
    // async UpdateUserWordNotcollect({ commit }, { id }) {
    //     let result = await reqUpdateUserWordNotcollect(id)
    //     console.log(result)
    //     if (result.status == 0) {
    //         return 'ok';
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}