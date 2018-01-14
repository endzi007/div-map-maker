import React, {Component} from 'react';
import * as actions from '../js/actions';

class DeleteItemSpan extends Component{
    handleClick(e){
        e.stopPropagation();
        actions.deleteItem(this.props.idRef);
    }
    render(){
        return(<i className="fa fa-ban pull-right delateItemSpan" aria-hidden="true" onClick={this.handleClick.bind(this)}></i>);
    }
}

export default DeleteItemSpan;
