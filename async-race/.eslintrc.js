module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser', // для анализа кода typescript
    parserOptions: {
        project: './tsconfig.json', // путь к файлу tsconfig.json
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        indent: ['error', 4], // Использование пробелов для отступов
        quotes: ['error', 'single'], // Одинарные кавычки для строк
        semi: ['error', 'always'], // Всегда ставить точку с запятой в конце выражения
        'prettier/prettier': 'error',
        'comma-spacing': ['error', { before: false, after: true }], // Пробел после запятой, но не перед
        'object-curly-spacing': ['error', 'always'], // Пробелы внутри фигурных скобок
        'comma-dangle': ['error', 'always-multiline'], // Запятая в последней строке объектов и массивов в многострочных выражениях
        'no-console': 'off', // Разрешить использование console.log
    },
};
