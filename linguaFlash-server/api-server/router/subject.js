const express = require('express')

const router = express.Router()

const subject_handler = require('../router_handler/subject')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

const { get_usersub_schema, delete_usersub_schema, get_onesub_schema, buy_onesub_schema } = require('../schema/subject')


//获取所有主题课程
router.get('/getsubjects', subject_handler.getAllSubjects)

//获取用户已激活的主题课程
router.get('/getusersub', subject_handler.getAllUserSubject)

//根据id增加用户激活的主题课程
router.post('/addusersub/:id', expressJoi(get_usersub_schema), subject_handler.addUserSubject)

//根据id删除用户已激活的主题课程
router.get('/delusersub/:id', expressJoi(delete_usersub_schema), subject_handler.deleteUserSubjectById)

//根据id查询一条主题课程信息
router.get('/getonesub/:id', expressJoi(get_onesub_schema), subject_handler.getOneSubjectById)

//根据id购买主题课程
router.post('/buysubject/:id', expressJoi(buy_onesub_schema), subject_handler.buyOneSubjectById)

module.exports = router