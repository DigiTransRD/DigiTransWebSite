# ABI 原生 AI 商業應用網站改版

- 檔案名稱：_implementation-checklist-ABI-20260922-AiNativeWebsiteRedesign.md
- 任務編號：PM-20260922-AiNativeWebsiteRedesign
- 任務範圍：D:\BiShop\AiAgentGitHub\DigiTransWebSite；ABI 原始碼與規格僅供查證。
- 負責 Agent：ABI，PM 授權直接實作，不另派工。
- PM 決策摘要：可自由調整色系、結構、選單、文案、圖表；強化三種生成式商業應用、既有系統整合、技術治理及前進部署工程師服務；完成後本機審查，不發布。
- 目前狀態：DONE；ABI 圖樣已放大並校正 SVG 留白，可見上下邊緣與右側文字對齊，建置、響應式及品牌入口驗證通過，待 PM 本機審閱。
- 對應 request/reply board：無，本輪非並行工作。

## 方案與邊界

沿用 Vue 3、Vue Router、Vite 及現有洽詢 API，不新增套件。首頁提供十秒價值辨識，能力、整合、架構、治理、導入與評估指標各有完整深入頁。以原生語意 HTML、可探索連結、同一 Vue 元件的建置期預先渲染與結構化資料支援搜尋。保留既有 hash 網址進入與文章內容。ABI 為持續開發中的新系統，文案不虛構實測數據、認證或客戶背書；專屬技能與功能擴充明確歸屬導入服務。

## 實作檢核

- [x] 加入零售、流通、餐飲、旅宿中小店家的輕量導入定位與「不必自建 AI 團隊」價值；呈現報表用問、表單用說、管理系統生成的應用方式，將「資料留店內」明確限定為可留在店內的營運資料庫。
- [x] 首頁摘要補充 ABI（Artificial Business Intelligence），同步既有 FAQ、產品定義及搜尋資料；選用提供的箭頭 PNG，統一選單、按鈕、卡片與連結圖示。依 PM 後續意見，以原圖透明輪廓及 CSS currentColor 套色取代純黑，驗證方向、明暗、手機版面與原有入口。

- [x] 確認實際網站根目錄、既有框架、路由、文章與洽詢 API 契約。
- [x] 查閱 ABI Overview、AbiGenApp Overview、AbiXpand Overview 與對應實作。
- [x] 首頁、品牌、共用導覽與響應式視覺重構。依 PM 中高齡閱讀審查意見，加大全站正文至 20px、操作文字至 18px、輔助文字至少 16px，調整手機頁首換行與錨點偏移。
- [x] 三種生成式應用與技術、治理、導入、能力指標深入頁。
- [x] 補充快速建置、LINE 生態整合、業態專屬技能、企業流程框架：首頁特色區、導覽入口、深入說明與搜尋語意；維持大字閱讀並驗證連結與響應式版面。
- [x] 更新 LOGO：移除 BY DIGITRANS、保留 ASSISTANT 與中文兩行名稱，導覽增加首頁；依 PM 後續審查放大 ABI 圖樣並調整 SVG 留白，讓圖樣置中且上下邊緣與右側文字對齊。
- [x] 依截圖移除「收集資訊 → 形成洞察 → 執行業務」，保留框外說明；LOGO 僅保留 ABI，右側 ASSISTANT 與中文上下排列，手機頁首縮至 76px；懸浮按鈕改為琥珀金並驗證對比、入口及頁腳留白。
- [x] 全站底部左側提供「導入方案」、右側提供精簡「預約評估」懸浮按鈕，移除首屏原導入方案按鈕；預留頁腳及行動版安全區空間，驗證兩個入口、手機並排及各頁最後一行未受遮蔽。
- [x] 依 PM 確認的產品定位，加入三種生成式通用功能立即可用與三步驟啟用說明；企業專屬功能維持 FDE 擴充定位。
- [x] 沿用舊站 solutions.md 的租賃、使用權買斷、客製整合三種方案，修飾文案並保留授權、更新、訓練及支援條件。
- [x] 保留洽詢提交契約與既有文章入口。
- [x] 全站改為霧白、亮藍、海軍藍與琥珀金色系，清除原墨綠色及相關圖表色值；維持大字、緊湊頁首與懸浮按鈕留白。
- [x] 建立 ABI Assistant 產品總覽與可見名詞定義，明確連結商用人工智能助理、商用人工智慧助理及 Business AI Agent；同步首頁、FAQ 與產品結構化資料。
- [x] 強化 canonical、可擷取靜態 HTML、搜尋爬蟲 robots、sitemap、Markdown 對應版本與 llms.txt 索引；同源生成，避免公開內容與機器可讀內容不一致。
- [x] 以正式建置成品驗證無 JavaScript 內容、GEO 輸出、站內連結、配色對比、響應式版面及頁腳遮蔽；不發布、不宣稱排名或收錄保證。
- [x] metadata、靜態 HTML、結構化資料與搜尋入口。
- [x] TypeScript / Vite 正式建置。
- [x] 審查 UAT 前提：本機網站、示意內容、攔截洽詢 API，不寄送真實聯絡資料。
- [x] 桌機、平板、手機、導覽、內容切換、FAQ、洽詢成功與失敗狀態驗證。
- [x] 靜態 HTML 無 JavaScript 可讀性、內部連結、編碼與修改範圍驗證。

