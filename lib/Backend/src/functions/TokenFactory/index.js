var jwt = require('jsonwebtoken')

exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body)
    const user = {
        user: body.user,
        party: body.party
    }
    console.log(user)
    jwt.sign(
        user,
        'lowkeysecret',
        { expiresIn: '1d', issuer: "PartyPlaylistApp" },

        (err, token) => {
            if (err) {
                console.log(err)
                callback("token not created" + err)
            } else {
                console.log('token created: ' + token)
                const response = {
                    "statusCode": 200,
                    "headers": {},
                    "body": JSON.stringify({ token }),
                    "isBase64Encoded": false
                }
                callback(null, response)
            }
        })
}
