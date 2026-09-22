import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { render, staticPaths, getPageMetadata, site, detailPages, productIdentity } from '../dist-ssr/entry-server.js'

const outputRoot = resolve('dist')
const template = await readFile(resolve(outputRoot, 'index.html'), 'utf8')
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
for (const path of [...staticPaths, '/404.html']) {
  const metadata = getPageMetadata(path)
  const metaTags = [
    '<meta name="description" content="' + escapeHtml(metadata.description) + '" />',
    '<meta name="robots" content="' + metadata.robots + '" />',
    '<link rel="canonical" href="' + escapeHtml(metadata.url) + '" />',
    ...(metadata.markdownUrl ? ['<link rel="alternate" type="text/markdown" href="' + escapeHtml(metadata.markdownUrl) + '" />'] : []),
    ...Object.entries({ 'og:title': metadata.title, 'og:description': metadata.description, 'og:url': metadata.url, 'og:type': metadata.ogType, 'og:site_name': site.name, 'og:locale': 'zh_TW' }).map(([name, value]) => '<meta property="' + name + '" content="' + escapeHtml(value) + '" />'),
    '<meta name="twitter:card" content="summary" />',
    '<meta name="twitter:title" content="' + escapeHtml(metadata.title) + '" />',
    '<meta name="twitter:description" content="' + escapeHtml(metadata.description) + '" />',
    '<script id="site-structured-data" type="application/ld+json">' + JSON.stringify(metadata.jsonLd).replaceAll('<', '\\u003c') + '</script>',
  ].join('\n')
  const html = template.replace(/<title>[\s\S]*?<\/title>/, '<title>' + escapeHtml(metadata.title) + '</title>').replace('<!--page-metadata-->', metaTags).replace('<!--app-html-->', await render(path))
  const target = path === '/404.html' ? resolve(outputRoot, '404.html') : resolve(outputRoot, '.' + path, 'index.html')
  if (!target.startsWith(outputRoot + '/') && !target.startsWith(outputRoot + '\\')) throw new Error('Invalid output path')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, html, 'utf8')
}
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + staticPaths.map(path => '  <url><loc>' + escapeHtml(site.url + path) + '</loc></url>').join('\n') + '\n</urlset>\n'
await writeFile(resolve(outputRoot, 'sitemap.xml'), sitemap, 'utf8')
const searchCrawlers = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot', '*']
await writeFile(resolve(outputRoot, 'robots.txt'), searchCrawlers.map(agent => 'User-agent: ' + agent + '\nAllow: /\n').join('\n') + '\nSitemap: ' + site.url + '/sitemap.xml\n', 'utf8')

const markdownText = value => value.replace(/([\\`*_{}\[\]<>|])/g, '\\$1')
const detailLink = path => {
  const page = detailPages.find(item => item.path === path)
  if (!page) throw new Error('Unknown detail link: ' + path)
  return '[' + markdownText(page.title) + '](' + site.url + page.path + ')'
}
for (const page of detailPages) {
  const markdown = [
    '# ' + markdownText(page.title),
    '> ' + markdownText(page.lead),
    '[網頁原文](' + site.url + page.path + ')',
    markdownText(page.description),
    page.facts.map(fact => '- ' + markdownText(fact.label) + '：' + markdownText(fact.value)).join('\n'),
    ...page.sections.map(section => '## ' + markdownText(section.title) + '\n\n' + markdownText(section.body) + (section.points ? '\n\n' + section.points.map(point => '- ' + markdownText(point)).join('\n') : '')),
    ...(page.table ? [
      '## ' + markdownText(page.table.title),
      '| ' + page.table.headers.map(markdownText).join(' | ') + ' |\n| ' + page.table.headers.map(() => '---').join(' | ') + ' |\n' + page.table.rows.map(row => '| ' + row.map(markdownText).join(' | ') + ' |').join('\n'),
    ] : []),
    '本文由資傳數位整理。產品持續優化，實際導入以確認的資料、權限、版本及驗收範圍為準。',
    '## 延伸閱讀\n\n' + page.related.map(path => '- ' + detailLink(path)).join('\n'),
    '[預約導入評估](' + site.url + '/contact/)',
  ].join('\n\n') + '\n'
  await writeFile(resolve(outputRoot, '.' + page.path, 'index.md'), markdown, 'utf8')
}
const llmsIndex = [
  '# ' + site.name,
  '> ' + productIdentity.definition,
  '本網站由' + site.company + '（Digital Transformation Consulting Ltd.）提供。以下為產品、整合、技術治理與導入說明；Markdown 版本與對應網頁使用相同內容來源。',
  '## 產品與企業導入',
  ...detailPages.map(page => '- [' + markdownText(page.title) + '](' + site.url + page.path + 'index.md): ' + page.description),
  '## 網站入口',
  '- [首頁](' + site.url + '/): 產品價值、三步驟啟用、三種導入方案與常見問題。',
  '- [預約導入評估](' + site.url + '/contact/): 與資傳數位討論既有系統、資料與業務需求。',
  '- [產業技能文章](' + site.url + '/articles/skills/): 業態知識與工作場景。',
  '- [趨勢與觀點](' + site.url + '/articles/trends/): 企業 AI 應用與轉型觀點。',
].join('\n\n') + '\n'
await writeFile(resolve(outputRoot, 'llms.txt'), llmsIndex, 'utf8')
console.log('Pre-rendered ' + (staticPaths.length + 1) + ' pages, ' + detailPages.length + ' Markdown documents, sitemap.xml, robots.txt and llms.txt.')
