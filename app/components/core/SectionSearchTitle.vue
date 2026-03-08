<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="flex h-10 items-center justify-between">
    <div class="flex items-center gap-2">
      <slot name="left" />
      <Icon
        v-if="icon"
        :name="icon"
        class="h-5 w-5 text-muted-foreground ml-1"
      />
      <div class="text-sm font-medium pl-2">
        {{ title }}
      </div>
      <div>
        <slot name="subtitle" />
      </div>
    </div>
    <div class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
