const db = require('../db/index')

// 获取用户主题课程列表的函数
// exports.getUserSubjectList = (req, res) => {

//     const sql = `select * from ling_user_subject`

//     db.query(sql, (err, results) => {

//         if (err) return res.cc(err)

//         var num = '';//用户已激活的主题课程id数据初始化
//         //id拼接
//         results.forEach((item, index) => {
//             // console.log(item.subject_id)
//             if (index == results.length - 1) {
//                 num += '"' + item.user_id + '"'
//                 return;
//             }
//             num += '"' + item.user_id + '"' + ","
//         })
//         const page = parseInt(req.params.pageNum) || 1
//         const length = parseInt(req.params.pageSize)
//         let start = (page - 1) * length

//         const sql = req.body.keyword ? `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where id in (${num}) and IsDeleted=0 and concat(username, nickname) like "%${req.body.keyword}%" limit ?,?` : `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where id in (${num}) and IsDeleted=0 order by id asc limit ?,?`

//         db.query(sql, [start, length],function (err, result) {

//             const pageSize = result.length

//             if (err) return res.cc(err)

//             for (let index = 0; index < result.length; index++) {

//                 let newarray = results.filter((value, Index) => {
//                     return value.user_id == result[index].id
//                 })
                
//                 let num = '';//用户已激活的主题课程id数据初始化

//                 newarray.forEach((item, i, arr) => {
//                     if (i == arr.length - 1) {
//                         num += '"' + item.subject_id + '"'
//                         return;
//                     }
//                     num += '"' + item.subject_id + '"' + ","
//                 })
//                 // console.log(num);

//                 const sql = `select * from ling_subject_courses where id in (${num}) and IsDeleted=0`

//                 db.query(sql, function (err, r) {

//                     for (let index = 0; index < r.length; index++) {
//                         const sql = `select name from ling_foreign_courses where IsDeleted = 0 and id = ?`
//                         db.query(sql, r[index].category, (err, res) => {
//                             r[index]['foreign'] = res[0].name
                            
//                         })
//                     }

//                     if (err) return res.cc(err)

//                     const sql = `select name,imgurl from ling_foreign_courses where IsDeleted = 0 and id = ?`

//                     db.query(sql, result[index].foreign_courses, (err, froeignRes) => {
//                         result[index]['foreign'] = froeignRes[0].name
//                         result[index]['foreign_imgurl'] = froeignRes[0].imgurl
//                     })
                    
//                     result[index]['subject'] = r

                    

//                     if (index == result.length-1){

//                         // const sql = 'select COUNT(*) AS count from ling_user_subject group by user_id'
//                         const sql = 'select user_id,count(user_id) from ling_user_subject group by user_id having(count(user_id)>1)'

//                         db.query(sql, (err, count) => {
//                             if (err) return res.cc(err)

//                             // console.log(count.length);
//                             let counts = count.length

//                             let totalPage = Math.ceil(counts / length)

