module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-underscore-dangle": "off"
      },
    "parser": "babel-eslint",
    "globals": {
        "fetch": false,
        "window": false,
        "document": false,
    },
    "env": {
        "jest": true
    },
};