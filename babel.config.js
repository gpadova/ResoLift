module.exports = function (api) {
  api.cache(true);
  const plugins = [
    'react-native-reanimated/plugin',
    'babel-plugin-transform-vite-meta-env',
    '@babel/plugin-syntax-import-attributes'
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [["inline-import", { "extensions": [".sql"] }]],
  };
};