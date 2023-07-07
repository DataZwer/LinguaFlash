<template>
    <div class="user">
        <div class="user-title">帐户</div>
        <div class="user-main">
            <div class="user-sidebar">
                <div class="user-tabs">
                    <router-link to="/user/userinfo" class="user-tab" active-class="user-active" @click.native="height()">账户信息</router-link>
                    <router-link to="/user/editinfo" class="user-tab" active-class="user-active" @click.native="submit()">编辑信息</router-link>
                </div>
                <div class="user-btn">
                    <el-button class="user-button" @click="loginout">退出登录</el-button>
                </div>
            </div>
            <div class="user-content">
              
              <router-view></router-view>
             
            </div>
        </div>
    </div>
</template>

<script>
import {dropDown} from '../../../js/User/index'
import { Message } from 'element-ui';
import $ from "jquery"
export default {
  name:'User',
  methods: {
    height(){
      if($(".user-main").css("height") !== "510px"){
        $(".user-main").css("height", "510px");
      }
      // console.log(this.$route.path);
      if(this.$route.path === '/user/userinfo'){
        $(".user-info-sub").hide();
        $(".user-button").show();
      }
    },
    submit(){
      if(this.$route.path === '/user/editinfo'){
        $(".user-info-sub").show();
        $(".user-button").hide();
      }
    },
    loginout(){
				this.$confirm('此操作将退出登录, 是否继续?','提示',{
					confirmButtonText: '确定',
          			cancelButtonText: '取消',
					type:'warning',
					showClose:false
				}).then(() => {
					this.$store.commit('user/USERLOGOUT')
				  this.$router.push('/login');
				}).catch(() => {
					Message({
						type:'warning',
            message: '已取消',
            duration:2500,
						customClass:'el-cancel'
          })
				})
		},
  },
  
}
</script>

<style>
.user {
  width: 550px;
  height: 720px;
  margin: 0 auto;
  transform: translate(4%, -2%);
}

.user .user-title {
  margin: 32px 16px 24px;
  color: #2c3143;
  font-size: 22px;
}

.user .user-main {
  height: 510px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 2px 4px 8px 0 rgb(0 0 0 / 20%);
  overflow: hidden;
  transition: all 0.4s;
}

.user .user-main .user-sidebar {
  float: left;
  width: 28%;
  height: 100%;
  background-color: #eef0f4;
}

.user .user-main .user-sidebar .user-tabs {
  width: 100%;
  height: 87.5%;
}

