import jwt from 'javawebtoken'

export function rootSocket(socket) {
    console.log('socket client connected')

}

export function socketToken(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function (err, data) {
            if (err) return next(new Error('Authentication error'))
            socket.data = data;
            next();
        })
    } else {
        next(new Error('Authentication error'))
    }
}
