import React from 'react';

const Item = ({ item }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
      <p className="text-lg text-gray-600">Preço: {item.price}</p>
      <p className="text-lg text-gray-600">Disponibilidade: {item.disponivel ? "Disponível" : "Encomenda"}</p>
    </div>
  );
};

export default Item;
