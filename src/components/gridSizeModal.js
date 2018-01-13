import React, { Component } from 'react';
import { Modal, Button, Form, ControlLabel, FormGroup, FormControl, HelpBlock} from 'react-bootstrap';
import * as actions from '../js/actions';
import GameStore from '../js/store';

class GridSizeModal extends Component{

    constructor(){
        super();
        this.state = {
            showModal: false,
            boardSizePx: "",
            numOfRows: "",
            numOfCols: "",
            validation: ""
        }
    }
    validationState(id){
        let element = document.getElementById(id);
        let elementVal = element.value;
        let regEx = new RegExp(/[0-9]/g);
        let length = id==="boardSizePx" ? 4 : 3;
        if(regEx.test(elementVal)){
            if(elementVal.length<=length){
                return true;
            } else {
                this.setState({validation: "you exceded maximum number for this value"});
            }
        } else {
            this.setState({validation: "you must enter only numbers"});
            return false;
        }
        
    }

    handleChange(e){
        let id = e.target.id;
        let validation = this.validationState(id);
        if(validation){
            if(id==="boardSizePx"){
                this.setState({
                    boardSizePx: e.target.value
               });
            } else if(id==="numOfRows"){
                this.setState({
                    numOfRows: e.target.value
               });
            } else if(id === "numOfCols"){
                this.setState({
                    numOfCols: e.target.value
               });
            }

        } else {
            console.log("some error", this.state[id]);
        }

    }

    close(){
        actions.openCloseResizeModal(false);
    }

    componentDidMount(){
        GameStore.on("change", () => {
            this.setState({
                showModal: GameStore.state.showResizeModal
            });
        });
    }

    handleClick(e){
        
    }

    render(){
        return(
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header>Resize the grid</Modal.Header>
            <Modal.Body>
            <form>
                <FormGroup>
                    <ControlLabel>Size</ControlLabel>
                    <FormControl
                        id="boardSizePx"
                        type="text"
                        label="Size"
                        placeholder="Enter board size in pixels"
                        value={this.state.boardSizePx}
                        onChange={this.handleChange.bind(this)}
                    />
                    <HelpBlock>{this.state.validation}</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Size</ControlLabel>
                    <FormControl
                    id="numOfRows"
                    type="text"
                    label="Rows"
                    placeholder="Enter number of rows"
                    value={this.state.numOfRows}
                    onChange={this.handleChange.bind(this)}
                />
                </FormGroup>


                <FormGroup>
                    <ControlLabel>Size</ControlLabel>
                    <FormControl
                    id="numOfCols"
                    type="text"
                    label="Cols"
                    placeholder="Enter number of cols"
                    value={this.state.numOfCols}
                    onChange={this.handleChange.bind(this)}
                />
                </FormGroup>
              

            </form>
            </Modal.Body>
            <Modal.Footer>
                <Button id="saveToLocalStorage" bsStyle="info" onClick={this.handleClick.bind(this)}>Submit</Button>
                <Button bsStyle="danger" onClick={this.close.bind(this)}>Dissmiss</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default GridSizeModal;