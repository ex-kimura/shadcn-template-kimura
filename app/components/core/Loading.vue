<script setup lang="ts">
withDefaults(
  defineProps<{
    overlay?: boolean
    message?: string
  }>(),
  {
    overlay: true,
    message: 'Loading',
  },
)
</script>

<template>
  <div
    :class="overlay
      ? 'fixed inset-0 z-9999 bg-black/40 flex items-center justify-center'
      : 'flex items-center justify-center'"
    aria-busy="true"
    aria-live="polite"
  >
    <div class="flex flex-col items-center gap-3">
      <!-- CSSスピナー（依存なし） -->
      <div class="h-9 w-9 rounded-full border-4 border-white/30 border-t-white animate-spin" />
      <p class="text-sm text-white/90 select-none">
        {{ message }}
      </p>
    </div>
  </div>
</template>
