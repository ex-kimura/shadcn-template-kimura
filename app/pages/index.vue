<script setup lang="ts">
import { ref, computed } from 'vue'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'

type NoticeCategory = 'important' | 'maintenance' | 'update' | 'info'
type Notice = {
  id: number
  title: string
  body: string
  category: NoticeCategory
  date: string // ISO or 'YYYY-MM-DD'
  unread?: boolean
}

usePageTitle('')

const notices = ref<Notice[]>([
  { id: 1, title: '【重要】本日 22:00〜 メンテナンス', body: 'DBメンテのため一時停止します。', category: 'important', date: '2026-02-22', unread: true },
  { id: 2, title: '障害復旧のお知らせ', body: '一部API遅延を解消しました。', category: 'maintenance', date: '2026-02-21', unread: true },
  { id: 3, title: '検索画面の改善を反映しました', body: '一覧の表示速度を改善しました。', category: 'update', date: '2026-02-20' },
  { id: 4, title: '利用規約の一部改定', body: '条項を更新しました。', category: 'info', date: '2026-02-18' },
  { id: 5, title: '分析履歴の表示仕様を変更しました', body: '日時の表示形式を統一しました。', category: 'update', date: '2026-02-15' },
  { id: 6, title: '軽微な不具合修正', body: 'UIの表示崩れを修正しました。', category: 'update', date: '2026-02-14' },
])

const top5 = computed(() => notices.value.slice(0, 5))

function label(cat: NoticeCategory) {
  return cat === 'important'
    ? '重要'
    : cat === 'maintenance'
      ? 'メンテ'
      : cat === 'update'
        ? '更新'
        : '案内'
}

function badgeVariant(cat: NoticeCategory) {
  // shadcn-vue badge variants: default | secondary | destructive | outline (等)
  return cat === 'important'
    ? 'destructive'
    : cat === 'maintenance'
      ? 'secondary'
      : cat === 'update'
        ? 'default'
        : 'outline'
}

const open = ref(false)
const selected = ref<Notice | null>(null)
function openDetail(n: Notice) {
  selected.value = n
  open.value = true
  n.unread = false
}
</script>

<template>
  <div class="">
    <Card class="rounded-none border-none shadow-none">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <div class="flex items-center gap-2">
          <Icon
            name="lucide:bell"
            class="h-4 w-4 text-muted-foreground"
          />
          <CardTitle class="text-base">
            お知らせ
          </CardTitle>
        </div>

        <Button
          as-child
          variant="link"
          class="h-auto p-0 text-xs"
        >
          <NuxtLink to="#">すべて見る</NuxtLink>
        </Button>
      </CardHeader>

      <CardContent class="pt-0">
        <div class="divide-y">
          <button
            v-for="n in top5"
            :key="n.id"
            type="button"
            class="w-full text-left py-3 hover:bg-muted/40 rounded-none px-2 -mx-2"
            @click="openDetail(n)"
          >
            <div class="flex items-start gap-3">
              <!-- 未読ドット -->
              <span
                class="mt-1.5 h-2 w-2 rounded-full"
                :class="n.unread ? 'bg-primary' : 'bg-transparent'"
              />

              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <Badge
                    :variant="badgeVariant(n.category)"
                    class="rounded-sm px-2 py-0.5"
                  >
                    {{ label(n.category) }}
                  </Badge>
                  <span class="truncate text-sm">{{ n.title }}</span>
                </div>
                <div class="mt-1 text-xs text-muted-foreground truncate">
                  {{ n.body }}
                </div>
              </div>

              <div class="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
                {{ n.date }}
              </div>
            </div>
          </button>
        </div>

        <Separator class="my-3" />

        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <span>直近 {{ top5.length }} 件を表示</span>
          <Button
            as-child
            variant="outline"
            size="sm"
            class="h-7 rounded-sm px-2"
          >
            <NuxtLink to="#">一覧へ</NuxtLink>
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- 詳細 Sheet -->
    <Sheet v-model:open="open">
      <SheetContent class="w-[92vw] sm:max-w-md">
        <SheetHeader>
          <SheetTitle class="flex items-center gap-2">
            <Badge
              v-if="selected"
              :variant="badgeVariant(selected.category)"
              class="rounded-sm px-2 py-0.5"
            >
              {{ selected ? label(selected.category) : '' }}
            </Badge>
            <span class="truncate">{{ selected?.title }}</span>
          </SheetTitle>
          <SheetDescription>
            {{ selected?.date }}
          </SheetDescription>
        </SheetHeader>

        <div class="mt-4 px-4 text-sm leading-relaxed whitespace-pre-wrap">
          {{ selected?.body }}
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
