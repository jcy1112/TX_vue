<template>
  <div class="font">
    <div class="pad">
      <b>您好！{{ user.nickname }}</b>
    </div>
    <el-card>
      欢迎使用本系统
      <el-divider />
      兔年大吉
    </el-card>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      //user: this.$store.state.user ? JSON.parse(this.$store.state.user) : {},
    }
  }
}
</script>

<style scoped>
.font{
  color: #666;
  font-size: 14px;
}
.pad{
  padding-bottom: 20px;
}
</style>
