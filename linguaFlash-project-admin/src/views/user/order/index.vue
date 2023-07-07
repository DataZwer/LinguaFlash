<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span> 筛选搜索</span>
          <el-button
            style="float: right"
            
            type="primary"
            size="small">
            查询结果
          </el-button>
          <el-button
          style="float:right;margin-right: 15px"
          size="small">
          重置
        </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true"  size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input style="width: 203px"  placeholder="品牌名称/关键字"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    order
  </div>
</template>

<script>
export default {
    name: 'Order',
}
</script>

<style>

</style>