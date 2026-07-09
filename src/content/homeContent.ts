/**
 * 首頁結構化區塊文案模組
 *
 * 價值支柱、對比表、六大功能、生成式 APP 專區與 FAQ 屬於固定版型的結構化內容，
 * 沿用 src/content/articles.ts 以 TypeScript 管理內容的既有慣例，
 * 提供型別安全並避免為每個區塊新增 Markdown 解析器。
 *
 * 文案依據：ABI/Docs/Specifications/AbiAssist 與 AbiGenApp 規格文件所描述之既有功能，
 * 不得加入規格未涵蓋的能力描述。
 */

/** 核心價值支柱卡片 */
export type ValuePillar = {
  icon: string
  title: string
  description: string
  points: string[]
}

/** 對比區單列：同一面向下「一般雲端 AI 工具」與「ABI Assistant」的差異 */
export type CompareRow = {
  aspect: string
  generic: string
  abi: string
}

/** 產品功能卡片 */
export type FeatureCard = {
  icon: string
  title: string
  tagline: string
  points: string[]
}

/** 生成式 APP 導入步驟 */
export type GenAppStep = {
  step: string
  title: string
  description: string
}

/** 常見問題 */
export type FaqItem = {
  question: string
  answer: string
}

export const valuePillars: ValuePillar[] = [
  {
    icon: '🔒',
    title: '資料留在店內，安全可控',
    description: '雲地混合架構：營運資料保存在你店裡的主機，雲端只同步必要的鏡射資料。',
    points: [
      '資料主權在你手上，不必把帳務與客戶名單交給外部平台',
      '雲地傳輸全程加密，操作留有紀錄',
      '權限分級治理：誰能看、誰能改，都由你決定'
    ]
  },
  {
    icon: '💬',
    title: '打開 LINE 就能用，零學習成本',
    description: '不用學新軟體、不用記密碼，員工熟悉的 LINE 聊天室就是 AI 助理。',
    points: [
      'LINE 官方帳號與網頁雙入口，手機電腦都能用',
      '掃碼完成註冊與登入，導入不折騰',
      '老闆、店長、員工權限各自分明'
    ]
  },
  {
    icon: '⚡',
    title: '功能用「生」的，不必等開發',
    description: '報表用問的、表單用說的、管理系統用生成的，需求變了隨時再生成。',
    points: [
      '自然語言即時生成報表與表單',
      '從既有資料庫結構生成管理系統',
      '業態技能包直接套用，免昂貴預訓練'
    ]
  }
]

export const compareRows: CompareRow[] = [
  {
    aspect: '資料存放',
    generic: '對話與檔案上傳到外部雲端，資料去向難以掌握',
    abi: '營運資料留在店內地端主機，雲端僅同步必要鏡射'
  },
  {
    aspect: '使用方式',
    generic: '另開帳號、學提示詞、適應新工具',
    abi: '員工打開熟悉的 LINE 聊天室，直接用說的'
  },
  {
    aspect: '行業理解',
    generic: '通用知識，不懂你的商品、單據與流程',
    abi: '業態技能包＋企業知識庫，講的是你的營運語言'
  },
  {
    aspect: '系統串接',
    generic: '碰不到店內 POS、ERP 與進銷存資料',
    abi: 'MCP 工具箱安全對接資料庫與既有系統'
  },
  {
    aspect: '產出成果',
    generic: '給你文字建議，還要人工整理才能用',
    abi: '直接生成可用的報表、表單與管理系統'
  },
  {
    aspect: '資料操作安全',
    generic: '無從管控，改錯了難以追回',
    abi: '權限白名單、軟刪除、交易回滾、全程稽核'
  }
]

