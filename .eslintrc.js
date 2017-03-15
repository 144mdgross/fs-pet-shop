module.exports = {
    "extends": [
        'ryansobol/browser',
        'ryansobol/es6',
        'ryansobol/jquery'
    ],
    rules: {
        "semi": "off",
        "prefer-const": "error",
        "no-implicit-globals": "off",
        "strict": "off",
        "quotes": "off",
        "no-unused-vars": "off",
        "no-else-return": "off",
        "no-multiple-empty-lines": "off",
        "object-shorthand": ["error", "consistent"],
        "eslint no-var": "error",
        // "curly": ["error", "multi"],
        "brace-style": [2, "1tbs", { "allowSingleLine": true }]


    }
};
