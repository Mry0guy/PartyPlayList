import React from 'react';
import 'normalize.css';
import 'styles/index.scss';
import withRouter from 'react-router-dom'

class App extends React.Component() {
	render() {
		return (
			<div className='App'>
				<div className='.homeButton' onClick={() => { this.props.history.push('/guest') }}>JOIN A PARTY</div>
				<div className='.homeButton' onClick={() => { this.props.history.push('/host') }}>START A PARTY</div>
			</div>
		)
	}
}

export default withRouter({ history })(App);
