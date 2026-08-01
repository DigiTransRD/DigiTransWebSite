<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { marked } from 'marked'
import { useI18n } from 'vue-i18n'

import archCore from '@/assets/images/9b07d26265a59631f51c3046a3cb1e76.jpg'
import archIntegrate from '@/assets/images/2aa64f6930a2007656859e990e8ac073.jpg'
import heroImage from '@/assets/images/ABIAssistant-2.png'

import {
  valuePillars,
  compareRows,
  featureCards,
  genAppSteps,
  genAppCapabilities,
  genAppSecurityNote,
  faqItems
} from '@/content/homeContent'
import { submitSalesContact, SalesContactSubmitError } from '@/api/abisales'

type Card = {
  id: string
  title: string
  subtitle: string
  image?: string
  content: string
}

type MarkdownFrontmatter = {
  id?: string
  title?: string
  subtitle?: string
  order?: number | string
  image?: string
}

type ParsedMarkdown = {
  content: string
  frontmatter: MarkdownFrontmatter
}

const trimQuotes = (value: string) => {
  const v = value.trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1)
  }
  return v
}

const parseSimpleFrontmatter = (frontmatterText: string): MarkdownFrontmatter => {
  const result: MarkdownFrontmatter = {}
  const lines = frontmatterText.split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf(':')
    if (idx <= 0) continue
    const key = trimmed.slice(0, idx).trim()
    const rawValue = trimmed.slice(idx + 1).trim()
    const value = trimQuotes(rawValue)

    switch (key) {
      case 'id':
        result.id = value
        break
      case 'title':
        result.title = value
        break
      case 'subtitle':
        result.subtitle = value
        break
      case 'image':
        result.image = value
        break
      case 'order': {
        const n = Number.parseInt(value, 10)
        result.order = Number.isFinite(n) ? n : value
        break
      }
      default:
        // ignore unknown keys for forward-compatibility
        break
    }
  }
  return result
}

const parseMarkdown = (rawMd: string): ParsedMarkdown => {
  const normalized = (rawMd ?? '').replace(/^\uFEFF/, '')
  const lines = normalized.split(/\r?\n/)

  // 僅在文件開頭是 --- 才視為 frontmatter
  if ((lines[0] ?? '').trim() !== '---') {
    return { content: normalized.trim(), frontmatter: {} }
  }

  // 找到結束符 --- 或 ...
  let endIdx = -1
  for (let i = 1; i < lines.length; i++) {
    const t = (lines[i] ?? '').trim()
    if (t === '---' || t === '...') {
      endIdx = i
      break
    }
  }

  // 找不到結束符：不要硬解析，避免把整份 Markdown 當 YAML 造成錯誤
  if (endIdx === -1) {
    return { content: normalized.trim(), frontmatter: {} }
  }

  const fmText = lines.slice(1, endIdx).join('\n')
  const body = lines.slice(endIdx + 1).join('\n')
  return {
    content: body.trim(),
    frontmatter: parseSimpleFrontmatter(fmText)
  }
}

const getBaseNameWithoutExt = (filePath: string) => {
  const last = filePath.split('/').pop() ?? filePath
  return last.replace(/\.md$/i, '')
}

const coerceOrder = (maybeOrder: unknown, fallbackFromFileName: string) => {
  if (typeof maybeOrder === 'number' && Number.isFinite(maybeOrder)) return maybeOrder
  if (typeof maybeOrder === 'string') {
    const n = Number.parseInt(maybeOrder, 10)
    if (Number.isFinite(n)) return n
  }
  // 允許用檔名前綴自動推斷排序：例如 "1 xxx.md" / "1-通用業態技能.md"
  const m = fallbackFromFileName.match(/^(\d+)[\s\-_.]+/)
  if (m?.[1]) return Number.parseInt(m[1], 10)
  return Number.POSITIVE_INFINITY
}

