import request from 'request'

export function login(user, party) {
    const loginData = {
        user: user,
        party: party
    }
    request({
        url: 'https://' + constants.url + '/api/login',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        json: true,
        body: loginData
    }, (error, res, body) => {
        if (error) {
            console.error('an error ocurred at token creation: ' + error)
        } else {
            console.log('token recived: ' + body.token)
            localStorage.setItem('bearerToken', body.token)
            put('TOKEN_RECIVED')
        }
    })
}