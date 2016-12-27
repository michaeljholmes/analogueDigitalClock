import React, { PropTypes } from 'react';

export default function AdditionalInfo(props){
	const {item, value} = props;
	return(
		<div>
			<h1>{item} : {value}</h1>
		</div>
	);	
}