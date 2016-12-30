import React, {PropTypes,Component} from 'react';

export default class DigitalClock extends Component{
		constructor(props) {
		super(props);
	}
	render(){
		return(
		<div className="digital_clock">{this.props.hours} : {this.props.minutes}</div>
		);
	}
}
DigitalClock.propTypes ={ 
	hours:     PropTypes.number.isRequired, 
	minutes:    PropTypes.number.isRequired
  };