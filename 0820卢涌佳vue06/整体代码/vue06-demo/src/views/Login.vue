<template>
  <div class="loginContainer">
    <el-form class="loginForm" :model="loginForm" ref="loginFormRef">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      const result = await this.$http.post('/api/login', this.loginForm)
      window.sessionStorage.setItem('token', result.headers.authorization)
      console.log('登录成功')
      this.$router.push('/home')
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
  height: 300px;
  transform: translate(-50%, -50%);
  .loginForm {
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    padding: 10px;
  }
}
</style>
