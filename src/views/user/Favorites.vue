<template>
  <el-card>
    <template #header>我的收藏</template>
    <el-row :gutter="16">
      <el-col :span="6" v-for="p in favorites" :key="p.id">
        <ProductCard :product="p" />
      </el-col>
    </el-row>
    <el-empty v-if="!favorites.length" description="暂无收藏" />
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
const favorites = ref(
  Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `收藏商品 ${i + 1}`,
    price: (Math.random() * 300 + 50).toFixed(2),
    originalPrice: (Math.random() * 600 + 200).toFixed(2),
    image: `https://picsum.photos/300/300?random=${i + 10}`,
    sales: Math.floor(Math.random() * 5000),
    rating: (Math.random() * 1 + 4).toFixed(1),
  }))
)
</script>
