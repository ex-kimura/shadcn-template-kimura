<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import type { SearchLayoutMode } from '@/components/core/SearchLayoutShell.vue'

usePageTitle('設定')

const { mode, setMode } = useSearchLayoutMode()
const { theme, setTheme } = useAppTheme()
const { fontSize, setFontSize } = useAppFontSize()

const form = ref<{
  layout: SearchLayoutMode
  theme: 'default' | 'green'
  size: 'small' | 'middle' | 'large'
}>({
  layout: mode.value,
  theme: theme.value,
  size: fontSize.value,
})

const btnSave = () => {
  setMode(form.value.layout)
  setTheme(form.value.theme)
  setFontSize(form.value.size)
  toast.success('登録しました')
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <!-- Page -->
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="h-full min-h-0">
        <div class="p-4">
          <dl class="themed-form-surface detail-kv detail-kv--edit">
            <div class="detail-kv-row">
              <dt>レイアウト</dt>
              <dd>
                <NativeSelect
                  v-model="form.layout"
                  class="min-w-40"
                >
                  <NativeSelectOption value="split">
                    左右分割
                  </NativeSelectOption>
                  <NativeSelectOption value="stack">
                    上下分割
                  </NativeSelectOption>
                </NativeSelect>
              </dd>
            </div>
            <div class="detail-kv-row">
              <dt>テーマ</dt>
              <dd>
                <NativeSelect
                  v-model="form.theme"
                  class="min-w-40"
                >
                  <NativeSelectOption value="default">
                    白黒
                  </NativeSelectOption>
                  <NativeSelectOption value="green">
                    緑
                  </NativeSelectOption>
                </NativeSelect>
              </dd>
            </div>
            <div class="detail-kv-row">
              <dt>文字サイズ</dt>
              <dd>
                <NativeSelect
                  v-model="form.size"
                  class="min-w-40"
                >
                  <NativeSelectOption value="small">
                    小
                  </NativeSelectOption>
                  <NativeSelectOption value="middle">
                    中
                  </NativeSelectOption>
                  <NativeSelectOption value="large">
                    大
                  </NativeSelectOption>
                </NativeSelect>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="shrink-0 border-t bg-muted/50 backdrop-blur flex items-center px-4 py-3 md:py-2">
      <div class="flex w-full flex-col md:flex-row md:items-center gap-3">
        <div class="order-1 md:order-2 md:ml-auto">
          <Button
            class="w-full md:w-auto"
            @click="btnSave"
          >
            登録
          </Button>
        </div>
      </div>
    </footer>
  </div>
</template>
