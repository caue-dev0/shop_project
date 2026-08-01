async function mostrarProduto() {
  const response = await fetch("http://localhost:3000/products");
  const products = await response.json();

  const containerProducts = document.getElementById("container-products");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("list-products");

    card.innerHTML = `
      <img src="../images/online-store.png" width="220px">
      <div class="products-info">
        <h2 class="products-title">${product.name}</h2>
        <p class="products-price">${product.price}</p>
      </div>
      `;

    containerProducts.appendChild(card);
  });
}

mostrarProduto();
