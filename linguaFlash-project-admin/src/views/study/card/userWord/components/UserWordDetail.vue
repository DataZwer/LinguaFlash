<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never" >
      <el-descriptions title="用户信息" style="float:left;width:12%" :column="1">
        <el-descriptions-item>
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
              placeholder="单词(英/汉)"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span> 数据列表</span>
      <el-button class="btn-add" @click="addUserWord()" size="mini">
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
        <el-table-column label="单词" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.words }}</template>
        </el-table-column>
        <el-table-column label="翻译" width="90" align="center">
          <template slot-scope="scope">{{ scope.row.translation }}</template>
        </el-table-column>
        <el-table-column label="音标" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.phonetic }}</template>
        </el-table-column>
        <el-table-column label="其他形式" width="250" align="center">
          <template slot-scope="scope">{{
            scope.row.otherforms ? scope.row.otherforms : "—"
          }}</template>
        </el-table-column>
        <el-table-column label="注释" align="center">
          <template slot-scope="scope">{{ scope.row.notes }}</template>
        </el-table-column>
        <el-table-column label="是否收藏" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowIscollectChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.iscollect">
            </el-switch>
          </template>
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
        <el-table-column label="所属课程" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.subject }}</template>
        </el-table-column>
        <el-table-column label="操作" width="50" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              class="wordButton wordMargin"
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
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="'添加用户单词'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="userWord"
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
            v-model="userWord.word_id"
            clearable
            placeholder="请选择单词"
            filterable
            size="medium"
          >
            <el-option
              v-for="item in allWord"
              :key="item.id"
              :label="item.words"
              :value="item.id"
            >
              <span style="float: left">{{ item.words }}</span>
              <span style="float: left; margin-left:5px; color: #8492a6; font-size: 11px">{{
                item.phonetic
              }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.translation
              }}</span>
            </el-option>
          </el-select>
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
import { getWordById, addWord, updateWord, getUserInfoById, updateIscollect, updateIslearned, deleteWord, deleteUserWord } from "@/api/study/card";

import {
  getAllWord,
  addUserWord
} from "@/api/study/card";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultUserWord = {
  user_id: null,
  word_id: null,
};

export default {
  name: "UserWordDetail",
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
      userWord: Object.assign({}, defaultUserWord),
      userinfo: null,
      allWord: null
    };
  },
  created() {
    // this.resetParentId();
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
        this.getAllWord();
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
            let result = await getWordById(
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
    async getAllWord() {
      let result = await getAllWord();
      if (result.status == 0) {
        this.allWord = result.data;
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
          addUserWord(this.userWord).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
      });
    },
    addUserWord() {
      this.dialogVisible = true;
      let userWord = {user_id:this.userinfo.id,word_id:null}
      this.userWord = Object.assign({}, userWord);
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该单词", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = new URLSearchParams();
        data.append("user_id", this.$route.query.id);
        data.append("word_id", row.id);
        deleteUserWord(data).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleShowIscollectChange(index, row) {
        let data = new URLSearchParams();
        data.append("user_id", this.$route.query.id);
        data.append("word_id", row.id);
        data.append("iscollect", row.iscollect);
        // console.log(data.toString());
        updateIscollect(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.iscollect === 0) {
            row.iscollect = 1;
          } else {
            row.iscollect = 0;
          }
        });
      },
    handleShowIslearnedChange(index, row) {
      let data = new URLSearchParams();
      data.append("user_id", this.$route.query.id);
      data.append("word_id", row.id);
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
};
</script>

<style>
.wordButton {
  text-decoration: underline;
}
.wordMargin {
  margin-left: 0 !important;
}
</style>