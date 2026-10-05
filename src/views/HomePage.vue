<script setup lang="ts">
import ArrowIcon from '../components/ArrowIcon.vue'
import HomeBusinessHero from '../components/HomeBusinessHero.vue'
import ScenarioExplorer from '../components/ScenarioExplorer.vue'
import { faqItems, solutionPlans } from '../content/homeContent'
import HomeApplicationCards from '../components/HomeApplicationCards.vue'
import '../styles/homepage-visual.css'
</script>

<template>
  <div class="homepage-visual">
    <HomeBusinessHero />
    <div class="integration-strip"><div class="integration-inner container"><span class="integration-intro">升級舊系統，注入AI智慧</span><div class="integration-names"><span>ERP, POS, CRM, 進銷存, Excel表格...</span></div><RouterLink class="text-link" to="/integrations/">了解整合 <ArrowIcon /></RouterLink></div></div>
    <section id="applications" class="section" aria-labelledby="applications-title">
      <div class="container">
        <div class="section-heading"><div><p class="eyebrow">FROM WORDS TO WORK</p><h2 id="applications-title">說出需求，<br />生成你的商業應用。</h2></div><p>從一份表單、一張報表，<br />到營運管理 APP。</p></div>
        <HomeApplicationCards />
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
