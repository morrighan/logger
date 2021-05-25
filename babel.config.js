import { env as environmentVariables } from 'process';

// Configuration fragments.
const corejs = { version: 3, proposals: true };
const { BABEL_ENV: envName } = environmentVariables;
const modules = envName === 'esm' ? false : 'auto';

/**
 * @param {import('@babel/core').ConfigAPI } API
 * @returns {import('@babel/core').TransformOptions}
 */
export default function configurateBabel(API) {
    API.assertVersion('^7.14.0');

    const presets = Object.entries({
        '@babel/preset-env': { bugfixes: true, useBuiltIns: 'usage', targets: { node: 'current' }, corejs, modules },
        '@babel/preset-typescript': {}
    });

    const plugins = Object.entries({
        '@babel/plugin-transform-runtime': { corejs, regenerator: false }
    });

    return { presets, plugins };
}
