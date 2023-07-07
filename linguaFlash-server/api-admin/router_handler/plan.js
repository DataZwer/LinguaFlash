const db = require('../db/index')

const bcrypt = require('bcryptjs')

const moment = require('moment')//时间格式化

const random = require('string-random');//生成随机昵称


//获取用户单词计划列表
exports.getWordPlan = (req, res) => {

    // console.log(req.body.keyword);
    const page = parseInt(req.params.pageNum) || 1
    const length = parseInt(req.params.pageSize)
    let start = (page - 1) * length
    // const text = req.body.keyword ? 'text(有keyword)' : 'text(无keyword)'
    // console.log(text);
    const sql = req.body.keyword ? `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted = 0 and concat(username,nickname) like "%${req.body.keyword}%" limit ?,?` : 'select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted = 0 order by id asc limit ?,?'

    db.query(sql, [start, length], (err, results) => {

        // let foreign = []
        // for (let index = 0; index < results.length; index++) {
            // console.log(index);
            // console.log(results[index].foreign_courses);
            // foreign.push(results[index].foreign_courses)
            // const sql = `select name, imgurl from ling_foreign_courses where IsDeleted = 0 and id = ?`
            // db.query(sql, results[index].foreign_courses, (err, res) => {
            //     results[index]['foreign'] = res[0].name
            //     results[index]['foreign_imgurl'] = res[0].imgurl
            // })

            // const sql2 = `select * from ling_plan where belongs_user = ?`
            // db.query(sql2, results[index].id, (err, res) => {
            //     results[index]['plan_complete'] = res[0].plan_complete
            //     results[index]['complete'] = res[0].complete
            //     results[index]['timeStamp'] = res[0].timeStamp
            // })
        // }
        // console.log(foreign);

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.foreign_courses + '"'
                return
            }
            num += '"' + item.foreign_courses + '"' + ","
        })

        // console.log(num);

        let num2 = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num2 += '"' + item.id + '"'
                return
            }
            num2 += '"' + item.id + '"' + ","
        })

        // console.log(num2);

        let userforeign = []
        const sql1 = `select * from ling_foreign_courses where IsDeleted = 0 and id in (${num})`
        db.query(sql1,  (err, res1) => {

            userforeign = res1

            let userwordplan = []
            const sql2 = `select * from ling_plan where belongs_user in (${num2})`
            db.query(sql2, (err, res2) => {

                userwordplan = res2

                const arrs = results.map(item => {
                    const foreign = userforeign.find(i => item.foreign_courses == i.id)
                    const wordplan = userwordplan.find(i => item.id == i.belongs_user)
                    return {
                        ...item,
                        // ...data,
                        // foreign: data ? data.products : []
                        foreign: { name: foreign.name, imgurl: foreign.imgurl },
                        plan: wordplan,
                    }
                })

                // console.log(arrs);

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
                        data: arrs,
                    })
                })
            })
        })
    })
}

//更改用户单词计划
exports.updateWordPlan = (req, res) => {

    const sql = req.body.timeStamp ? `update ling_plan set plan_complete=?, complete=?, timeStamp=${req.body.timeStamp} where belongs_user=?` : `update ling_plan set plan_complete=?, complete=? where belongs_user=?`

    db.query(sql, [req.body.plan_complete, req.body.complete, req.body.belongs_user], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户单词计划失败！')

        return res.cc('修改用户单词计划成功！', 0)

    })
}

//更改用户句子计划
exports.updateSentencePlan = (req, res) => {

    const sql = req.body.sentence_timeStamp ? `update ling_plan set sentence_plan=?, sentence_complete=?, sentence_timeStamp=${req.body.sentence_timeStamp} where belongs_user=?` : `update ling_plan set sentence_plan=?, sentence_complete=? where belongs_user=?`

    db.query(sql, [req.body.sentence_plan, req.body.sentence_complete, req.body.belongs_user], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户句子计划失败！')

        return res.cc('修改用户句子计划成功！', 0)

    })
}











