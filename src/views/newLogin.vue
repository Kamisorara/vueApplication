<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xl="6" :lg="7">
        <h1>欢迎来到wyf的黑心网站</h1>
        <el-image
          :src="require('../assets/head.png')"
          style="
            height: 180px;
            width: 180px;
            margin-top: 30px;
            margin-bottom: 30px;
          "
        ></el-image>
        <p>本网站纯属娱乐</p>
        <div class="grid-content bg-purple"></div>
      </el-col>

      <el-col :span="1">
        <el-divider direction="vertical"></el-divider>
      </el-col>
      <el-col :span="6">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-loginForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginForm.username"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              style="width: 300px"
              type="password"
              @keyup.enter.native="submitForm('loginForm')"
            ></el-input>
          </el-form-item>
          <el-link type="primary" @click="toRegister"
            >没有账号？点击注册</el-link
          >
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "newLogin",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        token: "",
      },
      loginStatus: {
        isLogin: 400,
        username: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6个字符以上", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/user/login?" + this.$qs.stringify(this.loginForm))
            .then((res) => {
              //访问成功之后获取jwt
              // const jwt = res.headers["authorization"];
              const jwt = res.data.token;
              this.$store.commit("SET_TOKEN", jwt);
              this.$store.commit("SAVE_USERNAME", this.loginForm.username);
              this.$message({
                message: "登录成功，即将跳转登录！",
                type: "success",
              });
              setTimeout(() => {
                //需要延迟的代码 :1秒后延迟跳转到首页，可以加提示什么的
                this.$router.push("/index");
                //延迟时间：1秒
              }, 1000);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //判断登录情况
    judge() {
      if (this.loginStatus.isLogin === 200) {
        this.$router.push("/index");
      } else {
        this.$router.push("/");
      }
    },
    //清除localStorage中的token 和userName
    clearMethod() {
      localStorage.clear();
      sessionStorage.clear();
    },
    //递交给token 验证登陆
    postToken() {
      this.$axios
        .post("/user/token")
        .then((res) => {
          this.loginStatus.isLogin = res.data.code;
          this.loginForm.username = res.data.userInfo[1];
          this.$store.commit("SAVE_USERNAME", res.data.userInfo[1]);
          this.judge();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //跳转注册界面
    toRegister() {
      this.$router.push("/register");
    },
  },
  created() {
    this.postToken();
  },
};
</script>
<style>
.el-row {
  background-color: #fafafa;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
}
.el-divider {
  height: 250px;
}
.el-link {
  margin-left: 100px;
  margin-bottom: 10px;
}
</style>