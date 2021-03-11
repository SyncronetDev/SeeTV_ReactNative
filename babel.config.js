module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~': './src',
          '@': './src',
          src: './src',
          components: './src/components',
          pages: './src/pages',
          utils: './src/utils',
          assets: './src/assets',
          app: './src/app',
        },
      },
    ],
  ],
};
