import React, { Component } from 'react';
import * as actions from '../js/actions';
import Generation from './generationComponent';
class GameControls extends Component { 
    handleClick(e){
        let id = e.target.id;
        switch (id) {
            case "clearBoard":
                actions.clearBoard();
            break;
            case "70x50":
            actions.changeBoardSize(id);
            break;
            case "50x30":
            actions.changeBoardSize(id);
            break;
            case "100x70":
            actions.changeBoardSize(id);
            break;
            default:
                break;
        }
    }
    render(){
        return(
            <ul id="gameControls">
                <i className="btn btn-primary fa fa-play" aria-hidden="true" id="startGame" onClick={this.handleClick.bind(this)}></i>
                <i className="btn btn-info fa fa-pause" id="stopGame" onClick={this.handleClick.bind(this)}></i>
                <i className="btn btn-danger fa fa-eraser" id="clearBoard" onClick={this.handleClick.bind(this)}></i> 
                <i className="btn btn-danger fa fa-repeat" id="makeStep" onClick={this.handleClick.bind(this)}></i>         
                <i className="btn btn-default" id="70x50" onClick={this.handleClick.bind(this)}>70 x 50</i>
                <form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
            </ul>

        );
    }  
}

export default GameControls;