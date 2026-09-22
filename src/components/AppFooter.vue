<script setup lang="ts">
import ArrowIcon from './ArrowIcon.vue'
import { capabilities } from '../content/homeContent'
</script>
<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <RouterLink to="/" class="footer-logo" aria-label="ABI Assistant 商用人工智慧助理 首頁"><img :src="'/abi-wordmark.svg'" class="brand-mark" width="84" height="49" alt="ABI" /><span class="brand-copy"><span class="brand-title">ASSISTANT</span><span class="brand-description">商用人工智慧助理</span></span></RouterLink>
        <p>讓企業的既有優勢，<br />成為 AI 時代的下一步。</p>
        <span class="eyebrow">BUSINESS AI AGENT</span>
      </div>
      <div><h2>商業應用</h2><RouterLink v-for="item in capabilities" :key="item.id" :to="item.path">{{ item.label }}</RouterLink><RouterLink to="/integrations/">既有系統整合</RouterLink></div>
      <div><h2>深入了解</h2><RouterLink to="/abi-assistant/">認識 ABI Assistant</RouterLink><RouterLink to="/architecture/">技術架構</RouterLink><RouterLink to="/governance/">安全治理</RouterLink><RouterLink to="/evaluation/">能力與驗收指標</RouterLink><RouterLink to="/#solutions">三種導入方案</RouterLink><RouterLink to="/deployment/">FDE 導入服務</RouterLink></div>
      <div><h2>資傳數位</h2><RouterLink to="/about/">關於我們</RouterLink><RouterLink to="/articles/skills/">產業技能文章</RouterLink><RouterLink to="/articles/trends/">趨勢與觀點</RouterLink><a href="mailto:digitrans.tw@gmail.com">digitrans.tw@gmail.com <ArrowIcon /></a></div>
    </div>
    <div class="container footer-bottom"><span>© {{ new Date().getFullYear() }} 資傳數位有限公司</span><span>Digital Transformation Consulting Ltd.</span><RouterLink to="/contact/#data-notice">洽詢資料說明</RouterLink></div>
  </footer>
</template>
