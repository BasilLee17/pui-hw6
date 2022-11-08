import React, { Component } from 'react';
import './home.css';

const glazeName = {
    original: "Keep original",
    sugar: "Sugar milk",
    vanilla: "Vanilla milk",
    chocolate: "Double chocolate"
}

class CartProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            glaze: this.props.glaze,
            size: this.props.size,
            price: this.props.price
        };
    }

    render() {
        return (
            <div className="cart-roll">
              <img className="cart-roll-img" src={this.props.imageURL} alt={this.props.title} />
              <div className="cart-text">
                  <p>{this.props.title}</p>
                  <p>{"Glazing: " + glazeName[this.props.glaze]}</p>
                  <p>{"Pack Size: " + this.props.size}</p>
                  <p className="cart-price">{"$ " + this.props.price}</p>
                  <button className="remove" onClick={() => this.props.removeFromCart(this.props.num)}>Remove</button>
               </div>
            </div>
        )
    }
}

export default CartProduct