// 編譯期載入 md：移除 /content/index.json 與 runtime fetch
const trendMdModules = import.meta.glob('../assets/context/trends/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const skillMdModules = import.meta.glob('../assets/context/skills/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

// 編譯期載入靜態頁面 md（避免 top-level await）
const pageMdModules = import.meta.glob('../assets/context/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const getPageMdRaw = (fileName: string) => {
  const entry = Object.entries(pageMdModules).find(([key]) => key.endsWith(`/${fileName}`))
  if (!entry?.[1]) {
    throw new Error(`Missing page markdown: ${fileName}`)
  }
  return entry[1]
}

const aboutMd = getPageMdRaw('about.md')
const solutionsMd = getPageMdRaw('solutions.md')
const architectureOverviewMd = getPageMdRaw('architecture-overview.md')
const architectureConsultingMd = getPageMdRaw('architecture-consulting.md')
const heroTagsMd = getPageMdRaw('herotags.md')

// 從 herotags.md 檔案讀取內容
const parseHeroTags = (mdContent: string): { subtitle: string; chips: string[] } => {
  const result = {
    subtitle: '',
    chips: [] as string[]
  }

  if (!mdContent) return result

  // 移除 HTML 註解
  const cleanContent = mdContent.replace(/<!--[\s\S]*?-->/g, '').trim()

  const lines = cleanContent.split('\n')
  let subtitleLines: string[] = []
  let inSubtitleSection = false
  let subtitleStarted = false

  for (let i = 0; i < lines.length; i++) {
    const trimmed = (lines[i] ?? '').trim()

    // 空行：如果已經開始 subtitle，則結束 subtitle 區塊
    if (!trimmed) {
      if (subtitleStarted) {
        inSubtitleSection = false
        subtitleStarted = false
      }
      continue
    }

    // 檢查是否是 subtitle 行
    if (trimmed.startsWith('subtitle:')) {
      subtitleStarted = true
      inSubtitleSection = true
      // 提取 subtitle: 後面的內容
      const subtitleContent = trimmed.replace(/^subtitle:\s*/, '').trim()
      if (subtitleContent) {
        subtitleLines.push(subtitleContent)
      }
      continue
    }

    // 如果在 subtitle 區塊中，繼續收集 subtitle 內容
    if (inSubtitleSection && subtitleStarted) {
      subtitleLines.push(trimmed)
      continue
    }

    // 剩下的都是 chips（過濾標題）
    if (!trimmed.startsWith('#')) {
      result.chips.push(trimmed)
    }
  }

  // 組合 subtitle 內容（支援換行）
  // 將換行轉換為 HTML <br> 標籤，marked 會保留 HTML 標籤
  if (subtitleLines.length > 0) {
    result.subtitle = subtitleLines.map(line => line.trim()).join('<br>')
  }

  return result
}

const heroChips = ref<string[]>([])
const heroSubtitle = ref(
  'ABI (Artificial Business Intelligence) Assistant【商用人工智慧助理】是專門為各種業態的零售、流通、餐飲、旅宿...等中小店家所開發的輕量級人工智慧系統。'
)

const heroImageUrl = ref<string>(heroImage)
const archCoreUrl = ref<string>(archCore)
const archIntegrateUrl = ref<string>(archIntegrate)

const trendCards = ref<Card[]>([])
const skillCards = ref<Card[]>([])

const architectureOverviewContent = ref<string>('')
const architectureConsultingContent = ref<string>('')

// 架構區：圖與說明成對呈現（產品架構、系統整合）
const architecturePairs = computed(() => [
  {
    title: '產品架構',
    image: archCoreUrl.value,
    content: architectureOverviewContent.value
  },
  {
    title: '系統整合',
    image: archIntegrateUrl.value,
    content: architectureConsultingContent.value
  }
])

type SolutionPlan = { name: string; tagline: string; features: string[] }

// 解析 solutions.md 檔案內容（含 columns、方案 tagline 與 features）
const parseSolutionsMd = (mdContent: string) => {
  const result: { columns: number; plans: SolutionPlan[] } = {
    columns: 3,
    plans: []
  }

  // 移除 HTML 註解
  let cleanContent = mdContent.replace(/<!--[\s\S]*?-->/g, '').trim()

  // 解析 columns 配置（更健壯的匹配方式）
  const lines = cleanContent.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('columns:')) {
      const match = trimmed.match(/columns:\s*(\d+)/)
      if (match && match[1]) {
        const parsedColumns = parseInt(match[1], 10)
        if (!isNaN(parsedColumns) && parsedColumns > 0 && parsedColumns <= 10) {
          result.columns = parsedColumns
          break
        }
      }
    }
    // 如果遇到第一個方案標題，停止搜尋 columns
    if (trimmed.startsWith('##')) {
      break
    }
  }

  const sections = cleanContent.split(/^##\s+/m).filter(section => {
    const trimmed = section.trim()
    return trimmed && !trimmed.startsWith('<!--') && !trimmed.startsWith('columns:')
  })

  for (const section of sections) {
    const lines = section.split('\n').map(line => line.trim())
    const name = lines[0]

    if (!name || name.startsWith('columns:')) continue

    let tagline = ''
    const features: string[] = []
    let inFeatures = false

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]

      if (!line) {
        if (inFeatures) {
          // 空行結束 features 區塊
          inFeatures = false
        }
        continue
      }

      if (line.startsWith('tagline:')) {
        tagline = line.replace(/^tagline:\s*/, '').trim()
      } else if (line === 'features:') {
        inFeatures = true
      } else if (inFeatures && line.startsWith('-')) {
        features.push(line.replace(/^-\s+/, '').trim())
      } else if (line.startsWith('##')) {
        // 遇到下一個方案標題，結束當前方案
        break
      }
    }

    if (name && features.length > 0) {
      result.plans.push({ name, tagline, features })
    }
  }

  return result
}

