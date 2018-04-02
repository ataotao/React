// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
        commonjs: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    globals: {
        $: true
    },
    plugins: ['react', 'import'],
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 'indent': ['warn', 4],
        indent: ['warn', 4, { SwitchCase: 1 }],
        'no-console': ['off'],
        quotes: ['warn', 'single'],
        semi: ['error', 'always'],
        'react/prop-types': 0
    }
};
