import Vue from 'vue'
import App from './App.vue'

//引入路由组件
import router from '@/router'
//引入
import store from '@/store'
// import { reqLogin, reqRegister } from '@/api'
// reqRegister( '123456', '1345334521@qq.com')
// reqLogin('hjb','123456')

//表单验证插件
import '@/plugins/valadiate'
import { MessageBox, Button, Message, Popover, Dialog, Form, FormItem, Input, Select, Option, InputNumber, Tooltip, Loading, Rate, Switch } from 'element-ui'



Vue.config.productionTip = false

Vue.component(MessageBox.name, MessageBox);

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(InputNumber)
Vue.use(Tooltip)
Vue.use(Rate);
Vue.use(Switch);
new Vue({
  render: h => h(App),
  router,
  //注册仓库
  store
}).$mount('#app')
