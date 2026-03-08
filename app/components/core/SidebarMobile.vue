<!-- app/components/core/CoreSidebarMobileSheet.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const modelOpen = computed({
  get: () => props.open,
  set: v => emit('update:open', v),
})
</script>

<template>
  <Sheet v-model:open="modelOpen">
    <SheetContent
      side="bottom"
      class="p-0"
    >
      <div class="w-full max-h-[85svh] flex flex-col">
        <SheetHeader class="h-12 shrink-0 flex items-center border-b border-border px-4">
          <SheetTitle class="font-medium leading-none">
            Menu
          </SheetTitle>

          <!-- ★これを入れる（画面には出さない） -->
          <SheetDescription class="sr-only">
            メニューを表示します
          </SheetDescription>
        </SheetHeader>

        <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <CoreSidebarContent :on-navigate="() => (modelOpen = false)" />
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
