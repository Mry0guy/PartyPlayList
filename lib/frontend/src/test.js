import io from 'socket.io-client'
import constants from './constants'
import request from 'request'


console.log('loginSaga')
const loginData = {
    user: 'action.user',
    party: 'action.party'
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
        Put({ type: 'TOKEN_RECIVED' })
    }
})
