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
    <RouterLink to="/contact/" class="button floating-consultation">預約導入評估 <ArrowIcon /></RouterLink>
  </div>
</template>
