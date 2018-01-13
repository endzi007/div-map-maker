import React, { Component } from "react";
import GridItem from './gridItem';
import GameStore from '../js/store';
import _ from 'lodash';
class GridComponent extends Component {
    constructor(){
        super();
        this.state = {
            board: []
        }
    }
    componentWillMount(){
        this.setState({
            board: GameStore.returnBoardState()
        });
    }
    componentDidMount(){
        GameStore.on("change", () => {
            this.setState({
                board: GameStore.returnBoardState()
            }); 
        });
    }

    changeState(){
        GameStore.on("change", () => {
            let temp = GameStore.returnBoardState();
            this.setState({
                board: temp
            });
        });

    }
    render(){
        let width = GameStore.state.widthInPx/GameStore.state.boardDim.width;
        var temp = [];
        for (let i = 0; i < this.state.board.length; i++) {
            const element = this.state.board[i];

            
        }
        _.map(_.flattenDeep(this.state.board), function(element, i){
            temp.push(<GridItem width = {width} key={"div_"+i} id={"div"+element.x+"_"+element.y} x ={element.x} y={element.y} class= {"cell " + element.life}/>)
        });
                
        return(
            temp
        );


    }
}

export default GridComponent;