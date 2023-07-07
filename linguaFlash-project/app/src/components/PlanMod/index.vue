<template>
  <div class="plan-modal" style="display: none" id="modai1">
    <div class="plan-modal-window">
      <h2>修改计划<i class="bi bi-x-lg" @click="close()"></i></h2>
      <div class="plan-inputNum">
        <span class="plan-inputNum-label">计划完成单词数</span>
        <el-input-number
          class="inputNumber"
          v-model="planComplete"
          :min="5"
          :max="50"
          :step="5"
          :step-strictly="true"
          :size="'small'"
          label="计划完成单词数"
        ></el-input-number>
      </div>
      <div class="plan-modal-btn">
        <input type="submit" value="确定" @click.prevent="sureUpdatePlan" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { removeUnScroll } from "../../js/ForMod/index";
export default {
  name: "PlanMod",
  data() {
    return {
      planComplete:0
    };
  },
  methods: {
    close() {
      this.$store.state.home.PlanModFlag = false;
      removeUnScroll();
    },
    async sureUpdatePlan() {
      if (this.planComplete == this.userPlan[0].plan_complete) {
        this.$message({
          message: "学习计划与原来相同！",
          type: "error",
          customClass: "otherCourser",
        });
      } else {
        try {
          await this.$store.dispatch("home/UpdateUserPlan", {
            complete: this.planComplete,
          });
          this.$message({
            message: "修改学习计划成功！",
            type: "success",
            customClass: "otherCourser",
          });
          await this.$store.dispatch("home/GetUserPlan");
          this.close()
        } catch (error) {
          this.$message({
            message: "修改学习计划失败！",
            type: "error",
            customClass: "otherCourser",
          });
        }
      }
    },
    
  },
  async mounted() {
    
  },
  computed: {
    ...mapState('home',['userPlan','PlanModFlag']),
  },
  watch: {
    PlanModFlag(newvalue){
      if(newvalue) {
        this.planComplete = this.userPlan[0].plan_complete
      }
    }
  }
};
</script>

<style scoped>
.plan-modal {
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
.plan-modal .plan-modal-window {
  position: relative;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
  border-radius: 12px;
  min-width: 500px;
  min-height: 215px;
  display: flex;
  flex-direction: column;
  max-width: 40vw;
  box-sizing: border-box;
  padding: 24px;
}


.plan-modal .plan-modal-window h2 {
  font-size: 22px;
  font-weight: 500;
}

.plan-modal .plan-modal-window h2 i {
  float: right;
  cursor: pointer;
}

.plan-modal .plan-modal-window .plan-inputNum {
  margin-top: 50px;
  max-height: 500px;
  overflow-y: auto;
}

.plan-modal .plan-modal-window .plan-inputNum .plan-inputNum-label{
  font-size: 14px;
  color: #606266;
  margin-left: 28px;
  margin-right: 14px;
}

.plan-modal .plan-modal-window .plan-modal-btn {
  margin-top: 35px;
  max-height: 500px;
  margin-left: 10px;
  overflow-y: auto;
}

.plan-modal .plan-modal-window .plan-modal-btn input {
  float: right;
  width: 95px;
  height: 34px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #2c3143;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
}

.plan-modal .plan-modal-window .plan-modal-btn input:hover {
  background-color: #565a69;
}
</style>