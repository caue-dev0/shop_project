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

    const data = await response.json();
    if (response.ok) {
      console.log("Requisição foi enviada com sucesso!");
    }

    localStorage.setItem("token", data.token);
  } catch (error) {
    console.error("Erro na requisição: ", error);
  }
}

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}
