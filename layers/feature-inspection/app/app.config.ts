export default defineAppConfig({
  sidebar: {
    groups: {
      'feature-inspection': {
        id: 'feature-inspection',
        label: '画像検査',
        icon: 'lucide:scan-search',
        orderId: 25,
      },
      'feature-inspection-master': {
        id: 'feature-inspection-master',
        label: '検査マスタ',
        icon: 'lucide:settings-2',
        orderId: 26,
      },
    },
    items: {
      'feature-inspection:inspection-run': {
        id: 'feature-inspection:inspection-run',
        groupId: 'feature-inspection',
        title: '検査実行',
        url: '/inspection',
        orderId: 1,
      },
      'feature-inspection:inspection-history': {
        id: 'feature-inspection:inspection-history',
        groupId: 'feature-inspection',
        title: '検査履歴',
        url: '/inspection-history',
        orderId: 2,
      },

      'feature-inspection-master:template-index': {
        id: 'feature-inspection-master:template-index',
        groupId: 'feature-inspection-master',
        title: 'テンプレート画像一覧',
        url: '/inspection-template',
        orderId: 1,
      },
      'feature-inspection-master:template-new': {
        id: 'feature-inspection-master:template-new',
        groupId: 'feature-inspection-master',
        title: 'テンプレート画像登録',
        url: '/inspection-template/new',
        orderId: 2,
      },
      'feature-inspection-master:category-index': {
        id: 'feature-inspection-master:category-index',
        groupId: 'feature-inspection-master',
        title: '検査カテゴリ一覧',
        url: '/inspection-category',
        orderId: 3,
      },
      'feature-inspection-master:category-new': {
        id: 'feature-inspection-master:category-new',
        groupId: 'feature-inspection-master',
        title: '検査カテゴリ登録',
        url: '/inspection-category/new',
        orderId: 4,
      },
    },
  },
})
