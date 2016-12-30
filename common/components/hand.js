import React, {PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';

export default class Hand extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ctx: null }
  };
  
   componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas),
    ctx = canvas.getContext("2d");
	ctx.translate(this.props.size/2, this.props.size/2);
    this.setState( { ctx } )
  }
  
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
      <canvas className={"hands_canvas"} ref="canvas"
              width={this.props.size} height={this.props.size} 
              style={ { position: "absolute" } }
      />
    );
  };
}

Hand.propTypes = 
  { size:     	PropTypes.number.isRequired, 
	lenght:    	PropTypes.number.isRequired,
	handWidth:  PropTypes.number.isRequired,
	pos:    	PropTypes.number.isRequired
  };