const solutionPlans = ref<SolutionPlan[]>([])
const solutionColumns = ref<number>(3)

// 從 md 檔案讀取關於資傳內容
const aboutContent = ref<string>('')

const activeArticle = ref<{ title: string; content: string } | null>(null)
const { locale } = useI18n()

const renderMarkdown = (md: string | undefined) => {
  if (!md) return ''
  // 配置 marked 以支援換行（兩個空格 + 換行）
  // 將兩個空格 + 換行轉換為 <br>，確保換行正確顯示
  const processedMd = md.replace(/  \n/g, '<br>\n')
  return marked.parse(processedMd)
}

const trendGrid = computed(() => trendCards.value)
const skillGrid = computed(() => skillCards.value)

const contentLoadError = ref('')

// images：將 frontmatter.image（檔名或相對路徑）解析為 Vite build 後可用的 URL
const imageModules = import.meta.glob('../assets/images/**/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const resolveImageUrlFromFrontmatter = (imageRef: string | undefined, baseName: string) => {
  const normalizedRef = (imageRef ?? '').trim()

  const matchBySuffix = (suffix: string) => {
    const wanted = suffix.startsWith('/') ? suffix : `/${suffix}`
    // keys 形如 "../assets/images/xxx.png"
    const entry = Object.entries(imageModules).find(([key]) => key.endsWith(wanted))
    return entry?.[1]
  }

  // 1) 指定 imageRef：支援 "foo.png" 或 "subdir/foo.png"（不要求含 images/ 前綴）
  if (normalizedRef) {
    const cleaned = normalizedRef.replace(/^images\//i, '')
    return matchBySuffix(cleaned) ?? matchBySuffix(normalizedRef)
  }

  // 2) 未指定：嘗試以 md 檔名（不含副檔名）自動配對同名圖片
  const candidates = Object.entries(imageModules)
    .filter(([key]) => {
      const base = key.split('/').pop() ?? ''
      return base.startsWith(`${baseName}.`)
    })
    .sort(([a], [b]) => a.localeCompare(b))
  return candidates[0]?.[1]
}

const buildCardsFromMarkdownModules = (modules: Record<string, string>) => {
  const cardsWithOrder = Object.entries(modules).map(([path, rawMd]) => {
    const baseName = getBaseNameWithoutExt(path)
    const { content, frontmatter } = parseMarkdown(rawMd)
    const order = coerceOrder(frontmatter.order, baseName)

    const title = (frontmatter.title ?? '').trim() || baseName
    const id = (frontmatter.id ?? '').trim() || baseName
    const subtitle = (frontmatter.subtitle ?? '').trim()
    const image = resolveImageUrlFromFrontmatter(frontmatter.image, baseName)

    return {
      order,
      card: {
        id,
        title,
        subtitle,
        image,
        content
      } satisfies Card
    }
  })

  return cardsWithOrder
    .sort((a, b) => a.order - b.order)
    .map(x => x.card)
}

onMounted(async () => {
  try {
    // hero tags
    const heroTagsData = parseHeroTags(heroTagsMd)
    heroChips.value = heroTagsData.chips
    heroSubtitle.value = heroTagsData.subtitle || heroSubtitle.value

    // cards
    trendCards.value = buildCardsFromMarkdownModules(trendMdModules)
    skillCards.value = buildCardsFromMarkdownModules(skillMdModules)

    // architecture / solutions / about
    architectureOverviewContent.value = parseMarkdown(architectureOverviewMd).content
    architectureConsultingContent.value = parseMarkdown(architectureConsultingMd).content

    const solutionsData = parseSolutionsMd(parseMarkdown(solutionsMd).content)
    solutionPlans.value = solutionsData.plans
    solutionColumns.value = solutionsData.columns

    aboutContent.value = parseMarkdown(aboutMd).content
  } catch (error) {
    contentLoadError.value = '內容載入失敗，請檢查 md 檔案內容格式是否正確。'
    if (import.meta.env.DEV) {
      console.error('Content load failed:', error)
    }
  }
})

const openArticle = (title: string, content: string) => {
  activeArticle.value = { title, content }
}

const closeArticle = () => {
  activeArticle.value = null
}

// CTA 捲動：扣除固定 header 高度，避免標題被遮住
const scrollToSection = (id: string) => {
  const target = document.getElementById(id)
  if (!target) return
  const headerHeight =
    Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      10
    ) || 72
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight
  window.scrollTo({ top, behavior: 'smooth' })
}

