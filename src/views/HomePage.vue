<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { marked } from 'marked'
import { useI18n } from 'vue-i18n'

import archCore from '@/assets/images/9b07d26265a59631f51c3046a3cb1e76.jpg'
import archIntegrate from '@/assets/images/2aa64f6930a2007656859e990e8ac073.jpg'
import heroImage from '@/assets/images/ABIAssistant-2.png'

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

const architecturePanels = computed(() => [
  { type: 'image', title: '產品架構圖', image: archCoreUrl.value },
  {
    type: 'markdown',
    title: '架構說明文字',
    content: architectureOverviewContent.value
  },
  { type: 'image', title: '系統整合架構圖', image: archIntegrateUrl.value },
  {
    type: 'markdown',
    title: '系統整合說明文字',
    content: architectureConsultingContent.value
  }
])

// 解析 solutions.md 檔案內容
const parseSolutionsMd = (mdContent: string) => {
  const result: { columns: number; plans: Array<{ name: string; features: string[] }> } = {
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
      
      if (line === 'features:') {
        inFeatures = true
      } else if (inFeatures && line.startsWith('-')) {
        features.push(line.replace(/^-\s+/, '').trim())
      } else if (line.startsWith('##')) {
        // 遇到下一個方案標題，結束當前方案
        break
      }
    }
    
    if (name && features.length > 0) {
      result.plans.push({ name, features })
    }
  }
  
  return result
}

const solutionPlans = ref<Array<{ name: string; features: string[] }>>([])
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

