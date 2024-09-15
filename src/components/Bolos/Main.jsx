import React from 'react';
// Array de produtos fictícios
const products = [
  { id: 1, name: "Bolo de Chocolate", price: "R$ 20,00", logo: "bolo_chocolate.png", details: "Massa de chocolate com recheio de brigadeiro de coco." },
  { id: 2, name: "Bolo de Morango", price: "R$ 25,00", logo: "bolo_morango.png", details: "Massa leve de baunilha com recheio cremoso de morango fresco." },
  { id: 3, name: "Bolo de Coco", price: "R$ 22,00", logo: "bolo_coco.png", details: "Massa fofinha de coco com recheio de creme de leite condensado e coco ralado." },
  { id: 4, name: "Bolo de Limão", price: "R$ 18,00", logo: "bolo_limao.png", details: "Massa cítrica de limão com recheio de creme suave de limão siciliano." },
  { id: 5, name: "Bolo de Limão", price: "R$ 18,00", logo: "bolo_limao.png", details: "Deliciosa massa de limão com glacê de limão refrescante." },
  { id: 6, name: "Bolo de Limão", price: "R$ 18,00", logo: "bolo_limao.png", details: "Bolo leve e cítrico com cobertura cremosa de limão." },
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
            <h1 className="productName">{product.name}</h1>
            <p className='productDescription'> {product.details} </p>
            <span className="productPrice">{product.price}</span>
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
