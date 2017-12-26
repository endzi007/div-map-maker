import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
class Footer extends Component { 
    render(){
        return(
         <Navbar id="footerNavbar" fixedBottom>
            <h5> Built by <a href="https://enis-jasarovic.com" target="_blank">Endzi 007</a> with <i id="footerHeart" class="fa fa-heart"></i>for - <a href="https://www.freecodecamp.org/" target="_blank">FCC</a></h5>
          </Navbar>
        );
    }  
}

export default Footer;