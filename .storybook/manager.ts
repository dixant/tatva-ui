import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const tatvaTheme = create({
  base: 'light',
  brandTitle: 'Tatva UI',
  brandUrl: 'https://github.com/dixant/tatva-ui',
  brandTarget: '_self',
  colorPrimary: '#2563eb',
  colorSecondary: '#1d4ed8',
});

addons.setConfig({
  theme: tatvaTheme,
  sidebar: {
    showRoots: true,
  },
});
