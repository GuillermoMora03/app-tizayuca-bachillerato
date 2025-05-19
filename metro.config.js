// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// Permite `.cjs`, necesario para algunos paquetes de Firebase
config.resolver.sourceExts.push('cjs');

// <-- AÑADE ESTA LÍNEA
// Deshabilita la estricta resolución de package.exports para que Firebase Auth
// se cargue correctamente y registre su componente
config.resolver.unstable_enablePackageExports = false;

module.exports = config;