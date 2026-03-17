<template>
  <div class="product-detail">
    <el-row :gutter="32">
      <el-col :span="10">
        <el-image :src="product.image" fit="cover" style="width:100%;border-radius:8px" />
      </el-col>
      <el-col :span="14">
        <h1 class="name">{{ product.name }}</h1>
        <div class="meta">⭐ {{ product.rating }} · 已售 {{ product.sales }}</div>
        <div class="price-box">
          <span class="price">¥{{ product.price }}</span>
          <span class="original">¥{{ product.originalPrice }}</span>
        </div>
        <el-divider />
        <div class="quantity-row">
          <span>数量：</span>
          <el-input-number v-model="quantity" :min="1" :max="99" />
        </div>
        <div class="actions">
          <el-button type="warning" size="large" @click="addCart">加入购物车</el-button>
          <el-button type="primary" size="large" @click="buyNow">立即购买</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const quantity = ref(1)

const product = ref({
  id: route.params.id,
  name: '精选商品详情',
  price: '299.00',
  originalPrice: '599.00',
  image: `https://picsum.photos/500/500?random=${route.params.id}`,
  sales: 8888,
  rating: '4.9',
  desc: '这是一款高品质商品，值得拥有。'
})

function addCart() {
  cartStore.addItem({ ...product.value, skuId: product.value.id, quantity: quantity.value })
}

function buyNow() {
  addCart()
  router.push('/cart')
}
</script>

<style lang="scss" scoped>
.product-detail { background: #fff; border-radius: 8px; padding: 32px; }
.name { font-size: 22px; margin-bottom: 8px; }
.meta { color: #999; font-size: 13px; margin-bottom: 16px; }
.price-box {
  .price { font-size: 32px; font-weight: 700; color: #e44d26; }
  .original { font-size: 14px; color: #999; text-decoration: line-through; margin-left: 12px; }
}
.quantity-row { display: flex; align-items: center; gap: 12px; margin: 16px 0; }
.actions { display: flex; gap: 16px; margin-top: 24px; }
</style>
