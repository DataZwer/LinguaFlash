const express = require('express')

const router = express.Router()

const sentence_handler = require('../router_handler/sentence')

const expressJoi = require('@escook/express-joi')//验证表单数据中间件

const { get_sentence_schema, add_sentence_schema, update_sentence_schema, delete_sentence_schema } = require('../schema/sentence')//验证规则


//获取句子
router.post('/sentencelist/:pageNum/:pageSize', expressJoi(get_sentence_schema), sentence_handler.getSentenceList)

//获取全部主题课程(增加句子时用)
router.get('/getsubject', sentence_handler.getAllSubjectCourses)

//增加句子
router.post('/add/sentence', expressJoi(add_sentence_schema), sentence_handler.addSentence)

//更改句子信息
router.post('/update/sentence/:id', expressJoi(update_sentence_schema), sentence_handler.updateSentenceInfo)

//删除句子
router.get('/delete/sentence/:id', expressJoi(delete_sentence_schema), sentence_handler.deleteSentence)


module.exports = router