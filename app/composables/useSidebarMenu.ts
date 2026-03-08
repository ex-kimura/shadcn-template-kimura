// app/composables/useSidebarMenu.ts
import type { SidebarConfig, SidebarGroup, SidebarItem } from '~/types/sidebar'

export type UiSidebarChild = {
  id: string
  title: string
  url: string
  orderId: number
}

export type UiSidebarItem = {
  id: string
  title: string
  icon?: string
  url?: string
  orderId: number
  children?: UiSidebarChild[]
}

export type UiSidebarGroup = {
  id: string
  label: string
  icon?: string // ★ 追加: グループアイコンも渡す
  orderId: number
  items: UiSidebarItem[]
}

function byOrderThenId<T extends { orderId: number, id: string }>(a: T, b: T) {
  return a.orderId - b.orderId || a.id.localeCompare(b.id)
}

function inferGroupId(itemId: string) {
  const i = itemId.indexOf(':')
  return i > 0 ? itemId.slice(0, i) : 'main'
}

export function useSidebarMenu() {
  const appConfig = useAppConfig()

  return computed<UiSidebarGroup[]>(() => {
    const sidebar = (appConfig.sidebar ?? {}) as SidebarConfig

    const groupsRec = (sidebar.groups ?? {}) as Record<string, SidebarGroup>
    const itemsRec = (sidebar.items ?? {}) as Record<string, SidebarItem>

    // groups: record -> array
    const groups: UiSidebarGroup[] = Object.values(groupsRec)
      .map(g => ({
        id: g.id,
        label: g.label,
        icon: g.icon, // ★ ここが抜けてるとグループアイコンが出ない
        orderId: g.orderId ?? 0,
        items: [],
      }))
      .sort(byOrderThenId)

    // groupMap
    const groupMap = new Map<string, UiSidebarGroup>()
    for (const g of groups) groupMap.set(g.id, g)

    // items を group に振り分け
    for (const it of Object.values(itemsRec)) {
      const groupId = it.groupId ?? inferGroupId(it.id)

      // items が参照する group が未定義なら仮グループを作る（末尾）
      if (!groupMap.has(groupId)) {
        const fallback: UiSidebarGroup = {
          id: groupId,
          label: groupId, // 未定義のときはIDを表示
          icon: undefined,
          orderId: 9999,
          items: [],
        }
        groups.push(fallback)
        groupMap.set(groupId, fallback)
      }

      const childrenArr = it.children
        ? Object.values(it.children)
            .map(c => ({
              id: c.id,
              title: c.title,
              url: c.url,
              orderId: c.orderId ?? 0,
            }))
            .sort(byOrderThenId)
        : undefined

      groupMap.get(groupId)!.items.push({
        id: it.id,
        title: it.title,
        icon: it.icon,
        url: it.url,
        orderId: it.orderId ?? 0,
        children: childrenArr,
      })
    }

    // 各 group 内を sort
    for (const g of groups) {
      g.items.sort(byOrderThenId)
    }

    // group 自体も sort（仮グループが追加されることがあるため）
    groups.sort(byOrderThenId)

    // 空グループを消す
    return groups.filter(g => g.items.length > 0)
  })
}
