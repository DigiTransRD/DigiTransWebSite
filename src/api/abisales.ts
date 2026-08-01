/**
 * 業務洽詢表單送出 API。
 *
 * 端點：AbiAsstAPI 的 /api/abisales，收件後寫入 digitransdb 的 salescontact 資料表。
 *
 * 傳輸設計說明：
 * - 以 Content-Type: text/plain 送出且不帶自訂 header，屬 CORS「簡單請求」，
 *   瀏覽器不會發出 preflight OPTIONS，端點毋須依賴站台層級的 CORS 設定。
 * - 內容機密性由 HTTPS/TLS 提供；封包附帶時戳、單次隨機碼與 HMAC-SHA256 簽章，
 *   用於確保內容未遭竄改並阻擋重放與隨手濫用。
 */

/** 業務洽詢表單欄位。 */
export interface SalesContactPayload {
  company: string
  name: string
  title: string
  phone: string
  email: string
  message: string
  lang: string
}

/** 端點回應格式。 */
interface SalesContactApiResponse {
  success?: boolean
  message?: string
}

/** 送出失敗時拋出的錯誤，messageText 為可直接顯示給使用者的說明。 */
export class SalesContactSubmitError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SalesContactSubmitError'
  }
}

const apiUrl = (import.meta.env.VITE_ABISALES_API_URL as string | undefined) ?? ''
const signKey = (import.meta.env.VITE_ABISALES_SIGN_KEY as string | undefined) ?? ''

/**
 * 產生單次隨機碼，用於端點的重放偵測。
 */
const createNonce = (): string => {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * 將位元組陣列轉為 Base64 字串。
 */
const toBase64 = (buffer: ArrayBuffer): string => {
  let binary = ''
  new Uint8Array(buffer).forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

/**
 * 以共用金鑰計算 HMAC-SHA256 簽章。
 *
 * @param content 待簽章的字串。
 * @returns Base64 編碼的簽章。
 */
const signContent = async (content: string): Promise<string> => {
  const encoder = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(signKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(content))
  return toBase64(signature)
}

/**
 * 送出業務洽詢表單。
 *
 * @param payload 表單欄位內容。
 * @throws SalesContactSubmitError 當設定缺漏、網路失敗或端點回覆失敗時拋出。
 */
export const submitSalesContact = async (payload: SalesContactPayload): Promise<void> => {
  if (!apiUrl || !signKey) {
    throw new SalesContactSubmitError('表單服務尚未完成設定')
  }

  const ts = Date.now().toString()
  const nonce = createNonce()
  const data = JSON.stringify(payload)
  const sign = await signContent(`${ts}.${nonce}.${data}`)

  let response: Response
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({ ts, nonce, data, sign })
    })
  } catch {
    throw new SalesContactSubmitError('無法連線至表單服務')
  }

  let result: SalesContactApiResponse = {}
  try {
    result = (await response.json()) as SalesContactApiResponse
  } catch {
    // 端點在極端情況下可能回傳非 JSON 內容，此時以 HTTP 狀態碼判斷結果
    result = {}
  }

  if (!response.ok || result.success !== true) {
    throw new SalesContactSubmitError(result.message || '表單服務回應異常')
  }
}
