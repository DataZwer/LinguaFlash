<template>
    <div class="right-content" >
        <div class="title-my">我的</div>
        <Foreign/>
        <div class="course-progress">
            <Stat/>
            <Plan/>
        </div>
        <MySubject v-loading="loading4"/>
        <div class="title-my">主题课程</div>
        <Subject v-loading="loading5"/>
    </div>
</template>

<script>
import Foreign from './Foreign/index.vue'
import Stat from './Stat/index.vue'
import Plan from './Plan/index.vue'
import MySubject from './MySubject/index.vue'
import Subject from './Subject/index.vue'
import { login } from '../../../js/Login/login'
// import {buttoncheck} from '../../../js/ForMod/index'

export default {
  name:'Control',
  data() {
    return {
      loadingMySubject:true,
      loadingSubject:true,
      loading4:true,
      loading5:true,
    }
  },
  components: {
    Foreign,
    Stat,
    Plan,
    MySubject,
    Subject
  },
  async mounted() {

      try {
        await this.$store.dispatch('home/UpdateUserCollectWords');
      } catch (error) {
        console.log(error);
      }

      try {
        await this.$store.dispatch('home/UpdateUserLearnedWords');
      } catch (error) {
        console.log(error);
      }

      this.$store.dispatch('user/getUserInfo'); 
        
      
      this.$store.dispatch('home/GetUserForeign');
      

      this.$store.dispatch('home/GetAllForeigns');

      
      this.$store.dispatch('home/GetUserPlan');
        
      

      try {
        await this.$store.dispatch('home/GetAllSubjects');
        this.loading5 = false
      } catch (error) {
        console.log(error);
      }

      try {
        await this.$store.dispatch('home/GetUserSubjects');
        this.loading4 = false
      } catch (error) {
        this.loading4 = false
        console.log(error);
      }

      try {
        await this.$store.dispatch('card/AddPlanForUserRegister');
      } catch (error) {
        console.log(error);
      }

  },
  activated() {
    // buttoncheck()
  },

}
</script>

<style>
.right-content {
  width: 1080px;
  margin: 0 auto;
  transform: translate(4%, -2%);
  overflow: hidden;
}

.right-content .title-my {
  margin: 32px 16px 24px;
  color: #2c3143;
  font-size: 22px;
}

.right-content .grid-item {
  height: 88px;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
}

.right-content .grid-item .course-selection {
  float: left;
  width: 50%;
  height: 56px;
}

