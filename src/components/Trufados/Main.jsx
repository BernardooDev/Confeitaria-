import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../State/CartContext";

export default function Main() {
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart, cart } = useCart();
  console.log(cart);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get("http://localhost:3306/produtos/3");
        if (response.data && Array.isArray(response.data.produtos)) {
          setProducts(response.data.produtos);
          console.log(response.data.produtos);
        } else {
          console.error("Formato inesperado da resposta:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProductsByCategory();
  }, []);

  return (
    <div className="productContainer">
      <div className="Products">
        {products.map((product) => {
          const precoComDesconto = product.preco_com_desconto
            ? parseFloat(product.preco_com_desconto)
            : null;

          return (
            <div key={product.id} className="productCard">
              <div className="productLogoCupcake">
                <img src={product.url_imagem} alt={product.nome_produto} />
              </div>
              <div className="productDetails">
                <h1 className="productName">{product.nome_produto}</h1>
                <p className="productDescription">
                  {product.descricao_produto}
                </p>

                <div className="productPrice">
                  {precoComDesconto ? (
                    <>
                      <span className="priceOriginal">
                        R$ {product.preco_produto.toFixed(2)}
                      </span>
                      <br></br>
                      <span className="priceDiscounted">
                        R$ {precoComDesconto.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>
                      <br></br>
                      <span>R$ {product.preco_produto.toFixed(2)}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="AddToCart">
                <div className="SumtoCart">
                  <button onClick={() => removeFromCart(product.id)}>-</button>
                  <p>
                    {cart.find((item) => item.id === product.id)?.quantidade ||
                      0}
                  </p>
                  <button onClick={() => addToCart(product)}>+</button>
                </div>
                <div className="ButtonToCart">
                  <button>Adicionar</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
