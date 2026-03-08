<script setup lang="ts">
import { useUserDetailStore } from '@/stores/userDetail'

const route = useRoute()
const store = useUserDetailStore()

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
        <dt>ユーザ名</dt>
        <dd>
          <Input v-model="store.form.userName" />
        </dd>
      </div>
      <div class="detail-kv-row">
        <dt>メールアドレス</dt>
        <dd>
          <Input v-model="store.form.email" />
        </dd>
      </div>
      <div class="detail-kv-row">
        <dt>所属</dt>
        <dd>
          <NativeSelect
            v-model="store.form.dept"
            class="min-w-40"
          >
            <NativeSelectOption value="1">
              本社
            </NativeSelectOption>
            <NativeSelectOption value="2">
              大阪支店
            </NativeSelectOption>
          </NativeSelect>
        </dd>
      </div>
      <div class="detail-kv-row">
        <dt>役職</dt>
        <dd>
          <NativeSelect
            v-model="store.form.role"
            class="min-w-40"
          >
            <NativeSelectOption value="1">
              管理者
            </NativeSelectOption>
            <NativeSelectOption value="2">
              一般
            </NativeSelectOption>
          </NativeSelect>
        </dd>
      </div>
      <div class="detail-kv-row">
        <dt>ステータス</dt>
        <dd>
          <RadioGroup default-value="1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem
                id="r1"
                value="1"
              />
              <Label for="r2">有効</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem
                id="r2"
                value="2"
              />
              <Label for="r3">無効</Label>
            </div>
          </RadioGroup>
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