//                             res.send({
//                                 status: 0,
//                                 message: '获取用户主题课程列表成功！',
//                                 pageNum: page,
//                                 pageSize: pageSize,
//                                 total: req.body.keyword ? pageSize : counts,
//                                 totalPage: totalPage,
//                                 data: result,
//                             })
//                         })
//                     }
//                 })
//             }
//         })
//     })
// }
exports.getUserSubjectList = (req, res) => {

    const sql = `select * from ling_user_subject`

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        let dataInfo = {};

        results.forEach((item, index) => {
            let { user_id, subject_id } = item;
            if (!dataInfo[user_id]) {
                dataInfo[user_id] = {
                    user_id,
                    child: []
                }
            }
            dataInfo[user_id].child.push(subject_id);
        });
        // console.log(dataInfo);
        let list = Object.values(dataInfo); // list 转换成功的数据
        
        // console.log(list)

        // var num = '';//用户已激活的主题课程id数据初始化
        // //id拼接
        // results.forEach((item, index) => {
        //     // console.log(item.subject_id)
        //     if (index == results.length - 1) {
        //         num += '"' + item.user_id + '"'
        //         return;
        //     }
        //     num += '"' + item.user_id + '"' + ","
        // })
        const page = parseInt(req.params.pageNum) || 1
        const length = parseInt(req.params.pageSize)
        let start = (page - 1) * length

        // console.log(num);

        const sql = req.body.keyword ? `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted=0 and concat(username, nickname) like "%${req.body.keyword}%" limit ?,?` : `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words, status from ling_users where IsDeleted=0 order by id asc limit ?,?`

        db.query(sql, [start, length],function (err, result) {

            const pageSize = result.length

            if (err) return res.cc(err)

            // console.log(result);

            result.forEach((item, index) => {
                let subjectList = list.find((item) => item.user_id == result[index].id).child
                // console.log(subjectList);
                result[index]['subject'] = subjectList
            })

            // console.log(result);

            const sql1 = `select * from ling_subject_courses where IsDeleted=0`

            db.query(sql1, (err, res1) => {

                if (err) return res.cc(err)

                const sql2 = `select * from ling_foreign_courses where IsDeleted=0`

                db.query(sql2, (err, res2) => {

                    if (err) return res.cc(err)

                    res1.forEach((item, index) => {
                        // console.log(res1.find((item) => item.id == results[index].category).name);
                        let foreignname = res2.find((item) => item.id == res1[index].category).name
                        res1[index]['foreign'] = foreignname
                    });

                    result.forEach((item, index) => {
                        // console.log(res1.find((item) => item.id == results[index].category).name);
                        let foreignname = res2.find((item) => item.id == result[index].foreign_courses).name
                        let foreignimgurl = res2.find((item) => item.id == result[index].foreign_courses).imgurl
                        result[index]['foreign'] = foreignname
                        result[index]['foreign_imgurl'] = foreignimgurl
                    });


                    result.forEach((item, index) => {
                        let arr = res1.filter((ele) => result[index].subject.filter((x) => x === ele.id).length > 0)
                        result[index]['subject'] = arr
                        // console.log(arr);
                    })
                    // console.log(result);


                        const sql = 'select user_id,count(user_id) from ling_user_subject group by user_id having(count(user_id)>1)'

                        db.query(sql, (err, count) => {
                            if (err) return res.cc(err)

                            // console.log(count.length);
                            let counts = count.length

                            let totalPage = Math.ceil(counts / length)

                            res.send({
                                status: 0,
                                message: '获取用户主题课程列表成功！',
                                pageNum: page,
                                pageSize: pageSize,
                                total: req.body.keyword ? pageSize : counts,
                                totalPage: totalPage,
                                data: result,
                            })
                        })

                    // res.send({
                    //     status: 0,
                    //     message: '获取用户主题课程列表成功！',
                    //     data: result,
                    // })
                })

                
                // result.forEach((item1, index1) => {

                //     // result[index1].subject.forEach((item2, index2) => {
                        
                //         // let subject = res1.find((item) => item.id == result[index1].subject[index2].subject_id)
                //         // result[index1]['subject'] = subjectList

                //         // arr1.filter((ele) =>
                //         //     arr2.filter((x) => x === ele.studentId).length > 0
                //     // });
                //     // console.log(subjectList);
                //     result[index]['subject'] = subjectList
                // })



            })

            // for (let index = 0; index < result.length; index++) {

            //     let newarray = results.filter((value, Index) => {
            //         return value.user_id == result[index].id
            //     })
                
            //     let num = '';//用户已激活的主题课程id数据初始化

            //     newarray.forEach((item, i, arr) => {
            //         if (i == arr.length - 1) {
            //             num += '"' + item.subject_id + '"'
            //             return;
            //         }
            //         num += '"' + item.subject_id + '"' + ","
            //     })
            //     // console.log(num);

            //     const sql = `select * from ling_subject_courses where id in (${num}) and IsDeleted=0`

            //     db.query(sql, function (err, r) {

            //         for (let index = 0; index < r.length; index++) {
            //             const sql = `select name from ling_foreign_courses where IsDeleted = 0 and id = ?`
            //             db.query(sql, r[index].category, (err, res) => {
            //                 r[index]['foreign'] = res[0].name
                            
            //             })
            //         }

            //         if (err) return res.cc(err)

            //         const sql = `select name,imgurl from ling_foreign_courses where IsDeleted = 0 and id = ?`

            //         db.query(sql, result[index].foreign_courses, (err, froeignRes) => {
            //             result[index]['foreign'] = froeignRes[0].name
            //             result[index]['foreign_imgurl'] = froeignRes[0].imgurl
            //         })
                    
            //         result[index]['subject'] = r

                    

            //         if (index == result.length-1){

            //             // const sql = 'select COUNT(*) AS count from ling_user_subject group by user_id'
            //             const sql = 'select user_id,count(user_id) from ling_user_subject group by user_id having(count(user_id)>1)'

            //             db.query(sql, (err, count) => {
            //                 if (err) return res.cc(err)

            //                 // console.log(count.length);
            //                 let counts = count.length

            //                 let totalPage = Math.ceil(counts / length)

            //                 res.send({
            //                     status: 0,
            //                     message: '获取用户主题课程列表成功！',
            //                     pageNum: page,
            //                     pageSize: pageSize,
            //                     total: req.body.keyword ? pageSize : counts,
            //                     totalPage: totalPage,
            //                     data: result,
            //                 })
            //             })
            //         }
            //     })
            // }
        })
    })
}

