import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import clockApp from './reducer.js';

const store = createStore(
	clockApp,
	applyMiddleware(
		thunkMiddleware
	)
)

export default store;