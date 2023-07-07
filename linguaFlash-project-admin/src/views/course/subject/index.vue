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
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input v-model="listQuery.keyword" style="width: 203px" @keyup.enter="focusInputEnter()" placeholder="课程名"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span> 数据列表</span>
      <el-button
        class="btn-add"
        @click="addSubject()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="课程名" width="200" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="价格" width="100" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="单词数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column label="课程描述" align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="所属外语" width="100" align="center">
          <template slot-scope="scope">{{scope.row.foreign}}</template>
        </el-table-column>
        <el-table-column label="评分" width="100" align="center">
          <template slot-scope="scope">{{scope.row.level}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
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
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑课程':'添加课程'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="subject"
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item label="课程名：">
          <el-input v-model="subject.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="subject.price" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="单词数：">
          <el-input v-model="subject.number" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="课程描述：">
          <el-input v-model="subject.description"
                    type="textarea"
                    :rows="3"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-radio-group v-model="subject.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属外语：">
          <el-select v-model="subject.category" clearable placeholder="请选择">
            <el-option
              v-for="item in allForeign"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评分：">
          <el-rate
            v-model="subject.level"
            :colors="colors"
            show-score
            allow-half
            style="margin-top:7px">
          </el-rate>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getSubject, getAllForeign, addSubject, updateStatus, updateSubject, deleteSubject  } from '@/api/course/subject'
  import { getToken } from '@/utils/auth'
  
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: null
  };

  const defaultSubject = {
    id: null,
    name: null,
    number:null,
    price:null,
    description: null,
    category: 1,
    status: 1,
    level:0
  }
  export default {
    name: 'Subject',
    data() {
      return {
        list: null,
        allForeign:null,
        total: null,
        listLoading: true,
        listQuery: {
          keyword: null,
          pageNum: 1,
          pageSize: 5
        },
        dialogVisible: false,
        subject: Object.assign({}, defaultSubject),
        isEdit: false,
        fileList: [],
        headers: {
          Authorization: getToken()
        },
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'] 
        // uploadData:{
        //   id:'huangjunbin'
        // }
      }
    },
    created() {
      // this.resetParentId();
      this.getList();
    },
    watch: {
      $route(route) {
        this.getList();
      },
      dialogVisible(newvalue){
        if(newvalue==true){
          this.getForeignList()
        }else{
          this.allForeign=null
        }
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
        let result = await getSubject(this.listQuery.pageNum, this.listQuery.pageSize, this.listQuery.keyword)
        if(result.status == 0){
          this.listLoading = false;
          this.list = result.data
          this.total = result.total
        }
      },
      async getForeignList() {
        let results = await getAllForeign()
        if(results.status == 0){
          this.allForeign = results.data
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
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateSubject(this.subject.id,this.subject).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            addSubject(this.subject).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          }
        })
      },
      addSubject() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.subject = Object.assign({},defaultSubject);
      },
      handleRemove(file, fileList) {
      console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 张图片，本次选择了 ${files.length} 张图片，共选择了 ${files.length + fileList.length}  张图片`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handle_success(res){
        console.log(res);
      },
      focusInputEnter(){
        this.handleSearchList()
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
        updateStatus(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
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
        this.subject = Object.assign({},row);

      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该课程', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSubject(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
    },
  }
</script>

<style>

</style>