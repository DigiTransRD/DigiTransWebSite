<script setup lang="ts">
import ArrowIcon from '../components/ArrowIcon.vue'
import { capabilities, productFeatures, productIdentity, quickStartSteps, solutionPlans, faqItems, deploymentSteps } from '../content/homeContent'
import IntegrationDiagram from '../components/IntegrationDiagram.vue'
import ScenarioExplorer from '../components/ScenarioExplorer.vue'
import ContactSection from '../components/ContactSection.vue'
const readingPaths = [
  { number: '01', role: '給經營者與企業高管', title: '投資效益，回到真實工作衡量。', text: '從工作時間、人工步驟與資料正確性，定義 AI 導入的成功條件。', link: '查看能力與評估指標', to: '/evaluation/' },
  { number: '02', role: '給 CTO 與資訊團隊', title: '從資料到底層，看清每一層責任。', text: '深入 Schema、Mapping、Runtime 與共用資料存取架構。', link: '閱讀技術架構', to: '/architecture/' },
  { number: '03', role: '給治理與維運團隊', title: '讓每個操作，都有清楚的邊界。', text: '了解身分、權限、資料流、發布版本與異常處理的治理方式。', link: '了解安全治理', to: '/governance/' },
]
</script>
<template>
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow hero-eyebrow"><span class="status-dot" aria-hidden="true"></span> ABI ASSISTANT / BUSINESS AI AGENT</p>
        <h1>讓既有系統，<br /><em>成為 AI 原生系統。</em></h1>
        <p class="hero-description"><span class="hero-name">ABI（{{ productIdentity.fullName }}）</span>輕量級{{ productIdentity.chineseName }}，<br />專為零售、流通、餐飲與旅宿中小店家打造。<br />生成<span>表單、報表、APP，通用功能立即上線。</span><br /><span>不必自建 AI 團隊，也能啟動 AI 轉型。</span></p>
        <div class="hero-actions"><RouterLink to="/#applications" class="button button-ghost">看三種商業應用 <ArrowIcon direction="down" /></RouterLink></div>
        <div class="hero-assurance"><span>沿用既有系統</span><span>企業資料治理</span><span>工程師駐點協作</span></div>
        <RouterLink :to="productIdentity.path" class="text-link hero-product-link">認識 ABI Assistant <ArrowIcon /></RouterLink>
      </div>
      <IntegrationDiagram />
    </div>
    <div class="container integration-strip"><span>從你已經擁有的系統開始</span><div><strong>ERP</strong><strong>POS</strong><strong>CRM</strong><strong>SQL / API</strong><strong>企業知識</strong></div><RouterLink to="/integrations/">了解整合方式 <ArrowIcon /></RouterLink></div>
  </section>

  <section id="applications" class="section-pad applications-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">THREE APPLICATIONS. READY TO USE.</p><h2>表單、報表、APP，<br />通用功能立即上線。</h2></div><p class="section-description">完成安裝、資料連接與權限設定，<br />即可開始生成，將成果投入日常營運。</p></div>
      <div class="capability-grid">
        <article v-for="capability in capabilities" :key="capability.id" class="capability-card">
          <div class="card-topline"><span>{{ capability.english }}</span><span>{{ capability.number }}</span></div>
          <h3>{{ capability.label }}</h3>
          <p class="capability-headline">{{ capability.headline }}</p>
          <p class="capability-description">{{ capability.description }}</p>
          <ul><li v-for="point in capability.points" :key="point">{{ point }}</li></ul>
          <RouterLink :to="capability.path" class="card-link">深入了解 <ArrowIcon /><span class="sr-only">{{ capability.label }}</span></RouterLink>
        </article>
      </div>
      <p class="outcome-note">把 AI 的價值，留在每一個工作成果裡。</p>
    </div>
  </section>

  <section id="quick-start" class="section-pad quick-start-section" aria-labelledby="quick-start-heading">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">READY. GENERATE. GO.</p><h2 id="quick-start-heading">不寫程式，<br />三步驟長出你的管理系統。</h2></div><p class="section-description">從表單收集、報表分析到 APP 管理，<br />通用應用直接啟用，專屬流程持續擴充。</p></div>
      <ol class="quick-start-steps"><li v-for="step in quickStartSteps" :key="step.number"><span class="step-number">{{ step.number }}</span><h3>{{ step.title }}</h3><p>{{ step.description }}</p></li></ol>
      <div class="quick-start-outcomes"><span>表單上線收集</span><span>報表生成即讀</span><span>APP 發布即用</span><RouterLink to="/capabilities/generative-app/" class="text-link">了解生成式 APP <ArrowIcon /></RouterLink></div>
    </div>
  </section>

  <section id="features" class="section-pad product-features-section" aria-labelledby="features-heading">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">BUILT FOR YOUR BUSINESS</p><h2 id="features-heading">四大特色，<br />讓 AI 更快進入營運。</h2></div><p class="section-description">從建置速度、使用入口，到業態知識與流程，<br />讓 AI 貼近企業真正的工作方式。</p></div>
      <div class="product-features-grid">
        <article v-for="feature in productFeatures" :key="feature.id" class="product-feature">
          <div class="product-feature-heading"><span aria-hidden="true">{{ feature.number }}</span><h3>{{ feature.label }}</h3></div>
          <p>{{ feature.description }}</p>
          <RouterLink :to="feature.path" class="text-link">{{ feature.link }} <ArrowIcon /></RouterLink>
        </article>
      </div>
    </div>
  </section>

  <section class="section-pad scenario-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">FROM INTENT TO OUTCOME</p><h2>報表用問的，<br />表單用說的，<br />管理系統用生成的。</h2></div><p class="section-description">用熟悉的業務語言開始。<br />讓資料、工具與應用，一起為工作服務。</p></div>
      <ScenarioExplorer />
    </div>
  </section>

  <section id="foundation" class="foundation-section section-pad">
    <div class="container foundation-grid">
      <div><p class="eyebrow">ENGINEERED FOR REAL BUSINESS</p><h2>AI 的想像力，<br /><em>企業級的執行力。</em></h2><p class="section-description">讓 AI 理解業務，讓架構守住規則。<br />從生成到執行，每一層都有明確責任。</p><RouterLink class="button button-accent" to="/architecture/">深入 ABI 技術架構 <ArrowIcon /></RouterLink></div>
      <div class="foundation-list">
        <article><span>01 / CONTEXT</span><div><h3>理解企業的資料語意</h3><p>Schema、功能 Mapping 與專屬技能，讓欄位、關聯與工作方法成為 AI 可運用的上下文。</p></div></article>
        <article><span>02 / CONTROL</span><div><h3>用權限與契約管理操作</h3><p>固定 Runtime、受控工具與資料存取規則，讓執行遵循已確認的業務範圍。</p></div></article>
        <article><span>03 / CONTINUITY</span><div><h3>讓成果可以持續演進</h3><p>設計快照、發布來源與執行設定分工，支援企業在可追查的基礎上持續擴充。</p></div></article>
      </div>
    </div>
  </section>

  <section id="deployment" class="section-pad deployment-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">PLATFORM + PEOPLE</p><h2>平台的能力，<br />加上深入現場的工程師。</h2></div><div class="section-side"><p class="section-description">前進部署工程師 FDE 與你的團隊協作，<br />將專屬技能、框架與擴充功能做進流程。</p><RouterLink class="text-link" to="/deployment/">了解駐點導入服務 <ArrowIcon /></RouterLink></div></div>
      <ol class="deployment-steps"><li v-for="step in deploymentSteps" :key="step.number"><span class="step-number">{{ step.number }}</span><h3>{{ step.title }}</h3><p>{{ step.description }}</p></li></ol>
    </div>
  </section>

  <section id="solutions" class="section-pad solutions-section" aria-labelledby="solutions-heading">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">YOUR WAY TO GET STARTED</p><h2 id="solutions-heading">三種導入方案，<br />依你的節奏啟動。</h2></div><p class="section-description">依預算、部署環境與整合需求選擇。<br />先用好通用功能，再擴展企業專屬能力。</p></div>
      <div class="solution-grid"><article v-for="(plan, index) in solutionPlans" :key="plan.name" class="solution-card"><span class="eyebrow">方案 0{{ index + 1 }}</span><h3>{{ plan.name }}</h3><p class="solution-tagline">{{ plan.tagline }}</p><ul><li v-for="feature in plan.features" :key="feature">{{ feature }}</li></ul><RouterLink to="/contact/" class="card-link">洽詢{{ plan.name }} <ArrowIcon /></RouterLink></article></div>
      <p class="solution-note">三種方案皆以 ABI 核心系統為基礎，提供生成式表單、生成式報表與生成式 APP 通用能力。報價依使用規模、部署環境與服務範圍評估。</p>
    </div>
  </section>

  <section class="reading-section section-pad">
    <div class="container"><div class="section-heading"><div><p class="eyebrow">A CLOSER LOOK</p><h2>看見價值之後，<br />看懂背後的實力。</h2></div><p class="section-description">為每個決策角色，準備更深入的答案。</p></div>
      <div class="reading-grid"><RouterLink v-for="item in readingPaths" :key="item.number" :to="item.to" class="reading-card"><span class="eyebrow">{{ item.role }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p><span class="text-link">{{ item.link }} <ArrowIcon /></span></RouterLink></div>
    </div>
  </section>

  <section id="faq" class="section-pad faq-section"><div class="container faq-grid"><div><p class="eyebrow">QUESTIONS, ANSWERED.</p><h2>你可能正想知道。</h2><p class="section-description">關於 ABI 與企業 AI 導入。</p></div><div class="faq-list"><details v-for="item in faqItems" :key="item.question"><summary>{{ item.question }}<span aria-hidden="true">+</span></summary><p>{{ item.answer }}</p></details></div></div></section>
  <ContactSection />
</template>
