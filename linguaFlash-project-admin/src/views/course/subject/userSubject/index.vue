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
              placeholder="用户名/昵称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span> 数据列表</span>
      <el-button class="btn-add" @click="addUserSubject()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        :data="list"
        v-loading="listLoading"
        border
        style="width: 100%"
        row-key
        :default-expand-all="openFlag"
        ref="roleList"
      >
        <el-table-column label="序号" prop="date" width="50" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="用户名" prop="name" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="昵称" prop="address" width="100" align="center">
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
          <template slot-scope="scope">{{
            scope.row.introduce ? scope.row.introduce : "—"
          }}</template>
        </el-table-column>
        <el-table-column label="头像" width="125" align="center">
          <template slot-scope="scope">
            <!-- <el-image
              style="width: 100px; height: 100px"
              :src="'http://localhost:3009/api/' + scope.row.user_pic"
              :fit="'contain'"
            >
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
        <el-table-column label="注册时间" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.register_date }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="主题课程" width="100" type="expand">
          <template slot="header">
            <el-button type="text" @click="toggleRowExpansion(openFlag)">{{
              openFlag ? "全部收起" : "全部展开"
            }}</el-button>
          </template>
          <template v-slot="slot">
            <!-- <el-table :data="slot.row.subject">
              <el-table-column label="学校"></el-table-column>
              <el-table-column label="班级"></el-table-column>
            </el-table> -->
            <el-table style="width: 100%" :data="slot.row.subject">
              <el-table-column label="序号" width="100" align="center">
                <template slot-scope="scope">{{ scope.row.id }}</template>
              </el-table-column>
              <el-table-column label="课程名" width="200" align="center">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="价格" width="100" align="center">
                <template slot-scope="scope">{{ scope.row.price }}</template>
              </el-table-column>
              <el-table-column label="单词数" width="100" align="center">
                <template slot-scope="scope">{{ scope.row.number }}</template>
              </el-table-column>
              <el-table-column label="课程描述" align="center">
                <template slot-scope="scope">{{
                  scope.row.description
                }}</template>
              </el-table-column>
              <el-table-column label="是否显示" width="100" align="center">
                <template slot-scope="scope">
                  <!-- <el-switch
                    @change="handleShowStatusChange(scope.$index, scope.row)"
                    :active-value="1"
                    :inactive-value="0"
                    v-model="scope.row.status">
                  </el-switch> -->
                  <el-tag type="success" v-if="scope.row.status == 1"
                    >显示</el-tag
                  >
                  <el-tag type="danger" v-else>隐藏</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="所属外语" width="100" align="center">
                <template slot-scope="scope">{{ scope.row.foreign }}</template>
              </el-table-column>
              <el-table-column label="评分" width="100" align="center">
                <template slot-scope="scope">{{ scope.row.level }}</template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot="header" slot-scope="scope">
                  <el-button size="mini" @click="handleInsert(scope.$index, slot.row)">添加</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, slot.row, scope.row)"
                    >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="right">
          <template slot="header" >
            <el-button></el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[2, 4, 8]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isAddOne ? '添加课程' : '添加课程'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="userSubject"
        ref="roleForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="用户：">
          <el-select
            style="width: 80%"
            v-model="userSubject.user_id"
            clearable
            placeholder="请选择用户"
            filterable
            size="medium"
            :disabled="isAddOne"
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
        <el-form-item label="课程：">
          <el-select
            style="width: 80%"
            v-model="userSubject.subject_id"
            :clearable="!isAddOne"
            placeholder="请选择课程"
            filterable
            size="medium"
          >
            <el-option
              v-for="item in allSubject"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.description
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
  getUserSubject,
  getAllUser,
  getAllSubject,
  addUserSubject,
  deleteUserSubject
} from "@/api/course/userSubject";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 2,
  keyword: null,
};

const defaultUserSubject = {
  user_id: null,
  subject_id: null,
};

export default {
  name: "UserSubject",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        keyword: null,
        pageNum: 1,
        pageSize: 2,
      },
      openFlag: false,
      dialogVisible: false,
      isAddOne: false,
      allUser: null,
      allSubject: null,
      userSubject: Object.assign({}, defaultUserSubject),
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
        this.getAllSubject();
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
      let result = await getUserSubject(
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
    async getAllUser() {
      // this.listLoading = true;
      let result = await getAllUser();
      if (result.status == 0) {
        this.allUser = result.data;
      }
    },
    async getAllSubject() {
      // this.listLoading = true;
      let result = await getAllSubject();
      if (result.status == 0) {
        this.allSubject = result.data;
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
      this.openFlag = false;
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // if (this.isAddOne) {
        //   updateSubject(this.subject.id,this.subject).then(response => {
        //     this.$message({
        //       message: '修改成功！',
        //       type: 'success'
        //     });
        //     this.dialogVisible =false;
        //     this.getList();
        //   })
        // } else {
          addUserSubject(this.userSubject).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        // }
      });
    },
    // expandAll(){
    //   this.expand = !this.expand
    // },
    // forArr(arr, isExpand) {
    //   arr.forEach(i => {
    //     this.$refs.theTable.toggleRowExpansion(i, isExpand)
    //     if (i.children) {
    //       this.forArr(i.children, isExpand)
    //     }
    //   })
    // },
    toggleRowExpansion(isExpansion) {
      this.openFlag = !isExpansion;
      this.toggleRowExpansion_forAll(this.list, this.openFlag);
    },
    toggleRowExpansion_forAll(data, isExpansion) {
      data.forEach((item) => {
        this.$refs.roleList.toggleRowExpansion(item, isExpansion);
        if (item.subject != undefined && item.subject != null) {
          this.toggleRowExpansion_forAll(item.subject, isExpansion);
        }
      });
    },
    addUserSubject() {
      this.dialogVisible = true;
      this.isAddOne = false;
      this.userSubject = Object.assign({}, defaultUserSubject);
    },
    handleInsert(index, row) {
      this.dialogVisible = true;
      this.isAddOne = true;
      // console.log(index, row);
      // let subject_id = []
      // row.subject.forEach((value, index, arr) => {
      //   subject_id.push(value.id)
      // });
      // console.log('subject_id:',subject_id);
      let userSubject = {user_id:row.id,subject_id:null}
      this.userSubject = Object.assign({},userSubject)
    },
    handleDelete(index, userRow, subRow) {
    // console.log(userRow);
    // console.log(subRow);
      this.$confirm('是否要删除该课程', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = new URLSearchParams();
        data.append("user_id", userRow.id);
        data.append("subject_id", subRow.id);
        deleteUserSubject(data).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      });
    },
    errorHandler() {
      return true
    }
  },
};
</script>

<style>
</style>