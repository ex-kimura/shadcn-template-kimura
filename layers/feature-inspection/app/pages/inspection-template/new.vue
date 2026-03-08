<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { InspectionCategory } from '@/types/inspection'
import { mockInspectionRepository } from '@/repositories/mock-inspection.repository'

usePageTitle('テンプレート画像登録')

const categories = ref<InspectionCategory[]>([])
const filePreview = ref('')
const fileName = ref('')
const saving = ref(false)

const form = reactive({
  name: '',
  categoryId: '',
  thresholdOk: 0.85,
  thresholdReview: 0.7,
  isEnabled: true,
})

onMounted(async () => {
  categories.value = await mockInspectionRepository.listCategories(false)
  form.categoryId = categories.value[0]?.id ?? ''
})

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = () => {
    filePreview.value = String(reader.result ?? '')
  }
  reader.readAsDataURL(file)
}

const canSave = computed(() => {
  return !!(form.name.trim() && form.categoryId && filePreview.value)
    && form.thresholdOk > form.thresholdReview
})

async function save() {
  if (!canSave.value) return
  saving.value = true
  try {
    await mockInspectionRepository.createTemplate({
      name: form.name.trim(),
      categoryId: form.categoryId,
      imageUrl: filePreview.value,
      thresholdOk: Number(form.thresholdOk),
      thresholdReview: Number(form.thresholdReview),
      isEnabled: form.isEnabled,
    })
    toast.success('登録しました')
    form.name = ''
    form.thresholdOk = 0.85
    form.thresholdReview = 0.7
    form.isEnabled = true
    fileName.value = ''
    filePreview.value = ''
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
              <dt>テンプレート名</dt>
              <dd><Input v-model="form.name" /></dd>
            </div>
            <div class="detail-kv-row">
              <dt>カテゴリ</dt>
              <dd>
                <NativeSelect
                  v-model="form.categoryId"
                  class="min-w-40"
                >
                  <NativeSelectOption
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </NativeSelectOption>
                </NativeSelect>
              </dd>
            </div>
            <div class="detail-kv-row">
              <dt>テンプレート画像</dt>
              <dd>
                <Input
                  type="file"
                  accept="image/*"
                  @change="onFileChange"
                />
                <p class="mt-2 text-xs text-muted-foreground">
                  {{ fileName || '未選択' }}
                </p>
                <img
                  v-if="filePreview"
                  :src="filePreview"
                  alt="template preview"
                  class="mt-2 max-h-64 rounded-md object-contain"
                >
              </dd>
            </div>
            <div class="detail-kv-row">
              <dt>しきい値1 (OK)</dt>
              <dd>
                <Input
                  v-model.number="form.thresholdOk"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                />
              </dd>
            </div>
            <div class="detail-kv-row">
              <dt>しきい値2 (要確認)</dt>
              <dd>
                <Input
                  v-model.number="form.thresholdReview"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                />
              </dd>
            </div>
            <div class="detail-kv-row">
              <dt>有効無効</dt>
              <dd>
                <NativeSelect
                  v-model="form.isEnabled"
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
