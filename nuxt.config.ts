// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    './layers/feature-user',
    './layers/feature-info',
    './layers/feature-inventory',
    './layers/feature-inspection',
  ],

  // モジュール一覧
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/content',
  ],
  // SPAモード固定
  ssr: false,
  // DevTool
  devtools: { enabled: false }, app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
        },
      ],
    },
  },
  // CSS
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css',
    '@/assets/css/form.css',
    '@/assets/css/detail.css',
  ],
  // darkモード関連（ダークモードインストール時に追加したもの）
  colorMode: {
    preference: 'dark', // 保存が無い初回は必ず dark
    fallback: 'dark', // 判定不能時も dark
    classSuffix: '',
  },
  // 外部アクセス許可
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  // Nitroランタイムの互換日付固定
  compatibilityDate: '2025-07-15',
  // ESlintだけで自動整形させる
  eslint: {
    config: {
      stylistic: true,
    },
  },
  // フォントファミリー
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Noto Sans JP', provider: 'google' },
    ],
  },
  // shadcn-vueの設定（コンソール警告を抑制）
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
})
