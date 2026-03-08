export type AppFontSize = 'small' | 'middle' | 'large'

const STORAGE_KEY = 'app-font-size'
const FONT_SIZE_CLASS_MAP: Record<AppFontSize, string> = {
  small: 'font-size-small',
  middle: 'font-size-middle',
  large: 'font-size-large',
}

const isAppFontSize = (value: unknown): value is AppFontSize => {
  return value === 'small' || value === 'middle' || value === 'large'
}

const applyFontSizeClass = (fontSize: AppFontSize) => {
  if (!import.meta.client)
    return

  const root = document.documentElement
  Object.values(FONT_SIZE_CLASS_MAP).forEach((className) => {
    root.classList.remove(className)
  })
  root.classList.add(FONT_SIZE_CLASS_MAP[fontSize])
}

export function useAppFontSize() {
  const fontSizeState = useState<AppFontSize>('app-font-size', () => 'middle')
  const isHydrated = useState<boolean>('app-font-size-hydrated', () => false)

  if (import.meta.client && !isHydrated.value) {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isAppFontSize(saved))
      fontSizeState.value = saved

    applyFontSizeClass(fontSizeState.value)
    isHydrated.value = true
  }

  const setFontSize = (fontSize: AppFontSize) => {
    fontSizeState.value = fontSize
    applyFontSizeClass(fontSize)
    if (import.meta.client)
      localStorage.setItem(STORAGE_KEY, fontSize)
  }

  return {
    fontSize: computed<AppFontSize>(() => fontSizeState.value),
    setFontSize,
  }
}
