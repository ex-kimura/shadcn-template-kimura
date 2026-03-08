<script setup lang="ts">
import type { InspectionHistory, InspectionResult } from '@/types/inspection'
import { mockInspectionRepository } from '@/repositories/mock-inspection.repository'

definePageMeta({
  layout: 'default',
})

usePageTitle('検査履歴一覧')

const { mode } = useSearchLayoutMode()
const { ymdHm } = useDateFormatJa()
const { labelOf, classOf } = useInspectionResult()

const loading = ref(false)
const allRows = ref<InspectionHistory[]>([])

const resultFilter = ref<'all' | InspectionResult>('all')
const dateFrom = ref('')
const dateTo = ref('')

const page = ref(1)
const pageSize = ref(20)

const filteredRows = computed(() => {
  let rows = allRows.value.slice()
  if (resultFilter.value !== 'all') rows = rows.filter(x => x.result === resultFilter.value)
  if (dateFrom.value) {
    const from = new Date(`${dateFrom.value}T00:00:00`)
    rows = rows.filter(x => x.createdAt >= from)
  }
  if (dateTo.value) {
    const to = new Date(`${dateTo.value}T23:59:59`)
    rows = rows.filter(x => x.createdAt <= to)
  }
  rows.sort((a, b) => +b.createdAt - +a.createdAt)
  return rows
})

