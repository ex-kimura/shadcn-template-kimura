import { defineStore } from 'pinia'
import type { MockPaged, MockInfo, MockInfoSearchCriteria } from '@/types/mock-info'
import { mockInfoRepository } from '@/repositories/mock-info.repository'

type State = {
  query: Omit<MockInfoSearchCriteria, 'page' | 'pageSize'>
  items: MockInfo[]
  total: number
  loading: boolean
  error: string | null
  hasSearched: boolean
  page: number
  pageSize: number
}

function initialQuery(): State['query'] {
  return {
    title: '',
    body: '',
    category: '',
    date: new Date(),
  }
}

export const useInfoListStore = defineStore('featureInfo.infoList', {
  state: (): State => ({
    query: initialQuery(),
    items: [],
    total: 0,
    loading: false,
    error: null,
    hasSearched: false,
    page: 1,
    pageSize: 20,
  }),

  getters: {
    hasResults: s => s.items.length > 0,
    totalPages: s => Math.max(1, Math.ceil(s.total / s.pageSize)),
    canPrev: s => s.page > 1 && !s.loading,
    canNext: s => s.page < Math.max(1, Math.ceil(s.total / s.pageSize)) && !s.loading,
  },

  actions: {
    resetQuery() {
      this.query = initialQuery()
      this.page = 1
    },

    setQuery(patch: Partial<State['query']>) {
      this.query = { ...this.query, ...patch }
    },

    async search(override?: Partial<State['query']>) {
      this.loading = true
      this.error = null
      try {
        if (override) this.query = { ...this.query, ...override }
        const criteria: MockInfoSearchCriteria = {
          ...this.query,
          page: this.page,
          pageSize: this.pageSize,
        }
        const res: MockPaged<MockInfo> = await mockInfoRepository.search(criteria)
        this.items = res.items
        this.total = res.total
        this.page = res.page
        this.pageSize = res.pageSize

        const tp = Math.max(1, Math.ceil(this.total / this.pageSize))
        if (this.page > tp) this.page = tp
        this.hasSearched = true
      }
      catch (e: any) {
        this.error = e?.message ?? 'Search failed'
        this.items = []
        this.total = 0
        this.hasSearched = true
      }
      finally {
        this.loading = false
      }
    },

    async setPageSize(next: number) {
      if (!Number.isFinite(next) || next <= 0) return
      if (this.pageSize === next) return
      this.pageSize = next
      this.page = 1
      await this.search()
    },

    async goPrev() {
      if (!this.canPrev) return
      this.page -= 1
      await this.search()
    },

    async goNext() {
      if (!this.canNext) return
      this.page += 1
      await this.search()
    },

    async removeFromList(id: string) {
      this.items = this.items.filter(x => x.id !== id)
      this.total = Math.max(0, this.total - 1)
      const tp = Math.max(1, Math.ceil(this.total / this.pageSize))
      if (this.page > tp) {
        this.page = tp
        await this.search()
      }
    },

    resetAll() {
      this.resetQuery()
      this.items = []
      this.total = 0
      this.loading = false
      this.error = null
      this.hasSearched = false
    },
  },
})
