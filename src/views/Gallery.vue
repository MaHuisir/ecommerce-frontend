<template>
  <div class="gallery-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-label">PORTFOLIO</div>
        <h1 class="header-title">Gallery</h1>
      </div>
    </div>

    <!-- Filter -->
    <div class="filter-bar">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-btn"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>

    <!-- Masonry Grid -->
    <div class="masonry-grid">
      <div
        v-for="(work, i) in filteredWorks"
        :key="work.id"
        class="masonry-item"
        :class="`size-${i % 5}`"
        @mouseenter="hovered = work.id"
        @mouseleave="hovered = null"
        ref="itemRefs"
      >
        <router-link :to="`/work/${work.id}`" class="item-link">
          <img :src="work.thumb" :alt="work.title" class="item-img" />
          <div class="item-info" :class="{ show: hovered === work.id }">
            <span class="item-cat">{{ work.category }}</span>
            <h3 class="item-title">{{ work.title }}</h3>
            <span class="item-loc">{{ work.location }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { works, categories } from '@/data/works'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activeCategory = ref('ALL')
const hovered = ref(null)
const itemRefs = ref([])

const filteredWorks = computed(() =>
  activeCategory.value === 'ALL'
    ? works
    : works.filter(w => w.category === activeCategory.value)
)

onMounted(() => {
  gsap.fromTo('.page-header', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2 })

  gsap.utils.toArray('.masonry-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.9,
        delay: (i % 4) * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    )
  })
})
</script>

<style lang="scss" scoped>
.gallery-page {
  background: #0a0a0a;
  color: #fff;
  min-height: 100vh;
  padding-bottom: 120px;
}

.page-header {
  height: 40vh;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  padding: 0 80px 60px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  @media (max-width: 768px) { padding: 0 32px 48px; }
}

.header-label {
  font-size: 10px;
  letter-spacing: 0.4em;
  color: rgba(255,255,255,0.3);
  margin-bottom: 12px;
}

.header-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(64px, 10vw, 120px);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.02em;
}

.filter-bar {
  display: flex;
  gap: 0;
  padding: 0 80px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  overflow-x: auto;
  @media (max-width: 768px) { padding: 0 32px; }
}

.filter-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.3);
  font-size: 10px;
  letter-spacing: 0.3em;
  padding: 24px 24px;
  cursor: pointer;
  transition: color 0.3s;
  white-space: nowrap;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 24px; right: 24px;
    height: 1px;
    background: #fff;
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  &:hover { color: rgba(255,255,255,0.7); }
  &.active {
    color: #fff;
    &::after { transform: scaleX(1); }
  }
}

.masonry-grid {
  columns: 3;
  column-gap: 2px;
  padding: 2px 0;

  @media (max-width: 1024px) { columns: 2; }
  @media (max-width: 640px) { columns: 1; }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 2px;
  overflow: hidden;
  opacity: 0;

  // PC端：显示完整图片，不裁切
  .item-img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  // 移动端：横屏图完整显示，竖屏图宽度100%自适配高度
  @media (max-width: 768px) {
    .item-img {
      width: 100%;
      height: auto;
      object-fit: fill;
    }
  }
}

.item-link {
  display: block;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
}

.item-img {
  width: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  .item-link:hover & { transform: scale(1.06); }
}

.item-info {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px 24px;
  opacity: 0;
  transition: opacity 0.4s;

  &.show { opacity: 1; }
}

.item-cat {
  font-size: 9px;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 6px;
}

.item-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 4px;
}

.item-loc {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
}
</style>
