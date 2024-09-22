import React from "react";
import { useCart } from "../../State/CartContext";

const products = [
  {
    id: 1,
    name: "Cupcake de Chocolate",
    price: 12.00,
    logo: "cupcake_chocolate.png",
    details:
      "Massa de chocolate com cobertura de ganache de chocolate e granulado.",
  },
  {
    id: 2,
    name: "Cupcake de Morango",
    price: 15.00,
    logo: "cupcake_morango.png",
    details:
      "Massa de baunilha com cobertura de morango fresco e creme de chantilly.",
  },
  {
    id: 3,
    name: "Cupcake de Coco",
    price: 14.00,
    logo: "cupcake_coco.png",
    details:
      "Massa de coco com cobertura de creme de coco e flocos de coco ralado.",
  },
  {
    id: 4,
    name: "Cupcake de Limão",
    price: 13.00,
    logo: "cupcake_limao.png",
    details:
      "Massa cítrica de limão com cobertura de merengue de limão e raspas de limão.",
  },
  {
    id: 5,
    name: "Cupcake Red Velvet",
    price: 17.00,
    logo: "cupcake_red_velvet.png",
    details:
      "Massa aveludada de chocolate vermelho com cobertura de cream cheese.",
  },
  {
    id: 6,
    name: "Cupcake de Baunilha",
    price: 16.00,
    logo: "cupcake_baunilha.png",
    details:
      "Massa de baunilha com cobertura de baunilha e confeitos coloridos.",
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
