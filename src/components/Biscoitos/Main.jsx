import React from 'react';
// Array de produtos fictícios
const products = [
  { id: 1, name: "Biscoito de Chocolate", price: "R$ 10,00", logo: "biscoito_chocolate.png", details: "Biscoito crocante com pedaços de chocolate meio amargo." },
  { id: 2, name: "Biscoito de Morango", price: "R$ 12,00", logo: "biscoito_morango.png", details: "Biscoito amanteigado com pedaços de morango seco e um leve toque de baunilha." },
  { id: 3, name: "Biscoito de Coco", price: "R$ 11,00", logo: "biscoito_coco.png", details: "Biscoito macio com coco ralado e um toque de leite condensado." },
  { id: 4, name: "Biscoito de Limão", price: "R$ 13,00", logo: "biscoito_limao.png", details: "Biscoito crocante com sabor intenso de limão e uma cobertura leve de açúcar." },
  { id: 5, name: "Biscoito de Amendoim", price: "R$ 14,00", logo: "biscoito_amendoim.png", details: "Biscoito de amendoim com pedaços de amendoim crocante e uma leve pitada de sal." },
  { id: 6, name: "Biscoito de Canela", price: "R$ 12,00", logo: "biscoito_canela.png", details: "Biscoito aromático com canela e açúcar, perfeito para acompanhar um café." },
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
