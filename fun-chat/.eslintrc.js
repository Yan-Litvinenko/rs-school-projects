module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'import', 'react'],
    extends: ['airbnb-typescript', 'plugin:prettier/recommended'],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        'no-debugger': 'off',
        'no-console': 'off',
        'class-methods-use-this': 'off',
        'newline-per-chained-call': 'error',
        'comma-spacing': ['error', { before: false, after: true }],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
