import type { SearchLayoutMode } from '@/components/core/SearchLayoutShell.vue'

const STORAGE_KEY = 'search-layout-mode'

const isSearchLayoutMode = (value: unknown): value is SearchLayoutMode => {
  return value === 'split' || value === 'stack'
}

export function useSearchLayoutMode() {
  const modeState = useState<SearchLayoutMode>('search-layout-mode', () => 'split')
  const isHydrated = useState<boolean>('search-layout-mode-hydrated', () => false)

  if (import.meta.client && !isHydrated.value) {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isSearchLayoutMode(saved))
      modeState.value = saved
    isHydrated.value = true
  }

  const setMode = (nextMode: SearchLayoutMode) => {
    modeState.value = nextMode
    if (import.meta.client)
      localStorage.setItem(STORAGE_KEY, nextMode)
  }

  return {
    mode: computed<SearchLayoutMode>(() => modeState.value),
    setMode,
  }
}
