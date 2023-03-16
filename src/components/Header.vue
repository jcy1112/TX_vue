<template>
  <div class="header">
    <div class="h1">
      <span :class="collapseBtnClass" class="h2" @click="collapse"></span>
      <el-breadcrumb separator="/" class="h3">
        <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown class="h4">
      <div class="h5">
        <img :src="user.avatarUrl" alt=""
             class="avatar">
        <span>{{ user.nickname }}</span><i class="el-icon-arrow-down arrow" ></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="dropdown">
        <el-dropdown-item class="text">
          <router-link to="/password">修改密码</router-link>
        </el-dropdown-item>
        <el-dropdown-item class="text">
          <router-link to="/person">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item class="text">
          <span class="logout" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    user: Object
  },
  computed: {
    currentPathName () {
      return this.$store.state.currentPathName;　　//需要监听的数据
    }
  },
  data() {
    return {

    }
  },
  methods: {
    collapse() {
      this.$emit("asideCollapse")
    },
    logout() {
      this.$store.commit("logout")
      this.$message.success("退出成功")
    }
  }
}
</script>

<style scoped>
.header{
  line-height: 60px;
  display: flex;
}
.h1{
  flex: 1;
}
.h2{
  cursor: pointer;
  font-size: 18px;
}
.h3{
  display: inline-block;
  margin-left: 10px;
}
.h4{
  width: 150px;
  cursor: pointer;
  text-align: right;
}
.h5{
  display: inline-block;
}
.avatar{
  width: 25px;
  border-radius: 30%;
  position: relative;
  top: 10px;
  right: 5px;
}
.arrow{
  margin-left: 5px;
}
.dropdown{
  width: 100px;
  text-align: center;
}
.text{
  font-size: 14px;
  padding: 5px 0;
}
.logout{
  text-decoration: none;
}
</style>
