# ABI 首頁視覺草案實作檢核

- 授權範圍：依 PM 2026-10-02 要求，先製作一版以 AI 智能體、圖片與動效為主的首頁草案。
- 實際專案根目錄：`D:\BiShop\AiAgentGitHub\DigiTransWebSite`。
- 本次交付：`output/homepage-draft/index.html` 與此草案使用的本機圖片；為獨立審閱稿，正式 Vue 首頁整合待草案討論後決定。
- 內容依據：`src/content/homeContent.ts`、`src/assets/context/solutions.md`、`Docs/brand-spec.md` 及現行導覽。
- 設計基準：海軍藍 `#16345e`、亮藍 `#205bc3`、霧白 `#f6f8fc`、金色行動按鈕 `#f4c35a`；沿用 ABI SVG 與既有本機字型。正文 20px、操作 18px、輔助文字至少 16px。
- 構圖：首屏電影感 AI 營運主視覺；三種生成式應用以照片呈現；互動情境搭配精簡產品亮點；導入方案與 FAQ 留作下一步。
- 動效：三場景圖層、旋轉圖表、神經網絡光流與情境切換；Hero v2 移除暫停控制，持續播放並遵守系統 reduced motion 偏好。
- 事實邊界：圖片及互動皆為營運概念示意；不呈現虛構客戶、成效數字、實際查詢結果或假產品截圖。
- 維護方式：不新增 npm 依賴；FAQ、產品定義及方案由現行內容來源產生。

## Hero v1 進度

- [x] 確認實際根目錄、現行首頁、品牌及內容來源。
- [x] 確認草案構圖、文案亮點與限定交付範圍。
- [x] 生成及檢視 AI 營運主視覺與營運場景照片。
- [x] 完成具響應式版型與動效的 HTML 草案。
- [x] 注入現行 FAQ、產品定義與導入方案。
- [x] 查核桌機、平板、手機排版與圖片載入。
- [x] 查核互動、鍵盤操作、動效暫停與 reduced motion。
- [x] 確認無前端錯誤及失效資產，保存預覽截圖。
- [x] 開啟草案供 PM 審閱。

## Hero v1 查核結果

- Playwright 檢查 1440、1024、768、390、360、320px 寬度，未發現水平溢位。
- 桌機與手機實際截圖已檢視，修正手機標題斷行、最小 44px 選單操作尺寸與平板示意標籤位置。
- 三種情境可切換；左右方向鍵、Home／End、行動選單、Escape 關閉及頁內連結皆依草案的操作規格查核。
- 動效可暫停及恢復；系統偏好 reduced motion 時，確認變更事件處理完成、按鈕停用、無執行中的 CSS 動畫。
- 8 則 FAQ 與 3 種導入方案已同步現行來源，包含 ABI 正式全名、定義與導入限制；產生腳本重複執行結果一致。
- 草案 JavaScript 語法查核通過；本機圖檔皆載入成功；瀏覽器無 error／warning。
- 未執行正式網站建置：本次交付為獨立 HTML 審閱稿，未修改正式 Vue 應用；以本機 Vite 預覽及瀏覽器驗證草案。
- 圖片產製使用內建 ImageGen，完整提示詞記錄於 `image-generation-prompts.txt`。
- 預覽：`http://127.0.0.1:4175/output/homepage-draft/index.html`。
- 交付截圖：`desktop-hero.png`、`desktop-full.png`、`mobile-hero.png`、`mobile-full.png`。

## Hero v2：三場景與神經網絡

PM 已指定：移除暫停動效按鈕、備份現有 Hero，以門市收銀、總部辦公室、老闆出國在機場觀看營運資料三個圖片圖層，搭配旋轉的藍色圖表輪廓、發光神經網絡及沿線流動光點。

範圍仍限目前首頁草案 Hero 與必要素材。照片由內建 ImageGen 生成；圖表及連線採 SVG／Canvas／CSS，不新增套件。圖表無實際營運數字，畫面標示概念示意。

- [x] 備份現行 HTML 至 `index-hero-v1-backup.html`，SHA-256 與修改前原檔一致；既有圖片保持原檔。
- [x] 生成三個獨立場景照片圖層。
- [x] 移除草案的暫停動效按鈕及其事件。
- [x] 建立三場景混合版面與代表性圖表插圖。
- [x] 完成圖表持續旋轉、神經網絡動態發光及沿線光點。
- [x] 查核桌機、平板、手機，以及既有情境切換與 FAQ 操作。
- [x] 確認 Hero v1 備份可獨立預覽，保存新版截圖並提供新版供 PM 審閱。

