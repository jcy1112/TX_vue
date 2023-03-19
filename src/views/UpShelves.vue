<template>
  <div>
    <div class="margin">
      <el-input class="text" size="small" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
      <el-button class="ml-5" size="small" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" size="small" @click="reset">重置</el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"
              @selection-change="handleSelectionChange">
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="nums" label="库存"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image class="img" :src="scope.row.img" :preview-src-list="[scope.row.img]"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template v-slot="scope">
          <el-switch v-model="scope.row.status" active-color="lightgreen" @change="changeStatus(scope.row)"></el-switch>
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
  </div>
</template>

<script>
import {serverIp} from "../../public/config";

export default {
  name: "Goods",
  data() {
    return {
      serverIp: serverIp,
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",
      form: {},
      status: false,
      dialogFormVisible: false,
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    //修改上架状态
    changeStatus(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.request.post("/goods", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("操作成功")
          this.load()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    load() {
      this.request.get("/goods/page/status", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
          status: this.status
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    reset() {    //重置
      this.name = ""
      this.load()
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
.margin {
  margin: 10px 0;
}

.page {
  padding: 10px 0;
}

.text {
  width: 200px;
}

.img {
  width: 100px;
  height: 100px;
}

.form {
  width: 85%;
}

.headerBg {
  background: #eee !important;
}
</style>
