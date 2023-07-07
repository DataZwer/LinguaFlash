const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/user')

const expressJoi = require('@escook/express-joi')//验证表单数据中间件
const { reg_login_schema,reg_register_schema } = require('../schema/user')//验证规则


// 注册
router.post('/register', expressJoi(reg_register_schema), userHandler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router
