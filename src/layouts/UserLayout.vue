<template>
  <div class="user-layout container">
    <el-row :gutter="24">
      <!-- 侧边菜单 -->
      <el-col :span="5">
        <el-card class="side-menu">
          <div class="user-info">
            <el-avatar :size="60">{{ userStore.userInfo?.nickname?.[0] || '我' }}</el-avatar>
            <p class="nickname">{{ userStore.userInfo?.nickname || '用户' }}</p>
          </div>
          <el-menu :default-active="activeMenu" router>
            <el-menu-item index="/user/profile">
              <el-icon><User /></el-icon> 个人信息
            </el-menu-item>
            <el-menu-item index="/user/orders">
              <el-icon><List /></el-icon> 我的订单
            </el-menu-item>
            <el-menu-item index="/user/address">
              <el-icon><Location /></el-icon> 收货地址
            </el-menu-item>
            <el-menu-item index="/user/favorites">
              <el-icon><Star /></el-icon> 我的收藏
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>

      <!-- 内容区 -->
      <el-col :span="19">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { User, List, Location, Star } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()
const activeMenu = computed(() => route.path)
</script>

<style lang="scss" scoped>
.user-layout {
  padding: 24px 16px;
}
.side-menu {
  .user-info {
    text-align: center;
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 8px;
    .nickname {
      margin-top: 8px;
      font-weight: 600;
    }
  }
}
</style>
