import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import App from './app';
import Guests from './components/Guests';
import Hosts from './components/Hosts';
import 'styles/index.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

const Routes = () => (
	<Router>
		<MuiThemeProvider>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/guests" component={Guests} />
				<Route path="/hosts" component={Hosts} />
			</div>
		</MuiThemeProvider>
	</Router>
);

export default Routes;
