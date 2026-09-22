<script setup lang="ts">
import ArrowIcon from './ArrowIcon.vue'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { submitSalesContact, SalesContactSubmitError } from '../api/abisales'
defineProps<{ standalone?: boolean }>()
const { locale } = useI18n()
const form = reactive({ company: '', name: '', title: '', phone: '', email: '', message: '' })
const submitting = ref(false)
const success = ref(false)
const error = ref('')
const consent = ref(false)
const interactive = ref(false)
onMounted(() => { interactive.value = true })
async function submit() {
  if (submitting.value || !consent.value) return
  submitting.value = true
  success.value = false
  error.value = ''
  try {
    await submitSalesContact({ ...form, lang: locale.value })
    success.value = true
    Object.assign(form, { company: '', name: '', title: '', phone: '', email: '', message: '' })
    consent.value = false
  } catch (reason) {
    error.value = reason instanceof SalesContactSubmitError ? reason.message : '洽詢送出失敗，請稍後再試。'
  } finally {
    submitting.value = false
  }
}
</script>
<template>
  <section id="contact" class="contact-section section-pad" :class="{ 'contact-standalone': standalone }">
    <div class="container contact-grid">
      <div class="contact-intro">
        <p class="eyebrow">LET’S BUILD YOUR NEXT ADVANTAGE.</p>
        <component :is="standalone ? 'h1' : 'h2'">從一個真實需求，<br />啟動你的 AI 轉型。</component>
        <p class="section-description">告訴我們目前的系統與想改善的流程，<br class="desktop-break" />一起找出最值得開始的應用。</p>
        <div class="contact-expectations"><p><span>01</span> 釐清場景與預期成果</p><p><span>02</span> 評估資料、介面與導入範圍</p><p><span>03</span> 規劃工程協作與驗收方式</p></div>
        <a class="text-link" href="mailto:digitrans.tw@gmail.com">digitrans.tw@gmail.com <ArrowIcon /></a>
      </div>
      <form class="contact-form" :aria-busy="submitting" @submit.prevent="submit">
        <div class="form-heading"><h2>預約導入評估</h2><span>＊必填</span></div>
        <noscript><p class="data-notice">請啟用 JavaScript 後送出洽詢，或使用左側電子郵件聯絡我們。</p></noscript>
        <fieldset :disabled="submitting || !interactive" class="form-fields">
        <div class="form-grid">
          <label>公司名稱 ＊<input v-model="form.company" name="company" autocomplete="organization" required maxlength="100" placeholder="你的公司或事業體" /></label>
          <label>聯絡人 ＊<input v-model="form.name" name="name" autocomplete="name" required maxlength="50" placeholder="如何稱呼你" /></label>
          <label>職稱<input v-model="form.title" name="title" autocomplete="organization-title" maxlength="50" placeholder="例如：營運主管、資訊主管" /></label>
          <label>聯絡電話 ＊<input v-model="form.phone" name="phone" type="tel" autocomplete="tel" required maxlength="50" placeholder="方便聯繫的電話" /></label>
          <label class="span-two">電子郵件 ＊<input v-model="form.email" name="email" type="email" autocomplete="email" required maxlength="100" placeholder="you@company.com" /></label>
          <label class="span-two">想解決的工作問題 ＊<textarea v-model="form.message" name="message" rows="4" required maxlength="4000" placeholder="目前使用哪些系統？哪個流程最需要改善？"></textarea></label>
        </div>
        <p id="data-notice" class="data-notice">以上聯絡資訊與需求將傳送至資傳數位的洽詢服務，用於回覆本次需求及導入討論。請勿填入密碼、客戶名單或其他機密資料。資料相關問題可寄信至上方聯絡信箱。</p>
        <label class="consent"><input v-model="consent" type="checkbox" required /> <span>我已閱讀洽詢資料說明，並同意提供資訊以便聯繫。</span></label>
        <button class="button submit-button" type="submit" :disabled="submitting">{{ submitting ? '正在送出…' : '送出導入需求' }} <ArrowIcon tone="light" /></button>
        </fieldset>
        <p v-if="success" class="form-success" role="status">需求已成功送出，我們將依提供的聯絡方式與你討論。</p>
        <p v-if="error" class="form-error" role="alert">尚未送出：{{ error }} 你填寫的內容已保留。</p>
      </form>
    </div>
  </section>
</template>
