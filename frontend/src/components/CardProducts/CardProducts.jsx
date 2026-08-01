import "./CardProducts.css";

export default function CardProduto({ name, price }) {
  const formattedPrice = Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="product-card">
      {/* <img src={image} alt={name} />*/}
      <div className="product-image-placeholder">
        <span>Sem Imagem</span>
      </div>

      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <p className="product-price">{formattedPrice}</p>
        <button type="" className="add-to-cart-btn">
          Comprar
        </button>
      </div>
    </div>
  );
}
