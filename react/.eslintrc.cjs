module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import', 'react-compiler'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'import/no-unused-modules': 'error',
        'react-compiler/react-compiler': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-unresolved': 'off',
    },
    settings: {
        react: {
            version: '18.3.1',
        },
    },
};
