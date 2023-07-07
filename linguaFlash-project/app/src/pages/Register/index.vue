<template>
  <main>
      <div class="header">
          <div class="login">
              <router-link to="/login">登录</router-link>
          </div>
      </div>
      <div class="container">
          <div class="turn"><router-link to="/login"><i class="bi bi-chevron-compact-left"></i></router-link></div>
          <div class="content">
              <div class="title">
                  <i class="bi bi-box"></i>
                  <span class="logo">LinguaFlash</span>
              </div>
              <h1 class="login-info">注册</h1>
              <form id="login-form">
                  <div class="input-container">
                      <i class="bi bi-person"></i>
                      <input class="login-input" type="text" placeholder="用户名" id="username" v-model="username" name="username" v-validate="{ required: true, regex: /^\w{3,16}$/ }">
                      <p class="error"></p>
                  </div>
                  <div class="input-container">
                      <i class="bi bi-envelope"></i>
                      <input class="login-input" type="text" placeholder="电子邮箱" id="email" v-model="email" name="email" v-validate="{ required: true, regex: /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/ }">
                      <p class="error"></p>
                  </div>
                  <div class="input-container">
                      <i class="bi bi-key"></i>
                      <input class="login-input" type="password" placeholder="密码" id="password" v-model="password" name="password" v-validate="{ required: true, regex: /^[\w!-@#$%^&*]{6,16}$/ }">
                      <i class="eye bi distin bi-eye-slash"></i>
                      <!-- <i class="bi distin bi-eye"></i> -->
                      <p class="error"></p>
                  </div>
                  <div class="input-container">
                      <i class="bi bi-key"></i>
                      <input class="login-input" type="password" placeholder="重复密码" id="rePassword" v-model="Repassword" name="rePassword" v-validate="{ required: true, is:password}">
                      <i class="eye bi distin bi-eye-slash"></i>
                      <!-- <i class="bi distin bi-eye"></i> -->
                      <p class="error"></p>
                  </div>
                  <div class="login-radio">
                      <input type="checkbox" id="allow" name="allow" v-validate="{ required: true,'allow':true}" :class="{ invalid: errorBags.has('allow') }"/><label for="allow">同意LinguaFlash的 <a href="javascript:">服务条款</a> 及 <a href="javascript:">隐私政策</a></label>
                      <p>{{ errorBags.first("allow") }}</p>
                  </div>
                  <div class="footer-sub">
                      <input @click="Register" class="offinput" id="btnSubmit" value="注册"/>
                  </div>
                  
              </form>
          </div>
          
      </div>
  </main>
</template>

<script>
  import { Message } from 'element-ui';
  import {common} from '../../js/common'
  import {register} from '../../js/Register/register'
  export default {
    name:'Register',
    data() {
        return {
            username:'',
            email:'',
            password:'',
            Repassword:''
        }
    },      
    mounted(){
      common(),
      register()
    },
    methods: {
        async Register(){
            const success = await this.$validator.validateAll();
            // console.log(success);
            if(success){
                const {username,email,password,Repassword} = this;
                // console.log(username);
                try {
                    //注册成功
                    await this.$store.dispatch('user/userRegister',{username,password,email});
                    Message({
                        type:'success',
                        message: '注册成功！',
                        customClass:'messageSuccess',
                        duration:2500
                    })
                    //跳转到登录页面
                    this.$router.push('/login');
                } catch (error) {
                    //注册失败
                    Message({
                        type:'error',
                        message: '注册失败！'+error,
                        customClass:'messageError',
                        duration:2500
                    })
                    
                }
            }
        }
    },
  }
</script>

<style scoped>
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

.header {
    height: 50px;
}

.header .login {
    float: right;
    line-height: 50px;
    margin-right: 10px;
}

.header .login a {
    color: #fff;
    font-size: 16px;
    padding: 6px 16px;
    background-color: #2c3143;
    border-radius: 8px;
    font-weight: normal;
}

.container {
    position: relative;
    height: 574px;
    margin: 0 auto;
}

.container .turn {
    position: absolute;
    left: 500px;
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
    left: 496px;
}

.container .turn a i {
    color: #626c91;
}

.container .content {
    position: relative;
    width: 400px;
    height: 566px;
    margin: 0 auto;
}

.container .content .title {
    width: 100%;
    height: 94px;
    padding: 20px 0;
    text-align: center;
}

.container .content .title i {
    color: #000;
    font-size: 46px;
}

.container .content .title .logo {
    font-size: 26px;
    font-weight: 500;
    color: #000;
    font-family: "Nunito", sans-serif;
    margin-left: 20px;
    text-transform: uppercase;
}

.container .content .login-info {
    height: 30px;
    color: #2c3143;
    font-size: 24px;
    padding: 0 0 2.4px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;
}

.container .content .input-container {
    position: relative;
    height: 48px;
    margin: 20px 0;
    border-bottom: #b2b8cb 1px solid;
    line-height: 48px;
    user-select: none;
    transition: all 0.25s;
}

.container .content .input-container>i {
    font-size: 22px;
    margin: 0 10px;
}

.container .content .input-container>i:nth-of-type(2) {
    margin: 0;
}

.container .content .input-container .bi-eye-slash {
    color: #b2b8cb;
}

.container .content .input-container .bi-eye {
    color: #000;
}

.container .content .input-container>input {
    width: 318px;
    height: 30px;
    outline: none;
    vertical-align: middle;
    margin-bottom: 6px;
    border: none;
    font-size: 19px;
}

.container .content .input-container .eye {
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
    position: relative;
    user-select: none;
    color: #9698a1;
}

.container .content .login-radio>input {
    width: 15px;
    height: 14px;
    margin-right: 3px;
}

.container .content .login-radio>label {
    margin-right: 80px;
    position: relative;
    top: -1px;
    transition: all 0.18s;
}

.container .content .login-radio label > a {
    text-decoration: underline;
    font-size: 16px;
    color: #626c91;
}

.container .content .login-radio > p{
    position: absolute;
    left: 2px;
    top: 16px;
    color: #fe5c55;
    font-size: 14px;
}

.container .content .footer-sub {
    height: 88px;
    padding: 24px 0;
    text-align: center;
    line-height: 88px;
    margin-top: 10px;
}

.container .content .footer-sub>input {
    width: 100%;
    height: 40px;
    font-size: 16px;
    border-radius: 8px;
    padding: 0 1em;
    transition: all .25s;
    font-weight: 500;
    color: #fff;
}

.container .content .footer-sub .offinput {
    border: none;
    text-align: center;
    background-color: #9698a1;
}

.container .content .footer-sub .oninput {
    border: 1px solid #2c3143;
    background-color: #2c3143;
    cursor: pointer;
    text-align: center;
}

.container .content .footer-sub .oninput:hover {
    background-color: #3c435c;
}
</style>