const db = require('../db/index')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')//生成 Token

const config = require('../config')//导入配置

// const moment = require('moment')//时间格式化

const random = require('string-random');//生成随机昵称


// 注册
exports.regAdmin = (req, res) => {

    const admininfo = req.body

    const sql = `select * from ling_admin where adminname=?`
    db.query(sql, [admininfo.adminname], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('管理员用户名被占用，请更换其他用户名！')
        }
        //密码bcrype 加密
        admininfo.password = bcrypt.hashSync(admininfo.password, 10)
        //插入
        const sql = 'insert into ling_admin set ?'
        // const dt = moment().format(`YYYY年MM月DD日`)
        const nickname = random()
        db.query(sql, { adminname: admininfo.adminname, email: admininfo.email, password: admininfo.password, nickname: nickname }, function (err, results) {

            if (err) return res.cc(err)

            //影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册管理员用户失败，请稍后再试！')
            }

            // 注册成功
            res.cc('注册成功！', 0)
        })

    })

}

// 登录
exports.loginAdmin = (req, res) => {

    const admininfo = req.body

    const sql = `select * from ling_admin where adminname=?`

    db.query(sql, admininfo.adminname, function (err, results) {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('登录失败！')

        // 用户输入的密码和数据库中的密码对比
        const compareResult = bcrypt.compareSync(admininfo.password, results[0].password)

        if (!compareResult) {
            return res.cc('登录失败！')
        }

        // const dt = moment().format(`YYYY-MM-DD HH:mm:ss`)
        // 剔除密码、头像
        // const admin = { ...results[0], password: '', user_pic: '', date: dt }
        const admin = { ...results[0], password: ''}
        // 生成Token
        const tokenStr = jwt.sign(admin, config.jwtSecretKey, { expiresIn: config.expiresIn })

        //Token响应给客户端
        res.send({
            status: 0,
            message: '管理员登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}

// 管理员信息
exports.getAdminInfo = (req, res) => {

    const sql = `select id, adminname, email, mobile, nickname, remark, sex, role from ling_admin where id=?`

    db.query(sql, req.user.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('获取管理员信息失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取管理员基本信息成功！',
            data: results[0],
        })
    })
}
