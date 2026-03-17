<template>
  <div class="category-page">
    <h2 class="page-title">{{ categoryName }}</h2>
    <el-row :gutter="16">
      <el-col :span="6" v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const categoryNames = { 1:'手机数码',2:'电脑办公',3:'家用电器',4:'服装鞋包',5:'美妆护肤',6:'食品生鲜',7:'家居家装',8:'运动户外' }
const categoryName = ref('')
const products = ref([])

watch(() => route.params.id, (id) => {
  categoryName.value = categoryNames[id] || '商品分类'
  products.value = Array.from({ length: 12 }, (_, i) => ({
    id: Math.random(),
    name: `${categoryName.value} 商品 ${i + 1}`,
    price: (Math.random() * 500 + 50).toFixed(2),
    originalPrice: (Math.random() * 800 + 200).toFixed(2),
    image: `https://picsum.photos/300/300?random=${Math.floor(Math.random()*100)}`,
    sales: Math.floor(Math.random() * 10000),
    rating: (Math.random() * 1 + 4).toFixed(1),
  }))
}, { immediate: true })
</script>
<style scoped>
.category-page { background: #fff; border-radius: 8px; padding: 24px; }
.page-title { font-size: 20px; margin-bottom: 20px; }
</style>
