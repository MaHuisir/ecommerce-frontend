<template>
  <div class="checkout-page">
    <h2 class="page-title">确认订单</h2>
    <el-card class="section-card">
      <template #header>收货地址</template>
      <el-radio-group v-model="selectedAddress">
        <el-radio v-for="addr in addresses" :key="addr.id" :label="addr.id" border style="margin:8px">
          {{ addr.name }} {{ addr.phone }} — {{ addr.detail }}
        </el-radio>
      </el-radio-group>
    </el-card>

    <el-card class="section-card">
      <template #header>商品清单</template>
      <div v-for="item in cartStore.selectedItems" :key="item.id" class="order-item">
        <img :src="item.image" class="thumb" />
        <span class="item-name">{{ item.name }}</span>
        <span>x{{ item.quantity }}</span>
        <span class="price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
      </div>
    </el-card>

    <el-card class="section-card">
      <template #header>支付方式</template>
      <el-radio-group v-model="payMethod">
        <el-radio label="alipay" border>支付宝</el-radio>
        <el-radio label="wechat" border>微信支付</el-radio>
        <el-radio label="card" border>银行卡</el-radio>
      </el-radio-group>
    </el-card>

    <div class="submit-bar">
      <span>实付：<b class="total">¥{{ cartStore.selectedTotal.toFixed(2) }}</b></span>
      <el-button type="primary" size="large" @click="submitOrder">提交订单</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const payMethod = ref('alipay')
const selectedAddress = ref(1)

const addresses = ref([
  { id: 1, name: '张三', phone: '138****8888', detail: '北京市朝阳区某某街道1号' },
  { id: 2, name: '李四', phone: '139****9999', detail: '上海市浦东新区某某路2号' },
])

function submitOrder() {
  cartStore.clearSelected()
  ElMessage.success('订单提交成功！')
  router.push('/order-success')
}
</script>

<style lang="scss" scoped>
.checkout-page { max-width: 800px; margin: 0 auto; }
.page-title { font-size: 20px; margin-bottom: 20px; }
.section-card { margin-bottom: 16px; }
.order-item {
  display: flex; align-items: center; gap: 16px; padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  .thumb { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
  .item-name { flex: 1; }
  .price { color: #e44d26; font-weight: 600; }
}
.submit-bar {
  display: flex; justify-content: flex-end; align-items: center;
  gap: 24px; padding: 16px; background: #fff; border-radius: 8px;
  .total { font-size: 22px; color: #e44d26; }
}
</style>
