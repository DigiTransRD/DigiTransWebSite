<script setup lang="ts">
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 頁尾快速連結：對應首頁各區塊 id
const quickLinks = [
  { label: '產品功能', hash: 'features' },
  { label: '生成式APP', hash: 'genapp' },
  { label: '業態技能', hash: 'skills' },
  { label: '導入方案', hash: 'solutions' },
  { label: '常見問題', hash: 'faq' },
  { label: '業務聯繫', hash: 'contact' }
] as const

const scrollToSection = async (hash: string) => {
  if (route.path !== '/') {
    await router.push({ path: '/' })
  }
  await nextTick()
  const target = document.getElementById(hash)
  if (target) {
    const headerHeight =
      Number.parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10
      ) || 72
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <div class="brand-title">ABI Assistant</div>
        <p class="tagline">商用人工智慧助理．中小店家的智慧轉型夥伴</p>
        <p class="pitch">雲地混合架構｜LINE 官方帳號整合｜業態訂製技能包</p>
      </div>
      <div class="footer__links">
        <div class="col-title">快速連結</div>
        <button
          v-for="link in quickLinks"
          :key="link.hash"
          class="footer-link"
          type="button"
          @click="scrollToSection(link.hash)"
        >
          {{ link.label }}
        </button>
      </div>
      <div class="footer__contact">
        <div class="col-title">聯絡我們</div>
        <a href="mailto:digitrans.tw@gmail.com">digitrans.tw@gmail.com</a>
        <p class="company">資傳數位有限公司</p>
        <p class="company">Digital Transformation Consulting Ltd.</p>
      </div>
    </div>
    <div class="footer__copy">© 2026 Digital Transformation Consulting Ltd. All rights reserved.</div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0f172a;
  color: #e2e8f0;
  padding: 44px 20px 28px;
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 32px;
}

.brand-title {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
}

.tagline {
  margin: 8px 0 4px;
  color: #cbd5e1;
}

.pitch {
  margin: 0;
  color: #64748b;
  font-size: 13.5px;
}

.col-title {
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.footer__links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.footer-link {
  background: none;
  border: none;
  padding: 0;
  color: #cbd5e1;
  font-size: 14.5px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #6ee7b7;
}

.footer__contact a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14.5px;
}

.footer__contact a:hover {
  color: #6ee7b7;
}

.company {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 13.5px;
}

.footer__copy {
  max-width: 1200px;
  margin: 28px auto 0;
  padding-top: 18px;
  border-top: 1px solid rgba(226, 232, 240, 0.14);
  color: #94a3b8;
  font-size: 13px;
  text-align: center;
}

@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
