const db = require('../db/index')

// const async = require('async')
// const { result } = require('@hapi/joi/lib/base')

//获取所有主题课程的函数
exports.getAllSubjects = (req, res) => {

  const sql = 'select * from ling_subject_courses where status=1 and IsDeleted=0 order by id asc'

  db.query(sql, (err, results) => {

    if (err) return res.cc(err)

    res.send({
      status: 0,
      message: '获取所有主题课程成功！',
      data: results,
    })
  })
}

//获取用户已激活的主题课程
exports.getAllUserSubject = (req, res) => {
  const sql = 'select * from ling_user_subject where user_id=?'

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)

    var num = '';//用户已激活的主题课程id数据初始化
    //id拼接
    results.forEach((item, index) => {
      // console.log(item.subject_id)
      if (index == results.length - 1) {
        num += '"' + item.subject_id + '"'
        return;
      }
      num += '"' + item.subject_id + '"' + ","
    })

    const sql = `select * from ling_subject_courses where id in (${num}) and IsDeleted=0`

    db.query(sql, function (err, results) {

      if (err) return res.cc(err)

      res.send({
        status: 0,
        message: '获取用户已激活的主题课程成功！',
        data: results,
      })
    })
  })
}

//根据 Id 增加用户激活的主题课程
exports.addUserSubject = (req, res) => {

  //查询是否已激活
  const sql = `select * from ling_user_subject where user_id=? and subject_id=?`

  db.query(sql, [req.user.id, req.params.id], (err, results) => {

    if (err) return res.cc(err)

    if (results.length !== 0 && req.params.id === results[0].subject_id) return res.cc('该主题课程已被激活！')

    const sql = `insert into ling_user_subject (user_id, subject_id) values (?, ?)`

    db.query(sql, [req.user.id, req.params.id], (err, results) => {

      if (err) return res.cc(err)

      if (results.affectedRows !== 1) return res.cc('激活主题课程失败！')

      res.cc('激活主题课程成功！', 0)
    })
  })
}

//根据id删除用户已激活的主题课程
exports.deleteUserSubjectById = (req, res) => {

  const sql = `delete from ling_user_subject where user_id=? and subject_id=?`

  db.query(sql, [req.user.id, req.params.id], (err, results) => {

    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('删除主题课程失败！')

    res.cc('删除主题课程成功！', 0)

  })
}

//根据id查询一条主题课程信息
exports.getOneSubjectById = (req, res) => {

  const sql = `select * from ling_subject_courses where id=? and IsDeleted=0`

  db.query(sql, req.params.id, (err, results) => {

    if (err) return res.cc(err)

    if (results.length !== 1) return res.cc('获取主题课程数据失败！')

    res.send({
      status: 0,
      message: '获取主题课程数据成功！',
      data: results[0],
    })
  })
}

//根据id购买主题课程
exports.buyOneSubjectById = (req, res) => {

  const sql = `select * from ling_subject_courses where id=? and IsDeleted=0`

  db.query(sql, req.params.id, (err, results) => {

    if (err) return res.cc(err)

    if (results.length !== 1) return res.cc('无该主题课程！')

    //查询是否已激活
    const sql = `select * from ling_user_subject where user_id=? and subject_id=?`

    db.query(sql, [req.user.id, req.params.id], (err, result) => {

      if (err) return res.cc(err)

      if (result.length !== 0 && req.params.id === result[0].subject_id) return res.cc('该主题课程已被激活！')

      const sql = `insert into ling_user_subject (user_id, subject_id) values (?, ?)`

      db.query(sql, [req.user.id, req.params.id], (err, res1) => {

        if (err) return res.cc(err)

        if (res1.affectedRows !== 1) return res.cc('激活主题课程失败！')

        // res.cc('激活主题课程成功！', 0)

        const sql = `select id from ling_word where category=? and IsDeleted=0`

        db.query(sql, req.params.id, (err, res2) => {

          if (err) return res.cc(err)

          if (res2.length < 1) return res.cc('获取主题课程中的单词失败！',0)

          // console.log(res2);
          let num = '';
          let user_id = req.user.id
          res2.forEach((item, index) => {

            if (index == res2.length - 1) {
              num += '(' + user_id + ',' + item.id + ')'
              return
            }
            num += '(' + user_id + ',' + item.id + ')' + ","
          })
          // console.log(num);

          const sql = `insert into ling_user_word (user_id, word_id) values ${num}`

          db.query(sql, (err, res3) => {

            if (err) return res.cc(err)

            // console.log(123);
            if (res3.affectedRows === 0) {
              console.log('无单词可添加');
            }

            const sql = `select id from ling_sentence where category=? and IsDeleted=0`

            db.query(sql, req.params.id, (err, res4) => {

              if (err) return res.cc(err)

              if (res4.length < 1) return res.cc('获取主题课程中的句子失败！', 0)

              let num2 = '';
              let user_id = req.user.id
              res4.forEach((item, index) => {

                if (index == res4.length - 1) {
                  num2 += '(' + user_id + ',' + item.id + ')'
                  return
                }
                num2 += '(' + user_id + ',' + item.id + ')' + ","
              })
              // console.log(num2);
              const sql = `insert into ling_user_sentence (user_id, sentence_id) values ${num2}`

              db.query(sql, (err, res5) => {

                if (err) return res.cc(err)

                if (res5.affectedRows === 0) {
                  console.log('无句子可添加');
                }
                res.send({
                  status: 0,
                  message: '激活主题课程成功！',
                })
              })
            })
          })
        })
      })
    })
  })
}