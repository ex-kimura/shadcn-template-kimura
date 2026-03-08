// layers/feature-info/stores/infoDetail.ts
import { defineStore } from 'pinia'
import type { MockInfo } from '@/types/mock-info'
import { mockInfoRepository } from '@/repositories/mock-info.repository'

type State = {
  form: MockInfo
  snapshot: MockInfo
  loading: boolean
  saving: boolean
  error: string | null
}

/** Date を保持して clone */
function cloneInfo(u: MockInfo): MockInfo {
  return structuredClone(u)
}

/** Store内専用：新規用の空データを生成（外部公開しない） */
function createEmptyInfo(): MockInfo {
  return {
    id: '',
    title: '',
    body: '',
    category: '',
    unread: true,
    date: new Date(0),
    isEnabled: true,
    createdAt: new Date(0),
    updatedAt: new Date(0),
  }
}

/** Date 含めて “丸ごと比較” するための安定JSON化 */
function stableStringifyInfo(u: MockInfo): string {
  const replacer = (_key: string, value: any) => {
    if (value instanceof Date) return value.toISOString()
    return value
  }
  return JSON.stringify(u, replacer)
}

export const useInfoDetailStore = defineStore('featureInfo.infoDetail', {
  state: (): State => {
    const empty = createEmptyInfo()
    return {
      form: empty,
      snapshot: cloneInfo(empty),
      loading: false,
      saving: false,
      error: null,
    }
  },

  getters: {
    /** 画面はこれだけ見ればOK：差分があるか（Date含めて丸ごと） */
    isDiff(state): boolean {
      return stableStringifyInfo(state.form) !== stableStringifyInfo(state.snapshot)
    },
  },

  actions: {
    /** 新規：フォーム状態を初期化（これを画面から呼ぶ） */
    initNew() {
      const empty = createEmptyInfo()
      this.form = empty
      this.snapshot = cloneInfo(empty)
      this.error = null
      this.loading = false
      this.saving = false
    },

    /** 更新：取得してフォーム状態を作る（これを画面から呼ぶ） */
    async fetch(id: string) {
      this.loading = true
      this.error = null
      try {
        const date = await mockInfoRepository.findById(id)
        this.form = cloneInfo(date)
        this.snapshot = cloneInfo(date)
      }
      catch (e: any) {
        this.error = e?.message ?? '取得に失敗しました'
        // nullにはしない（フォームを壊さない）
        const empty = createEmptyInfo()
        this.form = empty
        this.snapshot = cloneInfo(empty)
      }
      finally {
        this.loading = false
      }
    },

    /** 元に戻す（snapshotへ復元） */
    reset() {
      this.form = cloneInfo(this.snapshot)
    },

    /**
     * regist（新規/更新 共通API）
     * - repository.regist(form) を呼ぶ
     * - 成功したら snapshot も更新して isDiff=false に戻す
     */
    async regist(): Promise<MockInfo | null> {
      this.saving = true
      this.error = null
      try {
        const saved = await mockInfoRepository.regist(this.form)
        this.form = cloneInfo(saved)
        this.snapshot = cloneInfo(saved)
        return saved
      }
      catch (e: any) {
        this.error = e?.message ?? '登録に失敗しました'
        return null
      }
      finally {
        this.saving = false
      }
    },

    /** 画面破棄時など：nullにせず初期化へ戻す */
    clear() {
      const empty = createEmptyInfo()
      this.form = empty
      this.snapshot = cloneInfo(empty)
      this.error = null
      this.loading = false
      this.saving = false
    },
  },
})
