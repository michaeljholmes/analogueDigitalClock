import React, {PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';

export default class Square extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ctx: null }
  };
  
   componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas),
    ctx = canvas.getContext("2d");
    this.setState( { ctx } )
  }
  
  _renderSquare() {	  
    const { ctx } = this.state;
	ctx.fillStyle = this.props.colour;
	ctx.fillRect(0,0,this.props.width,this.props.height);
  }
  render() {
	const { width, height } = this.props;
    const { ctx } = this.state;
    if( ctx ) {
	  ctx.clearRect(0, 0, this.props.size, this.props.size);
      this._renderSquare();
    }
    return (
      <canvas className={"square_canvas"} ref="canvas"
              width={width + "px"} height={height + "px"}
              style={ { position: "absolute" } }
      />
    );
  };
}

Square.propTypes = 
  { width:     PropTypes.number.isRequired, 
	height:    PropTypes.number.isRequired, 
	colour: PropTypes.string.isRequired
  };