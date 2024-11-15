import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/Carrossel/index.css"; // Coloque seus estilos personalizados aqui

const Carrossel = () => {
  const [produtos, setProdutos] = useState([]);

  // Função para buscar produtos aleatórios e calcular os preços com desconto
  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3306/produtos"); // Substitua pela URL correta da sua API
      const { produtos } = response.data;
      console.log(produtos);

      // Buscar promoções ativas (caso a lógica de promoções esteja disponível)
      const promocoesResponse = await axios.get(
        "http://localhost:3306/promocoes"
      ); // Supondo que você tenha uma rota para promoções
      const promocoes = promocoesResponse.data.promocoes;

      // Selecionar 5 produtos aleatórios e adicionar preço com desconto
      const produtosAleatorios = produtos
        .sort(() => 0.5 - Math.random())
        .slice(0, 5) // Trazendo 5 produtos aleatórios
        .map((produto) => {
          // Verificar se existe promoção para o produto
          const promocao = promocoes.find((p) => p.produto_id === produto.id);

          // Se houver uma promoção, calcular o preço com desconto
          if (promocao) {
            const precoComDesconto =
              produto.preco_produto -
              (produto.preco_produto * promocao.valor_desconto) / 100;
            return {
              ...produto,
              preco_com_desconto: precoComDesconto.toFixed(2),
              promocao_descricao: promocao.descricao,
              valor_desconto: promocao.valor_desconto,
            };
          }

          return produto; // Se não houver promoção, retornar o produto sem alterações
        });

      setProdutos(produtosAleatorios);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Importação dos módulos correta
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="mySwiper"
    >
      {produtos.map((produto) => (
        <SwiperSlide key={produto.id}>
          <div className="carrossel-item">
            <div className="produto-nome">
              <h2>{produto.nome_produto}</h2>
            </div>
            <div className="produto-imagem">
              <img src={produto.url_imagem} alt={produto.nome_produto} />
            </div>
            <div className="produto-preco">
              {produto.preco_com_desconto ? (
                <>
                  <span className="preco-original">
                    R$ {produto.preco_produto}
                  </span>
                  <span className="preco-com-desconto">
                    R$ {produto.preco_com_desconto}
                  </span>
                  <div className="produto-descricao-promocao">
                    {produto.promocao_descricao}
                  </div>
                </>
              ) : (
                <p className="preco">R$ {produto.preco_produto}</p>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carrossel;
