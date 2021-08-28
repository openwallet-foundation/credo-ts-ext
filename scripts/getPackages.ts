/* eslint-disable no-console */
import { readdirSync } from 'fs'
import path from 'path'

const packages = readdirSync(path.join(__dirname, '..', 'packages'))

console.log(`packages: ${JSON.stringify(packages)}`)
console.log(`::set-output name=packages::${JSON.stringify(packages)}`)
