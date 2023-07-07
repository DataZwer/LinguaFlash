import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
    }]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    name: 'System',
    meta: { title: '系统', icon: 'el-icon-setting' },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu'),
        meta: { title: '菜单列表', icon: 'el-icon-menu' }
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/system/admin'),
        meta: { title: '管理员列表', icon: 'el-icon-s-custom' }
      },
      {
        path: 'pass',
        name: 'Pass',
        component: () => import('@/views/system/pass'),
        meta: {
          title: '修改密码', icon: 'password' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/role',
    meta: { title: '用户', icon: 'el-icon-user' },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/user/role'),
        meta: { title: '用户列表', icon: 'el-icon-user-solid' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/user/order'),
        meta: { title: '用户订单',icon: 'el-icon-s-order' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/foreign',
    name: 'Course',
    meta: {
      title: '课程',
      icon: 'el-icon-data-analysis'
    },
    children: [
      {
        path: 'foreign',
        component: () => import('@/views/course/foreign'), // Parent router-view
        name: 'Foreign',
        meta: { title: '外语课程', icon: 'el-icon-notebook-1' },
      },
      {
        path: 'subject',
        component: () => import('@/views/course/subject'),
        name: 'Subject',
        meta: { title: '主题课程', icon: 'el-icon-collection' },
        // children: [
        //   {
        //     path: 'subjectList',
        //     component: () => import('@/views/course/subject/subjectList'),
        //     name: 'SubjectList',
        //     meta: { title: '课程列表', icon: 'el-icon-s-grid' }
        //   },
        //   {
        //     path: 'userSubject',
        //     component: () => import('@/views/course/subject/userSubject'),
        //     name: 'UserSubject',
        //     meta: { title: '用户课程', icon: 'el-icon-s-grid' },
        //   }
        // ]
      },
      {
        path: 'userSubject',
        component: () => import('@/views/course/subject/userSubject'), // Parent router-view
        name: 'UserSubject',
        meta: { title: '用户课程', icon: 'el-icon-notebook-2' },
      },
    ]
  },

  {
    path: '/study',
    component: Layout,
    redirect: '/study/card',
    name: 'Study',
    meta: {
      title: '学习',
      icon: 'nested'
    },
    children: [
      {
        path: 'card',
        component: () => import('@/views/study/card'), // Parent router-view
        redirect: '/study/card/wordList',
        name: 'Card',
        meta: { title: '词卡', icon: 'el-icon-postcard'},
        children: [
          {
            path: 'wordList',
            component: () => import('@/views/study/card/wordList'),
            name: 'WordList',
            meta: { title: '单词列表', icon: 'el-icon-s-grid' }
          },
          {
            path: 'userWord',
            component: () => import('@/views/study/card/userWord/index'),
            name: 'UserWord',
            meta: { title: '用户单词', icon: 'el-icon-s-grid' },
          },
          {
            path: 'userWordView',
            component: () => import('@/views/study/card/userWord/UserWordView'),
            name: 'UserWordView',
            meta: { title: '用户已激活单词', icon: 'el-icon-s-grid' },
            hidden: true
          }
        ]
      },
      {
        path: 'sentence',
        component: () => import('@/views/study/sentence'),
        redirect: '/study/sentence/sentenceList',
        name: 'Sentence',
        meta: { title: '句子', icon: 'el-icon-chat-line-square' },
        children: [
          {
            path: 'sentenceList',
            component: () => import('@/views/study/sentence/sentenceList'),
            name: 'SentenceList',
            meta: { title: '句子列表', icon: 'el-icon-s-grid' }
          },
          {
            path: 'userSentence',
            component: () => import('@/views/study/sentence/userSentence/index'),
            name: 'UserSentence',
            meta: { title: '用户句子', icon: 'el-icon-s-grid' },
          },
          {
            path: 'userSentenceView',
            component: () => import('@/views/study/sentence/userSentence/UserSentenceView'),
            name: 'UserSentenceView',
            meta: { title: '用户已激活句子' },
            hidden: true
          }
        ]
      }
    ]
  },

  {
    path: '/plan',
    component: Layout,
    redirect: '/plan/wordplan',
    meta: { title: '计划', icon: 'el-icon-user' },
    children: [
      {
        path: 'wordplan',
        name: 'WordPlan',
        component: () => import('@/views/plan/wordplan/index'),
        meta: { title: '单词计划', icon: 'el-icon-user-solid' }
      },
      {
        path: 'sentenceplan',
        component: () => import('@/views/plan/sentenceplan/index'),
        name: 'SentencePlan',
        meta: { title: '句子计划', icon: 'el-icon-s-order' }
      }
    ]
  },

  {
    path: '/set',
    component: Layout,
    redirect: '/set/question',
    name: 'Set',
    meta: { title: '设置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'question',
        name: 'Question',
        component: () => import('@/views/set/question/index'),
        meta: { title: '常见问题', icon: 'el-icon-question' }
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/set/notice/index'),
        meta: {
          title: '公告设置', icon: 'el-icon-s-comment' }
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/set/feedback/index'),
        meta: { title: '内容反馈', icon: 'el-icon-s-opportunity' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://localhost:8080/',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
