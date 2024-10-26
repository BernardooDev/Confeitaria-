import React, { createContext, useState, useContext } from "react";

// Criação do Contexto
const CartContext = createContext();

// Função para usar o contexto em qualquer componente
export const useCart = () => useContext(CartContext);

// Provedor do Cart (global)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Função para adicionar produtos ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verifique se o produto já está no carrinho
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Se o produto já estiver no carrinho, atualize a quantidade
        return prevCart.map(
          (item) =>
            item.id === product.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item,
          console.log(existingProduct)
        );
      } else {
        // Caso contrário, adicione o novo produto ao carrinho
        return [...prevCart, { ...product, quantidade: 1 }];
      }
    });
  };

  // Função para remover produto do carrinho ou reduzir a quantidade
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);

      if (existingProduct) {
        // Se a quantidade for maior que 1, apenas diminua a quantidade
        if (existingProduct.quantidade > 1) {
          return prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantidade: item.quantidade - 1 }
              : item
          );
        } else {
          // Caso contrário, remova o produto do carrinho
          return prevCart.filter((item) => item.id !== productId);
        }
      }

      return prevCart; // Retorna o carrinho inalterado se o produto não for encontrado
    });
  };

  const clearCart = () => {
    setCart([]); // Reseta o array de cart
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
