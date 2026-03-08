<script setup lang="ts">
const imageUrl = defineModel<string>('imageUrl', { default: '' })
const fileName = ref('')

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  fileName.value = file.name

  const reader = new FileReader()
  reader.onload = () => {
    imageUrl.value = String(reader.result ?? '')
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="space-y-4">
    <div class="themed-form-surface rounded-md border border-border p-4">
      <Label for="inspection-upload">画像選択</Label>
      <Input
        id="inspection-upload"
        type="file"
        accept="image/*"
        capture="environment"
        class="mt-2"
        @change="onFileChange"
      />
    </div>

    <div
      v-if="imageUrl"
      class="themed-form-surface rounded-md border border-border p-4"
    >
      <p class="mb-2 text-sm font-medium">
        Preview: {{ fileName }}
      </p>
      <img
        :src="imageUrl"
        alt="uploaded image preview"
        class="max-h-80 w-full rounded-md object-contain"
      >
    </div>
  </div>
</template>
