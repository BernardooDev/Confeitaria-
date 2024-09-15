import React from 'react';
// Array de produtos fictícios
const products = [
  { id: 1, name: "Bolo de Chocolate", price: "R$ 20,00", logo: "bolo_chocolate.png" },
  { id: 2, name: "Bolo de Morango", price: "R$ 25,00", logo: "bolo_morango.png" },
  { id: 3, name: "Bolo de Coco", price: "R$ 22,00", logo: "bolo_coco.png" },
  { id: 4, name: "Bolo de Limão", price: "R$ 18,00", logo: "bolo_limao.png" },
  { id: 5, name: "Bolo de Limão", price: "R$ 18,00", logo: "bolo_limao.png" },
  { id: 6, name: "Bolo de Limão", price: "R$ 18,00", logo: "bolo_limao.png" },
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
