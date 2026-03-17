<template>
  <div class="cursor" ref="cursorEl"></div>
  <div class="cursor-dot" ref="dotEl"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorEl = ref()
const dotEl = ref()
let mouseX = 0, mouseY = 0
let curX = 0, curY = 0

function onMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  dotEl.value.style.transform = `translate(${mouseX}px, ${mouseY}px)`
}

function animate() {
  curX += (mouseX - curX) * 0.12
  curY += (mouseY - curY) * 0.12
  cursorEl.value.style.transform = `translate(${curX}px, ${curY}px)`
  requestAnimationFrame(animate)
}

function onEnter() { cursorEl.value?.classList.add('hover') }
function onLeave() { cursorEl.value?.classList.remove('hover') }

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  animate()
  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
  })
})
onUnmounted(() => window.removeEventListener('mousemove', onMove))
</script>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  top: -20px; left: -20px;
  width: 40px; height: 40px;
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: width 0.3s, height 0.3s, border-color 0.3s;
  will-change: transform;

  &.hover {
    width: 60px; height: 60px;
    top: -30px; left: -30px;
    border-color: #fff;
    background: rgba(255,255,255,0.05);
  }

  @media (max-width: 768px) { display: none; }
}

.cursor-dot {
  position: fixed;
  top: -3px; left: -3px;
  width: 6px; height: 6px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;

  @media (max-width: 768px) { display: none; }
}
</style>
