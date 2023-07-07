<template>
  <main>
      <div class="header">
          <div class="login">
              <router-link to="/register">注册</router-link>
          </div>
      </div>
      <div class="container">
          <div class="content">
              <div class="title">
                  <i class="bi bi-box"></i>
                  <span class="logo">LinguaFlash</span>
              </div>
              <h1 class="login-info">登录</h1>
              <form id="login-form">
                  <div class="input-container">
                      <i class="bi bi-person"></i>
                      <input class="login-input" type="text" placeholder="用户名" id="username" v-model="username">
                      <p class="error"></p>
                  </div>
                  <div class="input-container">
                      <i class="bi bi-key"></i>
                      <input class="login-input" type="password" placeholder="密码" id="password" v-model="password">
                      <i class="eye bi distin bi-eye-slash"></i>
                      <!-- <i class="bi distin bi-eye"></i> -->
                      <p class="error"></p>
                  </div>
                  <div class="login-radio">
                      <input type="checkbox" id="autoLogin" checked ref="autoLogon"/><label for="autoLogin">自动登录</label>
                      <input type="checkbox" id="rememberMe" ref="rememberMe"/><label for="rememberMe">记住密码</label>
                      <a href="javascript:">忘记密码</a>
                  </div>
                  <p class="error-message" style="display: none;">用户名或密码有误</p>
                  <div class="footer-sub">
                      <input class="offinput" id="btnSubmit" @click.prevent="login" value="登录"/>
                  </div>
                  <div class="user-accounts" v-if="isRemeber === 'true' && this.rememberMeInfo">
                      <p>快速登录</p>
                      <div class="account">
                          <a href="javascript:" @click.prevent="quickLogin">
                              <div class="user-avatar">
                                  <img :src="imgUrl"/>
                              </div>
                              <div class="user-info">
                                  <div class="user-name">{{rememberMeInfo.username}}</div>
                                  <div class="user-email">{{rememberMeInfo.email}}</div>
                              </div>
                              <div class="user-data">
                                  <p>{{date}}</p>
                                  <p>{{time}}</p>
                              </div>
                          </a>
                      </div>
                  </div>
              </form>
          </div>
          <div class="turn"><router-link to="/register"><i class="bi bi-chevron-compact-right"></i></router-link></div>
      </div>
  </main>
</template>

<script>
  import {common} from '../../js/common'
  import {login} from '../../js/Login/login'
  import { Message } from 'element-ui';
  import { setIsRemember, getIsRemember, clearIsRemember } from '../../utils/isRemember'
  import { setPassWord, getPassWord, clearPassWord } from '../../utils/passWord'
  import { setRememberMeInfo, getRememberMeInfo, clearRememberMeInfo } from '../../utils/rememberMeInfo'

  export default {
    name:'Login',
    data() {
        return {
            username:'',
            password:''
        }
    },  
    mounted(){
      common(),
      login()
    },
    methods: {
        async login(){
            
            const {username, password} = this

            if(username && password){
                try{
                    await this.$store.dispatch("user/userLogin", {username, password})
                    Message({
                        type:'success',
                        message: '登录成功！',
                        customClass:'messageSuccess',
                        duration:2500
                    })
                    this.$router.push('/control')
                    // console.log(this.$refs.rememberMe.checked);
                    if(this.$refs.rememberMe.checked && this.$refs.rememberMe.checked === true){
                        this.$store.commit('user/ISREMEMBER')
                    }else{
                        clearIsRemember()
                        clearPassWord()
                        clearRememberMeInfo()
                    }
                    if(getIsRemember()){
                        const Base64 = require('js-base64').Base64
                        let passWord = Base64.encode(password)
                        // console.log(passWord);
                        setPassWord(passWord)
                    }
                } catch (error){
                    console.log(error);
                    Message({
                        type:'error',
                        message: '登录失败！用户名或密码错误',
                        customClass:'messageError',
                        duration:2500
                    })
                }
            }
        },
        async quickLogin(){
            const Base64 = require('js-base64').Base64
            const password = Base64.decode(this.passWord)
            try {
                await this.$store.dispatch("user/userLogin", {username:this.rememberMeInfo.username, password})
                Message({
                    type:'success',
                    message: '登录成功！',
                    customClass:'messageSuccess',
                    duration:2500
                })
                this.$router.push('/control')
            } catch (error) {
                console.log(error);
                Message({
                    type:'error',
                    message: '登录失败！用户名或密码错误',
                    customClass:'messageError',
                    duration:2500
                })
            }

        }
    },
    computed:{
        isRemeber(){
            return getIsRemember()
        },
        passWord(){
            return getPassWord()
        },
        rememberMeInfo(){
            if(getRememberMeInfo())
            return getRememberMeInfo()
        },
        date(){
            if(getRememberMeInfo())
            return getRememberMeInfo().date.split(' ')[0]
        },
        time(){
            if(getRememberMeInfo())
            return getRememberMeInfo().date.split(' ')[1]
        },
        imgUrl(){
            if(getRememberMeInfo())
            return getRememberMeInfo().user_pic
        }

    }
  }
</script>

<style>
.el-cancel{
    min-width: 120px !important
}

.otherCourser{
    min-width: 181px !important
}

.messageError{
    min-width: 254px !important;
}
.messageSuccess{
    min-width: 133px !important;
}
.collectSuccess{
    min-width: 153px !important;
}
* {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}

