<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="p-4">
    <div class="themed-form-surface rounded-md border border-border p-4">
      <h1 class="text-base font-semibold">
        {{ title }}
      </h1>
      <p class="mt-2 text-sm text-muted-foreground">
        {{ description ?? 'This page is a scaffold for future implementation.' }}
      </p>
    </div>
  </div>
</template>
