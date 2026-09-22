<script setup lang="ts">
import ArrowIcon from '../components/ArrowIcon.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getArticlesByCategory } from '../content/articles'
const route = useRoute()
const category = computed(() => String(route.params.category || '').toLowerCase())
const pageTitle = computed(() => category.value === 'trends' ? '趨勢與觀點' : category.value === 'skills' ? '產業技能文章' : '文章')
const items = computed(() => getArticlesByCategory(category.value))
</script>
<template><section class="container article-page"><RouterLink to="/" class="text-link"><ArrowIcon direction="left" /> 返回首頁</RouterLink><h1>{{ pageTitle }}</h1><p class="section-description">從產業知識與實際流程，思考企業 AI 的應用方向。</p><p v-if="!items.length">目前沒有這個分類的文章。</p><div v-else class="article-list"><article v-for="item in items" :key="item.id"><span class="eyebrow">{{ item.category === 'skills' ? '產業技能' : '趨勢觀點' }}</span><h2>{{ item.translation.title }}</h2><p>{{ item.translation.excerpt }}</p><RouterLink class="text-link" :to="'/article/' + item.slug + '/'">閱讀文章 <ArrowIcon /></RouterLink></article></div></section></template>
