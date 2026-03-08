// layers/feature-info/app/app.config.ts
export default defineAppConfig({
  sidebar: {
    groups: {
      'feature-info': {
        id: 'feature-info',
        label: 'お知らせ管理',
        icon: 'lucide:badge-info',
        orderId: 20,
      },
    },

    items: {
      'feature-info:info-index': {
        id: 'feature-info:info-index',
        groupId: 'feature-info',
        title: '一覧',
        url: '/info',
        orderId: 1,
      },
      'feature-info:info-new': {
        id: 'feature-info:info-new',
        groupId: 'feature-info',
        title: '新規登録',
        url: '/info/new',
        orderId: 2,
      },
    },
  },
})
