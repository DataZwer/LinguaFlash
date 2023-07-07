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
      <el-button class="btn-add" @click="addUser()" size="mini">
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
        <el-table-column label="头像" width="130" align="center">
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
              <img src="../../../../public/ImgError.png"/>
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
        <el-table-column label="是否启用" width="80" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.status }}</template> -->
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="68" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              class="roleButton"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              class="roleButton wordMargin"
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
      :title="isEdit ? '编辑用户' : '添加用户'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="userlist"
        ref="roleForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="用户名：">
          <el-input v-model="userlist.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" v-if="!isEdit">
          <el-input v-model="userlist.password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="userlist.nickname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="userlist.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <!-- <el-input v-model="userlist.gender" style="width: 250px"></el-input> -->
          <el-radio-group v-model="userlist.gender">
            <el-radio :label="'男'">男</el-radio>
            <el-radio :label="'女'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介：">
          <el-input
            v-model="userlist.introduce"
            type="textarea"
            :rows="3"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="头像：">
          <el-input v-model="wordList.words" style="width: 250px"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="所选课程：">
          <el-input v-model="wordList.words" style="width: 250px"></el-input>
        </el-form-item> -->
        <el-form-item label="所选课程：">
          <el-select v-model="userlist.foreign_courses" clearable placeholder="请选择">
            <el-option
              v-for="item in allForeign"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="重难点单词数：">
          <el-input
            v-model="userlist.collect_words"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="已学会单词数：">
          <el-input
            v-model="userlist.learned_words"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-input
            v-model="userlist.otherforms"
            style="width: 250px"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="是否启用：">
          <el-radio-group v-model="userlist.status">
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
  getUserList,
  getAllForeign,
  updateStatus,
  updateUserList,
  deleteUserList,
  addUserList,
} from "@/api/user/userlist";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultUser = {
  id: null,
  username: null,
  password: null,
  nickname: null,
  email: null,
  gender: '男',
  introduce: null,
  foreign_courses: 1,
  status: 1,
};

export default {
  name: "Role",
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
      userlist: Object.assign({}, defaultUser),
      isEdit: false,
      allForeign: null,
      // uploadData:{
      //   id:'huangjunbin'
      // }
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
        this.getForeignList();
      } else {
        this.allForeign = null;
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
          // this.uploadPicture();
          updateUserList(this.userlist.id, this.userlist).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          // this.uploadPicture();
          addUserList(this.userlist).then((response) => {
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
    addUser() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.userlist = Object.assign({}, defaultUser);
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      // this.admin = Object.assign({},row);
      this.userlist = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该单词", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteUserList(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    async getForeignList() {
      let results = await getAllForeign();
      if (results.status == 0) {
        this.allForeign = results.data;
      }
    },
    handleShowStatusChange(index, row) {
      let data = new URLSearchParams();
      data.append("id", row.id);
      data.append("status", row.status);
      updateStatus(data)
        .then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
        })
        .catch((error) => {
          if (row.status === 0) {
            row.status = 1;
          } else {
            row.status = 0;
          }
        });
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