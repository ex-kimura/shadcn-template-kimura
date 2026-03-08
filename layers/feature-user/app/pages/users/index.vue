<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserListStore } from '@/stores/userList'

definePageMeta({
  layout: 'default',
})

usePageTitle('ユーザ一覧')

const { mode } = useSearchLayoutMode()
const store = useUserListStore()
const { page, totalPages, canPrev, canNext } = storeToRefs(store)

const pageLabel = computed(() => `${page.value} / ${totalPages.value}`)
const goPrev = () => store.goPrev()
const goNext = () => store.goNext()
</script>

<template>
  <div class="flex h-full min-h-0 flex-col overflow-hidden">
    <div class="flex-1 min-h-0 overflow-hidden">
      <CoreSearchLayoutShell
        :mode="mode"
        :default-left-width="240"
        :min-left-width="0"
        :max-left-width="600"
      >
        <template #search="{ closeSearch }">
          <UserSearchForm
            class="px-2"
            :show-title="mode === 'split'"
            @searched="closeSearch?.()"
          />
        </template>

        <template #result="{ toggleLeftPanel, openFilter }">
          <UserSearchResultPane
            :mode="mode"
            :toggle-left-panel="toggleLeftPanel"
            :open-filter="openFilter"
          />
        </template>

        <template #footer>
          <div class="hidden items-center justify-end gap-2 p-2 md:flex">
            <Button
              variant="outline"
              size="sm"
              :disabled="!canPrev"
              @click="goPrev"
            >
              前へ
            </Button>

            <span class="px-1 text-xs tabular-nums">
              {{ pageLabel }}
            </span>

            <Button
              variant="outline"
              size="sm"
              :disabled="!canNext"
              @click="goNext"
            >
              次へ
            </Button>
          </div>
        </template>
      </CoreSearchLayoutShell>
    </div>
  </div>
</template>
