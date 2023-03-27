// Learn more https://docs.expo.io/guides/customizing-metro
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config')

// eslint-disable-next-line no-undef
module.exports = {
  // eslint-disable-next-line no-undef
  ...getDefaultConfig(__dirname),
  resolver: { sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs'] },
}
