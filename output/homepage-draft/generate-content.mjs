import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import ts from 'typescript'

const draftDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(draftDirectory, '../..')
const source = await readFile(resolve(projectRoot, 'src/content/homeContent.ts'), 'utf8')
const solutions = await readFile(resolve(projectRoot, 'src/assets/context/solutions.md'), 'utf8')
const importStatement = "import solutionsMarkdown from '../assets/context/solutions.md?raw'"
if (!source.includes(importStatement)) throw new Error('現行方案匯入位置已變更，請重新確認草案內容來源。')
const executableSource = source.replace(importStatement, 'const solutionsMarkdown = ' + JSON.stringify(solutions))
const javascript = ts.transpileModule(executableSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { faqItems, solutionPlans } = await import('data:text/javascript;base64,' + Buffer.from(javascript).toString('base64'))

/** 將現行內容轉為 HTML 安全文字，避免來源中的符號破壞草案結構。 */
function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

const faqHtml = faqItems.map(item => '<details><summary>' + escapeHtml(item.question) + '<span aria-hidden="true">+</span></summary><p>' + escapeHtml(item.answer) + '</p></details>').join('\n')
const plansHtml = solutionPlans.map(plan => '<a class="plan-link" href="https://www.digitrans.com.tw/contact/" aria-label="洽詢' + escapeHtml(plan.name) + '">' + escapeHtml(plan.name) + '</a>').join('')
const target = resolve(draftDirectory, 'index.html')
const html = await readFile(target, 'utf8')
const replaceContent = (text, marker, className, content) => {
  if (text.includes(marker)) return text.replace(marker, content)
  const pattern = new RegExp('(<div class="' + className + '">)[\\s\\S]*?(</div>)')
  if (!pattern.test(text)) throw new Error('草案內容區塊找不到：' + className)
  return text.replace(pattern, (_match, opening, closing) => opening + content + closing)
}
const withFaq = replaceContent(html, '<!--existing-faq-->', 'faq-list', faqHtml)
const completeHtml = replaceContent(withFaq, '<!--existing-plans-->', 'plan-links', plansHtml)
await writeFile(target, completeHtml.replace(/\r?\n/g, '\r\n'), 'utf8')
console.log('已同步 ' + faqItems.length + ' 則 FAQ 與 ' + solutionPlans.length + ' 種現行導入方案。')
