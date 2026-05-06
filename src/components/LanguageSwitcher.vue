<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const locales = [
  { code: 'zh-TW', label: '繁體' },
  { code: 'zh-CN', label: '简体' },
  { code: 'en-US', label: 'EN' }
]

const change = (code: string) => {
  locale.value = code
}
</script>

<template>
  <div class="lang-switch">
    <button
      v-for="item in locales"
      :key="item.code"
      :class="['lang-btn', { active: locale === item.code }]"
      @click="change(item.code)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.lang-switch {
  display: flex;
  gap: 8px;
}
.lang-btn {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #1e293b;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.lang-btn.active {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}
.lang-btn:hover {
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}
</style>
