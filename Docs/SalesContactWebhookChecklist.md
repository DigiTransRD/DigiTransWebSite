# 業務洽詢 Webhook 串接實作清單

日期：2026-08-01
PM 決策：
1. 授權修改 `AbiAsstAPI.csproj` 與 `Web.config`
2. 加密方案採 **B（僅簽章）**，取消 AES 加密，內容機密性由 HTTPS/TLS 提供
3. 網站正式來源：`https://www.digitrans.com.tw/`（GitHub Pages 託管）
4. LINE 回覆最新 10 筆，並以 Quick Reply 提供分頁選單，每頁 10 筆
5. 送出失敗不做 mailto 備援，直接於填表頁通知使用者呼叫失敗、請聯繫業務人員
6. `salescontact` 不宣告加密欄位

## 架構決策紀錄

- **CORS**：`Web.config` / `WebApiConfig.cs` 不引入全域 CORS 套件，改由 `abisalesController` 自行輸出 `Access-Control-Allow-Origin`；請求設計為 CORS「簡單請求」（`Content-Type: text/plain`、無自訂 header），瀏覽器不會發出 preflight OPTIONS。
- **簽章**：HMAC-SHA256(`ts` + "." + `nonce` + "." + `data`)，金鑰由 `Web.config` 的 `AbiSales:SignKey` 與前端建置環境變數 `VITE_ABISALES_SIGN_KEY` 共用。
- **安全性限制（已向 PM 說明）**：前端為靜態 SPA，簽章金鑰必然出現在公開 bundle 中，簽章的作用是阻擋隨手濫用與確保內容未被竄改，不等同於身分驗證。真正的傳輸機密性來自 TLS。
- **防重放**：時戳容忍區間 ±300 秒，並以行程內 nonce 快取（TTL 10 分鐘）阻擋區間內重送。
- **資料存取**：沿用既有標準機制 `GData.AbiAsstDbConnString` + `MySqlConnection` + 具名參數 + `MySqlTransaction`（失敗 Rollback）。

## 實作項目

### 1. 資料庫結構（AbiXpand.MySqlAdapter）
- [x] 1.1 `DbStructure/DigitransDbStructure.cs`：`table_map` 登記 `salescontact`
- [x] 1.2 `DigitransDbStructure.cs`：`TryGetCreateCommandsAndSyncRules` 登記 `commands` / `rules`（不宣告 crypto 欄位）
- [x] 1.3 `DigitransDbStructure.cs`：新增 `GetSql_salescontact()`，標準欄位 + 業務欄位，PK 為 `iguid`

### 2. 接收端點（AbiAsstAPI）
- [x] 2.1 新增 `Controllers/abisalesController.cs`（POST `/api/abisales`）
- [x] 2.2 Origin 白名單 + CORS 回應標頭
- [x] 2.3 簽章驗證、時戳容忍區間、nonce 防重放
- [x] 2.4 欄位正規化與驗證（必填、長度上限、email 格式）
- [x] 2.5 交易式 INSERT 至 `salescontact`，失敗 Rollback
- [x] 2.6 `AbiAsstAPI.csproj` 加入新檔 `<Compile Include>`
- [x] 2.7 `Web.config` 新增 `AbiSales:SignKey` / `AbiSales:AllowedOrigins` / `AbiSales:TimestampToleranceSeconds`

### 3. LINE 查詢（AbiAsstAPI）
- [x] 3.1 `Controllers/Bot2010655619Controller.cs`：`case "message"` 解析文字訊息
- [x] 3.2 關鍵字 `查詢業務`（可帶頁碼）→ 分頁查詢 `salescontact`
- [x] 3.3 條列式文字組版 + 單則 5000 字保護
- [x] 3.4 Quick Reply 分頁選單（上一頁／下一頁／頁碼／回第 1 頁）

### 4. 網站前端（DigiTransWebSite）
- [x] 4.1 新增 `src/api/abisales.ts`：簽章與端點呼叫
- [x] 4.2 `src/views/HomePage.vue`：`submitContactForm()` 改呼叫 API，移除 mailto 流程
- [x] 4.3 失敗訊息文案：通知使用者送出失敗並請直接聯繫業務人員
- [x] 4.4 `env.example` 補上新環境變數
- [x] 4.5 `.github/workflows/deploy-pages.yml`：build 步驟注入 `VITE_ABISALES_*`

### 6. 灌水防護（2026-08-01 PM 追加核准）

決策：不採用驗證碼與人機驗證，改以伺服器端防護為主。理由：簽章金鑰公開於前端 bundle，
任何純前端手段皆可繞過，唯有伺服器端的頻率限制不受此影響。

