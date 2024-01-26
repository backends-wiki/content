import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Общедоступная база знаний по Golang',
  tagline: 'Общедоступная база знаний по Golang',
  favicon: 'img/favicon.ico',

  url: 'https://golangreview.ru',
  baseUrl: '/',

  organizationName: 'golangreview',
  projectName: 'golangreview',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [[require.resolve('docusaurus-lunr-search'), {
    languages: ['ru']
  }], [
    '@docusaurus/plugin-google-gtag',
    {
      trackingID: 'G-8Z14GZ90VD',
      anonymizeIP: true,
    },
  ],],

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/golangreview/golangreview/tree/main',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Golang Review',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'База знаний',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/golangreview/golangreview',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.jettwaveDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
