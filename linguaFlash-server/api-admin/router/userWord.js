const express = require('express')

const router = express.Router()

const expressJoi = require('@escook/express-joi')

const { get_userWord_schema, add_userWord_schema, get_userinfo_schema, update_iscollect_schema, update_islearned_schema, delete_userWord_schema } = require('../schema/userWord')

const userWord_handler = require('../router_handler/userWord')


// 获取所有用户单词信息
router.post('/getlist/:pageNum/:pageSize', expressJoi(get_userWord_schema), userWord_handler.getUserWordList)

// 获取所有用户(增加用户单词时用)
router.post('/get/alluser', userWord_handler.getAllUser)

// 获取所有单词(增加用户单词时用)
router.post('/get/allword', userWord_handler.getAllWord)

// 增加用户单词
router.post('/add/userword', expressJoi(add_userWord_schema), userWord_handler.addUserWord)

//根据单词 id 修改用户单词的收藏状态
router.get('/update/iscollect', expressJoi(update_iscollect_schema), userWord_handler.updataIscollect)

//根据单词 id 修改用户单词的学会状态
router.get('/update/islearned', expressJoi(update_islearned_schema), userWord_handler.updataIslearned)

// 根据 id 获取用户信息
router.post('/get/userinfo', expressJoi(get_userinfo_schema), userWord_handler.getUserInfoById)

// 删除用户单词
router.get('/delete/userWord', expressJoi(delete_userWord_schema), userWord_handler.deleteUserWord)



module.exports = router
