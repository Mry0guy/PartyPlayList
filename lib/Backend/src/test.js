import express from 'express'
import SocketIOServer from 'socket.io'
import http from 'http'

const app = express()
const httpserver = http.createServer(app)
const ws = new SocketIOServer({ httpserver })

ws.on('subscribe', (socket) => {
    socket.emit({ type: 'CONNECTION_OK' })
})

httpserver.listen(80)
