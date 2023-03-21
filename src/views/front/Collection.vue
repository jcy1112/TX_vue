<template>
  <div>
    <div class="margin">
      <el-input class="text" size="small" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="goodsName"></el-input>
      <el-button class="ml-5" size="small" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" size="small" @click="reset">重置</el-button>
    </div>

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

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"
              @selection-change="handleSelectionChange">、
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="goodsName" label="名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image class="img" :src="scope.row.img" :preview-src-list="[scope.row.img]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="上架状态" >
        <template v-slot="scope">
          <el-switch v-model="scope.row.status" active-color="lightgreen" disabled></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" :disabled=!scope.row.status @click="$router.push('/front/detail?id=' + scope.row.goodsId)">查看详情<i class="el-icon-edit"></i>
          </el-button>
          <div style="margin: 5px"></div>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定取消收藏吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" size="small" slot="reference">取消收藏<i class="el-icon-remove-outline"></i></el-button>

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
  </div>
</template>

<script>
import {serverIp} from "../../../public/config";

export default {
  name: "Collection",
  data() {
    return {
      serverIp: serverIp,
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      goodsName: "",
      form: {},
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
    load() {
      this.request.get("/collection/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          goodsName: this.goodsName,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    //取消收藏
    del(id) {
      this.request.delete("/collection/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("操作成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    //多选框
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    //批量删除
    delBatch() {
      if (!this.multipleSelection.length) {
        this.$message.error("请选择需要删除的数据")
        return
      }
      let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      this.request.post("/collection/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("操作成功")
          this.load()
        } else {
          this.$message.error("操作失败")
        }
      })
    },
    //重置
    reset() {
      this.goodsName = ""
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
