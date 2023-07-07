const express = require('express')

const router = express.Router()

const sentece_handler = require('../router_handler/sentence')

const expressJoi = require('@escook/express-joi')

const { update_proficiency_schema, update_sentenceComplete_schema } = require('../schema/sentence')

//获取用户当天所需要的的句子(根据用户的学习计划 随机获取)
router.post('/getsentence', sentece_handler.getUserNeedSentence)

//修改用户的句子的熟练度 +1 加到5时修改islearned为1(已学会)
router.post('/studysentence/:id', expressJoi(update_proficiency_schema), sentece_handler.updateUserSentenceProficiency)







module.exports = router