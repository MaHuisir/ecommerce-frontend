<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="nav-inner">
      <router-link to="/" class="logo">LUMINA</router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">HOME</router-link>
        <router-link to="/gallery" class="nav-link">GALLERY</router-link>
        <router-link to="/about" class="nav-link">ABOUT</router-link>
      </div>
      <button class="menu-btn" @click="menuOpen = !menuOpen">
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>
  </nav>

  <!-- 移动端菜单 -->
  <div class="mobile-menu" :class="{ open: menuOpen }">
    <router-link to="/" @click="menuOpen=false">HOME</router-link>
    <router-link to="/gallery" @click="menuOpen=false">GALLERY</router-link>
    <router-link to="/about" @click="menuOpen=false">ABOUT</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isHidden = ref(false)
const menuOpen = ref(false)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  isScrolled.value = y > 50
  isHidden.value = y > lastY + 10 && y > 200
  if (y < lastY - 10) isHidden.value = false
  lastY = y
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 28px 48px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  &.scrolled {
    padding: 16px 48px;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  &.hidden {
    transform: translateY(-100%);
  }
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: #fff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 40px;
  @media (max-width: 768px) { display: none; }
}

.nav-link {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  transition: color 0.3s;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    width: 0; height: 1px;
    background: #fff;
    transition: width 0.3s;
  }

  &:hover, &.router-link-active {
    color: #fff;
    &::after { width: 100%; }
  }
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 32px; height: 20px;
  position: relative;

  @media (max-width: 768px) { display: block; }

  span, &::before, &::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: #fff;
    transition: all 0.3s;
  }
  &::before { top: 0; }
  span { top: 50%; transform: translateY(-50%); }
  &::after { bottom: 0; }

  span.open { opacity: 0; }
}

.mobile-menu {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  transform: translateX(100%);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &.open { transform: translateX(0); }

  a {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
    color: #fff;
    text-decoration: none;
    letter-spacing: 0.1em;
  }
}
</style>
