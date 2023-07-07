const express = require('express')

const router = express.Router()

const word_handler = require('../router_handler/word')

const expressJoi = require('@escook/express-joi')

const { add_userword_schema, update_iscollect_schema, update_islearned_schema, get_unlearnSelect_schema } = require('../schema/word')



//根据主题课程 id 激活用户的主题课程单词（增加用户的单词，即购买主题课程）
router.post('/adduserword/:id', expressJoi(add_userword_schema), word_handler.addUserWord)

//获取所有用户的还未学会的单词
router.post('/getword', word_handler.getUserUnleanedWord)

//获取用户当天所需的未学会的单词（根据用户学习计划 随机获取）
router.post('/getneed', word_handler.getNeedUnleanedWord)

//获取用户未学会的单词（根据用户选择5、10、20... 随机获取）
router.post('/getneedsel/:number', expressJoi(get_unlearnSelect_schema), word_handler.getUnleanedWordBySelect)

//获取用户所有已学会的单词
router.get('/getword', word_handler.getUserLeanedWord)

//获取用户已学会的单词（根据用户选择5、10、20... 随机获取）
router.get('/getwordsel/:number', expressJoi(get_unlearnSelect_schema), word_handler.getLeanedWordBySelect)

//获取用户所有已收藏的单词
router.post('/colleword', word_handler.getUserCollectWord)

//根据单词id获取用户单词的状态
router.get('/getiscolle/:id', expressJoi(update_iscollect_schema), word_handler.getUserIsCollectById)

//根据单词id修改用户单词的状态为已收藏
router.post('/updateiscolle/:id', expressJoi(update_iscollect_schema), word_handler.updataIscollectYes)

//根据单词id修改用户单词的状态为未收藏
router.post('/updatenocolle/:id', expressJoi(update_iscollect_schema), word_handler.updataIscollectNo)

//根据单词id修改用户单词的状态为已学会
router.post('/updateislearn/:id', expressJoi(update_islearned_schema), word_handler.updataIslearnedYes)

//根据单词id修改用户单词的状态为未学会
router.post('/updatenolearn/:id', expressJoi(update_islearned_schema), word_handler.updataIslearnedNo)

//单词选择题（根据用户选择5、10、20... 随机获取题目）
router.post('/getmcq/:number', expressJoi(get_unlearnSelect_schema), word_handler.getmcqBySelect)

module.exports = router
