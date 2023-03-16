<template>
  <div class="background">
<!--    头部-->
    <div class="header">
      <div class="h1">
        <div class="h2">
          <img src="../../assets/logo1.jpg" alt="" class="img">
        </div>
        <div class="h3">欢迎来到阅淘书城</div>
      </div>
      <div class="h3">
        <el-menu :default-active="$route.path" class="el-menu-demo menu" mode="horizontal" router >
          <el-menu-item index="/front/home">首页</el-menu-item>
          <el-menu-item index="/front/cart">我的购物车</el-menu-item>
          <el-menu-item index="/front/orders">我的订单</el-menu-item>
        </el-menu>
      </div>
      <div class="h4">
        <div v-if="!user.username" class="h5">
          <el-button @click="$router.push('/login')">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </div>
        <div v-else>
          <el-dropdown class="dropdown">
            <div class="display">
              <img :src="user.avatarUrl" alt=""
                   class="avatar">
              <span>{{ user.nickname }}</span><i class="el-icon-arrow-down arrow" ></i>
            </div>
            <el-dropdown-menu slot="dropdown" class="person">
              <el-dropdown-item class="text">
                <router-link to="/front/password">修改密码</router-link>
              </el-dropdown-item>
              <el-dropdown-item class="text">
                <router-link to="/front/person">个人信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item class="text">
                <span class="logout" @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="router">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Front",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  mounted() {

  },
  methods: {
    logout() {
      this.$store.commit("logout")
      this.$message.success("退出成功")
    }
  }
}
</script>

<style scoped>
.background{
  background-color:darkgray;
  min-height: 100vh;
}
.header{
  display: flex;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #eee;
  background: white;
}
.h1{
  width: 350px;
  display: flex;
  padding-left: 10px;
}
.h2{
  width: 60px;
}
.h3{
  flex: 1;
}
.h4{
  width: 200px;
}
.h5{
  text-align: right;
  padding-right: 30px;
}
.img{
  width: 50px;
  position: relative;
  top: 5px;
  right: 0;
  border-radius: 50%;
}
.menu{
  border: none;
  height: 59px;
}
.dropdown{
  width: 150px;
  cursor: pointer;
  text-align: right;
}
.display{
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
.person{
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
.router{
  width: 1000px;
  margin: 0 auto;
  padding-bottom: 100px;
}
.item{
  display: inline-block;
  width: 100px;

  text-align: center;
  cursor: pointer
}
.item a {
  color: 	#1E90FF;
}
.item:hover{
  background-color: 	LightPink;
}
</style>
