const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

//注册昵称（不必需）
const keyword = joi.string().min(1).max(20).empty('')

const belongs_user = joi.number().integer().min(1).max(999).required()

const plan_complete = joi.number().integer().min(0).max(500).required()
const complete = joi.number().integer().min(0).max(500).required()
const timeStamp = joi.number().greater(1658508999.453)

const sentence_plan = joi.number().integer().min(0).max(500).required()
const sentence_complete = joi.number().integer().min(0).max(500).required()
const sentence_timeStamp = joi.number().greater(1658508999.453)
// const timeStamp = joi.date().timestamp()


//获取用户列表
exports.get_wordPlan_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword
    }
}

//更改用户单词计划
exports.update_wordplan_schema = {
    body: {
        belongs_user,
        plan_complete,
        complete,
        timeStamp
    }
}

//更改用户句子计划
exports.update_sentenceplan_schema = {
    body: {
        belongs_user,
        sentence_plan,
        sentence_complete,
        sentence_timeStamp
    }
}

