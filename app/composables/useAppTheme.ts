export type AppTheme = 'default' | 'green'

const STORAGE_KEY = 'app-theme'
const THEME_CLASS_MAP: Record<AppTheme, string> = {
  default: 'theme-default',
  green: 'theme-green',
}

const isAppTheme = (value: unknown): value is AppTheme => {
  return value === 'default' || value === 'green'
}

const applyThemeClass = (theme: AppTheme) => {
  if (!import.meta.client)
    return

  const root = document.documentElement
  Object.values(THEME_CLASS_MAP).forEach((className) => {
    root.classList.remove(className)
  })
  root.classList.add(THEME_CLASS_MAP[theme])
}

export function useAppTheme() {
  const themeState = useState<AppTheme>('app-theme', () => 'green')
  const isHydrated = useState<boolean>('app-theme-hydrated', () => false)

  if (import.meta.client && !isHydrated.value) {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isAppTheme(saved))
      themeState.value = saved

    applyThemeClass(themeState.value)
    isHydrated.value = true
  }

  const setTheme = (theme: AppTheme) => {
    themeState.value = theme
    applyThemeClass(theme)
    if (import.meta.client)
      localStorage.setItem(STORAGE_KEY, theme)
  }

  return {
    theme: computed<AppTheme>(() => themeState.value),
    setTheme,
  }
}
