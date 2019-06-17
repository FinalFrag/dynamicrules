module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-use-before-define": [
            "error",
            { "functions": false }
        ],
        "no-console": "off",
        "indent": [
            "error",
            4
        ],
        "max-len": [
            "error", 
            { "code": 255 }
        ],
        "comma-dangle": 0,
        "prefer-template": "off",
        "quotes": [
            "error",
            "double"
        ],
        "no-underscore-dangle": "off"
    }
};