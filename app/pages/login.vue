<script setup lang="ts">
import { Mail, Apple, Chrome } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
})

const { login } = useAuth()

const onLogin = async () => {
  console.log('onLogin')
  login()
  await navigateTo('/')
}
</script>

<template>
  <div class="min-h-dvh bg-neutral-100 flex items-center justify-center">
    <Card class="w-full max-w-md m-4">
      <CardContent>
        <form
          class="p-6 md:p-8"
        >
          <FieldGroup>
            <div class="flex flex-col items-center gap-2 text-center">
              <h1 class="text-2xl font-bold">
                ログイン画面
              </h1>
              <p class="text-muted-foreground text-balance">
                Login to your account
              </p>
            </div>
            <Field>
              <FieldLabel for="loginId">
                ログインID
              </FieldLabel>
              <Input
                id="loginId"
                placeholder="xxxx@example.com"
                required
              />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password">
                  パスワード
                </FieldLabel>
                <a
                  href="#"
                  class="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  パスワード忘れの場合
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
              />
            </Field>
            <Field>
              <Button
                type="button"
                @click="onLogin"
              >
                ログイン
              </Button>
            </Field>
            <FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
            <Field class="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                type="button"
                class="flex items-center justify-center"
              >
                <Apple class="h-4 w-4" />
                <span class="sr-only">Login with Apple</span>
              </Button>

              <Button
                variant="outline"
                type="button"
                class="flex items-center justify-center"
              >
                <Chrome class="h-4 w-4" />
                <span class="sr-only">Login with Google</span>
              </Button>

              <Button
                variant="outline"
                type="button"
                class="flex items-center justify-center"
              >
                <Mail class="h-4 w-4" />
                <span class="sr-only">Login with Email</span>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
