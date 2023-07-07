const db = require('../db/index')

// 获取所有用户单词学习计划信息
exports.getAllUserWordPlan = (req, res) => {

    const sql = `select id, username, nickname from ling_users where IsDeleted = 0 order by id asc limit 12`

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.id + '"'
                return
            }
            num += '"' + item.id + '"' + ","
        })

        let userwordplan = []

        const sql2 = `select * from ling_plan where belongs_user in (${num})`

        db.query(sql2, (err, res2) => {

            if (err) return res.cc(err)

            userwordplan = res2

            const arrs = results.map(item => {
                const wordplan = userwordplan.find(i => item.id == i.belongs_user)
                return {
                    ...item,
                    plan: wordplan.plan_complete,
                    complete: wordplan.complete
                }
            })

            res.send({
                status: 0,
                message: '获取所有用户单词学习计划成功!',
                data: arrs,
            })
        })
    })
}

// 获取所有用户句子学习计划信息
exports.getAllUserSentencePlan = (req, res) => {

    const sql = `select id, username, nickname from ling_users where IsDeleted = 0 order by id asc`

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        let num = '';

        results.forEach((item, index) => {

            if (index == results.length - 1) {
                num += '"' + item.id + '"'
                return
            }
            num += '"' + item.id + '"' + ","
        })

        let usersentenceplan = []

        const sql2 = `select * from ling_plan where belongs_user in (${num})`

        db.query(sql2, (err, res2) => {

            if (err) return res.cc(err)

            usersentenceplan = res2

            const arrs = results.map(item => {
                const sentenceplan = usersentenceplan.find(i => item.id == i.belongs_user)
                return {
                    ...item,
                    plan: sentenceplan.sentence_plan,
                    complete: sentenceplan.sentence_complete
                }
            })

            res.send({
                status: 0,
                message: '获取所有用户句子学习计划成功!',
                data: arrs,
            })
        })
    })
}

// 获取所有用户、课程、单词、句子总数
exports.getAllDataNumber = (req, res) => {

    // const sql = 'select COUNT(*) AS count from ling_sentence where IsDeleted = 0'
    const sql1 = 'select COUNT(*) AS count from ling_users where IsDeleted = 0'

    db.query(sql1, (err, res1) => {

        if (err) return res.cc(err)

        const sql2 = `select COUNT(*) AS count from ling_subject_courses where IsDeleted = 0`

        db.query(sql2, (err, res2) => {

            if (err) return res.cc(err)

            const sql3 = `select COUNT(*) AS count from ling_word where IsDeleted = 0`

            db.query(sql3, (err, res3) => {

                if (err) return res.cc(err)

                const sql4 = `select COUNT(*) AS count from ling_sentence where IsDeleted = 0`

                db.query(sql4, (err, res4) => {

                    if (err) return res.cc(err)

                    const dataNum = {
                        userNum: res1[0].count,
                        subjectNum: res2[0].count,
                        wordNum: res3[0].count,
                        sentenceNum: res4[0].count
                    }

                    res.send({
                        status: 0,
                        message: '获取所有用户、课程、单词、句子总数成功!',
                        data: dataNum,
                    })
                })
            })
        })
    })
}

// 获取外语课程饼状数据
exports.getForeignPie = (req, res) => {

    const sql = `select * from ling_foreign_courses where IsDeleted = 0 order by id asc`

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        // let num = '';

        // results.forEach((item, index) => {

        //     if (index == results.length - 1) {
        //         num += '"' + item.id + '"'
        //         return
        //     }
        //     num += '"' + item.id + '"' + ","
        // })

        // let userwordplan = []

        const sql2 = `select id, username, nickname, foreign_courses from ling_users where IsDeleted = 0 order by id asc`

        db.query(sql2, (err, res2) => {

            if (err) return res.cc(err)

            let dataInfo = {};

            res2.forEach((item, index) => {
                let { foreign_courses } = item;
                if (!dataInfo[foreign_courses]) {
                    dataInfo[foreign_courses] = {
                        foreign_courses,
                        child: []
                    }
                }
                dataInfo[foreign_courses].child.push(item);
            });
            // console.log(dataInfo);
            let list = Object.values(dataInfo); // list 转换成功的数据
            // console.log(list)

            const foreignpie = []
            list.forEach((item, index) => {
                const name = results.find((item) => item.id === list[index].foreign_courses).name;
                foreignpie.push({
                    name: name,
                    value: item.child.length
                })
            })
            // console.log(foreignpie);

            res.send({
                status: 0,
                message: '获取外语课程饼状数据成功!',
                data: foreignpie,
            })
        })
    })
}

// 获取主题课程饼状数据
exports.getSubjectPie = (req, res) => {

    const sql = `select * from ling_subject_courses where IsDeleted = 0 order by id asc`

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        const sql2 = `select * from ling_user_subject`

        db.query(sql2, (err, res2) => {

            if (err) return res.cc(err)

            let dataInfo = {};

            res2.forEach((item, index) => {
                let { subject_id } = item;
                if (!dataInfo[subject_id]) {
                    dataInfo[subject_id] = {
                        subject_id,
                        child: []
                    }
                }
                dataInfo[subject_id].child.push(item);
            });

            let list = Object.values(dataInfo); // list 转换成功的数据

            // console.log(list);

            const subjectpie = []
            list.forEach((item, index) => {
                const name = results.find((item) => item.id === list[index].subject_id).name;
                subjectpie.push({
                    name: name,
                    value: item.child.length
                })
            })
            // console.log(foreignpie);

            res.send({
                status: 0,
                message: '获取外语课程饼状数据成功!',
                data: subjectpie,
            })
        })
    })
}

// 获取所有主题课题评分信息
exports.getAllSubjectLevel = (req, res) => {

    const sql = `select id, name, price, level from ling_subject_courses where IsDeleted = 0 order by id asc`

    db.query(sql, (err, results) => {


        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取所有主题课题评分成功!',
            data: results,
        })
    })
}