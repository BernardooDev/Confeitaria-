import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../State/CartContext"; // Usar o contexto do carrinho
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { addToCart, removeFromCart, cart, clearCart } = useCart();
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState(""); // Estado para a mensagem de sucesso ou erro
  const navigate = useNavigate();

  const calcularValorTotal = () => {
    return cart.reduce((total, produto) => {
      return total + produto.preco_produto * produto.quantidade;
    }, 0);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    const valor_total = calcularValorTotal();
    const pedido_produtos = cart.map((produto) => ({
      id: produto.id,
      nome: produto.nome_produto,
      quantidade: produto.quantidade,
      preco: produto.preco_produto,
      descricao: produto.descricao_produto,
    }));

    if (pedido_produtos.length === 0) {
      setMessage(
        "O carrinho está vazio! Adicione produtos antes de confirmar o pedido."
      );
      return; // Interrompe o envio se o carrinho estiver vazio
    }

    try {
      const response = await axios.post(
        "http://localhost:3306/pedido_cliente",
        {
          valor_total: valor_total,
          forma_entrega: 2,
          pedido_status: 2,
          pedido_produtos,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const handleSendMessage = () => {
        const phoneNumber = "+551193618-3097";
        const pedidoFormatado = pedido_produtos
          .map(
            (produto) =>
              `${produto.nome} (x${produto.quantidade}) - R$${produto.preco}`
          )
          .join(", ");

        const message = encodeURIComponent(
          `Olá, quero realizar um pedido. Produtos: ${pedidoFormatado}. Valor total: R$${valor_total}`
        );

        const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&type=phone_number&app_absent=0`;
        window.open(url, "_blank");
      };

      handleSendMessage();
      setMessage("Pedido realizado com sucesso!");
      clearCart();

      setTimeout(() => {
        setMessage("");
        navigate("/perfil");
      }, 5000);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      setMessage("Erro ao realizar o pedido. Tente novamente.");
    }
  };

  return (
    <div className="MainCheckout">
      <h1>
        Carrinho
        <FontAwesomeIcon icon={faShoppingCart} />
      </h1>
      {message && <div className="message">{message}</div>}
      <div className="CheckoutContainer">
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <div className="CheckoutProducts">
            <div className="CheckoutProduct">
              {cart.map((item, index) => (
                <div className="SingleProduct">
                  <div key={index} className="checkoutItem">
                    <div className="ProductLogo">
                      <img src={item.url_imagem} />  
                    </div>
                    <div className="ProductCheckoutName">
                      <h1 className="ProductName">{item.nome_produto}</h1>
                      <p className="ProductName">{item.descricao_produto}</p>
                    </div>
                    <div className="ProductPrice">
                      <div className="PriceTag">
                        <p>R$ {item.preco_produto * item.quantidade}</p>
                      </div>
                      <div className="ProductQuantity">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ButtonProduct"
                        >
                          -
                        </button>
                        <p>{item.quantidade}</p>
                        <button
                          onClick={() => addToCart(item)}
                          className="ButtonProduct"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="CheckoutTotal">
          <h1>Total </h1>
          <span>
            R$
            {cart.reduce(
              (total, item) => total + item.preco_produto * item.quantidade,
              0
            )}
          </span>
          <button onClick={handleSubmit}>Realizar pedido</button>
        </div>
      </div>
    </div>
  );
}
