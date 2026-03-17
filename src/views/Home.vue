<template>
  <div class="home-page">
    <!-- Banner 轮播 -->
    <el-carousel height="400px" class="banner">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <div class="banner-item" :style="{ background: item.color }">
          <h2>{{ item.title }}</h2>
          <p>{{ item.desc }}</p>
          <el-button type="primary" size="large" @click="$router.push(item.link)">立即抢购</el-button>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 热门分类 -->
    <section class="section">
      <h3 class="section-title">热门分类</h3>
      <el-row :gutter="16">
        <el-col :span="3" v-for="cat in categories" :key="cat.id">
          <div class="cat-card" @click="$router.push(`/category/${cat.id}`)">
            <div class="cat-icon">{{ cat.icon }}</div>
            <p>{{ cat.name }}</p>
          </div>
        </el-col>
      </el-row>
    </section>

    <!-- 热销商品 -->
    <section class="section">
      <h3 class="section-title">热销商品</h3>
      <el-row :gutter="16">
        <el-col :span="6" v-for="product in hotProducts" :key="product.id">
          <ProductCard :product="product" />
        </el-col>
      </el-row>
    </section>

    <!-- 新品上架 -->
    <section class="section">
      <h3 class="section-title">新品上架</h3>
      <el-row :gutter="16">
        <el-col :span="6" v-for="product in newProducts" :key="product.id">
          <ProductCard :product="product" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

const banners = ref([
  { id: 1, title: '年中大促', desc: '全场低至5折，限时抢购', color: 'linear-gradient(135deg,#e44d26,#f7931e)', link: '/category/1' },
  { id: 2, title: '新品首发', desc: '最新款手机震撼登场', color: 'linear-gradient(135deg,#667eea,#764ba2)', link: '/category/1' },
  { id: 3, title: '品质生活', desc: '精选家居好物，品质之选', color: 'linear-gradient(135deg,#11998e,#38ef7d)', link: '/category/7' },
])

const categories = ref([
  { id: 1, name: '手机数码', icon: '📱' },
  { id: 2, name: '电脑办公', icon: '💻' },
  { id: 3, name: '家用电器', icon: '🏠' },
  { id: 4, name: '服装鞋包', icon: '👗' },
  { id: 5, name: '美妆护肤', icon: '💄' },
  { id: 6, name: '食品生鲜', icon: '🍎' },
  { id: 7, name: '家居家装', icon: '🛋️' },
  { id: 8, name: '运动户外', icon: '⚽' },
])

const hotProducts = ref([])
const newProducts = ref([])

// 模拟数据
function mockProducts(count, prefix = '') {
  return Array.from({ length: count }, (_, i) => ({
    id: Math.random(),
    name: `${prefix}商品 ${i + 1}`,
    price: (Math.random() * 500 + 50).toFixed(2),
    originalPrice: (Math.random() * 800 + 200).toFixed(2),
    image: `https://picsum.photos/300/300?random=${Math.floor(Math.random()*100)}`,
    sales: Math.floor(Math.random() * 10000),
    rating: (Math.random() * 1 + 4).toFixed(1),
  }))
}

onMounted(() => {
  hotProducts.value = mockProducts(8, '热销')
  newProducts.value = mockProducts(8, '新品')
})
</script>

<style lang="scss" scoped>
.banner-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 12px;
  h2 { font-size: 36px; }
  p { font-size: 18px; opacity: .9; }
}

.section {
  margin-top: 32px;
  .section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    padding-left: 12px;
    border-left: 4px solid #e44d26;
  }
}

.cat-card {
  text-align: center;
  padding: 16px 8px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all .2s;
  margin-bottom: 16px;
  &:hover { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,.1); }
  .cat-icon { font-size: 32px; margin-bottom: 8px; }
  p { font-size: 13px; color: #555; }
}
</style>
