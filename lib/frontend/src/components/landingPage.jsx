import React from 'react';
import { withRouter } from 'react-router-dom'

class LandingPage extends React.Component {
	render() {
		return (
			<div className='LandingContainer'>
				<div className='LandingOutline'>
					<span className='homeButton' onClick={() => { this.props.history.push('/guests') }}>JOIN A PARTY</span>
					<span className='homeButton' onClick={() => { this.props.history.push('/hosts') }}>START A PARTY</span>
				</div>
			</div>
		)
	}
}

export default withRouter(LandingPage);