const total = computed(() => filteredRows.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

watch([filteredRows, totalPages], () => {
  if (page.value > totalPages.value) page.value = totalPages.value
  if (page.value < 1) page.value = 1
})

const rows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

const canPrev = computed(() => page.value > 1 && !loading.value)
const canNext = computed(() => page.value < totalPages.value && !loading.value)
const pageLabel = computed(() => `${page.value} / ${totalPages.value}`)

const goPrev = () => {
  if (!canPrev.value) return
  page.value -= 1
}
const goNext = () => {
  if (!canNext.value) return
  page.value += 1
}
const applyFilter = () => {
  page.value = 1
}

const start = computed(() => (total.value === 0 ? 0 : (page.value - 1) * pageSize.value + 1))
const end = computed(() => (total.value === 0 ? 0 : Math.min(page.value * pageSize.value, total.value)))
const subtitle = computed(() => `${start.value}〜${end.value} 件表示 / 全 ${total.value} 件`)

async function load() {
  loading.value = true
  try {
    allRows.value = await mockInspectionRepository.searchHistory({})
  }
  finally {
    loading.value = false
  }
}

onMounted(load)
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
          <div class="px-2">
            <div class="hidden md:block">
              <CoreSectionSearchTitle
                title="検索条件"
                icon="lucide:search"
              />
            </div>
            <div class="themed-form-surface rounded-md border border-border p-4">
              <div class="grid gap-3">
                <div>
                  <Label>判定結果</Label>
                  <NativeSelect
                    v-model="resultFilter"
                    class="mt-1 w-full"
                  >
                    <NativeSelectOption value="all">
                      すべて
                    </NativeSelectOption>
                    <NativeSelectOption value="ok">
                      OK
                    </NativeSelectOption>
                    <NativeSelectOption value="review">
                      要確認
                    </NativeSelectOption>
                    <NativeSelectOption value="ng">
                      NG
                    </NativeSelectOption>
                  </NativeSelect>
                </div>
                <div>
                  <Label>日付From</Label>
                  <Input
                    v-model="dateFrom"
                    type="date"
                    class="mt-1"
                  />
                </div>
                <div>
                  <Label>日付To</Label>
                  <Input
                    v-model="dateTo"
                    type="date"
                    class="mt-1"
                  />
                </div>
                <Button
                  :disabled="loading"
                  @click="applyFilter(); closeSearch?.()"
                >
                  検索
                </Button>
              </div>
            </div>
          </div>
        </template>

        <template #result="{ toggleLeftPanel, openFilter }">
          <div class="h-full min-h-0">
            <div class="hidden h-full min-h-0 px-2 md:flex md:flex-col">
              <CoreSectionResultTitle
                title="検索結果一覧"
                icon="lucide:table"
              >
                <template #subtitle>
                  <span class="text-xs text-muted-foreground">{{ subtitle }}</span>
                </template>
              </CoreSectionResultTitle>

              <div class="min-h-0 flex-1 overflow-auto">
                <table class="min-w-full w-auto table-fixed text-sm">
                  <thead class="sticky top-0 z-20 bg-accent shadow-[inset_0_-1px_0_0_var(--border)]">
                    <tr>
                      <th class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground">
                        日時
                      </th>
                      <th class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground">
                        判定
                      </th>
                      <th class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground">
                        一致率
                      </th>
                      <th class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground">
                        テンプレート
                      </th>
                      <th class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground">
                        カテゴリ
                      </th>
                      <th class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="row in rows"
                      :key="row.id"
                      class="border-b hover:bg-muted/40"
                    >
                      <td class="whitespace-nowrap px-4 py-2">
                        {{ ymdHm(row.createdAt) }}
                      </td>
                      <td class="whitespace-nowrap px-4 py-2">
                        <Badge :class="classOf(row.result)">
                          {{ labelOf(row.result) }}
                        </Badge>
                      </td>
                      <td class="whitespace-nowrap px-4 py-2">
                        {{ (row.score * 100).toFixed(2) }}%
                      </td>
                      <td class="whitespace-nowrap px-4 py-2">
                        {{ row.templateName }}
                      </td>
                      <td class="whitespace-nowrap px-4 py-2">
                        {{ row.categoryName }}
                      </td>
                      <td class="whitespace-nowrap px-4 py-2">
                        <Button
                          size="sm"
                          variant="outline"
                          @click="$router.push(`/inspection-history/${row.id}/detail`)"
                        >
                          詳細
                        </Button>
                      </td>
                    </tr>
                    <tr v-if="!loading && rows.length === 0">
                      <td
                        colspan="6"
                        class="px-4 py-6 text-sm text-muted-foreground"
                      >
                        履歴がありません
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="space-y-2 p-2 md:hidden">
              <CoreSectionResultTitle
                title="検索結果一覧"
                icon="lucide:table"
              >
                <template #subtitle>
                  <span class="text-xs text-muted-foreground">{{ subtitle }}</span>
                </template>
              </CoreSectionResultTitle>

              <div
                v-for="row in rows"
                :key="row.id"
                class="rounded-md border border-border bg-accent p-3 text-sm"
              >
                <div class="flex items-center gap-2">
                  <Badge :class="classOf(row.result)">
                    {{ labelOf(row.result) }}
                  </Badge>
                  <span class="text-xs text-muted-foreground">{{ ymdHm(row.createdAt) }}</span>
                </div>
                <div class="mt-2">
                  一致率: {{ (row.score * 100).toFixed(2) }}%
                </div>
                <div>テンプレート: {{ row.templateName }}</div>
                <div>カテゴリ: {{ row.categoryName }}</div>
                <div class="mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    @click="$router.push(`/inspection-history/${row.id}/detail`)"
                  >
                    詳細
                  </Button>
                </div>
              </div>

              <div
                v-if="!loading && rows.length === 0"
                class="rounded-md border border-border p-4 text-center text-sm text-muted-foreground"
              >
                履歴がありません
              </div>

              <div class="fixed inset-x-0 bottom-0 z-50 border-t bg-background">
                <div class="mx-auto flex h-14 max-w-screen-xl items-center justify-end gap-2 px-4 pb-[env(safe-area-inset-bottom)]">
                  <Button
                    size="sm"
                    @click="mode === 'split' ? toggleLeftPanel?.() : openFilter?.()"
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
            <span class="px-1 text-xs tabular-nums">{{ pageLabel }}</span>
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
