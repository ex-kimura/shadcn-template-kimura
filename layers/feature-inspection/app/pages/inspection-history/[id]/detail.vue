<script setup lang="ts">
import type { InspectionHistory } from '@/types/inspection'
import { mockInspectionRepository } from '@/repositories/mock-inspection.repository'

usePageTitle('検査履歴詳細')

const route = useRoute()
const loading = ref(false)
const row = ref<InspectionHistory | null>(null)

const { labelOf, classOf } = useInspectionResult()
const { ymdHm } = useDateFormatJa()

async function load() {
  loading.value = true
  try {
    row.value = await mockInspectionRepository.findHistoryById(String(route.params.id))
  }
  finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <div class="flex-1 min-h-0 overflow-y-auto p-4">
      <div
        v-if="row"
        class="mx-auto max-w-6xl space-y-4"
      >
        <div class="themed-form-surface rounded-md border border-border p-4">
          <div class="flex items-center gap-2">
            <Badge :class="classOf(row.result)">
              {{ labelOf(row.result) }}
            </Badge>
            <span class="text-sm text-muted-foreground">
              {{ ymdHm(row.createdAt) }}
            </span>
          </div>
          <p class="mt-2 text-sm">
            一致率: {{ (row.score * 100).toFixed(2) }}%
          </p>
          <p class="text-sm">
            対象テンプレート: {{ row.templateName }}
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="themed-form-surface rounded-md border border-border p-4">
            <p class="mb-2 text-sm font-medium">
              検査結果画像
            </p>
            <img
              :src="row.sourceImageUrl"
              alt="source image"
              class="max-h-96 w-full rounded-md object-contain"
            >
          </div>
          <div class="themed-form-surface rounded-md border border-border p-4">
            <p class="mb-2 text-sm font-medium">
              テンプレート画像
            </p>
            <img
              :src="row.templateImageUrl"
              alt="template image"
              class="max-h-96 w-full rounded-md object-contain"
            >
          </div>
        </div>

        <div class="themed-form-surface rounded-md border border-border p-4">
          <p class="mb-2 text-sm font-medium">
            同一カテゴリ Top 3
          </p>
          <ul class="space-y-1 text-sm">
            <li
              v-for="item in row.top3"
              :key="item.templateId"
            >
              {{ item.templateName }}: {{ (item.score * 100).toFixed(2) }}%
            </li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="shrink-0 border-t bg-muted/50 px-4 py-2">
      <Button
        variant="outline"
        @click="$router.push('/inspection-history')"
      >
        戻る
      </Button>
    </footer>
  </div>
</template>
