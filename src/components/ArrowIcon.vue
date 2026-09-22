<script setup lang="ts">
import darkArrowImage from '../assets/images/icon/Live_1230.png'
import lightArrowImage from '../assets/images/icon/Live_1230_1.png'

withDefaults(defineProps<{ direction?: 'up-right' | 'down' | 'left'; tone?: 'dark' | 'light' }>(), { direction: 'up-right', tone: 'dark' })
</script>

<template>
  <span class="arrow-icon" :class="'arrow-icon--' + direction" :style="{ '--arrow-image': 'url(' + (tone === 'light' ? lightArrowImage : darkArrowImage) + ')' }" aria-hidden="true"></span>
</template>

<style scoped>
.arrow-icon { display: inline-block; flex: 0 0 22px; width: 22px; height: 22px; vertical-align: middle; background-color: currentColor; -webkit-mask: var(--arrow-image) center / 200% 200% no-repeat; mask: var(--arrow-image) center / 200% 200% no-repeat; }
.arrow-icon--down { rotate: 135deg; }
.arrow-icon--left { rotate: 225deg; }
</style>
