<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserListStore } from '@/stores/userList'

const props = defineProps<{
  onOpenFilter?: () => void
}>()

const store = useUserListStore()
const router = useRouter()
const { items, total, page, pageSize, totalPages, canPrev, canNext } = storeToRefs(store)

const btnDetail = (id: string) => {
  router.push(`/users/${id}/detail`)
}

const btnEdit = (id: string) => {
  router.push(`/users/${id}/edit`)
}

const start = computed(() => {
  if (total.value === 0) return 0
  return (page.value - 1) * pageSize.value + 1
})

const end = computed(() => {
  if (total.value === 0) return 0
  return Math.min(page.value * pageSize.value, total.value)
})

const subtitle = computed(() => `${start.value}〜${end.value} 件表示 / 全 ${total.value} 件`)
const pageLabel = computed(() => `${page.value} / ${totalPages.value}`)
const goPrev = () => store.goPrev()
const goNext = () => store.goNext()
</script>

<template>
  <div class="px-2">
    <CoreSectionResultTitle
      title="検索結果"
      icon="lucide:table"
    >
      <template #subtitle>
        <span class="text-xs text-muted-foreground">
          {{ subtitle }}
        </span>
      </template>
    </CoreSectionResultTitle>

    <div class="pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
      <div
        v-for="item in items"
        :key="item.id"
        class="mb-3"
      >
        <div class="flex flex-col gap-1.5 rounded-lg border border-border bg-accent p-2 text-sm">
          <div>ID: {{ item.id }}</div>
          <div>ユーザ名: {{ item.userName }}</div>
          <div>部署: {{ item.deptName }}</div>
          <div>権限: {{ item.roleName }}</div>
          <div>
            ステータス:
            <Badge
              :variant="item.isEnabled ? 'success' : 'default'"
              class="rounded-sm px-2 py-0.5"
            >
              {{ item.isEnabled ? '有効' : '無効' }}
            </Badge>
          </div>
          <div class="mt-2 flex items-center justify-start gap-3 border-t border-border/50 pt-2">
            <Button
              size="sm"
              variant="outline"
              @click="btnDetail(item.id)"
            >
              詳細
            </Button>
            <Button
              size="sm"
              variant="outline"
              @click="btnEdit(item.id)"
            >
              編集
            </Button>
          </div>
        </div>
      </div>

      <div class="fixed inset-x-0 bottom-0 z-50 border-t bg-background">
        <div class="mx-auto flex h-14 max-w-screen-xl items-center justify-end gap-2 px-4 pb-[env(safe-area-inset-bottom)]">
          <Button
            variant="default"
            size="sm"
            @click="props.onOpenFilter?.()"
          >
            検索条件
          </Button>
          <Button
            class="ml-auto"
            variant="outline"
            :disabled="!canPrev"
            @click="goPrev"
          >
            前へ
          </Button>
          <span class="px-1 text-xs tabular-nums">{{ pageLabel }}</span>
          <Button
            variant="outline"
            :disabled="!canNext"
            @click="goNext"
          >
            次へ
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
