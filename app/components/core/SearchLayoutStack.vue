<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isMdUp = useMediaQuery('(min-width: 768px)')
const filterOpen = ref(false)
const searchAccordionValue = ref<string | undefined>(undefined)

function openFilter() {
  filterOpen.value = true
}

function closeSearch() {
  filterOpen.value = false
  searchAccordionValue.value = undefined
}
</script>

<template>
  <div
    v-if="isMdUp"
    class="flex h-full min-h-0 flex-col overflow-hidden"
  >
    <div class="shrink-0 border-b bg-background">
      <Accordion
        type="single"
        collapsible
        :model-value="searchAccordionValue"
        @update:model-value="searchAccordionValue = $event"
      >
        <AccordionItem
          value="search"
          class="border-b-0"
        >
          <AccordionTrigger class="h-10 items-center px-4 py-0 hover:no-underline [&>svg]:translate-y-0 mr-2">
            <CoreSectionSearchTitle
              title="検索条件"
              icon="lucide:search"
            />
          </AccordionTrigger>
          <AccordionContent class="pb-4">
            <slot
              name="search"
              :close-search="closeSearch"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div class="flex-1 min-h-0 bg-background">
      <CoreSearchLayoutContentFrame body-class="overflow-hidden">
        <slot
          name="result"
          :open-filter="openFilter"
        />
        <template #footer>
          <slot name="footer" />
        </template>
      </CoreSearchLayoutContentFrame>
    </div>
  </div>

  <div
    v-else
    class="flex h-full min-h-0 flex-col overflow-hidden"
  >
    <div class="flex-1 min-h-0 overflow-y-auto bg-background">
      <slot
        name="result"
        :open-filter="openFilter"
      />
    </div>

    <Sheet v-model:open="filterOpen">
      <SheetContent
        side="bottom"
        class="max-h-[85dvh]"
      >
        <SheetHeader class="h-12 border-b">
          <CoreSectionSearchTitle
            title="検索条件"
            icon="lucide:search"
          />
        </SheetHeader>

        <div class="overflow-auto px-4 pb-4">
          <slot
            name="search"
            :close-search="closeSearch"
          />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
