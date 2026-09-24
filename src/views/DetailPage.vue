<script setup lang="ts">
import ArrowIcon from '../components/ArrowIcon.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getDetailPage } from '../content/detailContent'
import IntegrationDiagram from '../components/IntegrationDiagram.vue'
import ArchitectureGovernanceDiagram from '../components/ArchitectureGovernanceDiagram.vue'
const route = useRoute()
const page = computed(() => getDetailPage(route.path))
const related = computed(() => page.value?.related.map(getDetailPage).filter(item => !!item) ?? [])
</script>
<template>
  <article v-if="page" class="detail-page">
    <header class="detail-hero container"><nav class="breadcrumbs" aria-label="麵包屑"><RouterLink to="/">首頁</RouterLink><span aria-hidden="true">/</span><span>{{ page.category.split(' / ')[0] }}</span></nav><p class="eyebrow">{{ page.category }}</p><h1>{{ page.title }}</h1><p class="detail-lead">{{ page.lead }}</p><div class="detail-facts"><div v-for="fact in page.facts" :key="fact.label"><span>{{ fact.label }}</span><strong>{{ fact.value }}</strong></div></div></header>
    <div class="container detail-layout">
      <div class="detail-body">
        <p class="detail-summary">{{ page.description }}</p>
        <ArchitectureGovernanceDiagram v-if="page.path === '/architecture/'" />
        <IntegrationDiagram v-else-if="page.path === '/integrations/'" />
        <section v-for="section in page.sections" :id="section.id" :key="section.id" class="detail-section"><h2>{{ section.title }}</h2><p>{{ section.body }}</p><ul v-if="section.points"><li v-for="point in section.points" :key="point">{{ point }}</li></ul></section>
        <section v-if="page.table" id="assessment" class="detail-section"><h2>{{ page.table.title }}</h2><div class="table-scroll" tabindex="0" :aria-label="page.table.title"><table><thead><tr><th v-for="heading in page.table.headers" :key="heading" scope="col">{{ heading }}</th></tr></thead><tbody><tr v-for="(row, index) in page.table.rows" :key="index"><th scope="row">{{ row[0] }}</th><td v-for="(cell, cellIndex) in row.slice(1)" :key="cellIndex">{{ cell }}</td></tr></tbody></table></div></section>
        <div class="editor-note"><span class="eyebrow">ABI / 持續演進</span><p>本文由資傳數位整理。產品持續優化，實際導入以確認的資料、權限、版本及驗收範圍為準。</p></div>
      </div>
    </div>
    <section class="related-section section-pad"><div class="container"><p class="eyebrow">CONTINUE EXPLORING</p><h2>接著，深入你關心的面向。</h2><div class="reading-grid"><RouterLink v-for="item in related" :key="item.path" :to="item.path" class="reading-card"><span class="eyebrow">{{ item.category }}</span><h3>{{ item.title }}</h3><p>{{ item.lead }}</p><span class="text-link">繼續閱讀 <ArrowIcon /></span></RouterLink></div></div></section>
    <section class="detail-cta"><div class="container"><div><p class="eyebrow">YOUR NEXT STEP</p><h2>把你的場景，帶進來討論。</h2></div><RouterLink class="button button-accent" to="/contact/">預約導入評估 <ArrowIcon /></RouterLink></div></section>
  </article>
</template>
