import React, {PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';

export default class ClockNumbers extends Component {
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
	this.setState({ctx});
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
ClockNumbers.propTypes = 
  { diameter: PropTypes.number.isRequired, 
	size: PropTypes.number.isRequired
  };