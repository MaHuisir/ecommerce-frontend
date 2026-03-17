<template>
  <div class="order-success">
    <el-result icon="success" title="订单提交成功！" sub-title="感谢您的购买，我们将尽快为您发货">
      <template #extra>
        <el-button type="primary" @click="$router.push('/user/orders')">查看订单</el-button>
        <el-button @click="$router.push('/')">继续购物</el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped>
.order-success { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
</style>
