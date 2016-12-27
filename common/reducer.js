
import fetch from 'isomorphic-fetch'
//Reducer
const LOAD_DATE_TIME = 'LOAD_DATE_TIME';
const RECIEVED_DATE_TIME = 'RECIEVED_DATE_TIME';
const FAILED_DATE_TIME = 'FAILED_DATE_TIME';

const initialState = {
  loaded: false
};

export default function clockApp(state=initialState, action) {
  switch (action.type) {
    case LOAD_DATE_TIME:
		return Object.assign({}, state, {
			loading: true
      })
	case RECIEVED_DATE_TIME:
	console.log(action.dateTime);
	return Object.assign({}, state, {
			loading: false,
			loaded: true,
			date: action.dateTime
      })
	case FAILED_DATE_TIME:
        return Object.assign({}, state, {
			loading: false,
			loaded: false,
			error: action.error
      })
    default:
      return state;
  }
}

//Action
export function loadCurrentDateTime() {
	console.log("loadCurrentDateTime");
  return {
    type: LOAD_DATE_TIME
  };
}

export function receivedCurrentDateTime(dateTime) {
	console.log("receivedCurrentDateTime");
  return {
    type: RECIEVED_DATE_TIME, dateTime
  };
}

export function failedToGetCurrentDateTime(error) {
	console.log("failedToGetCurrentDateTime");
  return {
    type: FAILED_DATE_TIME, error
  };
}

export function getCurrentDateTime() {
	console.log("getCurrentDateTime");
  return function (dispatch) {
	
    // app state is updated to inform that the API call is starting.
    dispatch(loadCurrentDateTime())
    // returns promise so that API can be made serverside and return before sending file.
    return fetch('http://worldclockapi.com/api/json/utc/now')
      .then(response => response.json())
      .then(json =>
        // Update the app state with the results of the API call.
        dispatch(receivedCurrentDateTime(json))
      )
	  .catch( error => dispatch(failedToGetCurrentDateTime(error)));
  }
}

export function isDateLoaded(globalState){
	console.log(globalState);
	return globalState.loaded !== false;
}