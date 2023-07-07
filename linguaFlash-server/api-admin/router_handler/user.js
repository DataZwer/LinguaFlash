const db = require('../db/index')

const bcrypt = require('bcryptjs')

const moment = require('moment')//时间格式化

const random = require('string-random');//生成随机昵称


//获取所有用户列表
// exports.getUserList = (req, res) => {

//     // console.log(req.body.keyword);
//     const page = parseInt(req.params.pageNum) || 1
//     const length = parseInt(req.params.pageSize)
//     let start = (page - 1) * length
//     // const text = req.body.keyword ? 'text(有keyword)' : 'text(无keyword)'
//     // console.log(text);
//     const sql = req.body.keyword ? `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted = 0 and concat(username,nickname) like "%${req.body.keyword}%" limit ?,?` : 'select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted = 0 order by id asc limit ?,?'

//     db.query(sql, [start, length], (err, results) => {

//         for (let index = 0; index < results.length; index++) {
//             const sql = `select name, imgurl from ling_foreign_courses where IsDeleted = 0 and id = ?`
//             db.query(sql, results[index].foreign_courses, (err, res) => {
//                 results[index]['foreign'] = res[0].name
//                 results[index]['foreign_imgurl'] = res[0].imgurl
//             })
//         }

//         const pageSize = results.length
//         // console.log(results.length);
//         if (err) return res.cc(err)

//         const sql = 'select COUNT(*) AS count from ling_users where IsDeleted = 0'

//         db.query(sql, (err, result) => {

//             if (err) return res.cc(err)

//             let count = result[0].count
//             // page = Number(page)
//             let totalPage = Math.ceil(count / length)

//             res.send({
//                 status: 0,
//                 message: '获取用户列表成功!',
//                 pageNum: page,
//                 pageSize: pageSize,
//                 total: req.body.keyword ? pageSize : count,
//                 totalPage: totalPage,
//                 data: results,
//             })

//         })
//     })
// }
exports.getUserList = (req, res) => {

    // console.log(req.body.keyword);
    const page = parseInt(req.params.pageNum) || 1
    const length = parseInt(req.params.pageSize)
    let start = (page - 1) * length
    // const text = req.body.keyword ? 'text(有keyword)' : 'text(无keyword)'
    // console.log(text);
    const sql = req.body.keyword ? `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted = 0 and concat(username,nickname) like "%${req.body.keyword}%" limit ?,?` : 'select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted = 0 order by id asc limit ?,?'

    db.query(sql, [start, length], (err, results) => {

        if (err) return res.cc(err)

        const sql = `select id, name, imgurl from ling_foreign_courses where IsDeleted = 0`

        db.query(sql, (err, res1) => {


            // results[index]['foreign'] = res[0].name
            // results[index]['foreign_imgurl'] = res[0].imgurl


            results.forEach((item, index) => {
                // console.log(res1.find((item) => item.id == results[index].category).name);
                let foreignname = res1.find((item) => item.id == results[index].foreign_courses).name
                let foreignimgurl = res1.find((item) => item.id == results[index].foreign_courses).imgurl
                results[index]['foreign'] = foreignname
                results[index]['foreign_imgurl'] = foreignimgurl
            });

            const pageSize = results.length
            // console.log(results.length);
            if (err) return res.cc(err)

            const sql = 'select COUNT(*) AS count from ling_users where IsDeleted = 0'

            db.query(sql, (err, result) => {

                if (err) return res.cc(err)

                let count = result[0].count
                // page = Number(page)
                let totalPage = Math.ceil(count / length)

                res.send({
                    status: 0,
                    message: '获取用户列表成功!',
                    pageNum: page,
                    pageSize: pageSize,
                    total: req.body.keyword ? pageSize : count,
                    totalPage: totalPage,
                    data: results,
                })

            })
        })
    })
}

//获取全部外语课程(增加用户列表时用)
exports.getAllForeignCourses = (req, res) => {

    const sql = 'select * from ling_foreign_courses where IsDeleted = 0 order by id asc'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取全部外语课程成功!',
            data: results,
        })
    })
}

//增加用户列表
exports.addUserList = (req, res) => {

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

        const nickname = userinfo.nickname ? userinfo.nickname : random()

        db.query(sql, { username: userinfo.username, password: userinfo.password, email: userinfo.email, nickname: nickname, gender: userinfo.gender, introduce: userinfo.introduce, foreign_courses: userinfo.foreign_courses, register_date: dt, status: userinfo.status }, (err, results) => {

            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('添加用户列表失败！')

            return res.cc('添加用户列表成功！', 0)
        })

    })
}

//更改状态
exports.updateUserStatus = (req, res) => {
    // console.log(req.query);

    const sql = `update ling_users set status=? where id=?`

    db.query(sql, [req.query.status, req.query.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改是否显示状态失败！')

        return res.cc('更改是否显示状态成功！', 0)
    })

}

//更改用户列表信息
exports.updateUserInfo = (req, res) => {

    const sql = `update ling_users set ? where id=?`

    db.query(sql, [{ username: req.body.username, nickname: req.body.nickname, email: req.body.email, gender: req.body.gender, introduce: req.body.introduce, foreign_courses: req.body.foreign_courses, status: req.body.status }, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改用户列表信息失败！')

        return res.cc('更改用户列表信息成功！', 0)
    })
}

//删除用户列表
exports.deleteUser = (req, res) => {

    const sql = `update ling_users set IsDeleted=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除用户列表失败！')

        return res.cc('删除用户列表成功！', 0)
    })
}


