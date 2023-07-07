# LinguaFlash-英语学习平台
基于vue2.0+node.js的英语学习平台

## 项目结构

```
LinguaFlash/
|
+- server/ <-- node后端
|  |
|  +- api-server <-- 前台后端
|  |
|  +- api-admin <-- 后台后端
|  |
+- linguaFlash-project/ <-- 前台vue项目
|  |
+- linguaFlash-project-admin/ <-- 后台vue项目
```

## 运行

打开项目文件夹在终端输入` npm i `安装项目依赖

### linguaFlash-project （前台vue项目）

```bash
# 进入项目目录
cd linguaFlash-project
cd app

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
```

### api-server（前台 node 后端）

```bash
# 进入项目目录
cd api-server

# 安装依赖
npm install

# 启动服务
node app.js
```

### linguaFlash-project-admin （后台 vue 前端）

```bash
# 进入项目目录
cd project-lingvist-admin

# 安装依赖
npm install

# 启动服务
npm run dev
```

### api-admin（ 后台 node 后端）

```bash
# 进入项目目录
cd api-admin

# 安装依赖
npm install

# 启动服务
node app.js
```

前台后端接口浏览器访问：https://www.showdoc.com.cn/linguaFlashProjectt

后台后端接口浏览器访问（文档未完善）：https://www.showdoc.com.cn/linguaFlashAdmin

# todoList

- [ ] 用户反馈功能
- [ ] 单词连线
- [ ] 国际化
- [ ] 单词图片
- [ ] 用户学习数据记录
- [ ] 登录日志

#  效果预览

#### 前台界面：

- 登录：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/login.png">


- 注册：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/register.png">

- 首页：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/index.png">

- 单词学习：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/study.png">

- 拼写练习：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/spelling.png">

- 选词填空：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/practice1.png">

- 词语练习：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/practice2.png">

- 用户信息：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/user1.png">

- 编辑信息：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/updateInfo.png">


- 用户收藏：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/ui/userStar.png">

#### 后台界面：

- 首页：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/index.png">


- 管理员列表：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/admin.png">


- 修改密码：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/updatePsd.png">

- 用户列表：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/user.png">

- 外语课程,：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/course.png">

- 主题课程：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/subject.png">

- 用户主题课程：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/userSubject.png">

- 单词列表：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/word.png">

- 用户单词列表：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/userWord2.png">

- 句子列表：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/sentence.png">

- 用户句子列表：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/word.png">

- 单词计划列表：<br/>

  <img width="1191" src="https://github.com/qingshansuiyun/LinguaFlash/blob/main/screenshots/backend/userPlan.png">



