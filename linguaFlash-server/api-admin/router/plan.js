const express = require('express')

const router = express.Router()

const plan_handler = require('../router_handler/plan')

const expressJoi = require('@escook/express-joi')//验证表单数据中间件

const { get_wordPlan_schema, update_wordplan_schema, update_sentenceplan_schema } = require('../schema/plan')//验证规则


//获取用户单词计划列表
router.post('/getlist/:pageNum/:pageSize', expressJoi(get_wordPlan_schema), plan_handler.getWordPlan)

//更改用户单词计划
router.post('/update/wordplan', expressJoi(update_wordplan_schema), plan_handler.updateWordPlan)

//更改用户单词计划
router.post('/update/sentenceplan', expressJoi(update_sentenceplan_schema), plan_handler.updateSentencePlan)

module.exports = router