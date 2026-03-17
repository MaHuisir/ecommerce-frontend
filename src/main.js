import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/global.scss'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/gallery', component: () => import('./views/Gallery.vue') },
    { path: '/work/:id', component: () => import('./views/WorkDetail.vue') },
    { path: '/about', component: () => import('./views/About.vue') },
  ],
  scrollBehavior: () => ({ top: 0 })
})

createApp(App).use(router).mount('#app')
