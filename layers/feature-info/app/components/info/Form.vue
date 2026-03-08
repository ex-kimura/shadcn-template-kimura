<script setup lang="ts">
import { useInfoDetailStore } from '@/stores/infoDetail'

const route = useRoute()
const store = useInfoDetailStore()

onMounted(async () => {
  const id = String(route.params.id)
  // 編集用（データ取得）
  if (id) {
    await store.fetch(id)
  }
  // 新規登録用（空データ初期化）
  else {
    store.initNew()
  }
})
</script>

<template>
  <div>
    <dl class="themed-form-surface detail-kv detail-kv--edit">
      <div class="detail-kv-row">
        <dt>タイトル</dt>
        <dd>
          <Input v-model="store.form.title" />
        </dd>
      </div>
      <div class="detail-kv-row">
        <dt>本文</dt>
        <dd>
          <Input v-model="store.form.body" />
        </dd>
      </div>
      <div class="detail-kv-row">
        <dt>カテゴリ</dt>
        <dd>
          <NativeSelect
            v-model="store.form.category"
            class="min-w-40"
          >
            <NativeSelectOption value="1">
              重要
            </NativeSelectOption>
            <NativeSelectOption value="2">
              お知らせ
            </NativeSelectOption>
          </NativeSelect>
        </dd>
      </div>
    </dl>
  </div>
</template>

<style lang="css" scoped>
.detail-kv-row > dt {
  min-width: 140px;
}
</style>
