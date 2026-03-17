<template>
  <el-card>
    <template #header>订单详情</template>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="订单号">{{ $route.params.id }}</el-descriptions-item>
      <el-descriptions-item label="状态">待付款</el-descriptions-item>
      <el-descriptions-item label="下单时间">2024-01-01 12:00:00</el-descriptions-item>
      <el-descriptions-item label="实付金额">¥299.00</el-descriptions-item>
    </el-descriptions>
    <div style="margin-top:16px">
      <el-button type="primary">立即付款</el-button>
      <el-button>取消订单</el-button>
    </div>
  </el-card>
</template>
