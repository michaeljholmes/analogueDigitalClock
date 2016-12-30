import React, {PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';

export default class Circle extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ctx: null }
  };
  
   componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas),
    ctx = canvas.getContext("2d");
    this.setState( { ctx } )
  }
  
  _renderCircle() {	  
    const { ctx } = this.state;
	let radius = this.props.diameter/2;
	let centre = this.props.size/2;
	ctx.beginPath();
	ctx.arc(centre, centre, radius, 0, 2*Math.PI);
	if(this.props.fill == true){
		ctx.fillStyle = this.props.colour;
		ctx.fill();
	}
  }
  render() {
    const { ctx } = this.state;
    if( ctx ) {
	  ctx.clearRect(0, 0, this.props.size, this.props.size);
      this._renderCircle();
    }
    return (
      <canvas className={"square_canvas"} ref="canvas"
              width={this.props.size + "px"} height={this.props.size + "px"}
              style={ { position: "absolute" } }
      />
    );
  };
}

Circle.propTypes = 
  { diameter: PropTypes.number.isRequired, 
	size: PropTypes.number.isRequired, 
	fill: PropTypes.bool.isRequired, 
	colour: PropTypes.string.isRequired
  };