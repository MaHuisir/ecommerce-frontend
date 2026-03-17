<template>
  <el-card>
    <template #header>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>收货地址</span>
        <el-button type="primary" size="small" @click="showAdd=true">新增地址</el-button>
      </div>
    </template>
    <div v-for="addr in addresses" :key="addr.id" class="addr-item">
      <div>
        <b>{{ addr.name }}</b> {{ addr.phone }}
        <el-tag v-if="addr.isDefault" size="small" type="danger" style="margin-left:8px">默认</el-tag>
      </div>
      <div class="detail">{{ addr.detail }}</div>
      <div class="addr-actions">
        <el-button link type="primary">编辑</el-button>
        <el-button link type="danger">删除</el-button>
      </div>
    </div>
    <el-empty v-if="!addresses.length" description="暂无地址" />
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
const showAdd = ref(false)
const addresses = ref([
  { id: 1, name: '张三', phone: '138****8888', detail: '北京市朝阳区某某街道1号', isDefault: true },
  { id: 2, name: '李四', phone: '139****9999', detail: '上海市浦东新区某某路2号', isDefault: false },
])
</script>
<style scoped>
.addr-item { padding: 12px; border: 1px solid #eee; border-radius: 6px; margin-bottom: 12px; }
.detail { color: #666; font-size: 13px; margin: 4px 0; }
.addr-actions { margin-top: 8px; }
</style>
