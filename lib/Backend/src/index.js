import SocketIOServer from 'socket.io'
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import OAuthServer from 'express-oauth-server'
import jwt from 'jsonwebtoken'
import { getSpotifyLogin } from './spotify'
import path from 'path'
import fs from 'fs'


var userId = 0

let app = express()
let wsServer = new SocketIOServer()
wsServer.on('subscribe', (socket) => {
    socket.emit('CONNECTION_OK', { payload: 'test' })
})

let server = http.createServer(app)

wsServer.attach(server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
    res.json({
        message: 'API alive'
    })
})

app.post('/api/post', parseToken, (req, res) => {
    jwt.verify(req.token, 'lowkeysecret', (err, AuthData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'token accepted',
                AuthData: AuthData
            })
        }
    })

})

app.get('/api/spotifyLogin', parseToken, (req, res) => {
    jwt.verify(req.token, 'lowkeysecret', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            getSpotifyLogin(req, res)
        }
    })
})

app.post('/api/login', (req, res) => {

    const data = req.body
    const user = {
        id: userId++,
        host: data.host,
        party: data.party
    }
    jwt.sign(
        {
            user: user
        },
        'lowkeysecret',
        {
            expiresIn: '1d',
            issuer: "PartyPlaylistApp"
        },
        (err, token) => {
            if (err) { console.log(err) }
            console.log('New Token: ' + token)
            res.json({ token })
        }
    )
    console.log('user: ' + userId + 'logged in')
})

app.post('api/join', (req, res) => {
    const data = req.json()
    const user = {
        id: userId++,
        party: data.party
    }
})

function parseToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403);
    }
}


console.log('server started')
server.listen(80)

