<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { useMediaQuery } from '@vueuse/core'
import { CORE } from '@/constants/core'

const pageTitle = useState<string>('pageTitle', () => '')
const isMdUp = useMediaQuery('(min-width: 768px)') // PCの場合:true

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()
</script>

<template>
  <header class="z-50 flex h-12 w-full items-center border-b bg-background/95 px-2 backdrop-blur">
    <Button
      variant="ghost"
      size="icon"
      class="mr-2"
      @click="emit('toggle-sidebar')"
    >
      <Menu class="h-5 w-5" />
      <span class="sr-only">Toggle Sidebar</span>
    </Button>

    <div
      v-if="isMdUp"
      class="text-sm"
    >
      {{ pageTitle }}
    </div>

    <div
      v-if="!isMdUp"
      class="text-sm"
    >
      {{ CORE.name }}
    </div>

    <div class="ml-auto mr-2">
      <CoreDarkModeToggle />
    </div>
  </header>
  <header
    v-if="!isMdUp && pageTitle?.trim()"
    class="z-50 flex h-12 w-full items-center border-b bg-accent px-4 backdrop-blur text-sm"
  >
    {{ pageTitle }}
  </header>
</template>
