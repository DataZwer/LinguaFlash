const db = require('../db/index')

// 获取用户单词列表的函数
// exports.getUserWordList = (req, res) => {

//     const sql = `select * from ling_user_word where user_id=?`

//     db.query(sql, req.body.id, (err, results) => {

//         if (err) return res.cc(err)

//         // console.log(results);
//         if (results.length == 0) {
//             return res.cc('用户无单词')
//         }

//         let num = '';

//         results.forEach((item, index) => {

//             if (index == results.length - 1) {
//                 num += '"' + item.word_id + '"'
//                 return
//             }
//             num += '"' + item.word_id + '"' + ","
//         })

//         const page = parseInt(req.params.pageNum) || 1
//         const length = parseInt(req.params.pageSize)
//         let start = (page - 1) * length
//         let counts = results.length
//         let totalPage = Math.ceil(counts / length)

//         let UserWord = results
//         // console.log(req.body.keyword);
//         const sql = req.body.keyword ? `select * from ling_word where id in (${num}) and IsDeleted=0 and concat(words, translation) like "%${req.body.keyword}%"` : `select * from ling_word where id in (${num}) and IsDeleted=0 order by id asc limit ?,?`

//         // const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`
//         // console.log(start);
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
//             // console.log(results);

//             let UserWordAddSome = []
//             var dataIndex = start
//             // console.log(UserWord);
//             if(!req.body.keyword){
//                 for (let index = 0; index < results.length; index++) {

//                     let userwordslist = results.find((item) => {
//                         return item.id == UserWord[dataIndex].word_id
//                     })

//                     // console.log(userwordslist);
//                     userwordslist["iscollect"] = UserWord[dataIndex].iscollect
//                     userwordslist["islearned"] = UserWord[dataIndex].islearned
//                     UserWordAddSome.push(userwordslist)
//                     dataIndex++
//                     // console.log(userwordslist);
//                 }
//             } else {
//                 // console.log(123);
//                 for (let index = 0; index < results.length; index++) {

//                     let userwordlist = UserWord.find((item) => {
//                         return item.word_id == results[index].id
//                     })

//                     results[index]["iscollect"] = userwordlist.iscollect
//                     results[index]["islearned"] = userwordlist.islearned
//                     // UserWordAddSome.push(results)
//                     UserWordAddSome = results
//                     // console.log(results);
//                 }
//             }
            
            
//             // console.log(UserWordAddSome);

//             const pageSize = results.length

//             for (let index = 0; index < results.length; index++) {
//                 // console.log(results[index].category);
//                 const sql = `select name from ling_subject_courses where IsDeleted = 0 and id = ?`
//                 db.query(sql, results[index].category, (err, result) => {
//                     UserWordAddSome[index]['subject'] = result[0].name
//                     if (index == results.length - 1) {
//                         // console.log(results);
//                         res.send({
//                             status: 0,
//                             message: '获取用户所有单词成功！',
//                             pageNum: page,
//                             pageSize: pageSize,
//                             total: req.body.keyword ? pageSize : counts,
//                             totalPage: totalPage,
//                             data: UserWordAddSome,
//                         })
//                     }
//                 })
//             }
//             // console.log(results);
//         })
//     })
// }
exports.getUserWordList = (req, res) => {

    const sql = `select * from ling_user_word where user_id=?`

    db.query(sql, req.body.id, (err, results) => {

        if (err) return res.cc(err)

        // console.log(results);
        if (results.length == 0) {
            return res.cc('用户无单词')
        }

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.word_id + '"'
                return
            }
            num += '"' + item.word_id + '"' + ","
        })

        const page = parseInt(req.params.pageNum) || 1
        const length = parseInt(req.params.pageSize)
        let start = (page - 1) * length
        let counts = results.length
        let totalPage = Math.ceil(counts / length)

        let UserWord = results
        // console.log(req.body.keyword);
        const sql = req.body.keyword ? `select * from ling_word where id in (${num}) and IsDeleted=0 and concat(words, translation) like "%${req.body.keyword}%"` : `select * from ling_word where id in (${num}) and IsDeleted=0 order by id asc limit ?,?`

        // const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`
        // console.log(start);
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
            // console.log(results);

            let UserWordAddSome = []
            var dataIndex = start
            // console.log(UserWord);
            if(!req.body.keyword){
                for (let index = 0; index < results.length; index++) {

                    let userwordslist = results.find((item) => {
                        return item.id == UserWord[dataIndex].word_id
                    })

                    // console.log(userwordslist);
                    userwordslist["iscollect"] = UserWord[dataIndex].iscollect
                    userwordslist["islearned"] = UserWord[dataIndex].islearned
                    UserWordAddSome.push(userwordslist)
                    dataIndex++
                    // console.log(userwordslist);
                }
            } else {
                // console.log(123);
                for (let index = 0; index < results.length; index++) {

                    let userwordlist = UserWord.find((item) => {
                        return item.word_id == results[index].id
                    })

                    results[index]["iscollect"] = userwordlist.iscollect
                    results[index]["islearned"] = userwordlist.islearned
                    // UserWordAddSome.push(results)
                    UserWordAddSome = results
                    // console.log(results);
                }
            }
            
            const pageSize = results.length

            const sql1 = `select id, name from ling_subject_courses where IsDeleted = 0`
            db.query(sql1, (err, res1) => {

                if (err) return res.cc(err)

                UserWordAddSome.forEach((item, index) => {
                    // console.log(res1.find((item) => item.id == results[index].category).name);
                    let subjectname = res1.find((item) => item.id == results[index].category).name
                    UserWordAddSome[index]['subject'] = subjectname
                });

                res.send({
                    status: 0,
                    message: '获取用户所有单词成功！',
                    pageNum: page,
                    pageSize: pageSize,
                    total: req.body.keyword ? pageSize : counts,
                    totalPage: totalPage,
                    data: UserWordAddSome,
                })
            })
        })
    })
}

