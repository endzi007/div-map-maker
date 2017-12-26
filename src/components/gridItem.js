import React, { Component } from "react";
import * as actions from '../js/actions';
import GameStore from '../js/store';
class GridItem extends Component{   
    constructor(){
        super();
        this.isDown = false;
    }

    handleMove(e){
        if(GameStore.state.mousedown){
            let x = this.props.x;
            let y = this.props.y;
            //actions.clickedObject(x, y);
            e.target.className="alive";
        }
    }
    render(){
        return (
            <div className = {this.props.class} 
            onMouseEnter ={this.handleMove.bind(this)}  
            style={{width: this.props.width, height: this.props.width}}>
            </div>
        );
    }
}

export default GridItem;