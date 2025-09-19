import { config as smartiveConfig } from '@smartive/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...smartiveConfig('nextjs'),
  {
    rules: {
      'react/forbid-component-props': [
        'error',
        {
          forbid: [
            {
              propName: 'className',
              allowedFor: ['BlockWrapper', 'Tag', 'MuxVideo'],
              allowedForPatterns: ['Next*', 'Motion*', 'Dato*', '*Svg', 'NavigationMenu*', 'Dialog*'],
              message: 'Avoid using className',
            },
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['../*'],
        },
      ],
    },
  },
  {
    ignores: ['test/check-page-errors.js', '**/generated.ts', 'tailwind.config.ts', 'lib/eventless/**/*.ts'],
  },
];

export default config;
