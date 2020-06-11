import React, { Component } from "react";

class ToggleShowMoreG extends Component {	
    constructor(props){
        super(props);
        
	} 
	componentDidMount() {
		//  window.scrollBy(0,300);
		// setTimeout
		setTimeout(function(){ window.scrollTo({
			top: 1500,
			left: 0,
			behavior: 'smooth'
		   });}, 100);
		
	}
	render() {
		let stringDisplay= this.props.article;
		
		
		return (
		
			<div> {<p>{stringDisplay}</p>
					
			} </div>
		);
	}
}

export default ToggleShowMoreG;