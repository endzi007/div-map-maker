import React, { Component } from 'react';
import GameStore from '../js/store';
class Generation extends Component { 
    constructor(){
        super();
        this.state = {
            generation: 0
        }
    }
    componentDidMount(){
        GameStore.on("change", ()=> {
            this.setState({generation: GameStore.state.generation});
        })
    }
    render(){
        return(
            <li className ="btn btn-link">Generations: {GameStore.state.generation}</li>  
        );
    }  
}

export default Generation;