### Hero v2 查核結果

- 2026-10-02：1440、1024、768、390、360、320px 均無水平溢位，三個圖表容器均位於圖片舞台範圍內；手機版文字與主要圖層分區呈現。
- 在瀏覽器前景取樣兩個時間點，Canvas 畫面雜湊與圖表的 CSS transform 均有變化，三個旋轉動畫皆為 infinite；頁面無暫停動效按鈕。
- 行動選單開啟／Escape 關閉、報表／表單／APP 切換、Home 鍵及 FAQ 展開／收合均通過。
- 系統 reduced motion 時停止動效，解除系統偏好後恢復。頁面不可見時暫停 Canvas 繪製，返回後繼續播放。
- Hero v1 備份保留原視覺與按鈕，SHA-256 為 `4CE0992696758C6244D00FF38713C45B80D33447A98D1AB84985B62CCD351E90`。
- 瀏覽器未發現 error／warning；JavaScript 語法查核通過。本次未改正式 Vue 首頁、API、套件或內容來源。
- 圖片產製使用內建 ImageGen，新增三張照片與完整提示詞均保存；旋轉圖表與連線為概念示意，不含虛構營運數據。
- 新版預覽：`http://127.0.0.1:4176/output/homepage-draft/index.html#main-content`。
- 原版預覽：`http://127.0.0.1:4176/output/homepage-draft/index-hero-v1-backup.html`。
- 新版截圖：`hero-v2-desktop.png`、`hero-v2-mobile-top.png`、`hero-v2-mobile-scenes.png`、`hero-v2-mobile-full.png`。

## Hero 圖表流動與文案修正

依 PM 指定保留三場景照片及底圖配置，只修改 Hero 三組標籤、底部文字、門市圖表意象及圖表移動動畫。沿用既有 SVG／Canvas／CSS；不新增依賴，保留原版備份。

- [x] 將標籤改為「門市營運／銷售數據、庫存管理」、「總部後台／跨店管理、營運分析」、「策略管理／企業決策、營運情報」。
- [x] 移除 Hero 的「照片、圖表與連線皆為營運概念示意」，底部「門市 × 總部 × 行動決策」由 16px 放大兩級至 20px，改為接近純白。
- [x] 門市圖表改為藍色發光的 Excel 報表格線意象。
- [x] 圖表保留自轉，沿既有神經線縮小進入中心並消失，再隨機沿不同方向向外放大；場景標籤維持原位。
- [x] 查核完整流動循環、桌機／手機版與系統 reduced motion 偏好。
- [x] 確認照片及底圖規則、非 Hero 內容、正式程式及原版備份未更動，保存預覽。

### 本次查核結果

- 動畫直接使用 Canvas 神經線的同一組 Bézier 路徑；三個圖表各自保留 CSS 自轉，只有圖形隨線移動，文字標籤維持原位。
- 每輪隨機選擇另一個出口，排除原方向，三個出口不重複。循環包含停留、向中心縮小、消失、向外放大，再持續下一輪。
- 桌機逐時取樣：三幅圖表皆完整出現 inbound／center／outbound 狀態，向內縮小、向外放大，中心時 scale／opacity 為 0；位置與中心節點相差小於 1px。取樣點均可讀到 Canvas 線條，文字標籤位置不變。
- 手機逐時取樣：三幅圖表皆完成相同循環，進出方向不同，移動圖形全程位於舞台內。
- 1440、1024、768、390、360、320px 均無水平溢位。手機標籤按完整詞組換行，保留 PM 指定的文字。
- 底部標語實際為 20px、`#f8fbff`，指定移除的 Hero 說明文字不存在。
- reduced motion 時圖表恢復場景原位並停止；解除後繼續。行動選單、Escape、情境切換、Home 鍵與 FAQ 均通過。
- 三張場景素材雜湊與原始 ImageGen 圖片一致；底圖樣式未改。非 Hero 內容區段與原版備份一致，正式程式無修改，v1 備份 SHA-256 未變。
- JavaScript 及內嵌腳本語法通過，正常載入頁面無 error／warning。像素取樣查核曾產生 Canvas readback 效能提示，為驗證程式讀取像素所致；產品繪製沒有該讀取操作。
- 預覽：`http://127.0.0.1:4176/output/homepage-draft/index.html?review=network-flow#main-content`。
- 截圖：`hero-network-flow-desktop.png`、`hero-network-flow-mobile-scenes.png`、`hero-network-flow-mobile-full.png`。

