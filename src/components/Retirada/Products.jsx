import React from "react";
import { Link } from "react-router-dom";
import Cake from "../../assets/Bolo.png";
import CupCake from "../../assets/Cupcake.webp";
import Cookie from "../../assets/Cookie.webp";
import Pie from "../../assets/cone.webp";

export default function Products() {
  const categories = [
    { id: 1, name: "Bolos", link: "/bolos", logo: Cake },
    { id: 2, name: "Cone", link: "/trufados", logo: Pie },
    { id: 3, name: "Cupcakes", link: "/cupcakes", logo: CupCake },
    { id: 4, name: "Biscoitos", link: "/biscoitos", logo: Cookie },
  ];

  return (
    <div className="Main">
      {categories.map((category) => (
        <div key={category.id} className="AllProducts">
          <Link className="CategoryContainer" to={category.link}>
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
