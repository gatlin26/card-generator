# CardCraft - Next.js 版本

一个强大的在线卡片生成器，已从 Replit 迁移到标准的 Next.js 项目结构。

## 🎯 项目概述

CardCraft 是一个 AI 驱动的卡片生成器，支持：
- 🎨 智能模板系统
- ✨ 实时编辑和预览
- 🖼️ 自定义背景和图片上传
- 📱 社交媒体优化
- 🤖 AI 卡片设计
- 📊 社交媒体可视化
- 💬 用户反馈系统

## 🏗️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + Radix UI
- **数据库**: PostgreSQL + Drizzle ORM
- **状态管理**: TanStack Query (React Query)
- **部署**: 可部署到 Vercel, Netlify 等平台

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── cards/         # 卡片相关API
│   │   ├── feedback/      # 反馈API
│   │   └── upload/        # 文件上传API
│   ├── create/            # 卡片编辑页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx          # 首页
│   └── providers.tsx      # 应用提供者
├── components/            # UI组件
│   ├── ui/               # 基础UI组件 (Radix UI)
│   ├── site-header.tsx    # 网站头部
│   ├── site-footer.tsx    # 网站底部
│   └── ...               # 其他组件
├── lib/                   # 工具库
│   ├── db.ts             # 数据库连接
│   ├── storage.ts        # 数据存储操作
│   ├── utils.ts          # 通用工具
│   ├── templates.ts      # 模板配置
│   └── i18n.ts           # 国际化
└── shared/               # 共享类型和模式
    └── schema.ts         # 数据库模式
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境配置

创建 `.env.local` 文件：

```env
# 数据库连接
DATABASE_URL="postgresql://username:password@localhost:5432/cardcraft"

# Next.js配置
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Google Analytics 4 配置
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### 3. 数据库设置

```bash
# 推送数据库模式
npm run db:push

# 查看数据库 (可选)
npm run db:studio
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🔧 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行代码检查
- `npm run db:push` - 推送数据库模式
- `npm run db:studio` - 启动 Drizzle Studio

## 📋 从 Replit 迁移的主要变更

### ✅ 已完成的迁移

1. **架构重构**
   - ✅ Express.js → Next.js API Routes
   - ✅ Wouter → Next.js App Router
   - ✅ Vite → Next.js 构建系统

2. **API 迁移**
   - ✅ `/api/cards` - 卡片CRUD操作
   - ✅ `/api/cards/[id]` - 单个卡片操作
   - ✅ `/api/cards/share/[shareId]` - 分享功能
   - ✅ `/api/cards/showcase` - 展示卡片
   - ✅ `/api/upload` - 文件上传 (multer → Next.js)
   - ✅ `/api/feedback` - 用户反馈

3. **数据库配置**
   - ✅ Drizzle ORM 配置
   - ✅ Neon 数据库支持
   - ✅ 数据模型和类型定义

4. **UI/UX**
   - ✅ Tailwind CSS 配置
   - ✅ Radix UI 组件库
   - ✅ 响应式设计
   - ✅ 国际化支持 (中英文)

### 🔄 需要进一步完善的组件

以下组件需要从原项目迁移：

1. **核心编辑器组件**
   - `card-editor.tsx` - 主编辑器页面
   - `main-canvas.tsx` - 画布组件
   - `editable-text.tsx` - 可编辑文本
   - `editable-image.tsx` - 可编辑图片

2. **功能组件**
   - `template-sidebar.tsx` - 模板侧边栏
   - `properties-panel.tsx` - 属性面板
   - `main-toolbar.tsx` - 主工具栏
   - `resize-handles.tsx` - 尺寸调整

3. **专业页面**
   - `/online-card-maker` - 在线制作器
   - `/text-to-card-generator` - 文本转卡片
   - `/social-media-visualization` - 社交媒体可视化
   - `/ai-card-design` - AI设计

## 💡 使用建议

1. **开发环境**: 使用 VS Code + Tailwind CSS IntelliSense 扩展
2. **数据库**: 推荐使用 Neon 或 Supabase 作为 PostgreSQL 提供商
3. **部署**: Vercel 为首选部署平台，自动支持 Next.js
4. **图片存储**: 可配置 Cloudinary 或 S3 用于生产环境的图片存储

## 📊 Google Analytics 4 集成

### 配置步骤

1. **获取 GA4 测量 ID**
   - 登录 [Google Analytics](https://analytics.google.com/)
   - 创建新的 GA4 属性
   - 获取测量 ID (格式: G-XXXXXXXXXX)

2. **环境变量配置**
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **自动功能**
   - **页面访问追踪**: 自动记录所有页面访问和路由变化
   - **无侵入集成**: 不影响现有代码和用户体验
   - **生产环境优化**: 只在有效环境变量时启用

## 🐛 常见问题

### Q: 数据库连接失败？
A: 检查 `.env.local` 中的 `DATABASE_URL` 是否正确配置。

### Q: 图片上传失败？
A: 确保 `public/uploads` 目录存在且有写入权限。

### Q: TypeScript 类型错误？
A: 运行 `npm run lint` 检查并修复类型问题。

### Q: Google Analytics 数据不显示？
A: 确认 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 环境变量已正确设置，GA4 数据通常有延迟。

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 致谢

- 原始 Replit 项目团队
- Next.js 和 React 社区
- Tailwind CSS 和 Radix UI 团队
- Drizzle ORM 维护者

---

**注意**: 这是一个迁移项目，从 Replit 环境迁移到标准的 Next.js 项目结构。如需完整功能，请参考上述"需要进一步完善的组件"部分。 