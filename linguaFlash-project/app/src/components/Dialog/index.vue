<template>
    <el-dialog width="30%" :title="'请选择你的'+this.titlename+'模式'" :visible.sync="dialogFormVisible" :modal-append-to-body='false' @close="closeDialog" :append-to-body="true">
        <el-form :model="form">
        <el-form-item label="主题课程" :label-width="formLabelWidth">
            <el-select v-model="form.subject" placeholder="主题课程现默认为全部" disabled >
                <el-option label="全部" value="all" selected></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="单词数量" :label-width="formLabelWidth">
            <el-select v-if="this.titlename == '复习'" v-model="form.wordsNumber" placeholder="请选择单词数量">
                <el-option label="全部" value="all"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="10" value="10"></el-option>
            </el-select>
            <el-select v-else-if="this.titlename == '学习'" v-model="form.studyMoreNumber" placeholder="请选择数量">
                <el-option label="全部" value="all"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="10" value="10"></el-option>
            </el-select>
            <el-select v-else v-model="form.spellPlan" placeholder="请选择数量">
                <el-option label="全部" value="all"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="10" value="10"></el-option>
            </el-select>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeDialog();passData();">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {setModuleSwitch, clearModuleSwitch, getModuleSwitch} from '../../utils/moduleSwitch'
export default {
    props: {
        dialogShow: {
            type: Boolean,
            default: false
        },
        titlename: {
            type: String,
            default: '复习'
        }
    },
    name:'Dialog',
    data() {
        return {
            form: {
                subject: '',
                wordsNumber: '',
                studyMoreNumber:'',
                spellPlan:'',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            dialogFormVisible: this.dialogShow,
            formLabelWidth: '120px'
        }
    },
    watch: {
        dialogShow(val) {
            this.dialogFormVisible = val
        }
    },
    methods: {
        closeDialog() {
            this.$emit('dialogShowChange', false)
        },
        passData(){
            if(this.form.wordsNumber && this.form.wordsNumber !== ''){
                this.$emit('parameters',{wordsNumber:this.form.wordsNumber, changeModule:true,ModuleSwitch:"true",indexReview:0})
            }else if(this.form.studyMoreNumber && this.form.studyMoreNumber !== ''){
                this.$emit('studyMoreWord',{studyMoreNumber:this.form.studyMoreNumber})
            }else if(this.form.spellPlan && this.form.spellPlan !== ''){
                this.$emit('spellPlanData',{spellPlan:this.form.spellPlan})
            }
        },
        // changeSwitch(){
        //     if(this.form.wordsNumber){
        //         setModuleSwitch('true')
        //     }
        // }
    }
}
</script>

<style>

</style>