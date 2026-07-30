async function mostrarProduto() {
  const response = await fetch("http://localhost:3000/products");
  const products = await response.json();

  const containerProducts = document.getElementById("container-products");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("list-products");

    card.innerHTML = `
      <h2>${product.name}</h2>
      <p>${product.price}</p>
      `;

    containerProducts.appendChild(card);
  });
}

mostrarProduto();
