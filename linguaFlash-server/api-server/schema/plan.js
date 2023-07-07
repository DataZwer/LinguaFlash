// 导入定义验证规则的模块
const joi = require('joi')

// 定义 学习计划complete 的校验规则
const complete = joi.number().integer().min(0).required()
// const timeStamp = joi.string().pattern(/^\d{13,}$/).min(13).required()

// 校验规则对象 - 根据 complete 更新用户的实际完成数
exports.update_plancomplete_schema = {
    params: {
        complete,
    }
}

// exports.update_plantimeStamp_schema = {
//     params: {
//         timeStamp,
//     }
// }
