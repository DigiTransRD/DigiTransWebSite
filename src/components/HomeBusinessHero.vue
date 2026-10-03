<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ArrowIcon from './ArrowIcon.vue'
import { productIdentity } from '../content/homeContent'
import { createBusinessNetworkAnimation } from './createBusinessNetworkAnimation'
import airportImage from '../assets/images/homepage/hero-v2-airport-owner.webp'
import airportMobileImage from '../assets/images/homepage/hero-v2-airport-owner-mobile.webp'
import storeImage from '../assets/images/homepage/hero-v2-store-checkout.webp'
import storeMobileImage from '../assets/images/homepage/hero-v2-store-checkout-mobile.webp'
import officeImage from '../assets/images/homepage/hero-v2-headquarters-office.webp'
import officeMobileImage from '../assets/images/homepage/hero-v2-headquarters-office-mobile.webp'

const heroElement = ref<HTMLElement | null>(null)
let stopAnimation: (() => void) | undefined

onMounted(() => {
  stopAnimation = createBusinessNetworkAnimation(heroElement.value!)
})
onUnmounted(() => { stopAnimation?.() })
</script>

<template>
<section ref="heroElement" class="hero hero-business-network" aria-labelledby="hero-title">
      <div class="hero-network-stage" aria-label="門市營運、總部後台與策略管理三場景視覺">
        <div class="hero-scene-layer hero-scene-airport"><picture><source media="(max-width: 760px)" :srcset="airportMobileImage" /><img :src="airportImage" width="1448" height="1086" alt="老闆出國時在機場候機區使用平板觀看營運資訊，窗外可見飛機" loading="eager" decoding="async" fetchpriority="high" /></picture></div>
        <div class="hero-scene-layer hero-scene-store"><picture><source media="(max-width: 760px)" :srcset="storeMobileImage" /><img :src="storeImage" width="1448" height="1086" alt="門市人員在收銀櫃台操作 POS，顧客以付款卡結帳" loading="eager" decoding="async" fetchpriority="high" /></picture></div>
        <div class="hero-scene-layer hero-scene-office"><picture><source media="(max-width: 760px)" :srcset="officeMobileImage" /><img :src="officeImage" width="1448" height="1086" alt="總部辦公室的營運人員共同檢視電腦上的業務資訊" loading="eager" decoding="async" fetchpriority="high" /></picture></div>
        <canvas class="hero-network-canvas" aria-hidden="true"></canvas>
        <figure class="hero-chart hero-chart-store">
          <div class="hero-chart-traveler" aria-hidden="true"><div class="hero-chart-graphic"><svg viewBox="0 0 190 130"><rect class="chart-glass" x="8" y="8" width="174" height="110" rx="9" /><path class="chart-soft" d="M24 21H74M148 21H166" /><rect x="23" y="30" width="144" height="77" rx="2" /><path d="M42 30V107M76 30V107M109 30V107M140 30V107M23 47H167M23 67H167M23 87H167" /><path class="chart-soft" d="M30 38H35M52 38H64M85 38H99M119 38H130M149 38H158M30 57H35M30 77H35M30 97H35M49 57H66M49 77H62M49 97H66M116 57H132M148 77H158M116 97H131M148 97H159" /><rect class="chart-bright" x="76" y="47" width="33" height="40" /><path class="chart-bright" d="M82 57H101M82 77H97" /><rect class="chart-bright" x="107" y="85" width="4" height="4" /></svg></div></div>
          <figcaption><strong>門市營運</strong><span><span class="hero-label-term">銷售數據、</span><span class="hero-label-term">庫存管理</span></span></figcaption>
        </figure>
        <figure class="hero-chart hero-chart-office">
          <div class="hero-chart-traveler" aria-hidden="true"><div class="hero-chart-graphic"><svg viewBox="0 0 190 130"><rect class="chart-glass" x="8" y="8" width="174" height="110" rx="9" /><path class="chart-soft" d="M27 43H165M27 69H165M27 95H165" /><path d="M27 28V101H164" /><rect x="40" y="51" width="14" height="49" rx="2" /><rect x="60" y="68" width="14" height="32" rx="2" /><rect x="91" y="36" width="14" height="64" rx="2" /><rect x="111" y="57" width="14" height="43" rx="2" /><rect x="142" y="46" width="14" height="54" rx="2" /><path class="chart-bright" d="M36 35L69 43L102 26L137 30L161 21" /></svg></div></div>
          <figcaption><strong>總部後台</strong><span><span class="hero-label-term">跨店管理、</span><span class="hero-label-term">營運分析</span></span></figcaption>
        </figure>
        <figure class="hero-chart hero-chart-airport">
          <div class="hero-chart-traveler" aria-hidden="true"><div class="hero-chart-graphic"><svg viewBox="0 0 190 130"><rect class="chart-glass" x="8" y="8" width="174" height="110" rx="9" /><circle class="chart-soft" cx="67" cy="62" r="32" /><path class="chart-bright" d="M67 30A32 32 0 0 1 97 73M91 85A32 32 0 0 1 43 83M36 54A32 32 0 0 1 59 31" /><circle cx="67" cy="62" r="19" /><path d="M118 39H160M118 53H151M118 67H161" /><path class="chart-bright" d="M116 93L126 83L136 88L147 77L161 69" /><path class="chart-soft" d="M116 101H164" /></svg></div></div>
          <figcaption><strong>策略管理</strong><span><span class="hero-label-term">企業決策、</span><span class="hero-label-term">營運情報</span></span></figcaption>
        </figure>
      </div>
      <div class="hero-reading-shade" aria-hidden="true"></div>
      <div class="hero-content container">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow"><span class="status-dot" aria-hidden="true"></span> ABI / {{ productIdentity.fullName }}</p>
          <h1 id="hero-title"><span>掌握營運</span><span>看懂數據</span><span><em>做對決策</em></span></h1>
          <p class="hero-description">AI轉型，不必花大錢建團隊。<br />ABI幫您快速蛻變成為AI企業。</p>
          <div class="hero-actions"><RouterLink to="/#applications" class="button">看 AI 能做什麼 <ArrowIcon direction="down" /></RouterLink><RouterLink to="/abi-assistant/" class="text-link">認識 ABI <ArrowIcon /></RouterLink></div>
        </div>
        <div class="hero-bottom"><p class="hero-identity"><strong>{{ productIdentity.name }}</strong><br />零售、餐飲 中小店家AI轉型的忠實夥伴</p><span class="hero-caption">門市 × 總部 × 行動決策</span></div>
      </div>
    </section>
</template>
