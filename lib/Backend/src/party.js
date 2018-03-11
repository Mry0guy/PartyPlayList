import playlist from './playlist'
import sh from 'shorthash'

var partyid = 0

class party {
    constructor(name, adminToken) {
        this.DisplayName = name
        this.id = partyid++
        this.playlist = new playlist()
        this.userTokens = []
        this.code = sh.unique(this.DisplayName + this.id)
        this.admin = adminToken
    }

    addSong(song, user) {
        this.playlist.addSong(song, user)
    }

    removeSong(song, user) {
        this.playlist.removeSong(song, user)
    }

    upVoteSong(song, user) {
        this.playlist.upVoteSong(song, user)
    }

    downVoteSong(song, user) {
        this.playlist.downVoteSong(song, user)
    }

    chantSong(song, user) {
        this.playlist.chantSong(song, user)
    }
}
