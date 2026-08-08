import { NavLink } from "react-router";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="nav-text" end>
          Home
        </NavLink>
        <NavLink to="/products" className="nav-text" end>
          Produtos
        </NavLink>
      </div>

      <div className="nav-right">
        <NavLink to="/login" className="login-btn">
          Login
        </NavLink>
      </div>
    </nav>
  );
}
