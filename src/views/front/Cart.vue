<template>
  <div class="margin">
    <el-table :data="tableData" stripe size="medium"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="img" label="图片">
        <template v-slot="scope">
          <el-image :src="scope.row.img" class="img"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="goodName" label="商品名称"></el-table-column>
      <el-table-column prop="num" label="商品数量">
      </el-table-column>
      <el-table-column prop="price" label="商品单价"></el-table-column>
      <el-table-column label="操作"  width="180" align="center">
        <template slot-scope="scope">
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>

    <div class="menu">
      <div class="color"> 总价 ￥{{ totalPrice }}</div>
      <div class="margin">
        <el-button class="order" @click="adaOrder">下单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      form: {},
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      totalPrice: 0
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    adaOrder() {    //下单
      if (!this.multipleSelection.length) {
        this.$message.error("下单失败，未选择商品")
        return
      }
      this.request.post("/orders/addOrder", this.multipleSelection).then(res => {
        if (res.code === '200') {
          this.$message.success("下单成功")
          this.load()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    load() {
      this.request.get("/cart/personCart").then(res => {
        this.tableData = res.data.list
      })
    },
    del(id) {   //删除
      this.request.delete("/cart/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {   //多选框
      this.multipleSelection = val
      this.request.post("/cart/cal", val).then(res => {
        this.totalPrice = res.data
      })
    },
    //分页相关
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
  }
}
</script>


<style scoped>
.margin{
  margin: 10px 0;
}
.img{
  width: 100px;
  height: 100px;
}
.page{
  padding: 10px 0;
}
.menu{
  padding: 10px 20px;
  background-color: white;
  margin: 10px 0;
  text-align: right;
  border-radius: 10px;
}
.color{
  color: red;
}
.order{
  background-color: red;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
}
.headerBg {
  background: #eee!important;
}
</style>
