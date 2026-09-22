# ABI 網站視覺基準

本輪 PM 已授權重新設計品牌呈現。採文字型 SVG 品牌標誌，不沿用舊機器人圖像及過時架構圖。

- 標誌：`public/abi-wordmark.svg`；圖示：`public/abi-icon.svg`。
- 頁首標誌：SVG 僅保留 ABI，右側以兩行文字呈現 ASSISTANT（20px）與「商用人工智慧助理」（18px）。手機維持同一排列，頁首高度 76px，避免中文移至整個標誌下方墊高頁首。
- 全站洽詢入口：底部懸浮按鈕，手機為寬版按鈕；頁腳以共用尺寸變數預留按鈕高度、底距、安全區與額外留白，確保最後一行可完整閱讀。
- 主要視覺：`src/components/IntegrationDiagram.vue`，呈現系統整合與生成應用的概念架構，不偽裝為產品截圖。
- 導覽箭頭：使用 PM 提供的 `src/assets/images/icon/Live_1230.png` 及 `Live_1230_1.png` 透明輪廓，由 `ArrowIcon.vue` 以 CSS mask 與 currentColor 套色。選單使用藍灰 `#52627a`、品牌連結使用亮藍 `#205bc3`、金色按鈕使用深藍 `#172b4d`，深色按鈕沿用白色。向下及返回操作維持相同方向；原圖不修改，裝飾圖示不加入螢幕閱讀器的連結名稱。
- 色彩：霧白 `#f6f8fc`、亮藍 `#205bc3`、海軍藍 `#16345e`、深藍文字 `#172b4d`、淡藍 `#edf3fc`。主要閱讀區保持明亮，技術及頁尾行動區以海軍藍建立層次；不使用墨綠色。
- 懸浮洽詢按鈕：琥珀金 `#f4c35a` 搭配深藍文字，hover `#e7b143`、邊框 `#9c6b13` 與淺色外環，讓按鈕在深淺區段均易辨識；文字對比 8.60:1，hover 7.23:1。
- 字體：Segoe UI Variable / Segoe UI、Microsoft JhengHei / PingFang TC；不增加外部字型請求。
- 中高齡閱讀字級：正文 1.25rem（預設 20px）、導覽與操作 1.125rem（18px）、輔助文字至少 1rem（16px）；手機沿用相同字級，以換行與間距重新排列。正文行高約 1.8–2 倍，輸入框及手機選單加高。
- 間距：8px 基準，區段 88–112px，閱讀寬度 760px，最大版面寬度 1240px。
- 圓角：主要版面 20px、互動元件 8px；不使用多彩漸層、假客戶數字或認證標誌。
- 動態：160–240ms 的 hover / focus 轉場，支援 reduced motion。
- 資訊層次：首頁商業價值、各能力頁評估資訊、技術頁可驗證的責任邊界。
- 內容依據：ABI 現行規格及產品原始碼；搜尋處理參考 Google Search Central 的 AI features 與 structured data 文件。
- 產品名稱：ABI Assistant；ABI 為 Artificial Business Intelligence 的縮寫。中文描述為「商用人工智能助理」及「商用人工智慧助理」；產品定位為 Business AI Agent。首頁、FAQ、產品總覽及結構化資料明確連結名稱與資傳數位，不重複堆砌關鍵字。
- 搜尋內容：沿用同一內容來源產出靜態 HTML、詳細頁 Markdown、JSON-LD、sitemap 與 llms.txt。llms.txt 為補充閱讀索引，不代表任何搜尋引擎的收錄或排名保證。
