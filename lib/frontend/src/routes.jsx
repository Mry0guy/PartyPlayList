import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import LandingPage from './components/landingPage';
import Guests from './components/Guests';
import Hosts from './components/Hosts';
import 'styles/index.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import { TextField } from 'material-ui/TextField'
import 'normalize.css';
import 'styles/index.scss';
const _colors = require('material-ui/styles/colors')
const _colorManipulator = require('material-ui/utils/colorManipulator')
import _spacing2 from 'material-ui/styles/spacing'

const muiTheme = getMuiTheme({
	spacing: _spacing2.default,
	fontFamily: 'Roboto, sans-serif',
	borderRadius: 2,
	palette: {
		primary1Color: '#ffffff',
		primary2Color: '#ffffff',
		primary3Color: _colors.grey600,
		accent1Color: _colors.pinkA200,
		accent2Color: _colors.pinkA400,
		accent3Color: _colors.pinkA100,
		textColor: _colors.fullWhite,
		secondaryTextColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.7),
		alternateTextColor: '#303030',
		canvasColor: '#303030',
		borderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
		disabledColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
		pickerHeaderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12),
		clockCircleColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12)
	}
}
)

class Routes extends React.Component {
	render() {
		return (
			<Router>
				<MuiThemeProvider muiTheme={muiTheme}>
					<div className="invisidiv">
						<Route exact path="/" component={LandingPage} />
						<Route path="/guests" component={Guests} />
						<Route path="/hosts" component={Hosts} />
					</div>
				</MuiThemeProvider>
			</Router>
		)
	}
}

export default Routes;
