<template>
  <div class="about-page">
    <!-- Hero -->
    <div class="about-hero">
      <div class="about-hero-img">
        <img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1600&q=90" alt="photographer" />
        <div class="about-hero-overlay"></div>
      </div>
      <div class="about-hero-text">
        <span class="label">ABOUT</span>
        <h1>Light is my<br /><em>language.</em></h1>
      </div>
    </div>

    <!-- Bio -->
    <div class="bio-section">
      <div class="bio-left" ref="bioLeft">
        <div class="bio-label">THE PHOTOGRAPHER</div>
        <h2 class="bio-name">M先生</h2>
        <div class="bio-tags">
          <span>Landscape</span>
          <span>Portrait</span>
          <span>Urban</span>
        </div>
      </div>
      <div class="bio-right" ref="bioRight">
        <p>我是一名游走于光影之间的视觉叙事者。过去八年，我走过48个国家，用镜头记录那些转瞬即逝的美丽瞬间——冰岛的极光、东京的霓虹雨夜、撒哈拉的黄金时刻。</p>
        <p>摄影对我而言不只是技术，更是一种与世界对话的方式。每一张照片背后，都是一段真实的相遇与感动。</p>
        <p>我相信，最好的照片不是拍出来的，而是等来的。</p>
      </div>
    </div>

    <!-- 时间线 -->
    <div class="timeline-section">
      <div class="timeline-header">
        <span class="label">JOURNEY</span>
        <h2>创作历程</h2>
      </div>
      <div class="timeline">
        <div class="timeline-item" v-for="item in timeline" :key="item.year">
          <div class="tl-year">{{ item.year }}</div>
          <div class="tl-dot"></div>
          <div class="tl-content">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 奖项 -->
    <div class="awards-section">
      <div class="awards-header">
        <span class="label">RECOGNITION</span>
        <h2>荣誉奖项</h2>
      </div>
      <div class="awards-grid">
        <div class="award-item" v-for="award in awards" :key="award.title">
          <div class="award-year">{{ award.year }}</div>
          <div class="award-info">
            <h4>{{ award.title }}</h4>
            <p>{{ award.org }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="contact-section">
      <h2>Let's create<br /><em>something beautiful.</em></h2>
      <a href="tel:17759729585" class="contact-btn">GET IN TOUCH →</a>
    </div>

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
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '2016', title: '踏上旅途', desc: '辞去工作，背起相机，开始环球摄影之旅。' },
  { year: '2018', title: '首次获奖', desc: '作品《极夜》获得国际自然摄影大赛金奖。' },
  { year: '2020', title: '出版画册', desc: '《光与影之间》摄影集全球发行，销量突破10万册。' },
  { year: '2022', title: '个展开幕', desc: '在巴黎、纽约、东京举办个人摄影展，观展人数超过50万。' },
  { year: '2024', title: '数字展览', desc: '推出线上沉浸式摄影展览平台 M&H，向全球开放。' },
]

const awards = [
  { year: '2024', title: 'World Press Photo Award', org: 'World Press Photo Foundation' },
  { year: '2023', title: 'Sony World Photography Award', org: 'Sony & World Photography Organisation' },
  { year: '2022', title: 'National Geographic Grant', org: 'National Geographic Society' },
  { year: '2021', title: 'Hasselblad Masters', org: 'Hasselblad Foundation' },
  { year: '2020', title: 'Prix Pictet Award', org: 'Prix Pictet' },
  { year: '2018', title: 'International Nature Photography', org: 'GDT European Wildlife Photographer' },
]

onMounted(() => {
  gsap.fromTo('.about-hero-text', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.3 })

  gsap.fromTo('.bio-left', { opacity: 0, x: -40 }, {
    opacity: 1, x: 0, duration: 1,
    scrollTrigger: { trigger: '.bio-section', start: 'top 80%' }
  })
  gsap.fromTo('.bio-right', { opacity: 0, x: 40 }, {
    opacity: 1, x: 0, duration: 1, delay: 0.2,
    scrollTrigger: { trigger: '.bio-section', start: 'top 80%' }
  })

  gsap.utils.toArray('.timeline-item').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.8, delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    })
  })

  gsap.utils.toArray('.award-item').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.7, delay: i * 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%' }
    })
  })

  gsap.fromTo('.contact-section h2', { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 1.2,
    scrollTrigger: { trigger: '.contact-section', start: 'top 75%' }
  })
})
</script>

