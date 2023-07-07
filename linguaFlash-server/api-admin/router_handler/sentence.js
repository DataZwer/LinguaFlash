const db = require('../db/index')

//获取所有句子
// exports.getSentenceList = (req, res) => {

//     // console.log(req.body.keyword);
//     const page = parseInt(req.params.pageNum) || 1
//     const length = parseInt(req.params.pageSize)
//     let start = (page - 1) * length

//     const sql = req.body.keyword ? `select * from ling_sentence where IsDeleted = 0 and concat(En_sentence,Ch_sentence) like "%${req.body.keyword}%" limit ?,?` : 'select * from ling_sentence where IsDeleted = 0 order by id asc limit ?,?'

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

//         const sql = 'select COUNT(*) AS count from ling_sentence where IsDeleted = 0'

//         db.query(sql, (err, result) => {

//             if (err) return res.cc(err)

//             let count = result[0].count
//             // page = Number(page)
//             let totalPage = Math.ceil(count / length)

//             res.send({
//                 status: 0,
//                 message: '获取句子成功!',
//                 pageNum: page,
//                 pageSize: pageSize,
//                 total: req.body.keyword ? pageSize : count,
//                 totalPage: totalPage,
//                 data: results,
//             })

//         })

//     })
// }
exports.getSentenceList = (req, res) => {

    // console.log(req.body.keyword);
    const page = parseInt(req.params.pageNum) || 1
    const length = parseInt(req.params.pageSize)
    let start = (page - 1) * length

    const sql = req.body.keyword ? `select * from ling_sentence where IsDeleted = 0 and concat(En_sentence,Ch_sentence) like "%${req.body.keyword}%" limit ?,?` : 'select * from ling_sentence where IsDeleted = 0 order by id asc limit ?,?'

    db.query(sql, [start, length], (err, results) => {

        if (err) return res.cc(err)

        // for (let index = 0; index < results.length; index++) {
        const sql = `select id, name from ling_subject_courses where IsDeleted = 0`

        db.query(sql, (err, res1) => {
            // console.log(res1);

            results.forEach((item, index) => {
                // console.log(res1.find((item) => item.id == results[index].category).name);
                let subjectname = res1.find((item) => item.id == results[index].category).name
                results[index]['subject'] = subjectname
            });

            const pageSize = results.length
            // console.log(results.length);
            if (err) return res.cc(err)

            const sql = 'select COUNT(*) AS count from ling_sentence where IsDeleted = 0'

            db.query(sql, (err, result) => {

                if (err) return res.cc(err)

                let count = result[0].count
                // page = Number(page)
                let totalPage = Math.ceil(count / length)

                res.send({
                    status: 0,
                    message: '获取句子成功!',
                    pageNum: page,
                    pageSize: pageSize,
                    total: req.body.keyword ? pageSize : count,
                    totalPage: totalPage,
                    data: results,
                })
            
            
            // results[index]['subject'] = res[0].name
            })

        })

    })
}

//获取全部主题课程(增加句子时用)
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

//增加句子
exports.addSentence = (req, res) => {

    const sql = 'insert into ling_sentence set ?'

    db.query(sql, { En_sentence: req.body.En_sentence, Ch_sentence: req.body.Ch_sentence, confusion_En: req.body.confusion_En, confusion_Ch: req.body.confusion_Ch, category: req.body.category }, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('添加句子失败！')

        return res.cc('添加句子成功！', 0)
    })
}

//更改句子信息
exports.updateSentenceInfo = (req, res) => {

    const sql = `update ling_sentence set ? where id=?`

    db.query(sql, [{ En_sentence: req.body.En_sentence, Ch_sentence: req.body.Ch_sentence, confusion_En: req.body.confusion_En, confusion_Ch: req.body.confusion_Ch, category: req.body.category }, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改句子信息失败！')

        return res.cc('更改句子信息成功！', 0)
    })
}

//删除句子
exports.deleteSentence = (req, res) => {

    const sql = `update ling_sentence set IsDeleted=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除句子失败！')

        return res.cc('删除句子成功！', 0)
    })
}


