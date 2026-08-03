import { useState } from "react";
import "./AuthRegister.css";

export function CardRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao realizar cadastro.");
      }
      alert("Usuário cadastrado com sucesso!");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      console.error("Erro ao registrar:", err);
      alert(err.message);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">REGISTRO</h1>
        <form className="form-auth" onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="name">Nome</label>
            <input
              name="name"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
