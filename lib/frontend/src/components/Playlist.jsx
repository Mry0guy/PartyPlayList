import React from 'react'
import { connect } from 'react-redux'
import Song from './Song'

class Playlist extends React.Component {
    render() {
        return (
            <div className='playlistContainer'>
                {this.props.songs.array.forEach(element => {
                    <Song song={element} host={this.props.host}/>
                })}
            </div>
        )
    }
}

function mapStateToProps(state, ownprops) {
    return { songs: state.que, host: ownprops}
}

export default connect(mapStateToProps)(Playlist);
