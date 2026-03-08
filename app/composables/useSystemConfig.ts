import { ref, readonly, computed } from 'vue'

/**
 * 設定テーブル全体（型未定義なので any）
 * null = まだ未取得
 */
const configTable = ref<any | null>(null)

export const useSystemConfig = () => ({
  configTable: readonly(configTable),

  /**
   * loginRequired は設定テーブルの一部として参照
   */
  loginRequired: computed<boolean | null>(() => {
    if (!configTable.value) return null

    const v = configTable.value?.loginRequired
    return typeof v === 'boolean' ? v : null
  }),

  /**
   * loginRequired を更新（仮ログイン用）
   * configTable がまだ null のときは何もしない（または作る）
   */
  setLoginRequired: (value: boolean) => {
    if (!configTable.value) return
    configTable.value.loginRequired = value
  },
})

export const setSystemConfig = (table: any) => {
  configTable.value = table
}
