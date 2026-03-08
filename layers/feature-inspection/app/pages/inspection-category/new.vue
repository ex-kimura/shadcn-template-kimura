<script setup lang="ts">
import { toast } from 'vue-sonner'
import { mockInspectionRepository } from '@/repositories/mock-inspection.repository'

usePageTitle('検査カテゴリ登録')

const name = ref('')
const isEnabled = ref(true)
const saving = ref(false)

const canSave = computed(() => !!name.value.trim())

async function save() {
  if (!canSave.value) return
  saving.value = true
  try {
    await mockInspectionRepository.createCategory({
      name: name.value.trim(),
      isEnabled: isEnabled.value,
    })
    toast.success('登録しました')
    name.value = ''
    isEnabled.value = true
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="h-full min-h-0">
        <div class="p-4">
          <dl class="themed-form-surface detail-kv detail-kv--edit">
            <div class="detail-kv-row">
              <dt>カテゴリ名</dt>
              <dd><Input v-model="name" /></dd>
            </div>
            <div class="detail-kv-row">
              <dt>有効無効</dt>
              <dd>
                <NativeSelect
                  v-model="isEnabled"
                  class="min-w-40"
                >
                  <NativeSelectOption :value="true">
                    有効
                  </NativeSelectOption>
                  <NativeSelectOption :value="false">
                    無効
                  </NativeSelectOption>
                </NativeSelect>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <footer class="shrink-0 border-t bg-muted/50 backdrop-blur flex items-center px-4 py-3 md:py-2">
      <div class="flex w-full flex-col md:flex-row md:items-center gap-3">
        <div class="order-1 md:order-2 md:ml-auto">
          <Button
            class="w-full md:w-auto"
            :disabled="saving || !canSave"
            @click="save"
          >
            登録
          </Button>
        </div>
      </div>
    </footer>
  </div>
</template>
