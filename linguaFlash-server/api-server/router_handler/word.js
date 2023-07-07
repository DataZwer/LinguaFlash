const db = require('../db/index')


//根据主题课程 id 激活用户的主题课程单词（增加用户的单词，即购买主题课程）
exports.addUserWord = (req, res) => {

    //查询是否已激活
    const sql = `select * from ling_user_subject where user_id=? and subject_id=?`

    db.query(sql, [req.user.id, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.length !== 0 && req.params.id === results[0].subject_id) return res.cc('该主题课程已被激活！')

        const sql = `select id from ling_word where category=? and IsDeleted=0`

        db.query(sql, req.params.id, (err, results) => {

            if (err) return res.cc(err)

            let num = '';

            results.forEach((item, index) => {
                if (index == results.length - 1) {
                    num += '("' + req.user.id + '",' + '"' + item.id + '")'
                    return;
                }
                num += '("' + req.user.id + '",' + '"' + item.id + '"),'
            })

            const sql = `insert into ling_user_word(user_id,word_id) values ${num}`

            db.query(sql, function (err, results) {

                if (err) return res.cc(err)

                res.send({
                    status: 0,
                    message: '激活用户购买的单词成功！'
                })
            })
        })
    })
}

//获取用户所有还未学会的单词
exports.getUserUnleanedWord = (req, res) => {

    const sql = `select word_id from ling_user_word where user_id=? and islearned=0`

    db.query(sql, req.user.id, (err, results) => {

        if (err) return res.cc(err)

        // console.log(results);
        if (results.length == 0) {
            return res.cc('用户无未学会的单词')
        }

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.word_id + '"'
                return
            }
            num += '"' + item.word_id + '"' + ","
        })


        const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`

        db.query(sql, function (err, results) {

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取用户所有未学会的单词成功！',
                data: results,
            })
        })
    })
}

//获取用户当天所需的未学会的单词（根据用户学习计划 随机获取）
exports.getNeedUnleanedWord = (req, res) => {

    const sql = 'select * from ling_plan where belongs_user=?'

    db.query(sql, req.user.id, (err, results) => {

        if (err) return res.cc(err)

        const number = results[0].plan_complete - results[0].complete
        // console.log(number);
        // const sql = `select word_id from ling_user_word where user_id=? and islearned=0`
        const sql = `SELECT word_id FROM ling_user_word WHERE user_id=? AND islearned=0 ORDER BY RAND() LIMIT ${number}`

        db.query(sql, req.user.id, (err, results) => {

            if (err) return res.cc(err)

            // console.log(results);
            if (results.length == 0) {
                return res.cc('用户今天无未学会的单词')
            }

            let num = '';

            results.forEach((item, index) => {

                if (index == results.length - 1) {
                    num += '"' + item.word_id + '"'
                    return
                }
                num += '"' + item.word_id + '"' + ","
            })


            const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`

            db.query(sql, function (err, results) {

                if (err) return res.cc(err)

                res.send({
                    status: 0,
                    message: '获取用户今天未学会的单词成功！',
                    data: results,
                })
            })
        })
    })
}

//获取用户未学会的单词（根据用户选择5、10、20... 随机获取）
exports.getUnleanedWordBySelect = (req, res) => {

    const sql = `SELECT word_id FROM ling_user_word WHERE user_id=? AND islearned=0 ORDER BY RAND() LIMIT ?`

    db.query(sql, [req.user.id, req.params.number], (err, results) => {

        if (err) return res.cc(err)

        // console.log(results);
        if (results.length == 0) {
            return res.cc('用户今天无未学会的单词')
        }

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.word_id + '"'
                return
            }
            num += '"' + item.word_id + '"' + ","
        })


        const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`

        db.query(sql, function (err, results) {

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取用户今天未学会的单词成功！',
                data: results,
            })
        })
    })
}

//获取用户所有已学会的单词
exports.getUserLeanedWord = (req, res) => {
    const sql = 'select word_id from ling_user_word where user_id=? and islearned=1'

    db.query(sql, req.user.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.length == 0) {
            return res.cc('用户今天无未学会的单词')
        }

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.word_id + '"'
                return
            }
            num += '"' + item.word_id + '"' + ","
        })

        const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`

        db.query(sql, function (err, results) {

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取用户所有已学会的单词成功！',
                data: results,
            })
        })
    })
}

