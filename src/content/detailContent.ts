import { solutionPlans, productIdentity } from './homeContent'

export interface DetailSection {
  id: string
  title: string
  body: string
  points?: string[]
}
export interface DetailPage {
  path: string
  category: string
  title: string
  description: string
  lead: string
  facts: { label: string; value: string }[]
  sections: DetailSection[]
  table?: { title: string; headers: string[]; rows: string[][] }
  related: string[]
}

export const detailPages: DetailPage[] = [
  {
    path: productIdentity.path, category: productIdentity.category, title: 'ABI Assistant｜商用人工智能助理',
    description: productIdentity.definition,
    lead: '從理解需求到完成工作，讓既有系統成為企業 AI 的行動基礎。',
    facts: [{ label: '產品名稱', value: productIdentity.name }, { label: '產品定位', value: productIdentity.category }, { label: '開發與導入', value: '資傳數位有限公司' }],
    sections: [
      { id: 'definition', title: 'ABI Assistant 是什麼？', body: 'ABI Assistant 將模型、企業知識、業態技能與可執行工具組織成商業應用平台。Agentic 代表以 AI 代理理解工作需求，結合適用技能與授權工具，依企業流程生成成果並執行任務。資料存取與實際操作由受控服務處理，遵守設定的資料範圍、工具權限與業務規則。', points: ['商用人工智能助理與商用人工智慧助理，是本網站對 ABI Assistant 的中文產品描述。', 'Business AI Agent 是 ABI Assistant 的產品定位，強調連接企業資料與執行業務工作的能力。', '適用對象包含經營者、企業高管、CTO、資訊團隊與第一線業務人員。'] },
      { id: 'applications', title: '三種生成式商業應用，現在就能開始。', body: '完成安裝、模型、資料來源與權限設定後，三種通用功能即可使用。日常生成無須逐份撰寫程式，企業專屬流程與特殊介面再由工程師擴充。', points: ['生成式表單：描述欄位與收集規則，確認後發布，用於巡檢、需求回報及資料登記。', '生成式報表：以營運問題查詢授權資料，生成摘要、圖表及明細，支援經營分析與例行彙整。', '生成式 APP：從資料庫結構與業務關聯出發，生成具備查詢、資料維護及權限規則的管理介面。'] },
      { id: 'integration', title: '既有 ERP、POS、CRM，如何接上 AI？', body: '從可用資料庫、API 與企業知識開始介接，保留原系統已建立的資料與業務規則。資料查詢、單據寫回或跨系統操作，依原廠介面、授權及交易要求逐項確認；工程師補齊資料對應與必要的擴充工具。', points: ['快速建置：以現有資料與通用生成能力切入高價值場景。', 'LINE 生態整合：依情境配置對話、LIFF、表單、報表及身分綁定入口。', '業態專屬技能：讓 AI 使用企業的術語、資料字典與作業知識。', '企業流程框架：明確定義工作步驟、輸出規格與檢核規則。'] },
      { id: 'governance', title: '企業如何掌握資料與操作權限？', body: 'ABI 以雲地協作、明確的資料結構及受控執行服務分工。AI 生成成果與後端執行權限分開，資料存取須遵守身分、功能與目標資料庫的規則。採用雲端模型時，必要上下文可能送往模型服務；導入時確認可傳送欄位、保存範圍與稽核需求。' },
      { id: 'deployment', title: '如何導入，如何持續擴充？', body: '提供租賃、使用權買斷與客製整合三種導入方案。前進部署工程師（Forward Deployed Engineer，FDE）協助現場盤點、資料介接、專屬技能、流程框架及擴充開發。以實際工作時間、資料正確性與完整流程驗收，再擴展到下一個應用。' },
      { id: 'english-overview', title: 'ABI Assistant — Business AI Agent', body: `ABI stands for ${productIdentity.fullName}. ABI Assistant is a Business AI Agent developed by Digital Transformation Consulting Ltd. Agentic means using AI agents with enterprise data, industry-specific skills and authorized tools to carry out tasks within defined business workflows. It generates business forms, reports and applications; operations remain subject to permissions, data access scope and business rules. Forward Deployed Engineers support system integration, skill configuration, workflows and custom extensions.` },
    ], related: ['/capabilities/generative-forms/', '/capabilities/generative-reports/', '/capabilities/generative-app/'],
  },
  {
    path: '/capabilities/generative-forms/', category: 'GENERATIVE FORMS / 01', title: '生成式表單：把需求，變成業務入口。',
    description: 'ABI 以自然語言生成業務表單，支援公開網頁、LINE 表單與聊天室統計，讓資料收集接上企業工作流程。',
    lead: '從巡檢、需求回報到活動登記，讓每一次填寫都成為可整理、可追蹤的業務資料。',
    facts: [{ label: '輸入', value: '自然語言需求' }, { label: '成果', value: '可發布的結構化表單' }, { label: '適用', value: '前線資訊收集' }],
    sections: [
      { id: 'ready-to-use', title: '通用表單功能已備妥，生成後即可上線收集。', body: '完成系統安裝與使用入口設定，即可使用生成式表單的通用能力。說明收集需求、確認欄位與規則，再發布表單，日常表單建立無須另寫程式。企業專屬單據、跨系統寫回與特殊流程，可由工程師延伸整合。' },
      { id: 'workflow', title: '先說明工作，再設計欄位。', body: '描述要向誰收集哪些資訊、哪些欄位必填，以及資料如何使用。ABI 協助形成表單結構，經檢視與調整後發布，讓需求與填寫介面保持一致。', points: ['將填寫項目、選項與驗證條件具體化。', '依情境選擇公開表單、LINE 表單或聊天室統計。', '收集結果以結構化資料保存，便於後續查詢與彙整。'] },
      { id: 'integration', title: '讓表單接上現場，讓資訊進入流程。', body: '可依表單能力配置 API 或 Excel 選項來源，並由工程師評估既有資料與後續工作流程的串接。寫回 ERP、建立單據或啟動審核，會以專案確認的介面與業務規則實作。', points: ['應用情境：門市巡檢、售後回報、供應商資料收集、活動登記。', '明細欄位、關聯帶入與統計公式，讓表單承載更完整的業務資訊。', '串接前確認欄位對應、識別鍵、重複送出與錯誤處理。', '有個資或敏感內容的表單，另行配置身分、資料範圍與保存規則。'] },
      { id: 'harness', title: '把企業方法，寫進 AI 執行框架。', body: '生成式表單由已指定的 AI 執行框架（Harness）與協同技能包約束結構、欄位與生成規則。企業專屬術語、表單格式與情境指引可由工程師客製，讓生成成果更貼近實際工作。' },
      { id: 'acceptance', title: '驗收的是完整收集流程。', body: '從填寫、驗證、送出到結果查詢，確認資料正確落在指定位置。若後續需跨系統處理，逐段驗證成功與失敗狀態，不以畫面生成完成代替業務驗收。' },
    ], related: ['/capabilities/generative-reports/', '/integrations/', '/deployment/'],
  },
  {
    path: '/capabilities/generative-reports/', category: 'GENERATIVE REPORTS / 02', title: '生成式報表：讓經營問題，直接遇見資料。',
    description: 'ABI 將自然語言營運問題轉為生成式報表，透過授權資料庫與 API 取得資料，以明確的口徑、篩選與資料範圍支援決策。',
    lead: '從「我想知道什麼」出發，縮短查資料、整理欄位與閱讀結果的距離。',
    facts: [{ label: '輸入', value: '營運問題與資料來源' }, { label: '成果', value: '可閱讀、可再使用的報表' }, { label: '適用', value: '經營分析與例行彙整' }],
    sections: [
      { id: 'ready-to-use', title: '通用報表功能立即可用，接通資料就能開始分析。', body: '完成資料來源與權限設定，即可用自然語言生成摘要、圖表、統計及明細報表，檢視、調整並重複使用。通用報表無須逐張開發；企業特有的指標口徑或資料介面，由工程師協助配置。' },
      { id: 'workflow', title: '把問題轉成有依據的報表。', body: '使用者提出營運問題，ABI 結合可用工具與資料定義取得查詢結果，再生成報表。需要先確認指標口徑、時間範圍、資料粒度與使用者可見範圍，避免同名數字代表不同業務意義。', points: ['應用情境：銷售結構、庫存追蹤、採購彙整、門市營運。', '接通資料庫或 Web API，依來源能力取得授權資料。', '保留可理解的條件與說明，便於檢視、調整與重複使用。'] },
      { id: 'formats', title: '一份報表設計，多種工作成果。', body: '以資訊區塊組合摘要、KPI、圖表、統計、明細與主明細內容。依需求產生動態網頁、離線 HTML、Excel、Word、PowerPoint 或 PDF；語音摘要依 TTS 模型設定產出。', points: ['可連接生成式表單、資料介接 API、外部 API 與支援的本地檔案。', '依設定的排程與接收對象產生及推送報表。', '格式、寄送通道與模型能力在導入環境逐項配置與驗證。'] },
      { id: 'knowledge', title: '讓 AI 理解你的「營收」與「庫存」。', body: '前進部署工程師將企業資料字典、欄位意義與計算規則納入技能與工具設定。例如營收是否扣退貨、庫存是否包含在途，必須先有共同定義，才能形成可靠的經營答案。' },
      { id: 'acceptance', title: '用同一份資料，驗證同一個答案。', body: '以來源系統或已確認的計算結果核對報表，驗證篩選條件、彙總口徑、缺值、權限及查詢失敗狀態。AI 產生的分析供決策參考，重要數字須可回到資料與計算規則查證。' },
    ], related: ['/integrations/', '/evaluation/', '/architecture/'],
  },
  {
    path: '/capabilities/generative-app/', category: 'GENERATIVE APPS / 03', title: '生成式 APP：讓資料庫，長出商業應用。',
    description: 'ABI 從資料庫 Schema、功能 Mapping 與關聯規則生成商業 APP，結合標準 Runtime、權限、主從明細與受控發布。',
    lead: '把資料結構、業務關聯與操作規則，轉成可持續演進的管理介面。',
    facts: [{ label: '起點', value: 'Schema 與業務關聯' }, { label: '治理基準', value: '經確認的功能 Mapping' }, { label: '執行方式', value: '標準 Runtime 與受控 API' }],
    sections: [
      { id: 'ready-to-use', title: '通用管理功能已備妥，生成部署後立即可用。', body: '連上資料結構、與 AI 確認功能，再生成與部署 APP。資料查詢、新增、修改及依設定開放的刪除操作，可透過通用管理介面直接使用；完成帳號與權限設定後，團隊即可登入工作。企業特有的簽核、跨系統流程與擴充功能，由工程師協作完成。' },
      { id: 'schema', title: '先理解資料，才生成介面。', body: '可透過目標資料庫連線讀取結構，或匯入支援的 SQL DDL / Schema JSON。分析資料表、欄位、型別、主鍵與關聯後，與設計者確認「資料表—系統功能」Mapping，再生成 APP。', points: ['直接結構分析預設不取樣業務資料列。', '生成目標由本輪選定的業務功能決定，避免無關功能重複生成。', 'AI 設計建議先形成草稿，經檢視與確認後套用。'] },
      { id: 'business', title: '從基本資料，延伸到主從明細。', body: '供應商、商品、門市等資料維護，可延伸至採購單、進出貨單等主從明細與關聯操作。欄位、可執行操作、查找來源及關聯規則由設計設定治理；企業專屬流程由工程師補齊。' },
      { id: 'runtime', title: '生成成果與執行權限，各有責任。', body: '前端成果以 HTML、JavaScript、CSS 與 manifest 組成受控套件；後端由固定 Runtime API 處理。AI 生成成果不取得任意部署後端執行檔的權限，資料操作仍經授權、欄位規則與地端執行路徑。' },
      { id: 'release', title: '確認哪一版設計，就發布哪一版成果。', body: 'APP 設定、設計快照與發布執行設定分開保存。發布套件綁定 Mapping、來源摘要與雜湊，部署使用已保存的確切內容，避免後續設計修改混入正在發布的版本。', points: ['雲端 Runtime 提供登入與功能入口，目標資料庫由地端服務連線。', '支援依設定的帳號登入與 LINE QR 登入路徑。', '上線前驗證實際權限、目標資料庫、完整業務操作及部署環境。'] },
    ], related: ['/architecture/', '/governance/', '/deployment/'],
  },
  {
    path: '/integrations/', category: 'INTEGRATION', title: '保留核心系統，打開 AI 的工作入口。',
    description: 'ABI 透過資料庫、API 與工具介面連接既有 ERP、POS、CRM，結合 LINE 對話、LIFF 與身分綁定，讓生成式應用接上企業資料與熟悉的工作入口。',
    lead: '企業累積的資料與流程，就是 AI 轉型最有價值的起點。',
    facts: [{ label: '資料層', value: 'SQL Server / MySQL / SQLite' }, { label: '工具層', value: 'API / MCP / 專屬技能' }, { label: '原則', value: '先確認介面，再開放操作' }],
    sections: [
      { id: 'connect', title: '選擇符合原系統責任的介接方式。', body: '資料查詢可依授權連接資料庫或既有 API；涉及訂單、帳務與庫存異動時，優先確認原系統的業務介面與檢核機制。資料庫可連線，不代表可以略過原系統規則直接寫入。', points: ['資料庫：透過 Adapter / Connector 接入授權資料來源。', 'API：沿用原系統提供的查詢與業務操作介面。', '工具與技能：把可用操作封裝成可供 AI 使用的明確能力。'] },
      { id: 'mapping', title: '真正的整合，包含資料的意思。', body: '工程師會盤點實體關聯、識別鍵、資料字典、欄位型別與交易範圍，處理不同系統間的命名與口徑差異，再設定可查詢、可操作的範圍。' },
      { id: 'line', title: 'LINE 生態整合：從熟悉的入口，接上企業 AI。', body: 'ABI 結合 LINE 對話、LIFF 網頁與 Webhook 訊息處理，將使用者需求交由雲地協作服務處理。依場景配置助理查詢、表單填寫、報表互動與身分綁定，讓前線人員及管理者更容易開始使用。', points: ['對話入口：在已授權的助理、技能與工具範圍內提出需求。', '表單與報表：依使用情境配置 LINE 表單、聊天室統計及報表互動入口。', '身分連接：透過 LIFF、QR Code 與帳號綁定，銜接適用系統的登入流程。', '導入設定：確認 LINE 官方帳號、LIFF、Webhook、使用者授權與可傳送資料，再驗證完整操作路徑。'] },
      { id: 'extend', title: '既有介面不足，透過專案補齊。', body: '針對企業專屬 API、特殊資料格式或客製流程，前進部署工程師可開發 Adapter、工具與擴充功能。是否適用、所需工期與維運責任，依原系統限制及整合範圍確認。' },
    ],
    table: { title: '從哪個入口開始？', headers: ['現有資產', '可切入的應用', '先確認什麼'], rows: [['ERP / POS / CRM', '營運報表、資料查詢、流程輔助', '原廠 API、資料授權、業務檢核'], ['既有關聯式資料庫', '生成式 APP、資料維護介面', '主鍵、關聯、欄位與交易規則'], ['文件與內部知識', '專屬助理、知識查詢、工作技能', '文件版本、可見範圍、模型資料流'], ['現場人工流程', '生成式表單、資訊收集、任務工具', '輸入欄位、責任人、後續處理方式']] },
    related: ['/architecture/', '/deployment/', '/evaluation/'],
  },
  {
    path: '/architecture/', category: 'ARCHITECTURE', title: 'AI 原生，從資料與執行架構開始。',
    description: '深入 ABI 業態專屬技能、企業流程框架 Harness、雲地協作、Schema、Mapping、Runtime 與 AbiXpand 資料存取設計，了解 AI 商業應用的架構責任。',
    lead: '讓模型理解需求，也讓每一個執行動作有資料契約、權限與責任歸屬。',
    facts: [{ label: '設計基準', value: 'Schema → Mapping → Runtime' }, { label: '資料存取', value: 'AbiXpand 共用基礎層' }, { label: '部署模式', value: '雲地協作' }],
    sections: [
      { id: 'native', title: 'Agentic：讓需求、資料語意與授權工具共同運作。', body: `ABI（${productIdentity.fullName}）以 AI 代理連接自然語言需求、企業資料定義、專屬技能與授權工具，依流程框架產生表單、報表或 APP，並透過受控服務執行工作。模型負責理解與生成，服務端負責授權、資料存取及實際執行；可執行範圍由已配置的工具、權限與業務規則決定。` },
      { id: 'skills', title: '業態專屬技能：把行業知識，轉成 AI 的工作能力。', body: '技能定義特定工作需要的知識、指引與工具使用方式。前進部署工程師可依零售、餐飲、服飾、寵物或生鮮等業態，整理專屬術語、營運指標與作業方法，再依助理角色及任務配置技能包。', points: ['業態知識：整理商品分類、資料字典、計算口徑與常見業務情境。', '角色任務：依門市、營運、管理等角色，設計工作指引與可用工具。', '持續優化：透過實際案例驗證技能內容，再隨企業流程調整與維護。'] },
      { id: 'frameworks', title: '企業流程框架：讓 AI 遵循企業的工作方法。', body: 'AI 執行框架（Harness）將任務步驟、輸出結構、檢核規則與協同技能組織成可管理的生成依據。工程師可將企業作業標準與專屬格式納入框架，讓表單、報表與 APP 的生成更貼近企業要求。', points: ['技能回答「這項工作怎麼做」，框架定義「依什麼步驟、交付什麼成果」。', '依任務綁定適用技能包，使用經驗證、發布且啟用的框架與技能內容。', '以資料契約、格式與驗證規則檢查生成成果；實際資料操作仍由服務端權限與工具規則控制。', '需要簽核、狀態轉換或跨系統操作時，由工程師配置對應流程與介面，逐項驗收。'] },
      { id: 'layers', title: '使用者入口、雲端協作、地端執行分工清楚。', body: '使用者透過瀏覽器或 LINE 進入適用功能。AbiAssistant 負責地端資料連線、生成設計與工具執行；AbiAsstAPI 承擔雲地訊息與部署協作；AbiGenApp 承載 APP 登入、介面與固定 Runtime API。', points: ['APP Runtime 不直接連線企業目標業務資料庫。', '模型可依任務與環境配置本地或雲端服務；可用性取決於模型能力、硬體及設定。', '雲端同步資料、上下文與必要通訊分別定義，不能以「資料全不出地端」概括。'] },
      { id: 'data', title: '為 AI 工作準備可理解、可驗證的資料結構。', body: 'Schema 保存實際結構，Mapping 表達業務功能，Runtime metadata 定義執行時可用的操作。APP 主檔、設計快照與發布執行設定各自保存，讓生成、設計變更與線上操作有清晰界線。', points: ['DbStructure 管理資料表與欄位規則，SyncRule 管理需要同步的內容。', 'Adapter / Connector 處理 Provider 差異，產品層保有業務規則。', '目標資料庫、APP 與 Snapshot 的連線範圍明確，不以同名資料表推測資料來源。'] },
      { id: 'transactions', title: '交易一致性，是商業操作的基本要求。', body: '需要整批一致的資料操作，在同一個資料庫 Transaction 內全部提交；任一步驟失敗時完整 Rollback，現行資料保持不變。不同資料庫的各自提交，不宣稱是同一筆 Transaction。', points: ['使用型別化參數及受控欄位與操作範圍。', 'SQLite 的可重試狀態、次數、等待與取消由共用資料服務統一處理。', '提交狀態不明、Rollback 失敗及跨系統外部副作用需明確回報，不盲目重送。'] },
    ], related: ['/governance/', '/capabilities/generative-app/', '/evaluation/'],
  },
  {
    path: '/governance/', category: 'SECURITY & GOVERNANCE', title: '讓 AI 能做事，也讓企業掌握邊界。',
    description: 'ABI 從身分、操作權限、資料範圍、生成成果與發布版本定義 AI 治理，並在導入時驗證每條實際使用路徑。',
    lead: '治理是誰能用、能做什麼、資料去哪裡，以及失敗時如何處理。',
    facts: [{ label: '存取', value: '身分與操作權限' }, { label: '成果', value: '可追查的發布來源' }, { label: '導入', value: '逐路徑驗證與驗收' }],
    sections: [
      { id: 'identity', title: '依使用入口與角色，定義實際可用能力。', body: 'ABI 可依情境配置可用助理、技能與工具。生成式 APP 以登入身分、功能操作及地端授權規則限制存取；隱藏按鈕不能取代伺服器端權限檢查。', points: ['確認使用者、角色、可見資料與允許操作。', '驗證直接 API 呼叫、不同 APP 與不同發布版本的隔離。', '重要資料異動的核准流程與紀錄需求，依專案另外確認。'] },
      { id: 'dataflow', title: '把資料流攤開，才能談資料主權。', body: '導入時逐項盤點原始資料、查詢結果、模型上下文、同步資料與執行紀錄的去向。使用雲端模型或 LINE 等外部服務時，必須確認服務條件、傳送內容與企業允許範圍。' },
      { id: 'artifacts', title: 'AI 生成成果，在受控執行範圍內發布。', body: '生成式 APP 套件以 manifest、來源摘要及雜湊驗證內容。固定 Runtime API 負責後端執行；不接受生成套件任意部署 C#、DLL、EXE 或伺服器設定。發布身分與登入狀態綁定，版本變更須重新確認有效身分。' },
      { id: 'acceptance', title: '用失敗案例，檢驗治理是否生效。', body: '除正常操作，也驗證越權請求、無效欄位、重複送出、連線中斷、交易失敗與部署內容不一致。安全控制的適用範圍與驗收結果必須明確記錄；不以架構設計代替外部認證或全面安全稽核。' },
    ],
    table: { title: '導入時共同確認的治理清單', headers: ['範圍', '要回答的問題', '驗收證據'], rows: [['身分與權限', '誰可查詢、修改、發布？', '允許及拒絕案例'], ['資料與模型', '哪些內容可送往哪些服務？', '資料流與設定盤點'], ['交易與異常', '失敗後資料停在哪個狀態？', '回滾與中斷測試'], ['發布與維運', '目前使用哪個版本？誰負責處理？', '版本來源、紀錄與交接文件']] },
    related: ['/architecture/', '/evaluation/', '/deployment/'],
  },
  {
    path: '/deployment/', category: 'FORWARD DEPLOYED ENGINEERING', title: '與你的團隊一起，把 AI 做進現場。',
    description: 'ABI 由前進部署工程師協助駐點導入、資料整合、專屬技能與框架客製，必要時快速開發擴充功能，並以實際業務流程驗收。',
    lead: '通用功能立即啟用，專屬需求由工程師深入協作。依你的部署與整合需求，選擇租賃、使用權買斷或客製整合。',
    facts: [{ label: '協作方式', value: 'FDE 駐點與團隊共創' }, { label: '客製內容', value: '技能、工具、框架、擴充' }, { label: '交付標準', value: '真實業務流程驗收' }],
    sections: [
      { id: 'discover', title: '01 / 先選一個值得改變的工作。', body: '與業務及 IT 一起盤點高頻作業、等待時間、人工整理與錯誤成本，選出資料可取得、責任明確且可衡量的切入點。確認成功條件後，再安排導入工作。' },
      { id: 'connect', title: '02 / 接通資料，建立企業語意。', body: '確認資料庫、API、文件、帳號與操作權限，整理欄位定義、計算口徑與工作規則。把企業知識落在技能與工具設定，讓 AI 理解工作所需的上下文。' },
      { id: 'build', title: '03 / 快速建置，補齊最後一段流程。', body: '重用平台既有的生成、資料整合與執行能力，以生成式表單、報表與 APP 快速形成可操作成果。前進部署工程師同步客製業態技能、企業流程框架及必要擴充，與第一線使用者共同驗證操作細節、例外情境及系統介面。', points: ['先交付明確場景的可操作應用，再擴展到更多部門與流程。', '沿用已確認的資料與介面，減少重複建置資料收集、報表及操作頁面的工作。', '建置時程依介面完整度、資料品質與客製範圍共同評估。'] },
      { id: 'operate', title: '04 / 驗收、交接，持續擴展。', body: '在實際環境驗證資料正確性、完整流程、權限、效能及異常處理，交接設定、維運與使用方法。ABI 持續優化，後續擴充依已驗證的基礎逐步推進。' },
      ...solutionPlans.map((plan, index) => ({ id: 'plan-' + (index + 1), title: plan.name, body: plan.tagline, points: plan.features })),
    ],
    table: { title: '啟動評估，準備這四件事', headers: ['準備項目', '建議內容'], rows: [['一個真實工作流程', '目前怎麼做、由誰做、最花時間的步驟'], ['現有系統清單', 'ERP、POS、CRM、資料庫、文件與可用 API'], ['驗收指標', '正確率、完成時間、人工步驟及例外處理'], ['專案窗口', '業務負責人、IT、資料與權限決策者']] },
    related: ['/evaluation/', '/integrations/', '/governance/'],
  },
  {
    path: '/evaluation/', category: 'CAPABILITY & VALUE', title: '用可驗證的指標，評估 AI 的商業價值。',
    description: '從時間、資料正確性、整合深度、治理、效能及可維護性評估 ABI，建立適合企業真實流程的導入驗收指標。',
    lead: '不只看生成速度，更看整個工作是否更快、更可靠、更容易持續使用。',
    facts: [{ label: '比較基準', value: '導入前的實際流程' }, { label: '評估單位', value: '完整工作成果' }, { label: '量測環境', value: '指定模型、資料量與併發' }],
    sections: [
      { id: 'value', title: '老闆與經營團隊：把效益放回工作。', body: '先衡量一份報表、一筆資料收集或一張業務單據，從開始到完成需要多久、有多少人工接手、哪裡容易出錯。再以相同條件比較導入後結果，避免只用模型回覆速度代表整體效益。' },
      { id: 'technology', title: 'CTO 與 IT：同時看可整合與可維運。', body: '評估介面契約、資料一致性、身分與權限、部署重現性及異常可觀測性。效能測試記錄模型、硬體、資料量、網路與併發條件，才能判斷瓶頸與容量。' },
      { id: 'scope', title: '能力指標是驗收方法，不是未量測的保證。', body: 'ABI 的實際導入時程、延遲與效益依場景評估。專案啟動時共同制定目標，再以驗證結果決定上線與擴展。' },
    ],
    table: { title: '六個值得量測的面向', headers: ['指標', '量測方式', '通過條件的定義'], rows: [['工作效率', '完整流程時間、人工步驟、等待次數', '與導入前相同工作比較'], ['資料正確性', '來源核對、欄位檢核、計算口徑', '符合已確認的業務規則'], ['整合深度', '查詢、寫回與跨系統流程逐項驗證', '完成授權範圍的端到端工作'], ['治理有效性', '越權、錯誤輸入、版本隔離案例', '拒絕不允許的操作且有明確結果'], ['效能與穩定性', '延遲分布、失敗率、併發與中斷測試', '達成指定環境的服務目標'], ['維護與演進', '配置調整、來源追查、維運交接', '團隊可持續操作與管理']] },
    related: ['/deployment/', '/architecture/', '/governance/'],
  },
  {
    path: '/about/', category: 'DIGITRANS', title: '讓企業的下一步，從現有優勢開始。',
    description: '資傳數位有限公司專注企業數位轉型與 AI 應用，結合 ABI 平台、系統整合與前進部署工程服務，協助企業把 AI 帶進實際營運。',
    lead: '資傳數位 × ABI Assistant。把技術能力，轉成現場用得上的工作成果。',
    facts: [{ label: '公司', value: '資傳數位有限公司' }, { label: '英文名稱', value: 'Digital Transformation Consulting Ltd.' }, { label: '核心產品', value: 'ABI Assistant' }],
    sections: [
      { id: 'mission', title: '從數位轉型，走向 AI 驅動的營運。', body: '資傳數位成立於 2021 年，專注企業數位轉型、系統整合與 AI 商業應用。ABI Assistant 結合雲地協作、可配置技能與生成式應用，讓既有系統與累積的企業知識成為 AI 的工作基礎。' },
      { id: 'service', title: '產品與工程，形成同一個交付團隊。', body: '我們提供業務場景規劃、資料與系統整合、專屬技能設計、客製擴充及教育訓練。透過前進部署工程師與企業團隊協作，將原型推進到可驗收、可交接的應用。' },
    ], related: ['/deployment/', '/integrations/', '/evaluation/'],
  },
]
export const getDetailPage = (path: string) => detailPages.find(page => page.path === path)
