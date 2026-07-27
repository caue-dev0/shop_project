const form = document.querySelector("#form-cadastro");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  await login();
});

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Requisição foi enviada com sucesso!");
    } else {
      console.log("Erro no servidor: ", response.statusText);
    }
  } catch (error) {
    console.error("Erro na requisição: ", error);
  }
}
