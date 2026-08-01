# ABI Assistant 行銷網站重構實作清單

日期：2026-07-09
PM 決策：方案 A（單頁重構）＋ 藍綠混搭配色（主體品牌藍、CTA 與強調元素綠）＋ 全區塊文案重寫
風格參考：sandbox.egroupai.com（淺色扁平企業風、價值支柱、對比式說服、明確 CTA 動線）
文案依據：`ABI/Docs/Specifications/AbiAssist/*`、`ABI/Docs/Specifications/AbiGenApp/*` 與 AbiAssist 原始碼實際功能

## 設計原則

- 保留既有技術棧（Vue 3 + Vite + vue-router hash + marked），不引入新依賴
- md 內容管線保留：herotags / skills / trends / solutions / about / architecture 仍由 `src/assets/context/*.md` 驅動
- 新增結構化區塊文案（價值支柱、對比、六大功能、生成式 APP、FAQ）採 TS 內容模組 `src/content/homeContent.ts`（沿用 `src/content/articles.ts` 既有慣例，型別安全、免新增解析器）
- 文案不得誇大未完成功能：生成式 APP 相關描述以規格中已具備之能力為準，涉及進行中能力使用中性描述

## 實作項目

### 1. 設計基礎
- [x] 1.1 `src/style.css`：建立藍綠混搭設計變數（--primary 藍、--accent 綠）、共用 section / 按鈕 / 卡片樣式
- [x] 1.2 `src/components/AppHeader.vue`：新導覽（產品功能／生成式APP／業態技能／導入方案／市場趨勢／常見問題／關於資傳）＋ 綠色「免費諮詢」CTA
- [x] 1.3 `src/components/AppFooter.vue`：完整頁尾（品牌＋快速連結＋聯絡資訊＋版權）

### 2. 新區塊內容模組
- [x] 2.1 `src/content/homeContent.ts`：三大價值支柱、對比表（一般雲端 AI vs ABI Assistant）、六大功能卡、生成式 APP 三步驟與能力清單、FAQ

### 3. 首頁重構（src/views/HomePage.vue）
- [x] 3.1 Hero：文字為主的大標語＋雙 CTA（免費諮詢／看導入方案）＋信任標籤
- [x] 3.2 三大價值支柱區
- [x] 3.3 對比區（一般雲端 AI 工具 vs ABI Assistant）
- [x] 3.4 六大功能卡區
- [x] 3.5 生成式 APP 專區（三步驟＋能力＋安全邊界說明）
- [x] 3.6 架構與整合區（沿用兩張架構圖＋重寫說明文字）
- [x] 3.7 業態技能區（沿用卡片版型）
- [x] 3.8 導入方案區（含方案定位 tagline 支援）
- [x] 3.9 市場趨勢文章區
- [x] 3.10 FAQ 區
- [x] 3.11 聯繫表單區（保留 mailto 流程，重整視覺）
- [x] 3.12 關於資傳區

### 4. 文案重寫（src/assets/context/）
- [x] 4.1 `herotags.md`：新副標與信任標籤
- [x] 4.2 `skills/1-通用業態技能.md`：完整技能包文案（原為佔位示例）
- [x] 4.3 `skills/2-服飾.md`：服飾業技能包文案
- [x] 4.4 `skills/3-寵物.md`：寵物業技能包文案
- [x] 4.5 `skills/4-生鮮有機.md`：生鮮有機業技能包文案
- [x] 4.6 `solutions.md`：三方案重寫＋定位 tagline
- [x] 4.7 `about.md`：關於資傳重寫
- [x] 4.8 `architecture-overview.md`：產品架構說明重寫
- [x] 4.9 `architecture-consulting.md`：系統整合說明重寫
- [x] 4.10 `trends/*.md`：補 frontmatter（title/subtitle）與語氣調整；文內既有統計數據與引註不改寫，避免捏造數據

### 5. 驗證
- [x] 5.1 `npm run build`（vue-tsc + vite build）通過
- [x] 5.2 本地 dev server 目視驗證：桌機／行動版版面、導覽捲動、modal、表單
- [x] 5.3 檢查未使用資源與殘留舊區塊 id 造成的導覽失效

## 進度記錄

- 2026-07-09：PM 決策方案 A／藍綠混搭／全面重寫，建立本清單
- 2026-07-09：完成 1.1–4.10 全部實作；5.1 `npm run build`（vue-tsc + vite build）通過；5.2 以本地 dev server 逐區截圖驗證桌機（1366px）與行動版（~760px）版面、導覽捲動、FAQ 展開、modal 開關、聯繫表單；5.3 導覽 hash（features/genapp/skills/solutions/trends/faq/about/contact）全數對應新區塊 id，無殘留失效連結
- 2026-07-09：發現既有 `ABI-Assistant-Logo-2.png` 圖檔內容實為 chatPOS 商標（檔名誤導），Header 改用 `ABI-Assistant-Logo-3.png`（ABI Assistant 品牌標誌）並以 object-fit: cover 置中裁切
- 2026-07-09：`vite.config.ts` 增加 dev server 可由 PORT 環境變數指定埠號（不影響 production build 與預設行為）
