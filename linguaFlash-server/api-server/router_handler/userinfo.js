const db = require('../db/index')
// let multiparty = require('multiparty');
const fs = require('fs')

const copyFiles = require("../util/copyFiles")


// 获取用户信息的函数
exports.getUserInfo = (req, res) => {
    // 根据用户的 id，查询用户信息,需排除password
    const sql = `select id, username, nickname, email, gender, introduce, user_pic, foreign_courses, register_date, collect_words, learned_words from ling_users where id=?`

    // req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        
    if (err) return res.cc(err)

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc('获取用户信息失败！')

    // 3. 将用户信息响应给客户端
      res.send({
          status: 0,
          message: '获取用户基本信息成功！',
          data: results[0],
      })
    })
}

// 更新用户信息的函数
exports.updateUserInfo = (req, res) => {
  const sql = `update ling_users set ? where id=?`
  db.query(sql, [req.body, req.user.id], (err, results) => {

  if (err) return res.cc(err)

  if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

  return res.cc('修改用户基本信息成功！', 0)
})

}

// 重置密码的函数
exports.updatePassword = (req, res) => {

// 查询用户是否存在
    const sql = `select * from ling_users where id=?`

    db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)

    if (results.length !== 1) return res.cc('用户不存在！')

    
    // 判断提交的旧密码是否正确
    const bcrypt = require('bcryptjs')
    // bcrypt.compareSync(提交的密码，数据库中的密码)验证输入的原密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误！')

// 更新用户密码
    const sql = `update ling_users set password=? where id=?`

    // 新密码bcrypt加密
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

    db.query(sql, [newPwd, req.user.id], (err, results) => {

    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('更新密码失败！')

    res.cc('更新密码成功！', 0)
    })
})

}

// // 更新头像的函数
// exports.updateAvatar = (req, res) => {
//   // console.log(req.file);
//   let fileObj = req.file
//   let originalArr = fileObj.originalname.split('.')
//   let type = originalArr[originalArr.length - 1]

//   fs.readFile('static/upload/' + fileObj.filename, (err, data) => {
//     if (err) return res.cc(err) 

//     let newPath = 'img/avatar/' + fileObj.filename + "." + type

//     fs.writeFile('public/' + newPath, data, (err) =>{
//       if (err) return res.cc(err) 

//       fs.unlink('static/upload/' + fileObj.filename, () => {
//         res.send({
//           code: '200',
//           msg: '上传成功'
//         })
//       })
//     })
//   })
// //   const sql = 'update ling_users set user_pic=? where id=?'

// //   db.query(sql, [req.body.avatar, req.user.id], (err, results) => {

// //   if (err) return res.cc(err)

// //   if (results.affectedRows !== 1) return res.cc('更新头像失败！')

// //   return res.cc('更新头像成功！', 0)
// // })

// }

//上传图片
exports.updateAvatar = (req, res) => {

    // console.log(req.file);
    const filenaem = req.file.filename
    
    copyFiles({ fromPath: '../api-server/static/upload/', toPath: "../api-admin/static/avatar/", filename: filenaem })

    const sql = 'update ling_users set user_pic=? where id=?'

    db.query(sql, [req.file.filename, req.user.id], (err, results) => {

      if (err) return res.cc(err)

      if (results.affectedRows !== 1) return res.cc('更新头像失败！')

      return res.cc('更新头像成功！', 0)
    })

}

//更新用户所选课程的函数
exports.updateUserCourses = (req, res) => {

  //查询课程是否存在
  const sql = `select * from ling_foreign_courses where id=?`

  db.query(sql, req.body.foreign_courses, (err, results) => {

    if (err) return res.cc(err)

    if (results.length !== 1) return res.cc('课程不存在！')
  
    const sql = 'update ling_users set foreign_courses=? where id=?'

    db.query(sql, [req.body.foreign_courses,req.user.id], (err, results) => {
      if (err) return res.cc(err)

      if (results.affectedRows !== 1) return res.cc('更新课程失败！')

      res.cc('更新课程成功！', 0)
    })
  })

}

// //更新用户收藏单词数(根据用户单词表)
exports.updateUserCollectWords = (req, res) => {

  //查询用户单词表收藏单词的数量
  const sql = `select iscollect from ling_user_word where user_id=? and iscollect=1`

  db.query(sql, req.user.id, (err, result) => {

    if (err) return res.cc(err)

    if (result.length == 0) return res.cc('用户无收藏的单词！')

    // console.log(result.length);

    //查询用户原来的收藏单词数
    const sql = `select collect_words from ling_users where id=?`

    db.query(sql, req.user.id, (err, results) => {

      if (err) return res.cc(err)
      // console.log(results[0].collect_words);
      //如果不相等
      if (result.length !== results[0].collect_words){

        const sql = 'update ling_users set collect_words=? where id=?'

        db.query(sql, [result.length, req.user.id], (err, results) => {

          if (err) return res.cc(err)

          if (results.affectedRows !== 1) return res.cc('更新用户收藏单词数失败！')

          res.cc('更新用户收藏单词数成功！', 0)
        })
      }else{
        res.cc('用户的收藏单词数未变，更新失败')
      }
      
    })
  })

}

//更新用户已学会单词数(根据用户单词表)
exports.updateUserLearnedWords = (req, res) => {

  //查询用户单词表收藏单词的数量
  const sql = `select islearned from ling_user_word where user_id=? and islearned=1`

  db.query(sql, req.user.id, (err, result) => {

    if (err) return res.cc(err)

    if (result.length == 0) return res.cc('用户无已学会的单词！')

    // console.log(result.length);

    //查询用户原来的已学会的单词数
    const sql = `select learned_words from ling_users where id=?`

    db.query(sql, req.user.id, (err, results) => {

      if (err) return res.cc(err)
      // console.log(results[0].learned_words);
      //如果不相等
      if (result.length !== results[0].learned_words) {

        const sql = 'update ling_users set learned_words=? where id=?'

        db.query(sql, [result.length, req.user.id], (err, results) => {

          if (err) return res.cc(err)

          if (results.affectedRows !== 1) return res.cc('更新用户已学会单词数失败！')

          res.cc('更新用户已学会单词数成功！', 0)
        })
      } else {
        res.cc('用户的已学会单词数未变，更新失败')
      }

    })
  })

}