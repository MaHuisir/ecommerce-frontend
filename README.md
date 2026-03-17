# 电商交易平台前端

基于 **Vue 3 + Vite** 构建的电商交易平台前端项目。

## 技术栈

- **Vue 3** (Composition API)
- **Vite 5** (构建工具)
- **Vue Router 4** (路由)
- **Pinia** (状态管理)
- **Element Plus** (UI 组件库)
- **Axios** (HTTP 请求)
- **Sass** (CSS 预处理器)

## 项目结构

```
src/
├── api/            # 接口请求
│   ├── user.js
│   ├── product.js
│   └── order.js
├── components/     # 公共组件
│   └── ProductCard.vue
├── layouts/        # 布局组件
│   ├── MainLayout.vue
│   └── UserLayout.vue
├── router/         # 路由配置
│   └── index.js
├── stores/         # Pinia 状态
│   ├── user.js
│   └── cart.js
├── styles/         # 全局样式
│   └── global.scss
├── utils/          # 工具函数
│   └── request.js  # Axios 封装
├── views/          # 页面视图
│   ├── Home.vue
│   ├── Cart.vue
│   ├── Login.vue
│   ├── Register.vue
│   ├── Search.vue
│   ├── NotFound.vue
│   └── user/
├── App.vue
└── main.js
```

## 功能模块

- 🏠 **首页** - Banner 轮播、热门分类、热销/新品商品展示
- 🔍 **搜索** - 关键词商品搜索
- 🛒 **购物车** - 增删改查、全选、结算
- 👤 **用户中心** - 登录/注册、个人信息、订单管理、收货地址、收藏
- 📦 **订单** - 下单、支付、查看订单详情

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

> 开发服务器默认运行在 http://localhost:3000
> API 请求代理到 http://localhost:8080
