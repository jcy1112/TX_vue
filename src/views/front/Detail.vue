<template>
  <div>
    <div class="header">
      <div class="h1 ">
        <el-image :src="goods.img" class="img"></el-image>
      </div>
      <div class="h2">
        <el-card>
          <el-form label-width="80px">
            <el-form-item label="商品名称">{{ goods.name }}</el-form-item>
            <el-form-item label="商品描述">{{ goods.descpription }}</el-form-item>
            <el-form-item label="商品价格"><span class="color">{{ goods.price }} ￥</span></el-form-item>
            <el-form-item label="商品库存"><span>{{ goods.nums }}</span></el-form-item>

            <div>
              <el-input-number :value="1" size="medium" class="num" v-model="buyNum" :min="1"></el-input-number>
              <el-button type="primary" size="medium" plain style="width:120px;" @click="addCart">加入购物车</el-button>
              <el-popconfirm
                  class="ml-5"
                  confirm-button-text='付款'
                  cancel-button-text='我再想想'
                  icon="el-icon-info"
                  icon-color="red"
                  title="您确定购买吗？"
                  @confirm="pay()"
              >
                <el-button type="danger" slot="reference">直接购买</el-button>
              </el-popconfirm>

              <el-button type="danger" size="medium" plain style="margin-left: 10px;width:80px;"
                         @click="addCollection">收藏
              </el-button>
            </div>

            <div class="tips">
              温馨提示
              <div>·支持7天无理由退货·谨防用电安全隐患，请依照产品说明书使用此类工具并采取必要人身防护措施，日常置于儿童无法触及处。</div>
            </div>
          </el-form>
        </el-card>
      </div>
    </div>

    <div class="h3">
      <el-card>
        <div class="comment">商品评价</div>
        <div v-for="item in comments" :key="item.id" class="text1">
          <div>
            <el-image class="avatar" :src="item.avatar"></el-image>
            <span class="user">{{ item.user }}</span>
            <span class="text2">:{{ item.comment }}</span></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "Detail",
  data() {
    let goodsId = this.$route.query.id
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      goods: {},
      goodsId: goodsId,
      buyNum: 1,
      comments: [],
      img: "",
      goodsName: "",
    }
  },
  mounted() {
    this.request.get('/goods/' + this.goodsId).then(res => this.goods = res.data)  //商品介绍
    this.request.get('/item/comment/' + this.goodsId).then(res => this.comments = res.data)  //评论
  },
  methods: {
    //支付
    pay() {
      //先下单
      this.request.post("/orders/buy", {
        id: this.goodsId,
        nums: this.buyNum,
        name: this.goods.name,
        price: this.goods.price,
        img: this.goods.img
      }).then(res => {
        if (res.code === '200') {
          //再支付
          const url = `http://localhost:9090/alipay/pay?subject=${this.goods.name}&traceNo=${res.data.orderno}&totalAmount=${res.data.total}`;
          window.open(url);
          this.$message.success("如果您已支付，请刷新页面！")
          this.load()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //加入购物车
    addCart() {
      this.request.post('/cart', {goodsId: this.goodsId, num: this.buyNum, userid: this.user.id}).then(res => {
        if (res.code === '200') {
          this.$message.success('加入购物车成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //收藏
    addCollection() {
      this.request.post("/collection/" + this.goodsId).then(res => {
        if (res.code === '200') {
          this.$message.success('收藏成功')
          this.load()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>
<style scoped>
.header {
  display: flex;
  margin: 10px 0;
}

.h1 {
  width: 40%;
}

.img {
  width: 100%;
}

.h2 {
  margin-left: 10px;
  flex: 1;
}

.color {
  color: red;
}

.num {
  width: 150px;
}

.cart {
  background: red;
  font-size: 16px;
  color: white;
  padding: 10px;
  margin-left: 5px;
}

.tips {
  margin-top: 20px;
  font-size: 12px;
  color: #888;
}

.h3 {
  margin: 10px 0;
}

.comment {
  color: orangered;
  margin: 10px 0;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.text1 {
  margin: 10px 0;
}

.text2 {
  margin-left: 20px;
  color: #666;
  font-size: 14px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.user {
  margin-left: 5px;
}
</style>