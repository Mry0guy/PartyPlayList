import React from 'react';
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'

class Guests extends React.Component {
	render() {
		return (
			<div className='LandingContainer'>
				<div className='LandingOutline'>
					<AppBar />
					<TextField className='textInput' floatingLabelText='Your Party Code:' floatingLabelStyle={{ color: 'white', textSize: '30pt' }} floatingLabelFocusStyle={{ color: 'white', textSize: '40pt' }} />
					<span className='homeButton'>GO PARTY</span>
				</div>
			</div>
		)
	}
}

export default Guests;
