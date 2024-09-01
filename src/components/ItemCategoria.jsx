import React from "react";

const ItemCategoria = ({ item }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-100 transition duration-300">
      <h3 className="text-xl font-medium text-gray-800">{item.name}</h3>
      <p className="text-gray-600 mt-2">Preço: R${item.price}</p>
      <p className="text-gray-600 mt-2">
        Disponibilidade: {item.disponivel ? "Disponivel" : "Encomenda"}
      </p>
    </div>
  );
};

export default ItemCategoria;
