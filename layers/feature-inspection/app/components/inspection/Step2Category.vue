<script setup lang="ts">
import type { InspectionCategory } from '@/types/inspection'

defineProps<{
  categories: InspectionCategory[]
}>()

const selectedId = defineModel<string>('selectedId', { default: '' })
</script>

<template>
  <div class="themed-form-surface rounded-md border border-border p-4">
    <Label for="inspection-category">カテゴリ選択</Label>
    <NativeSelect
      id="inspection-category"
      v-model="selectedId"
      class="mt-2 min-w-56"
    >
      <NativeSelectOption value="">
        選択してください
      </NativeSelectOption>
      <NativeSelectOption
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </NativeSelectOption>
    </NativeSelect>
  </div>
</template>
