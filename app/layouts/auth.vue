<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div class="theme-container">
    <slot />
    <Toaster position="bottom-center" />
  </div>
</template>
