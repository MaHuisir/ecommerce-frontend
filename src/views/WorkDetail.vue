<template>
  <div class="work-detail" v-if="work">
    <!-- 全屏图片 -->
    <div class="hero-img-wrap">
      <img :src="work.image" :alt="work.title" class="hero-img" ref="heroImg" />
      <div class="hero-overlay"></div>
      <div class="hero-info">
        <span class="cat">{{ work.category }}</span>
        <h1 class="title">{{ work.title }}</h1>
        <p class="subtitle">{{ work.subtitle }}</p>
      </div>
      <button class="back-btn" @click="$router.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M11 6L5 12L11 18" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
        </svg>
        BACK
      </button>
    </div>

    <!-- 作品信息 -->
    <div class="detail-body">
      <div class="detail-meta" ref="metaRef">
        <div class="meta-item">
          <span class="meta-label">LOCATION</span>
          <span class="meta-value">{{ work.location }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">YEAR</span>
          <span class="meta-value">{{ work.year }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">CATEGORY</span>
          <span class="meta-value">{{ work.category }}</span>
        </div>
      </div>

      <div class="detail-desc" ref="descRef">
        <p>{{ work.desc }}</p>
      </div>
    </div>

    <!-- 相关作品 -->
    <div class="related-section">
      <div class="related-header">
        <span class="related-label">MORE WORKS</span>
        <h2 class="related-title">相关作品</h2>
      </div>
      <div class="related-grid">
        <router-link
          v-for="w in relatedWorks"
          :key="w.id"
          :to="`/work/${w.id}`"
          class="related-item"
        >
          <div class="related-img-wrap">
            <img :src="w.thumb" :alt="w.title" />
          </div>
          <div class="related-meta">
            <span>{{ w.category }}</span>
            <h4>{{ w.title }}</h4>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { works } from '@/data/works'
import { gsap } from 'gsap'

const route = useRoute()
const heroImg = ref()
const metaRef = ref()
const descRef = ref()

const work = computed(() => works.find(w => w.id === Number(route.params.id)))
const relatedWorks = computed(() =>
  works.filter(w => w.id !== work.value?.id && w.category === work.value?.category).slice(0, 3)
    .concat(works.filter(w => w.id !== work.value?.id).slice(0, 3 - Math.min(3, works.filter(w => w.id !== work.value?.id && w.category === work.value?.category).length)))
    .slice(0, 3)
)

function animate() {
  gsap.fromTo('.hero-img', { scale: 1.1 }, { scale: 1, duration: 1.6, ease: 'power3.out' })
  gsap.fromTo('.hero-info', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 })
  gsap.fromTo('.meta-item', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.3,
    scrollTrigger: { trigger: metaRef.value, start: 'top 80%' }
  })
  gsap.fromTo('.detail-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.2,
    scrollTrigger: { trigger: descRef.value, start: 'top 80%' }
  })
  gsap.fromTo('.related-item', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
    scrollTrigger: { trigger: '.related-grid', start: 'top 85%' }
  })
}

onMounted(animate)
watch(() => route.params.id, () => setTimeout(animate, 100))
</script>

<style lang="scss" scoped>
.work-detail {
  background: #0a0a0a;
  color: #fff;
  min-height: 100vh;
}

.hero-img-wrap {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-img {
  width: 100%; height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
}

.hero-info {
  position: absolute;
  bottom: 80px;
  left: 80px;
  @media (max-width: 768px) { left: 32px; bottom: 60px; }

  .cat {
    display: block;
    font-size: 10px;
    letter-spacing: 0.4em;
    color: rgba(255,255,255,0.4);
    margin-bottom: 16px;
  }

  .title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(56px, 8vw, 100px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }

  .subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-style: italic;
    color: rgba(255,255,255,0.5);
  }
}

.back-btn {
  position: absolute;
  top: 100px;
  left: 80px;
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.6);
  font-size: 10px;
  letter-spacing: 0.3em;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  @media (max-width: 768px) { left: 32px; top: 80px; }

  &:hover {
    border-color: #fff;
    color: #fff;
  }
}

.detail-body {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  padding: 100px 80px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 60px 32px;
    gap: 40px;
  }
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.meta-item {
  opacity: 0;
  .meta-label {
    display: block;
    font-size: 9px;
    letter-spacing: 0.4em;
    color: rgba(255,255,255,0.3);
    margin-bottom: 8px;
  }
  .meta-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
  }
}

.detail-desc {
  opacity: 0;
  p {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255,255,255,0.7);
    font-style: italic;
  }
}

.related-section {
  padding: 100px 80px;
  @media (max-width: 768px) { padding: 60px 32px; }
}

.related-header {
  margin-bottom: 48px;
  .related-label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.4em;
    color: rgba(255,255,255,0.3);
    margin-bottom: 12px;
  }
  .related-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
  }
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.related-item {
  opacity: 0;
  text-decoration: none;
  color: #fff;

  .related-img-wrap {
    overflow: hidden;
    aspect-ratio: 4/3;
    img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  &:hover .related-img-wrap img { transform: scale(1.06); }

  .related-meta {
    padding: 16px 0;
    span {
      font-size: 9px;
      letter-spacing: 0.3em;
      color: rgba(255,255,255,0.3);
      display: block;
      margin-bottom: 6px;
    }
    h4 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 300;
    }
  }
}
</style>
