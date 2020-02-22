// Node.js built-in APIs.
const { env: environments } = require('process');

// Constants.
const { NODE_ENV: executionMode = 'development' } = environments;

// Babel configuration.
const presets = Object.entries({
    '@babel/preset-env': { targets: { node: 'current' } },
    '@babel/preset-typescript': {}
});

const plugins = Object.entries({
    '@babel/plugin-transform-runtime': { regenerator: false }
});

module.exports = { presets, plugins };
