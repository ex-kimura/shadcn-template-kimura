<template>
  <AlertDialog :open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>削除の確認</AlertDialogTitle>
        <AlertDialogDescription>
          この操作は取り消せません。本当に削除しますか？
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div class="flex items-center gap-2 py-2">
        <!-- shadcn Checkboxをやめてネイティブのinputに変更 -->
        <input
          id="confirm-check"
          v-model="isChecked"
          type="checkbox"
          class="w-4 h-4 cursor-pointer"
        >
        <label
          for="confirm-check"
          class="text-sm cursor-pointer select-none"
        >
          削除することを理解しました
        </label>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">
          キャンセル
        </AlertDialogCancel>
        <Button
          class="bg-destructive hover:bg-destructive/90 text-white"
          :disabled="!isChecked"
          @click="handleConfirm"
        >
          削除する
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const isChecked = ref(false)

const handleConfirm = () => {
  emit('confirm')
  isChecked.value = false
}

const handleCancel = () => {
  emit('cancel')
  isChecked.value = false
}
</script>
