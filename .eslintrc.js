module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        'plugin:vue/essential',
        'airbnb-base',
    ],
    settings: {
        'import/resolver': {
            typescript: {},
            node: {
                extensions: ['.ts']
            }
        }
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    rules: {
        'semi': ['warn', 'never'],
        'quotes': ['warn', 'single'],
        'quote-props': ['error', 'consistent-as-needed'],
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'object-curly-spacing': [2, 'never'],
        'indent': ['warn', 4],
        'arrow-parens': ['warn', 'as-needed'],
        'no-return-assign': 'off',
        'no-param-reassign': 'off',
        'comma-dangle': ['warn', {
            exports: 'never',
            imports: 'never',
            functions: 'never',
            objects: 'never'
        }],
        'block-spacing': 'off',
        'max-len': ['warn', {code: 150}],
        'no-restricted-globals': 'off',
        'import/extensions': ['error', 'never'],
        'no-useless-catch': 'off',
        'padded-blocks': ['error', {
            classes: 'always',
            blocks: 'never',
            switches: 'never'
        }, {allowSingleLineBlocks: true,}],
        'curly': ['warn', 'multi'],
        'nonblock-statement-body-position': ['error', 'beside', {
            overrides: {for: 'below'}
        }],
        'linebreak-style': ['warn', 'unix'],
        'no-console': 'off',
        'object-curly-newline': ['error', {consistent: true, multiline: true}],
        'prefer-const': ['error', {destructuring: 'all'}],
        'brace-style': 'off',
        'no-restricted-syntax': 'off',
        'class-methods-use-this': 'off',
        'camelcase': 'off',
        'func-names': 'off',
        'import/prefer-default-export': 'off',
        'spaced-comment': 'off',
        'max-classes-per-file': 'off',
        'consistent-return': 'off',
        'no-underscore-dangle': 'off',
        'guard-for-in': 'off'
    },
}
