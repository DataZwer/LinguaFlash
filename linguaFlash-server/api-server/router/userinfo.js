const express = require('express')

const router = express.Router()

const expressJoi = require('@escook/express-joi')

const { update_userinfo_schema, update_password_schema, update_avatar_schema, update_FCourses_schema } = require('../schema/user')


const userinfo_handler = require('../router_handler/userinfo')

const tools = require("../model/tools")

// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();
const multer = require("multer");
const upload = multer({
    dest: "static/upload/"//上传文件存放路径
});
// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息
router.post('/userinfo',expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 重置密码
router.post('/updatepwd',expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 更新用户头像的路由
// router.post('/update/avatar', upload.single('file'), userinfo_handler.updateAvatar)

router.post('/update/avatar', tools.multer().single("file"), userinfo_handler.updateAvatar)

//更新用户所选课程的路由
router.post('/update/courses', expressJoi(update_FCourses_schema), userinfo_handler.updateUserCourses)

// //更新用户收藏单词数(根据用户单词表)
router.post('/update/iscollect', userinfo_handler.updateUserCollectWords)

//更新用户已学会单词数(根据用户单词表)
router.post('/update/islearned', userinfo_handler.updateUserLearnedWords)


module.exports = router
