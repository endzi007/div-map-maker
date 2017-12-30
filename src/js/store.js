import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import gridItem from '../components/gridItem';

class GameStoreCon extends EventEmitter{
    constructor(){
        super();
        this.state = {
            boardDim: {
                width: 70,
                height: 50
            },
            board:[],
            on: true,
            mousedown: false,
            widthInPx: 1100
        }
        this.addListener = this.addListener.bind(this);
    }

    objectClick(x, y){
        let newState = {...this.state.board};
        _.flatMap(this.state.board, (element) => {
            var index = _.findIndex(element, {x, y});
            if(index !== -1){
                element.splice(index, 1, {life: "alive", x, y});
            }
        });
        GameStore.emit("change");
    }

    returnBoardState(){
        if(this.state.board.length === 0){
            this.setupGame();
        }
        return this.state.board;
    }

    setupGame(){
        this.state.board = [];
        for (let i = 0; i < this.state.boardDim.height; i++) {
            let temp = [];
            for (let x = 0; x < this.state.boardDim.width; x++) {
                let aliveItem = Math.round(Math.random()*this.state.boardDim.width);
                let obj = {
                    life: "",
                    x: "",
                    y: ""
                }
                obj.x = x;
                obj.y = i;
                obj.life = "death";
                temp.push(obj);
           }
           this.state.board.push(temp);
        }
    }

    clearBoard(){
        _.map(_.flattenDeep(this.state.board),function(element){
            element.life = "death";
        });
        this.state.generation = 0;
        this.emit("change");
    }

    changeBoardSize(id){
        console.log(id);
        if(id === "70x50"){
            this.state.boardDim.width = 70;
            this.state.boardDim.height = 50;
        } else if("50x30"){
            this.state.boardDim.width = 50;
            this.state.boardDim.height = 30;
        } else if("100x70"){
            this.state.boardDim.width = 100;
            this.state.boardDim.height = 70;
        }
        this.setupGame();
        this.emit("changed width");
    } 
    makeStep(){
        this.state.on = false;
        this.playGame();
    }

    mouseup(){
        this.state.mousedown = false;
        this.emit("change");
    }

    mousedown(){
        this.state.mousedown = true;
        this.emit("change");
    }

    makeMapArray(){
        let temp = document.getElementsByClassName("mainDiv")[0];
        let children = temp.childNodes;
        let arr = [...children];
        console.log(arr[0].class);
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            console.log(typeof element.attributes[0].class);
        }
        //continue here
        //loop trough all divs and find all that have alive class and puts them on new array state

    }
    addListener(action){
        switch (action.type) {
            case "OBJECT_CLICK":
            this.objectClick(action.x, action.y);
                break;
            case "MAKE_MAP_ARRAY":
            this.makeMapArray();
                break;
            case "CLEAR_BOARD":
            this.clearBoard();
                break;
            case "CHANGE_BOARD_SIZE":
            this.changeBoardSize(action.id);
            break;
            case "MAKE_STEP": 
            this.makeStep();
            break;
            case "MOUSE_DOWN": 
            this.mousedown();
            break;
            case "MOUSE_UP": 
            this.mouseup();
            break;
            default:
                break;
        }
    }

}
let GameStore = new GameStoreCon();
Dispatcher.register(GameStore.addListener.bind(this));
export default GameStore;