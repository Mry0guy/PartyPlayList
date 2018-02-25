import React from 'react'
import connect from 'react-redux'
import Song from './Song'

class Playlist extends React.Component {
    render() {
        return (
            <div>
                {this.props.songs.array.forEach(element => {
                    <Song song={element} />
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { songs: state.que }
}

export default connect(mapStateToProps)(Playlist);
