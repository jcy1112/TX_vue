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
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/lun">
        <i class="el-icon-picture"></i>
        <span slot="title">轮播图管理</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goods">全部商品</el-menu-item>
          <el-menu-item index="/onshelves">已上架商品</el-menu-item>
          <el-menu-item index="/upshelves">已下架商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/orders">全部订单</el-menu-item>
          <el-menu-item index="1-2">已完成订单</el-menu-item>
          <el-menu-item index="1-3">待发货订单</el-menu-item>
          <el-menu-item index="1-4">待收货订单</el-menu-item>
          <el-menu-item index="1-4">待付款订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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
