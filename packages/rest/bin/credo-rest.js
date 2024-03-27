#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires, no-undef */

var process = require('process')

const { runCliServer } = require('../build/cli')
let shutdownAgent

process.on('SIGINT', async () => {
  try {
    if (shutdownAgent) {
      await shutdownAgent()
    }
  } finally {
    process.exit(0)
  }
})

runCliServer().then(({ shutdown }) => {
  shutdownAgent = shutdown
})
