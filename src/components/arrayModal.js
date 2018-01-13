import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as actions from '../js/actions';
import GameStore from '../js/store';

class ArrayModal extends Component{

    constructor(){
        super();
        this.state = {showModal: false, content: "", inputVal: ""}
        this.loadDefaultState = this.loadDefaultState.bind(this);
    }

    //return state to default values - usualy when component unmount
    loadDefaultState(){
        this.setState({ content: "", inputVal: ""});
    }

    close(){
        actions.closeModal();
        this.loadDefaultState();
    }

    componentDidMount(){
        GameStore.on("change", ()=>{
            this.setState({
                showModal: GameStore.state.showModal,
                content: GameStore.state.boardString
            });
        })
    }

    handleClick(e){
        let id = e.target.id;
        switch(id){
            case "saveToLocalStorage":
            actions.saveToLocalStorage(this.state.inputVal);
            this.close();
            break;
            default:
            break;
        }
    }

    handleType(e){
        let value = e.target.value;
        this.setState({inputVal: value});
    }

    render(){
        
        return(
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header>Save to localStorage or Copy</Modal.Header>
            <Modal.Body>
               <textarea style={{"width": "100%", "height": "auto"}} readOnly rows="25" cols="100" value={this.state.content}></textarea>
                <input style={{"width": "100%", "height": "auto"}} type="text" value={this.state.inputVal} placeholder="enter level name" onChange={this.handleType.bind(this)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button id="saveToLocalStorage" bsStyle="info" onClick={this.handleClick.bind(this)}>Save to LocalStorage</Button>
                <Button bsStyle="danger" onClick={this.close.bind(this)}>Dissmiss</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default ArrayModal;