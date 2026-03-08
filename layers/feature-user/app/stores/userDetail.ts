// layers/feature-user/stores/userDetail.ts
import { defineStore } from 'pinia'
import type { MockUser } from '@/types/mock-user'
import { mockUserRepository } from '@/repositories/mock-user.repository'

type State = {
  form: MockUser
  snapshot: MockUser
  loading: boolean
  saving: boolean
  error: string | null
}

/** Date を保持して clone */
function cloneUser(u: MockUser): MockUser {
  return structuredClone(u)
}

/** Store内専用：新規用の空データを生成（外部公開しない） */
function createEmptyUser(): MockUser {
  return {
    id: '',
    userName: '',
    email: '',
    dept: '',
    role: '',
    isEnabled: true,
    createdAt: new Date(0),
    updatedAt: new Date(0),
    deptName: '',
    roleName: '',
  }
}

/** Date 含めて “丸ごと比較” するための安定JSON化 */
function stableStringifyUser(u: MockUser): string {
  const replacer = (_key: string, value: any) => {
    if (value instanceof Date) return value.toISOString()
    return value
  }
  return JSON.stringify(u, replacer)
}

export const useUserDetailStore = defineStore('featureUsers.userDetail', {
  state: (): State => {
    const empty = createEmptyUser()
    return {
      form: empty,
      snapshot: cloneUser(empty),
      loading: false,
      saving: false,
      error: null,
    }
  },

  getters: {
    /** 画面はこれだけ見ればOK：差分があるか（Date含めて丸ごと） */
    isDiff(state): boolean {
      return stableStringifyUser(state.form) !== stableStringifyUser(state.snapshot)
    },
  },

  actions: {
    /** 新規：フォーム状態を初期化（これを画面から呼ぶ） */
    initNew() {
      const empty = createEmptyUser()
      this.form = empty
      this.snapshot = cloneUser(empty)
      this.error = null
      this.loading = false
      this.saving = false
    },

    /** 更新：取得してフォーム状態を作る（これを画面から呼ぶ） */
    async fetch(id: string) {
      this.loading = true
      this.error = null
      try {
        const user = await mockUserRepository.findById(id)
        this.form = cloneUser(user)
        this.snapshot = cloneUser(user)
      }
      catch (e: any) {
        this.error = e?.message ?? '取得に失敗しました'
        // nullにはしない（フォームを壊さない）
        const empty = createEmptyUser()
        this.form = empty
        this.snapshot = cloneUser(empty)
      }
      finally {
        this.loading = false
      }
    },

    /** 元に戻す（snapshotへ復元） */
    reset() {
      this.form = cloneUser(this.snapshot)
    },

    /**
     * regist（新規/更新 共通API）
     * - repository.regist(form) を呼ぶ
     * - 成功したら snapshot も更新して isDiff=false に戻す
     */
    async regist(): Promise<MockUser | null> {
      this.saving = true
      this.error = null
      try {
        const saved = await mockUserRepository.regist(this.form)
        this.form = cloneUser(saved)
        this.snapshot = cloneUser(saved)
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
      const empty = createEmptyUser()
      this.form = empty
      this.snapshot = cloneUser(empty)
      this.error = null
      this.loading = false
      this.saving = false
    },
  },
})
