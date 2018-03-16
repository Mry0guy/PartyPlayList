import io from 'socket.io-client'
import constants from './constants'


const client = io(constants.url)
client.on('connect', () => {
    console.log('connect')
})
client.on('CONNECTION_OK', () => {
    console.log('message')
})

client.emit({ type: 'subscribe' })
