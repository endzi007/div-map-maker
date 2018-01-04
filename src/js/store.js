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
            widthInPx: 1100,
            currentClass: "wall"
        }
        this.addListener = this.addListener.bind(this);
    }

    changeItemClass(x, y, nameOfClass){
        let newState = {...this.state.board};
        _.flatMap(this.state.board, (element) => {
            var index = _.findIndex(element, {x, y});
            if(index !== -1){
                element.splice(index, 1, {life: nameOfClass, x, y});
            }
        });
        GameStore.emit("change");
    }

    makeMapArray(){
        let temp = document.getElementsByClassName("mainDiv")[0];
        let children = temp.childNodes;
        let arr = [...children];
        let x = 0;
        let y = 0;
        for (let i = 0; i < arr.length; i++) {
            if(x === this.state.boardDim.width){
                x = 0;
                y++;
            }
            const element = arr[i];
            let elementClass = element.attributes.class.nodeValue;
            if(elementClass !== "death"){
                this.changeItemClass(x, y, elementClass);
            }
            x++;
        }
        localStorage.setItem("temp", JSON.stringify(this.state.board));
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
    loadArray(){
        let level = JSON.parse(localStorage.getItem("temp"));
        this.state.board = level;
        //this.returnBoardState();
        this.emit("change");
    }

    changeMaterial(text){
        this.state.currentClass = text;
        this.emit("change");
    }

    addListener(action){
        switch (action.type) {
            case "OBJECT_CLICK":
            this.changeItemClass(action.x, action.y);
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
            case "LOAD_ARRAY": 
            this.loadArray();
            break;
            case "MOUSE_DOWN": 
            this.mousedown();
            break;
            case "MOUSE_UP": 
            this.mouseup();
            break;
            case "CHANGE_MATERIAL":
            this.changeMaterial(action.text);
            break;
            default:
                break;
        }
    }

}
let GameStore = new GameStoreCon();
Dispatcher.register(GameStore.addListener.bind(this));
export default GameStore;