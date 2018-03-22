var jwt = require('jsonwebtoken')

exports.handler = (event, context, callback) => {
    const userData = {
        user: event.user,
        party: event.party
    }
    jwt.sign(
        {user: userData},
        'lowkeysecret',
        {expiresIn: '1d', issuer: "PartyPlaylistApp"},
        (err, token) => {
            if (err){
                callback()
            }else {
                callback(null,{token: token})
            }
        }
    )
}