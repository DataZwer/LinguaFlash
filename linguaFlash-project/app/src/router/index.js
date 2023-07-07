
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'
//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Control from '@/pages/Home/Control'
import Card from '@/pages/Home/Card'
import Spell from '@/pages/Home/Spell'
import Choice from '@/pages/Home/Choice'
import Sentence from '@/pages/Home/Choice/Sentence'
import Fill from '@/pages/Home/Choice/Fill'
import User from '@/pages/Home/User'
import UserInfo from '@/pages/Home/User/UserInfo'
import EditInfo from '@/pages/Home/User/EditInfo'
import EditInfoBack from '@/pages/Home/User/EditInfoBack'
import Word from '@/pages/Home/Word'
import Collect from '@/pages/Home/Word/Collect'
import Learn from '@/pages/Home/Word/Learn'

//备份VueRouter.prototype原有的push|replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    //函数对象的apply与call的区别?
    //相同点:都可以改变函数的上下文一次，而且函数会立即执行一次
    //不同：函数执行的时候，传递参数不同，apply需要的是数组，call传递参数的时候用逗号隔开
    //原始的push方法可以进行路由跳转，但是需要保证上下文this是VueRouter类的实例
    //第一种情况：外部在使用push的时候传递成功与失败的回调
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        //第二种情况：外部在使用push方法的时候没有传递成功与失败的回调函数
        originPush.call(this, location, () => { }, () => { });
    }
}
//重写VueRouter.prototype.replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    (resolve && reject) ? originReplace.call(this, location, resolve, reject) : originReplace.call(this, location, () => { }, () => { });
}

//配置路由
const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: Home,
            redirect: '/control',
            children: [
                {
                    path: 'control',
                    component: Control
                },
                {
                    path: 'card',
                    component: Card
                },
                {
                    path: 'spell',
                    component: Spell
                },
                {
                    path: 'choice',
                    component: Choice,
                    redirect: '/choice/sentence',
                    children: [
                        {
                            path: 'sentence',
                            component: Sentence,

                        },
                        {
                            path: 'fill',
                            component: Fill

                        }
                    ]
                },
                {
                    path: 'user',
                    component: User,
                    redirect: '/user/userinfo',
                    children: [
                        {
                            path: 'userinfo',
                            component: UserInfo,

                        },
                        {
                            path: 'editinfo',
                            component: EditInfo,
                            children: [
                                {
                                    path:'EditInfoBack',
                                    component: EditInfoBack
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'word',
                    component: Word,
                    redirect: '/word/collect',
                    children: [
                        {
                            path: 'collect',
                            component: Collect,

                        },
                        {
                            path: 'learn',
                            component: Learn

                        }
                    ]
                },
            ]
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        },

    ]
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let username = store.state.user.userInfo.username;
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/control')
        } else {
            if(username) {
                next()
            } else {
                try{
                    await store.dispatch('user/getUserInfo');
                    next()
                }catch(error){
                    store.commit('user/USERLOGOUT')
                    next('/login')
                }
            }

        }
    } else {

        let toPath = to.path;
        console.log(toPath);
        if(toPath.indexOf('login') != -1){
            next()
        } else if (toPath.indexOf('register') != -1){
            next()
        }else{
            next('/login')
        }
    }

})

export default router;
