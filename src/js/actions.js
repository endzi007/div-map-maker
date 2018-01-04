import Dispatcher from './dispatcher';

export let clickedObject = (x, y) => {
    Dispatcher.dispatch({
        type: "OBJECT_CLICK",
        x: x,
        y: y
    });
}

export let makeMapArray = () => {
    Dispatcher.dispatch({
        type: "MAKE_MAP_ARRAY"
    });
}


export let loadArray = () => {
    Dispatcher.dispatch({
        type: "LOAD_ARRAY"
    });
}

export let stopGame = () => {
    Dispatcher.dispatch({
        type: "STOP_GAME"
    });
}

export let clearBoard = () => {
    Dispatcher.dispatch({
        type: "CLEAR_BOARD"
    });
}

export let changeMaterial = (text) => {
    Dispatcher.dispatch({
        type: "CHANGE_MATERIAL",
        text: text
    });
}


export let changeBoardSize = (id) => {
    Dispatcher.dispatch({
        type: "CHANGE_BOARD_SIZE",
        id: id
    });
}

export let mousedown = () => {
    Dispatcher.dispatch({
        type: "MOUSE_DOWN"
    });
}

export let mouseup = () => {
    Dispatcher.dispatch({
        type: "MOUSE_UP"
    });
}