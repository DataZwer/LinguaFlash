const express = require('express')
const router = express.Router()

const adminHandler = require('../router_handler/admin')

const expressJoi = require('@escook/express-joi')//验证表单数据中间件
const { reg_login_schema, reg_register_schema } = require('../schema/admin')//验证规则

// 注册
router.post('/admin/register', expressJoi(reg_register_schema), adminHandler.regAdmin)

// 登录
router.post('/admin/login', expressJoi(reg_login_schema), adminHandler.loginAdmin)

// 管理员信息
router.get('/admin/getinfo', adminHandler.getAdminInfo)

module.exports = router