## 風險與後續

- 不部署正式站、不修改 ABI 產品或後端 API。
- 搜尋收錄與 AI 引用無法保證；正式網址由部署設定提供。
- 洽詢 API 既有瀏覽器簽章不是伺服器端秘密；本輪保持契約，公開上線前仍需專項審查既有後端個資存取控制。
- 本輪網站 UAT 不代表 ABI 產品正式環境端到端驗收。

## 驗證結果

- LOGO 對齊追加驗證：調整 abi-wordmark.svg、style.css 與頁首／頁腳圖片尺寸。修正 SVG 留白，顯示寬度改為 96px，可見字形高度由約 31px 放大至約 40px；右側文字維持 20／18px，手機頁首仍為 76px。
- TypeScript／Vite／SSR／21 頁建置通過。正式成品於 320／370／390／600／768／1151／1440px 檢查皆無溢出，LOGO 與右側文字的可見上下邊緣差距在此瀏覽器量測均小於 1px，字形水平中心差距 0.25px，窄螢幕選單保有間距。320／600px 頁首已視覺檢視，手機選單、首頁及頁腳品牌入口正常，320px 頁腳品牌完整位於容器內。Console 無 errors／warnings；未新增依賴、派工或發布。

- 雙懸浮入口追加驗證：修改 App.vue、HomePage.vue 與 style.css，移除首屏方案按鈕，新增全站左下「導入方案」，右下精簡為「預約評估」。TypeScript／Vite／SSR／21 頁建置通過。
- 正式成品以 320／1440px 檢查 21 頁共 42 次，兩按鈕文字、網址、18px 字級、同列及可見範圍皆正確；無水平溢出，兩按鈕最小間距 18px、頁腳末行留白至少 23.67px。320px 按鈕及 600px 首屏已視覺檢視。
- 390px 跨頁方案跳轉、同網址再次定位與預約入口通過；700×400 選單與底部按鈕保有 24px 距離，導覽正常。兩按鈕間的透明區域可操作底下內容，列印時整組隱藏。Console 無 errors／warnings；未新增依賴、派工、發布或送出洽詢資料。

- 舊站文案追加驗證：只調整 HomePage.vue 與 homeContent.ts，將輕量級 AI、中小店家業態、不必自建 AI 團隊、LINE 入口及三種生成式應用方式放入既有區段。「資料留店內」明確表達為營運資料庫可留店內，與現行雲地協作及資料流說明一致。
- 正式 TypeScript／Vite／SSR／21 頁建置通過；新增的 5 段關鍵文字皆存在於首頁靜態正文，JSON-LD 可解析，LINE 深入連結保留。320／390／600／768／1151／1440px 首頁無水平溢出，正文維持 20px；桌機首屏及手機應用標題已視覺檢視，LINE 特色連結正確到達 /integrations/#line，Console 無 errors／warnings。未新增套件、派工、發布或變更洽詢流程。

- 箭頭套色追加驗證：TypeScript／Vite／SSR／21 頁建置通過。沿用原 PNG 透明輪廓，CSS currentColor 正確呈現選單 #52627a、品牌連結 #205bc3、金色按鈕 #172b4d 與深色按鈕白色。正式成品以 320／600／1440px 驗證首頁、產品總覽、文章列表與 404 共 12 次，無純黑箭頭、缺少遮罩、水平溢出或可及性標記遺失。已視覺檢視手機選單與金色按鈕，導覽及預約入口通過，Console 無 errors／warnings。修改限共用圖示、選單箭頭色彩及既有紀錄，未新增依賴或發布。

