<script setup lang="ts">
import ArrowIcon from './ArrowIcon.vue'
import { ref, nextTick } from 'vue'
const active = ref(0)
const scenarios = [
  { label: '生成式表單', question: '「幫我建立一份門市巡檢表。」', title: '把現場觀察，轉成結構化紀錄。', text: '先定義巡檢項目與填寫規則，再發布給門市人員使用。', path: '/capabilities/generative-forms/', items: [{ label: '巡檢對象', value: '門市、日期、負責人' }, { label: '檢查內容', value: '環境清潔、設備、異常說明' }, { label: '後續應用', value: '收集、查詢與追蹤改善' }] },
  { label: '生成式報表', question: '「哪些商品需要優先檢查庫存？」', title: '讓營運問題，對上真實資料。', text: '依授權資料與確認的庫存口徑，生成可檢視的營運報表。', path: '/capabilities/generative-reports/', items: [{ label: '查詢範圍', value: '指定門市與商品類別' }, { label: '分析依據', value: '可用庫存、銷售與補貨規則' }, { label: '工作成果', value: '有資料依據的庫存檢視報表' }] },
  { label: '生成式 APP', question: '「用現有資料庫建立採購管理 APP。」', title: '從資料關聯，走到可操作的應用。', text: '確認供應商、採購主單與明細的對應，再生成操作介面。', path: '/capabilities/generative-app/', items: [{ label: '結構來源', value: '既有資料庫 Schema' }, { label: '功能設計', value: '供應商、採購主單與明細' }, { label: '執行控制', value: '角色權限、欄位規則、交易處理' }] },
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
  document.getElementById('scenario-tab-' + index)?.focus()
}
</script>
<template>
  <div class="scenario-explorer">
    <div class="scenario-tabs" role="tablist" aria-label="選擇業務應用情境" @keydown="changeTab">
      <button v-for="(scenario, index) in scenarios" :id="'scenario-tab-' + index" :key="scenario.label" role="tab" type="button" :aria-selected="active === index" :aria-controls="'scenario-panel-' + index" :tabindex="active === index ? 0 : -1" @click="active = index"><span class="tab-number">0{{ index + 1 }}</span>{{ scenario.label }}</button>
    </div>
    <div v-for="(scenario, index) in scenarios" v-show="active === index" :id="'scenario-panel-' + index" :key="scenario.label" class="scenario-panel" role="tabpanel" :aria-labelledby="'scenario-tab-' + index" tabindex="0">
      <div class="scenario-story"><span class="eyebrow">從一句需求開始</span><p class="scenario-question">{{ scenario.question }}</p><h3>{{ scenario.title }}</h3><p>{{ scenario.text }}</p><RouterLink class="text-link" :to="scenario.path">探索{{ scenario.label }} <ArrowIcon /></RouterLink></div>
      <div class="scenario-result"><div class="result-topline"><span>需求 → 可用成果</span><span class="small-label">應用情境示意</span></div><dl><div v-for="item in scenario.items" :key="item.label"><dt>{{ item.label }}</dt><dd>{{ item.value }}</dd></div></dl><p>實際功能依資料、權限與導入設定驗收。</p></div>
    </div>
  </div>
</template>
