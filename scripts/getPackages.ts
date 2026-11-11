/* eslint-disable no-console */
import { existsSync, readdirSync } from 'fs'
import path from 'path'

const packagesDirectory = path.join(__dirname, '..', 'packages')
const packages = readdirSync(packagesDirectory).filter((name) =>
  existsSync(path.join(packagesDirectory, name, 'package.json')),
)

console.log(`packages: ${JSON.stringify(packages)}`)
console.log(`::set-output name=packages::${JSON.stringify(packages)}`)
