import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

import home from './home'
import user from './user'
import card from './card'
import spell from './spell'
import word from './word';
import sentence from './sentence';
import fill from './fill';
// const state = {};

// const mutations = {};

// const actions = {};

// const getters = {};

export default new Vuex.Store({
    modules:{
        home,
        user,
        card,
        spell,
        word,
        sentence,
        fill
    }
})