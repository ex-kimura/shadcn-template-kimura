export default defineAppConfig({
  sidebar: {
    groups: {
      'feature-inventory': {
        id: 'feature-inventory',
        label: '在庫',
        icon: 'lucide:boxes',
        orderId: 30,
      },
      'feature-stock': {
        id: 'feature-stock',
        label: '入出庫',
        icon: 'lucide:arrow-right-left',
        orderId: 40,
      },
      'feature-product': {
        id: 'feature-product',
        label: '商品マスタ',
        icon: 'lucide:package',
        orderId: 50,
      },
      'feature-supplier': {
        id: 'feature-supplier',
        label: '仕入先マスタ',
        icon: 'lucide:building-2',
        orderId: 60,
      },
      'feature-warehouse': {
        id: 'feature-warehouse',
        label: '倉庫マスタ',
        icon: 'lucide:warehouse',
        orderId: 70,
      },
      'feature-inventory-report': {
        id: 'feature-inventory-report',
        label: '分析・通知',
        icon: 'lucide:chart-column',
        orderId: 80,
      },
    },

    items: {
      'feature-inventory:inventory-index': {
        id: 'feature-inventory:inventory-index',
        groupId: 'feature-inventory',
        title: '在庫一覧',
        url: '/inventory',
        orderId: 1,
      },
      'feature-inventory:inventory-new': {
        id: 'feature-inventory:inventory-new',
        groupId: 'feature-inventory',
        title: '在庫新規登録',
        url: '/inventory/new',
        orderId: 2,
      },
      'feature-inventory:stocktake-index': {
        id: 'feature-inventory:stocktake-index',
        groupId: 'feature-inventory',
        title: '棚卸一覧',
        url: '/stocktake',
        orderId: 3,
      },
      'feature-inventory:stocktake-new': {
        id: 'feature-inventory:stocktake-new',
        groupId: 'feature-inventory',
        title: '棚卸登録',
        url: '/stocktake/new',
        orderId: 4,
      },

      'feature-stock:stock-in-index': {
        id: 'feature-stock:stock-in-index',
        groupId: 'feature-stock',
        title: '入庫一覧',
        url: '/stock-in',
        orderId: 1,
      },
      'feature-stock:stock-in-new': {
        id: 'feature-stock:stock-in-new',
        groupId: 'feature-stock',
        title: '入庫登録',
        url: '/stock-in/new',
        orderId: 2,
      },
      'feature-stock:stock-out-index': {
        id: 'feature-stock:stock-out-index',
        groupId: 'feature-stock',
        title: '出庫一覧',
        url: '/stock-out',
        orderId: 3,
      },
      'feature-stock:stock-out-new': {
        id: 'feature-stock:stock-out-new',
        groupId: 'feature-stock',
        title: '出庫登録',
        url: '/stock-out/new',
        orderId: 4,
      },
      'feature-stock:stock-movement-index': {
        id: 'feature-stock:stock-movement-index',
        groupId: 'feature-stock',
        title: '入出庫履歴',
        url: '/stock-movement',
        orderId: 5,
      },

      'feature-product:product-index': {
        id: 'feature-product:product-index',
        groupId: 'feature-product',
        title: '商品一覧',
        url: '/product',
        orderId: 1,
      },
      'feature-product:product-new': {
        id: 'feature-product:product-new',
        groupId: 'feature-product',
        title: '商品新規登録',
        url: '/product/new',
        orderId: 2,
      },

      'feature-supplier:supplier-index': {
        id: 'feature-supplier:supplier-index',
        groupId: 'feature-supplier',
        title: '仕入先一覧',
        url: '/supplier',
        orderId: 1,
      },
      'feature-supplier:supplier-new': {
        id: 'feature-supplier:supplier-new',
        groupId: 'feature-supplier',
        title: '仕入先新規登録',
        url: '/supplier/new',
        orderId: 2,
      },

      'feature-warehouse:warehouse-index': {
        id: 'feature-warehouse:warehouse-index',
        groupId: 'feature-warehouse',
        title: '倉庫一覧',
        url: '/warehouse',
        orderId: 1,
      },
      'feature-warehouse:warehouse-new': {
        id: 'feature-warehouse:warehouse-new',
        groupId: 'feature-warehouse',
        title: '倉庫新規登録',
        url: '/warehouse/new',
        orderId: 2,
      },

      'feature-inventory-report:inventory-alert-index': {
        id: 'feature-inventory-report:inventory-alert-index',
        groupId: 'feature-inventory-report',
        title: '在庫不足アラート',
        url: '/inventory-alert',
        orderId: 1,
      },
      'feature-inventory-report:inventory-report-index': {
        id: 'feature-inventory-report:inventory-report-index',
        groupId: 'feature-inventory-report',
        title: '在庫推移レポート',
        url: '/inventory-report',
        orderId: 2,
      },
    },
  },
})
