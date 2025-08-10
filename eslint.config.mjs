import prettierRecommended from 'eslint-config-prettier';

import withNuxt from './.nuxt/eslint.config.mjs';

const config = withNuxt({
    rules: {
        eqeqeq: ['error', 'always'],
        '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],

        // Vue
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off',

        // Disable ESLint rules that conflict with Prettier
        ...prettierRecommended.rules,
    },
});

export default config;
