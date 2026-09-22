<script setup lang="ts">
import ArrowIcon from './ArrowIcon.vue'
</script>
<template>
  <figure class="integration-visual" aria-labelledby="integration-caption">
    <div class="visual-heading"><span class="eyebrow">YOUR BUSINESS. AI ENABLED.</span><span class="diagram-mark" aria-hidden="true"><ArrowIcon /></span></div>
    <div class="system-label">企業既有系統與資料</div>
    <div class="source-nodes"><span>ERP / POS</span><span>CRM / API</span><span>資料庫 / 文件</span></div>
    <div class="connector-branch" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="platform-node">
      <div><span class="platform-abi">ABI</span><span class="platform-caption">AI 原生商業應用平台</span></div>
      <p>理解需求<span>·</span>連接資料<span>·</span>執行工作</p>
      <div class="platform-tags"><span>企業技能</span><span>資料語意</span><span>權限治理</span></div>
    </div>
    <div class="connector-branch reverse" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="outcome-nodes">
      <div><span class="node-symbol" aria-hidden="true">01</span><strong>生成式表單</strong><small>收集資訊</small></div>
      <div><span class="node-symbol" aria-hidden="true">02</span><strong>生成式報表</strong><small>支持決策</small></div>
      <div><span class="node-symbol" aria-hidden="true">03</span><strong>生成式 APP</strong><small>執行業務</small></div>
    </div>
    <figcaption id="integration-caption"><span class="status-dot" aria-hidden="true"></span>整合概念圖 · 依企業流程配置與導入</figcaption>
  </figure>
</template>
