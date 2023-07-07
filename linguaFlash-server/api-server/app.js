const express = require('express')

const app = express()

const joi = require('joi')//数据校验

const cors = require('cors')//跨域
app.use(cors())

app.use(express.urlencoded({ extended: false }))//解析表单数据
// app.use(express.json())

// 托管静态资源文件
app.use('/api', express.static('./static/upload'))

app.use('/api', express.static('./public/img/foreign'))


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


// 导入用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)//注册用户路由模块

// 导入用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)//注册用户信息路由模块，需进行Token身份认证

//导入外语课程路由模块
const foreignRouter = require('./router/foreign')
app.use('/my/foreign', foreignRouter)//注册外语课程路由模块，需进行Token身份认证

//导入学习计划路由模块
const PlanRouter = require('./router/plan')
app.use('/my/plan', PlanRouter)//注册学习计划路由模块，需进行Token身份认证

//导入主题课程路由模块
const SubjectRouter = require('./router/subject')
app.use('/my/subject', SubjectRouter)//注册主题课程路由模块，需进行Token身份认证

//导入学习单词路由模块
const WordRouter = require('./router/word')
app.use('/my/word', WordRouter)//注册学习单词路由模块，需进行Token身份认证

//导入学习句子路由模块
const Sentence = require('./router/sentence')
app.use('/my/sentence', Sentence)

//导入管理员路由模块
const AdminRouter = require('./router/admin')
app.use('/api', AdminRouter)

// 错误中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  // console.log(999999);

  res.cc(err)
})


app.listen(3008, function () {
  console.log('api server running at http://127.0.0.1:3008')
})
