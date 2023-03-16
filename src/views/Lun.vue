<template>
  <div>
    <div class="margin">
      <el-input class="text" size="small" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
      <el-button class="ml-5" size="small" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" size="small" @click="reset">重置</el-button>
    </div>

    <div class="margin">
      <el-button type="primary" size="small" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
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

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <el-table-column label="图片"><template slot-scope="scope"><el-image class="img" :src="scope.row.img" :preview-src-list="[scope.row.img]"></el-image></template></el-table-column>
      <el-table-column prop="link" label="商品链接"></el-table-column>
      <el-table-column prop="goodsId" label="商品id"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称"></el-table-column>

      <el-table-column label="操作"  width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
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

    <el-dialog title="信息" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
      <el-form label-width="140px" size="small" class="form" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="img" label="图片">
          <el-upload :action="'http://' + serverIp +':9090/file/ossupload'" ref="img" :on-success="handleImgUploadSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="goodsId" label="商品">
          <el-select v-model="form.goodsId" class="chose" @change="changeStatus(form.goodsId)">
            <el-option v-for="item in goods" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="link" label="商品链接">
          <el-input v-model="form.link" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item prop="goodsName" label="商品名称">
          <el-input v-model="form.goodsName" autocomplete="off" disabled></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {serverIp} from "../../public/config";


export default {
  name: "Lun",
  data() {
    return {
      serverIp: serverIp,
      goods: [],
      tableData: [],
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
  mounted() {
    this.load()
    this.request.get("/goods?status=true").then(res => {
      this.goods = res.data
    })
  },
  methods: {
    changeStatus(goodsId) {
      let goods = this.goods.find(v => v.id === goodsId)
      this.form.link = '/front/detail?id=' + goodsId
      this.form.goodsName = goods.name
    },
    load() {
      this.request.get("/lun/page", {
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
    save() {   //修改
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.request.post("/lun", this.form).then(res => {
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
    handleAdd() {   //新增
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
    handleEdit(row) {   //编辑
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
       this.$nextTick(() => {
         if(this.$refs.img) {
           this.$refs.img.clearFiles();
         }
         if(this.$refs.file) {
          this.$refs.file.clearFiles();
         }
       })
    },
    del(id) {    //删除
      this.request.delete("/lun/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {    //多选框
      console.log(val)
      this.multipleSelection = val
    },
    delBatch() {    //批量删除
      if (!this.multipleSelection.length) {
        this.$message.error("请选择需要删除的数据")
        return
      }
      let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      this.request.post("/lun/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    reset() {   //重置
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
    handleImgUploadSuccess(res) {     //上传图片
      this.form.img = res
    },
  }
}
</script>


<style scoped>
.margin{
  margin: 10px 0;
}
.text{
  width: 200px;
}
.page{
  padding: 10px 0;
}
.img{
  width: 100px;
  height: 100px;
}
.form{
  width: 85%;
}
.chose{
  width: 100%;
}
.headerBg {
  background: #eee!important;
}
</style>
