import type {
  InspectionCategory,
  InspectionHistory,
  InspectionHistorySearchCriteria,
  InspectionResult,
  InspectionTemplate,
} from '@/types/inspection'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function clone<T>(value: T): T {
  return structuredClone(value)
}

function now() {
  return new Date()
}

function asResult(score: number, thresholdOk: number, thresholdReview: number): InspectionResult {
  if (score >= thresholdOk) return 'ok'
  if (score >= thresholdReview) return 'review'
  return 'ng'
}

const CATEGORIES: InspectionCategory[] = [
  { id: 'CAT-A', name: 'Type A', isEnabled: true, createdAt: now(), updatedAt: now() },
  { id: 'CAT-B', name: 'Type B', isEnabled: true, createdAt: now(), updatedAt: now() },
]

const TEMPLATES: InspectionTemplate[] = [
  { id: 'TPL-A-001', name: 'Template A-1', categoryId: 'CAT-A', imageUrl: '/images/analyzer/template.png', thresholdOk: 0.85, thresholdReview: 0.7, isEnabled: true, createdAt: now(), updatedAt: now() },
  { id: 'TPL-A-002', name: 'Template A-2', categoryId: 'CAT-A', imageUrl: '/images/analyzer/template.png', thresholdOk: 0.82, thresholdReview: 0.68, isEnabled: true, createdAt: now(), updatedAt: now() },
  { id: 'TPL-A-003', name: 'Template A-3', categoryId: 'CAT-A', imageUrl: '/images/analyzer/template.png', thresholdOk: 0.8, thresholdReview: 0.65, isEnabled: true, createdAt: now(), updatedAt: now() },
  { id: 'TPL-B-001', name: 'Template B-1', categoryId: 'CAT-B', imageUrl: '/images/analyzer/template.png', thresholdOk: 0.85, thresholdReview: 0.7, isEnabled: true, createdAt: now(), updatedAt: now() },
  { id: 'TPL-B-002', name: 'Template B-2', categoryId: 'CAT-B', imageUrl: '/images/analyzer/template.png', thresholdOk: 0.82, thresholdReview: 0.68, isEnabled: true, createdAt: now(), updatedAt: now() },
  { id: 'TPL-B-003', name: 'Template B-3', categoryId: 'CAT-B', imageUrl: '/images/analyzer/template.png', thresholdOk: 0.8, thresholdReview: 0.65, isEnabled: true, createdAt: now(), updatedAt: now() },
]

const HISTORY: InspectionHistory[] = []

function scoreFor(templateId: string) {
  const bias = templateId.endsWith('1') ? 0.06 : templateId.endsWith('2') ? 0.03 : 0
  const value = Math.max(0.4, Math.min(0.99, Math.random() * 0.45 + 0.5 + bias))
  return Number(value.toFixed(4))
}

export const mockInspectionRepository = {
  async listCategories(enabledOnly = false): Promise<InspectionCategory[]> {
    await sleep(100)
    const rows = enabledOnly ? CATEGORIES.filter(x => x.isEnabled) : CATEGORIES
    return clone(rows)
  },

  async createCategory(input: Pick<InspectionCategory, 'name' | 'isEnabled'>): Promise<InspectionCategory> {
    await sleep(120)
    const created: InspectionCategory = {
      id: `CAT-${String(CATEGORIES.length + 1).padStart(3, '0')}`,
      name: input.name,
      isEnabled: input.isEnabled,
      createdAt: now(),
      updatedAt: now(),
    }
    CATEGORIES.unshift(created)
    return clone(created)
  },

  async listTemplates(enabledOnly = false): Promise<InspectionTemplate[]> {
    await sleep(100)
    const rows = enabledOnly ? TEMPLATES.filter(x => x.isEnabled) : TEMPLATES
    return clone(rows)
  },

  async createTemplate(input: Pick<InspectionTemplate, 'name' | 'categoryId' | 'imageUrl' | 'thresholdOk' | 'thresholdReview' | 'isEnabled'>): Promise<InspectionTemplate> {
    await sleep(120)
    const created: InspectionTemplate = {
      id: `TPL-${String(TEMPLATES.length + 1).padStart(4, '0')}`,
      name: input.name,
      categoryId: input.categoryId,
      imageUrl: input.imageUrl,
      thresholdOk: input.thresholdOk,
      thresholdReview: input.thresholdReview,
      isEnabled: input.isEnabled,
      createdAt: now(),
      updatedAt: now(),
    }
    TEMPLATES.unshift(created)
    return clone(created)
  },

  async runInspection(params: {
    sourceImageUrl: string
    categoryId: string
  }): Promise<InspectionHistory> {
    await sleep(240)
    const candidates = TEMPLATES.filter(t => t.categoryId === params.categoryId && t.isEnabled)
    if (!candidates.length) {
      throw new Error('No enabled templates in the selected category')
    }

    const scored = candidates
      .map(t => ({ template: t, score: scoreFor(t.id) }))
      .sort((a, b) => b.score - a.score)

    const best = scored[0]
    const category = CATEGORIES.find(x => x.id === params.categoryId)
    const result = asResult(best.score, best.template.thresholdOk, best.template.thresholdReview)
    const created: InspectionHistory = {
      id: `HIS-${String(HISTORY.length + 1).padStart(5, '0')}`,
      categoryId: params.categoryId,
      categoryName: category?.name ?? params.categoryId,
      templateId: best.template.id,
      templateName: best.template.name,
      score: Number(best.score.toFixed(4)),
      result,
      sourceImageUrl: params.sourceImageUrl,
      templateImageUrl: best.template.imageUrl,
      top3: scored.slice(0, 3).map(x => ({
        templateId: x.template.id,
        templateName: x.template.name,
        score: Number(x.score.toFixed(4)),
      })),
      createdAt: now(),
    }
    HISTORY.unshift(created)
    return clone(created)
  },

  async searchHistory(criteria: InspectionHistorySearchCriteria): Promise<InspectionHistory[]> {
    await sleep(120)
    let rows = HISTORY.slice()
    if (criteria.result) {
      rows = rows.filter(x => x.result === criteria.result)
    }
    if (criteria.dateFrom) {
      const from = new Date(`${criteria.dateFrom}T00:00:00`)
      rows = rows.filter(x => x.createdAt >= from)
    }
    if (criteria.dateTo) {
      const to = new Date(`${criteria.dateTo}T23:59:59`)
      rows = rows.filter(x => x.createdAt <= to)
    }
    rows.sort((a, b) => +b.createdAt - +a.createdAt)
    return clone(rows)
  },

  async findHistoryById(id: string): Promise<InspectionHistory> {
    await sleep(80)
    const found = HISTORY.find(x => x.id === id)
    if (!found) throw new Error('Not Found')
    return clone(found)
  },
}
