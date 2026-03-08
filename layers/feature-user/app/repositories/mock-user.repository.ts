// layers/feature-user/lib/api/repositories/mock-user.repository.ts
import type { MockPaged, MockUser, MockUserSearchCriteria } from '@/types/mock-user'

// 疑似スリープ
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ダミーデータ作成
function makeDummyUsers(): MockUser[] {
  const rows: MockUser[] = []
  for (let i = 0; i < 100; i++) {
    const num = String(i + 1).padStart(4, '0')
    rows.push({
      id: num,
      userName: 'ダミーユーザ' + num,
      email: 'dummy.user.' + num + '@example.com',
      dept: '1',
      deptName: '大阪支店',
      role: '1',
      roleName: '一般',
      isEnabled: true,
      createdAt: new Date('2026-02-02T10:00:00+09:00'),
      updatedAt: new Date('2026-02-21T12:00:00+09:00'),
    })
  }
  return rows
}

// 1回だけ生成して保持（regist/remove で永続する）
const DUMMY_USERS: MockUser[] = makeDummyUsers()

function toRegistPayload(u: MockUser) {
  return {
    id: u.id,
    userName: u.userName,
    email: u.email,
    dept: u.dept,
    deptName: u.deptName,
    role: u.role,
    roleName: u.roleName,
    isEnabled: u.isEnabled,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }
}

/**
 * メイン処理
 */
export const mockUserRepository = {
  /**
   * 条件検索API
   * @TODO 本来はAPI呼び出しを実装
   */
  async search(criteria: MockUserSearchCriteria): Promise<MockPaged<MockUser>> {
    await sleep(200)
    const page = Math.max(1, Number(criteria.page || 1))
    const pageSize = Math.max(1, Number(criteria.pageSize || 10))
    let rows = DUMMY_USERS.slice()
    if (criteria.userName?.trim()) {
      const kw = criteria.userName.trim()
      rows = rows.filter(x => x.userName.includes(kw))
    }
    if (criteria.email?.trim()) {
      const kw = criteria.email.trim()
      rows = rows.filter(x => x.email.includes(kw))
    }
    const total = rows.length
    const start = (page - 1) * pageSize
    const items = rows.slice(start, start + pageSize)
    return { items, total, page, pageSize }
  },

  /**
   * １件取得API
   * @TODO 本来はAPI呼び出しを実装
   */
  async findById(id: string): Promise<MockUser> {
    await sleep(150)
    const found = DUMMY_USERS.find(x => x.id === id)
    if (!found) {
      const e = new Error('Not Found')
      ;(e as any).statusCode = 404
      throw e
    }
    return structuredClone(found)
  },

  /**
   * 登録API
   * @TODO 本来はAPI呼び出しを実装
   */
  async regist(user: MockUser): Promise<MockUser> {
    await sleep(200)
    const payload = toRegistPayload(user)
    if (!payload.id) {
      const newId = `DUMMY-${String(DUMMY_USERS.length + 1).padStart(4, '0')}`
      const now = new Date()
      const created: MockUser = {
        ...user,
        id: newId,
        createdAt: now,
        updatedAt: now,
      }
      DUMMY_USERS.unshift(created)
      return structuredClone(created)
    }
    const idx = DUMMY_USERS.findIndex(x => x.id === payload.id)
    if (idx === -1) {
      const e = new Error('Not Found')
      ;(e as any).statusCode = 404
      throw e
    }
    const next: MockUser = {
      ...DUMMY_USERS[idx],
      ...user,
      updatedAt: new Date(),
    }
    DUMMY_USERS[idx] = next
    return structuredClone(next)
  },

  /**
   * 削除API
   * @TODO 本来はAPI呼び出しを実装
   */
  async remove(id: string): Promise<void> {
    await sleep(150)
    const idx = DUMMY_USERS.findIndex(x => x.id === id)
    if (idx === -1) return
    DUMMY_USERS.splice(idx, 1)
  },
}
