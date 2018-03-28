import express from 'express'
import SocketIOServer from 'socket.io'
import http from 'http'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()
const httpserver = http.createServer(app)
const ws = SocketIOServer(httpserver)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'test')))

app.use('/', express.static(path.join(__dirname, 'test/index.html')))
ws.on('connection', function (socket) {
    console.log('A user connected');

    //Send a message after a timeout of 4seconds
    setTimeout(function () {
        socket.send('CONNECTION_OK');
    }, 2000);

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

httpserver.listen(80, () => {
    console.log('server started on port 80')
})