const submitContactForm = async () => {
  submitting.value = true
  submitSuccess.value = false
  submitError.value = ''

  try {
    const subject = encodeURIComponent(`ABI Assistant website inquiry | ${contactForm.company} | ${contactForm.name}`)
    const body = encodeURIComponent([
      'ABI Assistant website inquiry',
      '',
      `Locale: ${locale.value}`,
      `Company: ${contactForm.company}`,
      `Name: ${contactForm.name}`,
      `Title: ${contactForm.title}`,
      `Phone: ${contactForm.phone}`,
      `Email: ${contactForm.email}`,
      '',
      'Message:',
      contactForm.message
    ].join('\n'))

    window.location.href = `mailto:digitrans.tw@gmail.com?subject=${subject}&body=${body}`

    submitSuccess.value = true
    contactForm.company = ''
    contactForm.name = ''
    contactForm.title = ''
    contactForm.phone = ''
    contactForm.email = ''
    contactForm.message = ''
  } catch (error) {
    submitError.value = 'Unable to open your mail client. Please email digitrans.tw@gmail.com directly.'
    if (import.meta.env.DEV) {
      console.error('Contact form action failed:', error)
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="home">
    <p v-if="contentLoadError" class="muted">{{ contentLoadError }}</p>
    <section class="hero">
      <div class="hero__visual">
        <div class="hero__image" :style="`background-image: url(${heroImageUrl})`">
          <div class="hero__overlay">
            <p class="eyebrow">雲地混合架構．輕量級AI</p>
            <h1 class="hero-title">
              <span class="title-main gradient-text">ABI Assistant</span>
              <span class="title-sub">商用人工智慧助理</span>
            </h1>
          </div>
        </div>
        <div class="hero__body">
          <div class="subtitle" v-html="renderMarkdown(heroSubtitle)"></div>
          <div class="chips">
            <span v-for="chip in heroChips" :key="chip">{{ chip }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="trends" class="section">
      <div class="section__header">
        <p class="eyebrow">趨勢應用</p>
        <h2>2026 是領域應用型AI大爆發的年代，也是您事業跨越『AI轉型』門檻的關鍵期</h2>
      </div>
      <div class="card-grid card-grid--two">
        <article
          v-for="card in trendGrid"
          :key="card.id"
          class="panel-card overlay-title"
          @click="openArticle(card.title, card.content)"
        >
          <div class="panel-card__image" :style="card.image ? `background-image: url(${card.image})` : ''"></div>
          <div class="panel-card__body">
            <h3>{{ card.title }}</h3>
            <p>{{ card.subtitle }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="architecture" class="section muted">
      <div class="section__header">
        <p class="eyebrow">產品架構</p>
        <h2>雲地混合架構、企業級 MCP 工具箱、業態訂製技能包</h2>
      </div>
      <div class="architecture-list">
        <div
          v-for="(panel, index) in architecturePanels"
          :key="`${panel.title}-${index}`"
          class="arch-panel"
        >
          <img
            v-if="panel.type === 'image'"
            class="arch-image"
            :src="panel.image"
            :alt="panel.title"
            loading="lazy"
          />
          <div v-else class="arch-text" v-html="renderMarkdown(panel.content)" />
        </div>
      </div>
    </section>

    <section id="skills" class="section">
      <div class="section__header">
        <p class="eyebrow">業態技能</p>
        <h2>量身訂製的AI技能包，毋須昂貴的預訓練，輕鬆賦予營運流程所需的專屬技能</h2>
      </div>
      <div class="card-grid card-grid--two">
        <article
          v-for="card in skillGrid"
          :key="card.id"
          class="panel-card overlay-title"
          @click="openArticle(card.title, card.content)"
        >
          <div class="panel-card__image" :style="card.image ? `background-image: url(${card.image})` : ''"></div>
          <div class="panel-card__body">
            <h3>{{ card.title }}</h3>
          </div>
        </article>
      </div>
    </section>

    <section id="solutions" class="section muted">
      <div class="section__header">
        <p class="eyebrow">導入方案</p>
        <h2>提供多種彈性選擇，可依照IT能力成熟度選擇適合的AI落地方案</h2>
      </div>
      <div class="card-grid" :class="`card-grid--${solutionColumns}`">
        <article v-for="plan in solutionPlans" :key="plan.name" class="plan">
          <h3>{{ plan.name }}</h3>
          <ul>
            <li v-for="item in plan.features" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="contact" class="section">
      <div class="section__header">
        <p class="eyebrow">業務聯繫</p>
        <h2>需要諮詢或合作？</h2>
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
              <textarea v-model="contactForm.message" rows="4" placeholder="洽詢內容" required></textarea>
            </label>
          </div>
          <button type="submit" class="btn primary full" :disabled="submitting">
            {{ submitting ? '送出中...' : '送出洽詢' }}
          </button>
          <p v-if="submitSuccess" class="success-message">已替你開啟郵件草稿，請確認後送出。</p>
          <p v-if="submitError" class="error-message">{{ submitError }}</p>
        </form>
      </div>
    </section>

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
  padding: 32px 20px 64px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero__content h1 {
  font-size: 40px;
  margin: 10px 0;
  color: #0f172a;
  line-height: 1.2;
}

.gradient-text {
  color: #e0f2ff;
  text-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}

.subtitle {
  color: #1f2937;
  line-height: 1.6;
  margin: 0;
}

.eyebrow {
  color: #2563eb;
  font-weight: 700;
  letter-spacing: 0.02em;
  font-size: 18px;
}

.btn {
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn.primary {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #fff;
}

.btn.ghost {
  border: 1px solid #e2e8f0;
  color: #0f172a;
  background: #fff;
}

.btn.full {
  width: 100%;
  text-align: center;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.25);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chips span {
  padding: 5.5px 10px;
  background: #eef2ff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  color: #0f172a;
}

.hero__visual {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(37, 99, 235, 0.12);
  border: 1px solid #e2e8f0;
}

.hero__image {
  position: relative;
  height: 420px;
  background-size: cover;
  background-position: center;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0.25) 100%);
}

.hero__overlay h1 {
  margin: -8px 0 0;
  color: #f8fafc;
  text-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}

.hero__overlay .eyebrow {
  color: #bfdbfe;
  /* 自適應字級，避免手機上換行 */
  font-size: clamp(12px, 3.6vw, 22px);
  font-weight: 800;
  white-space: nowrap;
}

.hero-title {
  display: grid;
  gap: 6px;
}

.title-main {
  display: inline-block;
  /* 自適應字級，避免手機上換行 */
  font-size: clamp(26px, 8.8vw, 46px);
  line-height: 1.15;
  white-space: nowrap;
}

.title-sub {
  display: inline-block;
  /* 桌機保留視覺縮排；手機移除以避免換行 */
  margin-left: 84px;
  color: #e2e8f0;
  /* 自適應字級，避免手機上換行 */
  font-size: clamp(16px, 5.6vw, 28px);
  line-height: 1.15;
  white-space: nowrap;
}

.hero__body {
  padding: 0 8px 8px;
  display: grid;
  gap: 10px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.section.muted {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 28px;
}

.section__header {
  display: grid;
  gap: 6px;
}

.section__header h2 {
  margin: 0;
  font-size: 20px;
  color: #0f172a;
}

.section__header .eyebrow {
  font-size: 18px;
  color: #f97316;
}

.description {
  color: #475569;
  line-height: 1.6;
}

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
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
}

.panel-card__image {
  height: 260px;
  background-size: cover;
  background-position: center;
}

.panel-card__body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.panel-card__body h3 {
  margin: 0 0 6px 0;
  color: #0f172a;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  flex-shrink: 0;
}

.panel-card__body p {
  margin: 0;
  color: #475569;
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex-shrink: 0;
}

.overlay-title .panel-card__body {
  margin-top: 0;
  background: #e0f2ff;
  color: #0f172a;
  border-top: 1px solid #cbd5e1;
}

.stacked-panels {
  display: grid;
  gap: 16px;
}

.panel.wide {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.panel__image {
  height: 240px;
  background-size: cover;
  background-position: center;
}

.panel__body {
  padding: 16px;
}

.panel__body h3 {
  margin: 0 0 6px 0;
}

.panel__body p {
  margin: 0;
  color: #475569;
}

.architecture-list {
  display: grid;
  gap: 16px;
}

.arch-panel {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.arch-image {
  display: block;
  width: 100%;
  height: auto;
}

.arch-text {
  padding: 16px;
  color: #0f172a;
  line-height: 1.7;
}

.skill-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
}

.skill-card__image {
  height: 160px;
  background-size: cover;
  background-position: center;
}

.skill-card__title {
  padding: 12px 10px;
  font-weight: 700;
  color: #0f172a;
}

.plan {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.07);
}

.plan h3 {
  margin: 0 0 10px 0;
}

.plan ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
  color: #475569;
}


.contact-panel {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
}

.contact-info {
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.contact-info h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  color: #0f172a;
}

.contact-form h3 {
  margin: 0 0 16px 0;
  font-size: 20px;
  color: #0f172a;
}

.contact-list {
  display: grid;
  gap: 10px;
}

.contact-item__label {
  font-size: 13px;
  color: #475569;
}

.contact-item__value {
  font-weight: 700;
  color: #0f172a;
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
  color: #0f172a;
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
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 14px;
  color: #0f172a;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

input:focus,
textarea:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
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

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.about {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px;
  color: #475569;
  line-height: 1.7;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 12px;
}

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
  color: #0f172a;
  line-height: 1.7;
  /* modal 內閱讀性提升：最小字體放大二級 */
  font-size: 18px;
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
  border: 1px solid #fb923c;
  background: #f97316; /* 橙底白字：更醒目 */
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
    0 10px 22px rgba(249, 115, 22, 0.35),
    0 6px 16px rgba(15, 23, 42, 0.12);
  transition: all 0.2s ease;
}

.modal__close:hover {
  background: #ea580c;
  border-color: #fdba74;
  box-shadow:
    0 14px 26px rgba(234, 88, 12, 0.45),
    0 10px 20px rgba(15, 23, 42, 0.14);
  transform: translateX(-50%) translateY(-1px);
}

.modal__close:focus-visible {
  outline: 3px solid rgba(249, 115, 22, 0.45);
  outline-offset: 3px;
}

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .card-grid--1,
  .card-grid--2,
  .card-grid--3,
  .card-grid--4 {
    grid-template-columns: 1fr;
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

  .hero__image {
    height: 240px;
  }

  /* 手機：取消副標縮排，避免被擠到換行 */
  .title-sub {
    margin-left: 0;
  }

  .section.muted {
    padding: 20px;
  }

  .section__header h2 {
    font-size: 18px;
  }

  .panel-card__image {
    height: 200px;
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
