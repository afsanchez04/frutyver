import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cart } = useCart()

   return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold text-pacific" to="/">
          Frutyver
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Menú principal */}
            <li className="nav-item">
              <Link className="nav-link" to="section/Granos">
                Granos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="section/Verduras">
                Verduras
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="section/Frutas">
                Frutas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="section/Carnes">
                Carnes
              </Link>
            </li>
          </ul>

          {/* Carrito a la derecha */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/cart">
                {cart.length > 0 && (
                  <span
                  className="badge rounded-pill bg-white text-success"
                  style={{ fontSize: "0.8rem" }}
                  >
                    {cart.length}
                  </span>
                )}
                <i className="bi bi-cart4 fs-4"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
