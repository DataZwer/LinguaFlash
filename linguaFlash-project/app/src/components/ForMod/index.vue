<template>
  <div class="course-modal" style="display: none" id="modai1">
    <div class="course-modal-window">
      <h2>编辑课程<i class="bi bi-x-lg" @click="close()"></i></h2>
      <div class="courses-list">
        <div class="course-list-item" id="noone">
          <!-- :src="require('../../../public/images/'+userForeign.imgurl)" -->
          <div class="course-icons">
            <!-- <img :src="Userimgurl"></div> -->
            <img v-if="userForeign.imgurl" :src="'http://localhost:3008/api/' + userForeign.imgurl" />
          </div>
          <div class="course-infos">
            <div class="title">{{ userForeign.name }}</div>
            <div class="subtitle">{{ userForeign.introduce }}</div>
          </div>
          <div class="course-rights">
            <div class="meta">
              <span class="learning" ref="learning">学习中</span>
              <i
                class="bi bi-check-circle-fill iselect"
                ref="choiceOfI"
                @click="learning"
              ></i>
            </div>
          </div>
        </div>
        <div
          class="course-list-item"
          v-for="foreign in allForeigns"
          :key="foreign.id"
        >
          <template v-if="foreign.id !== userForeign.id">
            <!-- :src="require('../../../public/images/'+foreign.imgurl)" -->
            <div class="course-icons">
              <!-- <img :src="require('../../../public/images/'+foreign.imgurl)" ref="allForeignImg"> -->
              <img
                v-if="foreign.imgurl"
                :src="'http://localhost:3008/api/' + foreign.imgurl"
                ref="allForeignImg"
              />
            </div>
            <div class="course-infos">
              <div class="title">{{ foreign.name }}</div>
              <div class="subtitle">{{ foreign.introduce }}</div>
            </div>
            <div class="course-rights">
              <div class="meta">
                <span class="learning"></span>
                <i
                  class="bi bi-circle"
                  :data-id="foreign.id"
                  @click="selectUserForeign(foreign.id)"
                ></i>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="course-modal-btn">
        <input type="submit" value="确定" @click.prevent="updateUserForeign" />
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapState } from "vuex";
import { removeUnScroll, buttoncheck } from "../../js/ForMod/index";
export default {
  name: "ForMod",
  data() {
    return {
      foreign_courses: "",
      // imgs: [
      //   {
      //     Britain: require('../../../public/images/Britain.jpg')
      //   },
      //   {
      //     Spanish: require('../../../public/images/Spanish.jpg')
      //   }
      // ]
    };
  },
  methods: {
    close() {
      this.$store.state.home.ForModFlag = false;
      // this.$refs.choiceOfI.className = 'bi-check-circle-fill iselect'
      // this.$refs.learning.innerText = '学习中'
      $("#noone")
        .siblings("div")
        .find(".course-rights")
        .find(".meta")
        .find("i")
        .addClass("bi-circle")
        .removeClass("iselect");
      $("#noone")
        .find(".course-rights")
        .find(".meta")
        .find("i")
        .removeClass("bi-circle")
        .addClass("bi-check-circle-fill iselect");
      $("#noone")
        .siblings("div")
        .find(".course-rights")
        .find(".meta")
        .find("span")
        .text("");
      $("#noone")
        .find(".course-rights")
        .find(".meta")
        .find("span")
        .text("学习中");
      removeUnScroll();
    },
    selectUserForeign(id) {
      // alert(id)
      this.foreign_courses = id;
      // console.log(this.foreign_courses);
    },
    async updateUserForeign() {
      const { foreign_courses } = this;
      // console.log(foreign_courses);
      if (
        foreign_courses !== "" &&
        foreign_courses !== null &&
        foreign_courses !== this.userForeign.id
      ) {
        try {
          await this.$store.dispatch("home/UpdateUserForeign", {
            foreign_courses,
          });
          this.$message({
            type: "success",
            message: "修改成功！",
            customClass: "messageSuccess",
            duration: 2500,
          });

          this.$store.dispatch("home/GetUserForeign");
          this.close();
        } catch (error) {
          this.$message({
            type: "error",
            message: "修改失败！",
            customClass: "messageSuccess",
            duration: 2500,
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请选择其他课程！",
          customClass: "otherCourser",
          duration: 2500,
        });
      }
    },
    learning() {
      this.foreign_courses = "";
    },
  },
  mounted() {
    if (!this.allForeigns) {
      this.$refs.allForeignImg.setAttribute("v-pre", "true");
    }
  },
  computed: {
    ...mapState("home", ["userForeign", "allForeigns"]),
    Userimgurl() {
      if (this.userForeign.imgurl) {
        return require("../../../public/images/" + this.userForeign.imgurl);
      } else {
        return "";
      }
    },
  },
};
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
  min-height: 450px;
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

.course-modal .course-modal-window .courses-list {
  margin-top: 16px;
  max-height: 500px;
  overflow-y: auto;
}

.course-modal .course-modal-window .courses-list::-webkit-scrollbar {
  width: 6px; 
  height: 6px; 
  border-radius: 8px; 
  background-color: rgba(255, 255, 255, 0.1); 
}

/*定义滚动条轨道 内阴影+圆角*/
.course-modal .course-modal-window .courses-list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5); 
  border-radius: 8px; 
  background-color: #f5f5f5;  
}

/*定义滑块 内阴影+圆角*/
.course-modal .course-modal-window .courses-list::-webkit-scrollbar-thumb {
  border-radius: 8px; 
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5); 
  background-color: #c8c8c8; 
}

.course-modal .course-modal-window .courses-list .course-list-item {
  margin: 8px 0;
  transition: opacity 250ms;
  display: flex;
  flex-direction: row;
  user-select: none;
  cursor: pointer;
  align-items: center;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 26px;
  background-color: aqua;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-infos {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-infos
  .title {
  font-size: 18px;
  font-weight: 500;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-infos
  .subtitle {
  color: #626c91;
  font-size: 12px;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-rights {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8.8px;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-rights
  .meta {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-rights
  .meta
  .learning {
  font-size: 12px;
  line-height: 26px;
  margin-right: 8px;
  color: #626c91;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-rights
  .meta
  i {
  font-size: 20px;
  color: #bcc5d5;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;
}
.course-modal
  .course-modal-window
  .courses-list
  .course-list-item
  .course-rights
  .meta
  i.iselect {
  color: #037889;
}

.course-modal .course-modal-window .course-modal-btn {
  margin-top: 16px;
  max-height: 500px;
  margin-left: 10px;
}

.course-modal .course-modal-window .course-modal-btn input {
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

.course-modal .course-modal-window .course-modal-btn input:hover {
  background-color: #565a69;
}
</style>