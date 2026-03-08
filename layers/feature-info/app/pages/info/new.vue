<script setup lang="ts">
usePageTitle('お知らせ管理 新規登録')
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <!-- Page -->
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="h-full min-h-0">
        <div class="p-4">
          <InfoForm />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="shrink-0 border-t bg-muted/50 backdrop-blur flex items-center px-4 py-3 md:py-2">
      <div class="flex w-full flex-col md:flex-row md:items-center gap-3">
        <div class="order-1 md:order-2 md:ml-auto">
          <Button
            class="w-full md:w-auto"
          >
            新規登録
          </Button>
        </div>
      </div>
    </footer>
  </div>
</template>
