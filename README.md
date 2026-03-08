# shadcn-template-kimura

Nuxt4 + shadcn-vue をベースにした管理画面向けテンプレート。

- Feature Layer による機能分離  
- TailwindCSS v4 + shadcn-vue  
- Pinia store  
- TanStack Table  
- Dark mode 対応  

業務システムや管理画面を素早く作るためのベースプロジェクトです。

---

# Architecture

このテンプレートは **Core + Feature Layer 構成**になっています。

```
root
├─ app                # Core (共通UI / layout / plugin / composables)
├─ layers
│   ├─ feature-user
│   ├─ feature-info
│   ├─ feature-inventory
│   └─ feature-inspection
├─ nuxt.config.ts
```

---

# Core

`app` ディレクトリは **全機能共通の Core** として扱います。

例

```
app/
 ├─ layouts
 ├─ components
 │   └─ core
 ├─ composables
 ├─ plugins
 └─ utils
```

ここには以下のような **共通機能**を配置します。

- Layout  
- 共通 UI  
- util / composables  
- plugin  

---

# Feature Layer

`layers` 配下は **機能単位のモジュール**です。

例

```
layers/
 └─ feature-user
     ├─ pages
     ├─ components
     ├─ stores
     ├─ composables
     └─ types
```

Feature Layer によって

- 機能ごとの分離  
- 大規模化への対応  
- チーム開発の衝突回避  

を実現しています。

---

# Nuxt Layer 設定

`nuxt.config.ts` で feature を読み込みます。

```ts
extends: [
  './layers/feature-user',
  './layers/feature-info',
  './layers/feature-inventory',
  './layers/feature-inspection'
]
```

新しい Feature を追加する場合はここに追加します。

---

# Technology Stack

| Tech | Purpose |
|-----|--------|
| Nuxt4 | Frontend framework |
| Vue3 | UI |
| TailwindCSS v4 | Styling |
| shadcn-vue | UI Components |
| Pinia | State management |
| TanStack Table | Table |
| VeeValidate + Zod | Form validation |
| Nuxt Content | Markdown |

---

# Install

```bash
pnpm install
```

---

# Run

```bash
pnpm dev
```

---

# Build

```bash
pnpm build
```

---

# Feature Layer の追加

新しい機能を追加する場合は

```
layers/feature-xxx
```

を作成します。

例

```
layers/
 └─ feature-product
     ├─ pages
     ├─ components
     ├─ stores
     ├─ types
```

その後 `nuxt.config.ts` に追加します。

```ts
extends: [
  './layers/feature-user',
  './layers/feature-product'
]
```

---

# Design Policy

本テンプレートは以下を方針としています。

- Core(UI/Layout) と Feature の分離  
- Feature 単位の開発  
- 管理画面向け UI  

---

# License

MIT