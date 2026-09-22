<script setup lang="ts">
import ArrowIcon from './ArrowIcon.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const menuOpen = ref(false)
const navigation = [
  { label: '首頁', to: '/' },
  { label: '商業應用', to: '/#applications' },
  { label: '產品特色', to: '/#features' },
  { label: '系統整合', to: '/integrations/' },
  { label: '技術與治理', to: '/architecture/' },
  { label: '導入服務', to: '/deployment/' },
]
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <a class="skip-link" href="#main-content">跳至主要內容</a>
  <header class="site-header" @keydown.esc="menuOpen = false">
    <div class="header-inner container">
      <RouterLink to="/" class="brand-link" aria-label="ABI Assistant 商用人工智慧助理 首頁">
        <img :src="'/abi-wordmark.svg'" class="brand-mark" width="84" height="49" alt="ABI" />
        <span class="brand-copy"><span class="brand-title">ASSISTANT</span><span class="brand-description">商用人工智慧助理</span></span>
      </RouterLink>
      <nav class="desktop-nav" aria-label="主要導覽">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to" :class="{ 'is-current': item.to === route.fullPath }">{{ item.label }}</RouterLink>
      </nav>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="mobile-navigation" :aria-label="menuOpen ? '關閉選單' : '開啟選單'" @click="menuOpen = !menuOpen">
        <span>{{ menuOpen ? '×' : '☰' }}</span>
      </button>
    </div>
    <nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="行動版導覽">
      <RouterLink v-for="item in navigation" :key="item.to" :to="item.to" @click="menuOpen = false">{{ item.label }} <ArrowIcon /></RouterLink>
      <RouterLink to="/governance/">安全治理 <ArrowIcon /></RouterLink>
      <RouterLink to="/evaluation/">能力指標 <ArrowIcon /></RouterLink>
    </nav>
  </header>
</template>
