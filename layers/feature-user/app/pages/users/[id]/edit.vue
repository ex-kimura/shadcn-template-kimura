<script setup lang="ts">
import { toast } from 'vue-sonner'

usePageTitle('ユーザ管理 新規登録')
const { openDialog } = useDeleteConfirm()

const btnRegist = () => {
  toast.success('登録しました。')
}

const btnDelete = () => {
  console.log('btnDelete')
  openDialog(async () => {
    // 削除処理
    toast.success('削除しました。')
    useRouter().back()
  })
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <!-- Header -->
    <!-- <header class="shrink-0 h-12 border-b bg-muted/50 px-4 backdrop-blur flex items-center" /> -->

    <!-- Page -->
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="h-full min-h-0">
        <div class="p-4">
          <UserForm />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="shrink-0 border-t bg-muted/50 backdrop-blur flex items-center px-4 py-3 md:py-2">
      <div class="flex w-full flex-col md:flex-row md:items-center gap-3">
        <div class="order-1 md:order-2 md:ml-auto gap-3">
          <Button
            class="w-full md:w-auto"
            @click="btnRegist"
          >
            登録
          </Button>
        </div>
        <div class="order-2 md:order-1 flex flex-col md:flex-row md:items-center gap-3">
          <Button
            class="w-full md:w-auto"
            variant="outline"
            @click="$router.back"
          >
            戻る
          </Button>
          <Button
            class="w-full md:w-auto text-destructive hover:text-destructive border border-destructive"
            variant="ghost"
            @click="btnDelete"
          >
            削除
          </Button>
        </div>
      </div>
    </footer>
  </div>
</template>
