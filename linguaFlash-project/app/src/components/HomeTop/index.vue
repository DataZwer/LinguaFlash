<template>
  <div class="top">
        <div class="logo">
            <a href="javascript:" title="个人信息" id="user-intro">
                <img :src='"http://localhost:3008/api/"+userInfo.user_pic' />
                <span>{{userInfo.nickname}}</span>
                <i class="bi bi-caret-right-fill"></i>
            </a>
            <ul class="dropdown-menu" style="display: none;">
                <li class="dropdown-header">
                    <p class="dropdown-name">{{userInfo.nickname}}</p>
                    <p class="dropdown-intro">{{userInfo.introduce}}</p>
                </li>
                <li><router-link to="/user/userinfo"><i class="bi bi-person"></i>我的个人资料</router-link></li>
                <li><router-link to="/user/editinfo"><i class="bi bi-gear"></i>个人信息设置</router-link></li>
                <li><a href="#"><i class="bi bi-question-circle"></i>帮助中心</a></li>
                <li><el-button href="#" @click="loginout" class="el-loginout"><i class="bi bi-box-arrow-right"></i>退出登录</el-button></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import {mapState} from 'vuex'
import {userinfo} from '../../js/HomeTop/index'
import jwtDecode from 'jwt-decode'
import { setIsRemember, getIsRemember, clearIsRemember } from '../../utils/isRemember'
	export default {
		name: 'HomeTop',
		mounted(){
			userinfo()
		},
		computed:{
			...mapState('user',['userInfo'])
		},
		methods: {
			// myinfo(){
			// 	this.$router.push({
			// 		path:'/user/userinfo'
			// 	})
			// },
			loginout(){
				this.$confirm('此操作将退出登录, 是否继续?','提示',{
					confirmButtonText: '确定',
          			cancelButtonText: '取消',
					type:'warning',
					showClose:false
				}).then(async() => {
					// console.log(this.$store.state.user.token);
					if(getIsRemember()){
						const decode =  jwtDecode(this.$store.state.user.token);
						// console.log(decode);
						await this.$store.commit('user/QUICKLOGININFO',{
							username:decode.username,
							nickname:decode.nickname,
							email:decode.email,
							date:decode.date,
							user_pic:"http://localhost:3008/api/"+this.userInfo.user_pic,
						})

					}
					
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

<style scoped>
.el-loginout{
	border: none;
	background-color: transparent;
	outline: none;
	display: block;
	width: 100%;
	height: 100%;
	line-height: 10px;
	border-radius: 8px;
	transition: all 0.25s;
	text-align: left;
	font-size: 14px;   
	padding: 0;
	color: #000;
}

.el-loginout:hover{
	background-color: #eef0f4;
	color: #000;
}

.el-loginout i {
	font-size: 16px;
	margin: 0 10px;
}

.top{
	height: 50px;
	width: 100%;
}

.top .logo{
	position: relative;
	float: right;
	/* width: 50px; */
	height: 50px;
	text-align: center;
	line-height: 50px;
}

.top .logo > a{
	display: block;
	width: 150px;
	height: 50px;
	color: #2c3143;
	transition: all 0.25s;
}

.top .logo > a:hover{
	color: #565a69;
}

.top .logo a > img{
	max-height: 36px;
	border-radius: 50%;
	vertical-align: middle
}

.top .logo a > span {
	font-size: 14px;
	font-weight: 600;
	margin-left: 5px;
}

.top .logo a > i{
	font-size: 12px;
}

.top .logo .dropdown-menu{ 
	position: absolute;
	top: 50px;
	left: -72px;
	width: 220px;
	height: 242px;
	padding-top: 10px;
	background-color: #fff;
	border: 2px solid #d5dbe5;
	border-radius: 8px;
	z-index: 999;
	box-shadow: 0 5px 30px 0 rgb(82 63 105 / 20%);
}

.top .logo .dropdown-menu::before {
	content: "";
	width: 13px;
	height: 13px;
	background: #fff;
	position: absolute;
	top: -7px;
	right: 20px;
	transform: rotate(45deg);
	border-top: 1px solid #d5dbe5;
	border-left: 1px solid #d5dbe5;
}

.top .logo .dropdown-menu .dropdown-header{
	height: 64px;
	text-align: center;
	font-size: 15px;
	padding: 10px 25px;
	line-height: 20px;
}

.top .logo .dropdown-menu .dropdown-header .dropdown-name{
	font-size: 18px;
	margin-bottom: 0;
	font-weight: 600;
	color: #2c3143;
}

.top .logo .dropdown-menu .dropdown-header .dropdown-intro {
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #6c757d;
}

.top .logo .dropdown-menu > li{
	height: 41px;
	padding: 4px 8px;
	border-bottom: 1px solid #d5dbe5;
}

.top .logo .dropdown-menu li:last-child{
	border-bottom: none;
}

.top .logo .dropdown-menu li a{
	display: block;
	width: 100%;
	height: 100%;
	line-height: 33px;
	border-radius: 8px;
	transition: all 0.25s;
	text-align: left;
	font-size: 14px;
}

.top .logo .dropdown-menu li a:hover{
	background-color: #eef0f4;
}

.top .logo .dropdown-menu li a i {
	font-size: 16px;
	margin: 0 10px;
}
</style>