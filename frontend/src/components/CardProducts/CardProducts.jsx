import { useState } from "react";
import { useEffect } from "react";
import "./CardProducts.css";

export function CardProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products").then((response) =>
      response.json().then((data) => {
        setProducts(data);
      }),
    );
  }, []);

  return (
    <>
      <h1>Produtos</h1>
      <div className="catalog-container">
        {products.map((produto) => (
          <div key={produto.id} className="product-card">
            <img
              className="product-image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SjvAWTdm0U_tRhmJwTV9pNU7ks9HjD7VnHDCz6Xexg&s=10"
              alt={produto.name}
            ></img>
            <div className="product-info">
              <h2 className="product-title">{produto.name}</h2>
              <p className="product-price">{produto.price}</p>
              <button type="submit" className="button-buy">
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
