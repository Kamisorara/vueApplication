<template>
  <div>
    <h1 style="color: red">正在开发当中 部分功能尚未开发完全</h1>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      loginStatus: {
        isLogin: 400,
        username: "",
      },
    };
  },
  methods: {
    postToken() {
      this.$axios
        .post("/user/token")
        .then((res) => {
          console.log(res);
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
</style>