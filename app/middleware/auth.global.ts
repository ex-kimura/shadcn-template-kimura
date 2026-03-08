// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, loginRequired } = useAuth()

  // loginページは除外
  if (to.path === '/login') return

  // ログイン不要なら通す
  if (!loginRequired) return

  // 未ログインならログインへ
  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
