import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import GridComponent from './components/gridComponent';
import GameStore from './js/store';
import GameControls from './components/gameControls';
import Generation from './components/generationComponent';
import * as actions from './js/actions';
import ArrayModal from './components/arrayModal';
import LoadArrayModal from './components/loadArrayModal';
import GridSizeModal from './components/gridSizeModal';

class App extends Component {

  constructor(){
    super();
    this.state = {
      width: 1000
    }
  }
  handleDown(e){
    actions.mousedown();
  }
  handleUp(e){
      actions.mouseup();
  }
  componentDidMount(){
    GameStore.on("change", ()=>{
     this.setState({width: GameStore.state.boardDim.width});
    })
  }
  render() {
    let width = GameStore.state.widthInPx;
    return (
      <div onMouseDown ={this.handleDown} onMouseUp ={this.handleUp}>
        <Header />
        <GameControls />
        <div className="mainDiv" style ={{width: width+"px"}}>
         <GridComponent />
         <ArrayModal/>
         <LoadArrayModal/>
         <GridSizeModal />
      </div>
      </div>

    );
  }
}

export default App;