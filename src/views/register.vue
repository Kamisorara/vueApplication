<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="6"
      ><div class="grid-content bg-purple">
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="registerForm"
          label-width="100px"
          class="demo-registerForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="registerForm.username"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerForm.password"
              style="width: 300px"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="再次确认" prop="password2">
            <el-input
              v-model="registerForm.password2"
              style="width: 300px"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerForm.email"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verify-code">
            <el-input
              v-model="registerForm.verify"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-button type="text" @click="submitEmail('registerForm')"
            >发送验证码</el-button
          >
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
        <el-link type="primary" @click="toLogin">已有账号？点击登录</el-link>
      </div></el-col
    >
  </el-row>
</template>

<script>
export default {
  name: "Register",
  data() {
    //校验规则(两次密码是否输入正确)
    var ValidatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再输入一次密码"));
      } else if (value != this.registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    // 邮箱校验规则
    const checkEmail = (rule, value, callback) => {
      let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (emailReg.test(value) || value == "") {
        return callback();
      } else {
        callback(new Error("邮箱格式错误"));
      }
    };
    return {
      registerForm: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6个字符以上", trigger: "blur" },
        ],
        password2: [
          { required: true, validator: ValidatePass, trigger: "blur" },
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/user/register?" + this.$qs.stringify(this.registerForm))
            .then((res) => {
              this.$message({
                message: "注册成功，即将跳转登录！",
                type: "success",
              });
              setTimeout(() => {
                //需要延迟的代码 :3秒后延迟跳转到首页，可以加提示什么的
                this.$router.push("/");
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
    submitEmail(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message("邮件请求已发出，请耐心等待");
          this.$axios
            .post("/user/verify-code?" + "email=" + this.registerForm.email)
            .then((res) => {
              this.$message({
                message: "邮件发送成功！",
                type: "success",
              });
            })
            .catch((err) => {
              this.$message.error("邮件发送失败，请检查邮箱是否填写正确！");
            });
        } else {
          console.log("邮件发送失败，请正确填写！");
          return false;
        }
      });
    },
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