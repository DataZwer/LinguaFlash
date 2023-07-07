<template>
    <div class="user-infomation user-baseinfo">
        <ul>
            <li>
                <!-- http://localhost:3008/api/avatar.jpg -->
                <div class="info-til">基本信息</div>
                <div class="baseinfo-left">
                    <img :src='"http://localhost:3008/api/"+userInfo.user_pic' />
                    <a href="javascript:" class="file"><input type="file" @change="uploadImg($event)" name="avatar"/>更换头像</a>
                    <!-- <a href="" class="file"><input type="file"/>上传头像</a> -->
                </div>
                <div class="baseinfo-right">
                    <div class="baseinfo-name">
                        <span>{{userInfo.nickname}}</span><i class="bi bi-gender-male" v-show="userInfo.gender == '男'"></i>
                        <i class="bi bi-gender-female" v-show="userInfo.gender == '女'"></i>
                    </div>
                    <div class="baseinfo-account">
                        <i class="bi bi-person-fill"></i><span>{{userInfo.username}}</span>
                    </div>
                    <div class="baseinfo-email">
                        <i class="bi bi-envelope-fill"></i><span>{{userInfo.email}}</span>
                    </div>
                    <div class="baseinfo-time">
                        <i class="bi bi-clock-fill"></i><span>{{userInfo.register_date}}</span><strong>加入</strong>
                    </div>
                    <div class="baseinfo-introduction">
                        <strong>简介:</strong><span>{{userInfo.introduce}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="info-til">数据统计</div>
                <div class="info-data">
                    <div class="difficult-word">
                        <router-link to="/word/collect">
                            <i class="bi bi-star-fill"></i>
                            <div class="difficult-left">
                                <div>{{userInfo.collect_words}}</div>
                                <p>重难点单词</p>
                            </div>
                        </router-link>
                    </div>
                    <div class="difficult-word learned-word">
                        <router-link to="/word/learn">
                            <i class="bi bi-tags-fill"></i>
                            <div class="difficult-left">
                                <div>{{userInfo.learned_words}}</div>
                                <p>已学会的单词</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </li>
            <li>
                <div class="info-til">已购课程&nbsp;{{length}}</div>
                <div class="bought-course"  v-loading="loading">
                    <div class="info-course" v-for="Mysubjects in userSubjects" :key="Mysubjects.id">
                        <div class="course-iconLeft"><i class="bi bi-grid"></i></div>
                        <div class="course-inforRight">
                            <p class="course-inforPtil">{{Mysubjects.name}}</p>
                            <p class="course-inforPtro">{{Mysubjects.description}}</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import reqavatar from '../../../../api/avatar'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            loading:true
        }
    },
    computed:{
		...mapState('user',['userInfo']),
        ...mapState('home',['userSubjects']),
        length(){
            return this.userSubjects.length
        }
	},
    methods: {
        async uploadImg(event){
            const that = this;
            
            let file = event.target.files[0]
            // let reader = new FileReader()
            let avatar = new FormData()

            avatar.append('file', file)

            try {
                reqavatar.post('my/update/avatar', avatar,{
                headers: { 'Content-Type': 'multipart/form-data' }
                }).then(res => {
                    // console.log(res.path);
                    that.$message({
                        type:'success',
                        message: '上传成功！',
                        customClass:'messageSuccess',
                        duration:2500
                    })
                    that.$store.dispatch('user/getUserInfo');
                })
            } catch (error) {
                that.$message({
                    type:'error',
                    message: '上传失败！'+error,
                    customClass:'messageSuccess',
                    duration:2500
                })
            }
            
        }
    },
    async mounted() {
        try {
            await this.$store.dispatch('home/GetUserSubjects');
            this.loading = false
        } catch (error) {
            
        }
    },
}
</script>

<style>

</style>