// 获取所有用户(增加用户主题课程时用)
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
            // results[index]['foreign'] = res[0].name
            // results[index]['foreign_imgurl'] = res[0].imgurl

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取所有用户成功!',
                data: results,
            })
        })
    })
}

// 获取所有主题课程(增加用户主题课程时用)
// exports.getAllSubject = (req, res) => {

//     const sql = 'select * from ling_subject_courses where IsDeleted = 0 order by id asc'

//     db.query(sql, (err, results) => {

//         for (let index = 0; index < results.length; index++) {

//             const sql = `select name from ling_foreign_courses where IsDeleted = 0 and id = ?`
//             db.query(sql, results[index].category, (err, res) => {
//                 results[index]['foreign'] = res[0].name
//             })
//         }

//         if (err) return res.cc(err)

//         res.send({
//             status: 0,
//             message: '获取主题课程成功!',
//             data: results,
//         })
//     })
// }
exports.getAllSubject = (req, res) => {

    const sql = 'select * from ling_subject_courses where IsDeleted = 0 order by id asc'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        const sql = `select id, name from ling_foreign_courses where IsDeleted = 0`

        db.query(sql, (err, res1) => {

            results.forEach((item, index) => {
                // console.log(res1.find((item) => item.id == results[index].category).name);
                let foreignname = res1.find((item) => item.id == results[index].category).name
                results[index]['foreign'] = foreignname
            });

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取主题课程成功!',
                data: results,
            })
        })
    })
}

//增加用户主题课程
exports.addUserSubject = (req, res) => {

    const sql = `select * from ling_user_subject where user_id=? and subject_id=?`

    db.query(sql, [req.body.user_id, req.body.subject_id], function (err, results) {

        if (err) {
            return res.cc(err)
        }

        // 用户主题课程被占用
        if (results.length > 0) {
            return res.cc('用户该主题课程已激活，请更换其他主题课程！')
        }

        const sql = `insert into ling_user_subject (user_id, subject_id) values (?, ?)`

        db.query(sql, [req.body.user_id, req.body.subject_id], (err, results) => {

            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('添加用户主题课程失败！')

            res.cc('添加用户主题课程成功！', 0)
        })

    })
}

//删除用户主题课程
exports.deleteUserSubject = (req, res) => {

    const sql = `delete from ling_user_subject where user_id=? and subject_id=?`

    db.query(sql, [req.query.user_id, req.query.subject_id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除用户该主题课程失败！')

        res.cc('删除用户该主题课程成功！', 0)

    })
}
