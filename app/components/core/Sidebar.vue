<!-- app/components/core/CoreSidebar.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ open: boolean }>()

const asideClass = computed(() => [
  'transition-all duration-300 ease-in-out overflow-hidden shrink-0',
  props.open ? 'w-64' : 'w-0',
])
</script>

<template>
  <aside
    :class="asideClass"
    class="text-xs"
  >
    <div class="flex h-full w-64 flex-col border-r border-sidebar-border">
      <CoreSidebarContent />
    </div>
  </aside>
</template>