.right-content .grid-item .course-selection a {
  display: block;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.right-content .grid-item .course-selection a:hover {
  background-color: #fff;
  box-shadow: 0 6px 9px 4px rgb(0 0 0 / 5%);
}

.right-content .grid-item .course-selection .course-icon {
  float: left;
  width: 42px;
  height: 26px;
  margin-top: 8px;
}

.right-content .grid-item .course-selection .course-icon img {
  width: 100%;
  height: 100%;
}

.right-content .grid-item .course-selection .course-info {
  float: left;
  margin-left: 8px;
}

.right-content .grid-item .course-selection .course-info .info-title {
  font-size: 18px;
  font-weight: 500;
}

.right-content .grid-item .course-selection .course-info .info-subtitle {
  color: #626c91;
  font-size: 12px;
}

.right-content .grid-item .course-selection .course-arrow {
  float: right;
  width: 28px;
  height: 28px;
  margin: 6px 6px 0 0;
  font-size: 20px;
  color: #b9bbc0;
  border-radius: 50%;
  transition: all 0.2s;
  text-align: center;
}

.right-content .grid-item .course-selection .course-arrow:hover {
  background-color: #f5f5f5;
}

.right-content .grid-item .cta {
  float: left;
  width: 49%;
  height: 56px;
  margin-left: 10px;
}

.right-content .grid-item .cta button {
  float: right;
  width: 150px;
  height: 42px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #2c3143;
  color: #fff;
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
}

.right-content .grid-item .cta button:hover {
  background-color: #565a69;
}
/*  */
.right-content .course-progress {
  width: 100%;
  height: 200px;
  margin-top: 2%;
}

.right-content .course-progress .words-progress {
  float: left;
  width: 49%;
  height: 200px;
  margin-right: 2%;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
}

.right-content .course-progress .words-progress h2 {
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 500;
}

.right-content .course-progress .words-progress .totalWords {
  position: relative;
  float: left;
  background-color: #f5f5f5;
  width: 49%;
  height: 130px;
  padding: 16px;
  margin-right: 2%;
  border-radius: 8px;
}

.right-content .course-progress .words-progress .totalWords:hover {
  cursor: pointer;
}

.right-content
  .course-progress
  .words-progress
  .totalWords:hover
  .totalWords-icon
  > i {
  font-size: 32px;
}
.right-content .course-progress .words-progress .totalWords .totalWords-icon {
  position: absolute;
  top: 15px;
  color: #faaa5a;
  font-size: 26px;
}

.right-content .course-progress .words-progress .totalWords .totalWords-icon i {
  transition: all 0.2s;
}

.right-content .course-progress .words-progress .totalWords .totalWords-number {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  margin-top: 44px;
  color: #2c3143;
}

.right-content .course-progress .words-progress .totalWords .totalWords-label {
  margin-top: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  color: #626c91;
}
.right-content .course-progress .words-progress .practice {
  margin-right: 0;
}

.right-content .course-progress .today {
  float: left;
  width: 49%;
  height: 200px;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
}

.right-content .course-progress .today .today-title{
  width: 100%;
  height: 29px;
  margin-bottom: 16px;
}

.right-content .course-progress .today h2 {
  float: left;
  width: 94%;
  font-size: 22px;
  font-weight: 500;
}

.right-content .course-progress .today .today-title i {
  float: right;
  width: 6%;
  color: #b9bbc0;
  font-size: 20px;
  text-align: center;
  height: 29px;
  cursor: pointer;
  transition: all 0.25s;
}

.right-content .course-progress .today .today-title i:hover{
  color: #565a69;
}

.right-content .course-progress .today .today-sets {
  width: 100%;
  height: 130px;
}

.right-content .course-progress .today .today-sets .today-icon {
  float: left;
  width: 48px;
  height: 48px;
  background-color: #f0f1f5;
  color: #b2b8cb;
  text-align: center;
  line-height: 48px;
  margin-right: 13px;
  border-radius: 8px;
  user-select: none;
  font-size: 26px;
}

.right-content .course-progress .today .today-sets .today-info {
  float: left;
}
.right-content .course-progress .today .today-sets .today-info .today-til {
  height: 30px;
  margin-bottom: 4px;
  font-weight: 500;
  line-height: 30px;
}

.right-content
  .course-progress
  .today
  .today-sets
  .today-info
  .today-til
  .bi-check-circle-fill {
  color: green;
  font-size: 20px;
}

.right-content
  .course-progress
  .today
  .today-sets
  .today-info
  .today-til
  .bi-x-circle-fill {
  color: red;
  font-size: 20px;
}

.right-content .course-progress .today .today-sets .today-info .today-text {
  font-size: 14px;
  margin-bottom: 4px;
}

.right-content .course-progress .today .today-sets .today-info .today-desc {
  font-size: 14px;
  margin-bottom: 4px;
}

.right-content .active-variations {
  width: 100%;
  margin-top: 2%;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
}

.right-content .active-variations h2 {
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 500;
}

.right-content .active-variations h2 .count {
  font-weight: 400;
  font-size: 20px;
  margin-left: 4px;
  opacity: 0.5;
}

.right-content .active-variations .list {
  width: 100%;
}

.right-content .active-variations .list .variation {
  width: 100%;
  height: 56px;
  margin: 10px 0;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 8px;
  user-select: none;
  transition: all 0.2s;
}

.right-content .active-variations .list .variation:hover {
  background-color: #fff;
  box-shadow: 0 3px 9px 3px rgb(0 0 0 / 5%);
}

.right-content .active-variations .list .variation .variation-icon {
  float: left;
  width: 40px;
  height: 40px;
  font-size: 28px;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
}

.right-content .active-variations .list .variation .variation-name {
  float: left;
  font-weight: 500;
  font-size: 18px;
  margin: 8px 32px;
  cursor: pointer;
}

.right-content .active-variations .list .variation .variation-status {
   float: right;
   margin-top: 8px;
   margin-right: 10px;
}

.right-content .active-variations .list .variation .variation-delete {
  float: right;
  width: 28px;
  height: 28px;
  color: #b9bbc0;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 7px;
  line-height: 28px;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
}

.right-content .active-variations .list .variation .variation-delete a {
  color: #b9bbc0;
}

.right-content .active-variations .list .variation .variation-delete:hover {
  background-color: #f5f5f5;
}

.right-content .variations-grid {
  width: 100%;
}

.right-content .variations-grid ul li {
  float: left;
  width: 24%;
  height: 200px;
  background-color: #fff;
  margin-right: 1.33%;
  margin-bottom: 1.335%;
  border-radius: 12px;
  transition: all 0.2s;
}

.right-content .variations-grid ul li:hover {
  box-shadow: 0 3px 9px 6px rgb(0 0 0 / 5%);
}

.right-content .variations-grid ul li:nth-child(4n) {
  margin-right: 0;
}

.right-content .variations-grid ul li .grid-header {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #fff;
  padding: 16px;
  text-align: left;
  height: 66px;
  font-size: 30px;
  cursor: pointer;
}

.right-content .variations-grid ul li .grid-info {
  padding: 16px;
  cursor: pointer;
}

.right-content .variations-grid ul li .grid-info .grid-name {
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 8px;
}
.right-content .variations-grid ul li .grid-info .grid-name {
  font-size: 14px;
}

/* .right-content .variations-grid ul li .grid-footer {
  
} */

.right-content .variations-grid ul li .grid-footer >  i {
  float: left;
  width: 20px;
  height: 20px;
  background-color: #f5f5f5;
  color: #b2b8cb;
  text-align: center;
  line-height: 20px;
  border-radius: 5px;
  margin-left: 16px;
  font-size: 10px;
}

.right-content .variations-grid ul li .grid-footer > div {
  float: right;
}
</style>