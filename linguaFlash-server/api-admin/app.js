const express = require('express')

const app = express()

const joi = require('joi')//token

const cors = require('cors')//跨域
app.use(cors())

app.use(express.urlencoded({ extended: false }))//解析表单数据
// app.use(express.json())

// 托管静态资源文件
app.use('/api', express.static('./static/upload'))
app.use('/api', express.static('./static/avatar'))


app.use((req, res, next) => {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next();
})


const expressJWT = require('express-jwt')//解析token
const config = require('./config')//配置文件


//指定 /api 接口不用Token身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

//导入管理员路由模块
const adminRouter = require('./router/admin')
app.use('/api', adminRouter)

//导入管理员信息路由模块
const admininfoRouter = require('./router/admininfo')
app.use('/my', admininfoRouter)

//导入外语课程路由模块
const foreignRouter = require('./router/foreign')
app.use('/my/foreign', foreignRouter)

//导入主题课程路由模块
const subjectRouter = require('./router/subject')
app.use('/my/subject', subjectRouter)

//导入词卡路由模块
const wordRouter = require('./router/word')
app.use('/my/word', wordRouter)

//导入句子路由模块
const sentenceRouter = require('./router/sentence')
app.use('/my/sentence', sentenceRouter)

//导入用户路由模块
const userRouter = require('./router/user')
app.use('/my/user', userRouter)

//导入用户主题课程路由模块
const userSubjectRouter = require('./router/userSubject')
app.use('/my/userSubject', userSubjectRouter)

//导入用户单词路由模块
const userWordRouter = require('./router/userWord')
app.use('/my/userWord', userWordRouter)

//导入用户句子路由模块
const userSentenceRouter = require('./router/userSentence')
app.use('/my/userSentence', userSentenceRouter)

//导入计划路由模块
const planRouter = require('./router/plan')
app.use('/my/plan', planRouter)

//导入首页路由模块
const homeRouter = require('./router/home')
app.use('/my/home', homeRouter)

// 错误中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  res.cc(err)
})


app.listen(3009, function () {
  console.log('api server running at http://127.0.0.1:3009')
})
