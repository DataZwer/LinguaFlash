const db = require('../db/index')

// 获取用户句子列表的函数
// exports.getUserSentenceList = (req, res) => {

//     const sql = `select * from ling_user_sentence where user_id=?`

//     db.query(sql, req.body.id, (err, results) => {

//         if (err) return res.cc(err)

//         // console.log(results);
//         if (results.length == 0) {
//             return res.cc('用户无句子')
//         }

//         let num = '';

//         results.forEach((item, index) => {

//             if (index == results.length - 1) {
//                 num += '"' + item.sentence_id + '"'
//                 return
//             }
//             num += '"' + item.sentence_id + '"' + ","
//         })

//         const page = parseInt(req.params.pageNum) || 1
//         const length = parseInt(req.params.pageSize)
//         let start = (page - 1) * length
//         let counts = results.length
//         let totalPage = Math.ceil(counts / length)

//         let UserSentence = results
//         const sql = req.body.keyword ? `select * from ling_sentence where id in (${num}) and IsDeleted=0 and concat(En_sentence, Ch_sentence) like "%${req.body.keyword}%" limit ?,?` : `select * from ling_sentence where id in (${num}) and IsDeleted=0 order by id asc limit ?,?`

//         // const sql = `select * from ling_Sentence where id in (${num}) and IsDeleted=0`

//         db.query(sql, [start, length], function (err, results) {

//             if (err) return res.cc(err)

//             // let AddProresult = []
//             // for (let index = 0; index < results.length; index++) {
//             //     let result = results.find((item) => {
//             //         // const element = array[index];
//             //         // console.log(results[index].sentence_id);
//             //         return item.id == proficiency[index].sentence_id
//             //     })
//             //     // console.log(result)
//             //     result["proficiency"] = proficiency[index].proficiency
//             //     // console.log(result)
//             //     AddProresult.push(result)
//             // }

//             let UserSentenceAddSome = []
//             var dataIndex = start
//             if(!req.body.keyword){
//                 for (let index = 0; index < results.length; index++) {

//                     let userSentencelist = results.find((item) => {
//                         return item.id == UserSentence[dataIndex].sentence_id
//                     })

//                     // console.log(userSentencelist);
//                     userSentencelist["proficiency"] = UserSentence[dataIndex].proficiency
//                     userSentencelist["islearned"] = UserSentence[dataIndex].islearned
//                     UserSentenceAddSome.push(userSentencelist)
//                     dataIndex++
//                     // console.log(userSentencelist);
//                 }
//             } else {
//                 for (let index = 0; index < results.length; index++) {

//                     let usersentencelist = UserSentence.find((item) => {
//                         return item.sentence_id == results[index].id
//                     })

//                     results[index]["proficiency"] = usersentencelist.proficiency
//                     results[index]["islearned"] = usersentencelist.islearned
//                     // UserWordAddSome.push(results)
//                     UserSentenceAddSome = results
//                     // console.log(results);
//                 }
//             }
//             // console.log(UserSentence);
            

//             // console.log(UserSentenceAddSome);

//             const pageSize = results.length

//             for (let index = 0; index < results.length; index++) {
//                 // console.log(results[index].category);
//                 const sql = `select name from ling_subject_courses where IsDeleted = 0 and id = ?`
//                 db.query(sql, results[index].category, (err, result) => {
//                     UserSentenceAddSome[index]['subject'] = result[0].name
//                     if (index == results.length - 1) {
//                         // console.log(results);
//                         res.send({
//                             status: 0,
//                             message: '获取用户所有句子成功！',
//                             pageNum: page,
//                             pageSize: pageSize,
//                             total: req.body.keyword ? pageSize : counts,
//                             totalPage: totalPage,
//                             data: UserSentenceAddSome,
//                         })
//                     }
//                 })
//             }
//             // console.log(results);
//         })
//     })
// }
exports.getUserSentenceList = (req, res) => {

    const sql = `select * from ling_user_sentence where user_id=?`

    db.query(sql, req.body.id, (err, results) => {

        if (err) return res.cc(err)

        // console.log(results);
        if (results.length == 0) {
            return res.cc('用户无句子')
        }

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.sentence_id + '"'
                return
            }
            num += '"' + item.sentence_id + '"' + ","
        })

        const page = parseInt(req.params.pageNum) || 1
        const length = parseInt(req.params.pageSize)
        let start = (page - 1) * length
        let counts = results.length
        let totalPage = Math.ceil(counts / length)

        let UserSentence = results
        const sql = req.body.keyword ? `select * from ling_sentence where id in (${num}) and IsDeleted=0 and concat(En_sentence, Ch_sentence) like "%${req.body.keyword}%" limit ?,?` : `select * from ling_sentence where id in (${num}) and IsDeleted=0 order by id asc limit ?,?`

        // const sql = `select * from ling_Sentence where id in (${num}) and IsDeleted=0`

        db.query(sql, [start, length], function (err, results) {

            if (err) return res.cc(err)

            // let AddProresult = []
            // for (let index = 0; index < results.length; index++) {
            //     let result = results.find((item) => {
            //         // const element = array[index];
            //         // console.log(results[index].sentence_id);
            //         return item.id == proficiency[index].sentence_id
            //     })
            //     // console.log(result)
            //     result["proficiency"] = proficiency[index].proficiency
            //     // console.log(result)
            //     AddProresult.push(result)
            // }

            let UserSentenceAddSome = []
            var dataIndex = start
            if(!req.body.keyword){
                for (let index = 0; index < results.length; index++) {

                    let userSentencelist = results.find((item) => {
                        return item.id == UserSentence[dataIndex].sentence_id
                    })

                    // console.log(userSentencelist);
                    userSentencelist["proficiency"] = UserSentence[dataIndex].proficiency
                    userSentencelist["islearned"] = UserSentence[dataIndex].islearned
                    UserSentenceAddSome.push(userSentencelist)
                    dataIndex++
                    // console.log(userSentencelist);
                }
            } else {
                for (let index = 0; index < results.length; index++) {

                    let usersentencelist = UserSentence.find((item) => {
                        return item.sentence_id == results[index].id
                    })

                    results[index]["proficiency"] = usersentencelist.proficiency
                    results[index]["islearned"] = usersentencelist.islearned
                    // UserWordAddSome.push(results)
                    UserSentenceAddSome = results
                    // console.log(results);
                }
            }
            // console.log(UserSentence);
            

            // console.log(UserSentenceAddSome);

            const pageSize = results.length

            const sql1 = `select id, name from ling_subject_courses where IsDeleted = 0`
            db.query(sql1, (err, res1) => {

                if (err) return res.cc(err)

                UserSentenceAddSome.forEach((item, index) => {
                    // console.log(res1.find((item) => item.id == results[index].category).name);
                    let subjectname = res1.find((item) => item.id == results[index].category).name
                    UserSentenceAddSome[index]['subject'] = subjectname
                });
                res.send({
                    status: 0,
                    message: '获取用户所有句子成功！',
                    pageNum: page,
                    pageSize: pageSize,
                    total: req.body.keyword ? pageSize : counts,
                    totalPage: totalPage,
                    data: UserSentenceAddSome,
                })
                
            })
        })
    })
}

