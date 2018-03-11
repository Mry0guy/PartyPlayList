import https from 'https'
import { stringify } from 'querystring'
import constants from './constants'

const clientID = '18d27fa71dc945c5b8e554ed95c3d1ec'
const clientSecret = ' 82c80301b71543bc8940a622309233c8'

const url = 'https://accounts.spotify.com/authorize'

export function getSpotifyLogin(req, turnaround) {
    const querystring = stringify({ client_id: clientID, response_type: 'code', redirect_uri: 'https://' + constants.IpAddress })

    https.get(url + querystring, (res) => {
        let data = ""
        res.on('data', (dat) => {
            data += dat
        })
        res.on('end', () => {
            turnaround.send(data)
        })
        res.on('error', (e) => {
            turnaround.send('<b>an error occured:\n ' + e + '</b>')
        })
    })
}
