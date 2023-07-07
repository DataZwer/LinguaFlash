const express = require('express')

const router = express.Router()

const subject_handler = require('../router_handler/subject')

const expressJoi = require('@escook/express-joi')//验证表单数据中间件

const { get_subject_schema, add_subject_schema, update_status_schema, update_subject_schema, delete_subject_schema } = require('../schema/subject')//验证规则


//获取主题课程
router.post('/courses/:pageNum/:pageSize', expressJoi(get_subject_schema), subject_handler.getSubjectCourses)

//获取全部外语课程(增加主题课程时用)
router.get('/getforeign', subject_handler.getAllForeignCourses)

//增加主题课程
router.post('/add/subject', expressJoi(add_subject_schema), subject_handler.addSubjectCourses)

//更改状态
router.get('/update/status', expressJoi(update_status_schema), subject_handler.updateSubjectStatus)

//更改主题课程信息
router.post('/update/subject/:id', expressJoi(update_subject_schema), subject_handler.updateSubjectInfo)

//删除主题课程
router.get('/delete/subject/:id', expressJoi(delete_subject_schema), subject_handler.deleteSubject)

module.exports = router