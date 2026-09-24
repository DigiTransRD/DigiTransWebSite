import { detailPages } from './detailContent'
import { getAllArticles, getArticleBySlug } from './articles'
import { capabilities, productFeatures, productIdentity, faqItems } from './homeContent'

export const site = {
  name: productIdentity.name,
  company: '資傳數位有限公司',
  url: 'https://www.digitrans.com.tw',
  description: `ABI 是 ${productIdentity.fullName} 的縮寫。ABI Assistant 商用人工智能助理（商用人工智慧助理），以 Business AI Agent 結合企業資料、技能與授權工具執行任務。生成式表單、報表與 APP 通用功能立即可用，支援 LINE 整合與前進部署工程師導入。`,
}
export const staticPaths = ['/', ...detailPages.map(page => page.path), '/contact/', '/articles/skills/', '/articles/trends/', ...getAllArticles().map(article => '/article/' + article.slug + '/')]

export function getPageMetadata(path: string) {
  const detail = detailPages.find(page => page.path === path)
  const article = path.startsWith('/article/') ? getArticleBySlug(path.split('/')[2] ?? '') : null
  const titles: Record<string, string> = {
    '/': 'ABI Assistant｜商用人工智能助理・Business AI Agent',
    '/contact/': '預約 ABI 導入評估｜資傳數位',
    '/articles/skills/': '產業技能文章｜ABI Assistant',
    '/articles/trends/': '趨勢與觀點｜ABI Assistant',
  }
  const title = detail ? (detail.path === productIdentity.path ? detail.title + '・Business AI Agent' : detail.title + '｜ABI Assistant') : article ? article.translation.title + '｜ABI Assistant' : titles[path] ?? '找不到這個頁面｜ABI Assistant'
  const descriptions: Record<string, string> = {
    '/contact/': '與資傳數位討論既有系統、資料與業務流程，評估 ABI 生成式應用及前進部署工程師協作的導入方式。',
    '/articles/skills/': '探索通用營運、服飾、寵物與生鮮等產業技能，了解企業知識與工作流程如何成為 AI 商業應用的基礎。',
    '/articles/trends/': '閱讀零售流通業 AI 應用與企業轉型觀點，從業務需求、資料條件與架構選型思考 AI 導入。',
  }
  const description = detail?.description ?? article?.translation.excerpt ?? descriptions[path] ?? site.description
  const known = staticPaths.includes(path)
  const url = site.url + path
  const isProductPage = path === '/' || path === productIdentity.path
  const robots = known ? 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' : 'noindex,follow'
  const markdownUrl = detail ? url + 'index.md' : undefined
  const ogType = article ? 'article' : 'website'
  const graph: Record<string, unknown>[] = [
    { '@type': 'Organization', '@id': site.url + '/#organization', name: site.company, alternateName: 'Digital Transformation Consulting Ltd.', url: site.url, logo: site.url + '/abi-wordmark.svg', email: 'digitrans.tw@gmail.com' },
    { '@type': 'WebSite', '@id': site.url + '/#website', name: site.name, url: site.url, inLanguage: 'zh-Hant', publisher: { '@id': site.url + '/#organization' } },
    { '@type': 'WebPage', '@id': url + '#page', name: title, description, url, inLanguage: 'zh-Hant', isPartOf: { '@id': site.url + '/#website' }, about: { '@id': site.url + '/#software' }, ...(isProductPage ? { mainEntity: { '@id': site.url + '/#software' } } : {}) },
    { '@type': 'SoftwareApplication', '@id': site.url + '/#software', name: site.name, alternateName: ['ABI', productIdentity.fullName, productIdentity.chineseName, productIdentity.alternateName], url: site.url + productIdentity.path, mainEntityOfPage: { '@id': site.url + productIdentity.path + '#page' }, applicationCategory: 'BusinessApplication', applicationSubCategory: productIdentity.category, operatingSystem: 'Windows, Web', description: productIdentity.definition, featureList: [...capabilities, ...productFeatures].map(item => item.label), provider: { '@id': site.url + '/#organization' }, publisher: { '@id': site.url + '/#organization' } },
  ]
  if (article) graph.push({ '@type': 'Article', '@id': url + '#article', headline: article.translation.title, description, url, inLanguage: 'zh-Hant', mainEntityOfPage: { '@id': url + '#page' }, publisher: { '@id': site.url + '/#organization' }, keywords: article.tags })
  if (path === '/') graph.push({ '@type': 'FAQPage', mainEntity: faqItems.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) })
  if (path !== '/' && known) graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: '首頁', item: site.url + '/' }, { '@type': 'ListItem', position: 2, name: title.split('｜')[0], item: url }] })
  return { title, description, url, known, robots, markdownUrl, ogType, jsonLd: { '@context': 'https://schema.org', '@graph': graph } }
}

export function updatePageMetadata(path: string) {
  const metadata = getPageMetadata(path)
  document.title = metadata.title
  const values: Record<string, string> = { description: metadata.description, robots: metadata.robots, 'og:title': metadata.title, 'og:description': metadata.description, 'og:url': metadata.url, 'og:type': metadata.ogType, 'og:site_name': site.name, 'og:locale': 'zh_TW', 'twitter:card': 'summary', 'twitter:title': metadata.title, 'twitter:description': metadata.description }
  Object.entries(values).forEach(([name, content]) => {
    const attribute = name.startsWith('og:') ? 'property' : 'name'
    let element = document.head.querySelector<HTMLMetaElement>('meta[' + attribute + '="' + name + '"]')
    if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, name); document.head.appendChild(element) }
    element.content = content
  })
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
  canonical.href = metadata.url
  let markdownLink = document.head.querySelector<HTMLLinkElement>('link[rel="alternate"][type="text/markdown"]')
  if (metadata.markdownUrl) {
    if (!markdownLink) { markdownLink = document.createElement('link'); markdownLink.rel = 'alternate'; markdownLink.type = 'text/markdown'; document.head.appendChild(markdownLink) }
    markdownLink.href = metadata.markdownUrl
  } else {
    markdownLink?.remove()
  }
  let structuredData = document.getElementById('site-structured-data')
  if (!structuredData) { structuredData = document.createElement('script'); structuredData.id = 'site-structured-data'; structuredData.setAttribute('type', 'application/ld+json'); document.head.appendChild(structuredData) }
  structuredData.textContent = JSON.stringify(metadata.jsonLd)
}