- ABI 全名與圖示追加驗證：正式 TypeScript／Vite／SSR／21 頁建置通過；首頁摘要、可見 FAQ、產品 HTML／Markdown、SoftwareApplication alternateName 及 llms.txt 均包含 Artificial Business Intelligence，並明確說明 ABI 縮寫。
- 使用 PM 提供的 Live_1230.png 黑色與 Live_1230_1.png 白色原圖。21 頁於 320／1440px 共 42 次檢查，286 個箭頭實例載入正常、具裝飾性可及性標記，無水平溢出，正文保持 20px，頁腳末行留白至少 23.67px。首頁另於 390／600／768／1151px 檢查通過；320px 首頁、600px 手機選單及桌機已視覺檢視。
- 手機 8 個選單箭頭對齊、功能連結與收合、金色預約按鈕、文章返回及首頁向下跳轉均通過；箭頭方向正確且 Console 無 errors／warnings。沒有新增依賴、派工、發布或送出洽詢資料，原始圖示檔案未修改。

- 明亮配色與 GEO 追加驗證：TypeScript、Vite client／SSR 及 21 個 HTML（含 404）建置通過；20 個可收錄頁面在停用 JavaScript 時仍可閱讀。10 份詳細頁 Markdown、llms.txt、sitemap 與 robots.txt 產出完整，Markdown 與 robots 實際 HTTP 回傳 200 且內容類型正確。
- 搜尋一致性：659 個站內連結及錨點通過；文章連結統一使用正式結尾斜線路徑。每頁 canonical、robots、JSON-LD 與產品名稱關聯正確，首頁 FAQ 可見文字與 JSON-LD 一致。客戶端切換頁面會同步更新或移除 Markdown alternate 連結。
- 全站以 320／1440px 檢查 21 頁共 42 次，正文維持 20px，頁首及內容無水平溢出，頁腳末行與懸浮按鈕間距至少 23.67px；首頁另檢查 390／660／768／950／1151px。產品總覽入口、手機導覽、段落錨點、FAQ、洽詢入口與舊 hash 路徑通過。未送出洽詢資料。
- 色彩驗證：8 組主要文字組合對比均達 4.5:1 以上；白字／主藍 6.28:1、輔助文字／淡藍 5.56:1、金色懸浮按鈕 8.60:1、hover 7.23:1。桌機、手機首頁、三步驟區塊及產品總覽已視覺檢視；瀏覽器 Console 無 errors 或 warnings。
- GEO 範圍：允許 Googlebot、Bingbot、OAI-SearchBot 與 PerplexityBot 搜尋爬取；其餘沿原 wildcard 規則。未改變既有訓練爬蟲政策，未發送搜尋提交、未發布或新增依賴。正式部署後仍需確認公開檔案與主機／CDN 爬蟲存取，再觀察收錄及引用。

- 截圖修訂追加驗證：TypeScript／Vite／SSR／20 頁預先渲染通過；正式成品確認流程文字列移除、框外說明保留、SVG 僅含 ABI。Playwright 以 320／1440px 檢查 20 頁共 40 次，頁首未溢出、品牌文字正確上下排列、頁腳末行與按鈕最小間距 47.69px；390／660／700／768／950／1151px 首頁檢查亦通過。按鈕 hover、洽詢連結、手機首頁導覽及新頁首高度的錨點定位通過。按鈕文字對比 7.39:1，hover 6.22:1，淺底邊框對比 4.31:1；Console 無 errors 或 warnings。

- 品牌、懸浮入口與導入方案追加驗證：TypeScript／Vite／SSR／20 頁預先渲染通過；使用獨立 4173 preview 驗證正式成品，20 頁於 320、390、1440px 共 60 次均無水平溢出、保有單一 H1，滑到底部後頁腳最後文字與按鈕最小間距 47.69px；首頁另於 700、768、950、1100、1151px 檢查頁首及新增區段均正常。正文維持 20px。
- 新增入口互動驗證：桌機與手機「首頁」、手機選單收合、三種方案洽詢、懸浮按鈕及 700×400 窄高度選單通過。新版 LOGO 確認不含 BY DIGITRANS，ASSISTANT 放大，手機中文名稱另行排列。
- 最新靜態成品 602 個站內連結與錨點均有效，三步驟、即用說明、三種方案及中文產品名稱存在於預先渲染正文；JSON-LD 可解析；Console 無 errors 或 warnings。首頁及導入頁的方案資料共用 solutions.md，未變更既有洽詢 API，也未送出真實洽詢。

