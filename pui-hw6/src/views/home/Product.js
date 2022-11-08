import React, { Component } from 'react';
import './home.css';

const glazeAdaption = {
    original: 0,
    sugar: 0,
    vanilla: 0.5,
    chocolate: 1.5
};

const sizeAdaption = {
    1: 1,
    3: 3,
    6: 5,
    12: 10
};

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            glaze: "original",
            size: "1",
            price: this.props.typePrice
        };
    }

    //code inspired by: https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change
    componentWillReceiveProps(nextProps) {
      this.setState({ price: nextProps.typePrice });
    }

    changeGlaze = event => {
        const newPrice = ((Number(this.props.typePrice) + Number(glazeAdaption[event.target.value])) * Number(sizeAdaption[this.state.size])).toFixed(2);
        this.setState({ glaze: event.target.value, price: newPrice });
    }

    changeSize = event => {
        const newPrice = ((Number(this.props.typePrice) + Number(glazeAdaption[this.state.glaze])) * Number(sizeAdaption[event.target.value])).toFixed(2);
        this.setState({ size: event.target.value, price: newPrice });
    }

    render() {
        return (
            <div className="roll">
              <img className="roll-img" src={this.props.imageURL} alt={this.props.title} />
              <h2>{this.props.title}</h2>
              <div className="choices">
                <p>Glazing:</p>
                <select id="original-glaze" name="glazes" className="glazes" onChange={this.changeGlaze} >
                  <option value="original">Keep original</option>
                  <option value="sugar">Sugar milk</option>
                  <option value="vanilla">Vanilla milk</option>
                  <option value="chocolate">Double chocolate</option>
                </select>
                <p>Pack Size:</p>
                {/*Radio button style is from https://codepen.io/w3programmings/pen/zzRKpy */}
                <div className="sizes">
                  <input type="radio" id={String(1) + this.props.type} value="1" name={this.props.type} onChange={this.changeSize} defaultChecked="checked" />
                  <label htmlFor={String(1) + this.props.type}>1</label>
                  <input type="radio" id={String(3) + this.props.type} value="3" name={this.props.type} onChange={this.changeSize} />
                  <label htmlFor={String(3) + this.props.type}>3</label>
                  <input type="radio" id={String(6) + this.props.type} value="6" name={this.props.type} onChange={this.changeSize} />
                  <label htmlFor={String(6) + this.props.type}>6</label>
                  <input type="radio" id={String(12) + this.props.type} value="12" name={this.props.type} onChange={this.changeSize} />
                  <label htmlFor={String(12) + this.props.type}>12</label>
                </div>
                <h3 id="original-price">{"$ " + this.state.price}</h3>
                <button type="button" onClick={() => this.props.addToCart(this.props.imageURL, this.props.title, this.props.type, this.state.glaze, this.state.size, this.state.price)}>
                  Add to Cart
                </button>
              </div>
            </div>
        )
    }
}

export default Product