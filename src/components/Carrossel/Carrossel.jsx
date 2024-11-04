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

  // Função para buscar produtos aleatórios
  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3306/produtos"); // Substitua pela URL correta da sua API
      const { produtos } = response.data;
      console.log(produtos);
      // Selecionar 5 produtos aleatórios (ou qualquer quantidade que preferir)
      const produtosAleatorios = produtos
        .sort(() => 0.5 - Math.random())
        .slice(0, 5); // Trazendo 5 produtos aleatórios

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
      {produtos.map((produto, index) => (
        <SwiperSlide key={index}>
          <div className="carrossel-item" key={produto.id}>
            <div className="produto-nome">
              <h2>{produto.nome_produto}</h2>
            </div>
            <div className="produto-imagem">
              <img
                src={produto.url_imagem}
                alt={produto.nome_produto}
              />
            </div>
            <div className="produto-preco">
              <p>R$ {produto.preco_produto}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carrossel;
