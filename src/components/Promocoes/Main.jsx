import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Main() {
    const [data, setData] = useState({ promocoes: [], produtos: [] });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPromocoes = async () => {
        try {
          const response = await axios.get('http://localhost:3306/promocoes');
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Erro ao buscar promoções:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPromocoes();
    }, []);
  
    if (loading) {
      return <p>Carregando promoções...</p>;
    }
  
    return (
      <>
        <div className="promocoes-container">
          {data.promocoes.filter(promo => promo.ativo).map(promo => {
            const produto = data.produtos.find(prod => prod.id === promo.produto_id);
  
            if (!produto) return null;

            // Cálculo do preço com desconto
            const precoOriginal = parseFloat(produto.preco_produto);
            const valorDesconto = promo.valor_desconto;
            const precoComDesconto = precoOriginal - (precoOriginal * valorDesconto / 100);
  
            return (
              <div key={promo.id} className="promocao-card">
                <img src={produto.url_imagem} alt={produto.nome_produto} className="produto-imagem" />
                <div className="produto-detalhes">
                  <h2>{produto.nome_produto}</h2>
                  <p className="promocao-detalhe">Desconto: {valorDesconto}%</p>
                  <p className="preco">
                    Preço Original: R$ {precoOriginal.toFixed(2)}
                  </p>
                  <p className="preco">Preço com Desconto: R$ {precoComDesconto.toFixed(2)}</p>
                </div>
              </div>
          )})}
        </div>
      </>
    );
}
