// layers/feature-user/app/types/mock-user.ts
export type MockUser = {
  id: string
  userName: string
  email: string
  dept: string
  deptName: string
  role: string
  roleName: string
  isEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

export type MockUserSearchCriteria = {
  userName: string
  email: string
  page: number
  pageSize: number
}

export type MockPaged<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}