const contactForm = reactive({
  company: '',
  name: '',
  title: '',
  phone: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// 送出失敗一律據實回報，不改以郵件草稿等替代管道，避免使用者誤以為洽詢已成立
const submitContactForm = async () => {
  submitting.value = true
  submitSuccess.value = false
  submitError.value = ''

  try {
    await submitSalesContact({
      company: contactForm.company,
      name: contactForm.name,
      title: contactForm.title,
      phone: contactForm.phone,
      email: contactForm.email,
      message: contactForm.message,
      lang: locale.value
    })

    submitSuccess.value = true
    contactForm.company = ''
    contactForm.name = ''
    contactForm.title = ''
    contactForm.phone = ''
    contactForm.email = ''
    contactForm.message = ''
  } catch (error) {
    const reason = error instanceof SalesContactSubmitError ? error.message : '發生未預期的錯誤'
    submitError.value = `洽詢送出失敗（${reason}），請直接聯繫業務人員：digitrans.tw@gmail.com`
    if (import.meta.env.DEV) {
      console.error('Contact form submit failed:', error)
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="home">
    <p v-if="contentLoadError" class="muted">{{ contentLoadError }}</p>

    <!-- Hero：文字為主的大標語＋雙 CTA -->
    <section id="hero" class="hero">
      <div class="hero__text">
        <p class="hero__eyebrow">零售．流通．餐飲．旅宿　中小店家專用</p>
        <h1 class="hero__title">
          打造你的<span class="hero__highlight">雲地混合</span><br />
          商用 AI 助理
        </h1>
        <div class="hero__subtitle" v-html="renderMarkdown(heroSubtitle)"></div>
        <div class="hero__ctas">
          <button class="btn primary" type="button" @click="scrollToSection('contact')">
            💬 免費諮詢導入
          </button>
          <button class="btn ghost" type="button" @click="scrollToSection('solutions')">
            看導入方案
          </button>
        </div>
        <div class="chips">
          <span v-for="chip in heroChips" :key="chip">{{ chip }}</span>
        </div>
      </div>
      <div class="hero__media">
        <img :src="heroImageUrl" alt="ABI Assistant 商用人工智慧助理" loading="eager" />
      </div>
    </section>

    <!-- 三大價值支柱 -->
    <section id="value" class="section">
      <div class="section__header">
        <p class="eyebrow">為什麼選擇 ABI Assistant</p>
        <h2>AI 轉型的三道門檻：資料安全、學習成本、開發費用，一次解決</h2>
      </div>
      <div class="pillar-grid">
        <article v-for="pillar in valuePillars" :key="pillar.title" class="pillar">
          <div class="pillar__icon">{{ pillar.icon }}</div>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.description }}</p>
          <ul>
            <li v-for="point in pillar.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </section>

    <!-- 對比區：一般雲端 AI 工具 vs ABI Assistant -->
    <section id="compare" class="section muted">
      <div class="section__header">
        <p class="eyebrow">差異比較</p>
        <h2>一般雲端 AI 工具 vs ABI Assistant</h2>
      </div>
      <div class="compare">
        <div class="compare__head">
          <div class="compare__aspect"></div>
          <div class="compare__col-title generic">一般雲端 AI 工具</div>
          <div class="compare__col-title abi">ABI Assistant</div>
        </div>
        <div v-for="row in compareRows" :key="row.aspect" class="compare__row">
          <div class="compare__aspect">{{ row.aspect }}</div>
          <div class="compare__cell generic"><span class="mark">✕</span>{{ row.generic }}</div>
          <div class="compare__cell abi"><span class="mark">✓</span>{{ row.abi }}</div>
        </div>
      </div>
    </section>

    <!-- 六大功能 -->
    <section id="features" class="section">
      <div class="section__header">
        <p class="eyebrow">產品功能</p>
        <h2>一套系統，把店務交辦給 AI</h2>
      </div>
      <div class="feature-grid">
        <article v-for="feature in featureCards" :key="feature.title" class="feature">
          <div class="feature__icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.tagline }}</p>
          <ul>
            <li v-for="point in feature.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </section>

    <!-- 生成式 APP 專區 -->
    <section id="genapp" class="section genapp">
      <div class="section__header">
        <p class="eyebrow light">生成式 APP</p>
        <h2>不寫程式，三步驟長出你的管理系統</h2>
        <p class="section__lead">
          既有系統缺一塊管理功能？從資料庫結構出發，與 AI 對話定案後自動生成管理後台，部署成員工直接登入使用的獨立網站。
        </p>
      </div>
      <div class="genapp-steps">
        <article v-for="step in genAppSteps" :key="step.step" class="genapp-step">
          <div class="genapp-step__no">{{ step.step }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </article>
      </div>
      <div class="genapp-extra">
        <div class="genapp-capabilities">
          <h3>生成的管理系統做得到</h3>
          <ul>
            <li v-for="capability in genAppCapabilities" :key="capability">{{ capability }}</li>
          </ul>
        </div>
        <div class="genapp-security">
          <h3>🛡️ 安全邊界</h3>
          <p>{{ genAppSecurityNote }}</p>
        </div>
      </div>
    </section>

    <!-- 架構與整合 -->
    <section id="architecture" class="section muted">
      <div class="section__header">
        <p class="eyebrow">架構與整合</p>
        <h2>雲地混合架構，接得上你既有的系統</h2>
      </div>
      <div class="architecture-grid">
        <div v-for="pair in architecturePairs" :key="pair.title" class="arch-panel">
          <img class="arch-image" :src="pair.image" :alt="pair.title" loading="lazy" />
          <div class="arch-text" v-html="renderMarkdown(pair.content)" />
        </div>
      </div>
    </section>

    <!-- 業態技能 -->
    <section id="skills" class="section">
      <div class="section__header">
        <p class="eyebrow">業態技能</p>
        <h2>量身訂製的 AI 技能包，講你的營運語言</h2>
        <p class="section__lead">
          毋須昂貴的模型預訓練，以技能包直接賦予 AI 你所屬業態的營運知識與工作方法。點擊卡片看各業態範例。
        </p>
      </div>
      <div class="card-grid card-grid--two">
        <article
          v-for="card in skillGrid"
          :key="card.id"
          class="panel-card"
          @click="openArticle(card.title, card.content)"
        >
          <div class="panel-card__image" :style="card.image ? `background-image: url(${card.image})` : ''"></div>
          <div class="panel-card__body">
            <h3>{{ card.title }}</h3>
            <p v-if="card.subtitle">{{ card.subtitle }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- 導入方案 -->
    <section id="solutions" class="section muted">
      <div class="section__header">
        <p class="eyebrow">導入方案</p>
        <h2>依你的 IT 成熟度，選擇合適的落地方式</h2>
      </div>
      <div class="card-grid" :class="`card-grid--${solutionColumns}`">
        <article v-for="plan in solutionPlans" :key="plan.name" class="plan">
          <h3>{{ plan.name }}</h3>
          <p v-if="plan.tagline" class="plan__tagline">{{ plan.tagline }}</p>
          <ul>
            <li v-for="item in plan.features" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
      <div class="section__cta">
        <button class="btn primary" type="button" @click="scrollToSection('contact')">
          💬 和我們聊聊哪種方案適合你
        </button>
      </div>
    </section>

    <!-- 市場趨勢 -->
    <section id="trends" class="section">
      <div class="section__header">
        <p class="eyebrow">市場趨勢</p>
        <h2>2026 是領域應用型 AI 大爆發的一年，也是跨越「AI 轉型」門檻的關鍵期</h2>
      </div>
      <div class="card-grid card-grid--two">
        <article
          v-for="card in trendGrid"
          :key="card.id"
          class="panel-card"
          @click="openArticle(card.title, card.content)"
        >
          <div class="panel-card__image" :style="card.image ? `background-image: url(${card.image})` : ''"></div>
          <div class="panel-card__body">
            <h3>{{ card.title }}</h3>
            <p v-if="card.subtitle">{{ card.subtitle }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- 常見問題 -->
    <section id="faq" class="section muted">
      <div class="section__header">
        <p class="eyebrow">常見問題</p>
        <h2>導入前，老闆們最常問的幾件事</h2>
      </div>
      <div class="faq-list">
        <details v-for="item in faqItems" :key="item.question" class="faq-item">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>

    <!-- 業務聯繫 -->
    <section id="contact" class="section">
      <div class="section__header">
        <p class="eyebrow">業務聯繫</p>
        <h2>免費諮詢：讓我們了解你的店，給你可落地的建議</h2>
      </div>
      <div class="contact-panel">
        <form class="contact-form" @submit.prevent="submitContactForm">
          <div class="form-fields">
            <label>
              <span>公司名稱 (事業體名稱) <span class="required">*</span></span>
              <input v-model="contactForm.company" type="text" placeholder="公司名稱 (事業體名稱)" required />
            </label>
            <label>
              <span>聯絡人 <span class="required">*</span></span>
              <input v-model="contactForm.name" type="text" placeholder="聯絡人" required />
            </label>
            <label>
              <span>職稱</span>
              <input v-model="contactForm.title" type="text" placeholder="職稱" />
            </label>
            <label>
              <span>電話 <span class="required">*</span></span>
              <input v-model="contactForm.phone" type="tel" placeholder="電話" required />
            </label>
            <label>
              <span>電子郵件 <span class="required">*</span></span>
              <input v-model="contactForm.email" type="email" placeholder="電子郵件" required />
            </label>
            <label>
              <span>洽詢內容 <span class="required">*</span></span>
              <textarea v-model="contactForm.message" rows="4" placeholder="想解決的問題、門市數量、使用中的系統…" required></textarea>
            </label>
          </div>
          <button type="submit" class="btn primary full" :disabled="submitting">
            {{ submitting ? '送出中...' : '送出洽詢' }}
          </button>
          <p v-if="submitSuccess" class="success-message">已收到你的洽詢，我們會盡快與你聯繫。</p>
          <p v-if="submitError" class="error-message">{{ submitError }}</p>
        </form>
      </div>
    </section>

    <!-- 關於資傳 -->
    <section id="about" class="section muted">
      <div class="section__header">
        <p class="eyebrow">關於資傳</p>
        <h2>專注中小企業的 AI 商業應用</h2>
      </div>
      <div class="about" v-html="renderMarkdown(aboutContent)" />
    </section>

    <div v-if="activeArticle" class="modal">
      <div class="modal__overlay" @click="closeArticle" />
      <div class="modal__content">
        <div class="modal__body" v-html="renderMarkdown(activeArticle.content)" />
      </div>
      <button class="modal__close" type="button" aria-label="關閉" @click="closeArticle">×</button>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 72px;
  padding: 40px 20px 64px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* ---------- Hero ---------- */
.hero {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: 32px;
  padding: 24px 0 8px;
}

.hero__eyebrow {
  display: inline-block;
  margin: 0 0 14px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--color-accent-soft);
  border: 1px solid #a7f3d0;
  color: var(--color-accent-strong);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.06em;
}

.hero__title {
  margin: 0 0 16px;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.22;
  color: var(--color-ink);
  letter-spacing: 0.01em;
}

.hero__highlight {
  color: var(--color-primary);
}

.hero__subtitle {
  color: var(--color-muted);
  font-size: 17px;
  line-height: 1.8;
  margin-bottom: 22px;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;
}

.hero__media img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-card);
  border: 1px solid var(--color-border);
  box-shadow: 0 18px 36px rgba(29, 78, 216, 0.12);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chips span {
  padding: 6px 12px;
  background: var(--color-primary-soft);
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  color: var(--color-primary-strong);
  font-size: 14px;
  font-weight: 600;
}

/* ---------- 共用 section ---------- */
.section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.section.muted {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px 28px;
}

.section__header {
  display: grid;
  gap: 8px;
  max-width: 860px;
}

.section__header h2 {
  margin: 0;
  font-size: clamp(22px, 3vw, 28px);
  line-height: 1.4;
  color: var(--color-ink);
}

.eyebrow {
  margin: 0;
  color: var(--color-accent-strong);
  font-weight: 800;
  letter-spacing: 0.08em;
  font-size: 15px;
}

.section__lead {
  margin: 4px 0 0;
  color: var(--color-muted);
  line-height: 1.8;
}

.section__cta {
  display: flex;
  justify-content: center;
  margin-top: 4px;
}

.muted {
  color: var(--color-muted);
}

/* ---------- 價值支柱 ---------- */
.pillar-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.pillar {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 4px solid var(--color-accent);
  border-radius: var(--radius-card);
  padding: 24px 22px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pillar__icon {
  font-size: 34px;
  line-height: 1;
}

.pillar h3 {
  margin: 0;
  font-size: 19px;
  color: var(--color-ink);
}

.pillar p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.7;
}

.pillar ul {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  display: grid;
  gap: 8px;
}

.pillar li {
  position: relative;
  padding-left: 22px;
  color: var(--color-ink);
  font-size: 14.5px;
  line-height: 1.6;
}

.pillar li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 800;
}

/* ---------- 對比區 ---------- */
.compare {
  display: grid;
  gap: 10px;
}

.compare__head,
.compare__row {
  display: grid;
  grid-template-columns: 130px 1fr 1fr;
  gap: 10px;
  align-items: stretch;
}

.compare__col-title {
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 800;
  text-align: center;
}

.compare__col-title.generic {
  background: #f1f5f9;
  color: var(--color-faint);
}

.compare__col-title.abi {
  background: var(--color-primary);
  color: #fff;
}

.compare__aspect {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--color-ink);
  font-size: 15px;
}

.compare__cell {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.6;
  font-size: 14.5px;
}

.compare__cell.generic {
  background: #f8fafc;
  border: 1px solid var(--color-border);
  color: var(--color-faint);
}

.compare__cell.abi {
  background: var(--color-accent-soft);
  border: 1px solid #a7f3d0;
  color: var(--color-ink);
}

.compare__cell .mark {
  font-weight: 800;
  flex-shrink: 0;
}

.compare__cell.generic .mark {
  color: #cbd5e1;
}

.compare__cell.abi .mark {
  color: var(--color-accent);
}

/* ---------- 功能卡 ---------- */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.feature {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 22px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.feature:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.feature__icon {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 12px;
  background: var(--color-primary-soft);
}

.feature h3 {
  margin: 4px 0 0;
  font-size: 18px;
  color: var(--color-ink);
}

.feature p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.7;
  font-size: 14.5px;
}

.feature ul {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  display: grid;
  gap: 6px;
}

.feature li {
  position: relative;
  padding-left: 20px;
  color: var(--color-ink);
  font-size: 14px;
  line-height: 1.6;
}

.feature li::before {
  content: '•';
  position: absolute;
  left: 6px;
  color: var(--color-accent);
  font-weight: 800;
}

/* ---------- 生成式 APP 專區 ---------- */
.section.genapp {
  background: linear-gradient(135deg, #0f2b6e 0%, var(--color-primary-strong) 55%, #114b8f 100%);
  border-radius: 20px;
  padding: 40px 32px;
  color: #e2e8f0;
}

.section.genapp .section__header h2 {
  color: #fff;
}

.eyebrow.light {
  color: #6ee7b7;
}

.section.genapp .section__lead {
  color: #cbd5e1;
}

.genapp-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.genapp-step {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-card);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.genapp-step__no {
  font-size: 15px;
  font-weight: 800;
  color: #6ee7b7;
  letter-spacing: 0.12em;
}

.genapp-step h3 {
  margin: 0;
  color: #fff;
  font-size: 19px;
}

.genapp-step p {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.75;
  font-size: 14.5px;
}

.genapp-extra {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 18px;
}

.genapp-capabilities,
.genapp-security {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-card);
  padding: 20px 22px;
}

.genapp-capabilities h3,
.genapp-security h3 {
  margin: 0 0 10px;
  color: #fff;
  font-size: 16px;
}

.genapp-capabilities ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 16px;
}

.genapp-capabilities li {
  position: relative;
  padding-left: 22px;
  color: #e2e8f0;
  font-size: 14.5px;
  line-height: 1.6;
}

.genapp-capabilities li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #6ee7b7;
  font-weight: 800;
}

