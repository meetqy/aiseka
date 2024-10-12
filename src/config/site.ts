export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "色彩管理工具",
  description: "AISEKA 可以轻松处理色彩相关的任务，支持“颜色介绍、查询、分类、命名和色卡收集”等多种功能，帮助你快速找到灵感，轻松管理色彩，让设计创作更高效、更便捷！",
  navItems: [
    {
      label: "Color",
      href: "/",
    },
    // {
    //   label: "About",
    //   href: "/about",
    // },
  ],
  navMenuItems: [],
  links: {
    github: "https://github.com/meetqy/aiseka",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
  },
};