main{
    background-color: #fff;
    height: 100%;
}

a {
    text-decoration: none;
    color: #000;
}

body{
  background-color: #fff;
}

.header{
    height: 50px;
}

.header .login{
    float: right;
    line-height: 50px;
    margin-right: 10px;
}

.header .login a{
    color: #fff;
    font-size: 16px;
    padding: 6px 16px;
    background-color: #2c3143;
    border-radius: 8px;
    font-weight: normal;
}

.container{
    position: relative;
    height: 574px;
    margin: 0 auto;
}

.container .content{
    position: relative;
    width: 400px;
    height: 566px;
    margin: 0 auto;
}

.container .content .title{
    width: 100%;
    height: 94px;
    padding: 20px 0;
    text-align: center;
}

.container .content .title i {
    color: #000;
    font-size: 46px;
}

.container .content .title .logo{
    font-size: 26px;
    font-weight: 500;
    color: #000;
    font-family: "Nunito", sans-serif;
    margin-left: 20px;
    text-transform: uppercase;
}

.container .content .login-info{
    height: 30px;
    color: #2c3143;
    font-size: 24px;
    padding: 0 0 2.4px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;
}

.container .content .input-container{
    position: relative;
    height: 48px;
    margin: 20px 0;
    border-bottom: #b2b8cb 1px solid;
    line-height: 48px;
    user-select: none;
    transition: all 0.25s;
}

.container .content .input-container>i{
    font-size: 22px;
    margin: 0 10px;
}

.container .content .input-container>i:nth-of-type(2){
    margin: 0;
}

.container .content .input-container .bi-eye-slash {
    color: #b2b8cb;
}

.container .content .input-container .bi-eye {
    color: #000;
}

.container .content .input-container>input{
    width: 318px;
    height: 30px;
    outline: none;
    vertical-align: middle;
    margin-bottom: 6px;
    border: none;
    font-size: 19px;
}

.container .content .input-container .eye{
    cursor: pointer;
}

.container .content .input-container>p {
    position: absolute;
    top: 48px;
    left: 10px;
    font-size: 14px;
    color: #fe5c55;
    text-align: left;
    line-height: 1;
}

.container .content .login-radio {
    user-select: none;
    color: #9698a1;
} 

.container .content .login-radio > input {
    width: 15px;
    height: 14px;
    margin-right: 3px;
}

.container .content .login-radio > label{
    margin-right: 80px;
    position: relative;
    top: -1px;
    transition: all 0.18s;
}

.container .content .login-radio > a{
    text-decoration: underline;
    font-size: 16px;
    color: #626c91;
}

.container .content .error-message{
    position: absolute;
    left: 153px;
    bottom: 227px;
    color:#fe5c55;
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
}

.container .content .footer-sub{
    height: 88px;
    padding: 24px 0;
    text-align: center;
    line-height: 88px;
    margin-top: 10px;
}

.container .content .footer-sub > input {
    width: 100%;
    height: 40px;
    font-size: 16px;
    border-radius: 8px;
    padding: 0 1em;
    transition: all .25s;
    font-weight: 500;
    color: #fff;
}

.container .content .footer-sub .offinput{
    border: none;
    background-color: #9698a1;
    text-align: center;
}
.container .content .footer-sub .oninput{
    border: 1px solid #2c3143;
    background-color: #2c3143;
    cursor: pointer;
    text-align: center;
}

.container .content .footer-sub .oninput:hover {
    background-color: #3c435c;
}

.container .content .user-accounts{
    width: 100%;
    height: 100px;
    margin-top: 40px;
}

.container .content .user-accounts p{
    height: 20%;
    line-height: 20px;
    color: #626c91;
    font-size: 14px;
    margin-bottom: 10px;
}

.container .content .user-accounts .account{
    height: 80%;
    border-top: #d5dbe5 1px solid;
    border-bottom: #d5dbe5 1px solid;
    padding: 4px 0;
}

.container .content .user-accounts .account a{
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.25s;
}

.container .content .user-accounts .account a:hover{
    background-color: #eef0f4;
}

.container .content .user-accounts .account a .user-avatar{
    float: left;
    width: 11%;
    height: 100%;
    line-height: 80px;
    text-align: center;
}

.container .content .user-accounts .account a .user-avatar img{
    width: 100%;
}

.container .content .user-accounts .account a .user-info {
    float: left;
    width: 64%;
    height: 100%;
    margin-left: 18px;
}

.container .content .user-accounts .account a .user-info .user-name{
    font-size: 17px;
    color: #2c3143;
    font-weight: 500;
    margin-top: 6px;
}

.container .content .user-accounts .account a .user-info .user-email {
    font-size: .875rem;
    color: #626c91;
}

.container .content .user-accounts .account a .user-data {
    float: left;
    width: 20%;
    height: 100%;
    margin-top: 6px;
}

.container .content .user-accounts .account a .user-data > p{
    font-size: 10px;
    text-align: center;
    color: #9698a1;
}

.container .turn{
    position: absolute;
    left: 965px;
    top: 300px;
    width: 32px;
    height: 48px;
    font-size: 58px;
    text-align: center;
    line-height: 48px;
    font-weight: 100;
    transition: all 0.2s;
}

.container .turn:hover {
    left: 969px;
}

.container .turn a i{
    color: #626c91;
}
</style>