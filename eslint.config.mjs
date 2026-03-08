// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // shadcn-vueコンポーネントは自動整形除外
  {
    ignores: [
      'app/components/ui/**',
    ],
  },
  // カスタムルール
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
)
