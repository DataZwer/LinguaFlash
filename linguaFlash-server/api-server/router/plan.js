const express = require('express')

const router = express.Router()

const plan_handler = require('../router_handler/plan')

const expressJoi = require('@escook/express-joi')

const { update_plancomplete_schema } = require('../schema/plan')


//添加一条用户学习计划(注册时用)
router.post('/addplan',plan_handler.addOneUserPlan)

//获取用户的学习计划
router.get('/getplan',plan_handler.getOneUserPlan)

//修改用户当天实际已完成的单词数(根据complete)
router.get('/upcomplete/:complete', expressJoi(update_plancomplete_schema), plan_handler.UpdateUserPlanComplete)

//修改用户的学习计划的时间戳为当前时间
router.get('/uptimeStamp', plan_handler.UpdateUserPlanTimeStamp)

//修改用户的计划学习单词数
router.get('/upplan/:complete', expressJoi(update_plancomplete_schema), plan_handler.UpdateUserPlan)

//修改学习计划sentence_complete+1 并修改时间戳sentence_timeStamp为当前时间
router.post('/upsencomple', plan_handler.UpdateUserSentenceCompleteAddOne )

//修改学习计划sentence_complete 并修改时间戳sentence_timeStamp为当前时间（传参，不+1）
router.post('/upsencomplete/:complete', expressJoi(update_plancomplete_schema), plan_handler.UpdateUserSentenceComplete)

//修改用户的计划学习句子数
router.get('/upsenplan/:complete', expressJoi(update_plancomplete_schema), plan_handler.UpdateUserPlanSentencePlan)


module.exports = router