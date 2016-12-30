import React, {PropTypes,Component} from 'react';
import Hand from './hand.js';
import Square from './square.js';
import Circle from './circle.js';
import ClockNumbers from './clockNumbers.js';

export default class AnalogueClock extends Component{
	constructor(props) {
		super(props);
	}	
	 
	render() {
	  const minutes = (this.props.minutes*Math.PI/30)
	  const hours = (this.props.hours*Math.PI/6)+ (minutes*Math.PI/(6*60));
      return (
         <div>	 
			<Square width={this.props.clockSize} height={this.props.clockSize} colour={"yellow"}/>
			<Circle diameter={this.props.clockSize} size={this.props.clockSize} colour={"red"} fill={true}/>
			<Circle diameter={this.props.clockSize/5}  size={this.props.clockSize} colour={"green"} fill={true}/>
			<ClockNumbers diameter={this.props.clockSize} size={this.props.clockSize}/>
			<Hand size={this.props.clockSize} handWidth={this.props.clockSize/40} lenght={this.props.clockSize/3} pos={minutes}/>
			<Hand size={this.props.clockSize} handWidth={this.props.clockSize/40} lenght={this.props.clockSize/5} pos={hours}/>
         </div>
      );
   }
}
AnalogueClock.propTypes ={ 
	hours:     PropTypes.number.isRequired, 
	minutes:    PropTypes.number.isRequired
  };