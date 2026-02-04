const { askar } = require('@openwallet-foundation/askar-nodejs')

console.log('--- START NATIVE CHECK ---')
try {
  const version = askar.version()
  console.log('Askar version found:', version)
} catch (e) {
  console.error('Native call crashed:', e.message)
}
console.log('--- END NATIVE CHECK ---')
