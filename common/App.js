import React, {PropTypes,Component} from 'react';
import {connect, getState} from 'react-redux';
import {getCurrentDateTime} from './reducer';
import AdditionalInfo from './additionalInfoComponent';
import moment from 'moment';
import ReactDOM from 'react-dom';

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
			{/*this needs cleaning up*/}
			<h1>Hours {moment(dateInfo.currentDateTime).hours()}</h1>
			<h1>Minutes {min}</h1>
			{/*Ideally should be getState(), then removed once server side rendering work correctly*/}
			<AdditionalInfo item="isDayLightSavingsTime" value={dateInfo.isDayLightSavingsTime.toString()}/>	
			<AdditionalInfo item="dayOfTheWeek" value={dateInfo.dayOfTheWeek}/>	
			<AdditionalInfo item="Date" value={moment(dateInfo.currentDateTime).format("DD-MM-YYYY")}/>
			{this.state.isClockDigital ? <DigitalClock minutes={min} hours={hours}/> : <AnalogueClockCanvas minutes={min} hours={hours} clockSize={200}/>}					
         </div>
      );
   }
}

class DigitalClock extends Component{
		constructor(props) {
		super(props);
	}
	render(){
		return(
		<div>{this.props.hours} : {this.props.minutes}</div>
		);
	}
}

class AnalogueClockCanvas extends Component{
	constructor(props) {
		super(props);
		this.state = {ctx: null};
	}	
	 
	render() {
	  const { ctx } = this.state;
	  const minutes = (this.props.minutes*Math.PI/30)
	  const hours = (this.props.hours*Math.PI/6)+ (minutes*Math.PI/(6*60));
      return (
         <div>	 
		 <Square width={this.props.clockSize} height={this.props.clockSize} onContext={ ctx => this.setState( { ctx } )  } colour={"yellow"}/>
			<Circle diameter={this.props.clockSize} size={this.props.clockSize} onContext={ ctx => this.setState( { ctx } )  } colour={"red"} fill={true}/>
			<Circle diameter={this.props.clockSize/5}  size={this.props.clockSize} onContext={ ctx => this.setState( { ctx } )  } colour={"green"} fill={true}/>
			<ClockNumber diameter={this.props.clockSize} size={this.props.clockSize} onContext={ ctx => this.setState( { ctx } )  }/>
			<Hand size={this.props.clockSize} handWidth={this.props.clockSize/40} lenght={this.props.clockSize/3} pos={minutes}/>
			<Hand size={this.props.clockSize} handWidth={this.props.clockSize/40} lenght={this.props.clockSize/5} pos={hours}/>
         </div>
      );
   }
}
  
  

class Hand extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ctx: null }
  };
  _renderHand() {	  
    const { ctx } = this.state;
    ctx.beginPath();
    ctx.lineWidth = this.props.handWidth;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(this.props.pos);
    ctx.lineTo(0, -this.props.lenght);
    ctx.stroke();
    ctx.rotate(-this.props.pos);
  }
  render() {
    const { ctx } = this.state;
    if( ctx ) {
      // come back and sort this 
	  ctx.clearRect(0, 0, this.props.size, this.props.size);
	  ctx.clearRect(0, 0, -this.props.size, -this.props.size);
	  ctx.clearRect(0, 0, -this.props.size, this.props.size);
	  ctx.clearRect(0, 0, this.props.size, -this.props.size);
      this._renderHand();
    }
    return (
      <Canvas className={ `GridCanvas}` }
              width={this.props.size} height={this.props.size} 
              onContext={ ctx => this.setState( { ctx } ) }
      />
    );
  };
}

class Canvas extends Component {
  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas),
    ctx = canvas.getContext("2d");
	ctx.translate(100, 100);
    this.props.onContext(ctx);
  }
  render() {
    const { width, height } = this.props;
    const canvasCx = `Canvas ${this.props.className}`;
    return (
      <canvas className={canvasCx} ref="canvas"
              width={width + "px"} height={height + "px"} 
              style={ { position: "absolute" } }
      />
    );
  };
}
Canvas.propTypes = 
  { width:     PropTypes.number.isRequired
  , height:    PropTypes.number.isRequired
  , onContext: PropTypes.func.isRequired
  };

class Square extends Component {
  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx = canvas.getContext("2d");
	ctx.fillStyle = this.props.colour;
	ctx.fillRect(0,0,this.props.width,this.props.height);
    this.props.onContext(ctx);
  }
  render() {
    const { width, height } = this.props;
	const divStyle = {
		position: 'absolute'
	};
    return (
      <canvas className={"square"} ref="canvas"
              width={width + "px"} height={height + "px"} style={divStyle}              
      />
    );
  };
}
Square.propTypes = 
  { width:     PropTypes.number.isRequired
  , height:    PropTypes.number.isRequired
  , onContext: PropTypes.func.isRequired
  , colour: PropTypes.string.isRequired
  };

class Circle extends Component {
  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx = canvas.getContext("2d");
	let radius = this.props.diameter/2;
	let centre = this.props.size/2;
	ctx.beginPath();
	ctx.arc(centre, centre, radius, 0, 2*Math.PI);
	if(this.props.fill == true){
		ctx.fillStyle = this.props.colour;
		ctx.fill();
	}
    this.props.onContext(ctx);
  }
  render() {
	const divStyle = {
		position: 'absolute'
	};
    return (
      <canvas className={"cirlce"} ref="canvas" width={this.props.size + "px"} height={this.props.size + "px"}
               style={divStyle}              
      />
    );
  };
}
Circle.propTypes = 
  { diameter: PropTypes.number.isRequired, 
	size: PropTypes.number.isRequired, 
	fill: PropTypes.bool.isRequired, 
	onContext: PropTypes.func.isRequired, 
	colour: PropTypes.string.isRequired
  }; 

class ClockNumber extends Component {
  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx = canvas.getContext("2d");
	let radius = this.props.diameter/2;
	ctx.translate(radius, radius);
	ctx.font = radius*0.15 + "px arial";
	ctx.textBaseline="middle";
	ctx.textAlign="center";
	for(let num = 1; num < 13; num++){
	this.placeNumber(num, radius, ctx);
	}
    this.props.onContext(ctx);
  }
  
  placeNumber(num, radius, ctx){
	    let ang= num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius*0.85);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius*0.85);
		ctx.rotate(-ang);
  }
  
  render() {
    const { width, height } = this.props;
	const divStyle = {
		position: 'absolute'
	};
    return (
      <canvas className={"clockNumber"} ref="canvas" width={this.props.size + "px"} height={this.props.size + "px"}
               style={divStyle}              
      />
    );
  };
}
ClockNumber.propTypes = 
  { diameter: PropTypes.number.isRequired, 
	size: PropTypes.number.isRequired, 
	onContext: PropTypes.func.isRequired
  };
  
App.propTypes = {
	//Correct shape needs adding
	date: PropTypes.object
}
  
export default connect(
  state => {
    return {date: state.date};
  }
)(App);