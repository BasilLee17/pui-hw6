import './home.css';
import logo from './assets/logo-01.svg';
import original from './assets/original-cinnamon-roll.jpg';
import apple from './assets/apple-cinnamon-roll.jpg';
import raisin from './assets/raisin-cinnamon-roll.jpg';
import walnut from './assets/walnut-cinnamon-roll.jpg';
import chocolate from './assets/double-chocolate-cinnamon-roll.jpg';
import strawberry from './assets/strawberry-cinnamon-roll.jpg';
import Product from './Product.js';
import CartProduct from './CartProduct.js';
import Navigation from './Navigation.js';
import React, { useRef } from 'react';

function Home() {

    var cartVisible = false;

    const pTagRef = useRef();

    const [searchResult, setSearchResult] = React.useState(null);

    const [cart, setCart] = React.useState([]);

    const [cartPrice, setCartPrice] = React.useState(0);

    const [cartNum, setCartNum] = React.useState(0);

    const [sortResult, setSortResult] = React.useState("name");

    const [rollData, setRollData] = React.useState([{
                       imageURL: original,
                       title: "Original cinnamon roll",
                       type: "original",
                       typePrice: "2.49",
                      },
                      {
                       imageURL: apple,
                       title: "Apple cinnamon roll",
                       type: "apple",
                       typePrice: "3.49",
                      },
                      {
                       imageURL: raisin,
                       title: "Raisin cinnamon roll",
                       type: "raisin",
                       typePrice: "2.99",
                      },
                      {
                       imageURL: walnut,
                       title: "Walnut cinnamon roll",
                       type: "walnut",
                       typePrice: "3.49",
                      },
                      {
                       imageURL: chocolate,
                       title: "Double-chocolate cinnamon roll",
                       type: "chocolate",
                       typePrice: "3.99",
                      },
                      {
                       imageURL: strawberry,
                       title: "Strawberry cinnamon roll",
                       type: "strawberry",
                       typePrice: "3.99",
                      }]);

    const addToCart = (imageURL, title, type, glaze, size, price) => {
        const newCart = cart.concat({ imageURL, title, type, glaze, size, price});
        setCart(newCart);
        setCartPrice(Number(cartPrice) + Number(price));
        setCartNum(cartNum + 1);
        pTagRef.current.innerText = "";
        document.querySelector('#itemNum').innerText = "Shopping Cart (" + (cartNum + 1) + " items)";
        document.querySelector('#total').innerText = "Total: $ " + (Number(cartPrice) + Number(price)).toFixed(2);
    }

    const removeFromCart = (id) => {
        var newCart = [];
        for (var i=0; i<cart.length; i++) {
            if (i != id) {
                newCart.push(cart[i]);
            }
        }
        setCartPrice(Number(cartPrice) - Number(cart[id].price));
        setCartNum(cartNum - 1);
        document.querySelector('#itemNum').innerText = "Shopping Cart (" + (cartNum - 1) + " items)";
        document.querySelector('#total').innerText = "Total: $ " + (Number(cartPrice) - Number(cart[id].price)).toFixed(2);
        setCart(newCart);
        if (cartNum <= 1) {
            pTagRef.current.innerText = "The cart is empty!";
        }
    }

    function toggleCart() {
        var element = document.querySelector('#cart');
        if(cartVisible) {
            element.style.display = 'none';
            cartVisible = false;
        } else {
            element.style.display = 'block';
            cartVisible = true;
        }
    }

    function searchClick() {
        setSearchResult(document.querySelector('#search').value);
    }

    function sortClick() {
        var newProduct = rollData;
        if (document.querySelector('#sort').value == "name") {
            newProduct.sort(sortName);
        } else {
            newProduct.sort(sortPrice);
        }
        setRollData(newProduct);
        setSortResult(document.querySelector('#sort').value);
    }

    function sortName(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    function sortPrice(a, b) {
        if (a.typePrice < b.typePrice) {
            return -1;
        }
        if (a.typePrice > b.typePrice) {
            return 1;
        }
        return 0;
    }

    return (
        <>
          <meta charSet="UTF-8" />
          <title>Page Title</title>
          <link rel="stylesheet" href="css/style.css" />
          {/*Page Header w/ logo and nav bar*/}
          <div id="top-bar">
            <div id="top-bar-left">
              <img
                id="logo-img"
                src={logo}
                alt="Bun Bun Bake Shop logo"
              />
            </div>
            <div id="top-bar-right">
              <nav>
                <button id="products" >PRODUCTS</button>
                <button onClick={toggleCart} >CART</button>
              </nav>
              <hr />
              <h1>Our hand-made cinnamon rolls</h1>
            </div>
          </div>
          <div id="cart">
            <hr className="cartLine"/>
              <div id="cartHeader">
                <h2 id="itemNum">Shopping Cart (0 items)</h2>
                <h2 id="total">Total: $ 0.00</h2>
              </div>
              <p ref={pTagRef} id="cart-dropdown">The cart is empty!</p>
              <div className="options">
                  {cart.map(
                   (roll, idx) => {
                       return (<CartProduct
                       key={idx}
                       num={idx}
                       imageURL={roll.imageURL}
                       title={roll.title}
                       type={roll.type}
                       glaze={roll.glaze}
                       size={roll.size}
                       price={roll.price}
                       removeFromCart={removeFromCart} />);
                   }
                 )}
                </div>
            <hr className="cartLine"/>
          </div>
          <div id="filters">
            <input id="search"/>
            <button id="searchBtn" onClick={searchClick}>Search</button>
            <p id="sortBy">sort by:</p>
            <select id="sort" name="sorting" onChange={sortClick}>
              <option value="name">Name</option>
              <option value="basePrice">Base Price</option>
            </select>
          </div>
          {/*Products offerred by Bun Bun Shop*/}
          <div id="options">
            {rollData.map(
             (roll, idx) => {
               if (searchResult == null || roll.title.includes(searchResult)) {
                 return (<Product
                 key={idx}
                 imageURL={roll.imageURL}
                 title={roll.title}
                 type={roll.type}
                 typePrice={roll.typePrice}
                 addToCart={addToCart} />);
               } else {
                 return (<div />);
               }
             }
           )}
          </div>
        </>
    )
}

export default Home;