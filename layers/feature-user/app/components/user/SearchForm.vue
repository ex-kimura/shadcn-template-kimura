<script setup lang="ts">
import { useUserListStore } from '@/stores/userList'

withDefaults(defineProps<{
  showTitle?: boolean
}>(), {
  showTitle: true,
})

const store = useUserListStore()
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
          <Label>ユーザ名</Label>
          <Input v-model="query.userName" placeholder="" />
        </div>

        <div class="flex flex-col gap-y-2">
          <Label>メールアドレス</Label>
          <Input v-model="query.email" placeholder="" />
        </div>

        <div class="flex flex-col gap-y-2">
          <Label>部署</Label>
          <NativeSelect class="min-w-40">
            <NativeSelectOption value="1">本社</NativeSelectOption>
            <NativeSelectOption value="2">大阪営業所</NativeSelectOption>
          </NativeSelect>
        </div>

        <div class="flex flex-col gap-y-2">
          <Label>権限</Label>
          <NativeSelect class="min-w-40">
            <NativeSelectOption value="1">管理者</NativeSelectOption>
            <NativeSelectOption value="2">一般</NativeSelectOption>
          </NativeSelect>
        </div>

        <div class="flex flex-col gap-y-2">
          <Label>ステータス</Label>
          <RadioGroup default-value="comfortable">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r1" value="default" />
              <Label for="r1">すべて</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r2" value="comfortable" />
              <Label for="r2">有効</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r3" value="compact" />
              <Label for="r3">無効</Label>
            </div>
          </RadioGroup>
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
