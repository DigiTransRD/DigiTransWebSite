<script setup lang="ts">
import ArrowIcon from '../components/ArrowIcon.vue'
import HomeBusinessHero from '../components/HomeBusinessHero.vue'
import ScenarioExplorer from '../components/ScenarioExplorer.vue'
import { faqItems, solutionPlans } from '../content/homeContent'
import businessScenesImage from '../assets/images/homepage/business-scenes.webp'
import businessScenesMobileImage from '../assets/images/homepage/business-scenes-mobile.webp'
import '../styles/homepage-visual.css'
</script>

<template>
  <div class="homepage-visual">
    <HomeBusinessHero />
    <div class="integration-strip"><div class="integration-inner container"><span class="integration-intro">升級舊系統，注入AI智慧</span><div class="integration-names"><span>ERP, POS, CRM, 進銷存, Excel表格...</span></div><RouterLink class="text-link" to="/integrations/">了解整合 <ArrowIcon /></RouterLink></div></div>
    <section id="applications" class="section" aria-labelledby="applications-title">
      <div class="container">
        <div class="section-heading"><div><p class="eyebrow">FROM WORDS TO WORK</p><h2 id="applications-title">說出需求，<br />生成你的商業應用。</h2></div><p>從一份表單、一張報表，<br />到營運管理 APP。</p></div>
        <div class="application-grid">
          <RouterLink class="application-card" to="/capabilities/generative-forms/"><div class="application-photo"><picture><source media="(max-width: 760px)" :srcset="businessScenesMobileImage" /><img :src="businessScenesImage" width="2172" height="724" alt="零售店主使用筆電處理日常工作，營運情境示意" loading="lazy" decoding="async" /></picture><span class="photo-tag">讓門店管理工作更高效</span></div><div class="application-body"><div class="application-kicker">01 / 生成式表單</div><h3>設計表單，用說的。</h3><p>自然語言描述需求-&gt;生成草稿-&gt;審核修訂-&gt;發佈表單</p><span class="application-link">探索生成式表單 <ArrowIcon /></span></div></RouterLink>
          <RouterLink class="application-card" to="/capabilities/generative-reports/"><div class="application-photo"><picture><source media="(max-width: 760px)" :srcset="businessScenesMobileImage" /><img class="scene-center" :src="businessScenesImage" width="2172" height="724" alt="餐飲主管使用平板檢視營運，營運情境示意" loading="lazy" decoding="async" /></picture><span class="photo-tag">讓後台統計報表更彈性</span></div><div class="application-body"><div class="application-kicker">02 / 生成式報表</div><h3>製作報表，用問的。</h3><p>自然語言提出問題-&gt;產出範本-&gt;版面修訂-&gt;發行報表</p><span class="application-link">探索生成式報表 <ArrowIcon /></span></div></RouterLink>
          <RouterLink class="application-card" to="/capabilities/generative-app/"><div class="application-photo"><picture><source media="(max-width: 760px)" :srcset="businessScenesMobileImage" /><img class="scene-right" :src="businessScenesImage" width="2172" height="724" alt="旅宿經理在櫃台操作筆電，營運情境示意" loading="lazy" decoding="async" /></picture><span class="photo-tag">讓企業營運流程更順暢</span></div><div class="application-body"><div class="application-kicker">03 / 生成式 APP</div><h3>開發系統，用生成的。</h3><p>AI分析-&gt;生成功能-&gt;修訂流程-&gt;部署上線</p><span class="application-link">探索生成式 APP <ArrowIcon /></span></div></RouterLink>
        </div>
      </div>
    </section>
    <section id="features" class="features-section" aria-labelledby="features-title">
      <div class="features-layout container">
        <div class="features-copy"><p class="eyebrow">YOUR BUSINESS. YOUR AI AGENT.</p><h2 id="features-title">懂你的行業，<br />接上你的營運。</h2><div class="feature-list">
          <article class="feature-item"><h3>既有系統，升級 AI</h3><p>沿用資料，接上新能力。</p><RouterLink class="text-link" to="/integrations/">系統整合 <ArrowIcon /></RouterLink></article>
          <article class="feature-item"><h3>從 LINE 開始工作</h3><p>讓 AI 融入熟悉的入口。</p><RouterLink class="text-link" to="/integrations/#line">LINE 整合 <ArrowIcon /></RouterLink></article>
          <article class="feature-item"><h3>業態專屬技能</h3><p>用你的術語、知識與流程。</p><RouterLink class="text-link" to="/architecture/#skills">業態技能 <ArrowIcon /></RouterLink></article>
          <article class="feature-item"><h3>工程師協作落地</h3><p>專屬需求，現場一起完成。</p><RouterLink class="text-link" to="/deployment/">導入服務 <ArrowIcon /></RouterLink></article>
        </div></div>
        <ScenarioExplorer />
      </div>
    </section>
    <section id="solutions" class="start-section" aria-labelledby="start-title"><div class="start-layout container"><div class="start-copy"><p class="eyebrow">START WITH ONE REAL TASK</p><h2 id="start-title">從一個場景，<br />開始你的 AI 轉型。</h2><div class="plan-links"><RouterLink v-for="plan in solutionPlans" :key="plan.name" class="plan-link" to="/contact/" :aria-label="'洽詢' + plan.name">{{ plan.name }}</RouterLink></div><p class="start-condition">完成安裝、資料連接與權限設定後，即可啟用。<br />專屬流程與特殊介接，由工程師協作完成。</p></div><RouterLink class="button button-gold" to="/contact/">預約導入評估 <ArrowIcon /></RouterLink></div></section>
    <section id="faq" class="faq-section" aria-labelledby="faq-title"><div class="faq-layout container"><div class="faq-copy"><p class="eyebrow">QUESTIONS, ANSWERED.</p><h2 id="faq-title">你可能正想知道。</h2><p>點開你在意的問題，<br />再多了解一點。</p></div><div class="faq-list"><details v-for="item in faqItems" :key="item.question"><summary>{{ item.question }}<span aria-hidden="true">+</span></summary><p>{{ item.answer }}</p></details></div></div></section>

  </div>
</template>
