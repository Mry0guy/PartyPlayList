import jwt from 'jsonwebtoken'
var userId = 0
const user = {
    id: userId++,
    host: "that",
    party: "this"
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
    }
)
