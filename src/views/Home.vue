<template>
  <el-container>
    <el-aside width="200px">
      <!-- 引用 -->
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header
        ><strong>black后台管理系统</strong>
        <div class="header-avatar">
          <el-avatar :src="userInfo.avatar"></el-avatar>

          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.username
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{ name: 'SysUserCenter' }">
                  个人中心
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 让Index页面显示出来 -->
        <div style="margin: 0 5px">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "./inc/SideMenu"; //引用

export default {
  components: { SideMenu },
  name: "Home",
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    //获取用户名
    getUserInfo() {
      this.userInfo.username = localStorage.getItem("userName");
    },
    logout() {
      this.$axios
        .get("/user/logout")
        .then((res) => {
          this.clearMethod();
          this.$store.commit("resetState"); //调用store里面的方法来清空token
          this.$router.push("/");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //清除localStorage中的token 和userName
    clearMethod() {
      localStorage.clear();
      sessionStorage.clear();
    },
  },
};
</script>
<style>
.header-avatar {
  float: right;
  display: flex;
  width: 180px;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
}

.el-header {
  background-color: #35ace8;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 160px;
}
a {
  text-decoration: none;
}
</style>