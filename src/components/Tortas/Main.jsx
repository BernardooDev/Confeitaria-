import React from "react";
import { useCart } from "../../State/CartContext"; // Importar o contexto

// Array de produtos fictícios para tortas
const products = [
  {
    id: 7,
    name: "Torta de Limão",
    price: 30.00,
    logo: "torta_limao.png",
    details:
      "Torta com base crocante e recheio de mousse de limão, coberta com merengue.",
  },
  {
    id: 8,
    name: "Torta de Morango",
    price: 35.00,
    logo: "torta_morango.png",
    details:
      "Massa crocante com recheio cremoso de morango e cobertura de morangos frescos.",
  },
  {
    id: 9,
    name: "Torta de Chocolate",
    price: 40.00,
    logo: "torta_chocolate.png",
    details: "Base de biscoito com recheio cremoso de chocolate meio amargo.",
  },
  {
    id: 10,
    name: "Torta Holandesa",
    price: 45.00,
    logo: "torta_holandesa.png",
    details:
      "Torta de biscoito com creme de baunilha e cobertura de ganache de chocolate.",
  },
  {
    id: 11,
    name: "Torta de Maçã",
    price: 38.00,
    logo: "torta_maca.png",
    details: "Recheio de maçãs caramelizadas em massa folhada crocante.",
  },
  {
    id: 12,
    name: "Torta de Amendoim",
    price: 42.00,
    logo: "torta_amendoim.png",
    details:
      "Torta crocante com recheio cremoso de amendoim e cobertura de doce de leite.",
  },
];

export default function Main() {
  const { addToCart, removeFromCart, cart } = useCart(); // Usar o contexto

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
              <p className="productDescription">{product.details}</p>
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
