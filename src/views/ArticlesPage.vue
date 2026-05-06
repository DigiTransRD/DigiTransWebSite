<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getArticlesByCategory } from '../content/articles'

const route = useRoute()

const category = computed(() => String(route.params.category || '').toLowerCase())
const pageTitle = computed(() => {
  if (category.value === 'trends') return 'Trends'
  if (category.value === 'skills') return 'Skills'
  return 'Articles'
})
const items = computed(() => getArticlesByCategory(category.value))
</script>

<template>
  <div class="page">
    <h2>{{ pageTitle }}</h2>
    <p class="muted">Static article archive generated from local Markdown content.</p>
    <div v-if="!items.length" class="muted">No articles found in this category.</div>
    <div v-else class="list">
      <article v-for="item in items" :key="item.id" class="card">
        <div class="meta">
          <span class="tag">{{ item.categoryLabel }}</span>
          <span class="date">{{ item.publishedAt?.slice(0, 10) || '--' }}</span>
        </div>
        <h3>{{ item.translation.title }}</h3>
        <p class="excerpt">{{ item.translation.excerpt || '' }}</p>
        <RouterLink class="link" :to="`/article/${item.slug}`">
          Read article
        </RouterLink>
      </article>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;
}

.muted {
  color: #475569;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.07);
}

.meta {
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 14px;
}

.tag {
  background: #e0ecff;
  color: #1d4ed8;
  padding: 4px 8px;
  border-radius: 8px;
}

.date {
  color: #475569;
}

.excerpt {
  color: #475569;
  line-height: 1.5;
  flex: 1;
}

.link {
  text-decoration: none;
  color: #2563eb;
  font-weight: 700;
}
</style>
