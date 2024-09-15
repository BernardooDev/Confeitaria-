import React from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const categories = [
    {
      id: 1,
      name: "Bolo de Pote",
      link: "/bolo-de-pote",
      logo: "bolo_pote.png",
    },
    { id: 2, name: "Tortas", link: "/tortas", logo: "tortas.png" },
    { id: 3, name: "Cupcakes", link: "/cupcakes", logo: "cupcake.png" },
    { id: 4, name: "Biscoitos", link: "/biscoitos", logo: "biscoitos.png" },
  ];

  return (
    <div className="Main">
      {categories.map((category) => (
        <div key={category.id} className="AllProducts">
          <div className="ProductLogo">
            <img src={category.logo} alt={category.name} />
          </div>
          <div className="ProductName">
            <Link to={category.link}>{category.name}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
