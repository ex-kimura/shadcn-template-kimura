import { CORE } from '@/constants/core'

export const usePageTitle = (title?: string) => {
  const pageTitle = useState<string>('pageTitle', () => '')

  pageTitle.value = title || ''

  const fullTitle = title ? `${title} | ${CORE.name}` : CORE.name

  useHead({
    title: fullTitle,
  })
}
