const joi = require('joi')

const id = joi.number().integer().min(1).required()
const number = joi.number().integer().min(1).required()


// 校验规则对象 - 根据 Id 新增用户已激活主题课程
exports.add_userword_schema = {
  params: {
    id,
  },
}

exports.update_iscollect_schema = {
  params: {
    id,
  },
}

exports.update_islearned_schema = {
  params: {
    id,
  },
}

exports.get_unlearnSelect_schema = {
  params: {
    number,
  },
}