export const featureCards: FeatureCard[] = [
  {
    icon: '💬',
    title: 'AI 對話助理',
    tagline: '在 LINE 或瀏覽器直接交辦工作：查庫存、問業績、找文件、追流程。',
    points: [
      'LINE 官方帳號與本機網頁雙入口',
      '本地模型或雲端頂級模型自由切換',
      '一人多店：多機台註冊與端點選擇'
    ]
  },
  {
    icon: '📊',
    title: '即時生成報表',
    tagline: '想看什麼數字，用問的就有，不必等報表開發排程。',
    points: [
      '自然語言查詢營運數據',
      '即時彙總，雲端同步隨處檢視',
      '依角色權限控管可見資料範圍'
    ]
  },
  {
    icon: '📝',
    title: '即時生成表單',
    tagline: '說出需求，表單立刻上線收單，資料直接進你的資料庫。',
    points: [
      '公開表單、LINE 表單、聊天室統計三種模式',
      '收單即寫入店內資料庫，成功才算數',
      '可介接 Excel 與既有查詢 API 帶入選項'
    ]
  },
  {
    icon: '🧩',
    title: '生成式管理系統',
    tagline: '從資料庫結構直接長出管理後台，一鍵部署成獨立網站。',
    points: [
      '供應商、採購、進出貨等功能頁自動生成',
      '帳號密碼或 LINE 掃碼登入',
      '詳見下方「生成式 APP」專區'
    ]
  },
  {
    icon: '📚',
    title: '企業知識庫',
    tagline: '商品資料、SOP、合約文件交給 AI 讀，問了就答。',
    points: [
      '文檔解析與語意檢索',
      '聊天室直接問，依權限回答',
      '知識沉澱在系統，不再散落各處'
    ]
  },
  {
    icon: '🔁',
    title: '企業流程管理',
    tagline: '進、銷、存、退、轉，營運流程的 AI 輔助。',
    points: [
      '工作流程狀態管理與簽核',
      '跨系統資料一致性',
      '失敗自動回滾，留有稽核紀錄'
    ]
  }
]

export const genAppSteps: GenAppStep[] = [
  {
    step: '01',
    title: '連上資料結構',
    description:
      '讀取既有 POS、ERP、進銷存系統的資料庫結構，或匯入 SQL 結構檔。只讀結構、不動業務資料，資料庫帳密永遠留在地端。'
  },
  {
    step: '02',
    title: '與 AI 對話定案',
    description:
      'AI 分析資料表並規劃功能藍圖：供應商管理、採購單、進貨單、出貨單……由你逐項確認後定案，AI 不會擅自作主。'
  },
  {
    step: '03',
    title: '一鍵生成部署',
    description:
      '依定案藍圖自動產生功能頁與操作介面，封裝部署成獨立網站。員工用帳號密碼或 LINE 掃碼登入，馬上開始使用。'
  }
]

export const genAppCapabilities: string[] = [
  '單表與主從明細資料維護',
  '批次編輯與公式欄位計算',
  '流程狀態簽核',
  '關聯資料維護',
  '帳號、角色、功能權限治理',
  '軟刪除、交易回滾與全程稽核'
]

export const genAppSecurityNote =
  '生成範圍僅限受控的前端功能頁與經權限治理的資料操作，不產生任意後端程式；資料庫連線資訊與敏感資料不進雲端、不進部署包。'

export const faqItems: FaqItem[] = [
  {
    question: '我不懂 IT，導入會很複雜嗎？',
    answer:
      '不會。在店內主機安裝地端程式後，用 LINE 掃碼即完成綁定註冊；日常操作都在 LINE 聊天室或瀏覽器進行，不需要專職工程師。'
  },
  {
    question: '資料會不會外洩給 AI 模型或雲端平台？',
    answer:
      '營運資料保存在店內地端主機，雲端只同步必要的鏡射資料且傳輸全程加密。你也可以選擇在本地運行模型，對話內容完全不出店門。'
  },
  {
    question: '需要準備很高階的設備嗎？',
    answer:
      'ABI Assistant 是輕量級系統，一般商用主機即可運行；若要使用本地 AI 模型，再依模型規模配置硬體即可，我們會協助評估。'
  },
  {
    question: '可以接我現有的 POS、ERP 或進銷存系統嗎？',
    answer:
      '可以。系統支援 MSSQL、MySQL、SQLite 等資料庫對接，以及 RESTful API、Webhook 等整合方式，屬「客製整合」方案的服務範疇。'
  },
  {
    question: 'AI 會不會改錯或刪錯我的資料？',
    answer:
      '所有資料操作都經過權限白名單與參數化查詢，寫入具交易回滾機制、刪除採軟刪除設計，且全程留有稽核紀錄，改了什麼、誰改的都查得到。'
  },
  {
    question: '費用怎麼計算？',
    answer:
      '提供租賃、使用權買斷、客製整合三種方案，依門市規模與整合需求報價，不採按人頭訂閱。詳見「導入方案」或直接與我們聯繫。'
  }
]
