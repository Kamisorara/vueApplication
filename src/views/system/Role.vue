<template>
  <div>
    <h1 style="color: red">正在开发当中</h1>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      loginStatus: {
        isLogin: 400,
        username: "",
      },
    }
  },
  methods: {
    postToken() {
      this.$axios
        .post("/user/token")
        .then((res) => {
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