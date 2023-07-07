const express = require('express')

const router = express.Router()

const foreign_handler = require('../router_handler/foreign')

//获取所有外语课程
router.get('/courses', foreign_handler.getAllForeignCourses)

//根据当前用户所选课程id获取用户所选课程
router.get('/course',foreign_handler.getOneForeignCourses)





module.exports = router