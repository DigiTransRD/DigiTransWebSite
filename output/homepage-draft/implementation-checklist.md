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
