// composables/useDateFormatJa.ts
export type DateInput = Date | string | number | null | undefined

export type DateFormatOptions = {
  /**
   * 出力フォーマット（デフォルト: 'YYYY/MM/DD HH:mm'）
   * 例: 'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY/MM/DD HH:mm:ss'
   */
  format?: string
  /**
   * 不正な日付だった場合の返却値
   */
  fallback?: string
  /**
   * タイムゾーン（既定: 'Asia/Tokyo'）
   */
  timeZone?: string
}

type DateParts = {
  YYYY: string
  MM: string
  DD: string
  HH: string
  mm: string
  ss: string
}

function parseToDate(input: DateInput): Date | null {
  if (input == null) return null
  if (input instanceof Date) return Number.isNaN(input.getTime()) ? null : input

  const d = new Date(input)
  return Number.isNaN(d.getTime()) ? null : d
}

/**
 * Intlで timeZone 指定したい場合に、指定TZの “各パーツ” を取り出す
 */
function getPartsInTimeZone(date: Date, timeZone: string): DateParts {
  const dtf = new Intl.DateTimeFormat('ja-JP', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })

  const parts = dtf.formatToParts(date)
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find(p => p.type === type)?.value ?? ''

  return {
    YYYY: pick('year'),
    MM: pick('month'),
    DD: pick('day'),
    HH: pick('hour'),
    mm: pick('minute'),
    ss: pick('second'),
  }
}

function formatWithTokens(p: DateParts, pattern: string) {
  // replaceAll を使わず、型エラー/ターゲット差異を回避
  return pattern
    .replace(/YYYY/g, p.YYYY)
    .replace(/MM/g, p.MM)
    .replace(/DD/g, p.DD)
    .replace(/HH/g, p.HH)
    .replace(/mm/g, p.mm)
    .replace(/ss/g, p.ss)
}

export function useDateFormatJa() {
  function formatDate(input: DateInput, opts: DateFormatOptions = {}) {
    const {
      format = 'YYYY/MM/DD HH:mm',
      fallback = '',
      timeZone = 'Asia/Tokyo',
    } = opts

    const d = parseToDate(input)
    if (!d) return fallback

    const parts = getPartsInTimeZone(d, timeZone)
    return formatWithTokens(parts, format)
  }

  const ymd = (input: DateInput, fallback = '') =>
    formatDate(input, { format: 'YYYY/MM/DD', fallback })

  const ymdHm = (input: DateInput, fallback = '') =>
    formatDate(input, { format: 'YYYY/MM/DD HH:mm', fallback })

  const ymdHms = (input: DateInput, fallback = '') =>
    formatDate(input, { format: 'YYYY/MM/DD HH:mm:ss', fallback })

  return { formatDate, ymd, ymdHm, ymdHms }
}
