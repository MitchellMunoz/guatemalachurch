// @ts-check
import prettierRecommended from 'eslint-config-prettier';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import withNuxt from './.nuxt/eslint.config.mjs';

const config = withNuxt([
    {
        files: ['**/*.{vue,ts}'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                ecmaVersion: 'latest',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
            },
        },
        plugins: {
            vue,
        },
        rules: {
            ...prettierRecommended.rules,
            eqeqeq: ['error', 'always'],
            'no-undef': 'error',
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
            quotes: ['error', 'single', { allowTemplateLiterals: true }],
            semi: ['error', 'always'],
            '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
        },
    },
]);

export default config;
