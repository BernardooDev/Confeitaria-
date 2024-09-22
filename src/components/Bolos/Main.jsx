import React from "react";
import { useCart } from "../../State/CartContext";

const products = [
  {
    id: 1,
    name: "Bolo de Chocolate",
    price: 20.00,
    logo: "bolo_chocolate.png",
    details: "Massa de chocolate com recheio de brigadeiro de coco.",
  },
  {
    id: 2,
    name: "Bolo de Morango",
    price: 25.00,
    logo: "bolo_morango.png",
    details: "Massa leve de baunilha com recheio cremoso de morango fresco.",
  },
  {
    id: 3,
    name: "Bolo de Coco",
    price: 20.00,
    logo: "bolo_coco.png",
    details:
      "Massa fofinha de coco com recheio de creme de leite condensado e coco ralado.",
  },
  {
    id: 4,
    name: "Bolo de Limão",
    price: 18.00,
    logo: "bolo_limao.png",
    details:
      "Massa cítrica de limão com recheio de creme suave de limão siciliano.",
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
