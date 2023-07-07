const db = require('../db/index')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')//生成 Token

const config = require('../config')//导入配置

const moment = require('moment')//时间格式化

const random = require('string-random');//生成随机昵称


// 注册
exports.regUser = (req, res) => {

    const userinfo = req.body

    const sql = `select * from ling_users where username=?`
    db.query(sql, [userinfo.username], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        //密码bcrype 加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //插入
        const sql = 'insert into ling_users set ?'
        const dt = moment().format(`YYYY年MM月DD日`)
        const nickname = random()
        db.query(sql, { username: userinfo.username,email:userinfo.email, password: userinfo.password, nickname:nickname, register_date: dt}, function (err, results) {
 
          if (err) return res.cc(err)

          //影响行数不为 1
          if (results.affectedRows !== 1) {
            return res.cc('注册用户失败，请稍后再试！')
          }

          // 注册成功
          res.cc('注册成功！', 0)
        })

    })

}

// 登录
exports.login = (req, res) => {

    const userinfo = req.body

    const sql = `select * from ling_users where username=? and status=1 and IsDeleted=0`

    db.query(sql, userinfo.username, function (err, results) {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('登录失败！')

        // 用户输入的密码和数据库中的密码对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        if (!compareResult) {
        return res.cc('登录失败！')
        }

        const dt = moment().format(`YYYY-MM-DD HH:mm:ss`)
        // 剔除密码、头像
        const user = { ...results[0], password: '', user_pic: '', date: dt }
        // 生成Token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

        //Token响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}