.genapp-security p {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.75;
  font-size: 14.5px;
}

/* ---------- 架構與整合 ---------- */
.architecture-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.arch-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

.arch-image {
  display: block;
  width: 100%;
  height: auto;
  border-bottom: 1px solid var(--color-border);
}

.arch-text {
  padding: 18px 20px;
  color: var(--color-ink);
  line-height: 1.75;
}

.arch-text :deep(h2),
.arch-text :deep(h3) {
  margin: 0 0 10px;
  font-size: 17px;
}

.arch-text :deep(ul) {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 6px;
  color: var(--color-muted);
}

/* ---------- 卡片網格（技能／趨勢／方案共用） ---------- */
.card-grid {
  display: grid;
  gap: 18px;
  width: 100%;
  box-sizing: border-box;
  grid-auto-flow: row;
  min-width: 0;
  align-items: stretch;
}

.card-grid--1 {
  grid-template-columns: 1fr;
}

.card-grid--2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card-grid--3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.card-grid--4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.panel-card {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.panel-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.panel-card__image {
  height: 260px;
  background-size: cover;
  background-position: center;
}

.panel-card__body {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border-top: 3px solid var(--color-accent);
}

.panel-card__body h3 {
  margin: 0;
  color: var(--color-ink);
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  flex-shrink: 0;
  font-size: 17px;
}

.panel-card__body p {
  margin: 0;
  color: var(--color-muted);
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex-shrink: 0;
  font-size: 14.5px;
  line-height: 1.6;
}

/* ---------- 導入方案 ---------- */
.plan {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 22px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plan h3 {
  margin: 0;
  font-size: 20px;
  color: var(--color-primary-strong);
}

.plan__tagline {
  margin: 0;
  color: var(--color-muted);
  font-size: 14.5px;
  line-height: 1.6;
  min-height: 44px;
}

.plan ul {
  list-style: none;
  padding: 12px 0 0;
  margin: 0;
  display: grid;
  gap: 8px;
  color: var(--color-ink);
  border-top: 1px dashed var(--color-border);
}

.plan li {
  position: relative;
  padding-left: 22px;
  font-size: 14.5px;
  line-height: 1.6;
}

.plan li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 800;
}

/* ---------- FAQ ---------- */
.faq-list {
  display: grid;
  gap: 10px;
}

.faq-item {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
}

.faq-item summary {
  cursor: pointer;
  padding: 16px 18px;
  font-weight: 700;
  color: var(--color-ink);
  list-style: none;
  position: relative;
  padding-right: 42px;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  font-weight: 400;
  color: var(--color-accent);
  transition: transform 0.2s ease;
}

.faq-item[open] summary::after {
  content: '−';
}

.faq-item p {
  margin: 0;
  padding: 0 18px 16px;
  color: var(--color-muted);
  line-height: 1.8;
}

/* ---------- 聯繫表單 ---------- */
.contact-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 26px;
  box-shadow: var(--shadow-card);
  max-width: 860px;
}

