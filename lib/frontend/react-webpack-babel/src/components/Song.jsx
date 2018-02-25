import React from 'react'

export default class Song extends React.Component {
    render() {
        return (
            <div className='songBox'>
                <span className='songTitle'>{this.props.song.title}</span>
                <span className='songArtist'>{this.props.song.artist}</span>
                <span className='songAlbum'>{this.props.song.album}</span>
                <div className='songScore'>{this.props.song.score}</div>
            </div>
        )
    }
}
