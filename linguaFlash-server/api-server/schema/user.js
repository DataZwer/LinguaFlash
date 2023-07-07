const joi = require('joi')

// 用户名的验证规则
const username = joi.string().pattern(/^\w{3,16}$/).min(3).max(16).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\w!-@#$%^&*]{6,16}$/).required()
//邮箱
const email = joi.string().email().required()
//id
const id = joi.number().integer().min(1)
//注册昵称（不必需）
const nickname1 = joi.string().min(1).max(12)
//更新用户昵称（必需）
const nickname2 = joi.string().min(1).max(12).required()

//性别
const gender = joi.string().pattern(/^[男女]{1}$/)
//简介
const introduce = joi.string().min(0).max(36)
// dataUri():base64格式
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()
//用户所选外语课程id
const foreign_courses = joi.number().integer().min(1).required()



//login
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}

//register
exports.reg_register_schema = {
  body: {
    username,
    email,
    password,
    nickname:nickname1
  },
}

//update userinfo
exports.update_userinfo_schema = {
  body: {
    nickname:nickname2,
    email,
    gender,
    introduce
  },
}

// update password
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}

// 更新头像验证规则对象
exports.update_avatar_schema = {
  files: {
    avatar,
  },
}

//更新用户所选课程
exports.update_FCourses_schema = {
  body: {
    foreign_courses,
  },
}