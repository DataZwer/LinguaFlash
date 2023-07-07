<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
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
              placeholder="用户名/昵称"
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
        <el-table-column label="用户名" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="昵称" width="110" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="邮箱" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">{{
            scope.row.gender ? scope.row.gender : "—"
          }}</template>
        </el-table-column>
        <el-table-column label="简介" align="center">
          <template slot-scope="scope">{{ scope.row.introduce?scope.row.introduce:'—' }}</template>
        </el-table-column>
        <el-table-column label="头像" width="120" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.user_pic }}</template> -->
          <template slot-scope="scope">
            <!-- <el-image
            style="width:100px;height:100px"
              :src="'http://localhost:3009/api/' + scope.row.user_pic"
              :fit="'contain'">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image> -->
            <el-avatar :size="100" :src="'http://localhost:3009/api/' + scope.row.user_pic" @error="errorHandler">
              <img src="../../../../../public/ImgError.png"/>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="所选课程" width="100" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 42px; height: 26px"
              :src="'http://localhost:3009/api/' + scope.row.foreign_imgurl"
              :fit="'contain'"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div>{{ scope.row.foreign }}</div>
          </template>
        </el-table-column>
        <el-table-column label="重难点单词数" width="50" align="center">
          <template slot-scope="scope">{{ scope.row.collect_words }}</template>
        </el-table-column>
        <el-table-column label="已学会单词数" width="50" align="center">
          <template slot-scope="scope">{{ scope.row.learned_words }}</template>
        </el-table-column>
        <el-table-column label="注册时间" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.register_date }}</template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleViewUserSentenceDetail(scope.$index, scope.row)">查看句子</el-button>
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
      :title="'添加用户单词'"
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
            v-model="userSentence.user_id"
            clearable
            placeholder="请选择用户"
            filterable
            size="medium"
          >
            <el-option
              v-for="item in allUser"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            >
              <span style="float: left">{{ item.username }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.nickname
              }}</span>
            </el-option>
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
          >
            <el-option
              v-for="item in allSentence"
              :key="item.id"
              :label="item.En_sentence"
              :value="item.id"
            >
              <span style="float: left">{{ item.En_sentence }}</span>
              <!-- <span style="float: left; margin-left:5px; color: #8492a6; font-size: 11px">{{
                item.Ch_sentence
              }}</span> -->
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.Ch_sentence
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
import {
  getUserList,
  getAllForeign,
  updateStatus,
  updateUserList,
  deleteUserList,
  addUserList,
} from "@/api/user/userlist";


import {
    getAllSentence,
    addUserSentence,
} from "@/api/study/sentence";

import {
  getAllUser,
} from "@/api/course/userSubject";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultUserSentence = {
  user_id: null,
  sentence_id: null,
};

export default {
  name: "UserSentence",
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
      userSentence: Object.assign({}, defaultUserSentence),
      allSentence: null,
      allUser: null,
    };
  },
  created() {
    // this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.getList();
    },
    dialogVisible(newvalue) {
      if (newvalue == true) {
        this.getAllSentence();
        this.getAllUser();
      } else {
        // this.allUser=null
        // this.allSubject=null
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
      let result = await getUserList(
        this.listQuery.pageNum,
        this.listQuery.pageSize,
        this.listQuery.keyword
      );
      if (result.status == 0) {
        this.listLoading = false;
        this.list = result.data;
        this.total = result.total;
      }
    },
    async getAllSentence() {
      let result = await getAllSentence();
      if (result.status == 0) {
        this.allSentence = result.data;
      }
    },
    async getAllUser() {
      let result = await getAllUser();
      if (result.status == 0) {
        this.allUser = result.data;
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
          addUserSentence(this.userSentence).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            // this.getList();
          });
      });
    },
    addUserSentence() {
      this.dialogVisible = true;
      this.userSentence = Object.assign({}, defaultUserSentence);
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleViewUserSentenceDetail(index, row) {
      // this.$router.push(path);
      this.$router.push({path:'/study/sentence/userSentenceView',query:{id:row.id}});
    },
    errorHandler() {
      return true
    }
  },
};
</script>

<style scoped>
/* .el-button+.el-button {
  margin-left: 0px;
}
.el-button{
  text-decoration: underline;
} */
.roleButton{
  margin-left: 0px;
  text-decoration: underline;
}
</style>