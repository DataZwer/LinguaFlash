const db = require('../db/index')
// let multiparty = require('multiparty');

const bcrypt = require('bcryptjs')

const moment = require('moment')//时间格式化

const random = require('string-random');//生成随机昵称

// const fs = require('fs')

// 获取管理员信息的函数
exports.getAdminInfo = (req, res) => {

    const sql = `select id, adminname, email, mobile, nickname, remark, sex, role, status from ling_admin where id=?`

    db.query(sql, req.user.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('获取管理员信息失败！')

        // 3. 将管理员信息响应给客户端
        res.send({
            status: 0,
            message: '获取管理员基本信息成功！',
            data: results[0],
        })
    })
}

// 获取管理员列表的函数
exports.getAdminList = (req, res) => {

    // const sql = `select id, adminname, email, mobile, nickname, remark, sex, role from ling_admin where id=?`

    // db.query(sql, req.user.id, (err, results) => {

    //     if (err) return res.cc(err)

    //     if (results.length !== 1) return res.cc('获取管理员信息失败！')

    //     // 3. 将管理员信息响应给客户端
    //     res.send({
    //         status: 0,
    //         message: '获取管理员基本信息成功！',
    //         data: results[0],
    //     })
    // })

    // console.log(req.body.keyword);
    const page = parseInt(req.params.pageNum) || 1
    const length = parseInt(req.params.pageSize)
    let start = (page - 1) * length
    // const text = req.body.keyword ? 'text(有keyword)' : 'text(无keyword)'
    // console.log(text);
    const sql = req.body.keyword ? `select id, adminname, email, mobile, nickname, remark, sex, role, status from ling_admin where IsDeleted = 0 and concat(adminname, nickname) like "%${req.body.keyword}%" limit ?,?` : 'select id, adminname, email, mobile, nickname, remark, sex, role, status from ling_admin where IsDeleted = 0 order by id asc limit ?,?'

    // const sql = `select id, adminname, email, mobile, nickname, remark, sex, role from ling_admin where id=?`

    db.query(sql, [start, length], (err, results) => {

        // for (let index = 0; index < results.length; index++) {
        //     const sql = `select name from ling_foreign_courses where IsDeleted = 0 and id = ?`
        //     db.query(sql, results[index].foreign_courses, (err, res) => {
        //         results[index]['foreign'] = res[0].name
        //     })
        // }

        const pageSize = results.length
        // console.log(results.length);
        if (err) return res.cc(err)

        const sql = 'select COUNT(*) AS count from ling_admin where IsDeleted = 0'

        db.query(sql, (err, result) => {

            if (err) return res.cc(err)

            let count = result[0].count
            // page = Number(page)
            let totalPage = Math.ceil(count / length)

            res.send({
                status: 0,
                message: '获取管理员列表成功!',
                pageNum: page,
                pageSize: pageSize,
                total: req.body.keyword ? pageSize : count,
                totalPage: totalPage,
                data: results,
            })
        })
    })
}

//增加管理员
exports.addAdminList = (req, res) => {

    const admininfo = req.body

    const sql = `select * from ling_admin where adminname=?`
    db.query(sql, [admininfo.adminname], function (err, results) {

        if (err) {
            return res.cc(err)
        }

        // 用户名被占用
        if (results.length > 0) {
            return res.cc('管理员名被占用，请更换其他管理员名！')
        }

        //密码bcrype 加密
        admininfo.password = bcrypt.hashSync(admininfo.password, 10)
        //插入


        const sql = 'insert into ling_admin set ?'

        const dt = moment().format(`YYYY年MM月DD日`)

        const nickname = admininfo.nickname ? admininfo.nickname : random()

        db.query(sql, { adminname: admininfo.adminname, password: admininfo.password, email: admininfo.email, mobile: admininfo.mobile, nickname: nickname, remark: admininfo.remark, sex: admininfo.sex, role: admininfo.role, status: admininfo.status }, (err, results) => {

            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('添加管理员列表失败！')

            return res.cc('添加管理员列表成功！', 0)
        })

    })
}

// 更新管理员信息的函数
exports.updateAdminInfo = (req, res) => {
    const sql = `update ling_admin set ? where id=?`
    db.query(sql, [req.body, req.user.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改管理员基本信息失败！')

        return res.cc('修改管理员基本信息成功！', 0)
    })

}

// 重置密码的函数
exports.updateAdminPassword = (req, res) => {

    // 查询管理员是否存在
    const sql = `select * from ling_admin where id=?`

    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('管理员不存在！')


        // 判断提交的旧密码是否正确
        const bcrypt = require('bcryptjs')
        // bcrypt.compareSync(提交的密码，数据库中的密码)验证输入的原密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('原密码错误！')

        // 更新管理员密码
        const sql = `update ling_admin set password=? where id=?`

        // 新密码bcrypt加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        db.query(sql, [newPwd, req.user.id], (err, results) => {

            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('更新密码失败！')

            res.cc('更新密码成功！', 0)
        })
    })

}

//更改状态
exports.updateAdminStatus = (req, res) => {
    // console.log(req.query);

    const sql = `update ling_admin set status=? where id=?`

    db.query(sql, [req.query.status, req.query.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改是否显示状态失败！')

        return res.cc('更改是否显示状态成功！', 0)
    })

}

//更改管理员身份
exports.updateAdminRole = (req, res) => {
    // console.log(req.query);

    const sql = `update ling_admin set role=? where id=?`

    db.query(sql, [req.query.role, req.query.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改管理员角色失败！')

        return res.cc('更改管理员角色成功！', 0)
    })

}

//删除用户列表
exports.deleteAdmin = (req, res) => {

    const sql = `update ling_admin set IsDeleted=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除用户列表失败！')

        return res.cc('删除用户列表成功！', 0)
    })
}
