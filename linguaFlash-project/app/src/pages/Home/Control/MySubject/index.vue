<template>
    <div class="active-variations">
        <h2>激活课程<span class="count">{{length}}</span></h2>
        <ul class="list" >
            <li class="variation" v-for="Mysubjects in userSubjects" :key="Mysubjects.id">
                <div class="variation-icon" @click="open(Mysubjects)"><i class="bi bi-grid"></i></div>
                <div class="variation-name" @click="open(Mysubjects)">{{Mysubjects.name}}</div>
                <div class="variation-delete"><a @click.prevent="deleteSubject(Mysubjects.id)"><i class="bi bi-x-lg"></i></a></div>
                <div class="variation-status">
                    <el-switch
                        @change="handleShowStatusChange(Mysubjects.id)"
                        :active-value="1"
                        :inactive-value="0"
                        
                        >
                    </el-switch>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {unScroll} from '../../../../js/ForMod/index'
// import $ from "jquery"
import {mapState} from 'vuex'
export default {
    name:'MySubject',
    methods: {
        open(Mysubjects){
            this.$store.state.home.SubModFlag = true;
            let oldforeign = this.$store.state.home.allForeigns;
            let newforeign = oldforeign.filter(function(value, index){
                return value.id === Mysubjects.category
            })
            if(newforeign[0]){
                Mysubjects.category = newforeign[0].name
            }
            if(!Mysubjects.Activated){
                Mysubjects.Activated = true
            }
            // console.log(Mysubjects);
			this.$store.commit('home/GETSUBMODINFO',Mysubjects)
            unScroll();
        },
        deleteSubject(id){
            this.$confirm('是否确定永久删除该课程?','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'warning',
            showClose:false
          }).then(async () => {
            try {
              await this.$store.dispatch('home/DeleteUserSubject',{id});
              this.$message({
                  type:'success',
                  message: '删除成功！',
                  customClass:'messageSuccess',
                  duration:2500
              })
              this.$store.dispatch('home/GetUserSubjects');

            } catch (error) {
              this.$message({
                  type:'error',
                  message: '删除失败！'+error,
                  customClass:'messageSuccess',
                  duration:2500
              })
            }
          }).catch(() => {
            this.$message({
              type:'warning',
              message: '已取消',
              duration:2500,
			  customClass:'el-cancel'
            })
          })
        }
    },
    computed:{
		...mapState('home',['userSubjects']),
        length(){
            return this.userSubjects.length
        }
	},
}
</script>

<style>

</style>