//获取所有句子(增加用户句子时用)
// exports.getAllSentence = (req, res) => {

//     const sql = 'select * from ling_sentence where IsDeleted = 0 order by id asc'

//     db.query(sql, (err, results) => {

//         for (let index = 0; index < results.length; index++) {

//             const sql = `select name from ling_subject_courses where IsDeleted = 0 and id = ?`
//             db.query(sql, results[index].category, (err, res) => {
//                 results[index]['subejct'] = res[0].name
//             })
//         }

//         if (err) return res.cc(err)

//         res.send({
//             status: 0,
//             message: '获取单词成功!',
//             data: results,
//         })
//     })
// }
exports.getAllSentence = (req, res) => {

    const sql = 'select * from ling_sentence where IsDeleted = 0 order by id asc'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        const sql = `select id,name from ling_subject_courses where IsDeleted = 0`


        db.query(sql, (err, res1) => {

            results.forEach((item, index) => {
                // console.log(res1.find((item) => item.id == results[index].category).name);
                let subjectname = res1.find((item) => item.id == results[index].category).name
                results[index]['subject'] = subjectname
            });
            // results[index]['subejct'] = res[0].name

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取句子成功!',
                data: results,
            })
        })
    })
}

//增加用户句子
exports.addUserSentence = (req, res) => {

    const sql = `select * from ling_user_sentence where user_id=? and sentence_id=?`

    db.query(sql, [req.body.user_id, req.body.sentence_id], function (err, results) {

        if (err) {
            return res.cc(err)
        }

        // 用户句子被占用
        if (results.length > 0) {
            return res.cc('用户该句子已激活，请更换其他句子！')
        }

        const sql = `insert into ling_user_sentence (user_id, sentence_id, proficiency, islearned) values (?, ?, ?, ?)`

        db.query(sql, [req.body.user_id, req.body.sentence_id, req.body.proficiency, req.body.islearned], (err, results) => {

            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('添加用户句子失败！')

            res.cc('添加用户句子成功！', 0)
        })

    })
}

//根据句子 id 修改用户句子的学会状态
exports.updataIslearned = (req, res) => {

    const sql = 'update ling_user_sentence set islearned=? where user_id=? and sentence_id=?'

    db.query(sql, [req.query.islearned, req.query.user_id, req.query.sentence_id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户句子的学会状态失败！')

        return res.cc('修改用户句子的学会状态成功！', 0)

    })
}

// 修改用户句子信息
exports.updateUserSentence = (req, res) => {

    const sql = 'update ling_user_sentence set proficiency=?, islearned=? where user_id=? and sentence_id=?'

    db.query(sql, [req.body.proficiency, req.body.islearned, req.body.user_id, req.body.sentence_id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户句子信息失败！')

        return res.cc('修改用户句子信息成功！', 0)

    })
}


//删除用户句子
exports.deleteUserSentence = (req, res) => {

    const sql = `delete from ling_user_sentence where user_id=? and sentence_id=?`

    db.query(sql, [req.query.user_id, req.query.sentence_id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除用户该句子失败！')

        res.cc('删除用户该句子成功！', 0)

    })
}
