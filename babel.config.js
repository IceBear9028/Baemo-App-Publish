module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '~': './src',
          '@components': './src/components',
          '@screens': './src/pages',
          '@tabs': './src/tabs',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@fetch': './src/fetch',
        },
      },
    ],
  ],
};
