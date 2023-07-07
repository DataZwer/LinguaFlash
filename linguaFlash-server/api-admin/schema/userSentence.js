const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

const keyword = joi.string().min(1).max(20).empty('')
const id = joi.number().integer().min(1).required()

const user_id = joi.number().integer().min(1).required()
const sentence_id = joi.number().integer().min(1).required()

const iscollect = joi.number().valid(0, 1)
const islearned = joi.number().valid(0, 1)

const proficiency = joi.number().integer().min(0).max(5)
const proficiency1 = joi.number().integer().min(0).max(5).required()



// 获取用户主题课程列表
exports.get_userSentence_schema = {
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
exports.add_userSentence_schema = {
    body: {
        user_id,
        sentence_id,
        proficiency,
        islearned
    }
}

// 修改用户句子信息
exports.update_userSentence_schema = {
    body: {
        user_id,
        sentence_id,
        proficiency: proficiency1,
        islearned
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
        sentence_id,
        iscollect
    }
}

exports.update_islearned_schema = {
    query: {
        user_id,
        sentence_id,
        islearned
    }
}

// 删除用户主题课程列表
exports.delete_userSentence_schema = {
    query: {
        user_id,
        sentence_id,
    }
}