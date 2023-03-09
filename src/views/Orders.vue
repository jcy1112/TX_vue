<template>
  <div>

    <div style="margin: 10px 0">
<!--      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>-->
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
      >
        <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <!-- <el-upload action="http://localhost:9090/orders/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" @click="exp" class="ml-5">导出 <i class="el-icon-top"></i></el-button> -->
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <el-table-column prop="orderno" label="订单编号"></el-table-column>
      <el-table-column prop="total" label="总金额" width="100" ></el-table-column>
      <el-table-column prop="userid" label="用户id" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template v-slot="scope">
          <el-tag type="primary" v-if="scope.row.status === 1">待发货</el-tag>
          <el-tag type="primary" v-if="scope.row.status === 2">待收货</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 3">待评价</el-tag>
          <el-tag type="success" v-if="scope.row.status === 4">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="payno" label="付款编号"></el-table-column>
      <el-table-column prop="address" label="收货地址"></el-table-column>

      <el-table-column label="查看详情"  width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="Det(scope.row.id)">查看订单详情 <i class="el-icon-edit"></i></el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作"  width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="changeStatus(scope.row, 2)" v-if="scope.row.status === 1">发货</el-button>
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
    <div style="padding: 10px 0">
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
            :data="tabledata"
            stripe
            style="width: 100%">
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
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="ret">确 定</el-button>
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
      tabledata: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",
      form: {},
      dialogFormVisible: false,
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    changeStatus(row, status) {
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
    save() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.request.post("/orders", this.form).then(res => {
              if (res.code === '200') {
                this.$message.success("保存成功")
                this.dialogFormVisible = false
                this.load()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
      this.$nextTick(() => {
        if(this.$refs.img) {
           this.$refs.img.clearFiles();
         }
         if(this.$refs.file) {
          this.$refs.file.clearFiles();
         }
      })
    },
    Det(id) {
      this.dialogFormVisible = true
      this.request.get("/item/" + id).then(res => {
        this.tabledata = res.data
      })
       //   this.$nextTick(() => {
       //   if(this.$refs.img) {
       //     this.$refs.img.clearFiles();
       //   }
       //   if(this.$refs.file) {
       //    this.$refs.file.clearFiles();
       //   }
       // })
    },
    del(id) {
      this.request.delete("/orders/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    delBatch() {
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
    reset() {
      this.name = ""
      this.load()
    },
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
    handleFileUploadSuccess(res) {
      this.form.file = res
    },
    handleImgUploadSuccess(res) {
      this.form.img = res
    },
    download(url) {
      window.open(url)
    },
    exp() {
      window.open("http://localhost:9090/orders/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
    }
  }
}
</script>


<style>
.headerBg {
  background: #eee!important;
}
</style>
