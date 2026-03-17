<template>
  <el-card class="product-card" @click="$router.push(`/product/${product.id}`)">
    <div class="product-img">
      <img :src="product.image" :alt="product.name" />
      <div class="favorite-btn" @click.stop="toggleFav">
        <el-icon :color="isFav ? '#e44d26' : '#ccc'"><Star /></el-icon>
      </div>
    </div>
    <div class="product-info">
      <p class="name">{{ product.name }}</p>
      <div class="price-row">
        <span class="price">¥{{ product.price }}</span>
        <span class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
      </div>
      <div class="meta">
        <span>⭐ {{ product.rating }}</span>
        <span>已售 {{ product.sales }}</span>
      </div>
      <el-button
        type="primary"
        size="small"
        style="width:100%;margin-top:8px"
        @click.stop="addToCart"
      >加入购物车</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { Star } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({ product: Object })
const cartStore = useCartStore()
const isFav = ref(false)

function toggleFav() {
  isFav.value = !isFav.value
}

function addToCart() {
  cartStore.addItem({
    id: props.product.id,
    skuId: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
  })
}
</script>

<style lang="scss" scoped>
.product-card {
  cursor: pointer;
  margin-bottom: 16px;
  transition: all .2s;
  &:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }

  :deep(.el-card__body) { padding: 0; }

  .product-img {
    position: relative;
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }
    .favorite-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255,255,255,.8);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .product-info {
    padding: 12px;
    .name {
      font-size: 14px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 8px;
    }
    .price-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      .price { font-size: 18px; font-weight: 700; color: #e44d26; }
      .original-price { font-size: 12px; color: #999; text-decoration: line-through; }
    }
    .meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
</style>
