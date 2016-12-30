import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/App.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import clockApp from '../common/reducer.js';

const preloadedState = window.__PRELOADED_STATE__
const store = createStore(
	clockApp,
	applyMiddleware(
		thunkMiddleware
	)	
)

ReactDOM.render(  
	<Provider store={store}>
		<App/>
	</Provider>, 
	document.getElementById('app')
);