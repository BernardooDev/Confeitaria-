import React from "react";
import { Link } from "react-router-dom";
import Cake from "../../assets/Cake.jpg";
import CupCake from "../../assets/Cupcake.jpg";
import Cookie from "../../assets/Cookie.jpg"
import Pie from "../../assets/Pie.jpg"

export default function Products() {
  const categories = [
    { id: 1, name: "Bolo de Pote", link: "/bolo-de-pote", logo: Cake },
    { id: 2, name: "Tortas", link: "/tortas", logo: Pie },
    { id: 3, name: "Cupcakes", link: "/cupcakes", logo: CupCake },
    { id: 4, name: "Biscoitos", link: "/biscoitos", logo: Cookie },
  ];

  return (
    <div className="Main">
      {categories.map((category) => (
         
        <div key={category.id} className="AllProducts">
          <Link to={category.link}>
          <div className="ProductLogo">
            <img src={category.logo} alt={category.name} />
          </div>
          <div className="ProductName">
           <h1>{category.name}</h1>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
