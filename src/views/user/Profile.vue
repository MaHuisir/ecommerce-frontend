<template>
  <el-card>
    <template #header>个人信息</template>
    <el-form :model="form" label-width="80px" style="max-width:400px">
      <el-form-item label="昵称"><el-input v-model="form.nickname" /></el-form-item>
      <el-form-item label="手机号"><el-input v-model="form.phone" /></el-form-item>
      <el-form-item label="邮箱"><el-input v-model="form.email" /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
const form = reactive({ nickname: '用户昵称', phone: '138****8888', email: 'user@example.com' })
function save() { ElMessage.success('保存成功') }
</script>
