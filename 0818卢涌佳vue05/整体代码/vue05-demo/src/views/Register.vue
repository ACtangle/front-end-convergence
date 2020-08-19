<template>
  <div class="loginContainer">
    <el-form class="registerForm" :model="registerForm" ref="registerFormRef">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input type="password" v-model="registerForm.repassword"></el-input>
      </el-form-item>
      <el-button type="primary" @click="register">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        name: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    async register() {
      if (this.password === this.repassword) {
        const result = await this.$http.post('/api/register', this.registerForm)
        console.log(result)
        console.log('注册成功')
        this.$router.push('/')
        return
      }
      console.log('两次密码不一致，请重新输入')
    }
  }
}
</script>

<style lang="less" scoped>
.loginContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  background: #eee;
  width: 400px;
  height: 400px;
  transform: translate(-50%, -50%);
  .registerForm {
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    padding: 10px;
  }
}
</style>