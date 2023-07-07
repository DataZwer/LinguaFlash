const db = require('../db/index')

//获取所有单词
// exports.getWordList = (req, res) => {

//     // console.log(req.body.keyword);
//     const page = parseInt(req.params.pageNum) || 1
//     const length = parseInt(req.params.pageSize)
//     let start = (page - 1) * length

//     const sql = req.body.keyword ? `select * from ling_word where IsDeleted = 0 and concat(words,translation) like "%${req.body.keyword}%" limit ?,?` : 'select * from ling_word where IsDeleted = 0 order by id asc limit ?,?'

//     db.query(sql, [start, length], (err, results) => {

//         for (let index = 0; index < results.length; index++) {
//             const sql = `select name from ling_subject_courses where IsDeleted = 0 and id = ?`
//             db.query(sql, results[index].category, (err, res) => {
//                 results[index]['subject'] = res[0].name
//             })
//         }

//         const pageSize = results.length
//         // console.log(results.length);
//         if (err) return res.cc(err)

//         const sql = 'select COUNT(*) AS count from ling_word where IsDeleted = 0'

//         db.query(sql, (err, result) => {

//             if (err) return res.cc(err)

//             let count = result[0].count
//             // page = Number(page)
//             let totalPage = Math.ceil(count / length)

//             res.send({
//                 status: 0,
//                 message: '获取单词成功!',
//                 pageNum: page,
//                 pageSize: pageSize,
//                 total: req.body.keyword ? pageSize : count,
//                 totalPage: totalPage,
//                 data: results,
//             })

//         })

//     })
// }
exports.getWordList = (req, res) => {

    // console.log(req.body.keyword);
    const page = parseInt(req.params.pageNum) || 1
    const length = parseInt(req.params.pageSize)
    let start = (page - 1) * length

    const sql = req.body.keyword ? `select * from ling_word where IsDeleted = 0 and concat(words,translation) like "%${req.body.keyword}%" limit ?,?` : 'select * from ling_word where IsDeleted = 0 order by id asc limit ?,?'

    db.query(sql, [start, length], (err, results) => {

        if (err) return res.cc(err)


        const sql1 = `select id, name from ling_subject_courses where IsDeleted = 0`

        db.query(sql1, (err, res1) => {

            // results[index]['subject'] = res[0].name

            results.forEach((item, index) => {
                // console.log(res1.find((item) => item.id == results[index].category).name);
                let subjectname = res1.find((item) => item.id == results[index].category).name
                results[index]['subject'] = subjectname
            });

            const pageSize = results.length
            // console.log(results.length);
            if (err) return res.cc(err)

            const sql = 'select COUNT(*) AS count from ling_word where IsDeleted = 0'

            db.query(sql, (err, result) => {

                if (err) return res.cc(err)

                let count = result[0].count
                // page = Number(page)
                let totalPage = Math.ceil(count / length)

                res.send({
                    status: 0,
                    message: '获取单词成功!',
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

//获取全部主题课程(增加单词时用)
exports.getAllSubjectCourses = (req, res) => {

    const sql = 'select * from ling_subject_courses where IsDeleted = 0 order by id asc'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取全部主题课程成功!',
            data: results,
        })
    })
}

//增加单词
exports.addWord = (req, res) => {

    const sql = 'insert into ling_word set ?'

    db.query(sql, { words: req.body.words, translation: req.body.translation, phonetic: req.body.phonetic, otherforms: req.body.otherforms, notes: req.body.notes, category: req.body.category }, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('添加单词失败！')

        return res.cc('添加单词成功！', 0)
    })
}

//更改单词信息
exports.updateWordInfo = (req, res) => {

    const sql = `update ling_word set ? where id=?`

    db.query(sql, [{ words: req.body.words, translation: req.body.translation, phonetic: req.body.phonetic, otherforms: req.body.otherforms, notes: req.body.notes, category: req.body.category }, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改单词信息失败！')

        return res.cc('更改单词信息成功！', 0)
    })
}

//删除单词
exports.deleteWord = (req, res) => {

    const sql = `update ling_word set IsDeleted=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除单词失败！')

        return res.cc('删除单词成功！', 0)
    })
}


