<script setup lang="ts">
import { computed, watch } from 'vue'
import { Copy, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUserDetailStore } from '@/stores/userDetail'

const props = defineProps<{ id?: string | number }>()

const { ymdHm } = useDateFormatJa()
const route = useRoute()
const store = useUserDetailStore()

const resolvedId = computed(() => props.id ?? (route.params.id ? String(route.params.id) : undefined))

watch(
  resolvedId,
  async (id) => {
    if (!id) return
    await store.fetch(String(id))
  },
  { immediate: true },
)

const statusLabel = computed(() => (store.form.isEnabled ? '有効' : '無効'))

async function copyText(text?: string | number | null) {
  if (text == null) return
  try {
    await navigator.clipboard.writeText(String(text))
  }
  catch {
    console.log('error')
  }
}
</script>

<template>
  <div class="p-0 min-w-0 text-xs">
    <div class="grid grid-cols-1 gap-3 min-w-0">
      <!-- ID -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="flex items-start justify-between gap-2 min-w-0">
          <div class="min-w-0">
            <div class="text-xs text-muted-foreground">
              ID
            </div>
            <div class="mt-1 text-sm font-medium tabular-nums wrap-break-word">
              {{ store.form.id }}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 shrink-0"
            @click="copyText(store.form.id)"
          >
            <Copy class="h-4 w-4" />
            <span class="sr-only">copy id</span>
          </Button>
        </div>
      </section>

      <!-- ステータス -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="text-xs text-muted-foreground">
          ステータス
        </div>
        <div class="mt-2">
          <Badge
            :variant="store.form.isEnabled ? 'success' : 'secondary'"
            class="rounded-md"
          >
            <Check
              v-if="store.form.isEnabled"
              class="mr-1 h-3.5 w-3.5"
            />
            {{ statusLabel }}
          </Badge>
        </div>
      </section>

      <!-- ユーザ名 -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="text-xs text-muted-foreground">
          ユーザ名
        </div>
        <div class="mt-1 text-sm font-medium break-words">
          {{ store.form.userName }}
        </div>
      </section>

      <!-- メール -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="flex items-start justify-between gap-2 min-w-0">
          <div class="min-w-0">
            <div class="text-xs text-muted-foreground">
              メールアドレス
            </div>
            <!-- ✅ ここがはみ出し原因になりやすい。min-w-0 + break-words -->
            <div class="mt-1 text-sm min-w-0 break-words">
              {{ store.form.email }}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 shrink-0"
            @click="copyText(store.form.email)"
          >
            <Copy class="h-4 w-4" />
            <span class="sr-only">copy email</span>
          </Button>
        </div>
      </section>

      <!-- 所属 -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="text-xs text-muted-foreground">
          所属
        </div>
        <div class="mt-1 text-sm break-words">
          {{ store.form.deptName }}
        </div>
      </section>

      <!-- 役職 -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="text-xs text-muted-foreground">
          役職
        </div>
        <div class="mt-1 text-sm break-words">
          {{ store.form.roleName }}
        </div>
      </section>

      <!-- 作成/更新 -->
      <section class="rounded-xl border bg-card p-2 min-w-0">
        <div class="grid grid-cols-1 gap-2 min-w-0">
          <div class="min-w-0">
            <div class="text-xs text-muted-foreground">
              作成日時
            </div>
            <div class="mt-1 text-sm tabular-nums break-words">
              {{ ymdHm(store.form.createdAt) }}
            </div>
          </div>
          <div class="min-w-0">
            <div class="text-xs text-muted-foreground">
              更新日時
            </div>
            <div class="mt-1 text-sm tabular-nums break-words">
              {{ ymdHm(store.form.updatedAt) }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
