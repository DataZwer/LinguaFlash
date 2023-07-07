const db = require('../db/index')

//添加一条用户学习计划(注册时用)
exports.addOneUserPlan = (req, res) => {

  const sql = `select * from ling_plan where belongs_user=?`

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)

    if(results.length === 1) return res.cc('用户学习计划已存在')

    const sql = `insert into ling_plan set belongs_user=?`

    db.query(sql, req.user.id, (err,results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('新增学习计划失败！')

        res.cc('新增学习计划成功！', 0)
    })

  })
}

//获取一条学习计划
exports.getOneUserPlan = (req, res) => {

  const sql = 'select * from ling_plan where belongs_user=?'

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)

    res.send({
        status: 0,
        message: '获取学习计划成功！',
        data: results,
    })
  })
}

//修改用户当天实际已完成的单词数
exports.UpdateUserPlanComplete = (req, res) => {

  const sql = `update ling_plan set complete=? where belongs_user=?`

  db.query(sql, [req.params.complete, req.user.id], (err, results) => {

    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('修改用户当天实际完成的单词数失败！')

    return res.cc('修改用户当天实际完成的单词成功！', 0)
  })
}

//修改用户的学习计划的时间戳为当前时间
exports.UpdateUserPlanTimeStamp = (req, res) => {

  let timeStamp = new Date().getTime()

  let TimeStamp = timeStamp.toString() / 1000
  // console.log(TimeStamp);

  const sql = `update ling_plan set timeStamp=${TimeStamp} where belongs_user=?`

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('修改用户学习计划时间戳为当前时间失败！')

    return res.cc('修改用户学习计划时间戳为当前时间成功！', 0)
  })

}

//修改用户的计划学习单词数
exports.UpdateUserPlan = (req, res) => {

  const sql = 'select * from ling_plan where belongs_user=?'

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)
    // console.log(results[0].plan_complete);
    // console.log(req.params.complete);

    if (results[0].plan_complete !== req.params.complete){

      const sql = `update ling_plan set plan_complete=? where belongs_user=?`

      db.query(sql, [req.params.complete, req.user.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户的计划学习单词数失败！')

        return res.cc('修改用户的计划学习单词数成功！', 0)
      })

    }else{
      return res.cc('修改用户的计划学习单词数与原来的相同！')
    }
    
  })

  
}

//修改学习计划sentence_complete+1 并修改时间戳sentence_timeStamp为当前时间
exports.UpdateUserSentenceCompleteAddOne = (req, res) => {

  const sql = 'select * from ling_plan where belongs_user=?'

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)

    if (results[0].sentence_complete < results[0].sentence_plan) {

      let timeStamp = new Date().getTime()

      let TimeStamp = timeStamp.toString() / 1000

      let sentenceComplete = results[0].sentence_complete + 1
      // console.log(sentenceComplete);

      const sql = `update ling_plan set sentence_complete=${sentenceComplete},sentence_timeStamp=${TimeStamp} where belongs_user=?`

      db.query(sql, [req.user.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户句子实际完成的单词数失败！')

        return res.cc('修改用户句子实际完成的单词数成功！', 0)
      })

    } else {
      
      return res.cc('修改用户句子实际完成的单词数失败，不能比计划的大！')
    }

  })
  
}

//修改学习计划sentence_complete 并修改时间戳sentence_timeStamp为当前时间（传参，不+1）
exports.UpdateUserSentenceComplete = (req, res) => {

  const sql = 'select * from ling_plan where belongs_user=?'

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)

    if (results[0].sentence_complete !== req.params.complete) {

      let timeStamp = new Date().getTime()

      let TimeStamp = timeStamp.toString() / 1000

      // let sentenceComplete = results[0].sentence_complete + 1
      // console.log(sentenceComplete);

      const sql = `update ling_plan set sentence_complete=?,sentence_timeStamp=${TimeStamp} where belongs_user=?`

      db.query(sql, [req.params.complete, req.user.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更新用户句子实际完成的单词数失败！')

        return res.cc('更新用户句子实际完成的单词数成功！', 0)
      })

    } else {

      return res.cc('更新用户句子实际完成的单词数失败，不能和原来的相同！')
    }

  })

}

//修改用户的计划学习句子数
exports.UpdateUserPlanSentencePlan = (req, res) => {

  const sql = 'select * from ling_plan where belongs_user=?'

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)
    // console.log(results[0].plan_complete);
    // console.log(req.params.complete);

    if (results[0].sentence_plan !== req.params.complete) {

      const sql = `update ling_plan set sentence_plan=? where belongs_user=?`

      db.query(sql, [req.params.complete, req.user.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户的计划学习句子数失败！')

        return res.cc('修改用户的计划学习句子数成功！', 0)
      })

    } else {
      return res.cc('修改用户的计划学习句子数与原来的相同！')
    }
  })
}