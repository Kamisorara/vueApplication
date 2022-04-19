<template>
  <el-container>
    <el-header>
      <label style="font-size: 40px">{{ name }}的个人界面</label>
      <el-dropdown style="font-size: 40px">
        <i class="el-icon-s-home" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="tohome">返回首页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>个人信息</span>
            </template>
            <el-menu-item index="1-1">查看个人信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-descriptions class="margin-top" :size="size" border>
          <template slot="extra"> </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            18100000000
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="open"
            ></el-button>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              居住地
            </template>
            苏州市
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              备注
            </template>
            <el-tag size="small">哈哈哈哈</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              联系地址
            </template>
            江苏省苏州市吴中区吴中大道 1188 号
          </el-descriptions-item>
        </el-descriptions>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {
      username: "",
      phone: "",
      place: "",
      note: "",
      detailedAddr: "",
      login_status: 400,
    };
  },
  methods: {
    tohome() {
      this.$router.push("/");
    },
    open() {
      this.$prompt("请输入手机号:", "请输入以下信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern:
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        inputErrorMessage: "手机号格式不正确",
      })
        .then(({ value }) => {
          this.phone = value;
          this.$message({
            type: "success",
            message: "你修改的手机号是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 100px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 80px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>