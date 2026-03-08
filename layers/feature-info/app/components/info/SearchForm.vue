<script setup lang="ts">
import { useInfoListStore } from '@/stores/infoList'

const _props = withDefaults(defineProps<{
  showTitle?: boolean
}>(), {
  showTitle: true,
})

const store = useInfoListStore()
const { query, loading } = storeToRefs(store)
const emit = defineEmits<{
  (e: 'searched'): void
}>()

const btnSearch = async () => {
  store.setQuery({ page: 1 })
  await store.search()
  emit('searched')
}

const btnClear = () => {
  store.resetAll()
}

onMounted(async () => {
  if (store.hasSearched) return
  await store.search()
  emit('searched')
})
</script>

<template>
  <div class="min-w-46">
    <div
      v-if="showTitle"
      class="hidden md:block"
    >
      <CoreSectionSearchTitle
        title="検索条件"
        icon="lucide:search"
      />
    </div>

    <div class="themed-form-surface mb-3 rounded-md border border-border bg-accent p-4">
      <div class="flex flex-col gap-y-4">
        <div class="flex flex-col gap-y-2">
          <Label>タイトル</Label>
          <Input
            v-model="query.title"
            placeholder=""
          />
        </div>

        <div class="flex flex-col gap-y-2">
          <Label>カテゴリ</Label>
          <NativeSelect class="min-w-40">
            <NativeSelectOption value="1">
              重要
            </NativeSelectOption>
            <NativeSelectOption value="2">
              お知らせ
            </NativeSelectOption>
          </NativeSelect>
        </div>

        <div class="flex flex-col gap-y-2">
          <Label>本文</Label>
          <Input
            v-model="query.body"
            placeholder=""
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <Button
        class="w-full"
        :disabled="loading"
        @click="btnSearch"
      >
        検索
      </Button>
      <Button
        class="w-full"
        variant="outline"
        @click="btnClear"
      >
        クリア
      </Button>
    </div>
  </div>
</template>
