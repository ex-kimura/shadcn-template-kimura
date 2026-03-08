<script setup lang="ts">
import type { InspectionHistory } from '@/types/inspection'

const props = defineProps<{
  result: InspectionHistory
}>()

const { labelOf, classOf } = useInspectionResult()
</script>

<template>
  <div class="space-y-4">
    <div class="themed-form-surface rounded-md border border-border p-4">
      <div class="flex items-center gap-2">
        <Badge :class="classOf(props.result.result)">
          {{ labelOf(props.result.result) }}
        </Badge>
        <span class="text-sm text-muted-foreground">
          一致率: {{ (props.result.score * 100).toFixed(2) }}%
        </span>
      </div>
      <p class="mt-2 text-sm">
        対象テンプレート: {{ props.result.templateName }}
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="themed-form-surface rounded-md border border-border p-4">
        <p class="mb-2 text-sm font-medium">
          元画像
        </p>
        <img
          :src="props.result.sourceImageUrl"
          alt="source image"
          class="max-h-80 w-full rounded-md object-contain"
        >
      </div>
      <div class="themed-form-surface rounded-md border border-border p-4">
        <p class="mb-2 text-sm font-medium">
          テンプレート画像
        </p>
        <img
          :src="props.result.templateImageUrl"
          alt="template image"
          class="max-h-80 w-full rounded-md object-contain"
        >
      </div>
    </div>

    <div class="themed-form-surface rounded-md border border-border p-4">
      <p class="mb-2 text-sm font-medium">
        画像マッチング上位3件
      </p>
      <table class="min-w-full w-auto table-fixed text-sm">
        <thead class="sticky top-0 z-20 bg-accent shadow-[inset_0_-1px_0_0_var(--border)]">
          <tr>
            <th class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground">
              テンプレート名
            </th>
            <th class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground">
              一致率
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in props.result.top3"
            :key="row.templateId"
            class="border-b hover:bg-muted/40"
          >
            <td class="whitespace-nowrap px-4 py-2">
              {{ row.templateName }}
            </td>
            <td class="whitespace-nowrap px-4 py-2">
              {{ (row.score * 100).toFixed(2) }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