// 获取所有用户(增加用户单词时用)
// exports.getAllUser = (req, res) => {

//     const sql = 'select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted = 0 order by id asc'

//     db.query(sql, (err, results) => {

//         for (let index = 0; index < results.length; index++) {
//             const sql = `select name, imgurl from ling_foreign_courses where IsDeleted = 0 and id = ?`
//             db.query(sql, results[index].foreign_courses, (err, res) => {
//                 results[index]['foreign'] = res[0].name
//                 results[index]['foreign_imgurl'] = res[0].imgurl
//             })
//         }

//         if (err) return res.cc(err)

//         res.send({
//             status: 0,
//             message: '获取所有用户成功!',
//             data: results,
//         })
//     })
// }
exports.getAllUser = (req, res) => {

    const sql = 'select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted = 0 order by id asc'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        const sql = `select id, name, imgurl from ling_foreign_courses where IsDeleted = 0`
        db.query(sql, (err, res1) => {

            results.forEach((item, index) => {
                // console.log(res1.find((item) => item.id == results[index].category).name);
                let foreign = res1.find((item) => item.id == results[index].foreign_courses).name
                let foreign_imgurl = res1.find((item) => item.id == results[index].foreign_courses).imgurl
                results[index]['foreign'] = foreign
                results[index]['foreign_imgurl'] = foreign_imgurl
            });

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取所有用户成功!',
                data: results,
            })
        })
    })
}

// 获取所有单词(增加用户单词时用)
// exports.getAllWord = (req, res) => {

//     const sql = 'select * from ling_word where IsDeleted = 0 order by id asc'

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
exports.getAllWord = (req, res) => {

    const sql = 'select * from ling_word where IsDeleted = 0 order by id asc'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        const sql = `select id, name from ling_subject_courses where IsDeleted = 0`

        db.query(sql, (err, res1) => {

            results.forEach((item, index) => {
                // console.log(res1.find((item) => item.id == results[index].category).name);
                let subjectname = res1.find((item) => item.id == results[index].category).name
                results[index]['subject'] = subjectname
            });

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取所有单词成功!',
                data: results,
            })
        })
    })
}

//增加用户单词
exports.addUserWord = (req, res) => {

    const sql = `select * from ling_user_word where user_id=? and word_id=?`

    db.query(sql, [req.body.user_id, req.body.word_id], function (err, results) {

        if (err) {
            return res.cc(err)
        }

        // 用户单词被占用
        if (results.length > 0) {
            return res.cc('用户该单词已激活，请更换其他单词！')
        }

        const sql = `insert into ling_user_word (user_id, word_id) values (?, ?)`

        db.query(sql, [req.body.user_id, req.body.word_id], (err, results) => {

            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('添加用户单词失败！')

            res.cc('添加用户单词成功！', 0)
        })

    })
}

// 根据 id 获取用户信息
exports.getUserInfoById = (req, res) => {
    // 根据用户的 id，查询用户信息,需排除password
    const sql = `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where id=?`

    // req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件挂载上去的
    db.query(sql, req.body.id, (err, results) => {

        
    

        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        const sql = `select name from ling_foreign_courses where IsDeleted = 0 and id = ?`

        db.query(sql, results[0].foreign_courses, (err, result) => {

            if (err) return res.cc(err)

            results[0]['foreign'] = result[0].name

            res.send({
                status: 0,
                message: '获取用户基本信息成功！',
                data: results[0],
            })
        })

        // 3. 将用户信息响应给客户端
    })
}

//根据单词 id 修改用户单词的收藏状态
exports.updataIscollect = (req, res) => {

    const sql = 'update ling_user_word set iscollect=? where user_id=? and word_id=?'

    db.query(sql, [req.query.iscollect, req.query.user_id, req.query.word_id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户单词的收藏状态失败！')

        return res.cc('修改用户单词的收藏状态成功！', 0)

    })
}

//根据单词 id 修改用户单词的学会状态
exports.updataIslearned = (req, res) => {

    const sql = 'update ling_user_word set islearned=? where user_id=? and word_id=?'

    db.query(sql, [req.query.islearned, req.query.user_id, req.query.word_id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户单词的学会状态失败！')

        return res.cc('修改用户单词的学会状态成功！', 0)

    })
}

//删除用户单词
exports.deleteUserWord = (req, res) => {

    const sql = `delete from ling_user_word where user_id=? and word_id=?`

    db.query(sql, [req.query.user_id, req.query.word_id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除用户该单词失败！')

        res.cc('删除用户该单词成功！', 0)

    })
}
