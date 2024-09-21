import React from "react";
import { useCart } from "../../State/CartContext"; // Usar o contexto do carrinho

export default function Checkout() {
  const { cart } = useCart();

  return (
    <div className="MainCheckout">
      <div className="CheckoutContainer">
        <h1>Checkout</h1>
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <div className="CheckoutProducts">
            {cart.map((item) => (
              <div className="CheckoutProduct">
                <div className="SingleProduct">
                  <div key={item.id} className="checkoutItem">
                    <div className="ProductLogo">
                      <p> {item.logo} </p>
                    </div>
                    <div className="ProductCheckoutName">
                      <p>{item.name} </p>
                    </div>
                    <div className="ProductQuantity">
                      <p>R$ {item.price * item.quantity}</p>
                      <p>Quantidade: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="CheckoutTotal">
              <h1>Total R$ </h1>
              <span>
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