<style lang="scss" scoped>
.about-page {
  background: #0a0a0a;
  color: #fff;
  min-height: 100vh;
}

.label {
  font-size: 10px;
  letter-spacing: 0.4em;
  color: rgba(255,255,255,0.3);
  display: block;
  margin-bottom: 16px;
}

/* Hero */
.about-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;

  .about-hero-img {
    position: absolute;
    inset: 0;
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .about-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
  }

  .about-hero-text {
    position: relative;
    z-index: 2;
    padding: 0 80px 80px;
    @media (max-width: 768px) { padding: 0 32px 60px; }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(56px, 8vw, 100px);
      font-weight: 300;
      line-height: 1;
      em { font-style: italic; color: rgba(255,255,255,0.6); }
    }
  }
}

/* Bio */
.bio-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  padding: 120px 80px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  @media (max-width: 768px) { grid-template-columns: 1fr; padding: 80px 32px; gap: 40px; }
}

.bio-left {
  opacity: 0;
  .bio-label {
    font-size: 10px;
    letter-spacing: 0.4em;
    color: rgba(255,255,255,0.3);
    margin-bottom: 16px;
  }
  .bio-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
    margin-bottom: 24px;
  }
  .bio-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    span {
      font-size: 9px;
      letter-spacing: 0.2em;
      border: 1px solid rgba(255,255,255,0.2);
      padding: 6px 14px;
      color: rgba(255,255,255,0.5);
    }
  }
}

.bio-right {
  opacity: 0;
  p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.9;
    color: rgba(255,255,255,0.65);
    margin-bottom: 24px;
    &:last-child { margin-bottom: 0; }
  }
}

/* Timeline */
.timeline-section {
  padding: 120px 80px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  @media (max-width: 768px) { padding: 80px 32px; }
}

.timeline-header {
  margin-bottom: 64px;
  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
  }
}

.timeline {
  position: relative;
  padding-left: 120px;
  @media (max-width: 768px) { padding-left: 60px; }

  &::before {
    content: '';
    position: absolute;
    left: 80px;
    top: 0; bottom: 0;
    width: 1px;
    background: rgba(255,255,255,0.1);
    @media (max-width: 768px) { left: 40px; }
  }
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 40px;
  margin-bottom: 56px;
  opacity: 0;

  .tl-year {
    position: absolute;
    left: -120px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.1em;
    @media (max-width: 768px) { left: -60px; font-size: 12px; }
  }

  .tl-dot {
    position: absolute;
    left: -44px;
    top: 6px;
    width: 8px; height: 8px;
    border: 1px solid rgba(255,255,255,0.4);
    border-radius: 50%;
    background: #0a0a0a;
    @media (max-width: 768px) { left: -24px; }
  }

  .tl-content {
    h4 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 300;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      color: rgba(255,255,255,0.4);
      line-height: 1.7;
    }
  }
}

/* Awards */
.awards-section {
  padding: 120px 80px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  @media (max-width: 768px) { padding: 80px 32px; }
}

.awards-header {
  margin-bottom: 64px;
  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
  }
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
}

.award-item {
  display: flex;
  gap: 32px;
  padding: 32px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  opacity: 0;

  .award-year {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    color: rgba(255,255,255,0.25);
    min-width: 48px;
    padding-top: 4px;
  }

  .award-info {
    h4 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 4px;
    }
    p {
      font-size: 12px;
      color: rgba(255,255,255,0.3);
      letter-spacing: 0.05em;
    }
  }
}

/* Contact */
.contact-section {
  padding: 160px 80px;
  text-align: center;
  @media (max-width: 768px) { padding: 100px 32px; }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 6vw, 80px);
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 48px;
    opacity: 0;
    em { font-style: italic; color: rgba(255,255,255,0.5); }
  }
}

.contact-btn {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.3em;
  color: #fff;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 20px 48px;
  transition: all 0.4s;

  &:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
  }
}

/* Footer */
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
</style>