- `npm run build`：TypeScript、Vite client、Vite SSR 與預先渲染全部通過；未新增依賴。
- 20 個 HTML 頁面（含 404），每頁具有完整正文、單一 H1、metadata 與可解析 JSON-LD；產出 sitemap.xml、robots.txt。
- 靜態成品共檢查 505 個站內連結與錨點，全部可到達。
- 四項產品特色追加驗證：TypeScript／Vite／20 頁預先渲染通過，最新成品 552 個站內連結與錨點皆有效，四項特色正文與 SoftwareApplication featureList 一致。Playwright 以 320、390、768、1151、1440px 檢查首頁、導入、整合及架構頁共 20 次，無水平溢出，正文保持 20px；四項連結在桌機與手機共 8 次點擊均正確定位，手機新增選單入口通過。Console 無 errors 或 warnings。使用 PM 已啟動的 5173 網站，未停止其程序。
- Playwright 正式成品檢查：1440、768、390、320px，各 15 個代表頁面，共 60 次，無整頁水平溢出且各有單一 H1。
- 桌機／手機視覺檢視；窄螢幕橫向溢出已修正。
- 大字版追加驗證：320、390、700、768、950、1100、1440px 的首頁、導入、架構、治理、洽詢與文章共 42 次檢查，無整頁水平溢出，主要正文皆為 20px；圖表、卡片與按鈕無文字裁切，手機選單、情境切換與目錄錨點通過。TypeScript／Vite／20 頁預先渲染再次通過，Console 無 errors 或 warnings。
- 手機選單開關／Escape、選單導航、三種情境切換／鍵盤方向鍵與 Home、FAQ 展開收合、頁內目錄、404、舊 hash 文章網址及獨立頁刷新均通過。
- 七個核心頁面在停用 JavaScript 的瀏覽器中可直接讀取正文；停用 JavaScript 時洽詢輸入與送出停用並提供說明，避免原生 GET 表單外洩欄位。
- 洽詢測試先核對後端欄位長度與 payload 契約；採 `.invalid` 測試信箱並攔截 API，確認必填阻擋、成功清空、失敗保留內容、簽章存在與原 Content-Type／lang／欄位集合不變。未傳送真實洽詢。
- 最新正式成品瀏覽器 Console：0 errors、0 warnings。
- `git diff --check` 通過；27 個變更／新增檔案通過 UTF-8 無 BOM、CRLF 與無 NUL 字元檢查。

## 交付與依據

- 首頁與共用視覺：HomePage、AppHeader、AppFooter、style.css、SVG 品牌資產、IntegrationDiagram、ScenarioExplorer。
- 深入內容：detailContent、DetailPage；涵蓋三種應用、整合、架構、治理、FDE、評估指標與公司。
- 保留：原洽詢 API、六篇 Markdown 文章、舊 hash 網址進入；文章版面與導覽同步調整。
- 搜尋輸出：siteMetadata、entry-server、prerender、router、main、index、build script；沿用同一 Vue 元件渲染，不建立第二份正文。
- 資料來源：ABI/Docs/Specifications/AbiGenApp/AbiGenAppOverview.md、AbiXpandOverview.md、AbiAssistOverview.md；歷史表單／報表規格以現行 Forms、Reports 與 StructuredTransactionExecutor 原始碼交叉確認。
- 搜尋參考：https://developers.google.com/search/docs/appearance/ai-features
- 搜尋爬蟲參考：https://developers.openai.com/api/docs/bots 、https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- 補充機器閱讀格式參考：https://llmstxt.org/ 。此格式不取代搜尋索引，也不代表排名訊號。
- 正式網址沿用既有 SalesContactWebhookChecklist 中的 https://www.digitrans.com.tw/。
- 只修改 DigiTransWebSite；ABI 產品程式、資料庫、後端 API、部署工作流程與套件依賴不變。
- 本輪沒有派工、外部發布或 PM 待決策阻塞；待 PM 開啟本機網站提出審查意見。
