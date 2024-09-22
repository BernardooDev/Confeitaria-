import React from "react";
import { useCart } from "../../State/CartContext";

const products = [
  {
    id: 1,
    name: "Biscoito de Chocolate",
    price: 10.0,
    logo: "biscoito_chocolate.png",
    details: "Biscoito crocante com pedaços de chocolate meio amargo.",
  },
  {
    id: 2,
    name: "Biscoito de Morango",
    price: 12.0,
    logo: "biscoito_morango.png",
    details:
      "Biscoito amanteigado com pedaços de morango seco e um leve toque de baunilha.",
  },
  {
    id: 3,
    name: "Biscoito de Coco",
    price: 11.0,
    logo: "biscoito_coco.png",
    details: "Biscoito macio com coco ralado e um toque de leite condensado.",
  },
  {
    id: 4,
    name: "Biscoito de Limão",
    price: 13.0,
    logo: "biscoito_limao.png",
    details:
      "Biscoito crocante com sabor intenso de limão e uma cobertura leve de açúcar.",
  },
  {
    id: 5,
    name: "Biscoito de Amendoim",
    price: 14.0,
    logo: "biscoito_amendoim.png",
    details:
      "Biscoito de amendoim com pedaços de amendoim crocante e uma leve pitada de sal.",
  },
  {
    id: 6,
    name: "Biscoito de Canela",
    price: 12.0,
    logo: "biscoito_canela.png",
    details:
      "Biscoito aromático com canela e açúcar, perfeito para acompanhar um café.",
  },
];

export default function Main() {
  const { addToCart, removeFromCart, cart } = useCart();

  return (
    <div className="productContainer">
      <div className="Products">
        {products.map((product) => (
          <div key={product.id} className="productCard">
            <div className="productLogo">
              <img src={`path/to/assets/${product.logo}`} alt={product.name} />
            </div>
            <div className="productDetails">
              <h1 className="productName">{product.name}</h1>
              <p className="productDescription"> {product.details} </p>
              <span className="productPrice">R$ {product.price}</span>
            </div>
            <div className="AddToCart">
              <div className="SumtoCart">
                <button onClick={() => removeFromCart(product.id)}>-</button>
                <p>
                  {cart.find((item) => item.id === product.id)?.quantity || 0}
                </p>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
              <div className="ButtonToCart">
                <button> Adicionar </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
