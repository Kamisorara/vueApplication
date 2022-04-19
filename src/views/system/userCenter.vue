<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="5"
      ><div class="grid-content bg-purple">
        <div>
          <h2>您好，{{ loginStatus.username }}</h2>
          <el-form
            :model="resetForm"
            :rules="rules"
            ref="resetForm"
            label-width="170px"
            class="demo-resetForm"
          >
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input
                v-model="resetForm.oldPassword"
                style="width: 300px"
                type="password"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input
                v-model="resetForm.password"
                style="width: 300px"
                type="password"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="再输入一次" prop="password2">
              <el-input
                v-model="resetForm.password2"
                style="width: 300px"
                type="password"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('resetForm')"
                >修改密码</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div></el-col
    >
  </el-row>
</template>

<script>
import Element from "element-ui"; //需要进行弹窗
export default {
  name: "userCenter",
  data() {
    //校验规则
    var ValidatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再输入一次密码"));
      } else if (value != this.resetForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      submit: {
        userName: "",
        password: "",
      },
      loginStatus: {
        isLogin: 400,
        username: "",
      },
      resetForm: {
        oldPassword: "",
        password: "",
        password2: "",
        token: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6个字符以上", trigger: "blur" },
        ],
        password2: [
          { required: true, validator: ValidatePass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit.userName = this.loginStatus.username;
          this.submit.password = this.resetForm.password;
          this.$axios
            .post("/system/resetPassword?" + this.$qs.stringify(this.submit))
            .then((res) => {
              this.$message({
                message: "修改成功！",
                type: "success",
              });
            })
            .catch((err) => {
              console.error(err);
              console.error("发生未知错误！");
              this.$message.error("修改失败！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    postToken() {
      this.$axios
        .post("/user/token")
        .then((res) => {
          this.loginStatus.username = res.data.userInfo[1];
          this.$store.commit("SET_USERNAME", this.loginStatus.username);
        })
        .catch((err) => {
          console.error(err);
        });
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
  height: 100%;
  display: flex;
  align-items: left;
  text-align: left;
}
</style>