const express = require('express')

const router = express.Router()

const foreign_handler = require('../router_handler/foreign')

const expressJoi = require('@escook/express-joi')//验证表单数据中间件

const { get_foreign_schema, update_status_schema, update_foreign_schema, delete_foreign_schema } = require('../schema/foreign')//验证规则


const tools = require("../model/tools")

const multer = require("multer");
const upload = multer({
    dest: "static/upload/"//上传文件存放路径
});

//获取外语课程
router.post('/courses/:pageNum/:pageSize', expressJoi(get_foreign_schema), foreign_handler.getForeignCourses)

//上传图片,增加外语课程
router.post('/add/foreign', tools.multer().single("file"), foreign_handler.addForeignCourses)

//更改状态
router.get('/update/status', expressJoi(update_status_schema), foreign_handler.updateForeignStatus)

//更改外语课程信息
router.post('/update/foreign/:id', expressJoi(update_foreign_schema), foreign_handler.updateForeignInfo)

//更改外语课程图片
router.post('/update/picture/:id', tools.multer().single("picture"), foreign_handler.updateForeignPicture)

//删除外语课程
router.get('/delete/foreign/:id', expressJoi(delete_foreign_schema), foreign_handler.deleteForeign)

module.exports = router