<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true"
          >添加信息</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180">
      </el-table-column>
      <el-table-column prop="sex" label="性别" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="住址" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" sortable width="180">
      </el-table-column>
      <el-table-column prop="birth" label="生日" sortable width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <template>
            <el-popconfirm
              title="确定要删除吗？"
              @confirm="delHandle(scope.row.id)"
            >
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 会话框 -->
    <el-dialog title="请输入信息：" :visible.sync="dialogVisible" width="600px">
      <el-form
        :model="editFrom"
        :rules="editFromRules"
        ref="editFrom"
        label-width="100px"
        class="demo-editFrom"
        :before-close="handleClose"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editFrom.sex"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="editFrom.address"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="editFrom.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日" required>
          <el-col :span="11">
            <el-form-item prop="birth">
              <el-date-picker
                type="date"
                placeholder="生日日期"
                v-model="editFrom.birth"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editFrom')"
            >添加记录</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      dialogVisible: false, //会话框是否显示
      editFrom: {},
      editFromRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        address: [{ required: true, message: "请输入住址", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        birth: [{ required: true, message: "请选择生日日期", trigger: "blur" }],
      },
      tableData: [
        {
          id: "1",
          name: "kamisora",
          sex: "男",
          address: "上海市普陀区金沙江路 1518 弄",
          phone: "11111111111",
          birth: "2022-04-25",
        },
      ],
      loginStatus: {
        isLogin: 400,
        username: "",
      },
    };
  },
  methods: {
    //校验token
    postToken() {
      this.$axios
        .post("/user/token")
        .then((res) => {})
        .catch((err) => {
          console.error(err);
        });
    },
    //获取数据表的信息
    getUserMessage() {
      this.$axios
        .get("/system/userMessage")
        .then((res) => {
          this.tableData = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("用户信息获取失败！");
        });
    },
    //新增数据
    submitForm(editFrom) {
      //首先进行校验,校验通过后进行提交
      this.$refs[editFrom].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/system/insertUsers?" + this.$qs.stringify(this.editFrom))
            .then((res) => {
              this.$message({
                message: "用户添加成功！",
                type: "success",
                // //在消息弹窗关闭时，顺便更新数据(这个还是不加比较好，不然用户体验很差，要等上两秒才刷新)
                // onClose: () => {
                //   this.getUserMessage();
                // },
              });
              this.getUserMessage();
            })
            .catch((err) => {
              console.error(err);
              this.$message.error("添加失败，发生未知错误！");
            });
        } else {
          console.log("error submit!!");
          this.$message.error("添加失败，请检查是否填写完全！");
          return false;
        }
      });
    },
    //重置之前的表
    reseatForm(editFrom) {
      this.$refs[editFrom].resetFields();
      this.dialogVisible = false;
      this.editFrom = {};
    },
    handleClose() {
      this.reseatForm("editFrom");
    },
    //删除表格信息
    delHandle(id) {
      this.$axios
        .post("/system/delete?id=" + id)
        .then((res) => {
          this.$message({
            message: "删除成功，等待刷新！",
            type: "success",
            //在消息弹窗关闭时，顺便更新数据
            // onClose: () => {
            //   this.getUserMessage();
            // },
          });
          this.getUserMessage(); //让它直接刷新好一点
        })
        .catch((err) => {
          this.$message.error("发生错误，无法删除！");
        });
    },
  },
  created() {
    this.postToken();
    this.getUserMessage();
  },
};
</script>
<style>
</style>