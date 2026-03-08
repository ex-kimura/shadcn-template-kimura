import type { InspectionResult } from '@/types/inspection'

export function useInspectionResult() {
  const labelOf = (result: InspectionResult) => {
    if (result === 'ok') return 'OK'
    if (result === 'review') return '要確認'
    return 'NG'
  }

  const classOf = (result: InspectionResult) => {
    if (result === 'ok') return 'bg-foreground text-background'
    if (result === 'review') return 'bg-amber-500 text-white'
    return 'bg-destructive text-white'
  }

  return { labelOf, classOf }
}
