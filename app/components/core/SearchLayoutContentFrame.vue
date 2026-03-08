<script setup lang="ts">
defineProps<{
  bodyClass?: string
}>()
</script>

<template>
  <div class="flex h-full min-h-0 flex-col overflow-hidden">
    <div
      class="flex-1 min-h-0 overflow-y-auto"
      :class="bodyClass"
    >
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="shrink-0 border-t bg-background"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
