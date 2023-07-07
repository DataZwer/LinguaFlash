const db = require('../db/index')

//获取所有外语课程
exports.getAllForeignCourses = (req, res) => {
    
  const sql = 'select * from ling_foreign_courses where status=1 and IsDeleted=0 order by id asc'

    db.query(sql, (err,results) => {

        if (err) return res.cc(err)

        res.send({
            status: 0,
            message:'获取所有外语课程成功',
            data: results,
        })
    })
}


//根据当前用户所选课程id获取用户所选课程
exports.getOneForeignCourses = (req, res) =>{

  const sql = `select foreign_courses from ling_users where id=?`

  db.query(sql, req.user.id, (err, results) => {

    if (err) return res.cc(err)

    const sql = `select * from ling_foreign_courses where id=? and IsDeleted=0`

    db.query(sql, results[0].foreign_courses, (err, results) => {

      if (err) return res.cc(err)

      if (results.length !== 1) return res.cc('获取用户所选课程数据失败！')

      res.send({
        status: 0,
        message: '获取用户所选课程数据成功！',
        data: results[0],
      })
    })

  })
  
}