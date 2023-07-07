const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

//注册昵称（不必需）
const keyword = joi.string().min(1).max(20).empty('')

const id = joi.number().integer().min(1).required()
const status = joi.number().valid(0, 1).required()

const name = joi.string().min(1).max(10).required()
const introduce = joi.string().min(1).max(50).required()


//获取外语课程
exports.get_foreign_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword
    }
}

//更改状态
exports.update_status_schema = {
    query: {
        id,
        status,
    }
}

//更改外语课程
exports.update_foreign_schema = {
    params: {
        id
    },
    body: {
        name,
        introduce,
        status
    }
}

//删除外语课程
exports.delete_foreign_schema = {
    params: {
        id
    }
}
