import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import Routes from './routes'
import middleware from 'redux-saga'
import { setupSaga } from './saga'


const initialState = { host: false, que: [], SEARCH_RESULTS: [] }
const sagaMiddleware = middleware()
const middlewareList = [sagaMiddleware]
const enhancers = []
const composedEnhancers = compose(applyMiddleware(...middlewareList), ...enhancers)
var store = createStore(rootReducer, initialState, composedEnhancers)

sagaMiddleware.run(setupSaga)



ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<Routes />
		</Provider>
	</AppContainer>,
	document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/landingPage', () => {
		const NextApp = require('./components/landingPage').default;
		ReactDOM.render(
			<AppContainer>
				<Provider store={store}>
					<NextApp />
				</Provider>
			</AppContainer>,
			document.getElementById('app')
		);
	});
}
