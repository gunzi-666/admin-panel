# V2Board Admin - 现代化管理面板

基于 React + Ant Design 重写的 V2Board 管理后台前端，替代原版 umi.js 方案。

## 特性

- **现代技术栈** — React 18 + TypeScript + Vite + Ant Design 5
- **暗色 / 亮色主题** — 一键切换，默认暗色主题
- **完全响应式** — 桌面端与移动端自适应布局
- **PWA 支持** — 可添加到手机主屏幕，支持 iOS 安全区域适配
- **运行时配置** — 部署后通过 `config.js` 修改配置，无需重新构建
- **自定义扩展页面** — 通过 `config.js` 配置自定义表单页面，无需改代码

## 功能模块

| 模块 | 说明 |
|------|------|
| 仪表盘 | 数据概览、趋势图表、节点/用户流量排行 |
| 系统配置 | 站点、安全、订阅、邮件、Telegram、服务器、邀请、个性化 |
| 支付配置 | 支付方式管理、拖拽排序、动态配置表单 |
| 节点管理 | 列表/树形视图、多协议支持、拖拽排序、在线状态 |
| 权限组管理 | 节点分组管理 |
| 路由管理 | 路由规则配置 |
| 订阅管理 | 套餐 CRUD、权限组绑定 |
| 订单管理 | 订单筛选、状态操作、补单、佣金管理 |
| 优惠券管理 | 创建/管理优惠券、状态过滤 |
| 礼品卡管理 | 礼品卡批量生成 |
| 用户管理 | 高级过滤器、批量操作、设备/流量/订单查看、CSV 导出 |
| 公告管理 | 公告 CRUD |
| 工单管理 | 工单回复、用户信息查看、搜索 |
| 知识库管理 | Markdown 编辑与实时预览 |
| 自定义配置 | 通过 config.js 扩展的动态配置页面 |
| 系统状态 | 队列监控、自动刷新 |

## 部署方式

### 方式一：独立部署

将 `dist/` 目录下所有文件部署到任意 Web 服务器（Nginx、Caddy 等），编辑 `config.js` 填入后端地址即可。

Nginx 参考配置：

```nginx
server {
    listen 80;
    server_name admin.example.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 方式二：作为 V2Board 主题集成

无需修改 V2Board 项目文件，通过主题系统加载：

1. 在 V2Board 项目中创建主题目录：`public/theme/gadmin/`

2. 将以下文件复制到主题目录：
   ```
   public/theme/gadmin/
   ├── config.json          ← 主题描述文件（见下方）
   ├── dashboard.blade.php  ← 入口模板（见下方）
   ├── config.js            ← 运行时配置
   ├── manifest.json        ← PWA 配置（需修改图标路径）
   ├── sw.js                ← Service Worker
   ├── icon.svg
   ├── icon-192.svg
   └── assets/              ← dist/assets/ 目录整个复制
   ```

3. 创建 `config.json`：
   ```json
   {
     "name": "GAdmin",
     "description": "现代化管理面板",
     "configs": [
       { "field_name": "theme_color", "label": "主题颜色", "type": "select", "default_value": "default", "options": ["default"] },
       { "field_name": "theme_sidebar", "label": "侧边栏风格", "type": "select", "default_value": "dark", "options": ["dark", "light"] },
       { "field_name": "theme_header", "label": "头部风格", "type": "select", "default_value": "dark", "options": ["dark", "light"] },
       { "field_name": "background_url", "label": "背景图", "type": "input", "default_value": "" },
       { "field_name": "custom_html", "label": "自定义HTML", "type": "textarea", "default_value": "" }
     ]
   }
   ```

4. 创建 `dashboard.blade.php`（资源路径需要指向 `/theme/gadmin/`，JS/CSS 文件名用 `assets/` 目录中的实际文件名）：
   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
       <meta name="theme-color" content="#141414" />
       <meta name="apple-mobile-web-app-capable" content="yes" />
       <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
       <link rel="icon" type="image/svg+xml" href="/theme/gadmin/icon.svg" />
       <link rel="manifest" href="/theme/gadmin/manifest.json" />
       <title>{{$title}}</title>
       <script src="/theme/gadmin/config.js"></script>
       <script type="module" crossorigin src="/theme/gadmin/assets/index-XXXXX.js"></script>
       <link rel="modulepreload" crossorigin href="/theme/gadmin/assets/vendor-XXXXX.js">
       <link rel="modulepreload" crossorigin href="/theme/gadmin/assets/antd-XXXXX.js">
       <link rel="modulepreload" crossorigin href="/theme/gadmin/assets/charts-XXXXX.js">
       <link rel="stylesheet" crossorigin href="/theme/gadmin/assets/index-XXXXX.css">
     </head>
     <body>
       <div id="root"></div>
     </body>
   </html>
   ```
   > 将 `XXXXX` 替换为 `assets/` 目录中实际的文件名 hash。

5. 修改 `manifest.json` 中的图标路径为 `/theme/gadmin/icon.svg` 和 `/theme/gadmin/icon-192.svg`

6. 将 `sw.js` 额外复制一份到 V2Board 的 `public/sw.js`（Service Worker 作用域要求）

7. 在 V2Board 管理后台 **系统配置 → 个性化 → 前端主题** 中选择 `gadmin`，保存

### 方式三：替换原版管理后台

将 `dist/` 下的文件直接部署到 `public/assets/admin/` 目录，然后修改 `resources/views/admin.blade.php` 模板引用新的资源文件。

## 配置说明

部署后编辑 `config.js` 进行配置：

```js
window.__APP_CONFIG__ = {
  // 后端 API 地址（必填）
  apiUrl: "https://your-domain.com/api/v1",

  // 后台管理路径
  adminPath: "admin",

  // 面板标题
  title: "V2Board Admin",

  // 登录页背景图（留空使用默认渐变）
  loginBackground: "",

  // 补单功能（可选）
  // repay: {
  //   enabled: true,
  //   apiPath: "order/supplement",
  // },

  // 自定义配置页面 API 路径（可选）
  // customApi: {
  //   fetchPath: "your-config/fetch",
  //   savePath: "your-config/save",
  // },

  // 自定义配置页面字段定义（可选）
  // customTabs: [ ... ],
};
```

详细配置项说明请参阅 `config.js` 文件内的注释。

## 从源码构建

```bash
cd api/frontend
npm install
npm run build
```

构建产物输出到 `dist/` 目录。

## 技术栈

- React 18 + TypeScript
- Vite 6
- Ant Design 5
- Recharts（图表）
- Zustand（状态管理）
- @dnd-kit（拖拽排序）
- dayjs（日期处理）

## 兼容性

- 兼容 V2Board 1.x 后端 API
- 支持所有现代浏览器（Chrome、Firefox、Safari、Edge）
- 支持 iOS / Android PWA

## License

MIT
