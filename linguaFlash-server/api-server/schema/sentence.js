// 导入定义验证规则的模块
const joi = require('joi')

// 定义 学习计划complete 的校验规则
const id = joi.number().integer().min(1).required()
// const complete = joi.number().integer().min(1).required()
// const timeStamp = joi.string().pattern(/^\d{13,}$/).min(13).required()

// 校验规则对象 - 根据 id 更新用户的句子熟练度
exports.update_proficiency_schema = {
    params: {
        id,
    }
}

// exports.update_sentenceComplete_schema = {
//     params: {
//         complete,
//     }
// }

// exports.update_plantimeStamp_schema = {
//     params: {
//         timeStamp,
//     }
// }
