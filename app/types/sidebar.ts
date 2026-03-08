// app/types/sidebar.ts
export type SidebarGroup = {
  id: string
  label: string
  icon?: string // ★ 追加: "lucide:users" など
  orderId?: number
}

export type SidebarChild = {
  id: string
  title: string
  url: string
  orderId?: number
}

export type SidebarItem = {
  id: string
  title: string
  icon?: string // "lucide:users"
  url?: string
  groupId?: string
  orderId?: number
  children?: Record<string, SidebarChild>
}

export type SidebarConfig = {
  groups?: Record<string, SidebarGroup>
  items?: Record<string, SidebarItem>
}
