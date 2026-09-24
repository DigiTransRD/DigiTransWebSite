<script setup lang="ts">
import { productIdentity } from '../content/homeContent'
</script>

<template>
  <figure class="architecture-diagram" aria-labelledby="architecture-diagram-title" aria-describedby="architecture-diagram-caption">
    <header class="architecture-diagram-heading">
      <p class="eyebrow">ARCHITECTURE &amp; GOVERNANCE</p>
      <h2 id="architecture-diagram-title">雲地分工，<br />每一層都有責任邊界。</h2>
    </header>

    <div class="architecture-design-basis">
      <p>共同的資料定義</p>
      <ol aria-label="資料結構、業務功能與執行規則">
        <li><strong>Schema</strong><span>資料結構</span></li>
        <li><strong>Mapping</strong><span>業務功能</span></li>
        <li><strong>Runtime</strong><span>執行規則</span></li>
      </ol>
    </div>

    <div class="architecture-responsibilities">
      <section class="architecture-execution" aria-labelledby="architecture-execution-title">
        <h3 id="architecture-execution-title">技術分工</h3>
        <ol class="architecture-layers">
          <li>
            <span class="architecture-layer-number" aria-hidden="true">01</span>
            <div><h4>使用入口</h4><p class="architecture-component-name">瀏覽器 / LINE</p><p>提出需求，進入適用功能。</p></div>
          </li>
          <li>
            <span class="architecture-layer-number" aria-hidden="true">02</span>
            <div><h4>雲端協作</h4><p class="architecture-component-name">AbiAsstAPI / AbiGenApp</p><p>訊息與部署協作、APP 登入及受控執行介面。</p><p class="architecture-boundary">APP Runtime 不直接連線企業業務資料庫。</p></div>
          </li>
          <li>
            <span class="architecture-layer-number" aria-hidden="true">03</span>
            <div><h4>地端執行</h4><p class="architecture-component-name">AbiAssistant</p><p>資料連線、生成設計與工具執行。</p><div class="architecture-data-target"><strong>企業資料庫</strong><span>依授權及資料規則存取</span></div></div>
          </li>
        </ol>
      </section>

      <section class="architecture-governance" aria-labelledby="architecture-governance-title">
        <h3 id="architecture-governance-title">治理責任</h3>
        <ul>
          <li><h4>生成有依據</h4><p>企業技能與流程框架定義工作步驟、輸出格式及檢核規則。</p></li>
          <li><h4>操作有權限</h4><p>受控服務檢查身分、操作權限及資料範圍。</p></li>
          <li><h4>發布可追查</h4><p>設計快照與發布設定分開保存，確認版本與內容來源。</p></li>
          <li><h4>交易要一致</h4><p>同一資料庫的批次交易，任一步驟失敗時完整回滾。</p></li>
        </ul>
      </section>
    </div>

    <figcaption id="architecture-diagram-caption">ABI（{{ productIdentity.fullName }}）雲地協作概念圖：AI 代理結合技能與工具，受控服務執行授權操作。實際路徑依功能與部署設定。模型可配置於本地或雲端；使用雲端模型時，須確認上下文的傳送範圍。</figcaption>
  </figure>
</template>

<style scoped>
.architecture-diagram { margin-bottom: 44px; padding: 32px; border: 1px solid var(--line); border-radius: 20px; background: var(--white); overflow-wrap: anywhere; }
.architecture-diagram-heading .eyebrow { color: var(--brand); margin-bottom: 16px; }
.architecture-diagram-heading h2 { font-size: clamp(26px, 3vw, 34px); line-height: 1.5; letter-spacing: -.7px; }
.architecture-design-basis { margin-block: 28px; padding: 20px; background: var(--pale); border-radius: 8px; }
.architecture-design-basis > p { color: var(--muted); font-size: var(--text-small); margin-bottom: 14px; }
.architecture-design-basis ol { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; list-style: none; margin: 0; padding: 0; }
.architecture-design-basis li + li { border-left: 1px solid var(--line); padding-left: 16px; }
.architecture-design-basis strong, .architecture-design-basis span { display: block; }
.architecture-design-basis strong { color: var(--brand); font-size: var(--text-ui); }
.architecture-design-basis span { color: var(--muted); font-size: var(--text-small); }
.architecture-responsibilities { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 28px; }
.architecture-responsibilities h3 { margin: 0 0 20px; font-size: var(--text-ui); font-weight: 650; }
.architecture-responsibilities h4 { margin: 0 0 6px; font-size: var(--text-ui); font-weight: 650; }
.architecture-responsibilities p { font-size: var(--text-small); color: var(--muted); }
.architecture-layers { list-style: none; margin: 0; padding: 0; }
.architecture-layers > li { display: grid; grid-template-columns: 32px minmax(0, 1fr); gap: 14px; position: relative; padding-bottom: 26px; }
.architecture-layers > li:last-child { padding-bottom: 0; }
.architecture-layers > li:not(:last-child)::after { content: ''; position: absolute; left: 15px; top: 38px; bottom: 6px; width: 1px; background: var(--line); }
.architecture-layer-number { display: flex; justify-content: center; align-items: center; width: 32px; height: 32px; border: 1px solid var(--line); border-radius: 50%; color: var(--brand); font-size: var(--text-small); font-variant-numeric: tabular-nums; }
.architecture-layers .architecture-component-name { color: var(--ink); font-size: var(--text-small); font-weight: 600; margin-bottom: 8px; }
.architecture-layers .architecture-boundary { margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--line); color: var(--brand); }
.architecture-data-target { display: flex; flex-direction: column; margin-top: 18px; padding: 16px; border-radius: 8px; background: var(--brand); color: var(--white); }
.architecture-data-target strong { font-size: var(--text-ui); }
.architecture-data-target span { font-size: var(--text-small); }
.architecture-governance { border-left: 1px solid var(--line); padding-left: 28px; }
.architecture-governance ul { list-style: none; margin: 0; padding: 0; }
.architecture-governance li + li { margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--line); }
.architecture-governance h4 { color: var(--brand); }
.architecture-diagram figcaption { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--muted); font-size: var(--text-small); line-height: 1.8; }
@media (max-width: 700px) {
  .architecture-diagram { padding: 22px; }
  .architecture-responsibilities { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .architecture-governance { border-left: 0; border-top: 1px solid var(--line); padding: 24px 0 0; }
  .architecture-design-basis { padding: 16px; }
  .architecture-design-basis ol { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .architecture-design-basis li { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px; }
  .architecture-design-basis li + li { border-left: 0; border-top: 1px solid var(--line); padding: 12px 0 0; }
}
</style>
