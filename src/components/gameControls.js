import React, { Component } from 'react';
import * as actions from '../js/actions';
import Generation from './generationComponent';
import $ from 'jquery';
import {CopyToClipboard} from 'react-copy-to-clipboard';
class GameControls extends Component { 
    handleClick(e){
        let id = e.target.id;
        if(id==="deleteSpan"){
            id="delete";
        }
        if(id === "wall" || id === "brick" || id === "wood" || id === "water" || id==="delete"){
            $(".material").removeClass("matActive");
            $("#"+id).addClass("matActive");
        }
        switch (id) {
            case "openModal":
                actions.openModal();
                break;
            case "clearBoard":
                actions.clearBoard();
            break;
            case "showLoadModal":
                actions.showLoadModal();
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
            case "delete":
                actions.changeMaterial("death");
            break;
            case "openCloseResizeModal":
                actions.openCloseResizeModal(true);
                break;
            default:
                break;
        }
    }
    render(){
        return(
            <ul id="gameControls">
                <i className="btn btn-primary" aria-hidden="true" id="openModal" onClick={this.handleClick.bind(this)}>Save</i>
                <i className="btn btn-info" id="showLoadModal" onClick={this.handleClick.bind(this)}>Load</i>
                <i className="btn btn-danger" id="clearBoard" onClick={this.handleClick.bind(this)}> Clear Board</i> 
                <i className="btn btn-danger" id="openCloseResizeModal" onClick={this.handleClick.bind(this)}> Resize board</i> 
                <li><div className="material wall matActive" id="wall" onClick={this.handleClick.bind(this)}></div> </li>
                <li><div className="material brick" id="brick" onClick={this.handleClick.bind(this)}></div> </li>
                <li><div className="material water" id="water" onClick={this.handleClick.bind(this)}></div> </li>
                <li><div className="material wood" id="wood" onClick={this.handleClick.bind(this)}></div> </li>
                <li><div className="material delete" id="delete" onClick={this.handleClick.bind(this)}><i id="deleteSpan" onClick={this.handleClick.bind(this)} class="fa fa-eraser" aria-hidden="true"></i></div></li>
            </ul>

        );
    }  
}

export default GameControls;