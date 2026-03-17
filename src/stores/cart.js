import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

  const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
  const selectedItems = computed(() => items.value.filter(item => item.selected))
  const selectedTotal = computed(() => selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function saveToLocal() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function addItem(product, quantity = 1) {
    const existing = items.value.find(i => i.id === product.id && i.skuId === product.skuId)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity, selected: true })
    }
    saveToLocal()
    ElMessage.success('已加入购物车')
  }

  function removeItem(id, skuId) {
    items.value = items.value.filter(i => !(i.id === id && i.skuId === skuId))
    saveToLocal()
  }

  function updateQuantity(id, skuId, quantity) {
    const item = items.value.find(i => i.id === id && i.skuId === skuId)
    if (item) {
      item.quantity = quantity
      saveToLocal()
    }
  }

  function toggleSelect(id, skuId) {
    const item = items.value.find(i => i.id === id && i.skuId === skuId)
    if (item) item.selected = !item.selected
  }

  function toggleSelectAll(val) {
    items.value.forEach(item => item.selected = val)
  }

  function clearSelected() {
    items.value = items.value.filter(i => !i.selected)
    saveToLocal()
  }

  return {
    items, totalCount, totalPrice, selectedItems, selectedTotal,
    addItem, removeItem, updateQuantity, toggleSelect, toggleSelectAll, clearSelected
  }
})
