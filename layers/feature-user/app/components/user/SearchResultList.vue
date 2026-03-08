<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserListStore } from '@/stores/userList'
import { useVueTable, getCoreRowModel, FlexRender } from '@tanstack/vue-table'
import type { ColumnDef } from '@tanstack/vue-table'
import type { MockUser } from '@/types/mock-user'

const store = useUserListStore()
const router = useRouter()
const _emit = defineEmits<{ (e: 'showLeftPanel'): void }>()
const { items, total, page, pageSize, loading } = storeToRefs(store)

const columns: ColumnDef<MockUser>[] = [
  {
    id: 'actions',
    header: '操作',
    size: 100,
    minSize: 100,
    maxSize: 100,
  },
  {
    accessorKey: 'userName',
    header: 'ユーザ名',
    size: 180,
    minSize: 180,
    maxSize: 180,
  },
  {
    accessorKey: 'email',
    header: 'メールアドレス',
    size: 220,
    minSize: 220,
    maxSize: 220,
  },
  {
    accessorKey: 'deptName',
    header: '部署',
    size: 80,
    minSize: 80,
    maxSize: 80,
  },
  {
    accessorKey: 'roleName',
    header: '権限',
    size: 80,
    minSize: 80,
    maxSize: 80,
  },
  {
    accessorKey: 'isEnabled',
    header: 'ステータス',
  },
]

const table = useVueTable({
  data: computed(() => items.value),
  columns,
  getCoreRowModel: getCoreRowModel(),
})

const start = computed(() => {
  if (total.value === 0) return 0
  return (page.value - 1) * pageSize.value + 1
})

const end = computed(() => {
  if (total.value === 0) return 0
  return Math.min(page.value * pageSize.value, total.value)
})

const subtitle = computed(() => `${start.value}〜${end.value} 件表示 / 全 ${total.value} 件`)

const selectedId = ref<string | null>(null)
const open = ref(false)

function openDetail(id: string) {
  selectedId.value = id
  open.value = true
}

function closeDetail() {
  open.value = false
}

function btnDetail(id: string) {
  openDetail(id)
}

function btnEdit(id: string) {
  router.push(`/users/${id}/edit`)
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="shrink-0">
      <CoreSectionResultTitle
        title="検索結果"
        icon="lucide:table"
      >
        <template #subtitle>
          <div class="text-xs text-muted-foreground">
            {{ subtitle }}
          </div>
        </template>
      </CoreSectionResultTitle>
    </div>

    <div class="min-h-0 flex-1 overflow-auto">
      <table class="min-w-full w-auto table-fixed text-sm">
        <colgroup>
          <col
            v-for="header in table.getFlatHeaders()"
            :key="header.id"
            :style="header.id === 'isEnabled' ? undefined : { width: header.getSize() + 'px' }"
          >
        </colgroup>

        <thead class="sticky top-0 z-20 bg-accent shadow-[inset_0_-1px_0_0_var(--border)]">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="whitespace-nowrap bg-accent px-4 py-2 text-left font-medium text-muted-foreground"
            >
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-b hover:bg-muted/40"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="whitespace-nowrap px-4 py-2"
            >
              <template v-if="cell.column.id === 'actions'">
                <div class="flex gap-x-2">
                  <Button
                    variant="link"
                    class="h-6 px-1"
                    @click="btnDetail(row.original.id)"
                  >
                    詳細
                  </Button>
                  <Button
                    variant="link"
                    class="h-6 px-1"
                    @click="btnEdit(row.original.id)"
                  >
                    編集
                  </Button>
                </div>
              </template>

              <template v-else-if="cell.column.id === 'isEnabled'">
                <Badge
                  :variant="row.original.isEnabled ? 'success' : 'secondary'"
                  class="rounded-sm px-2 py-0.5"
                >
                  {{ row.original.isEnabled ? '有効' : '無効' }}
                </Badge>
              </template>

              <template v-else>
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </template>
            </td>
          </tr>

          <tr v-if="!loading && items.length === 0">
            <td
              :colspan="table.getAllLeafColumns().length"
              class="px-4 py-6 text-sm text-muted-foreground"
            >
              検索結果がありません
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Sheet v-model:open="open">
      <SheetContent
        side="right"
        class="p-0 w-[360px] max-w-[360px]"
      >
        <SheetHeader class="flex h-12 items-center border-b px-4">
          <SheetTitle>ユーザ詳細</SheetTitle>
          <SheetDescription class="sr-only">
            ユーザ詳細を表示します
          </SheetDescription>
        </SheetHeader>

        <div class="h-[calc(100svh-3rem)] overflow-y-auto p-4 pt-2">
          <UserDetail
            v-if="selectedId"
            :id="selectedId"
            @close="closeDetail"
          />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
