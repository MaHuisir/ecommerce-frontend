<template>
  <div class="search-page">
    <h2 class="page-title">搜索"{{ keyword }}"的结果</h2>
    <el-row :gutter="16">
      <el-col :span="6" v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </el-col>
    </el-row>
    <el-empty v-if="!products.length" description="没有找到相关商品" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const keyword = ref(route.query.q || '')
const products = ref([])

function mockSearch(kw) {
  return Array.from({ length: 8 }, (_, i) => ({
    id: Math.random(),
    name: `${kw} 相关商品 ${i + 1}`,
    price: (Math.random() * 500 + 50).toFixed(2),
    originalPrice: (Math.random() * 800 + 200).toFixed(2),
    image: `https://picsum.photos/300/300?random=${Math.floor(Math.random()*100)}`,
    sales: Math.floor(Math.random() * 10000),
    rating: (Math.random() * 1 + 4).toFixed(1),
  }))
}

watch(() => route.query.q, (q) => {
  keyword.value = q || ''
  products.value = mockSearch(keyword.value)
}, { immediate: true })
</script>

<style lang="scss" scoped>
.search-page { background: #fff; border-radius: 8px; padding: 24px; }
.page-title { font-size: 18px; margin-bottom: 20px; color: #333; }
</style>
