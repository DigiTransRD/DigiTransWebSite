import { marked } from 'marked'

type ArticleCategory = 'trends' | 'skills'

type MarkdownFrontmatter = {
  title?: string
  subtitle?: string
  excerpt?: string
  tags?: string
  publishedAt?: string
}

export type StaticArticle = {
  id: string
  slug: string
  category: ArticleCategory
  categoryLabel: string
  publishedAt?: string
  tags: string[]
  isFeatured: boolean
  status: 'Published'
  translation: {
    title: string
    excerpt: string
    body: string
  }
}

const trendModules = import.meta.glob('../assets/context/trends/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const skillModules = import.meta.glob('../assets/context/skills/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const categoryLabels: Record<ArticleCategory, string> = {
  trends: 'Trends',
  skills: 'Skills'
}

const trimQuotes = (value: string) => {
  const normalized = value.trim()
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    return normalized.slice(1, -1)
  }
  return normalized
}

const parseFrontmatter = (rawMarkdown: string) => {
  const normalized = rawMarkdown.replace(/^\uFEFF/, '')
  const lines = normalized.split(/\r?\n/)

  if ((lines[0] ?? '').trim() !== '---') {
    return {
      frontmatter: {} as MarkdownFrontmatter,
      body: normalized.trim()
    }
  }

  let endIndex = -1
  for (let index = 1; index < lines.length; index += 1) {
    const line = (lines[index] ?? '').trim()
    if (line === '---' || line === '...') {
      endIndex = index
      break
    }
  }

  if (endIndex === -1) {
    return {
      frontmatter: {} as MarkdownFrontmatter,
      body: normalized.trim()
    }
  }

  const frontmatter: MarkdownFrontmatter = {}
  for (const line of lines.slice(1, endIndex)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf(':')
    if (separatorIndex <= 0) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimQuotes(trimmed.slice(separatorIndex + 1).trim())
    if (key === 'title') frontmatter.title = value
    if (key === 'subtitle') frontmatter.subtitle = value
    if (key === 'excerpt') frontmatter.excerpt = value
    if (key === 'tags') frontmatter.tags = value
    if (key === 'publishedAt') frontmatter.publishedAt = value
  }

  return {
    frontmatter,
    body: lines.slice(endIndex + 1).join('\n').trim()
  }
}

const getFileName = (filePath: string) => filePath.split('/').pop() ?? filePath

const getOrderFromFileName = (fileName: string) => {
  const match = fileName.match(/^(\d+)/)
  return match?.[1] ? Number.parseInt(match[1], 10) : Number.POSITIVE_INFINITY
}

const getTitleFromMarkdown = (body: string, fallback: string) => {
  const heading = body.match(/^#\s+(.+)$/m)?.[1]?.trim()
  return heading || fallback
}

const getExcerptFromMarkdown = (body: string) => {
  const excerptSource = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/\r?\n\r?\n/)
    .map((block) => block.replace(/^#+\s+/gm, '').trim())
    .find((block) => block.length > 0)

  if (!excerptSource) return ''
  return excerptSource.replace(/\s+/g, ' ').slice(0, 180)
}

const renderMarkdown = (body: string) => marked.parse(body.replace(/  \n/g, '<br>\n')) as string

const buildArticles = (modules: Record<string, string>, category: ArticleCategory) =>
  Object.entries(modules)
    .sort(([leftPath], [rightPath]) => {
      const leftName = getFileName(leftPath)
      const rightName = getFileName(rightPath)
      return getOrderFromFileName(leftName) - getOrderFromFileName(rightName)
    })
    .map(([path, rawMarkdown], index) => {
      const fileName = getFileName(path)
      const { frontmatter, body } = parseFrontmatter(rawMarkdown)
      const title = frontmatter.title || getTitleFromMarkdown(body, fileName.replace(/\.md$/i, ''))
      const excerpt = frontmatter.excerpt || frontmatter.subtitle || getExcerptFromMarkdown(body)
      const order = Number.isFinite(getOrderFromFileName(fileName)) ? getOrderFromFileName(fileName) : index + 1
      const slug = `${category}-${order}`

      return {
        id: slug,
        slug,
        category,
        categoryLabel: categoryLabels[category],
        publishedAt: frontmatter.publishedAt,
        tags: frontmatter.tags
          ? frontmatter.tags.split(',').map((item) => item.trim()).filter(Boolean)
          : [],
        isFeatured: index === 0,
        status: 'Published' as const,
        translation: {
          title,
          excerpt,
          body: renderMarkdown(body)
        }
      }
    })

const allArticles = [
  ...buildArticles(trendModules, 'trends'),
  ...buildArticles(skillModules, 'skills')
]

export const getAllArticles = () => allArticles

export const getArticlesByCategory = (category: string) =>
  allArticles.filter((article) => article.category === category)

export const getArticleBySlug = (slug: string) =>
  allArticles.find((article) => article.slug === slug) ?? null
