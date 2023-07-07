import { reqGetAllCollectWords, reqGetAllLearnedWords, reqUpdateUserWordNotcollect, reqUpdateUserWordNotLearned } from '@/api/index'


const state = {
    AllCollectWords: [],//用户所有已收藏的单词
    AllLearnedWords: [],//获取用户所有已学会的单词
}

const mutations = {
    GETALLCOLLECTWORDS(state, AllCollectWords) {
        state.AllCollectWords = AllCollectWords
    },
    GETALLLEARNEDWORDS(state, AllLearnedWords) {
        state.AllLearnedWords = AllLearnedWords
    }
}

const actions = {


    //获取用户所有已收藏的单词
    async GetAllCollectWords({ commit }) {
        let result = await reqGetAllCollectWords()
        console.log(result)
        if (result.status == 0) {
            commit("GETALLCOLLECTWORDS", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },

    //获取用户所有已学会的单词
    async GetAllLearnedWords({ commit }) {
        let result = await reqGetAllLearnedWords()
        console.log(result)
        if (result.status == 0) {
            commit("GETALLLEARNEDWORDS", result.data);
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },
    
    //根据单词id取消收藏用户单词
    async UpdateUserWordNotcollect({ commit }, { id }) {
        let result = await reqUpdateUserWordNotcollect(id)
        console.log(result)
        if (result.status == 0) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },


    //根据单词id标记单词为未学会
    async UpdateUserWordNotLearned({ commit }, { id }) {
        let result = await reqUpdateUserWordNotLearned(id)
        console.log(result)
        if (result.status == 0) {
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