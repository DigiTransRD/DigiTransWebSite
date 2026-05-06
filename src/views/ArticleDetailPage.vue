<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getArticleBySlug } from '../content/articles'

const route = useRoute()
const article = computed(() => getArticleBySlug(String(route.params.slug || '')))
</script>

<template>
  <div class="page">
    <RouterLink class="back-link" to="/articles/trends">Back to articles</RouterLink>
    <div v-if="!article" class="muted">Article not found.</div>
    <div v-else class="card">
      <div class="meta">
        <span class="tag">{{ article.categoryLabel }}</span>
        <span class="date">{{ article.publishedAt?.slice(0, 10) || '--' }}</span>
      </div>
      <h1>{{ article.translation.title }}</h1>
      <p class="excerpt">{{ article.translation.excerpt }}</p>
      <div class="body" v-html="article.translation.body"></div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #2563eb;
  font-weight: 700;
  text-decoration: none;
}

.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
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
  margin-top: 8px;
  margin-bottom: 12px;
}

.body {
  color: #0f172a;
  line-height: 1.7;
}

.body :deep(p),
.body :deep(li) {
  line-height: 1.85;
}

.muted {
  color: #475569;
}
</style>
