module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', {
            vars: 'all',
            args: 'none',
            ignoreRestSiblings: true
        }],
        '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignorePatterns: ['node_modules/', 'dist/', 'build/'],
};
