<template>
  <el-card>
    <template #header>我的订单</template>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="待付款" name="pending" />
      <el-tab-pane label="待发货" name="paid" />
      <el-tab-pane label="待收货" name="shipped" />
      <el-tab-pane label="已完成" name="done" />
    </el-tabs>
    <el-empty description="暂无订单" />
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
const activeTab = ref('all')
</script>
