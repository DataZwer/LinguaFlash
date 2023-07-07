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
              placeholder="单词(英/汉)"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span> 数据列表</span>
      <el-button class="btn-add" @click="addWord()" size="mini">
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
        <el-table-column label="注释" align="center">
          <template slot-scope="scope">{{ scope.row.notes }}</template>
        </el-table-column>
        <el-table-column label="所属课程" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.subject }}</template>
        </el-table-column>
        <el-table-column label="操作" width="50" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              class="wordButton"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑
            </el-button>
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
      :title="isEdit ? '编辑单词' : '添加单词'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="wordList"
        ref="roleForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="单词：">
          <el-input v-model="wordList.words" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="翻译：">
          <el-input
            v-model="wordList.translation"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="音标：">
          <el-input v-model="wordList.phonetic" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="其他形式：">
          <el-input
            v-model="wordList.otherforms"
            type="textarea"
            :rows="3"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="注释：">
          <el-input
            v-model="wordList.notes"
            type="textarea"
            :rows="3"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属课程：">
          <el-select v-model="wordList.category" :value-key="wordList.subject" clearable placeholder="请选择">
            <el-option
              v-for="item in allSubject"
              :key="item.id"
              :label="item.name"
              :value="item.id">
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
// import { getSubject, getAllForeign, addSubject, updateStatus, updateSubject, deleteSubject  } from '@/api/course/subject'
import { getWord, getAllSubject, addWord, updateWord, deleteWord } from "@/api/study/card";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultWord = {
  id: null,
  words: null,
  translation: null,
  phonetic: null,
  otherforms: null,
  notes: null,
  category: 1,
};

export default {
  name: "WordList",
  data() {
    return {
      list: null,
      allSubject: null,
      total: null,
      listLoading: true,
      listQuery: {
        keyword: null,
        pageNum: 1,
        pageSize: 5,
      },
      dialogVisible: false,
      wordList: Object.assign({}, defaultWord),
      isEdit: false,
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
        this.getSubjectList();
      } else {
        this.allSubject = null;
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
      let result = await getWord(
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
    async getSubjectList() {
      let results = await getAllSubject();
      if (results.status == 0) {
        this.allSubject = results.data;
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
          updateWord(this.wordList.id, this.wordList).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          addWord(this.wordList).then((response) => {
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
    addWord() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.wordList = Object.assign({}, defaultWord);
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      // this.admin = Object.assign({},row);
      this.wordList = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该单词", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteWord(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
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