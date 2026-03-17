<template>
  <div class="main-layout">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-inner container">
        <div class="logo" @click="$router.push('/')">🛒 电商平台</div>

        <!-- 搜索框 -->
        <div class="search-bar">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索商品..."
            size="large"
            @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button :icon="Search" @click="handleSearch" />
            </template>
          </el-input>
        </div>

        <!-- 右侧操作 -->
        <div class="header-actions">
          <el-badge :value="cartStore.totalCount" :hidden="!cartStore.totalCount">
            <el-button :icon="ShoppingCart" circle @click="$router.push('/cart')" />
          </el-badge>

          <template v-if="userStore.isLoggedIn">
            <el-dropdown @command="handleUserCommand">
              <el-avatar :size="36" style="cursor:pointer">
                {{ userStore.userInfo?.nickname?.[0] || '我' }}
              </el-avatar>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="orders">我的订单</el-dropdown-item>
                  <el-dropdown-item command="favorites">我的收藏</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-button type="primary" @click="$router.push('/login')">登录</el-button>
            <el-button @click="$router.push('/register')">注册</el-button>
          </template>
        </div>
      </div>

      <!-- 分类导航 -->
      <nav class="category-nav">
        <div class="container">
          <span
            v-for="cat in categories"
            :key="cat.id"
            class="cat-item"
            @click="$router.push(`/category/${cat.id}`)"
          >{{ cat.name }}</span>
        </div>
      </nav>
    </header>

    <!-- 主内容 -->
    <main class="main-content container">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <div class="container">
        <p>© 2024 电商交易平台 · 安全购物 · 品质保障</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const searchKeyword = ref('')

const categories = ref([
  { id: 1, name: '手机数码' },
  { id: 2, name: '电脑办公' },
  { id: 3, name: '家用电器' },
  { id: 4, name: '服装鞋包' },
  { id: 5, name: '美妆护肤' },
  { id: 6, name: '食品生鲜' },
  { id: 7, name: '家居家装' },
  { id: 8, name: '运动户外' },
])

function handleSearch() {
  if (searchKeyword.value.trim()) {
    router.push({ name: 'Search', query: { q: searchKeyword.value } })
  }
}

function handleUserCommand(cmd) {
  if (cmd === 'logout') {
    userStore.logout()
    router.push('/')
  } else {
    router.push(`/user/${cmd}`)
  }
}
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
  position: sticky;
  top: 0;
  z-index: 100;

  .header-inner {
    display: flex;
    align-items: center;
    gap: 24px;
    height: 64px;
  }

  .logo {
    font-size: 22px;
    font-weight: 700;
    color: #e44d26;
    cursor: pointer;
    white-space: nowrap;
  }

  .search-bar {
    flex: 1;
    max-width: 500px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
  }
}

.category-nav {
  border-top: 1px solid #f0f0f0;
  background: #fff;

  .container {
    display: flex;
    gap: 0;
  }

  .cat-item {
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    color: #333;
    transition: all .2s;

    &:hover {
      color: #e44d26;
      background: #fff5f0;
    }
  }
}

.main-content {
  flex: 1;
  padding: 24px 16px;
}

.footer {
  background: #333;
  color: #aaa;
  text-align: center;
  padding: 20px 0;
  font-size: 13px;
}
</style>