- [x] 6.1 `DigitransDbStructure.cs`：`salescontact` 索引調整為 `(contact_email, ct_dt)` 與新增 `(submit_ip, ct_dt)`，供頻率統計查詢
- [x] 6.2 `Web.config`：頻率門檻、重複阻擋區間、可疑連結門檻全數參數化
- [x] 6.3 `abisalesController.cs`：重複內容阻擋（同 Email 加相同內容 10 分鐘內）→ HTTP 409
- [x] 6.4 `abisalesController.cs`：頻率限制（同 IP 3 筆/時、10 筆/日；同 Email 3 筆/日；全站 60 筆/時）→ HTTP 429
- [x] 6.5 `abisalesController.cs`：可疑內容標記為 `process_status = 'suspect'`（**標記不拒絕**，避免誤判漏失真實洽詢）
- [x] 6.6 `Bot2010655619Controller.cs`：`查詢業務` 排除可疑件；新增 `查詢業務 可疑`；正常清單結尾提示可疑件筆數
- [x] 6.7 **修正 X-Forwarded-For 偽造漏洞**：該標頭可由呼叫端任意偽造，原先無條件採信會使 IP 頻率限制被完全繞過。
      改為預設只採用實際 TCP 連線來源，另以 `AbiSales:TrustForwardedFor`（預設 N）供部署在反向代理後方時開啟

### 5. 驗證
- [x] 5.1 前端 `npm run build`（vue-tsc + vite build）通過
- [x] 5.2 後端 `AbiAsstAPI.sln` MSBuild 建置成功（0 錯誤），並確認 `abisalesController` 與 `Bot2010655619Controller` 新方法已進入編譯輸出
- [x] 5.3 反射驗證 `GetSql_salescontact()` 產出語法與 `TableMap` 登記
- [x] 5.4 簽章相容性：前端 Web Crypto 與後端 .NET HMACSHA256 對相同輸入（含中文）產出一致簽章
- [x] 5.5 實機驗證：dev server 填表送出，攔截實際送出封包確認為 CORS 簡單請求，並以 Newtonsoft + HMACSHA256 重現後端驗章流程通過
- [x] 5.6 失敗路徑驗證：端點無法連線時顯示「洽詢送出失敗（無法連線至表單服務），請直接聯繫業務人員」
- [x] 5.7 LINE 組版驗證：條列文字、日期格式（固定 InvariantCulture）、分頁 Quick Reply（上限 13 鍵）、指令樣式解析
- [x] 5.8 灌水防護邏輯驗證：指令樣式（正常／可疑／頁碼）、可疑件 Quick Reply 指令文字、可疑件筆數提示、可疑內容判定（1～2 個連結為正常、3 個以上與 HTML 超連結標籤判為可疑）
- [ ] 5.9 以 `AbiAsstCloudSysManager` → 自動修正資料庫，於 digitransdb 建出 `salescontact`
- [ ] 5.10 端對端測試：正式網站送出洽詢 → 資料入庫 → LINE 輸入「查詢業務」可查得
- [ ] 5.11 **灌水防護的 SQL 尚未對實體 MySQL 執行過**（本機 MariaDB 無可用測試憑證）。
      需於 5.10 端對端測試時一併確認：連續送出第 4 筆應回覆「送出過於頻繁」、相同內容重送應回覆「相同內容已送出」

## 部署待辦（需 PM 執行）

1. 於 GitHub Repository → Settings → Secrets and variables → Actions 新增 secret `ABISALES_SIGN_KEY`，值需與 `Web.config` 的 `AbiSales:SignKey` 完全一致
2. VS2022 建置並發行 AbiAsstAPI
3. 執行 AbiAsstCloudSysManager 的資料庫自動修正，建立 `salescontact`
4. 確認 `https://www.digitrans.cloud:4430` 的 TLS 憑證於瀏覽器端有效（憑證不受信任會導致跨網域請求被瀏覽器直接封鎖）

## 進度記錄

- 2026-08-01：PM 決策 6 項議題，建立本清單並開始實作
- 2026-08-01：完成 1.1–4.5 全部實作。前端 build 通過；`AbiAsstAPI.sln` MSBuild 建置 0 錯誤。
  驗證重點：
  - 以瀏覽器實際送出表單並攔截封包，確認為 `Content-Type: text/plain;charset=UTF-8`、無自訂 header 的 CORS 簡單請求
  - 以攔截到的實際封包，透過 Newtonsoft `JObject.Parse` 取出 `data` 後重算 HMAC-SHA256，與前端簽章完全一致（含中文欄位）
  - LINE 回覆文字 10 筆約 1,581 字（單則上限 5,000）；第 5 頁 / 共 20 頁時 Quick Reply 產生 13 鍵並自動去除重複頁次
  - 修正日期格式受伺服器地區設定影響的問題，改為 `InvariantCulture` 固定輸出 `yyyy/MM/dd HH:mm`
- 2026-08-01：本機新增 `.env.local`（已被 `.gitignore` 的 `*.local` 忽略）供開發測試，內含與 Web.config 相同的簽章金鑰
- 2026-08-01：PM 決議不採用驗證碼與人機驗證，改以伺服器端灌水防護。完成 6.1–6.7，MSBuild 建置 0 錯誤。
  過程中發現並修正一個自身埋下的漏洞：原 `ReadClientIpAddress()` 無條件採信 `X-Forwarded-For`，
  該標頭可由呼叫端偽造，會使 IP 頻率限制形同虛設。已改為預設只採用實際 TCP 連線來源。
  未完成項目：灌水防護的 SQL 尚未對實體 MySQL 執行過，見 5.11。
