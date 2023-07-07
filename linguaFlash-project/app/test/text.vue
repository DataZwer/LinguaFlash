<template>
    <el-container>
        <el-header class="main-header">单词考试</el-header>
        <el-main>
            <h1>CN：{{ this.CNText() }} </h1>
            <el-row :gutter="20">
                <el-col :span="6" :offset="9">
                    <div class="grid-content bg-purple">
                        <el-input placeholder="请输入内容" v-model="inputEnValue" @keyup.enter.native="focusInputEnter">
                            <template slot="prepend">EN:</template>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px">
                <el-button type="primary"
                           round
                           :disabled="btnDisabledBoolean"
                           @click="submitBtn"><i class="el-icon-s-promotion"></i>提交数据</el-button>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    // 获取json数据
    import wordJson from '../assets/word.json';
    // 获取基于wordJson文件的随机数据
    const GlobalOrderArray = randomArray(wordJson.word);

    export default {
        name: "WordMain",
        data: function () {
            return {
                indexNumber: 0,
                inputEnValue: '',
                btnDisabledBoolean: false
            }
        },
        methods: {
            CNText: function(){
                return wordJson.word[GlobalOrderArray[this.indexNumber]].cn;
            },
            focusInputEnter: function(){
                this.submitBtn();
            },
            submitBtn: function () {
                //  当最后一题时，弹窗提示，同时按钮置为不可点击
                if(GlobalOrderArray.length - 1 == this.indexNumber){
                    this.$message({
                        message: '恭喜你，完成了全部回答',
                        type: 'success'
                    });
                    this.btnDisabledBoolean = true;
                    return;
                }
                if(wordJson.word[GlobalOrderArray[this.indexNumber]].en == this.inputEnValue){
                    this.indexNumber++;
                    // 判断当中英文匹配正确时弹出 “回答正确” 消息
                    this.successMessageLayer();
                } else {
                    //  判断中英文匹配错误时，弹出信息窗
                    this.errorMessageLayer();
                }
                // 无论回答正确还是错误输入框置空
                this.inputEnValue = '';
            },
            successMessageLayer: function () {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: `<i class="el-icon-coordinate"></i>回答正确`,
                    type: 'success'
                });
            },
            errorMessageLayer: function () {
                this.$confirm('是否再回答一次?', '提示', {
                    confirmButtonText: '取消',
                    cancelButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'error',
                        message: '回答错误!'
                    });
                    const h = this.$createElement;
                    this.$notify({
                        title: '正确答案',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>中文：</strong><u>'+ wordJson.word[GlobalOrderArray[this.indexNumber]].cn + '</u>  <strong>英文翻译：</strong><u>'+ wordJson.word[GlobalOrderArray[this.indexNumber]].en + '</u>'
                    });
                    this.indexNumber++;
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '请再次回答~'
                    });
                });
            },
        }
    }

    /**
     * 创建返回随机数组
     * */
    function randomArray(args) {
        let orderArrayLength = args.length;
        // 创建一个长度为orderArrayLength的从 0 ~ orderArrayLength-1 的数组
        let orderArray = Array.apply(null, { length: orderArrayLength }).map((item,index)=>{
            return index;
        });
        // 打乱上述数组
        return orderArray.sort(() => Math.random() - 0.5).slice(0, orderArrayLength);
    }
</script>

<style scoped>
.main-header{
    font-size: 30px;
    border-bottom: 1px solid #ddd;
}
</style>
