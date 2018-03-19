import io from 'socket.io-client'
import constants from './constants'


const client = io(constants.url)
client.on('connect', () => {
    console.log('connect')
})
client.on('message', (data) => {
    console.log(data)
})

