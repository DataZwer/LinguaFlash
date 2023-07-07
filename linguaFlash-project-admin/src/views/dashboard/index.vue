<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-top: 50px">
      <el-col :span="13">
          <el-card style="height:220px">
            <el-descriptions title="当前管理员信息" size="medium" border>
              <el-descriptions-item label="用户名">{{
                adminInfo.adminname
              }}</el-descriptions-item>
              <el-descriptions-item label="昵称">{{
                adminInfo.nickname
              }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{
                adminInfo.email
              }}</el-descriptions-item>
              <el-descriptions-item label="性别">{{
                adminInfo.sex
              }}</el-descriptions-item>
              <el-descriptions-item label="状态">
                <el-tag type="success" size="small" v-if="adminInfo.status == 1"
                  >正常</el-tag
                >
                <el-tag type="danger" size="small" v-else>禁用</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="手机">{{
                adminInfo.mobile
              }}</el-descriptions-item>
              <el-descriptions-item label="角色">
                <el-tag size="small">{{ adminInfo.role }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="简介">{{
                adminInfo.remark
              }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
      </el-col>
      <el-col :span="11">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="system-dataCard" body-style="padding:0px;">
              <div class="system-dataicon user-dataicon">
                <i class="el-icon-user"></i>
              </div>
              <div class="system-data">
                <div class="dataCard-value">{{dataNum.userNum}}</div>
                <div class="dataCard-title">用户总数</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="system-dataCard" body-style="padding:0px;">
              <div class="system-dataicon subject-dataicon">
                <i class="el-icon-data-analysis"></i>
              </div>
              <div class="system-data">
                <div class="dataCard-value">{{dataNum.subjectNum}}</div>
                <div class="dataCard-title">课程总数</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="12">
            <el-card class="system-dataCard" body-style="padding:0px;">
              <div class="system-dataicon word-dataicon">
                <i class="el-icon-postcard"></i>
              </div>
              <div class="system-data">
                <div class="dataCard-value">{{dataNum.wordNum}}</div>
                <div class="dataCard-title">单词总数</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="system-dataCard" body-style="padding:0px;">
              <div class="system-dataicon sentence-dataicon">
                <i class="el-icon-chat-line-square"></i>
              </div>
              <div class="system-data">
                <div class="dataCard-value">{{dataNum.sentenceNum}}</div>
                <div class="dataCard-title">句子总数</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="13">
        <div class="operate-container">
          <el-card>
            <WordPlan :data="wordPlan" />
          </el-card>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="operate-container">
          <el-card>
            <ForeignPie :data="foreignPie"/>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="13">
        <div class="operate-container">
          <el-card>
            <SentencePlan :data="sentencePlan" />
          </el-card>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="operate-container">
          <el-card>
            <SubjectPie :data="subjectPie"/>
          </el-card>
        </div>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="17">
        <div class="operate-container">
          <el-card>
            <SubjectLevel :data="subjectLevel" />
          </el-card>
        </div>
      </el-col>
    </el-row>
    
    
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WordPlan from "@/components/Echarts/WordPlan.vue";
import SentencePlan from "@/components/Echarts/SentencePlan .vue";
import ForeignPie from "@/components/Echarts/ForeignPie.vue";
import SubjectPie from "@/components/Echarts/SubjectPie.vue";
import SubjectLevel from "@/components/Echarts/SubjectLevel.vue";

import { getAllWordPlan, getAllSentencePlan, getDataNum, getForeignPie, getSubjectPie, getSubjectLevel } from "@/api/home";

import { getInfo } from "@/api/user";

export default {
  name: "Dashboard",
  data() {
    return {
      wordPlan: [],
      sentencePlan: [],
      foreignPie: [],
      subjectPie: [],
      subjectLevel : [],
      adminInfo: null,
      dataNum: null,
    };
  },
  async created() {
    this.getWordPlan();
    this.getSentencePlan();
    this.getAdminInfo();
    this.getAllDataNum();
    this.getAllForeignPie();
    this.getAllSubjectPie();
    this.getAllSubjectLevel();
  },
  components: { WordPlan, SentencePlan, ForeignPie, SubjectPie, SubjectLevel },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    async getWordPlan() {
      const results = await getAllWordPlan();
      if (results.status == 0) {
        this.wordPlan = results.data;
      }
    },
    async getSentencePlan() {
      const results = await getAllSentencePlan();
      if (results.status == 0) {
        this.sentencePlan = results.data;
      }
    },
    async getAdminInfo() {
      const results = await getInfo();
      if (results.status == 0) {
        this.adminInfo = results.data;
      }
    },
    async getAllDataNum() {
      const results = await getDataNum();
      if (results.status == 0) {
        this.dataNum = results.data;
      }
    },
    async getAllForeignPie() {
      const results = await getForeignPie();
      if (results.status == 0) {
        this.foreignPie = results.data;
      }
    },
    async getAllSubjectPie() {
      const results = await getSubjectPie();
      if (results.status == 0) {
        this.subjectPie = results.data;
      }
    },
    async getAllSubjectLevel() {
      const results = await getSubjectLevel();
      if (results.status == 0) {
        this.subjectLevel = results.data;
      }
    },
  }
};
</script>

<style lang="css" scoped>
.el-descriptions__title{
  font-size: 19px!important;
}
.dashboard-container {
  margin: 30px;
}
.system-dataCard {
  height: 100px;
  /* margin-left: 20px; */
}
.system-dataicon {
  float: left;
  width: 40%;
  min-width: 60px;
  height: 100px;
  /* background-color: #2d8cf0; */
  text-align: center;
  line-height: 132px;
}
.user-dataicon {
  background-color: #2d8cf0;
}
.subject-dataicon {
  background-color: #64d572;
}
.word-dataicon {
  background-color: #f25e43;
}
.sentence-dataicon {
  background-color: #f1e05a;
}
.system-dataicon i {
  font-size: 60px;
  color: #fff;
}
.system-data {
  float: left;
  width: 60%;
  height: 100px;
  padding: 20px 0;
  text-align: center;
}
.dataCard-value {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 2px;
}
.dataCard-title {
  text-align: center;
  font-size: 14px;
  color: #999;
}

</style>
