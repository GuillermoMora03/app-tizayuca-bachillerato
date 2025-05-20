// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// 1) Permitir resolver .cjs (y .mjs si lo necesitas)
config.resolver.sourceExts = [
  ...(config.resolver.sourceExts || []),
  'cjs',
  'mjs'
];

// 2) Desactivar la verificación de "exports" en los package.json
config.resolver.unstable_enablePackageExports = false;

module.exports = config;