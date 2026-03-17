<template>
  <div class="cart-page">
    <h2 class="page-title">购物车 ({{ cartStore.totalCount }})</h2>

    <el-empty v-if="!cartStore.items.length" description="购物车空空如也">
      <el-button type="primary" @click="$router.push('/')">去逛逛</el-button>
    </el-empty>

    <template v-else>
      <el-table :data="cartStore.items" style="width:100%">
        <el-table-column width="50">
          <template #header>
            <el-checkbox
              :model-value="allSelected"
              @change="cartStore.toggleSelectAll"
            />
          </template>
          <template #default="{ row }">
            <el-checkbox
              :model-value="row.selected"
              @change="cartStore.toggleSelect(row.id, row.skuId)"
            />
          </template>
        </el-table-column>

        <el-table-column label="商品" min-width="300">
          <template #default="{ row }">
            <div class="product-cell">
              <img :src="row.image" class="thumb" />
              <span>{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="单价" width="120">
          <template #default="{ row }">
            <span class="price">¥{{ row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column label="数量" width="160">
          <template #default="{ row }">
            <el-input-number
              :model-value="row.quantity"
              :min="1"
              :max="99"
              size="small"
              @change="(val) => cartStore.updateQuantity(row.id, row.skuId, val)"
            />
          </template>
        </el-table-column>

        <el-table-column label="小计" width="120">
          <template #default="{ row }">
            <span class="price">¥{{ (row.price * row.quantity).toFixed(2) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="80">
          <template #default="{ row }">
            <el-button type="danger" link @click="cartStore.removeItem(row.id, row.skuId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 结算栏 -->
      <div class="checkout-bar">
        <div class="left">
          <el-checkbox :model-value="allSelected" @change="cartStore.toggleSelectAll">全选</el-checkbox>
          <el-button link type="danger" @click="cartStore.clearSelected">删除选中</el-button>
        </div>
        <div class="right">
          <span>已选 <b>{{ cartStore.selectedItems.length }}</b> 件</span>
          <span>合计：<b class="total-price">¥{{ cartStore.selectedTotal.toFixed(2) }}</b></span>
          <el-button
            type="primary"
            size="large"
            :disabled="!cartStore.selectedItems.length"
            @click="$router.push('/checkout')"
          >去结算</el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const allSelected = computed(() =>
  cartStore.items.length > 0 && cartStore.items.every(i => i.selected)
)
</script>

<style lang="scss" scoped>
.cart-page {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}
.page-title { font-size: 20px; margin-bottom: 20px; }
.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  .thumb { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
}
.price { color: #e44d26; font-weight: 600; }
.checkout-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 16px;
  .left, .right { display: flex; align-items: center; gap: 16px; }
  .total-price { font-size: 20px; color: #e44d26; }
}
</style>
