<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { navigateTo } from 'nuxt/app'
import { useSystemConfigStore } from './stores/systemConfig'
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

const route = useRoute()
const configStore = useSystemConfigStore()
const { open, handleConfirm, handleCancel } = useDeleteConfirm()
const { isLoggedIn, loginRequired } = useAuth()
useAppTheme()
useAppFontSize()

watchEffect(() => {
  // サーバ設定ロード前は何もしない
  if (!configStore.configTable) return

  // ★ loginRequired は useAuth 側の固定値
  if (!loginRequired || isLoggedIn.value) return
  if (route.path === '/login') return

  navigateTo('/login')
})
</script>

<template>
  <NuxtLayout>
    <div
      v-show="!!configStore.configTable"
      class="h-full"
    >
      <NuxtPage />
      <CoreDeleteConfirmDialog
        :open="open"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </div>
  </NuxtLayout>

  <Toaster position="top-center" />

  <!-- app.vue専用のラッパー -->
  <div
    v-if="!configStore.configTable"
    class="fixed inset-0 z-999999 bg-white flex items-center justify-center"
  >
    <CoreLoading />
  </div>
</template>
