<script setup lang="ts">
import { computed, watch } from 'vue'
import { Copy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
import { useInfoDetailStore } from '@/stores/infoDetail'

const props = defineProps<{ id?: string | number }>()

// const { ymdHm } = useDateFormatJa()
const route = useRoute()
const store = useInfoDetailStore()

const resolvedId = computed(() => props.id ?? (route.params.id ? String(route.params.id) : undefined))

watch(
  resolvedId,
  async (id) => {
    if (!id) return
    await store.fetch(String(id))
  },
  { immediate: true },
)

async function copyText(text?: string | number | null) {
  if (text == null) return
  try {
    await navigator.clipboard.writeText(String(text))
  }
  catch {
    console.log('error')
  }
}
</script>

<template>
  <div class="p-0 min-w-0 text-xs">
    <div class="grid grid-cols-1 gap-3 min-w-0">
      <!-- ID -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="flex items-start justify-between gap-2 min-w-0">
          <div class="min-w-0">
            <div class="text-xs text-muted-foreground">
              ID
            </div>
            <div class="mt-1 text-sm font-medium tabular-nums wrap-break-word">
              {{ store.form.id }}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 shrink-0"
            @click="copyText(store.form.id)"
          >
            <Copy class="h-4 w-4" />
            <span class="sr-only">copy id</span>
          </Button>
        </div>
      </section>

      <!-- タイトル -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="text-xs text-muted-foreground">
          タイトル
        </div>
        <div class="mt-1 text-sm font-medium break-words">
          {{ store.form.title }}
        </div>
      </section>

      <!-- 本文 -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="text-xs text-muted-foreground">
          本文
        </div>
        <div class="mt-1 text-sm font-medium break-words">
          {{ store.form.body }}
        </div>
      </section>
    </div>
  </div>
</template>
