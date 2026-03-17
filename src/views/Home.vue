<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero" ref="heroRef">
      <div class="hero-bg">
        <img :src="works[currentSlide].image" :key="currentSlide" class="hero-img" alt="" />
        <div class="hero-overlay"></div>
      </div>

      <div class="hero-content">
        <div class="hero-label">{{ works[currentSlide].category }} · {{ works[currentSlide].location }}</div>
        <h1 class="hero-title">
          <span class="line" v-for="(char, i) in works[currentSlide].title" :key="i + currentSlide">{{ char }}</span>
        </h1>
        <p class="hero-subtitle">{{ works[currentSlide].subtitle }}</p>
        <router-link :to="`/work/${works[currentSlide].id}`" class="hero-btn">
          <span>VIEW WORK</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
          </svg>
        </router-link>
      </div>

      <!-- 幻灯片指示器 -->
      <div class="slide-indicators">
        <button
          v-for="(w, i) in featuredWorks"
          :key="w.id"
          class="indicator"
          :class="{ active: i === currentSlide }"
          @click="goToSlide(i)"
        ></button>
      </div>

      <!-- 滚动提示 -->
      <div class="scroll-hint">
        <span>SCROLL</span>
        <div class="scroll-line"></div>
      </div>

      <!-- 幻灯片编号 -->
      <div class="slide-counter">
        <span class="current">0{{ currentSlide + 1 }}</span>
        <span class="sep">/</span>
        <span class="total">0{{ featuredWorks.length }}</span>
      </div>
    </section>

    <!-- Marquee 跑马灯 -->
    <section class="marquee-section">
      <div class="marquee-track">
        <div class="marquee-content" v-for="n in 3" :key="n">
          <span v-for="tag in tags" :key="tag">{{ tag }} <em>·</em></span>
        </div>
      </div>
    </section>

    <!-- Featured Works -->
    <section class="featured-section">
      <div class="section-header">
        <div class="section-label">SELECTED WORKS</div>
        <h2 class="section-title">精选作品</h2>
        <router-link to="/gallery" class="view-all">VIEW ALL →</router-link>
      </div>

      <div class="works-grid">
        <div
          v-for="(work, i) in allWorks"
          :key="work.id"
          class="work-item"
          :class="`item-${i}`"
          @mouseenter="hoveredWork = work.id"
          @mouseleave="hoveredWork = null"
        >
          <router-link :to="`/work/${work.id}`" class="work-link">
            <div class="work-img-wrap">
              <img :src="work.thumb" :alt="work.title" class="work-img" />
              <div class="work-overlay" :class="{ visible: hoveredWork === work.id }">
                <span class="work-view">VIEW →</span>
              </div>
            </div>
            <div class="work-meta">
              <span class="work-cat">{{ work.category }}</span>
              <h3 class="work-title">{{ work.title }}</h3>
              <span class="work-loc">{{ work.location }}, {{ work.year }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stat" v-for="s in stats" :key="s.label">
        <div class="stat-num">{{ s.num }}</div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="quote-section">
      <blockquote>
        <p>"Photography is the art of frozen time — the ability to store emotion and feelings within a frame."</p>
        <cite>— Meshack Otieno</cite>
      </blockquote>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-logo">M&H</div>
        <p class="footer-copy">© 2024 M&H Photography. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Instagram</a>
          <a href="#">Behance</a>
          <a href="#">500px</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { works } from '@/data/works'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const featuredWorks = computed(() => works.filter(w => w.featured))
const allWorks = computed(() => works)
const currentSlide = ref(0)
const hoveredWork = ref(null)
let timer = null

const tags = ['LANDSCAPE', 'PORTRAIT', 'URBAN', 'UNDERWATER', 'FINE ART', 'TRAVEL']
const stats = [
  { num: '200+', label: 'WORKS' },
  { num: '48', label: 'COUNTRIES' },
  { num: '12', label: 'AWARDS' },
  { num: '8', label: 'YEARS' },
]

function goToSlide(i) {
  currentSlide.value = i
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % featuredWorks.value.length
}

onMounted(() => {
  timer = setInterval(nextSlide, 5000)

  // GSAP 滚动动画
  gsap.utils.toArray('.work-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1,
        delay: (i % 3) * 0.15,
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    )
  })

  gsap.fromTo('.stat', { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
    scrollTrigger: { trigger: '.stats-section', start: 'top 80%' }
  })

  gsap.fromTo('blockquote', { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 1.2,
    scrollTrigger: { trigger: '.quote-section', start: 'top 75%' }
  })
})

onUnmounted(() => clearInterval(timer))
</script>

<style lang="scss" scoped>
.home { background: #0a0a0a; color: #fff; }

/* ── Hero ── */
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  .hero-img {
    width: 100%; height: 100%;
    object-fit: cover;
    animation: zoomIn 8s ease forwards;
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0,0,0,0.75) 0%,
      rgba(0,0,0,0.3) 60%,
      rgba(0,0,0,0.1) 100%
    );
  }
}