//获取用户已学会的单词（根据用户选择5、10、20... 随机获取）
exports.getLeanedWordBySelect = (req, res) => {

    const sql = `SELECT word_id FROM ling_user_word WHERE user_id=? AND islearned=1 ORDER BY RAND() LIMIT ?`

    db.query(sql, [req.user.id, req.params.number], (err, results) => {

        if (err) return res.cc(err)

        // console.log(results);
        if (results.length == 0) {
            return res.cc('用户今天无已学会的单词')
        }

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.word_id + '"'
                return
            }
            num += '"' + item.word_id + '"' + ","
        })

        const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`

        db.query(sql, function (err, results) {

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取用户已学会的单词成功！',
                data: results,
            })
        })
    })
}

//获取用户所有已收藏的单词
exports.getUserCollectWord = (req, res) => {
    const sql = 'select word_id from ling_user_word where user_id=? and iscollect=1'

    db.query(sql, req.user.id, (err, results) => {

        if (err) return res.cc(err)

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.word_id + '"'
                return
            }
            num += '"' + item.word_id + '"' + ","
        })

        const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`

        db.query(sql, function (err, results) {

            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取用户所有已收藏的单词成功！',
                data: results,
            })
        })
    })
}

//根据单词id获取用户单词的状态
exports.getUserIsCollectById = (req, res) => {
    const sql = 'select * from ling_user_word where user_id=? and word_id=?'

    db.query(sql, [req.user.id, req.params.id], function (err, results) {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('获取用户单词的状态失败！')

        res.send({
            status: 0,
            message: '获取用户单词的状态成功！',
            data: results,
        })
    })

}

//根据单词id修改用户单词的状态为已收藏
exports.updataIscollectYes = (req, res) => {

    const sql = 'update ling_user_word set iscollect=1 where user_id=? and word_id=? and iscollect=0'

    db.query(sql, [req.user.id, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('该单词已收藏！')

        return res.cc('收藏单词成功！', 0)

    })
}

//根据单词id修改用户单词的状态为未收藏
exports.updataIscollectNo = (req, res) => {

    const sql = 'update ling_user_word set iscollect=0 where user_id=? and word_id=? and iscollect=1'

    db.query(sql, [req.user.id, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('该单词已未收藏！')

        return res.cc('取消收藏单词成功！', 0)

    })
}

//根据单词id修改用户单词的状态为已学会
exports.updataIslearnedYes = (req, res) => {

    const sql = 'update ling_user_word set islearned=1 where user_id=? and word_id=? and islearned=0'

    db.query(sql, [req.user.id, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('添加已学会单词失败！')

        return res.cc('添加已学会单词成功！', 0)

    })
}

//根据单词id修改用户单词的状态为未学会
exports.updataIslearnedNo = (req, res) => {

    const sql = 'update ling_user_word set islearned=0 where user_id=? and word_id=? and islearned=1'

    db.query(sql, [req.user.id, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除已学会单词失败！')

        return res.cc('删除已学会单词成功！', 0)

    })
}

//单词选择题（根据用户选择5、10、20... 随机获取题目）
exports.getmcqBySelect = (req, res) => {

    const sql = `SELECT word_id FROM ling_user_word WHERE user_id=? AND islearned=1 ORDER BY RAND() LIMIT ?`

    db.query(sql, [req.user.id, req.params.number], (err, results) => {

        if (err) return res.cc(err)

        // console.log(results);
        if (results.length == 0) {
            return res.cc('用户今天无已学会的单词题目')
        }

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.word_id + '"'
                return
            }
            num += '"' + item.word_id + '"' + ","
        })

        const sql = `select * from ling_word where id in (${num}) and IsDeleted=0`

        db.query(sql, function (err, results) {


            if (err) return res.cc(err)

            let mcqOptions = []

            for (let key in results) {

                let trueOptions = {
                    'id': results[key].id,
                    'words': results[key].words,
                    'phonetic': results[key].phonetic,
                    'notes': results[key].notes
                }
                // console.log(trueOptions);


                const sql = `select id, words, phonetic, notes from ling_word where id != ${results[key].id} and IsDeleted=0 ORDER BY RAND() limit 3`

                db.query(sql, function (err, resu) {
                    // console.log('otherOptions:',res);
                    results[key]['Options'] = resu
                    const max = 4;
                    const min = 0;
                    let random = parseInt(Math.random() * (max - min) + min)
                    results[key]['Options'].splice(random, 0, trueOptions)
                    // results[key]['Options'].push(trueOptions)
                    // console.log(results[key]);
                    mcqOptions.push(results[key])
                    if (key == results.length - 1) {

                        // console.log(mcqOptions);
                        res.send({
                            status: 0,
                            message: '获取用户已学会的单词题目成功！',
                            data: mcqOptions,
                        })
                    }

                    // console.log('-----------------');
                })

                // results[key]['Options'] = []

                // console.log(results[key]);
            }
            // console.log(mcqOptions);

            // res.send({
            //     status: 0,
            //     message: '获取用户已学会的单词成功！',
            //     data: results,
            // })
        })
    })
}