/**
 * 运行时配置文件 — 打包后直接编辑此文件即可修改配置，无需重新构建。
 *
 * 所有配置项均为可选，未填写则使用代码内默认值。
 */
window.__APP_CONFIG__ = {
  /**
   * 后端 API 地址（必填）
   * 示例: "https://your-domain.com/api/v1"
   */
  apiUrl: "",

  /**
   * 后台管理路径（用于侧边栏 logo 跳转等）
   */
  adminPath: "",

  /**
   * 面板标题（显示在登录页和侧边栏）
   */
  title: "V2Board Admin",

  /**
   * 登录页背景图片 URL（留空则使用默认渐变背景）
   */
  loginBackground: "",

  /**
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 补单功能（已取消订单重新确认收款）
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *
   * 原版逻辑中已取消的订单不可修改。如果后端有自定义补单 API，
   * 开启此选项后，已取消的订单会显示"补单"操作按钮。
   *
   * enabled: true/false  是否开启补单功能
   * apiPath: 补单 API 路由名（如 "order/supplement"），会自动拼接为 /{adminPath}/order/supplement
   *          留空则使用默认的 order/paid 接口
   */
  // repay: {
  //   enabled: true,
  //   apiPath: "order/supplement",
  // },

  /**
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 自定义配置页面的 API 路径
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *
   * fetchPath: 获取配置的 API 路径（相对于 apiUrl/{adminPath}/）
   * savePath:  保存配置的 API 路径（相对于 apiUrl/{adminPath}/）
   *
   * 如果不需要自定义配置页面，不配置 customApi 和 customTabs 即可。
   */
  // customApi: {
  //   fetchPath: "",
  //   savePath: "",
  // },

  /**
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 自定义配置页面
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *
   * 如果不需要自定义配置页面，删除 customTabs 或设为空数组 [] 即可隐藏左侧菜单项。
   *
   * customTabs 是一个数组，每个元素代表一个 Tab 标签页，结构如下:
   * {
   *   key: "tab唯一标识",
   *   label: "标签页名称",
   *   fields: [
   *     {
   *       key: "字段的 key (对应后端 config 中的字段名)",
   *       label: "字段显示名称",
   *       description: "字段说明/描述 (显示在输入框下方)",
   *       type: "输入类型",    // 可选值: "input" | "textarea" | "switch" | "number" | "json" | "select" | "tags"
   *       placeholder: "",     // 可选，输入框占位文字
   *       options: [],         // 可选，type 为 "select" 时的选项 [{ label: "显示", value: "值" }]
   *       rows: 4,             // 可选，type 为 "textarea" 或 "json" 时的行数
   *     }
   *   ]
   * }
   *
   * 支持嵌套 key，用 "." 分隔，例如 "mail.host" 对应 config.mail.host
   */
  // customTabs: [],
};
