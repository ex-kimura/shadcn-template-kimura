<script setup lang="ts">
const props = defineProps<{
  name?: string
  class?: string
}>()
</script>

<template>
  <Icon
    v-if="props.name"
    :name="props.name"
    :class="props.class"
  />
</template>
