<script setup lang="ts">
usePageTitle('お知らせ管理 詳細')
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <!-- Page -->
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="h-full min-h-0">
        <div class="p-4">
          <InfoDetail />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="shrink-0 border-t bg-muted/50 backdrop-blur flex items-center px-4 py-3 md:py-2">
      <div class="flex w-full flex-col md:flex-row md:items-center gap-3">
        <div class="order-1 md:order-2 md:ml-auto gap-3" />
        <div class="order-2 md:order-1 flex flex-col md:flex-row md:items-center gap-3">
          <Button
            class="w-full md:w-auto"
            variant="outline"
            @click="$router.back"
          >
            戻る
          </Button>
        </div>
      </div>
    </footer>
  </div>
</template>
