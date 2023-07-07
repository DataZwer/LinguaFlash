const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

//注册昵称（不必需）
const keyword = joi.string().min(1).max(20).empty('')

const id = joi.number().integer().min(1).required()
const status = joi.number().valid(0, 1).required()

//  用户名的验证规则
const username = joi.string().pattern(/^\w{3,16}$/).min(3).max(16).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\w!-@#$%^&*]{6,16}$/).required()
//邮箱
const email = joi.string().email().required()
//id
// const id = joi.number().integer().min(1)
//注册昵称（不必需）
const nickname = joi.string().min(1).max(12)
//性别
const gender = joi.string().pattern(/^[男女]{1}$/)
//简介
const introduce = joi.string().min(0).max(36)
// dataUri():base64格式
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
// const avatar = joi.string().dataUri().required()
//用户所选外语课程id
const foreign_courses = joi.number().integer().min(1).required()


//获取用户列表
exports.get_user_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword
    }
}

//添加用户列表
exports.add_user_schema = {
    body: {
        username,
        password,
        email,
        nickname,
        gender,
        introduce,
        foreign_courses,
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

//更改用户列表信息
exports.update_user_schema = {
    params: {
        id
    },
    body: {
        username,
        email,
        nickname,
        gender,
        introduce,
        foreign_courses,
        status
    }
}

//删除用户列表
exports.delete_user_schema = {
    params: {
        id
    }
}
