const db = require('../db/index')

//获取所有主题课程
// exports.getSubjectCourses = (req, res) => {

//     // console.log(req.body.keyword);
//     const page = parseInt(req.params.pageNum) || 1
//     const length = parseInt(req.params.pageSize)
//     let start = (page - 1) * length
//     // const text = req.body.keyword ? 'text(有keyword)' : 'text(无keyword)'
//     // console.log(text);
//     const sql = req.body.keyword ? `select * from ling_subject_courses where IsDeleted = 0 and name like "%${req.body.keyword}%" limit ?,?` : 'select * from ling_subject_courses where IsDeleted = 0 order by id asc limit ?,?'

//     db.query(sql, [start, length], (err, results) => {

//         for (let index = 0; index < results.length; index++) {
//             const sql = `select name from ling_foreign_courses where IsDeleted = 0 and id = ?`
//             db.query(sql, results[index].category, (err, res) => {
//                 results[index]['foreign'] = res[0].name
//             })
//         }

//         const pageSize = results.length
//         // console.log(results.length);
//         if (err) return res.cc(err)

//         const sql = 'select COUNT(*) AS count from ling_subject_courses where IsDeleted = 0'

//         db.query(sql, (err, result) => {

//             if (err) return res.cc(err)

//             let count = result[0].count
//             // page = Number(page)
//             let totalPage = Math.ceil(count / length)

//             res.send({
//                 status: 0,
//                 message: '获取主题课程成功!',
//                 pageNum: page,
//                 pageSize: pageSize,
//                 total: req.body.keyword ? pageSize : count,
//                 totalPage: totalPage,
//                 data: results,
//             })

//         })
        
//     })
// }
exports.getSubjectCourses = (req, res) => {

    // console.log(req.body.keyword);
    const page = parseInt(req.params.pageNum) || 1
    const length = parseInt(req.params.pageSize)
    let start = (page - 1) * length
    // const text = req.body.keyword ? 'text(有keyword)' : 'text(无keyword)'
    // console.log(text);
    const sql = req.body.keyword ? `select * from ling_subject_courses where IsDeleted = 0 and name like "%${req.body.keyword}%" limit ?,?` : 'select * from ling_subject_courses where IsDeleted = 0 order by id asc limit ?,?'

    db.query(sql, [start, length], (err, results) => {

            const sql2 = `select id, name from ling_foreign_courses where IsDeleted = 0`

            db.query(sql2, (err, res2) => {

                if (err) return res.cc(err)

                results.forEach((item, index) => {
                    // console.log(res1.find((item) => item.id == results[index].category).name);
                    let foreignname = res2.find((item) => item.id == results[index].category).name
                    results[index]['foreign'] = foreignname
                });

                // results[index]['foreign'] = res[0].name

                const pageSize = results.length
                // console.log(results.length);

                const sql = 'select COUNT(*) AS count from ling_subject_courses where IsDeleted = 0'

                db.query(sql, (err, result) => {

                    if (err) return res.cc(err)

                    let count = result[0].count
                    // page = Number(page)
                    let totalPage = Math.ceil(count / length)

                    res.send({
                        status: 0,
                        message: '获取主题课程成功!',
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

//获取全部外语课程(增加主题课程时用)
exports.getAllForeignCourses = (req, res) => {

    const sql ='select * from ling_foreign_courses where IsDeleted = 0 order by id asc'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取全部外语课程成功!',
            data: results,
        })
    })
}

//增加主题课程
exports.addSubjectCourses = (req, res) => {

    const sql = 'insert into ling_subject_courses set ?'

    db.query(sql, { name: req.body.name, price: req.body.price, number: req.body.number, description: req.body.description, category: req.body.category, status: req.body.status, level: req.body.level }, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('添加主题课程失败！')

        return res.cc('添加主题课程成功！', 0)
    })
}

//更改状态
exports.updateSubjectStatus = (req, res) => {
    // console.log(req.query);

    const sql = `update ling_subject_courses set status=? where id=?`

    db.query(sql, [req.query.status, req.query.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改是否显示状态失败！')

        return res.cc('更改是否显示状态成功！', 0)
    })

}

//更改主题课程信息
exports.updateSubjectInfo = (req, res) => {

    const sql = `update ling_subject_courses set ? where id=?`

    db.query(sql, [{ name: req.body.name, price: req.body.price, number: req.body.number, description: req.body.description, category: req.body.category, status: req.body.status, level: req.body.level }, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改主题课程信息失败！')

        return res.cc('更改主题课程信息成功！', 0)
    })
}

//删除主题课程
exports.deleteSubject = (req, res) => {

    const sql = `update ling_subject_courses set IsDeleted=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除主题课程失败！')

        return res.cc('删除主题课程成功！', 0)
    })
}


