<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never" v-if="userinfo">
      <el-descriptions title="用户信息" style="float:left;width:12%" :column="1">
        <el-descriptions-item >
          <el-avatar shape="circle" :size="100" :src="'http://localhost:3009/api/' + userinfo.user_pic"></el-avatar>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions style="float:left;width:70%;margin-top:30px">
        <el-descriptions-item label="用户名">{{userinfo.username}}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{userinfo.nickname}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{userinfo.email}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{userinfo.gender}}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag type="success" size="small" v-if="userinfo.status == 1">正常</el-tag>
          <el-tag type="danger" size="small" v-else>禁用</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="外语课程"><el-tag size="small">{{userinfo.foreign}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="注册时间">{{userinfo.register_date}}</el-descriptions-item>
        <el-descriptions-item label="重难点单词数">{{userinfo.collect_words}}</el-descriptions-item>
        <el-descriptions-item label="已学会单词数">{{userinfo.learned_words}}</el-descriptions-item>
        <el-descriptions-item label="简介">{{userinfo.introduce}}</el-descriptions-item>
      </el-descriptions>
      
    </el-card>
    <el-card class="operate-container filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span> 筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small"
        >
          查询结果
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.keyword"
              style="width: 203px"
              @keyup.enter="focusInputEnter()"
              placeholder="句子(英/汉)"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span> 数据列表</span>
      <el-button class="btn-add" @click="addUserSentence()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="句子" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.En_sentence }}</template>
        </el-table-column>
        <el-table-column label="翻译" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.Ch_sentence }}</template>
        </el-table-column>
        <el-table-column label="混淆选项(英)" width="200" align="center">
          <template slot-scope="scope" v-if="scope.row.confusion_En">
            <el-tag
              v-for="tag in scope.row.confusion_En.split(' ')"
              :key="tag"
              :disable-transitions="true"
            >
              {{ tag }}
            </el-tag>
          </template>
          <template slot-scope="scope" v-else
            ><el-tag>{{
              scope.row.confusion_En ? scope.row.confusion_En : "—"
            }}</el-tag></template
          >
        </el-table-column>
        <el-table-column label="混淆选项(中)" width="200" align="center">
          <!-- <template slot-scope="scope">{{scope.row.confusion_Ch ? scope.row.confusion_Ch : "—"}}</template> -->
          <template slot-scope="scope" v-if="scope.row.confusion_Ch">
            <el-tag
              v-for="tag in scope.row.confusion_Ch.split(' ')"
              :key="tag"
              :disable-transitions="true"
            >
              {{ tag }}
            </el-tag>
          </template>
          <template slot-scope="scope" v-else
            ><el-tag>{{
              scope.row.confusion_Ch ? scope.row.confusion_Ch : "—"
            }}</el-tag></template
          >
        </el-table-column>
        <!-- <el-table-column label="注释" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="所属课程" align="center">
          <template slot-scope="scope">{{ scope.row.subject }}</template>
        </el-table-column>
        <el-table-column label="是否学会" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowIslearnedChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.islearned">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="熟练度" width="70" align="center">
          <template slot-scope="scope">
            {{ scope.row.proficiency }}
            <!-- <el-input-number v-model="scope.row.proficiency" :min="0" :max="5" label="描述文字" size="small"></el-input-number> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="text-decoration: underline;"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              style="text-decoration: underline;margin-left:0px"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑用户句子':'添加用户句子'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="userSentence"
        ref="roleForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="用户：">
          <el-select
            style="width: 80%"
            v-model="userinfo.username"
            clearable
            placeholder="请选择用户"
            filterable
            size="medium"
            :disabled="true"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="单词：">
          <el-select
            style="width: 80%"
            v-model="userSentence.sentence_id"
            clearable
            placeholder="请选择单词"
            filterable
            size="medium"
            :disabled="isEdit"
          >
            <el-option
              v-for="item in allSentence"
              :key="item.id"
              :label="item.En_sentence"
              :value="item.id"
            >
              <span style="float: left">{{ item.En_sentence }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.Ch_sentence
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="熟练度：">
          <el-input-number v-model="userSentence.proficiency" :min="0" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item label="是否学会：">
          <el-radio-group v-model="userSentence.islearned">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSentence,
  addUserSentence,
  getAllSubject,
  addSentence,
  updateSentence,
  deleteSentence,
  getSentenceById,
  getAllSentence,
  updateIslearned,
  updateUserSentece,
  deleteUserSentence
} from "@/api/study/sentence";

