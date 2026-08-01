export default function CardProduto({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>R${price}</p>
    </div>
  );
}
