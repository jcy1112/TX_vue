<template>
  <el-menu :default-openeds="['1', '3']" class="menu"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div class="header">
      <img src="../assets/logo.png" alt="" class="img">
      <b class="color" v-show="logoTextShow">后台管理系统</b>
    </div>
    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/orders">
        <i class="el-icon-s-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/lun">
        <i class="el-icon-picture"></i>
        <span slot="title">轮播图管理</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  }
}
</script>

<style scoped>
.menu{
  min-height: 100%;
  overflow-x: hidden;
}
.header{
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.img{
  width: 20px;
  position: relative;
  top: 5px;
  right: 5px;
}
.color{
  color: white;
}
</style>
