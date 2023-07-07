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
            size="small">
            查询结果
          </el-button>
          <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true"  size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input v-model="listQuery.keyword" style="width: 203px" @keyup.enter="focusInputEnter()" placeholder="管理员名/昵称"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span> 数据列表</span>
      <el-button class="btn-add" @click="addAdmin()" size="mini">
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
        <el-table-column label="管理员名" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.adminname }}</template>
        </el-table-column>
        <el-table-column label="昵称" width="110" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="邮箱" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="手机号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
        </el-table-column>
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">{{ scope.row.sex }}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{ scope.row.remark?scope.row.remark:'—' }}</template>
        </el-table-column>
        <el-table-column label="角色" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.role }}</template>
        </el-table-column>
        <!-- <el-table-column label="注册时间" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.register_date }}</template>
        </el-table-column> -->
        <el-table-column label="是否启用" width="100" align="center">
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
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
             <el-button
              size="mini"
              type="text"
              class="roleButton"
              @click="handleSelectRole(scope.$index, scope.row)"
              >分配角色
            </el-button>
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
    <el-dialog
      :title="isEdit ? '编辑管理员' : '添加管理员'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="adminlist"
        ref="roleForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="管理员名：">
          <el-input v-model="adminlist.adminname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" v-if="!isEdit">
          <el-input v-model="adminlist.password" type="password" show-password style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="adminlist.nickname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="adminlist.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="adminlist.mobile" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <!-- <el-input v-model="userlist.gender" style="width: 250px"></el-input> -->
          <el-radio-group v-model="adminlist.sex">
            <el-radio :label="'男'">男</el-radio>
            <el-radio :label="'女'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="adminlist.remark"
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
        <el-form-item label="角色：">
          <el-select v-model="adminlist.role" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="adminlist.status">
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
    <el-dialog
      title="分配角色"
      :visible.sync="allocDialogVisible"
      width="30%">
      <el-select v-model="allocRoleIds" placeholder="请选择" size="small" style="width: 80%">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
getAdminList,
addAdminList,
updateAdminStatus,
updateAdmin,
deleteAdmin,
updateAdminRole
} from "@/api/user"

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultAdmin = {
  id: null,
  adminname: null,
  password: null,
  nickname: null,
  email: null,
  mobile: null,
  sex: '男',
  remark: null,
  role: "系统管理员",
  status: 1,
};

export default {
  name: "Admin",
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
      adminlist: Object.assign({}, defaultAdmin),
      isEdit: false,
      allForeign: null,
      options: [{
          id: '1',
          name: '系统管理员'
        },
        {
          id: '2',
          name: '测试管理员'
        },
        {
          id: '3',
          name: '超级管理员'
        }
      ],
      allocDialogVisible: false,
      allocRoleIds:'',
      allRoleList:[],
      allocAdminId:null
    }
  },
  created() {
    // this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.getList();
    }
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
      let result = await getAdminList(
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
          updateAdmin(this.adminlist.id, this.adminlist).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          // this.uploadPicture();
          addAdminList(this.adminlist).then((response) => {
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
    addAdmin() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.adminlist = Object.assign({}, defaultAdmin);
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      // this.admin = Object.assign({},row);
      this.adminlist = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该单词", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteAdmin(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleShowStatusChange(index, row) {
      let data = new URLSearchParams();
      data.append("id", row.id);
      data.append("status", row.status);
      updateAdminStatus(data).then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
        }).catch((error) => {
          if (row.status === 0) {
            row.status = 1;
          } else {
            row.status = 0;
          }
        });
    },
    handleAllocDialogConfirm(){
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", this.allocAdminId);
        params.append("role", this.allocRoleIds);
        console.log(params.toString());
        updateAdminRole(params).then(response => {
          this.$message({
            message: '分配成功！',
            type: 'success'
          });
          this.allocDialogVisible = false;
          this.getList()
        })
      })
    },
    handleSelectRole(index,row){
      this.allocAdminId = row.id;
      this.allocDialogVisible = true;
      this.adminlist = Object.assign({}, row);
      // console.log(row);
      this.allocRoleIds = row.role;
      // this.getRoleListByAdmin(row.id);
    },
  }
}
</script>

<style>

</style>