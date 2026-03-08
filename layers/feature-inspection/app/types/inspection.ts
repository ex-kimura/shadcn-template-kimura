export type InspectionResult = 'ok' | 'review' | 'ng'

export type InspectionCategory = {
  id: string
  name: string
  isEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

export type InspectionTemplate = {
  id: string
  name: string
  categoryId: string
  imageUrl: string
  thresholdOk: number
  thresholdReview: number
  isEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

export type InspectionTopMatch = {
  templateId: string
  templateName: string
  score: number
}

export type InspectionHistory = {
  id: string
  categoryId: string
  categoryName: string
  templateId: string
  templateName: string
  score: number
  result: InspectionResult
  sourceImageUrl: string
  templateImageUrl: string
  top3: InspectionTopMatch[]
  createdAt: Date
}

export type InspectionHistorySearchCriteria = {
  result?: InspectionResult
  dateFrom?: string
  dateTo?: string
}
