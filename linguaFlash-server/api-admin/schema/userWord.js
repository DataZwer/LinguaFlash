const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

const keyword = joi.string().min(1).max(20).empty('')
const id = joi.number().integer().min(1).required()

const user_id = joi.number().integer().min(1).required()
const word_id = joi.number().integer().min(1).required()

const iscollect = joi.number().valid(0, 1).required()
const islearned = joi.number().valid(0, 1).required()


// 获取用户主题课程列表
exports.get_userWord_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword,
        id
    }
}

// 添加用户主题课程列表
exports.add_userWord_schema = {
    body: {
        user_id,
        word_id
    }
}

exports.get_userinfo_schema = {
    body: {
        id
    }
}

exports.update_iscollect_schema = {
    query: {
        user_id,
        word_id,
        iscollect
    }
}

exports.update_islearned_schema = {
    query: {
        user_id,
        word_id,
        islearned
    }
}

// 删除用户主题课程列表
exports.delete_userWord_schema = {
    query: {
        user_id,
        word_id,
    }
}