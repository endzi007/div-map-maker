import Dispatcher from './dispatcher';

export let clickedObject = (x, y) => {
    Dispatcher.dispatch({
        type: "OBJECT_CLICK",
        x: x,
        y: y
    });
}

export let startGame = () => {
    Dispatcher.dispatch({
        type: "START_GAME"
    });
}

export let stopGame = () => {
    Dispatcher.dispatch({
        type: "STOP_GAME"
    });
}

export let clearBoard = (text) => {
    Dispatcher.dispatch({
        type: "CLEAR_BOARD"
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