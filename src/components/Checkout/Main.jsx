import React, { useEffect } from "react";
import { useCart } from "../../State/CartContext"; // Usar o contexto do carrinho
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";

export default function Checkout() {
  const navigate  = useNavigate ();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Captura o token armazenado
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);

  const { addToCart, removeFromCart, cart } = useCart();

  return (
    <div className="MainCheckout">
      <h1>
        Carrinho
        <FontAwesomeIcon icon={faShoppingCart} />
      </h1>
      <div className="CheckoutContainer">
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <div className="CheckoutProducts">
            <div className="CheckoutProduct">
              {cart.map((item) => (
                <div className="SingleProduct">
                  <div key={item.id} className="checkoutItem">
                    <div className="ProductLogo">
                      <p> {item.logo} </p>
                    </div>
                    <div className="ProductCheckoutName">
                      <p className="ProductName">{item.name}</p>
                    </div>
                    <div className="ProductPrice">
                      <div className="PriceTag">
                        <p>R$ {item.price * item.quantity}</p>
                      </div>
                      <div className="ProductQuantity">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ButtonProduct"
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() => addToCart(item)}
                          className="ButtonProduct"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="CheckoutTotal">
          <h1>Total </h1>
          <span>
            R$
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
