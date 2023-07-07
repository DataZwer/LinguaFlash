import { reqGetLearnWordBySelect, reqGetMCQBySelect } from '@/api/index'


const state = {
    LearnedWordMcq: [],//用户已学会的单词题目
}

const mutations = {
    GETMCQBYSELECT(state, LearnedWordMcq) {
        state.LearnedWordMcq = LearnedWordMcq
    },
}

const actions = {


    // //获取用户已学会的单词（根据用户选择 随机获取）
    // async GetUserLearnedWordBySelect({ commit },{number}) {
    //     let result = await reqGetLearnWordBySelect(number)
    //     console.log(result)
    //     if (result.status == 0) {
    //         commit("GETLEARNWORDBYSELECT", result.data);
    //         return 'ok';
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },

    //单词选择题（根据用户选择5、10、20… 随机获取题目
    async GetMCQBySelect({ commit }, { number }) {
        let result = await reqGetMCQBySelect(number)
        console.log(result)
        if (result.status == 0) {
            commit("GETMCQBYSELECT", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },


}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}