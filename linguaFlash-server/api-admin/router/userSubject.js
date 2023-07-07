const express = require('express')

const router = express.Router()

const expressJoi = require('@escook/express-joi')

const { get_userSubject_schema, add_userSubject_schema, delete_userSubject_schema } = require('../schema/userSubject')

const userSubject_handler = require('../router_handler/userSubject')


// 获取所有用户主题课程信息
router.post('/getlist/:pageNum/:pageSize', expressJoi(get_userSubject_schema), userSubject_handler.getUserSubjectList)

// 获取所有用户(增加用户主题课程时用)
router.post('/get/alluser', userSubject_handler.getAllUser)

// 获取所有主题课程(增加用户主题课程时用)
router.post('/get/allsubject', userSubject_handler.getAllSubject)

// 增加用户主题课程
router.post('/add/usersubeject', expressJoi(add_userSubject_schema), userSubject_handler.addUserSubject)

// 删除用户主题课程
router.get('/delete/usersubject', expressJoi(delete_userSubject_schema), userSubject_handler.deleteUserSubject)



module.exports = router
