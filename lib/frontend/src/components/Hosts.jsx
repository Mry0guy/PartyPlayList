import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { put } from 'redux-saga/effects'
import '../../styles/main.scss';

var textData = ['', '']

class Hosts extends React.Component {
	render() {
		if (this.props.page === null) {
			return (
				<div className='LandingContainer'>
					<div className='LandingOutline'>
						<span className='homeTitle'>Enter A User Name</span>
						<TextField id='field1' onChange={(obj, value) => {
							textData[0] = value
						}} />
						<span className='homeTitle'>Enter A Party Name</span>
						<TextField id='feild2' onChange={(obj, value) => {
							textData[1] = value
						}} />
						<button type='button' name='loginButton' style={{ display: 'none' }} />
						<span label='loginButton' className='homeButton' onClick={() => {
							this.props.postLogin(textData[0], textData[1])
						}} >START A PARTY</span>
					</div>
				</div>
			)
		} else {
			console.log(this.props.page)
			return (
				<div className='LandingContainer'>
					<div className='LandingOutline'>
						{this.props.page}
					</div>
				</div>
			)
		}
	}
}

function MapDispatchToProps(dispatch) {
	const login = (user, party) => {
		dispatch({ type: 'HOST_LOGIN', payload: { user, party } })
	}
	return ({
		postLogin: login
	})
}


function MapStateToProps(state, ownProps) {
	if (state.pageQue) {
		return ({ page: state.pageQue })
	} else {
		return ({ page: null })
	}
}

export default connect(MapStateToProps, MapDispatchToProps)(Hosts);
