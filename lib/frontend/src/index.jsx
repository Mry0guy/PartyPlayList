import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import Routes from './routes'
import middleware from 'redux-saga'
import { setupSaga } from './saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createSagaMonitor, DockableSagaView } from '../redux-saga-devtools/src/index.js'

const monitor = createSagaMonitor()
const initialState = { host: false, que: [], SEARCH_RESULTS: [], pageQue: null }
const sagaMiddleware = middleware({ sagaMonitor: monitor })
const middlewareList = [sagaMiddleware]
const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewareList))
var store = createStore(rootReducer, initialState, composedEnhancers)

sagaMiddleware.run(setupSaga)



ReactDOM.render(
	<AppContainer>
		<div className="invisidiv">
			<Provider store={store}>
				<Routes />
			</Provider>
			<DockableSagaView monitor={monitor} />
		</div>
	</AppContainer>,
	document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/landingPage', () => {
		const NextApp = require('./components/landingPage').default;
		ReactDOM.render(
			<AppContainer>
				<div className="invisidiv">
					<Provider store={store}>
						<NextApp />
					</Provider>
					<DockableSagaView monitor={monitor} />
				</div>
			</AppContainer>,
			document.getElementById('app')
		);
	});
}
//
