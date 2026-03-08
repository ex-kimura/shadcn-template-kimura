<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import type { SearchLayoutMode } from '@/components/core/SearchLayoutShell.vue'

const props = defineProps<{
  mode: SearchLayoutMode
  toggleLeftPanel?: () => void
  openFilter?: () => void
}>()

const isMdUp = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <UserSearchResultList
    v-if="props.mode === 'split' && isMdUp"
    class="px-2"
    @show-left-panel="props.toggleLeftPanel?.()"
  />

  <UserSearchResultList
    v-else-if="props.mode === 'stack' && isMdUp"
    class="px-2"
  />

  <UserSearchResultCard
    v-else
    :on-open-filter="() => (props.mode === 'split' ? props.toggleLeftPanel?.() : props.openFilter?.())"
  />
</template>
