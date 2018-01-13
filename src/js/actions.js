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


export let showLoadModal = () => {
    Dispatcher.dispatch({
        type: "SHOW_LOAD_MODAL"
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


export let closeModal = () => {
    Dispatcher.dispatch({
        type: "CLOSE_MODAL"
    });
}



export let openModal = () => {
    Dispatcher.dispatch({
        type: "OPEN_MODAL"
    });
}

export let copyToClipboard = () => {
    Dispatcher.dispatch({
        type: "COPY_TO_CLIPBOARD"
    });
}


export let saveToLocalStorage = (level) => {
    Dispatcher.dispatch({
        type: "SAVE_TO_LOCAL_STORAGE",
        level: level
    });
}


export let closeLoadModal = () => {
    Dispatcher.dispatch({
        type: "CLOSE_LOAD_MODAL"
    });
}

export let loadArray = (id) => {
    Dispatcher.dispatch({
        type: "LOAD_ARRAY",
        id: id
    });
}


export let openCloseResizeModal = (show) => {
    Dispatcher.dispatch({
        type: "OPEN_CLOSE_RESIZE_MODAL",
        show: show
    });
}