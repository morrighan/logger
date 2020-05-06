// Babel configuration.
const presets = Object.entries({
    '@babel/preset-env': { targets: { node: 'current' } },
    '@babel/preset-typescript': {}
});

const plugins = Object.entries({
    '@babel/plugin-proposal-class-properties': {},
    '@babel/plugin-transform-runtime': {}
});

module.exports = { presets, plugins };
