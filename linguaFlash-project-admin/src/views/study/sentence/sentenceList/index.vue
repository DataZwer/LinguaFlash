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
              placeholder="句子(英/汉)"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span> 数据列表</span>
      <el-button class="btn-add" @click="addSentence()" size="mini">
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
      :title="isEdit ? '编辑句子' : '添加句子'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="sentenceList"
        ref="roleForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="句子：">
          <el-input
            v-model="sentenceList.En_sentence"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="翻译：">
          <el-input
            v-model="sentenceList.Ch_sentence"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="混淆选项(英)：">
          <!-- <el-input
            v-model="sentenceList.confusion_En"
            style="width: 250px"
          ></el-input> -->
          <!-- <template v-if="sentenceList.confusion_En"> -->
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <!-- </template> -->
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 混淆选项(英)</el-button
          >
        </el-form-item>
        <el-form-item label="混淆选项(中)：">
          <!-- <el-input
            v-model="sentenceList.confusion_Ch"
            type="textarea"
            :rows="3"
            style="width: 250px"
          ></el-input> -->
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags2"
            closable
            :disable-transitions="false"
            @close="handleClose2(tag)"
          >
            {{ tag }}
          </el-tag>
          <!-- </template> -->
          <el-input
            class="input-new-tag"
            v-if="inputVisible2"
            v-model="inputValue2"
            ref="saveTagInput2"
            size="small"
            @keyup.enter.native="handleInputConfirm2"
            @blur="handleInputConfirm2"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput2"
            >+ 混淆选项(中)</el-button
          >
        </el-form-item>
        <el-form-item label="所属课程：">
          <el-select
            v-model="sentenceList.category"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in allSubject"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
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
  getSentence,
  getAllSubject,
  addSentence,
  updateSentence,
  deleteSentence,
} from "@/api/study/sentence";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};

const defaultSentence = {
  id: null,
  En_sentence: null,
  Ch_sentence: null,
  confusion_En: null,
  confusion_Ch: null,
  category: 1,
};

export default {
  name: "SentenceList",
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
      sentenceList: Object.assign({}, defaultSentence),
      isEdit: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      dynamicTags2: [],
      inputVisible2: false,
      inputValue2: "",
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
        if(this.isEdit == true){
            if(this.sentenceList.confusion_En){
                this.dynamicTags = this.sentenceList.confusion_En.split(' ')
            }
            if(this.sentenceList.confusion_Ch){
                this.dynamicTags2 = this.sentenceList.confusion_Ch.split(' ')
            }
        }else{
            this.dynamicTags = []
            this.dynamicTags2 = []
        }
        this.getSubjectList();
      } else {
        this.dynamicTags = []
        this.dynamicTags2 = []
        this.allSubject = null;
      }
    },
    // isEdit(newvalue) {
    //     if(newvalue == true){
    //         this.dynamicTags = this.sentenceList.confusion_En.split(' ')
    //     }
    //     if(newvalue == false){
    //         this.dynamicTags = []

    //     }
    // }
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
      let result = await getSentence(
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
            this.sentenceList.confusion_En = this.dynamicTags.join(' ')
            this.sentenceList.confusion_Ch = this.dynamicTags2.join(' ')
          updateSentence(this.sentenceList.id, this.sentenceList).then(
            (response) => {
              this.$message({
                message: "修改成功！",
                type: "success",
              });
              this.dialogVisible = false;
              this.getList();
            }
          );
        } else {
            // console.log(this.sentenceList.confusion_En);
            this.sentenceList.confusion_En = this.dynamicTags.join(' ')
            this.sentenceList.confusion_Ch = this.dynamicTags2.join(' ')
            // console.log(this.sentenceList.confusion_En);
            // console.log(this.sentenceList.confusion_Ch);
          addSentence(this.sentenceList).then((response) => {
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
    addSentence() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.sentenceList = Object.assign({}, defaultSentence);
    },
    focusInputEnter() {
      this.handleSearchList();
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      // this.admin = Object.assign({},row);
      this.sentenceList = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该单词", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteSentence(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleClose2(tag) {
      this.dynamicTags2.splice(this.dynamicTags2.indexOf(tag), 1);
    },

    showInput2() {
      this.inputVisible2 = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput2.$refs.input.focus();
      });
    },

    handleInputConfirm2() {
      let inputValue2 = this.inputValue2;
      if (inputValue2) {
        this.dynamicTags2.push(inputValue2);
      }
      this.inputVisible2 = false;
      this.inputValue2 = "";
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