@keyframes zoomIn {
  from { transform: scale(1.08); }
  to { transform: scale(1); }
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 80px;
  max-width: 700px;
  @media (max-width: 768px) { padding: 0 32px; }
}

.hero-label {
  font-size: 11px;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 24px;
  animation: fadeUp 1s 0.3s both;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(72px, 10vw, 140px);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  overflow: hidden;

  .line {
    display: inline-block;
    animation: charIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    @for $i from 1 through 12 {
      &:nth-child(#{$i}) { animation-delay: #{0.4 + $i * 0.04}s; }
    }
  }
}

@keyframes charIn {
  from { opacity: 0; transform: translateY(40px) rotate(3deg); }
  to { opacity: 1; transform: none; }
}

.hero-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-style: italic;
  color: rgba(255,255,255,0.6);
  margin-bottom: 48px;
  animation: fadeUp 1s 0.8s both;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 8px;
  transition: gap 0.3s, border-color 0.3s;
  animation: fadeUp 1s 1s both;

  &:hover {
    gap: 20px;
    border-color: #fff;
  }
}

.slide-indicators {
  position: absolute;
  bottom: 48px;
  left: 80px;
  display: flex;
  gap: 8px;
  z-index: 2;
  @media (max-width: 768px) { left: 32px; }
}

.indicator {
  width: 24px; height: 1px;
  background: rgba(255,255,255,0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;

  &.active {
    width: 48px;
    background: #fff;
  }
}

.scroll-hint {
  position: absolute;
  right: 48px;
  bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 2;
  font-size: 9px;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.4);
  @media (max-width: 768px) { display: none; }

  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
    animation: scrollLine 2s ease-in-out infinite;
  }
}

@keyframes scrollLine {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.5); opacity: 0.3; }
}

.slide-counter {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  @media (max-width: 768px) { display: none; }

  .current { font-size: 18px; color: #fff; }
  .sep { width: 1px; height: 24px; background: rgba(255,255,255,0.2); }
}

/* ── Marquee ── */
.marquee-section {
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 20px 0;
  background: #0a0a0a;
}

.marquee-track {
  display: flex;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

.marquee-content {
  display: flex;
  gap: 0;
  span {
    font-size: 11px;
    letter-spacing: 0.3em;
    color: rgba(255,255,255,0.3);
    padding: 0 24px;
    em { font-style: normal; color: rgba(255,255,255,0.15); }
  }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-33.33%); }
}

/* ── Featured ── */
.featured-section {
  padding: 120px 80px;
  @media (max-width: 768px) { padding: 80px 24px; }
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 64px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-label {
  font-size: 10px;
  letter-spacing: 0.4em;
  color: rgba(255,255,255,0.3);
  margin-bottom: 8px;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 300;
  line-height: 1;
}

.view-all {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.3s;
  &:hover { color: #fff; }
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }

  .item-0 { grid-column: span 2; @media (max-width: 640px) { grid-column: span 1; } }
  .item-3 { grid-column: span 2; @media (max-width: 640px) { grid-column: span 1; } }
}

.work-item {
  opacity: 0;
}

.work-link {
  display: block;
  text-decoration: none;
  color: #fff;
}

.work-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;

  .item-0 &, .item-3 & { aspect-ratio: 16/9; }
}

.work-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  .work-link:hover & { transform: scale(1.05); }
}

.work-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s;

  &.visible { opacity: 1; }

  .work-view {
    font-size: 11px;
    letter-spacing: 0.3em;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.5);
    padding: 12px 24px;
  }
}

.work-meta {
  padding: 20px 0 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.work-cat {
  font-size: 9px;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.3);
}

.work-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0.05em;
}

.work-loc {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
}

/* ── Stats ── */
.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
}

.stat {
  padding: 60px 40px;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.08);
  opacity: 0;

  &:last-child { border-right: none; }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 56px;
    font-weight: 300;
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 9px;
    letter-spacing: 0.3em;
    color: rgba(255,255,255,0.3);
  }
}

/* ── Quote ── */
.quote-section {
  padding: 160px 80px;
  text-align: center;
  @media (max-width: 768px) { padding: 100px 32px; }

  blockquote {
    opacity: 0;
    p {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(24px, 3.5vw, 42px);
      font-weight: 300;
      font-style: italic;
      line-height: 1.5;
      color: rgba(255,255,255,0.85);
      max-width: 900px;
      margin: 0 auto 24px;
    }
    cite {
      font-size: 11px;
      letter-spacing: 0.3em;
      color: rgba(255,255,255,0.3);
    }
  }
}

/* ── Footer ── */
.footer {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 48px 80px;
  @media (max-width: 768px) { padding: 48px 32px; }
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.5);
}

.footer-copy {
  font-size: 11px;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.1em;
}

.footer-links {
  display: flex;
  gap: 24px;
  a {
    font-size: 11px;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.3);
    text-decoration: none;
    transition: color 0.3s;
    &:hover { color: #fff; }
  }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
}
</style>
