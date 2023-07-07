const express = require('express')

const router = express.Router()

const expressJoi = require('@escook/express-joi')

const { get_admin_schema, add_admin_schema, update_password_schema, update_admin_schema, delete_admin_schema, update_status_schema, update_role_schema } = require('../schema/admininfo')

const admininfo_handler = require('../router_handler/admininfo')

// 获取管理员信息
router.get('/admininfo', admininfo_handler.getAdminInfo)

// 获取所有管理员信息
router.post('/adminlist/:pageNum/:pageSize', expressJoi(get_admin_schema), admininfo_handler.getAdminList)

//增加管理员
router.post('/add/admin', expressJoi(add_admin_schema), admininfo_handler.addAdminList)

//更改状态
router.get('/update/status', expressJoi(update_status_schema), admininfo_handler.updateAdminStatus)

// 更新管理员信息
router.post('/update/admininfo/:id', expressJoi(update_admin_schema), admininfo_handler.updateAdminInfo)

// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), admininfo_handler.updateAdminPassword)

// 更新管理员角色
router.get('/update/role', expressJoi(update_role_schema), admininfo_handler.updateAdminRole)

//删除管理员列表
router.get('/delete/admin/:id', expressJoi(delete_admin_schema), admininfo_handler.deleteAdmin)



module.exports = router
