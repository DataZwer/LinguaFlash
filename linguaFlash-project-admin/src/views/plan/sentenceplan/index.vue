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
      <!-- <el-button class="btn-add" @click="addUser()" size="mini">
        添加
      </el-button> -->
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
        <el-table-column label="用户名" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="昵称" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="邮箱" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">{{
            scope.row.gender ? scope.row.gender : "—"
          }}</template>
        </el-table-column>
        <el-table-column label="今日计划数" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.plan.sentence_plan }}</template>
        </el-table-column>
        <el-table-column label="今日完成数" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.plan.sentence_complete }}</template>
        </el-table-column>
        <el-table-column label="上次完成时间" width="185" align="center">
          <template slot-scope="scope">{{ timestampToTime(scope.row.plan.sentence_timeStamp) }}</template>
        </el-table-column>
        <el-table-column label="所选课程" width="100" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 42px; height: 26px"
              :src="'http://localhost:3009/api/' + scope.row.foreign.imgurl"
              :fit="'contain'"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div>{{ scope.row.foreign.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.register_date }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
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
              >清空
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
      :title="'编辑用户计划'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="sentencePlan"
        ref="roleForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="用户名：">
          <el-input v-model="sentencePlan.username" style="width: 250px" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="sentencePlan.nickname" style="width: 250px" disabled></el-input>
        </el-form-item>
        <el-form-item label="今日计划数：">
          <el-input-number v-model="sentencePlan.sentence_plan" :min="0" :max="50" :step="5"></el-input-number>
        </el-form-item>
        <el-form-item label="今日完成数：">
          <el-input-number v-model="sentencePlan.sentence_complete" :min="0" :max="50" :step="1" @change="completeChange"></el-input-number>
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
  getSentencePlan,
  updateSentencePlan
} from "@/api/plan/sentence";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultUserSentencePlan = {
  belongs_user: null,
  username: null,
  nickname: null,
  sentence_plan: null,
  sentence_complete: null,
  sentence_timeStamp : null
};

export default {
  name: "SentencePlan",
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
      sentencePlan: Object.assign({}, defaultUserSentencePlan),
      completeIsChange: false,
      oldComplete: null,
    };
  },
  created() {
    this.getList();
  },
  watch: {
    $route(route) {
      this.getList();
    },
    dialogVisible(newvalue) {
      if (newvalue == true) {

      } else {
        this.completeIsChange = false
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
      let result = await getSentencePlan(
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
        if(this.completeIsChange){
          let times = new Date().getTime() / 1000;
          console.log(times);
          // console.log(times);
          var sentencePlan = {
            belongs_user: this.sentencePlan.belongs_user,
            sentence_plan: this.sentencePlan.sentence_plan,
            sentence_complete: this.sentencePlan.sentence_complete,
            sentence_timeStamp: times
          }
        } else {
          var sentencePlan = {
            belongs_user: this.sentencePlan.belongs_user,
            sentence_plan: this.sentencePlan.sentence_plan,
            sentence_complete: this.sentencePlan.sentence_complete,
          }
        }
          updateSentencePlan(sentencePlan).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
      });
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleUpdate(index, row) {
      this.oldComplete = row.plan.sentence_complete
      this.dialogVisible = true;
      let sentencePlan = {
        belongs_user: row.id,
        username: row.username,
        nickname: row.nickname,
        sentence_plan: row.plan.sentence_plan,
        sentence_complete: row.plan.sentence_complete,
        sentence_timeStamp : null
      }
      this.sentencePlan = Object.assign({}, sentencePlan);
    },
    handleDelete(index, row) {
      this.$confirm("是否要清空该用户今日完成单词数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
      let times = new Date().getTime() / 1000;
        let emptyComplete = {
           belongs_user: row.id,
           sentence_plan: row.plan.sentence_plan,
           sentence_complete: 0,
           sentence_timeStamp : times
        }
        updateSentencePlan(emptyComplete).then((response) => {
          this.$message({
            message: "成功清空!",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    timestampToTime(timestamp) {
      if(timestamp){
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
      } else {
        return "—";
      }
    },
    completeChange(currentValue, oldValue){
      if(currentValue !== this.oldComplete){
        this.completeIsChange = true
      } else {
        this.completeIsChange = false
      }
    }
  },
};
</script>

<style scoped>
.roleButton{
  margin-left: 0px;
  text-decoration: underline;
}
</style>