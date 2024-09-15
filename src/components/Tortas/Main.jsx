import React from 'react';
// Array de produtos fictícios para tortas
const products = [
  { id: 1, name: "Torta de Limão", price: "R$ 30,00", logo: "torta_limao.png" },
  { id: 2, name: "Torta de Morango", price: "R$ 35,00", logo: "torta_morango.png" },
  { id: 3, name: "Torta de Chocolate", price: "R$ 40,00", logo: "torta_chocolate.png" },
  { id: 4, name: "Torta Holandesa", price: "R$ 45,00", logo: "torta_holandesa.png" },
  { id: 5, name: "Torta de Maçã", price: "R$ 38,00", logo: "torta_maca.png" },
  { id: 6, name: "Torta de Amendoim", price: "R$ 42,00", logo: "torta_amendoim.png" },
];


export default function Main() {
  return (
    <div className="productContainer">
      <div className="Products">
      {products.map(product => (
        <div key={product.id} className="productCard">
          <div className="productLogo">
            <img src={`path/to/assets/${product.logo}`} alt={product.name} />
          </div>
          <div className="productDetails">
            <h3 className="productName">{product.name}</h3>
            <p className="productPrice">{product.price}</p>
          </div>
          <div className='AddToCart'> 
            <div className="SumtoCart">
              <p> - 1 + </p>
              </div>  
              <div className='ButtonToCart'>
                <button> Adicionar </button>
              </div>
          </div>

        </div>
      ))}
      </div>
    </div>
  );
}
