<!-- app/components/core/CoreSidebarContent.vue -->
<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown, HelpCircle, LogOut, Settings } from 'lucide-vue-next'
import { useSidebarMenu } from '@/composables/useSidebarMenu'
import { CORE } from '@/constants/core'

const props = defineProps<{
  onNavigate?: () => void
}>()

const route = useRoute()
const groups = useSidebarMenu()

const openGroups = useState<Record<string, boolean>>('ui:sidebar:openGroups', () => ({}))
const openItems = useState<Record<string, boolean>>('ui:sidebar:openItems', () => ({}))

const menuUrls = computed(() => {
  const urls = new Set<string>()
  for (const g of groups.value) {
    for (const it of g.items) {
      if (it.url) urls.add(it.url)
      for (const c of it.children ?? []) {
        if (c.url) urls.add(c.url)
      }
    }
  }
  return urls
})

function isActiveUrl(url?: string) {
  if (!url) return false
  if (route.path === url) return true
  if (url === '/') return false

  // If current route exactly matches any menu URL, only that exact item is active.
  if (menuUrls.value.has(route.path)) return false

  // Otherwise treat descendants as active on parent menu (e.g. /info/{id}/edit -> /info)
  return route.path.startsWith(url + '/')
}

function isGroupOpen(id: string) {
  return openGroups.value[id] ?? false
}
function toggleGroup(id: string) {
  openGroups.value[id] = !isGroupOpen(id)
}

function isItemOpen(id: string) {
  return openItems.value[id] ?? false
}
function toggleItem(id: string) {
  openItems.value[id] = !isItemOpen(id)
}
function isItemActive(item: { url?: string, children?: Array<{ url: string }> }) {
  return isActiveUrl(item.url) || (item.children?.some(c => isActiveUrl(c.url)) ?? false)
}

function handleNavigate() {
  props.onNavigate?.()
}

// アクティブを含む group/item は初回だけ自動で開く
watchEffect(() => {
  for (const g of groups.value) {
    const groupHasActive = g.items.some(
      it => isActiveUrl(it.url) || (it.children?.some(c => isActiveUrl(c.url)) ?? false),
    )
    if (groupHasActive && openGroups.value[g.id] === undefined) openGroups.value[g.id] = true

    for (const it of g.items) {
      const activeInChildren = it.children?.some(c => isActiveUrl(c.url)) ?? false
      if (activeInChildren && openItems.value[it.id] === undefined) openItems.value[it.id] = true
    }
  }
})
</script>

<template>
  <div class="hidden h-12 shrink-0 items-center border-b border-sidebar-border px-4 text-sm font-bold md:flex">
    <NuxtLink to="/">
      {{ CORE.name }}
    </NuxtLink>
  </div>
  <div class="flex h-full flex-col bg-sidebar text-sm md:h-[calc(100%-3rem)]">
    <div class="flex-1 overflow-y-auto overflow-x-hidden py-2">
      <nav class="px-2 space-y-4">
        <div
          v-for="group in groups"
          :key="group.id"
        >
          <!-- グループ見出し -->
          <button
            class="flex w-full items-center justify-between px-2 py-1 font-medium uppercase tracking-wider text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
            @click="toggleGroup(group.id)"
          >
            <span class="flex items-center gap-2 min-w-0">
              <CoreMenuIcon
                v-if="group.icon"
                :name="group.icon"
                class="h-4 w-4 shrink-0 text-sidebar-foreground/80"
              />
              <span class="truncate">{{ group.label }}</span>
            </span>

            <ChevronDown
              class="h-3 w-3 shrink-0 transition-transform duration-200"
              :class="isGroupOpen(group.id) ? 'rotate-0' : '-rotate-90'"
            />
          </button>

          <!-- グループ内 -->
          <div
            class="overflow-hidden transition-all duration-200"
            :class="isGroupOpen(group.id) ? 'max-h-96' : 'max-h-0'"
          >
            <div class="mt-1 ml-2 border-l border-sidebar-border/70 pl-2">
              <ul class="space-y-0.5">
                <li
                  v-for="item in group.items"
                  :key="item.id"
                >
                  <!-- 子なし（2階層） -->
                  <NuxtLink
                    v-if="!item.children?.length"
                    :to="item.url || '/'"
                    class="flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors whitespace-nowrap"
                    :class="isItemActive(item)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'"
                    @click="handleNavigate"
                  >
                    <CoreMenuIcon
                      :name="item.icon"
                      class="h-4 w-4 shrink-0 text-sidebar-foreground/70"
                    />
                    <span class="truncate">{{ item.title }}</span>
                  </NuxtLink>

                  <!-- 子あり（3階層） -->
                  <template v-else>
                    <button
                      class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors whitespace-nowrap"
                      :class="isItemActive(item)
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'"
                      @click="toggleItem(item.id)"
                    >
                      <CoreMenuIcon
                        :name="item.icon"
                        class="h-4 w-4 shrink-0 text-sidebar-foreground/70"
                      />
                      <span class="flex-1 text-left truncate">{{ item.title }}</span>
                      <ChevronDown
                        class="h-3.5 w-3.5 shrink-0 transition-transform duration-200 text-sidebar-foreground/60"
                        :class="isItemOpen(item.id) ? 'rotate-180' : 'rotate-0'"
                      />
                    </button>

                    <div
                      class="overflow-hidden transition-all duration-200"
                      :class="isItemOpen(item.id) ? 'max-h-48' : 'max-h-0'"
                    >
                      <ul class="mt-0.5 ml-2 border-l border-sidebar-border/70 pl-2 space-y-0.5">
                        <li
                          v-for="child in item.children"
                          :key="child.id"
                        >
                          <NuxtLink
                            :to="child.url"
                            class="flex items-center rounded-md px-2 py-1.5 transition-colors whitespace-nowrap"
                            :class="isActiveUrl(child.url)
                              ? 'text-sidebar-accent-foreground font-medium'
                              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'"
                            @click="handleNavigate"
                          >
                            {{ child.title }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- 下部固定 -->
    <div class="shrink-0 border-t border-sidebar-border p-2 space-y-0.5">
      <button
        class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors whitespace-nowrap"
        :class="isActiveUrl('/setting')
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'"
        @click="$router.push('/setting'); handleNavigate()"
      >
        <Settings class="h-4 w-4 shrink-0 text-sidebar-foreground/70" />
        <span>設定</span>
      </button>
      <button
        class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors whitespace-nowrap"
        :class="isActiveUrl('/help')
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'"
        @click="$router.push('/help'); handleNavigate()"
      >
        <HelpCircle class="h-4 w-4 shrink-0 text-sidebar-foreground/70" />
        <span>ヘルプ</span>
      </button>
      <button
        class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-colors whitespace-nowrap"
      >
        <LogOut class="h-4 w-4 shrink-0" />
        <span>ログアウト</span>
      </button>
    </div>
  </div>
</template>
