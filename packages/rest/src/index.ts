import 'reflect-metadata'

import type { ServerConfig } from './utils/ServerConfig'
import type { Agent } from '@aries-framework/core'
import type { Socket } from 'net'

import { Server } from 'ws'

import { emitEventToClient } from './events/WebSocketEvents'
import { setupServer } from './server'

export const startServer = async (agent: Agent, config: ServerConfig) => {
  const socketServer = new Server({ noServer: true })
  const app = await setupServer(agent, config)
  const server = app.listen(config.port)

  socketServer.on('connection', (stream) => {
    emitEventToClient(socketServer, stream, agent)
  })

  server.on('upgrade', (request, socket, head) => {
    socketServer.handleUpgrade(request, socket as Socket, head, (socket) => {
      socketServer.emit('connection', socket, request)
    })
  })

  return socketServer
}
