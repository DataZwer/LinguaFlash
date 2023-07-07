const express = require('express')

const router = express.Router()

const expressJoi = require('@escook/express-joi')

const { get_userSentence_schema, add_userSentence_schema, update_userSentence_schema, get_userinfo_schema, update_iscollect_schema, update_islearned_schema, delete_userSentence_schema } = require('../schema/userSentence')

const userSentence_handler = require('../router_handler/userSentence')


// 获取所有用户句子信息
router.post('/getlist/:pageNum/:pageSize', expressJoi(get_userSentence_schema), userSentence_handler.getUserSentenceList)

//获取所有句子(增加用户句子时用)
router.post('/get/allsentence', userSentence_handler.getAllSentence)

// 增加用户句子
router.post('/add/userSentence', expressJoi(add_userSentence_schema), userSentence_handler.addUserSentence)

//根据句子 id 修改用户句子的收藏状态
// router.get('/update/iscollect', expressJoi(update_iscollect_schema), userSentence_handler.updataIscollect)

//根据句子 id 修改用户句子的学会状态
router.get('/update/islearned', expressJoi(update_islearned_schema), userSentence_handler.updataIslearned)

// 修改用户句子信息
router.post('/update/usersentence', expressJoi(update_userSentence_schema), userSentence_handler.updateUserSentence)

// 删除用户句子
router.get('/delete/userSentence', expressJoi(delete_userSentence_schema), userSentence_handler.deleteUserSentence)



module.exports = router


