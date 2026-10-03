<script setup lang="ts">
import { ref, nextTick } from 'vue'

const active = ref(0)
const scenarios = [
  { id: 'report', label: '看報表', request: '「幫我整理各門市的營運狀況。」', flow: '授權資料 → AI 分析 → 報表成果', title: '門市營運報表', parts: ['營運摘要', '分析圖表', '查詢明細'] },
  { id: 'form', label: '建表單', request: '「建立一份門市巡檢回報表。」', flow: '描述需求 → 確認欄位 → 發布收集', title: '門市巡檢表單', parts: ['巡檢項目', '回報欄位', '資料收集'] },
  { id: 'app', label: '生 APP', request: '「用現有資料建立採購管理 APP。」', flow: '既有資料 → 確認功能 → 生成應用', title: '採購管理 APP', parts: ['供應商管理', '採購單', '主從明細'] },
]

async function changeTab(event: KeyboardEvent) {
  let index = active.value
  if (event.key === 'ArrowRight') index = (index + 1) % scenarios.length
  else if (event.key === 'ArrowLeft') index = (index + scenarios.length - 1) % scenarios.length
  else if (event.key === 'Home') index = 0
  else if (event.key === 'End') index = scenarios.length - 1
  else return
  event.preventDefault()
  active.value = index
  await nextTick()
  document.getElementById(scenarios[index]!.id + '-tab')?.focus()
}
</script>

<template>
  <div class="workbench">
    <div class="workbench-top"><span class="workbench-title">一句交辦，一份工作成果。</span><span class="demo-badge">應用情境示意</span></div>
    <div class="scenario-tabs" role="tablist" aria-label="探索 AI 工作情境" @keydown="changeTab">
      <button v-for="(scenario, index) in scenarios" :id="scenario.id + '-tab'" :key="scenario.id" class="scenario-tab" role="tab" :aria-selected="active === index" :aria-controls="scenario.id + '-panel'" :tabindex="active === index ? 0 : -1" type="button" @click="active = index">{{ scenario.label }}</button>
    </div>
    <div v-for="(scenario, index) in scenarios" v-show="active === index" :id="scenario.id + '-panel'" :key="scenario.id" class="scenario-panel" :class="{ enter: active === index }" role="tabpanel" :aria-labelledby="scenario.id + '-tab'" tabindex="0">
      <p class="request-label">你用業務語言提出需求</p><p class="request">{{ scenario.request }}</p>
      <div class="agent-flow"><span class="status-dot" aria-hidden="true"></span><span>{{ scenario.flow }}</span><span class="agent-flow-line" aria-hidden="true"></span></div>
      <div class="result"><div class="result-top"><h3>{{ scenario.title }}</h3><span class="result-tag">成果示意</span></div><div class="result-parts"><span v-for="part in scenario.parts" :key="part">{{ part }}</span></div></div>
    </div>
    <p class="workbench-note">資料操作依權限與業務規則執行；實際成果依資料及導入設定確認。</p>
  </div>
</template>