.form-fields {
  display: grid;
  gap: 16px;
}

.form-fields label {
  display: grid;
  gap: 6px;
}

.form-fields label > span {
  font-weight: 600;
  color: var(--color-ink);
  font-size: 14px;
}

.form-fields .required {
  color: #dc2626;
  font-weight: 700;
}

input,
textarea {
  width: 100%;
  padding: 11px 12px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  font-size: 14px;
  color: var(--color-ink);
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

input:focus,
textarea:focus {
  outline: 2px solid var(--color-accent);
  border-color: var(--color-accent);
}

.contact-form .btn.primary.full {
  margin-top: 24px;
}

.success-message {
  color: #16a34a;
  font-weight: 600;
  margin-top: 12px;
  padding: 12px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
}

.error-message {
  color: #dc2626;
  font-weight: 600;
  margin-top: 12px;
  padding: 12px;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
}

/* ---------- 關於 ---------- */
.about {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 20px 22px;
  color: var(--color-muted);
  line-height: 1.75;
  display: grid;
  gap: 12px;
}

.about :deep(h1),
.about :deep(h2),
.about :deep(h3) {
  color: var(--color-ink);
  margin: 0;
}

/* ---------- Modal ---------- */
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: var(--header-height, 72px);
  bottom: 0;
  z-index: 40;
}

