module.exports = {
  root: true, // текущий файл настройки является корневым
  parser: '@typescript-eslint/parser', // для анализа кода typescript
  parserOptions: {
    project: './tsconfig.json', // путь к файлу tsconfig.json
  },
  env: {
    // определяет окружение, в котором будет работать
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'prettier', 'airbnb-typescript'],
  plugins: ['@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
