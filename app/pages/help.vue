<script setup lang="ts">
import 'github-markdown-css/github-markdown.css'

usePageTitle('ヘルプ')
const { data: page } = await useAsyncData('help-page', () => {
  return queryCollection('content')
    .path('/help')
    .first()
})
</script>

<template>
  <div class="p-4">
    <article class="markdown-body markdown-body-app">
      <ContentRenderer
        v-if="page"
        :value="page"
      />
      <div v-else>
        ヘルプが見つかりません。
      </div>
    </article>
  </div>
</template>

<style>
.markdown-body-app {
  background-color: transparent !important;
  color: inherit !important;
}
.markdown-body-app pre {
  background-color: color-mix(in srgb, currentColor 8%, transparent) !important;
}
.markdown-body-app table tr {
  background-color: transparent !important;
}
.markdown-body-app table tr:nth-child(2n) {
  background-color: color-mix(in srgb, currentColor 4%, transparent) !important;
}
</style>
