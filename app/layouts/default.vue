<!-- app/layouts/default.vue -->
<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isMdUp = useMediaQuery('(min-width: 768px)')

const isSidebarOpen = useState<boolean>('ui:sidebarOpen', () => true)
const mobileMenuOpen = useState<boolean>('ui:mobileMenuOpen', () => false)

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
  <div class="theme-container flex h-dvh w-full overflow-hidden bg-background text-foreground">
    <CoreSidebar
      class="hidden md:block"
      :open="isSidebarOpen"
    />

    <div class="md:hidden">
      <CoreSidebarMobile v-model:open="mobileMenuOpen" />
    </div>

    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <CoreHeader @toggle-sidebar="handleToggleSidebar" />

      <main class="flex min-h-0 flex-1 flex-col overflow-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>
