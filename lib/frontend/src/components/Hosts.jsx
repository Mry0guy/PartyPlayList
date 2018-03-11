import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField';
import { put } from 'redux-saga/effects'
import '../../styles/main.scss';


var textData = ['', '']

class Hosts extends React.Component {
	constructor() {
		super()
		postLogin.bind(this)
	}
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
							postLogin(textData[0], textData[1])
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

function postLogin(user, party) {
	this.props.dispatch({
		type: 'HOST_LOGIN',
			user,
			party
		}
	)
}

function MapStateToProps(state, ownProps) {
	if (state.pageQue) {
		return ({ page: state.pageQue })
	} else {
		return ({ page: null })
	}
}

export default connect(MapStateToProps)(Hosts);
