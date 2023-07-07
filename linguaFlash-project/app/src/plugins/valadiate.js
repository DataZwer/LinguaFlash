//引入Vue
import Vue from 'vue';
//引入vee-valadiate插件
import VeeValidate from 'vee-validate'
//引入进来的是vee-valadiate提供信息提示【中文的】
import zh_CN from 'vee-validate/dist/locale/zh_CN'

import store from '@/store/user/index'
//使用插件
const config = {
    // errorBagName: 'errors',
    errorBagName: 'errorBags', // change if property conflicts.
    fieldsBagName: 'fieldBags',
};

Vue.use(VeeValidate, config)
//给VeeValidate插件提供【中文提示功能】
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    //注册：有五个字段：phone、code、password、password1、agree【将来用中文显示，别用英文】
    attributes: { // 给校验的 field 属性名映射中文名称
        // phone: '手机号',
        // code: '验证码',
        // password: '密码',
        // password1: '确认密码',
        // agree: '协议'
    }
})


//这个是vee-valadiate自定义校验规则-->同意复选框先关的
VeeValidate.Validator.extend('allow', {
    validate: value => {
        return value
    },
    getMessage: field => field + '请阅读并勾选同意协议'
})


