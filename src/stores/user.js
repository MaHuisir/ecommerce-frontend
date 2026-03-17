import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi, registerApi, getUserInfoApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(data) {
    // Mock 登录：任意账号密码均可登录
    await new Promise(r => setTimeout(r, 600))
    const mockToken = 'mock-token-' + Date.now()
    token.value = mockToken
    localStorage.setItem('token', mockToken)
    userInfo.value = {
      nickname: data.username || '测试用户',
      phone: '138****8888',
      email: data.username,
    }
  }

  async function register(data) {
    // Mock 注册
    await new Promise(r => setTimeout(r, 600))
  }

  async function fetchUserInfo() {
    if (!token.value) return
    const res = await getUserInfoApi()
    userInfo.value = res.data
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return { token, userInfo, isLoggedIn, login, register, fetchUserInfo, logout }
})
