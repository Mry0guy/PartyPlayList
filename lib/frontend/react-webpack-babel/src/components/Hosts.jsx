import React from 'react';
import Playlist from './Playlist';

class Hosts extends React.Component {
	render() {
		return (
			<div>
				<Playlist host={true} />
			</div>
		)
	}

}
export default Hosts;
