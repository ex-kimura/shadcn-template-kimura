<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const props = withDefaults(defineProps<{
  defaultLeftWidth?: number
  minLeftWidth?: number
  maxLeftWidth?: number
}>(), {
  defaultLeftWidth: 240,
  minLeftWidth: 0,
  maxLeftWidth: 600,
})

const isMdUp = useMediaQuery('(min-width: 768px)')
const leftOpen = ref(false)
const leftWidth = ref(props.defaultLeftWidth)

function clampWidth(width: number) {
  return Math.min(props.maxLeftWidth, Math.max(props.minLeftWidth, width))
}

function toggleLeftPanel() {
  leftOpen.value = !leftOpen.value
}

function closeSearch() {
  leftOpen.value = false
}

function startResize(event: MouseEvent) {
  const startX = event.clientX
  const startWidth = leftWidth.value

  const onMove = (moveEvent: MouseEvent) => {
    const delta = moveEvent.clientX - startX
    leftWidth.value = clampWidth(startWidth + delta)
  }

  const onUp = () => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}
</script>

<template>
  <div
    v-if="isMdUp"
    class="flex h-full min-h-0 overflow-hidden"
  >
    <div
      class="h-full min-h-0 shrink-0 overflow-hidden border-r bg-background"
      :style="{ width: `${leftWidth}px` }"
    >
      <div class="h-full overflow-y-auto">
        <slot
          :close-search="closeSearch"
          name="left"
        />
      </div>
    </div>

    <div
      class="h-full w-3 shrink-0 cursor-col-resize border-r bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/15 flex items-center justify-center"
      @mousedown="startResize"
    >
      <div class="flex flex-col gap-0.5">
        <div
          v-for="n in 4"
          :key="n"
          class="h-1 w-1 rounded-full bg-muted-foreground/50"
        />
      </div>
    </div>

    <div class="min-h-0 min-w-0 flex-1 bg-background">
      <CoreSearchLayoutContentFrame body-class="overflow-hidden">
        <slot
          name="right"
          :toggle-left-panel="toggleLeftPanel"
        />

        <template #footer>
          <slot name="footer" />
        </template>
      </CoreSearchLayoutContentFrame>
    </div>
  </div>

  <div
    v-else
    class="flex h-full min-h-0 flex-col overflow-hidden"
  >
    <div class="flex-1 min-h-0 overflow-y-auto bg-background">
      <slot
        name="right"
        :toggle-left-panel="toggleLeftPanel"
      />
    </div>

    <Sheet v-model:open="leftOpen">
      <SheetContent
        side="bottom"
        class="max-h-[85dvh]"
      >
        <SheetHeader class="h-12 border-b">
          <CoreSectionSearchTitle
            title="検索条件"
            icon="lucide:search"
          />
        </SheetHeader>

        <div class="overflow-auto px-4 pb-4">
          <slot
            :close-search="closeSearch"
            name="left"
          />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
