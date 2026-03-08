// layers/feature-user/app/types/mock-user.ts
export type MockInfo = {
  id: string
  title: string
  body: string
  category: string
  date: Date
  unread: boolean
  isEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

export type MockInfoSearchCriteria = {
  title: string
  body: string
  category: string
  date: Date
  page: number
  pageSize: number
}

export type MockPaged<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}
