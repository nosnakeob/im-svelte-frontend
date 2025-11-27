# IM Svelte Frontend

基于 SvelteKit 5 和 Flowbite Svelte 构建的即时通讯前端应用。

## 技术栈

- **SvelteKit 2.22** - 全栈 Web 框架
- **Svelte 5** - 响应式 UI 框架（使用最新的 runes 语法）
- **Flowbite Svelte** - UI 组件库
- **Tailwind CSS 4** - 样式框架
- **TypeScript** - 类型安全
- **Vite 7** - 构建工具

## 项目结构

```
src/
├── lib/
│   └── components/
│       └── MessageBubble.svelte # 消息气泡组件
├── routes/
│   ├── +layout.svelte           # 全局布局
│   ├── +page.svelte             # 首页（欢迎页面）
│   ├── login/
│   │   └── +page.svelte         # 登录页面
│   └── chat/
│       ├── +layout.svelte       # 聊天室布局
│       └── +page.svelte         # 聊天室页面
└── app.css                      # 全局样式
```

## 功能特性

- ✅ 用户登录（模拟）
- ✅ 聊天室界面
- ✅ 消息发送和显示
- ✅ 自动滚动到最新消息
- ✅ 响应式设计

## 开发

安装依赖：

```sh
npm install
```

启动开发服务器：

```sh
npm run dev
```

项目将在 `http://localhost:80` 启动。

## 路由说明

- `/` - 欢迎页面
- `/login` - 登录页面（默认用户名：alice，密码：alice123）
- `/chat` - 聊天室（需要登录）

## 构建

创建生产版本：

```sh
npm run build
```

预览生产构建：

```sh
npm run preview
```

## 注意事项

- 当前登录功能为模拟实现，后端接口代码已注释保留
- Token 存储在 localStorage 中
- 首次启动可能需要等待依赖预构建（5-15 秒）