## 2026-10-03：整合至正式 Vue 首頁

PM 已授權將完整 homepage-draft 整合至正式目錄，再由 PM 使用 GitHub Desktop 推送。實際根目錄為 `D:\BiShop\AiAgentGitHub\DigiTransWebSite`；沿用既有 Vue、Vite、RouterLink、ArrowIcon、ScenarioExplorer、內容來源、預先渲染與 GitHub Pages 發行流程，不新增套件。這是已上線網站首頁優化，不涉及 API、資料庫、業務資料或資料遷移。

- [x] 確認正式首頁、共用 Layout、建置與部署目錄，核對草案最新版文案與動畫。
- [x] 更新 `src/views/HomePage.vue` 為草案的首頁區段，保留共用頁首、頁尾與洽詢入口。
- [x] 新增首頁 Hero 元件與具卸載清理的 TypeScript 動畫，避免切換內頁時遺留 RAF、Observer 及事件。
- [x] 調整既有 `ScenarioExplorer.vue` 為草案工作情境，保留點擊與方向鍵／Home／End 操作。
- [x] 將圖片納入 `src/assets/images/homepage`，由 Vite 產生可部署的雜湊資產；原始草案與備份保留。
- [x] 首頁樣式限定於首頁容器，避免影響洽詢、產品及其他內頁；保留 reduced motion 與響應式版型。
- [x] FAQ 及方案名稱讀取既有內容來源，保留 SEO 結構化資料並同步 llms.txt 首頁索引。
- [x] 執行正式 `npm run build`，確認生成的首頁、CSS、JavaScript 及圖片均存在於 `dist`。
- [x] 驗證正式建置的桌機／手機、完整動畫循環、情境切換、FAQ、連結、前往內頁再返回及正常瀏覽器訊息。
- [x] 回寫進度，提供正式本機預覽；不代替 PM 推送或發布。
### 正式整合查核結果

- 正式 `npm run build` 通過，產生 21 個靜態 HTML 與 10 份 Markdown；首頁引用的部署資產均存在，沒有依賴草案目錄。
- 四張圖片與原稿雜湊一致，原 Hero 備份未變；圖片、樣式及動畫已納入正式 Vite 建置。
- 1440、1024、768、390、360、320px 均無水平溢位。完整動畫循環通過，三圖表會自轉、縮小進入中心、消失，再沿不同出口放大。
- 情境點擊與鍵盤、FAQ、手機選單、洽詢入口、reduced motion、離開首頁清理及返回重啟均通過。瀏覽器無 error／warning，未送出洽詢表單。
- FAQ 與方案沿用既有內容來源；未修改 API、資料庫、其他內頁、套件或部署流程。
- 正式建置預覽：`http://127.0.0.1:4177/`。驗證截圖保存於本機視覺化目錄。
- 尚未提交、推送或發布，由 PM 使用 GitHub Desktop 推送至 main 後觸發既有 GitHub Pages 工作流程。
## 2026-10-03：首頁圖片載入優化

PM 已同意轉換 WebP、手機尺寸版本及保留既有構圖與動畫。僅修改首頁圖片資產與直接引用，不新增依賴，原 PNG 保留。

- [x] 產生桌機與手機 WebP，核對尺寸、大小及畫質。
- [x] 更新正式首頁圖片引用，Hero 立即載入、下方圖片延遲載入。
- [x] 執行正式建置，驗證手機／桌機選圖、圖片顯示及動畫。
- [x] 回寫驗證結果，保留原稿，由 PM 自行推送。

### 圖片優化查核結果

- Hero 原 PNG 共 5,634,852 bytes；WebP 桌機共 339,804 bytes，手機共 204,692 bytes，手機減少 96.37%。下方情境圖由 2,204,088 bytes 降為桌機 159,866 bytes／手機 114,232 bytes。
- 桌機原尺寸 1448×1086，手機 960×720；下方情境圖保留完整構圖。原 PNG 保留且不再被正式首頁引用。
- 正式 npm run build 通過（21 靜態頁、10 Markdown）。390px 僅請求手機 Hero，1440px 僅請求桌機 Hero，沒有雙份下載或水平溢位；下方手機版也正確選圖。
- 桌機與手機截圖人工檢視通過，圖片正常解碼，Canvas 及圖表移動正常。動畫、CSS、API、套件與部署流程未修改。
- 預覽 http://127.0.0.1:4177/；未推送或發布。實際手機載入時間仍取決於網路及裝置，本次驗證為資產下載量與本機正式建置。

