<script setup lang="ts">
import ArrowIcon from '../components/ArrowIcon.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleBySlug } from '../content/articles'
const route = useRoute()
const article = computed(() => getArticleBySlug(String(route.params.slug || '')))
const body = computed(() => article.value?.translation.body.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/, '') ?? '')
</script>
<template><section class="container article-page"><div v-if="article" class="article-reading"><RouterLink class="text-link" :to="'/articles/' + article.category + '/'"><ArrowIcon direction="left" /> 返回{{ article.category === 'skills' ? '產業技能' : '趨勢觀點' }}</RouterLink><h1>{{ article.translation.title }}</h1><p class="section-description">{{ article.translation.excerpt }}</p><div class="body" v-html="body"></div><div class="editor-note"><p>本文為產業觀點與應用參考。ABI 現行能力與導入條件，請參閱商業應用、技術架構及導入服務說明。</p><RouterLink to="/deployment/" class="text-link">了解導入方式 <ArrowIcon /></RouterLink></div></div><div v-else class="not-found"><h1>找不到這篇文章。</h1><RouterLink to="/articles/trends/" class="button">返回文章列表</RouterLink></div></section></template>