.modal__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
}

.modal__content {
  position: absolute;
  inset: 0;
  background: #fff;
  border-radius: 0;
  border: none;
  box-shadow: none;
  padding: 10px 16px 20px;
  max-height: 100vh;
  overflow: auto;
  /* 避免底部懸浮關閉鈕遮蔽內容 */
  padding-bottom: calc(20px + 56px + 16px);
}

.modal__body {
  color: var(--color-ink);
  line-height: 1.7;
  /* modal 內閱讀性提升：最小字體放大二級 */
  font-size: 18px;
  max-width: 860px;
  margin: 0 auto;
}

/* v-html 產生的內容不會帶 scoped attribute，需用 :deep 才能覆寫最小字級 */
.modal__body :deep(small),
.modal__body :deep(sub),
.modal__body :deep(sup) {
  font-size: 1em;
}

.modal__close {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 41;
  border: 1px solid #34d399;
  background: var(--color-accent);
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  font-size: 28px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow:
    0 10px 22px rgba(5, 150, 105, 0.35),
    0 6px 16px rgba(15, 23, 42, 0.12);
  transition: all 0.2s ease;
}

.modal__close:hover {
  background: var(--color-accent-strong);
  border-color: #6ee7b7;
  box-shadow:
    0 14px 26px rgba(4, 120, 87, 0.45),
    0 10px 20px rgba(15, 23, 42, 0.14);
  transform: translateX(-50%) translateY(-1px);
}

