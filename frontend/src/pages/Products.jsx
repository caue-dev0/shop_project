import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import CardProduto from "../components/CardProducts/CardProducts";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((erro) => {
        console.log("Erro ao buscar produtos:", erro);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Carregando produtos...</h2>;
  }

  return (
    <>
      <NavBar />
      <h1>Produtos</h1>
      <div className="catalog-container">
        {products.map((product) => (
          <CardProduto
            key={product.id}
            name={product.name}
            price={product.price}
            // image={product.image}
          />
        ))}
      </div>
    </>
  );
}
