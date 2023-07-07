// 导入定义验证规则的模块
const joi = require('joi')

// 定义 主题课程Id 的校验规则
const id = joi.number().integer().min(1).required()


// 校验规则对象 - 根据 Id 新增用户已激活主题课程
exports.get_usersub_schema = {
  params: {
    id,
  },
}

exports.delete_usersub_schema = {
  params: {
    id,
  },
}

exports.get_onesub_schema = {
  params: {
    id,
  },
}

exports.buy_onesub_schema = {
  params: {
    id,
  },
}