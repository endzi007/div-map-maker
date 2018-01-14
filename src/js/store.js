import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import gridItem from '../components/gridItem';
import $ from 'jquery';

class GameStoreCon extends EventEmitter{
    constructor(){
        super();
        this.state = {
            boardDim: {
                width: 100,
                height: 70
            },
            board:[],
            on: true,
            mousedown: false,
            widthInPx: 1000,
            currentClass: "wall",
            showModal: false,
            boardString: "",
            localKeys: [],
            showLoadModal: false,
            showResizeModal: false
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
        for (let i = 0; i < arr.length-1; i++) {
            if(x === this.state.boardDim.width){
                x = 0;
                y++;
            }
            const element = arr[i];
            let elementClass = element.attributes.class.nodeValue;
            if(elementClass.indexOf("death") === -1){
                this.changeItemClass(x, y, elementClass);
            }
            x++;
        }
        this.state.boardString = JSON.stringify(this.state.board); 

    }
    saveToLocalStorage(level){
        localStorage.setItem(level, this.state.boardString);
        this.emit("change");
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
                let obj = {
                    life: "",
                    x: "",
                    y: ""
                }
                obj.x = x;
                obj.y = i;
                obj.life = "cell death";
                temp.push(obj);
           }
           this.state.board.push(temp);
        }
    }

    clearBoard(){
        _.map(_.flattenDeep(this.state.board),function(element){
            element.life = "death";
        });
        let rootEl = document.getElementsByClassName("cell");
        _.flatMap(rootEl, (element) => {
            element.className = "cell death";
        });
        this.emit("change");
    }

    changeBoardSize(id){
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

    mouseup(){
        this.state.mousedown = false;
        this.emit("change");
    }
    mousedown(){
        this.state.mousedown = true;
        this.emit("change");
    }
    showLoadModal(){
        let localKeys = [];
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                localKeys.push(key);
            }
        }
        this.state.localKeys = localKeys;
        this.state.showLoadModal = true;
        this.emit("change");
    }
    loadArray(id){
        let storageItem = JSON.parse(localStorage.getItem(id));
        this.state.board = storageItem;
        this.emit("change");
    }

    closeLoadModal(){
        this.state.showLoadModal = false;
        this.emit("change");
    }

    changeMaterial(text){
        this.state.currentClass = text;
        this.emit("change");
    }

    closeModal(){
        this.state.showModal = false;
        this.emit("change");
    }
    openModal(){
        this.state.showModal = true;
        this.makeMapArray();
        this.emit("change");
    }

    openCloseResizeModal(show){
        this.state.showResizeModal = show;
        this.emit("change");
    }

    resizeBoard(size, cols, rows){
        this.state.widthInPx = size;
        this.state.boardDim.width = cols;
        this.state.boardDim.height = rows;
        this.setupGame();
        this.emit("change");
    }
    deleteItem(id){
        let temp = _.remove(this.state.localKeys, (n) => {
            return n === id;
        });
        localStorage.removeItem(id);
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
            case "SHOW_LOAD_MODAL": 
                this.showLoadModal();
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
            case "CLOSE_MODAL":
                this.closeModal();
                break;
            case "OPEN_MODAL":
                this.openModal();
                break;
            case "CLOSE_LOAD_MODAL": 
                this.closeLoadModal();
                break;
            case "SAVE_TO_LOCAL_STORAGE":
                this.saveToLocalStorage(action.level);
                break;
            case "LOAD_ARRAY":
                this.loadArray(action.id);
                break;
            case "OPEN_CLOSE_RESIZE_MODAL":
                this.openCloseResizeModal(action.show);
                break;
            case "RESIZE_BOARD": 
                this.resizeBoard(action.size, action.cols, action.rows);
                break;
            case "DELETE_ITEM":
                this.deleteItem(action.id);
            default:
                break;
        }
    }

}
let GameStore = new GameStoreCon();
Dispatcher.register(GameStore.addListener.bind(this));
export default GameStore;