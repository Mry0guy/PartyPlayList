import jwt from 'jsonwebtoken'

export function rootSocket(socket) {
    console.log('socket client connected')
    socket.on('subscribe', () => {
        socket.emit('CONNECTION_OK')
    })

}

export function socketToken(socket, next) {
    console.log('socket auth:')
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function (err, data) {
            if (err) {
                console.log('authFail')
                next(new Error('Authentication error'))
            }
            socket.data = data;
            next();
        })
    } else {
        console.log('No Token')
        next(new Error('Authentication error'))
    }
}
