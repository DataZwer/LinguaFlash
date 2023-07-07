const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

//注册昵称（不必需）
const keyword = joi.string().min(1).max(20).empty('')

const id = joi.number().integer().min(1).required()
const status = joi.number().valid(0, 1).required()

const name = joi.string().min(1).max(10).required()
const price = joi.number().min(0).max(99999).required()
const number = joi.number().min(1).max(99999).required()
const description = joi.string().min(1).max(999)
const category = joi.number().integer().min(1).required()
const level = joi.number().precision(1).min(0).max(5).required()


//获取外语课程
exports.get_subject_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword
    }
}

//添加外语课程
exports.add_subject_schema = {
    body: {
        name,
        price,
        number,
        description,
        category,
        level,
        status
    }
}

//更改状态
exports.update_status_schema = {
    query: {
        id,
        status,
    }
}

//更改主题课程
exports.update_subject_schema = {
    params: {
        id
    },
    body: {
        name,
        price,
        number,
        description,
        category,
        level,
        status
    }
}

//删除外语课程
exports.delete_subject_schema = {
    params: {
        id
    }
}
