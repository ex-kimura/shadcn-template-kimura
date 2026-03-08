// layers/feature-user/lib/api/repositories/mock-user.repository.ts
import type { MockPaged, MockInfo, MockInfoSearchCriteria } from '@/types/mock-info'

// 疑似スリープ
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ダミーデータ作成
function makeDummyInfo(): MockInfo[] {
  const rows: MockInfo[] = []
  for (let i = 0; i < 100; i++) {
    const num = String(i + 1).padStart(4, '0')
    rows.push({
      id: num,
      title: 'ダミータイトル' + num,
      body: 'ダミー本文' + num,
      category: '重要',
      date: new Date('2026-02-02T10:00:00+09:00'),
      unread: true,
      isEnabled: true,
      createdAt: new Date('2026-02-02T10:00:00+09:00'),
      updatedAt: new Date('2026-02-02T10:00:00+09:00'),
    })
  }
  return rows
}

// 1回だけ生成して保持（regist/remove で永続する）
const DUMMY_INFO: MockInfo[] = makeDummyInfo()

function toRegistPayload(u: MockInfo) {
  return {
    id: u.id,
    title: u.title,
    body: u.body,
    category: u.category,
    date: u.date,
    unread: u.unread,
  }
}

/**
 * メイン処理
 */
export const mockInfoRepository = {
  /**
   * 条件検索API
   * @TODO 本来はAPI呼び出しを実装
   */
  async search(criteria: MockInfoSearchCriteria): Promise<MockPaged<MockInfo>> {
    await sleep(200)
    const page = Math.max(1, Number(criteria.page || 1))
    const pageSize = Math.max(1, Number(criteria.pageSize || 10))
    let rows = DUMMY_INFO.slice()
    if (criteria.title?.trim()) {
      const kw = criteria.title.trim()
      rows = rows.filter(x => x.title.includes(kw))
    }
    if (criteria.body?.trim()) {
      const kw = criteria.body.trim()
      rows = rows.filter(x => x.body.includes(kw))
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
  async findById(id: string): Promise<MockInfo> {
    await sleep(150)
    const found = DUMMY_INFO.find(x => x.id === id)
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
  async regist(user: MockInfo): Promise<MockInfo> {
    await sleep(200)
    const payload = toRegistPayload(user)
    if (!payload.id) {
      const newId = `DUMMY-${String(DUMMY_INFO.length + 1).padStart(4, '0')}`
      const now = new Date()
      const created: MockInfo = {
        ...user,
        id: newId,
        date: now,
      }
      DUMMY_INFO.unshift(created)
      return structuredClone(created)
    }
    const idx = DUMMY_INFO.findIndex(x => x.id === payload.id)
    if (idx === -1) {
      const e = new Error('Not Found')
      ;(e as any).statusCode = 404
      throw e
    }
    const next: MockInfo = {
      ...DUMMY_INFO[idx],
      ...user,
      date: new Date(),
    }
    DUMMY_INFO[idx] = next
    return structuredClone(next)
  },

  /**
   * 削除API
   * @TODO 本来はAPI呼び出しを実装
   */
  async remove(id: string): Promise<void> {
    await sleep(150)
    const idx = DUMMY_INFO.findIndex(x => x.id === id)
    if (idx === -1) return
    DUMMY_INFO.splice(idx, 1)
  },
}
