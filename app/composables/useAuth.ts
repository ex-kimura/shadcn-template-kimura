// composables/useAuth.ts
import { computed } from 'vue'

// アプリとしてログイン必須かどうか（固定）
const LOGIN_REQUIRED = false

export const useAuth = () => {
  // ★ Nuxt composable は必ず関数内で呼ぶ
  const loggedIn = useState<boolean>('auth:loggedIn', () => false)

  const isLoggedIn = computed(() => loggedIn.value)

  const login = () => {
    loggedIn.value = true
  }

  const logout = () => {
    loggedIn.value = false
  }

  return {
    loginRequired: LOGIN_REQUIRED,
    isLoggedIn,
    login,
    logout,
  }
}
