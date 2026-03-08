import { useSystemConfigStore } from '@/stores/systemConfig'

export default defineNuxtPlugin(() => {
  const store = useSystemConfigStore()

  // すでに入ってたら何もしない
  if (store.configTable) return

  // ✅ 初回描画をブロックしないために await しない
  // ✅ setTimeout で「描画開始後」に実行させる（確実にLoadingが見える）
  setTimeout(() => {
    store.fetchConfigTable()
      .then((table: any) => {
        store.configTable = table
      })
      .catch(() => {
        // 失敗時は安全側に倒すならここで入れる
        store.configTable = { loginRequired: true }
      })
  }, 0)
})
