import solutionsMarkdown from '../assets/context/solutions.md?raw'

const abiFullName = 'Agentic Business Intelligence'

export const productIdentity = {
  name: 'ABI Assistant',
  fullName: abiFullName,
  chineseName: '商用人工智能助理',
  alternateName: '商用人工智慧助理',
  category: 'Business AI Agent',
  path: '/abi-assistant/',
  definition: `ABI 是 ${abiFullName} 的縮寫。Agentic 強調 AI 代理結合企業資料、專屬技能與授權工具，依業務流程執行任務。ABI Assistant 是資傳數位開發的商用人工智能助理，亦稱商用人工智慧助理，定位為 Business AI Agent。透過生成式表單、生成式報表與生成式 APP，將自然語言需求轉為可使用的商業應用；實際操作受權限、資料範圍與業務規則約束。`,
}

export const quickStartSteps = [
  { number: '01', title: '選擇應用，接通資料', description: '選擇表單、報表或 APP，提供需求、可用資料或資料庫結構，設定使用權限。' },
  { number: '02', title: '與 AI 對話，確認成果', description: '用業務語言說明欄位、報表指標或管理功能，預覽生成成果，再依需求調整。' },
  { number: '03', title: '生成發布，立即使用', description: '發布表單、產出報表或部署 APP，團隊即可從網頁或適用的 LINE 入口開始工作。' },
]

export const solutionPlans = solutionsMarkdown.replace(/<!--[\s\S]*?-->/g, '').split(/^##\s+/m).slice(1).map(section => {
  const lines = section.trim().split(/\r?\n/).map(line => line.trim())
  const name = lines[0]
  const tagline = lines.find(line => line.startsWith('tagline:'))?.replace(/^tagline:\s*/, '')
  const featuresStart = lines.indexOf('features:')
  const features = lines.slice(featuresStart + 1).filter(line => line.startsWith('- ')).map(line => line.slice(2))
  if (!name || !tagline || featuresStart < 0 || features.length === 0) throw new Error('導入方案缺少名稱、定位或服務項目：' + section)
  return { name, tagline, features }
})

export const capabilities = [
  { id: 'forms', number: '01', label: '生成式表單', english: 'GENERATIVE FORMS', headline: '需求說清楚，\n表單就成形。', description: '將自然語言轉為可發布、可收集、可追蹤的業務表單，讓前線資訊進入工作流程。', outcome: '把資訊收進來', path: '/capabilities/generative-forms/', points: ['自然語言設計', '公開網頁與 LINE 入口', '結構化資料收集'] },
  { id: 'reports', number: '02', label: '生成式報表', english: 'GENERATIVE REPORTS', headline: '問對問題，\n看見經營答案。', description: '連接已授權的資料來源，把營運問題轉成可閱讀的報表，縮短從資料到決策的距離。', outcome: '讓決策有依據', path: '/capabilities/generative-reports/', points: ['營運語言提問', '資料庫與 API 介接', '可重複使用的報表'] },
  { id: 'apps', number: '03', label: '生成式 APP', english: 'GENERATIVE APPS', headline: '既有資料庫，\n長出新應用。', description: '從資料結構與業務關聯出發，生成具備操作介面、權限與資料存取規則的商業 APP。', outcome: '讓工作執行下去', path: '/capabilities/generative-app/', points: ['Schema 驅動生成', '主從明細與關聯操作', '受控發布與 Runtime'] },
]
export const productFeatures = [
  { id: 'rapid-build', number: '01', label: '快速建置', description: '沿用既有資料與介面，生成表單、報表與 APP；工程師補齊客製，縮短從需求到應用的距離。', link: '了解建置與導入方式', path: '/deployment/#build' },
  { id: 'line', number: '02', label: 'LINE 生態整合', description: '營運資料庫可留在店內，常用操作從 LINE 開始。整合對話、LIFF、表單、報表與身分綁定，讓日常管理融入熟悉的工作入口。', link: '了解 LINE 整合能力', path: '/integrations/#line' },
  { id: 'industry-skills', number: '03', label: '業態專屬技能', description: '將行業術語、營運知識與作業方法轉成專屬技能，讓 AI 理解你的業態與角色需求。', link: '深入業態技能設計', path: '/architecture/#skills' },
  { id: 'business-frameworks', number: '04', label: '企業流程框架', description: '以企業工作步驟、輸出規格與檢核規則引導 AI 任務，結合工具權限，落實可驗收的執行流程。', link: '深入企業流程框架', path: '/architecture/#frameworks' },
]
export const faqItems = [
  { question: '可以直接上線，還是需要先做客製開發？', answer: '生成式表單、生成式報表與生成式 APP 的通用功能已可立即上線使用。完成安裝、模型、資料來源與權限設定後，即可開始生成、發布與操作；企業專屬技能、特殊流程與深度介接由前進部署工程師協助客製。' },
  { question: 'ABI Assistant 是什麼？', answer: productIdentity.definition },
  { question: 'Business AI Agent 如何協助企業實際工作？', answer: 'Business AI Agent 是能結合企業資料與授權工具執行工作的 AI 助理。ABI Assistant 可生成資料收集表單、營運報表與管理 APP，並透過業態技能及企業流程框架理解任務；實際資料操作仍由權限、工具介面與業務規則控制。' },
  { question: '導入 ABI，需要汰換現有 ERP、POS 或 CRM 嗎？', answer: '通常可先保留既有系統，由前進部署工程師盤點資料庫、API、帳號與流程，選擇一個明確場景介接。是否能直接寫回原系統，取決於原廠介面、資料結構、授權及交易規則，會在導入評估時確認。' },
  { question: '三種生成式應用可以分別導入嗎？', answer: '可以依需求從一種應用切入：用表單改善資料收集、用報表縮短查詢分析時間，或以 APP 補齊既有系統操作介面。需要串起跨系統流程時，再由工程師配置工具、技能與資料交換規則。' },
  { question: '企業資料是否都需要送到雲端？', answer: 'ABI 採雲地協作架構。業務資料庫由地端服務介接，模型、同步資料、報表與使用者入口依情境配置。採用雲端模型時，必要上下文可能傳至模型服務；導入時會逐項定義資料流、可送出欄位與保存邊界。' },
  { question: 'ABI 如何處理企業特有的規則與流程？', answer: '前進部署工程師（Forward Deployed Engineer，FDE）深入現場，將企業術語、資料定義與操作方法整理成專屬技能、工具與框架；必要時快速開發擴充功能，再以真實使用情境驗收。' },
  { question: '多久可以導入？效益怎麼衡量？', answer: '時程依介面完整度、資料品質、權限及客製範圍評估。先挑選高頻且可衡量的流程，記錄原始處理時間、人工步驟及正確率，再比較導入後的完整工作結果，據此決定擴展範圍。' },
]
export const deploymentSteps = [
  { number: '01', title: '盤點業務現場', description: '確認高價值流程、既有系統、資料責任與驗收目標。' },
  { number: '02', title: '接通資料與工具', description: '建立資料對應、存取範圍與可執行的工具介面。' },
  { number: '03', title: '生成與客製', description: '生成應用，配置企業專屬技能，補齊必要的擴充功能。' },
  { number: '04', title: '驗收與持續演進', description: '以實際操作驗證結果，交接維運，再擴展下一個場景。' },
]
