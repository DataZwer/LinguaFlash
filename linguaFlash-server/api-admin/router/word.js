const express = require('express')

const router = express.Router()

const word_handler = require('../router_handler/word')

const expressJoi = require('@escook/express-joi')//验证表单数据中间件

const { get_word_schema, add_word_schema, update_word_schema, delete_word_schema } = require('../schema/word')//验证规则


//获取单词
router.post('/wordlist/:pageNum/:pageSize', expressJoi(get_word_schema), word_handler.getWordList)

//获取全部主题课程(增加单词时用)
router.get('/getsubject', word_handler.getAllSubjectCourses)

//增加单词
router.post('/add/word', expressJoi(add_word_schema), word_handler.addWord)

//更改单词信息
router.post('/update/word/:id', expressJoi(update_word_schema), word_handler.updateWordInfo)

// //删除单词
router.get('/delete/word/:id', expressJoi(delete_word_schema), word_handler.deleteWord)

module.exports = router