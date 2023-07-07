<template>
    <div class="course-modal" id="modai2">
        <div class="course-modal-window">
            <i class="bi bi-grid myclass"></i>
            <h2 class="title">{{SubModInfo.name}}<i class="bi bi-x-lg" @click="close()"></i></h2>
            <div class="content">
                <div class="content-text">
                    <p>{{SubModInfo.description}}</p>
                    <p>本课程包含<em>{{SubModInfo.number}}</em>个单词。</p>
                    <p class="message" v-show="!SubModInfo.Activated">立刻试用，解锁当前主题，还有更多课程等着你。</p>
                    <p class="message" v-show="SubModInfo.Activated">已解锁当前主题课程，立即开始学习享用吧！</p>
                    <div class="price">
                        <span class="totalPrice">￥{{SubModInfo.price}}</span>
                        <span class="textPeriod" v-show="!SubModInfo.Activated">/ 一次支付，永久使用</span>
                        <span class="textPeriod" v-show="SubModInfo.Activated">/ 你已有该课程的永久使用权</span>
                    </div>
                    <div class="category">当前课程语言为<span>{{SubModInfo.category}}</span></div>
                    <div class="rate">
                      <div class="level">评分：</div>
                      <el-rate
                      v-model="SubModInfo.level"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                      :max=5
                      :colors="colors">
                      </el-rate>
                    </div>
                </div>
                <div class="content-buttons">
                    <button v-if="!SubModInfo.Activated" class="button-component" @click="buyCourse(SubModInfo.id)">立即购买</button>
                    <button v-else class="button-component activated">已购买</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {removeUnScroll} from '../../js/ForMod/index'
export default {
    name:'SubMod',
    data() {
      return {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'] 
      }
    },
    methods: {
        close(){
            this.$store.state.home.SubModFlag = false;
            removeUnScroll();
        },
        async buyCourse(id){

          this.$confirm('是否确定购买该课程?','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'warning',
            showClose:false
          }).then(async () => {
            try {
              await this.$store.dispatch('home/AddUserSubject',{id});
              this.$message({
                  type:'success',
                  message: '购买成功！',
                  customClass:'messageSuccess',
                  duration:2500
              })
              this.$store.dispatch('home/GetUserSubjects');
              this.close()

            } catch (error) {
              this.$message({
                  type:'error',
                  message: '购买失败！'+error,
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
          // console.log(id);
        }
    },
    computed:{
		  ...mapState('home',['SubModInfo'])
	  },
    mounted() {
      // console.log(this.$store.state.home.SubModInfo.category);
      // console.log(this.$store.state.home.allForeigns);
    },
}
</script>

<style scoped>
.course-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(43, 81, 142, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.course-modal .course-modal-window {
  position: relative;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
  border-radius: 12px;
  min-width: 500px;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  max-width: 40vw;
  box-sizing: border-box;
  padding: 24px;
}
.course-modal .course-modal-window .myclass {
  position: absolute;
  left: 16px;
  top: 16px;
  width: 40px;
  height: 40px;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
}
.course-modal .course-modal-window h2 {
  font-size: 22px;
  font-weight: 500;
}

.course-modal .course-modal-window h2 i {
  float: right;
  cursor: pointer;
}
.course-modal .course-modal-window > .title {
  text-align: center;
}

.course-modal .course-modal-window .content {
  margin-top: 24px;
}
.course-modal .course-modal-window .content .content-text p {
  margin-bottom: 10px;
}

.course-modal .course-modal-window .content .content-text p em {
  font-style: normal;
  color: #626c91;
}
.course-modal .course-modal-window .content .content-text > .rate{
  margin-bottom: 10px;
}

.course-modal .course-modal-window .content .content-text > .rate .level{
  float: left;
  line-height: 20px;
}

.course-modal .course-modal-window .content .content-text .message {
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 8px;
}

.course-modal .course-modal-window .content .content-text .price {
  width: 100%;
  height: 42px;
}
.course-modal .course-modal-window .content .content-text .price .totalPrice {
  font-size: 32px;
  color: #2c3143;
}
.course-modal .course-modal-window .content .content-text .price .textPeriod {
  color: #626c91;
  font-size: 16px;
}
.course-modal .course-modal-window .content .content-text .category {
  margin: 12px 0;
}
.course-modal .course-modal-window .content .content-text .category span {
  color: #4154f1;
}

.course-modal .course-modal-window .content .content-buttons {
  margin-top: 16px;
  display: flex;
}
.course-modal .course-modal-window .content .content-buttons .button-component {
  margin-left: 0;
  color: #fff;
  border-color: #2c3143;
  background-color: #2c3143;
  display: flex;
  height: unset;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 1px solid #2c3143;
  border-radius: 10px;
  user-select: none;
  outline: none;
  cursor: pointer;
  transition: all 0.25s;
}

.course-modal .course-modal-window .content .content-buttons .activated{
  background-color: #565a69;
  cursor:default
}
.course-modal
  .course-modal-window
  .content
  .content-buttons
  .button-component:hover {
  background-color: #565a69;
}
</style>