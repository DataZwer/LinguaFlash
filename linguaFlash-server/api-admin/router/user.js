const express = require('express')

const router = express.Router()

const user_handler = require('../router_handler/user')

const expressJoi = require('@escook/express-joi')//验证表单数据中间件

const { get_user_schema, add_user_schema, update_status_schema, update_user_schema, delete_user_schema } = require('../schema/user')//验证规则


//获取用户列表
router.post('/userlist/:pageNum/:pageSize', expressJoi(get_user_schema), user_handler.getUserList)

//获取全部外语课程(增加用户列表时用)
router.get('/getforeign', user_handler.getAllForeignCourses)

//增加用户列表
router.post('/add/user', expressJoi(add_user_schema), user_handler.addUserList)

//更改状态
router.get('/update/status', expressJoi(update_status_schema), user_handler.updateUserStatus)

//更改用户列表信息
router.post('/update/user/:id', expressJoi(update_user_schema), user_handler.updateUserInfo)

//删除用户列表
router.get('/delete/user/:id', expressJoi(delete_user_schema), user_handler.deleteUser)

module.exports = router