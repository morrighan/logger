// Node.js built-in APIs.
const { env: { BABEL_ENV: envName } } = require('process');

// Configuration fragments.
const corejs = { version: 3, proposals: true };
const modules = envName === 'esm' ? false : 'auto';

/**
 * @param {import('@babel/core').ConfigAPI } API
 * @returns {import('@babel/core').TransformOptions}
 */
function configurateBabel(API) {
    API.assertVersion('^7.14.0');
    API.cache.never();

    const presets = Object.entries({
        '@babel/preset-env': { bugfixes: true, useBuiltIns: 'usage', targets: { node: 'current' }, corejs, modules },
        '@babel/preset-typescript': {}
    });

    const plugins = Object.entries({
        '@babel/plugin-transform-runtime': { corejs, regenerator: false }
    });

    return { presets, plugins };
}

module.exports = configurateBabel;
