# Vercel 部署指南

## 🚀 部署前准备

### 1. 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```env
DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 2. 数据库准备

推荐使用 [Neon Database](https://neon.tech/)（免费PostgreSQL）：

1. 注册 Neon 账户
2. 创建新数据库
3. 复制连接字符串到 `DATABASE_URL`

## 📦 部署步骤

### 方法一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel

# 设置环境变量
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_APP_URL
```

### 方法二：通过 GitHub 集成

1. 将代码推送到 GitHub
2. 在 Vercel Dashboard 导入项目
3. 在 Settings → Environment Variables 添加变量
4. 触发重新部署

## ⚙️ 构建配置

项目已配置自动数据库推送：
- `postbuild` 脚本会在构建后执行 `db:push`
- 确保数据库表结构同步

## 🔍 常见问题

### Q: 部署失败，提示 DATABASE_URL 未设置
A: 检查 Vercel 项目的环境变量设置

### Q: 图片上传功能异常
A: 确保在 Vercel 中正确配置文件上传限制

### Q: 数据库连接超时
A: 检查 Neon 数据库的连接字符串和SSL配置

## 🎯 部署检查清单

- [ ] DATABASE_URL 环境变量已设置
- [ ] 数据库表已创建（通过 db:push）
- [ ] Next.js 构建成功
- [ ] API 路由正常响应
- [ ] 图片和静态资源加载正常 