import React, { Component } from 'react';
import './home.css';

class Navigation extends Component {
    render() {
        return (
          <nav>
            <button id="products">PRODUCTS</button>
            <button>CART</button>
          </nav>
        )
    }
}

export default Navigation