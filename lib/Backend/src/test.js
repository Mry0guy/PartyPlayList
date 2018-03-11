import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'whatup'
    })
})

app.post('/api/post', verifyToken, (req, res) => {
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

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        email: 'ryanguild489@gmail.com',
        username: 'mry0guy'
    }

    jwt.sign({ user: user }, 'lowkeysecret', (err, token) => {
        res.json({ token })
    })
})

function verifyToken(req, res, next) {
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


app.listen(8080, () => { console.log('server started') })
