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
              placeholder="课程名"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span> 数据列表</span>
      <el-button class="btn-add" @click="addForeign()" size="mini">
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
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="课程名" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="课程简介" align="center">
          <template slot-scope="scope">{{ scope.row.introduce }}</template>
        </el-table-column>
        <el-table-column label="图片" width="200" align="center">
          <!-- <img :src='"http://localhost:3009/api/"+userInfo.user_pic' /> -->
          <template slot-scope="scope">
            <el-image
              style="width: 42px; height: 26px"
              :src="'http://localhost:3009/api/' + scope.row.imgurl"
              :fit="'contain'"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
          <!-- {{scope.row.imgurl }} -->
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
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
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
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
      :title="isEdit ? '编辑课程' : '添加课程'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="foreign" ref="roleForm" label-width="150px" size="small">
        <el-form-item label="课程名：">
          <el-input v-model="foreign.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="课程简介：">
          <el-input
            v-model="foreign.introduce"
            type="textarea"
            :rows="3"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片：">
          <el-upload
            class="upload-demo"
            :action="
              isEdit
                ? `/my/foreign/update/picture/${this.foreign.id}`
                : '/my/foreign/add/foreign'
            "
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handle_success"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :name="isEdit ? 'picture' : 'file'"
            :auto-upload="false"
            ref="upload"
            :data="isEdit ? null : foreign"
            :headers="heards"
          >
            <el-button size="small" type="primary">{{
              isEdit ? "更换图片" : "点击上传"
            }}</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-radio-group v-model="foreign.status">
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
  getForeign,
  updateStatus,
  updateForeign,
  deleteForeign,
} from "@/api/course/foreign";
import { getToken } from "@/utils/auth";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultForeign = {
  id: null,
  name: null,
  introduce: null,
  imgurl: null,
  status: 1,
};

export default {
  name: "Foreign",
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
      foreign: Object.assign({}, defaultForeign),
      isEdit: false,
      fileList:[],
      heards : {'Authorization':getToken()}

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
      let result = await getForeign(
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
          this.uploadPicture();
          updateForeign(this.foreign.id, this.foreign).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          this.uploadPicture();
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    uploadPicture() {
      this.$refs.upload.submit();
    },
    addForeign() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.foreign = Object.assign({}, defaultForeign);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 张图片，本次选择了 ${files.length} 张图片，共选择了 ${
          files.length + fileList.length
        }  张图片`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handle_success(res) {
      console.log(res);
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleShowStatusChange(index, row) {
      let data = new URLSearchParams();
      // console.log(row.id);
      // console.log(row.status);
      data.append("id", row.id);
      data.append("status", row.status);
      // console.log(data.keys());
      // console.log(data.values());
      // console.log(data.toString());
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
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      // this.admin = Object.assign({},row);
      this.foreign = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该课程", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteForeign(row.id).then((response) => {
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
</style>