const joi = require('joi')

const pageNum = joi.number().integer().min(1).required()
const pageSize = joi.number().integer().min(1).required()

//注册昵称（不必需）
const keyword = joi.string().min(1).max(20).empty('')

const id = joi.number().integer().min(1).required()
const status = joi.number().valid(0, 1).required()

//  管理员名的验证规则
const adminname = joi.string().pattern(/^\w{3,16}$/).min(3).max(16).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\w!-@#$%^&*]{6,16}$/).required()
//邮箱
const email = joi.string().email().required()
//id
// const id = joi.number().integer().min(1)
//注册昵称（不必需）
const nickname = joi.string().min(1).max(12)
//性别
const sex = joi.string().pattern(/^[男女]{1}$/)
//备注
const remark = joi.string().min(0).max(36)
// dataUri():base64格式
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
// const avatar = joi.string().dataUri().required()
//手机号
const mobile = joi.string().pattern(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).required()
//角色
const role = joi.string().min(5).max(20)

//获取用户列表
exports.get_admin_schema = {
    params: {
        pageNum,
        pageSize,
    },
    body: {
        keyword
    }
}

//添加用户列表
exports.add_admin_schema = {
    body: {
        adminname,
        password,
        email,
        mobile,
        nickname,
        remark,
        sex,
        status,
        role
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
exports.update_admin_schema = {
    params: {
        id
    },
    body: {
        adminname,
        email,
        mobile,
        nickname,
        remark,
        sex,
        status,
        role
    }
}

//删除用户列表
exports.delete_admin_schema = {
    params: {
        id
    }
}

exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

exports.update_role_schema = {
    query: {
        id,
        role
    }
}