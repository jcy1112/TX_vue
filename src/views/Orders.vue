<template>
  <div>
    <div class="margin">
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
      >
        <el-button type="danger" size="small" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>

    <el-table :data="tableData" size="small" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <el-table-column prop="orderno" label="订单编号"></el-table-column>
      <el-table-column prop="total" label="总金额" width="100" ></el-table-column>
      <el-table-column prop="userid" label="用户id" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template v-slot="scope">
          <el-tag type="info" v-if="scope.row.status === 0">已取消</el-tag>
          <el-tag type="warning" v-if="scope.row.status === 1">待支付</el-tag>
          <el-tag type="primary" v-if="scope.row.status === 2">待发货</el-tag>
          <el-tag type="primary" v-if="scope.row.status === 3">待收货</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 4">待评价</el-tag>
          <el-tag type="success" v-if="scope.row.status === 5">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="payno" label="付款编号"></el-table-column>
      <el-table-column prop="address" label="收货地址"></el-table-column>

      <el-table-column label="查看详情"  width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="Det(scope.row.id)">查看订单详情 <i class="el-icon-edit"></i></el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作"  width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="changeStatus(scope.row, 2)" v-if="scope.row.status === 1">发货</el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" size="small" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
      <template>
        <el-table
            :data="itemTableData"
            stripe
            class="itemTable">
          <el-table-column
              prop="goodsName"
              label="商品名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="num"
              label="商品数量"
              width="180">
          </el-table-column>
          <el-table-column
              prop="price"
              label="价格">
          </el-table-column>
        </el-table>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="ret">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      tableData: [],
      itemTableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",
      form: {},
      dialogFormVisible: false,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    changeStatus(row, status) {   //修改订单状态
      row.status = status
      this.request.post("/orders/status", row).then(res => {
        if (res.code === '200') {
          this.$message.success("操作成功")
          this.load()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    load() {
      this.request.get("/orders/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    Det(id) {   //查看订单详情
      this.dialogFormVisible = true
      this.request.get("/item/" + id).then(res => {
        this.itemTableData = res.data
      })
    },
    del(id) {    //删除
      this.request.delete("/orders/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {   //多选框
      console.log(val)
      this.multipleSelection = val
    },
    delBatch() {  //批量删除
      if (!this.multipleSelection.length) {
        this.$message.error("请选择需要删除的数据")
        return
      }
      let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      this.request.post("/orders/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    ret(){
      this.load()
      this.dialogFormVisible = false
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
.page{
  padding: 10px 0;
}
.itemTable{
  width: 100%;
}
.headerBg {
  background: #eee!important;
}
</style>
