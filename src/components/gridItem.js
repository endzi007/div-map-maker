import React, { Component } from "react";
import * as actions from '../js/actions';
import GameStore from '../js/store';
class GridItem extends Component{   
    constructor(){
        super();
        this.state = {
            class: "cell "
        }
    }
    handleMouseDown(e){
        e.preventDefault();
    }
    handleMove(e){
        if(GameStore.state.mousedown){
            let x = this.props.x;
            let y = this.props.y;
            e.target.className= "cell " + GameStore.state.currentClass;
        }
    }
    render(){
        return (
            <div className = {this.props.class} 
            onMouseOver ={this.handleMove.bind(this)}  
            onMouseDown ={this.handleMouseDown.bind(this)}
            style={{width: this.props.width, height: this.props.width}}>
            </div>
        );
    }
}

export default GridItem;