const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

//注册昵称（不必需）
const keyword = joi.string().min(1).max(20).empty('')

const user_id = joi.number().integer().min(1).required()
const subject_id = joi.number().integer().min(1).required()

// 获取用户主题课程列表
exports.get_userSubject_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword
    }
}

// 添加用户主题课程列表
exports.add_userSubject_schema = {
    body: {
        user_id,
        subject_id
    }
}

// 删除用户主题课程列表
exports.delete_userSubject_schema = {
    query: {
        user_id,
        subject_id
    }
}