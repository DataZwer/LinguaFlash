const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

//注册昵称（不必需）
const keyword = joi.string().min(1).max(20).empty('')

const id = joi.number().integer().min(1).required()
// const status = joi.number().valid(0, 1).required()

const En_sentence = joi.string().min(1).max(100).required()
const Ch_sentence = joi.string().min(1).max(100).required()
const confusion_En = joi.string().min(1).max(100)
const confusion_Ch = joi.string().min(1).max(100)
const category = joi.number().integer().min(1).required()


//获取句子
exports.get_sentence_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword
    }
}

//添加句子
exports.add_sentence_schema = {
    body: {
        En_sentence,
        Ch_sentence,
        confusion_En,
        confusion_Ch,
        category,
    }
}

//更改句子
exports.update_sentence_schema = {
    params: {
        id
    },
    body: {
        En_sentence,
        Ch_sentence,
        confusion_En,
        confusion_Ch,
        category,
    }
}

//删除句子
exports.delete_sentence_schema = {
    params: {
        id
    }
}
