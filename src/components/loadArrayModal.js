import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as actions from '../js/actions';
import GameStore from '../js/store';
import _ from 'lodash';


class StorageItem extends Component{
    handleClick(e){
        actions.loadArray(e.target.id);
    }
    render(){
        return(<li className={this.props.classN}onClick={this.handleClick.bind(this)} id={this.props.id}>{this.props.value}</li>);
    }
}
class LoadArrayModal extends Component{

    constructor(){
        super();
        this.state = {showModal: false, content: []}
        this.loadDefaultState = this.loadDefaultState.bind(this);
    }

    //return state to default values - usualy when component unmount
    loadDefaultState(){
        this.setState({ content: "", inputVal: ""});
    }


    componentDidMount(){
        GameStore.on("change", ()=>{
            this.setState({
                content: GameStore.state.localKeys,
                showModal: GameStore.state.showLoadModal
            });
        })
    }

    close(){
        actions.closeLoadModal();
        this.loadDefaultState();
    }

    handleClick(e){
        let id = e.target.id;
        switch(id){
            case "saveToLocalStorage":
            actions.saveToLocalStorage(this.state.inputVal);
            break;
            default:
            break;
        }
    }

    render(){
        let array = GameStore.state.localKeys;
        let listItems = [];
            _.map(array, (element, i)=>{
                listItems.push(
                <StorageItem classN="storageItem" value ={element} id={element} key={element+i} />
            )});
        return(
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header>Load saved map</Modal.Header>
            <Modal.Body>
                <ul>
                    {listItems}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="danger" onClick={this.close.bind(this)}>Dissmiss</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default LoadArrayModal;