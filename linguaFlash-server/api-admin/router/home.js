const express = require('express')

const router = express.Router()

// const expressJoi = require('@escook/express-joi')

// const { get_userSentence_schema, add_userSentence_schema, update_userSentence_schema, get_userinfo_schema, update_iscollect_schema, update_islearned_schema, delete_userSentence_schema } = require('../schema/userSentence')

const home_handler = require('../router_handler/home')


// 获取所有用户单词学习计划信息
router.post('/wordplan', home_handler.getAllUserWordPlan)

// 获取所有用户单词学习计划信息
router.post('/sentenceplan', home_handler.getAllUserSentencePlan)

// 获取所有用户、课程、单词、句子总数
router.get('/numdata', home_handler.getAllDataNumber)

// 获取外语课程饼状数据
router.get('/foreignpie', home_handler.getForeignPie)

// 获取主题课程饼状数据
router.get('/subjectpie', home_handler.getSubjectPie)

// 获取所有主题课题评分信息
router.post('/subject/level', home_handler.getAllSubjectLevel)

//获取所有句子(增加用户句子时用)
// router.post('/get/allsentence', userSentence_handler.getAllSentence)

// // 增加用户句子
// router.post('/add/userSentence', expressJoi(add_userSentence_schema), userSentence_handler.addUserSentence)

// //根据句子 id 修改用户句子的收藏状态
// // router.get('/update/iscollect', expressJoi(update_iscollect_schema), userSentence_handler.updataIscollect)

// //根据句子 id 修改用户句子的学会状态
// router.get('/update/islearned', expressJoi(update_islearned_schema), userSentence_handler.updataIslearned)

// // 修改用户句子信息
// router.post('/update/usersentence', expressJoi(update_userSentence_schema), userSentence_handler.updateUserSentence)

// // 删除用户句子
// router.get('/delete/userSentence', expressJoi(delete_userSentence_schema), userSentence_handler.deleteUserSentence)



module.exports = router


