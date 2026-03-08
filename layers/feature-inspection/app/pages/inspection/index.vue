<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { InspectionCategory, InspectionHistory } from '@/types/inspection'
import { mockInspectionRepository } from '@/repositories/mock-inspection.repository'

usePageTitle('検査実行')

const step = ref<1 | 2 | 3>(1)
const loading = ref(false)
const categories = ref<InspectionCategory[]>([])
const selectedCategoryId = ref('')
const sourceImageUrl = ref('')
const result = ref<InspectionHistory | null>(null)

onMounted(async () => {
  categories.value = await mockInspectionRepository.listCategories(true)
})

const canGoStep2 = computed(() => !!sourceImageUrl.value)
const canInspect = computed(() => !!sourceImageUrl.value && !!selectedCategoryId.value)

async function runInspection() {
  if (!canInspect.value) return
  loading.value = true
  try {
    result.value = await mockInspectionRepository.runInspection({
      sourceImageUrl: sourceImageUrl.value,
      categoryId: selectedCategoryId.value,
    })
    step.value = 3
  }
  catch (e: any) {
    toast.error(e?.message ?? '検査に失敗しました')
  }
  finally {
    loading.value = false
  }
}

function moveToStep2() {
  if (!canGoStep2.value) return
  step.value = 2
}

function moveToStep1() {
  step.value = 1
}

function restartFromStep1() {
  step.value = 1
  result.value = null
  sourceImageUrl.value = ''
  selectedCategoryId.value = ''
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="h-full min-h-0">
        <div class="p-4">
          <div class="space-y-4">
            <div class="themed-form-surface rounded-md border border-border p-3">
              <div class="grid grid-cols-3 gap-2 text-xs md:flex md:items-center md:gap-3 md:text-sm">
                <div class="flex flex-col items-center gap-1 md:flex-row md:gap-2">
                  <Badge :variant="step === 1 ? 'default' : 'secondary'">
                    Step1
                  </Badge>
                  <span class="text-center">画像選択</span>
                </div>
                <div class="flex flex-col items-center gap-1 md:flex-row md:gap-2">
                  <Badge :variant="step === 2 ? 'default' : 'secondary'">
                    Step2
                  </Badge>
                  <span class="text-center">カテゴリ選択</span>
                </div>
                <div class="flex flex-col items-center gap-1 md:flex-row md:gap-2">
                  <Badge :variant="step === 3 ? 'default' : 'secondary'">
                    Step3
                  </Badge>
                  <span class="text-center">検査結果</span>
                </div>
              </div>
            </div>

            <InspectionStep1Upload
              v-if="step === 1"
              v-model:image-url="sourceImageUrl"
            />

            <InspectionStep2Category
              v-else-if="step === 2"
              v-model:selected-id="selectedCategoryId"
              :categories="categories"
            />

            <InspectionStep3Result
              v-else-if="step === 3 && result"
              :result="result"
            />
          </div>
        </div>
      </div>
    </div>

    <footer class="shrink-0 border-t bg-muted/50 backdrop-blur flex items-center px-4 py-3 md:py-2">
      <div class="flex w-full flex-col gap-3 md:flex-row md:items-center">
        <span
          v-if="loading"
          class="text-sm text-muted-foreground"
        >
          検査中...
        </span>

        <div class="order-1 md:ml-auto">
          <div
            v-if="step === 1"
            class="flex w-full md:w-auto"
          >
            <Button
              class="w-full md:w-auto"
              :disabled="!canGoStep2 || loading"
              @click="moveToStep2"
            >
              次へ
            </Button>
          </div>

          <div
            v-else-if="step === 2"
            class="flex w-full gap-2"
          >
            <Button
              variant="outline"
              class="w-full md:w-auto"
              :disabled="loading"
              @click="moveToStep1"
            >
              戻る
            </Button>
            <Button
              class="w-full md:w-auto"
              :disabled="!canInspect || loading"
              @click="runInspection"
            >
              実行
            </Button>
          </div>

          <div
            v-else
            class="flex w-full md:w-auto"
          >
            <Button
              variant="outline"
              class="w-full md:w-auto"
              :disabled="loading"
              @click="restartFromStep1"
            >
              戻る
            </Button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
