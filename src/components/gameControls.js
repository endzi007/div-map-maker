import React, { Component } from 'react';
import * as actions from '../js/actions';
import Generation from './generationComponent';
import $ from 'jquery';
class GameControls extends Component { 
    handleClick(e){
        let id = e.target.id;
        if(id === "wall" || id === "brick" || id === "wood" || id === "water"){
            $(".material").removeClass("matActive");
            $("#"+id).addClass("matActive");
        }
        switch (id) {
            case "makeMapArray":
                actions.makeMapArray();
                break;
            case "clearBoard":
                actions.clearBoard();
            break;
            case "loadArray":
                actions.loadArray();
                break;
            case "wall":
                actions.changeMaterial(id);
                break;
            case "brick":
                actions.changeMaterial(id);
                break;
            case "water":
                actions.changeMaterial(id);
                break;
            case "wood":
                actions.changeMaterial(id);
                break;
            default:
                break;
        }
    }
    render(){
        return(
            <ul id="gameControls">
                <i className="btn btn-primary" aria-hidden="true" id="makeMapArray" onClick={this.handleClick.bind(this)}>Save</i>
                <i className="btn btn-info" id="loadArray" onClick={this.handleClick.bind(this)}>Load</i>
                <i className="btn btn-danger fa fa-eraser" id="clearBoard" onClick={this.handleClick.bind(this)}></i> 
                <li><div className="material wall matActive" id="wall" onClick={this.handleClick.bind(this)}></div> </li>
                <li><div className="material brick" id="brick" onClick={this.handleClick.bind(this)}></div> </li>
                <li><div className="material water" id="water" onClick={this.handleClick.bind(this)}></div> </li>
                <li><div className="material wood" id="wood" onClick={this.handleClick.bind(this)}></div> </li>
            </ul>

        );
    }  
}

export default GameControls;