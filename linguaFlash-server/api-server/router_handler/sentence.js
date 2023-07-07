const db = require('../db/index')


//获取用户当天所需要的的句子(根据用户的学习计划 随机获取)
exports.getUserNeedSentence = (req, res) => {
    const sql = 'select * from ling_plan where belongs_user=?'

    db.query(sql, req.user.id, (err, results) => {

        if (err) return res.cc(err)

        const number = results[0].sentence_plan - results[0].sentence_complete
        // console.log(number);
        // const sql = `select word_id from ling_user_word where user_id=? and islearned=0`
        const sql = `SELECT sentence_id,proficiency FROM ling_user_sentence WHERE user_id=? AND islearned=0 ORDER BY Proficiency ASC , RAND() LIMIT ${number}`

        db.query(sql, req.user.id, (err, results) => {

            if (err) return res.cc(err)

            // console.log(results);
            if (results.length == 0) {
                return res.cc('用户今天无未学会的句子')
            }

            
            // console.log(results);
            // for (let index = 0; index < results.length; index++) {
                //     console.log(results[index].sentence_id);
                
                // }
            let num = '';

            results.forEach((item, index) => {

                if (index == results.length - 1) {
                    num += '"' + item.sentence_id + '"'
                    return
                }
                num += '"' + item.sentence_id + '"' + ","
            })

            let proficiency = results
           
            // console.log(num);

            const sql = `select * from ling_sentence where id in (${num})`

            db.query(sql, function (err, results) {

                // console.log(proficiency);
                let AddProresult = []
                for (let index = 0; index < results.length; index++) {
                    let result = results.find((item) => {
                    // const element = array[index];
                    // console.log(results[index].sentence_id);
                        return item.id == proficiency[index].sentence_id
                    })
                    // console.log(result)
                    result["proficiency"] = proficiency[index].proficiency
                    // console.log(result)
                    AddProresult.push(result)
                }
                // console.log(results);
                // console.log(AddProresult);
                if (err) return res.cc(err)

                // console.log(results);
                res.send({
                    status: 0,
                    message: '获取用户今天未学会的句子成功！',
                    data: AddProresult,
                })
            })
        })
    })
}


//修改用户的句子的熟练度 +1 加到5时修改islearned为1(已学会)
exports.updateUserSentenceProficiency = (req, res) => {
    const sql = `SELECT * FROM ling_user_sentence WHERE user_id=? AND sentence_id=?`

    db.query(sql, [req.user.id, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('用户已购课程中无该句子！')

        // console.log(typeof results[0].proficiency);
         if (results[0].proficiency == 5 && results[0].islearned == 1){

            return res.cc('该句子已学会!')
            
        } else {
            let proficiency = results[0].proficiency+1
            //  console.log(proficiency);

            if (proficiency == 5 && results[0].islearned == 0){

                const sql = `update ling_user_sentence set islearned=1, proficiency=${proficiency} where user_id=? and sentence_id=?`

                db.query(sql, [req.user.id, req.params.id], (err, results) => {

                    if (err) return res.cc(err)

                    if (results.affectedRows !== 1) return res.cc('影响行数不为1')

                    return res.cc('用户句子熟练度+1且修改为已学会成功!', 0)
                })

            } else if (proficiency < 5){

                const sql = `update ling_user_sentence set proficiency=${proficiency} where user_id=? and sentence_id=? and islearned=0`

                db.query(sql, [req.user.id, req.params.id], (err, results) => {

                    if (err) return res.cc(err)

                    if (results.affectedRows !== 1) return res.cc('影响行数不为1')

                    // console.log(results);
                    return res.cc('用户句子熟练度加一成功!', 0)

                })
            }

        }
    })
}
