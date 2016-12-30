import React, {PropTypes,Component} from 'react';
import {connect, getState} from 'react-redux';
import {getCurrentDateTime} from './reducer';
import AdditionalInfo from './components/additionalInfoComponent';
import moment from 'moment';
import ReactDOM from 'react-dom';

import DigitalClock from './components/digitalClock.js';
import AnalogueClock from './components/analogueClock.js';

const CLOCK_INTERVAL = 100;

class App extends Component { 

	constructor(props){
		super(props);
		this.state = {isClockDigital: true, dateState : {isDayLightSavingsTime:false, currentDateTime: "2000-01-01T12:00Z"}, currentCount: 0};
		//this simple fix works until I have server side rendering intialising the state correctly
		this.props.dispatch(getCurrentDateTime());
		this.toggleClockDisplay = this.toggleClockDisplay.bind(this);
	}
	
	componentDidMount() {
		this.interval = setInterval(() => 
		this.props.dispatch(getCurrentDateTime()),
		CLOCK_INTERVAL);
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps !== this.props){
			this.setState(this.props.date === undefined ? {dateState : {isDayLightSavingsTime:false, currentDateTime: "2000-01-01T12:00Z"}}:
			{dateState : this.props.date});
		}
	}
  
	componentWillUnmount() {
		if (this.interval) {
		  clearInterval(this.interval);
		}
	}
		
	toggleClockDisplay(){
		this.setState(prevState => ({
		  isClockDigital: !prevState.isClockDigital
		}));
	}
  
   render() {
	  const dateInfo = this.state.dateState;
	  const min = moment(dateInfo.currentDateTime).minutes();
	  const hours = moment(dateInfo.currentDateTime).hours();
      return (
         <div>
			Click to change clock type: <button type="button" onClick={this.toggleClockDisplay}>{this.state.isClockDigital ? 'DIGITAL' : 'ANALOGUE'}</button>
			<h1>Hours {moment(dateInfo.currentDateTime).hours()}</h1>
			<h1>Minutes {min}</h1>
			<AdditionalInfo item="isDayLightSavingsTime" value={dateInfo.isDayLightSavingsTime.toString()}/>	
			<AdditionalInfo item="dayOfTheWeek" value={dateInfo.dayOfTheWeek}/>	
			<AdditionalInfo item="Date" value={moment(dateInfo.currentDateTime).format("DD-MM-YYYY")}/>
			{this.state.isClockDigital ? <DigitalClock minutes={min} hours={hours}/> : <AnalogueClock minutes={min} hours={hours} clockSize={200}/>}					
         </div>
      );
   }
}
  
App.propTypes = {
	date: React.PropTypes.shape({
      currentDateTime: React.PropTypes.string.isRequired,
      isDayLightSavingsTime: React.PropTypes.bool.isRequired,
	  dayOfTheWeek: React.PropTypes.string.isRequired
    })
}

export default connect(
  state => {
    return {date: state.date};
  }
)(App);