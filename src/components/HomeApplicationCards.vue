<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import ArrowIcon from './ArrowIcon.vue'
import formsOrder from '../assets/images/homepage/forms-order.webp'
import formsOrderMobile from '../assets/images/homepage/forms-order-mobile.webp'
import formsReplenishment from '../assets/images/homepage/forms-replenishment.webp'
import formsReplenishmentMobile from '../assets/images/homepage/forms-replenishment-mobile.webp'
import reportsLive from '../assets/images/homepage/reports-live.webp'
import reportsLiveMobile from '../assets/images/homepage/reports-live-mobile.webp'
import reportsOwner from '../assets/images/homepage/reports-owner.webp'
import reportsOwnerMobile from '../assets/images/homepage/reports-owner-mobile.webp'
import appErp from '../assets/images/homepage/app-erp.webp'
import appErpMobile from '../assets/images/homepage/app-erp-mobile.webp'
import appCycle from '../assets/images/homepage/app-cycle.webp'
import appCycleMobile from '../assets/images/homepage/app-cycle-mobile.webp'

interface ApplicationScene { image: string; mobileImage: string; description: string }
const applications = [
  { name: '生成式表單', tag: '讓門店管理工作更高效', title: '設計表單，用說的。', workflow: '自然語言描述需求->生成草稿->審核修訂->發佈表單', to: '/capabilities/generative-forms/', scenes: [
    { image: formsOrder, mobileImage: formsOrderMobile, description: '門市建立促銷顧客訂貨單，顧客使用手機 LINE 填單訂購商品' },
    { image: formsReplenishment, mobileImage: formsReplenishmentMobile, description: '門市巡查貨架填寫補貨單，總部倉庫以電腦收單發貨' },
  ] },
  { name: '生成式報表', tag: '讓後台統計報表更彈性', title: '製作報表，用問的。', workflow: '自然語言提出問題->產出範本->版面修訂->發行報表', to: '/capabilities/generative-reports/', scenes: [
    { image: reportsLive, mobileImage: reportsLiveMobile, description: '門市櫃台收銀結帳，總部辦公室即時分析報表' },
    { image: reportsOwner, mobileImage: reportsOwnerMobile, description: '多家門市進行收銀交易，老闆在車上查看營運數據' },
  ] },
  { name: '生成式 APP', tag: '讓企業營運流程更順暢', title: '開發系統，用生成的。', workflow: 'AI分析->生成功能->修訂流程->部署上線', to: '/capabilities/generative-app/', scenes: [
    { image: appErp, mobileImage: appErpMobile, description: '前進部署工程師協助 IT 人員串接 ERP，總部人員驗收 APP' },
    { image: appCycle, mobileImage: appCycleMobile, description: 'APP 作業循環：門市查架補貨、供應商出貨、物流送貨、門市進貨' },
  ] },
]
const grid = ref<HTMLElement | null>(null)
const dialog = ref<HTMLDialogElement | null>(null)
const activeSlide = ref(0)
const enlargedScene = ref<ApplicationScene | null>(null)
let observer: IntersectionObserver | undefined
let timer: ReturnType<typeof setInterval> | undefined
let inView = false
let previousOverflow = ''
let scrollLocked = false

async function enlarge(scene: ApplicationScene) {
  enlargedScene.value = scene
  await nextTick()
  if (!dialog.value?.isConnected) return
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  scrollLocked = true
  dialog.value.showModal()
}

function restorePage() {
  enlargedScene.value = null
  if (scrollLocked) document.body.style.overflow = previousOverflow
  scrollLocked = false
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  observer = new IntersectionObserver(([entry]) => { inView = entry!.isIntersecting })
  observer.observe(grid.value!)
  timer = setInterval(() => {
    if (!inView || document.hidden || enlargedScene.value || reducedMotion.matches) return
    const nextSlide = (activeSlide.value + 1) % 2
    const nextImages = grid.value!.querySelectorAll<HTMLImageElement>(`img[data-slide="${nextSlide}"]`)
    const visibleImages = [...nextImages].filter(image => {
      const bounds = image.getBoundingClientRect()
      return bounds.bottom > 0 && bounds.top < window.innerHeight
    })
    if (visibleImages.every(image => image.complete && image.naturalWidth > 0)) activeSlide.value = nextSlide
  }, 3000)
})

onUnmounted(() => {
  clearInterval(timer)
  observer?.disconnect()
  dialog.value?.close()
  restorePage()
})
</script>

<template>
  <div ref="grid" class="application-grid">
    <article v-for="(application, index) in applications" :key="application.to" class="application-card">
      <button class="application-photo" type="button" :aria-label="`放大${application.name}圖片：${application.scenes[activeSlide]!.description}`" @click="enlarge(application.scenes[activeSlide]!)">
        <picture v-for="(scene, slide) in application.scenes" :key="scene.image" class="application-slide" :class="{ 'is-active': activeSlide === slide }" :aria-hidden="activeSlide !== slide">
          <source media="(max-width: 760px)" :srcset="scene.mobileImage" />
          <img :src="scene.image" :alt="scene.description" :data-slide="slide" loading="lazy" decoding="async" />
        </picture>
        <span class="photo-tag">{{ application.tag }}</span>
      </button>
      <RouterLink class="application-body" :to="application.to">
        <div class="application-kicker">0{{ index + 1 }} / {{ application.name }}</div>
        <h3>{{ application.title }}</h3>
        <p>{{ application.workflow }}</p>
        <span class="application-link">探索{{ application.name }} <ArrowIcon /></span>
      </RouterLink>
    </article>
  </div>
  <Teleport to="body">
    <dialog ref="dialog" class="application-lightbox" aria-label="營運情境圖片全螢幕展示" @close="restorePage" @click="($event.target === $event.currentTarget) && dialog?.close()">
      <button type="button" class="application-lightbox-close" aria-label="關閉放大圖片" autofocus @click="dialog?.close()">×</button>
      <figure v-if="enlargedScene">
        <img :src="enlargedScene.image" :alt="enlargedScene.description" />
        <figcaption>{{ enlargedScene.description }}</figcaption>
      </figure>
    </dialog>
  </Teleport>
</template>
