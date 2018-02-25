import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import App from './app';
import Guests from './components/Guests';
import Residents from './components/Residents';
import 'styles/index.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Routes = () => (
	<Router>
		<MuiThemeProvider>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/guests" component={Guests} />
				<Route path="/residents" component={Residents} />
			</div>
		</MuiThemeProvider>
	</Router>
);

export default Routes;
