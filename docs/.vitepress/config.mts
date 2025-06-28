import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/26th-web-team-2-fe/",
  title: "Trip with Hul-zzuk",
  description: "YAPP 26th WEB 2 Team",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    sidebar: [
      {
        text: "Conventions",
        items: [
          { text: "네이밍 전략", link: "/naming" },
          { text: "프로젝트 구조", link: "/project-structure" },
          { text: "스타일링", link: "/styling" },
          { text: "테스트", link: "/test" },
          { text: "Git 전략", link: "/git-strategy" },
          { text: "기타", link: "/etc" },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/YAPP-Github/26th-Web-Team-2-FE",
      },
    ],
  },
});
