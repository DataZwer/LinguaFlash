import request from './request';
import reqavatar from './avatar'

//注册接口
//http://127.0.0.1:3008/api/register POST username password email
export const reqRegister = (username, password, email) => request({ url: `/api/register`, method: 'post', data: { username, password, email}})

//登录接口
//http://127.0.0.1:3008/api/login  POST username password
export const reqLogin = (username,password)=>request({url:`/api/login`,method:'post',data:{username,password}});

//获取用户信息的接口
//http://127.0.0.1:3008/my/userinfo  get
export const reqUserInfo = () => request({ url: `/my/userinfo`, method: 'get' });

//更新用户的基本信息接口
//http://127.0.0.1:3008/my/userinfo POST nickname email gender introduce
export const reqUpdateUserInfo = (nickname, email, gender, introduce) => request({ url: `/my/userinfo`, method: 'post', data: { nickname, email, gender, introduce}})

//重置密码接口
//http://127.0.0.1:3008/my/updatepwd POST oldPwd newPwd
export const reqUpdateUserPassword = (oldPwd, newPwd) => request({ url: `/my/updatepwd`, method: 'post', data: { oldPwd, newPwd}})

//获取用户所选外语课程接口
//http://127.0.0.1:3008/my/foreign/course GET 
export const reqGetUserForeign = () => request({ url: `/my/foreign/course`, method: 'get'})

//查询所有外语课程接口
//http://127.0.0.1:3008/my/foreign/courses GET 
export const reqGetAllForeigns = () => request({ url: `/my/foreign/courses`, method: 'get'})

//更新用户所选外语课程接口
//http://127.0.0.1:3008/my/update/courses POST foreign_courses
export const reqUpdateUserForeign = (foreign_courses) => request({ url: `/my/update/courses`, method: 'post', data: { foreign_courses}})

//获取学习计划接口
//http://127.0.0.1:3008/my/plan/getplan GET 
export const reqGetUserPlan = () => request({ url: `/my/plan/getplan`, method:'get'})

//获取所有主题课程接口
//http://127.0.0.1:3008/my/subject/getsubjects GET
export const reqGetAllSubjects = () => request({ url: `/my/subject/getsubjects`, method: 'get'})

//获取用户已激活的主题课程接口
//http://127.0.0.1:3008/my/subject/getusersub GET
export const reqGetUserSubjects = () => request({ url:`/my/subject/getusersub`, method: 'get'})

//根据主题课程Id增加用户主题课程接口
//http://127.0.0.1:3008/my/subject/addusersub/:id POST id
export const reqAddUserSubject = (id) => request({ url: `/my/subject/addusersub/${id}`, method: 'post'}) 

//根据主题课程Id增加用户主题课程接口
//http://127.0.0.1:3008/my/subject/addusersub/:id POST id
export const reqUserBuySubject = (id) => request({ url: `/my/subject/buysubject/${id}`, method: 'post'}) 

//删除用户已激活的主题课程接口
//http://127.0.0.1:3008/my/subject/delusersub/:id GET id
export const reqDeleteUserSubject = (id) => request({ url:`/my/subject/delusersub/${id}`, method: 'get'})

//更换头像接口
//http://127.0.0.1:3008/my/update/avatar POST avatar
export const reqUpdateUserAvatar = (avatar) => reqavatar({ url: `/my/update/avatar`, method: 'post', data: { avatar}})

//获取用户所有还未学会的单词接口
//http://127.0.0.1:3008/my/word/getword POST
export const reqGetUserNoLearnWord = () => request({ url: `/my/word/getword`, method: 'post'})

//获取用户当天所需的未学会的单词（根据用户学习计划 随机获取）
//http://127.0.0.1:3008/my/word/getneed POST
export const reqGetNeedNoLearnWord = () => request({ url:`/my/word/getneed`, method: 'post'})

//根据单词id标记单词为已学会接口
//http://127.0.0.1:3008/my/word/updateislearn/:id POST id
export const reqUpdateWordLearning = (id) => request({ url: `/my/word/updateislearn/${id}`, method:'post'})

//更新用户当天实际已完成的单词数
//http://127.0.0.1:3008/my/plan/upcomplete/:complete GET　complete(int类型)
export const reqUpdatePlanComlpete = (complete) => request({ url: `/my/plan/upcomplete/${complete}`, method:'get'})

//更新用户的学习计划的时间戳为当前时间(更新 complete 用)
//http://127.0.0.1:3008/my/plan/uptimeStamp GET
export const reqUpdatePlanTimeStamp = () => request({ url:`/my/plan/uptimeStamp`, method:'get'})