## 2026-10-05：應用卡片情境輪播與圖片放大

PM 已核准：流程文字 20px → 16px；六張指定真人情境照片；每卡兩圖 3 秒淡入淡出；圖片開全螢幕，其他區域進原功能頁。圖片與連結分離，不新增套件。

- [x] 生成並檢視六張指定情境，轉為桌機與手機 WebP。
- [x] 沿用首頁卡片外觀，分離圖片按鈕與功能說明連結。
- [x] 實作輪播、可存取全螢幕展示、背景／Esc／關閉按鈕及離頁清理。
- [x] 流程文案縮小兩級；驗證正式建置、桌機／手機、圖片下載與操作。

### 本次查核結果

- 生成六張真人營運情境圖片，以藍色發光資料線串聯；正式資產位於 src/assets/images/homepage，1536×1024 桌機 WebP 與 720×480 手機 WebP，未新增套件。
- 每卡兩張圖片，3 秒淡入淡出；等待畫面內下一張圖片載入後切換。離開首頁清理計時器與 Observer；全螢幕展示期間、頁面隱藏及 reduced motion 時停止輪播。
- 流程文字桌機與手機均為 16px；320／390／768／1440px 無水平溢位，桌機三張卡片底部連結對齊。
- 點圖片開原尺寸全螢幕展示；背景點擊、Esc、關閉按鈕通過，關閉後焦點返回原圖片按鈕。三種功能連結皆正確導頁，離頁後對話框移除且捲動鎖恢復。
- PM 追加要求已完成：移除三張圖片右上角輪播／放大標記，仍保留點圖片放大與輪播。訂貨單筆電改朝向店員；顧客改右手握手機、左手食指點按，第二次局部修正後檢視並替換桌機及手機資產。
- 正式 npm run build 通過，產生 21 靜態頁與 10 Markdown；最終無右上角標記，圖片放大及輪播驗證通過，互動驗證無 JavaScript 錯誤。
- 圖片原 PNG 存於本機 imagegen 原始目錄；只將正式 WebP 納入專案。尚未提交、推送或發布。

### Imagegen 提示詞記錄

使用內建 imagegen，非 CLI。共同設定：3:2 真人攝影、台灣商業情境、海軍藍服裝與自然光、各場景於小卡片可辨識、細藍色發光線與資料表／圖表意象串聯；不加標題、水印，主要人物與操作保留在畫面中央。各張場景提示如下：
- `forms-order`：Two simultaneous scenes smoothly blended left/right: Taiwanese retail employee at shop counter using laptop to design a promotional customer order form with product rows; customer at home uses smartphone with recognizable green LINE messaging interface and an order form to order these products.
- `forms-replenishment`：Two simultaneous scenes blended left/right: Taiwanese shop employee walks grocery shelves, checks stock and fills replenishment form on tablet; headquarters warehouse staff at computer receiving the order and dispatching cartons, warehouse shelving visible.
- `reports-live`：Two simultaneous scenes blended left/right: Taiwanese retail cashier processes customer's checkout transaction at POS counter; headquarters office analysts study live business reports on widescreen computer with bar charts and tables.
- `reports-owner`：Multiple Taiwanese retail checkout counters in separate stores visible as two smaller scenes on left, cashiers processing sales; larger scene on right shows Taiwanese business owner seated in rear passenger seat of a car reviewing operational charts on tablet. Clearly passenger, not driver.
- `app-erp`：Two simultaneous scenes blended left/right: field deployment engineer works with IT employee in office to connect existing ERP system, laptops with data tables and integration screens; headquarters staff immediately tests and accepts a business APP on tablet and desktop.
- `app-cycle`：Four distinct photographic scenes in a balanced 2 by 2 blended composition, showing entire APP operation cycle: upper left Taiwanese store staff inspecting shelves and requesting restock on tablet; upper right supplier packing and shipping goods in cartons; bottom right delivery logistics worker bringing goods beside delivery van; bottom left store staff receiving goods and scanning cartons. Connect scenes clockwise with thin elegant glowing blue data lines.

訂貨單局部修正提示：保留人物、背景、商品懸浮圖與資料線，筆電螢幕朝店員、背面朝鏡頭；顧客右手從手機右側握持、右拇指在右邊，左手從左下方接近並以左食指點螢幕，左右手腕與前臂清楚分離，避免同側手、反向手腕或多餘手指。
