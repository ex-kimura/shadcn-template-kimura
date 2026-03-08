// layers/feature-user/app/app.config.ts
export default defineAppConfig({
  sidebar: {
    groups: {
      'feature-user': {
        id: 'feature-user',
        label: 'ユーザ管理',
        icon: 'lucide:users',
        orderId: 20,
      },
    },

    items: {
      'feature-user:users-index': {
        id: 'feature-user:users-index',
        groupId: 'feature-user',
        title: '一覧',
        url: '/users',
        orderId: 1,
      },
      'feature-user:users-new': {
        id: 'feature-user:users-new',
        groupId: 'feature-user',
        title: '新規登録',
        url: '/users/new',
        orderId: 2,
      },
    },
  },
})
