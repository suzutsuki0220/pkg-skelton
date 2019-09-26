module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "jest"
    ],
    "rules": {
        "no-irregular-whitespace": ["error", {"skipRegExps": true}]
    }
};
