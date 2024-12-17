const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
/** @type {import('expo/metro-config').MetroConfig} */

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enableSymlinks = true
config.resolver.unstable_enablePackageExports = true
config.resolver.unstable_conditionNames = ['require', 'default']
config.resolver.sourceExts.push('sql'); 


// Export the config with NativeWind configuration last
module.exports = withNativeWind(config, {
  input: './global.css',
  inlineRem: 16,
});