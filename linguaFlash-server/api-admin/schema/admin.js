const joi = require('joi')

// 用户名的验证规则
const adminname = joi.string().pattern(/^\w{3,16}$/).min(3).max(16).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\w!-@#$%^&*]{6,16}$/).required()
//邮箱
const email = joi.string().email().required()

//注册昵称（不必需）
const nickname1 = joi.string().min(1).max(12)

//login
exports.reg_login_schema = {
    body: {
        adminname,
        password,
    },
}

//register
exports.reg_register_schema = {
    body: {
        adminname,
        email,
        password,
        nickname: nickname1
    },
}
