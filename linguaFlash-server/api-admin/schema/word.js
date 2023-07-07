const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

//注册昵称（不必需）
const keyword = joi.string().min(1).max(20).empty('')

const id = joi.number().integer().min(1).required()
// const status = joi.number().valid(0, 1).required()

const words = joi.string().min(1).max(45).required()
const translation = joi.string().min(1).max(100).required()
const phonetic = joi.string().min(1).max(100).required()
const otherforms = joi.string().min(1).max(9999)
const notes = joi.string().min(1).max(9999)
const category = joi.number().integer().min(1).required()



//获取单词
exports.get_word_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword
    }
}

//添加单词
exports.add_word_schema = {
    body: {
        words,
        translation,
        phonetic,
        otherforms,
        notes,
        category
    }
}

//更改单词
exports.update_word_schema = {
    params: {
        id
    },
    body: {
        words,
        translation,
        phonetic,
        otherforms,
        notes,
        category
    }
}

//删除单词
exports.delete_word_schema = {
    params: {
        id
    }
}
