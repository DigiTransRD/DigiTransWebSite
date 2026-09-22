<script setup lang="ts">
import ArrowIcon from './components/ArrowIcon.vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
<template>
  <div class="layout">
    <AppHeader />
    <main id="main-content" tabindex="-1"><RouterView /></main>
    <AppFooter />
    <nav class="floating-actions" aria-label="導入與評估">
      <RouterLink to="/#solutions" class="button floating-solutions">導入方案 <ArrowIcon direction="down" tone="light" /></RouterLink>
      <RouterLink to="/contact/" class="button floating-consultation">預約評估 <ArrowIcon /></RouterLink>
    </nav>
  </div>
</template>
