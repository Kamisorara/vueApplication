<template>
  <el-menu
    default-active="0"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <router-link to="/index">
      <el-menu-item index="0">
        <template slot="title">
          <i class="el-icon-house"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
    </router-link>
    <el-submenu
      :index="menu.name"
      v-for="(menu, index) in menuList"
      :key="index"
    >
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </template>
      <router-link
        :to="item.path"
        v-for="(item, index) in menu.children"
        :key="index"
      >
        <el-menu-item :index="item.name">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </router-link>
      <!-- <router-link to="/system/roles">
        <el-menu-item index="1-2">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span>信息管理</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/system/menu">
        <el-menu-item index="1-3">
          <template slot="title">
            <i class="el-icon-loading"></i>
            <span>好康的东西</span>
          </template>
        </el-menu-item>
      </router-link> -->
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      menuList: [
        {
          title: " 系统管理",
          name: "SysManage",
          icon: "el-icon-setting",
          path: "",
          children: [
            {
              title: "用户管理",
              name: "SysUser",
              icon: "el-icon-user",
              path: "/system/users",
              children: [],
            },
            {
              title: "信息管理",
              name: "SysMenu",
              icon: "el-icon-edit",
              path: "/system/menu",
              children: [],
            },
            {
              title: "修改密码",
              name: "SysUserCente",
              icon: "el-icon-loading",
              path: "/system/userCenter",
              children: [],
            },
          ],
        },
        {
          title: "图书管理",
          name: "SysBookManage",
          icon: "el-icon-notebook-1",
          path: "/system/userCenter",
          children: [
            {
              title: "图书借阅",
              name: "SysBooks",
              icon: "el-icon-house",
              path: "/system/roles",
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>
<style>
.el-menu-vertical-demo {
  height: 100vh;
}
</style>