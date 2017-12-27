import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Button, Nav, NavItem } from 'react-bootstrap';
import * as actions from '../js/actions';
import Generation from './generationComponent';
class Header extends Component { 
    render(){
        return(
        <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Game of Life</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <ul className="nav navbar-nav">
                    <li><a href="https://github.com/endzi007/game-of-life" target="_blank"><i className="fa fa-github fa-lg" aria-hidden="true"></i> Github repository</a></li>
                    <li><a href="https://linkedin.com/in/enis-jašarović-2b9794132" target="_blank"><i className="fa fa-linkedin fa-lg" aria-hidden="true"></i> linkedIn</a></li>
                    <li><a href="https://enis-jasarovic.com" target="_blank"><i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> My Portfolio</a></li>
                </ul> 
            </Navbar.Collapse>
        </Navbar>        

        );
    }  
}

export default Header;