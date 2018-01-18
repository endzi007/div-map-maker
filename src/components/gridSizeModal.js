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
            validation: "",
            validationSize: "",
            validationRows: "",
            validationCols: ""
        }
    }
    validationState(id){
        let element = document.getElementById(id);
        let elementVal = element.value;
        let regEx = new RegExp(/^[0-9]+$/g);
        console.log("test for 1ddd", regEx.test("1ddd"));
        let length = id==="boardSizePx" ? 4 : 3;
        let obj = {
            val: false,
            msg: ""
        }
        if(regEx.test(elementVal) || elementVal === ""){
            if(elementVal.length<=length){
                obj.val = true;
                obj.msg = "";
            } else {
                obj.val = false;
                obj.msg =  "you exceded maximum number for this value";
            }
        } else {
            obj.val = false; 
            obj.msg = "you must enter only numbers";
        }
        return obj; 
        
    }

    handleChange(e){
        let id = e.target.id;
        let validation = this.validationState(id);
        if(validation.val){
            if(id==="boardSizePx"){
                this.setState({
                    boardSizePx: e.target.value,
                    validationSize: ""
               });
            } else if(id==="numOfRows"){
                this.setState({
                    numOfRows: e.target.value,
                    validationRows: ""
               });
            } else if(id === "numOfCols"){
                this.setState({
                    numOfCols: e.target.value,
                    validationCols: ""
               });
            }

        } else {
            if(id==="boardSizePx"){
                this.setState({
                    validationSize: validation.msg
               });
            } else if(id==="numOfRows"){
                this.setState({
                    validationRows: validation.msg
               });
            } else if(id === "numOfCols"){
                this.setState({
                    validationCols: validation.msg
               });
            }
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
        if(this.state.boardSizePx === "" || this.state.numOfCols === "" || this.state.numOfRows === ""){
            return; 
        }
        actions.resizeBoard(this.state.boardSizePx, this.state.numOfCols, this.state.numOfRows);
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
                        autoComplete="off"
                    />
                    <HelpBlock>{this.state.validationSize}</HelpBlock>
                </FormGroup>


                <FormGroup>
                    <ControlLabel>Cols</ControlLabel>
                    <FormControl
                    id="numOfCols"
                    type="text"
                    label="Cols"
                    placeholder="Enter number of cols"
                    value={this.state.numOfCols}
                    onChange={this.handleChange.bind(this)}
                    autoComplete="off"
                />
                <HelpBlock>{this.state.validationCols}</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Rows</ControlLabel>
                    <FormControl
                    id="numOfRows"
                    type="text"
                    label="Rows"
                    placeholder="Enter number of rows"
                    value={this.state.numOfRows}
                    onChange={this.handleChange.bind(this)}
                    autoComplete="off"
                />
                <HelpBlock>{this.state.validationRows}</HelpBlock>
                </FormGroup>

            </form>
            </Modal.Body>
            <Modal.Footer>
                <Button id="saveToLocalStorage" bsStyle="info" onClick={this.handleClick.bind(this)}>Submit</Button>
                <Button bsStyle="danger" onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default GridSizeModal;