<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <div class="passtitle">修改当前管理员密码</div>
        <div class="passtip">修改成功会自动退出当前登录</div>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <el-steps style="margin-top: 30px;" :active="active" finish-status="success" space="40%" align-center>
        <el-step title="当前密码"></el-step>
        <el-step title="新密码"></el-step>
        <el-step title="确认密码"></el-step>
      </el-steps>
      <el-form
        :model="resetPassword"
        ref="resetPassword"
        label-width="150px"
        size="small"
        :rules="resetPasswordRules"
        style="margin-top: 30px;"
      >
        <el-form-item label="当前密码："  prop="oldPwd">
          <el-input type="password" v-model="resetPassword.oldPwd" style="width: 90%" clearable show-password size="medium" ref="oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd">
          <el-input type="password" v-model="resetPassword.newPwd" style="width: 90%" clearable show-password size="medium" ref="newPwd" @focus="newPwdFocus()"></el-input>
        </el-form-item>
        <el-form-item label="密码强度：">
          <password-strength v-model="resetPassword.newPwd" style="padding-top: 10px;"></password-strength>
        </el-form-item>
        <el-form-item label="确认密码：" prop="renewPwd">
          <el-input type="password" v-model="resetPassword.renewPwd" style="width: 90%" clearable show-password size="medium" @focus="renewPwdFocus()"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="12" style="text-align:right;margin-right:10px"><el-button  @click="handleResetForm('resetPassword')" size="small">重 置</el-button></el-col>
        <el-col :span="11" style="text-align:left;"><el-button type="primary" @click="handleConfirm('resetPassword')" size="small"
          >确 定</el-button></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import PasswordStrength from "@/components/drag/PasswordStrength.vue";
import { updatePassword } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
    name:'Pass',
    components:{PasswordStrength},
    data() {
      var regexPasswordCode = /^[\w!-@#$%^&*]{6,16}$/;
      var validatePass1 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入旧密码'));
          this.active = 0
        } else if (!regexPasswordCode.test(value)) {
          callback(new Error('密码长度为6 - 16个字符'))
          this.active = 0
        } else {
          callback();
          this.active = 1
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (!this.resetPassword.oldPwd) {
          callback(new Error('请先输入旧密码'));
          this.active = 0
        } else if (!value) {
          callback(new Error('请输入新密码'));
          this.active = 1
        } else if (!regexPasswordCode.test(value)) {
          callback(new Error('密码长度为6 - 16个字符'))
          this.active = 1
        } else if (value === this.resetPassword.oldPwd) {
          callback(new Error('新密码不能和旧密码一样!'));
          this.active = 1
        } else {
          callback();
          this.active = 2
        }
      };

      var validatePass3 = (rule, value, callback) => {
        if (!this.resetPassword.newPwd) {
          callback(new Error('请先输入新密码'));
          this.active = 1
        } else if (value === '') {
          callback(new Error('请再次输入密码'));
          this.active = 2
        } else if (value !== this.resetPassword.newPwd) {
          callback(new Error('两次输入密码不一致!'));
          this.active = 2
        } else {
          callback();
          this.active = 3
        }
      };

      return {
        active: 0,
        resetPassword: {
          oldPwd:'',
          newPwd:'',
          renewPwd:'',
        },
        resetPasswordRules: {
          oldPwd: [
              { required: true, validator: validatePass1, trigger: 'blur' }
          ],
          newPwd: [
              { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          renewPwd: [
              { required: true, validator: validatePass3, trigger: 'blur' }
          ]
        },
      };
    },

    methods: {
      next() {
        if (this.active++ == 2) {
          this.active = 0
        } else {

        }
      },
      newPwdFocus() {
        if (!this.resetPassword.oldPwd) {
          this.$refs.oldPwd.focus()
        } 
      },
      renewPwdFocus() {
        if (!this.resetPassword.newPwd) {
          this.$refs.newPwd.focus()
        } 
      },
      handleResetForm(resetPassword) {
        this.$confirm("是否要重置?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          }).then(() => {
            this.$refs[resetPassword].resetFields();
            this.active = 0
        })
      },
      handleConfirm(resetPassword) {
        this.$confirm("是否要确定?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          }).then(() => {
            this.$refs[resetPassword].validate((valid) => {
              if (valid) {
                updatePassword({oldPwd: this.resetPassword.oldPwd, newPwd: this.resetPassword.newPwd}).then((response) => {
                  this.$message({
                    message: "修改密码成功！",
                    type: "success",
                  });
                  removeToken()
                  this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                })
              } else {
                console.log('error submit!!');
                this.$message({
                    message: "修改密码失败！",
                    type: "error",
                  });
                return false;
              }
              
            
          })
            
        })
      }
    }
}
</script>

<style scoped>
.passtitle{
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
}
.passtip{
  font-size: 14px;
  color: gray;
}
</style>