.user .user-main .user-sidebar .user-tabs a {
  display: block;
  color: #626c91;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  line-height: 50px;
  border-bottom: 1px solid #d5dbe5;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}

.user .user-main .user-sidebar .user-tabs a:hover {
  background-color: #fff;
}

.user .user-main .user-sidebar .user-tabs a.user-active {
  background-color: #fff;
}

.user .user-main .user-sidebar .user-tabs a:nth-of-type(1) {
  border-top-left-radius: 8px;
}

.user .user-main .user-sidebar .user-btn {
  width: 100%;
  height: 12.5%;
  padding: 16px;
}

.user .user-main .user-sidebar .user-btn .user-button {
  width: 100%;
  height: 32px;
  text-align: center;
  line-height: 7px;
  background-color: transparent;
  color: #2c3143;
  outline: none;
  border: 1px solid #2c3143;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.user .user-main .user-sidebar .user-btn .user-button:hover {
  background-color: #2c3143;
  color: #fff;
}

.user .user-main .user-content {
  float: left;
  width: 72%;
}

.user .user-main .user-content {
  float: left;
  width: 72%;
  padding: 0 16px;
}

.user .user-main .user-content .user-infomation {
  width: 100%;
  height: 100%;
}

.user .user-main .user-content .user-infomation ul li {
  width: 100%;
  height: 90px;
  margin: 10px 0;
}

.user .user-main .user-content .user-infomation ul li:first-child{
  border-bottom: none;
}

.user .user-main .user-content .user-infomation ul li:last-child {
  border-bottom: none;
}

.user .user-main .user-content .user-infomation ul li .info-til {
  width: 100%;
  height: 45px;
  line-height: 45px;
  color: #000;
  font-weight: 500;
  font-size: 16px;
}

.user .user-main .user-content .user-infomation ul li .info-bod {
  width: 100%;
  height: 45px;
  line-height: 45px;
  color: #2c3143;
  font-weight: 500;
  font-size: 18px;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child {
  width: 100%;
  height: 180px;
  margin: 10px 0;
  border-bottom: #e5e5e5 1px solid;
}

.user .user-main .user-content .user-baseinfo ul > li > .info-til {
  width: 100%;
  height: 35px;
  line-height: 35px;
  color: #000;
  font-weight: 500;
  font-size: 14px;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child > .baseinfo-left{
  float: left;
  width: 34%;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-left > img{
  max-width: 100px;
  max-height: 100px;
  border-radius: 50%;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-left > a{
  position: relative;
  display: block;
  width: 50%;
  height: 22px;
  margin: 2px 0 0 18px;
  background-color: transparent;
  color: #2c3143;
  border: 1px solid #2c3143;
  line-height: 21px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s;
  font-size: 12px;
  text-align: center;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-left>a:hover {
  
  background-color: #2c3143;
  color: #fff;
}

.user .user-main .user-content .user-baseinfo ul>li:first-child>.baseinfo-left> .file>input {
  position: absolute;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right {
  position: relative;
  float: left;
  width: 66%;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right>div{
  margin-bottom: 8px;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-name{
  font-size: 18px;
  font-weight: 600;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-name > i {
  font-size: 16px;
  margin-left: 5px;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-name> .bi-gender-male {
  color: #24acf2;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-name>.bi-gender-female {
  color: #fd617b;
}

.user .user-main .user-content .user-baseinfo ul>li:first-child>.baseinfo-right .baseinfo-account {
  font-size: 12px;
  font-weight: 400;
  color: #7b7474;
}

.user .user-main .user-content .user-baseinfo ul>li:first-child>.baseinfo-right .baseinfo-account > i{
  margin-right: 10px;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-email {
  font-size: 12px;
  font-weight: 400;
  color: #7b7474;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-email > i{
  margin-right: 10px;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-time {
  font-size: 12px;
  font-weight: 400;
  color: #7b7474;
}

.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-time > i{
  margin-right: 10px;
}
.user .user-main .user-content .user-baseinfo ul > li:first-child>.baseinfo-right .baseinfo-introduction {
  position: absolute;
  font-size: 12px;
  font-weight: 400;
  color: #7b7474;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data > div{
  float: left;
  width: 48%;
  height: 50px;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data>div a {
  display: block;
  width: 100%;
  height: 100%;
  border: #e5e5e5 2px solid;
  border-radius: 10px;
  transition: all 0.25s;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data>.difficult-word {
  margin-right: 4%;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data>.learned-word {
  margin-right: 0;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data>.difficult-word a:hover{
  box-shadow: rgba(175, 175, 175,.4) 0px 0px 10px 1px;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data>.difficult-word a > i{
  float: left;
  color: #faaa5a;
  font-size: 20px;
  line-height: 44px;
  margin: 0 10px;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data>.difficult-word a > .difficult-left {
  float: left;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data>.difficult-word a > .difficult-left >div{
  margin-top: 6px;
  font-size: 16px;
  font-weight: 700;
  color: #000;
}

.user .user-main .user-content .user-baseinfo ul > li>.info-data>.difficult-word a > .difficult-left>p {
  font-size: 12px;
  color: #afafaf;
}

.user .user-main .user-content .user-baseinfo ul>li:nth-child(3){
  height: 100px;
}

.user .user-main .user-content .user-baseinfo ul > li>.bought-course {
  width: 100%;
  max-height: 164px;
  border-radius: 10px;
  border: #e5e5e5 2px solid;
  overflow-y: auto;
  overflow-x: hidden;
}

.user .user-main .user-content .user-baseinfo ul>li>.bought-course::-webkit-scrollbar {
  width: 6px; 
  height: 6px; 
  border-radius: 8px; 
  background-color: rgba(255, 255, 255, 0.1); 
}

/*定义滚动条轨道 内阴影+圆角*/
.user .user-main .user-content .user-baseinfo ul>li>.bought-course::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5); 
  border-radius: 8px; 
  background-color: #f5f5f5;  
}

/*定义滑块 内阴影+圆角*/
.user .user-main .user-content .user-baseinfo ul>li>.bought-course::-webkit-scrollbar-thumb {
  border-radius: 8px; 
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5); 
  background-color: #c8c8c8; 
}

.user .user-main .user-content .user-baseinfo ul > li>.bought-course > .info-course{
  height: 40px;
  border-bottom: #e5e5e5 1px solid;
}

.user .user-main .user-content .user-baseinfo ul>li>.bought-course>div:last-child {
  border-bottom: 0;
}

.user .user-main .user-content .user-baseinfo ul>li>.bought-course>.info-course div {
  float: left;
}

.user .user-main .user-content .user-baseinfo ul>li>.bought-course>.info-course .course-iconLeft{
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #000;
  margin: 0 10px;
}

.user .user-main .user-content .user-baseinfo ul>li>.bought-course>.info-course .course-inforRight p.course-inforPtil {
  font-size: 14px;
  margin-top: 2px;
  color: #000;
}

.user .user-main .user-content .user-baseinfo ul>li>.bought-course>.info-course .course-inforRight p.course-inforPtro {
  font-size: 12px;
  color: #7b7474;
}

.user .user-main .user-content .user-edit ul li {
  position: relative;
}

.user .user-main .user-content .user-edit ul li .info-bod {
  border-bottom: 1px solid #2c3143;
}

.user .user-main .user-content .user-edit ul li .info-bod i {
  transition: all 0.2s;
}

.user .user-main .user-content .user-edit ul li .info-bod i.active-icon {
  color: #4154f1;
}

.user .user-main .user-content .user-edit ul li .info-bod i {
  font-size: 22px;
}
.user
  .user-main
  .user-content
  .user-edit
  ul
  li
  .info-bod
  i.bi-gender-male {
  color: #24acf2;
}
.user
  .user-main
  .user-content
  .user-edit
  ul
  li
  .info-bod
  i.bi-gender-female {
  color: rgb(253, 97, 123);
}
.user .user-main .user-content .user-edit ul li .info-bod span {
  margin-left: 20px;
}

.user .user-main .user-content .user-edit ul li .edit-message{
  position: absolute;
  top: 89px;
  left: 0px;
  color: red;
  font-size: 12px;
}

.user .user-main .user-content .user-edit ul {
  position: relative;
}

.user .user-main .user-content .user-edit ul li .info-bod .edit-input {
  width: 260px;
  height: 30px;
  margin-left: 20px;
  outline: none;
  vertical-align: middle;
  margin-bottom: 6px;
  border: none;
  font-size: 19px;
}

.user .user-main .user-content .user-edit ul li .info-bod .email-span {
  color: red;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li
  .info-bod
  i.bi-gender-male {
  color: #24acf2;
}
.user
  .user-main
  .user-content
  .user-edit
  ul
  li
  .info-bod
  i.bi-gender-female {
  color: rgb(253, 97, 123);
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:nth-child(3)
  .info-bod
  i.edit-gender {
  color: #2c3143;
}

.user .user-main .user-content .user-edit ul li:nth-child(3) #gender{
  user-select: none;
}

.user .user-main .user-content .user-edit ul li #gender input {
  margin-right: 50px;
  cursor: pointer;
}

.user .user-main .user-content .user-edit ul li #gender .gender {
  margin: 0 6px;
  user-select: none;
}

.user .user-main .user-content .user-edit ul li #gender .gender label {
  cursor: pointer;
}

/*  */
.user-info-sub {
  position: absolute;
  top: 452px;
  left: -154px;
  width: 33.5%;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: transparent;
  color: #2c3143;
  outline: none;
  border: 1px solid #2c3143;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.user-info-sub:hover {
  background-color: #2c3143;
  color: #fff;
}
/*  */

.user .user-main .user-content .user-edit ul li:last-child a {
  display: block;
  width: 100%;
  height: 70px;
  border-radius: 10px;
}
.user .user-main .user-content .user-edit ul li:last-child a .password-main {
  float: left;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  a
  .password-main
  p:nth-child(1) {
  font-size: 16px;
  color: #000;
  margin-top: 15px;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  a
  .password-main
  p:nth-child(2) {
  font-size: 12px;
  color: #626c91;
}

.user .user-main .user-content .user-edit ul li:last-child a .password-arrow {
  float: right;
  line-height: 70px;
}

.user .user-main .user-content .user-edit ul li:last-child a .password-arrow i {
  transition: all 0.4s;
}

.user .user-main .user-content .user-edit ul li:last-child .password-creator {
  width: 100%;
  height: 170px;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-before {
  height: 48px;
  border-bottom: 1px solid #2c3143;
  line-height: 48px;
  margin-bottom: 10px;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-before
  i:nth-of-type(1) {
  font-size: 22px;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-before
  i:nth-of-type(2) {
  float: right;
  font-size: 15px;
  margin-right: 10px;
  cursor: pointer;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-before
  i:nth-of-type(3) {
  float: right;
  font-size: 15px;
  margin-right: 10px;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-before
  .password-input {
  width: 250px;
  height: 30px;
  margin-left: 15px;
  outline: none;
  vertical-align: middle;
  margin-bottom: 6px;
  border: none;
}
.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-before
  i.bi-exclamation-lg {
  color: red;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-before
  i.bi-check-lg {
  color: green;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-btn {
  position: relative;
  width: 100%;
  height: 52px;
  padding: 6px 0;
}
.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-btn
  span {
  position: absolute;
  top: 6px;
  left: 0;
  color: red;
  font-size: 12px;
}

.user
  .user-main
  .user-content
  .user-edit
  ul
  li:last-child
  .password-creator
  .password-btn
  .password-save {
  float: right;
  width: auto;
  height: 36px;
  line-height: 22px;
  text-align: center;
  padding: 8px;
  opacity: 0.5;
  cursor: not-allowed;
  font-size: 1rem;
  border: 1px solid #2c3143;
  border-radius: 8px;
  transition: all 0.25s;
  font-weight: 500;
  color: #fff;
  background-color: #2c3143;
}

</style>