//新增学习计划接口(用户注册时添加)
//http://127.0.0.1:3008/my/plan/addplan POST
export const reqAddPlanForUserRegister = () => request({ url:`/my/plan/addplan`, method:'post' })

//获取用户已学会的单词（根据用户选择 随机获取）
//http://127.0.0.1:3008/my/word/getwordsel/:number GET number(int)
export const reqGetLearnWordBySelect = (number) => request({ url:`/my/word/getwordsel/${number}`, method:'get'})

//根据单词id获取用户单词的状态
//http://127.0.0.1:3008/my/word/getiscolle/:id GET id(params int)
export const reqGetUserWordStateById = (id) => request({ url:`/my/word/getiscolle/${id}`, method:'get'})

//根据单词id收藏用户单词接口
//http://127.0.0.1:3008/my/word/updateiscolle/:id POST id(params int)
export const reqUpdateUserWordIscollect = (id) => request({ url: `/my/word/updateiscolle/${id}`, method: 'POST' })

//根据单词id取消收藏用户单词接口
//http://127.0.0.1:3008/my/word/updatenocolle/:id POST id(params int)
export const reqUpdateUserWordNotcollect = (id) => request({ url: `/my/word/updatenocolle/${id}`, method: 'POST' })

//获取用户未学会的单词（根据用户选择 随机获取）
//http://127.0.0.1:3008/my/word/getneedsel/:number POST number(params int)
export const reqGetUserNoLearnWordBySelect = (number) => request({ url: `/my/word/getneedsel/${number}`, method: 'POST' })

//修改用户的计划学习单词数
//http://127.0.0.1:3008/my/plan/upplan/:complete GET complete(params int)
export const reqUpdatePlan = (complete) => request({ url: `/my/plan/upplan/${complete}`, method: 'get' })


//更新用户的收藏单词数信息接口
//http://127.0.0.1:3008/my/update/iscollect POST
export const reqUpdateUserCollectWords = () => request({ url:`/my/update/iscollect`, method:'post'})

//更新用户的已学会单词数信息接口
//http://127.0.0.1:3008/my/update/islearned POST
export const reqUpdateUserLearnedWords = () => request({ url: `/my/update/islearned`, method: 'post' })

//获取用户所有已收藏的单词
//http://127.0.0.1:3008/my/word/colleword post
export const reqGetAllCollectWords = () => request({ url: `/my/word/colleword`, method:'post'})

//获取用户所有已学会的单词接口
//http://127.0.0.1:3008/my/word/getword get
export const reqGetAllLearnedWords = () => request({ url:`/my/word/getword`, method:'get'})

//根据单词id标记单词为未学会接口
//http://127.0.0.1:3008/my/word/updatenolearn/:id POST id(params int)
export const reqUpdateUserWordNotLearned = (id) => request({ url: `/my/word/updatenolearn/${id}`, method: 'post' })

//获取用户当天所需要的的句子
//http://127.0.0.1:3008/my/sentence/getsentence post
export const reqGetUserNeedSentence = () => request({ url: `/my/sentence/getsentence`, method:'post'})

//修改用户的句子的熟练度 +1 加到5时修改islearned为1(已学会)
//http://127.0.0.1:3008/my/sentence/studysentence/:id post id(params int)
export const reqUpdateUserSentenceProficiency = (id) => request({ url: `/my/sentence/studysentence/${id}`, method:'post'})

//修改用户句子实际完成的单词数(和时间戳)
//http://127.0.0.1:3008/my/plan/upsencomple/ post 
export const reqUpdatePlanSentenceComplete = () => request({ url:`/my/plan/upsencomple`, method:'post'})

//修改用户句子实际完成的单词数(和时间戳)传参
//http://127.0.0.1:3008/my/plan/upsencomplete/:complete  post complete(params int)
export const reqUpdateUserPlanSentenceComplete = (complete) => request({ url: `/my/plan/upsencomplete/${complete}`, method:'post'})


//修改用户的计划学习句子数
//http://127.0.0.1:3008/my/plan/upsenplan/:complete GET complete(params int)
export const reqUpdatePlanSentencePlan = (complete) => request({ url: `/my/plan/upsenplan/${complete}`, method: 'get' })

//单词选择题（根据用户选择5、10、20… 随机获取题目）接口
//http://127.0.0.1:3008/my/word/getmcq/:number POST number(params int)
export const reqGetMCQBySelect = (number) => request({ url: `/my/word/getmcq/${number}`, method: 'post' })
