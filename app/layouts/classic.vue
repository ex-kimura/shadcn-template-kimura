<!-- app/layouts/default.vue -->
<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isMdUp = useMediaQuery('(min-width: 768px)')

const isSidebarOpen = useState<boolean>('ui:sidebarOpen', () => true) // PC用
const mobileMenuOpen = useState<boolean>('ui:mobileMenuOpen', () => false) // スマホ用

function handleToggleSidebar() {
  if (isMdUp.value) {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  else {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }
}
</script>

<template>
  <div class="theme-container flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
    <CoreHeader @toggle-sidebar="handleToggleSidebar" />

    <div class="flex flex-1 overflow-hidden">
      <!-- PCのみ左常駐 -->
      <CoreSidebar
        class="hidden md:block"
        :open="isSidebarOpen"
      />

      <!-- スマホのみ：下からSheet -->
      <div class="md:hidden">
        <CoreSidebarMobile v-model:open="mobileMenuOpen" />
      </div>

      <main class="flex flex-1 flex-col overflow-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>
