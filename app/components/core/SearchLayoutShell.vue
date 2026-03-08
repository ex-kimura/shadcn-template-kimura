<script setup lang="ts">
export type SearchLayoutMode = 'split' | 'stack'

const props = withDefaults(defineProps<{
  mode?: SearchLayoutMode
  defaultLeftWidth?: number
  minLeftWidth?: number
  maxLeftWidth?: number
}>(), {
  mode: 'split',
  defaultLeftWidth: 240,
  minLeftWidth: 0,
  maxLeftWidth: 600,
})
</script>

<template>
  <CoreSearchLayoutSplit
    v-if="props.mode === 'split'"
    :default-left-width="props.defaultLeftWidth"
    :min-left-width="props.minLeftWidth"
    :max-left-width="props.maxLeftWidth"
  >
    <template #left="{ closeSearch }">
      <slot
        name="search"
        :close-search="closeSearch"
      />
    </template>

    <template #right="{ toggleLeftPanel }">
      <slot
        name="result"
        :toggle-left-panel="toggleLeftPanel"
        :open-filter="undefined"
      />
    </template>

    <template #footer>
      <slot name="footer" />
    </template>
  </CoreSearchLayoutSplit>

  <CoreSearchLayoutStack v-else>
    <template #search="{ closeSearch }">
      <slot
        name="search"
        :close-search="closeSearch"
      />
    </template>

    <template #result="{ openFilter }">
      <slot
        name="result"
        :toggle-left-panel="undefined"
        :open-filter="openFilter"
      />
    </template>

    <template #footer>
      <slot name="footer" />
    </template>
  </CoreSearchLayoutStack>
</template>
