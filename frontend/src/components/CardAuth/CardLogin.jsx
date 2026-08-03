import { useState } from "react";

export function CardLogin() {
  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ocorreu um erro ao realizar login.");
      }

      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso!");
    } catch (err) {
      console.error("Ocorreu um erro: ", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">LOGIN</h1>
        <form className="form-auth" onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="button-auth">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
