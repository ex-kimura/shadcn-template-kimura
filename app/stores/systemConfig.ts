import { defineStore } from 'pinia'

export const useSystemConfigStore = defineStore('systemConfig', () => {
  // 設定テーブル（any）。null = 未取得
  const configTable = ref<any | null>(null)

  // データ取得“だけ”
  async function fetchConfigTable(): Promise<any> {
    // いまは疑似（5秒）
    await new Promise(r => setTimeout(r, 1000))
    return {
      features: { enableFoo: true },
      ui: { theme: 'light' },
    }
    // 将来はこれ
    // return await $fetch<any>('/api/config')
  }

  return { configTable, fetchConfigTable }
})