.modal__close:focus-visible {
  outline: 3px solid rgba(5, 150, 105, 0.45);
  outline-offset: 3px;
}

/* ---------- RWD ---------- */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero__media {
    order: -1;
  }

  .pillar-grid,
  .feature-grid,
  .genapp-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .genapp-extra {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .card-grid--1,
  .card-grid--2,
  .card-grid--3,
  .card-grid--4,
  .card-grid--two,
  .pillar-grid,
  .feature-grid,
  .genapp-steps,
  .architecture-grid {
    grid-template-columns: 1fr;
  }

  .genapp-capabilities ul {
    grid-template-columns: 1fr;
  }

  /* 對比區改為堆疊卡片 */
  .compare__head {
    display: none;
  }

  .compare__row {
    grid-template-columns: 1fr;
    gap: 8px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 14px;
  }

  .compare__aspect {
    font-size: 15px;
  }

  .panel-card__body {
    padding: 14px;
  }

  .panel-card__body h3 {
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .home {
    padding: 24px 14px 48px;
  }

  .section.muted {
    padding: 22px 18px;
  }

  .section.genapp {
    padding: 28px 20px;
  }

  .section__header h2 {
    font-size: 20px;
  }

  .panel-card__image {
    height: 200px;
  }

  .hero__ctas .btn {
    width: 100%;
  }
}

@media (min-width: 769px) {
  .card-grid--two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .panel-card__image {
    height: 300px;
  }
}
</style>