import { getUserInfoById } from "@/api/study/card";


const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultUserSentence = {
  user_id: null,
  sentence_id: null,
  proficiency: null,
  islearned : 0,
};

export default {
  name: "UserSentenceView",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        keyword: null,
        pageNum: 1,
        pageSize: 5,
      },
      dialogVisible: false,
      isEdit: false,
      userSentence: Object.assign({}, defaultUserSentence),
      allSentence: null,
      userinfo: null,
    };
  },
  created() {
    this.getList();
    this.getUserInfo()
  },
  watch: {
    $route(route) {
      this.getList();
      this.getUserInfo()
    },
    dialogVisible(newvalue) {
      if (newvalue == true) {
        this.getAllSentence()
        
      } else {
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    async getList() {
      this.listLoading = true;
      try {
        let result = await getSentenceById(
            this.listQuery.pageNum,
            this.listQuery.pageSize,
            this.listQuery.keyword,
            this.$route.query.id
        );
        if (result.status == 0) {
            this.listLoading = false;
            this.list = result.data;
            this.total = result.total;
        }
      } catch (error) {
            this.listLoading = false;
            this.list = null;
            this.total = null;
      }
      
    },
    async getAllSentence() {
      let result = await getAllSentence();
      if (result.status == 0) {
        this.allSentence = result.data;
      }
    },
    async getUserInfo() {
      this.listLoading = true;
      try {
        let results = await getUserInfoById(this.$route.query.id);
        if (results.status == 0) {
            this.listLoading = false;
            this.userinfo = results.data;
        } 
      } catch (error) {
        this.listLoading = false;
        this.userinfo = null
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
            // this.sentenceList.confusion_En = this.dynamicTags.join(' ')
            // this.sentenceList.confusion_Ch = this.dynamicTags2.join(' ')
          updateUserSentece(this.userSentence).then((response) => {
              this.$message({
                message: "修改成功！",
                type: "success",
              });
              this.dialogVisible = false;
              this.getList();
            }
          );
        } else {
            // this.sentenceList.confusion_En = this.dynamicTags.join(' ')
            // this.sentenceList.confusion_Ch = this.dynamicTags2.join(' ')
          addUserSentence(this.userSentence).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    addUserSentence() {
      this.dialogVisible = true;
      this.isEdit = false;
      let userSentence = {user_id:this.userinfo.id, sentence_id:null, proficiency: 0, islearned: 0}
      this.userSentence = Object.assign({}, userSentence);
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      let userSentence = {user_id:this.userinfo.id, sentence_id:row.id, proficiency: row.proficiency, islearned: row.islearned}
      this.userSentence = Object.assign({}, userSentence);
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该单词", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = new URLSearchParams();
        data.append("user_id", this.$route.query.id);
        data.append("sentence_id", row.id);
        deleteUserSentence(data).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleShowIslearnedChange(index, row) {
      let data = new URLSearchParams();
      data.append("user_id", this.$route.query.id);
      data.append("sentence_id", row.id);
      data.append("islearned", row.islearned);
      // console.log(data.toString());
      updateIslearned(data).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      }).catch(error => {
        if (row.islearned === 0) {
          row.islearned = 1;
        } else {
          row.islearned = 0;
        }
      });
    },
  },
  computed: {
    // dynamicTags :{
    //     get(){
    //         if (this.sentenceList.confusion_En){
    //             return this.sentenceList.confusion_En.split(' ')
    //         } else {
    //             return null
    //         }
    //     },
    //     set(value){
    //         console.log(value);
    //         if(this.sentenceList.confusion_En){
    //             console.log(this.sentenceList.confusion_En);
    //             this.sentenceList.confusion_En.split(' ').push(value)
    //         }else{
    //             console.log(this.sentenceList.confusion_En);
    //             // this.sentenceList.confusion_En = []
    //             this.sentenceList.confusion_En.split(' ').push(value)
    //         }
    //     }
        
    // }
  },
};
</script>

<style>
/* .el-tag + .el-tag {
  margin-left: 10px;
} */
.el-tag{
    margin-right: 10px!important;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>