<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  { label: '產品功能', hash: 'features' },
  { label: '生成式APP', hash: 'genapp' },
  { label: '業態技能', hash: 'skills' },
  { label: '導入方案', hash: 'solutions' },
  { label: '市場趨勢', hash: 'trends' },
  { label: '常見問題', hash: 'faq' },
  { label: '關於資傳', hash: 'about' }
] as const

type NavHash = (typeof navItems)[number]['hash']

const isNavOpen = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const activeHash = ref<NavHash>(navItems[0].hash)
const sectionIds = navItems.map((x) => x.hash) as NavHash[]

// 支援導覽項目與「免費諮詢」CTA（contact 區塊不在導覽列，但仍可捲動抵達）
const scrollToSection = async (hash: NavHash | 'contact') => {
  if (route.path !== '/') {
    await router.push({ path: '/' })
  }
  await nextTick()
  const target = document.getElementById(hash)
  if (target) {
    const headerHeight = headerRef.value?.offsetHeight ?? 72
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top, behavior: 'smooth' })
    if ((sectionIds as string[]).includes(hash)) {
      activeHash.value = hash as NavHash
    }
  }
  isNavOpen.value = false
}

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
}

const updateActiveHash = () => {
  const headerHeight = headerRef.value?.offsetHeight ?? 72
  const scrollY = window.scrollY + headerHeight + 16
  let current: NavHash = navItems[0].hash

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop
      if (scrollY >= top) {
        current = id
      }
    }
  }
  activeHash.value = current
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveHash, { passive: true })
  updateActiveHash()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveHash)
})
</script>

<template>
  <header ref="headerRef" class="header">
    <RouterLink to="/" class="header__brand" aria-label="ABI Assistant Home">
      <!-- 注意：ABI-Assistant-Logo-2.png 實為 chatPOS 商標，本站需使用 ABI Assistant 品牌 Logo-3 -->
      <img class="logo-img" src="@/assets/images/ABI-Assistant-Logo-3.png" alt="ABI Assistant" />
    </RouterLink>

    <nav class="nav desktop">
      <button
        v-for="item in navItems"
        :key="item.hash"
        :class="['nav__link', { active: activeHash === item.hash }]"
        type="button"
        @click="scrollToSection(item.hash)"
      >
        {{ item.label }}
      </button>
    </nav>

    <div class="header__actions">
      <button class="cta-button" type="button" @click="scrollToSection('contact')">
        免費諮詢
      </button>
      <button :class="['menu-toggle', { open: isNavOpen }]" type="button" @click="toggleNav">
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </button>
    </div>

    <div v-if="isNavOpen" class="overlay" @click="closeNav" />
    <nav class="side-nav" :class="{ open: isNavOpen }">
      <div class="side-nav__links">
        <button
          v-for="item in navItems"
          :key="item.hash"
          :class="['nav__link', { active: activeHash === item.hash }]"
          type="button"
          @click="scrollToSection(item.hash)"
        >
          {{ item.label }}
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
  height: var(--header-height, 72px);
  gap: 12px;
  box-sizing: border-box;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  width: 200px;
  height: 70px;
  /* Logo-3 原圖四周留白較大，以 cover 置中裁切讓標誌填滿可視範圍 */
  object-fit: cover;
  flex-shrink: 0;
}

@media (max-width: 1100px) {
  .logo-img {
    width: 160px;
    height: 56px;
  }
}

.brand-text {
  line-height: 1.2;
  color: #0f172a;
}

.brand-name {
  font-weight: 700;
}

.brand-sub {
  font-size: 12px;
  color: #475569;
}

.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav::-webkit-scrollbar {
  display: none;
}

.nav__link {
  padding: 12px 14px;
  color: #1e3a8a;
  border-radius: 10px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav__link:hover {
  background: #e2e8f0;
}

.nav__link.active {
  text-decoration: underline;
  text-decoration-color: #f97316;
  text-decoration-thickness: 4px;
  text-underline-offset: 6px;
  background: #e2e8f0;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cta-button {
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--color-accent, #059669), #10b981);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.cta-button:hover {
  background: linear-gradient(135deg, var(--color-accent-strong, #047857), var(--color-accent, #059669));
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(5, 150, 105, 0.28);
}

@media (max-width: 480px) {
  .cta-button {
    padding: 8px 12px;
    font-size: 14px;
  }
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 8px;
  gap: 4px;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.bar {
  width: 100%;
  height: 2px;
  background: #0f172a;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.menu-toggle.open .bar:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.menu-toggle.open .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.open .bar:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

.overlay {
  position: fixed;
  top: var(--header-height, 72px);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 18;
}

.side-nav {
  position: fixed;
  top: var(--header-height, 72px);
  right: 0;
  width: 130px;
  height: calc(100vh - var(--header-height, 72px));
  background: #fff;
  border-right: 1px solid #e2e8f0;
  box-shadow: 6px 0 24px rgba(15, 23, 42, 0.12);
  padding: 12px;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.25s ease;
  z-index: 19;
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: none;
}

.side-nav.open {
  transform: translateX(0);
  pointer-events: auto;
}

.side-nav__links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  width: 100%;
}

.side-nav .nav__link {
  width: 100%;
  text-align: center;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
  flex-grow: 0;
  height: auto;
}

@media (max-width: 1100px) {
  .nav.desktop {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  /* 當視窗變窄時，側欄導覽按鈕設定適當高度 */
  .side-nav .nav__link {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 8px;
    padding-right: 8px;
    line-height: 1.4;
    height: auto;
    min-height: 44px;
    flex-shrink: 0;
    flex-grow: 0;
    box-sizing: border-box;
    align-self: flex-start;
    font-size: 16px;
    text-align: center;
  }
}

@media (min-width: 901px) and (max-width: 1100px) {
  .nav__link {
    font-size: 16px;
    padding: 12px 10px;
  }
}
</style>
