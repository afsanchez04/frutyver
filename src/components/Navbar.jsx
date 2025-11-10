import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  const location = useLocation()


  const isActive = (path) => {
    return location.pathname.includes(path)
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold text-pacific" to="/">
          Frutyver
        </Link>

        <div className="d-md-none ms-auto">
          <Link className="nav-link d-flex align-items-center gap-2 text-white" to="/cart">
            {cart.length > 0 && (
              <span
                className="badge rounded-pill bg-white text-success"
                style={{ fontSize: "0.8rem" }}
              >
                {cart.length}
              </span>
            )}
            <i className="bi bi-cart4 fs-4" aria-label="icono-carrito"></i>
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">

              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('Granos') ? 'active' : ''}`}
                  to="section/Granos"
                  aria-current={isActive('Granos') ? 'page' : undefined}
                >
                  Granos
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('Verduras') ? 'active' : ''}`}
                  to="section/Verduras"
                  aria-current={isActive('Verduras') ? 'page' : undefined}
                >
                  Verduras
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('Frutas') ? 'active' : ''}`}
                  to="section/Frutas"
                  aria-current={isActive('Frutas') ? 'page' : undefined}
                >
                  Frutas
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('Carnes') ? 'active' : ''}`}
                  to="section/Carnes"
                  aria-current={isActive('Carnes') ? 'page' : undefined}
                >
                  Carnes
                </Link>
              </li>
            </ul>
          </nav>

          <ul className="navbar-nav ms-auto d-none d-md-flex">
            <li className="nav-item">
              <Link 
                className={`nav-link d-flex align-items-center gap-2 ${isActive('/cart') ? 'active' : ''}`}
                to="/cart"
                aria-current={isActive('/cart') ? 'page' : undefined}
              >
                {cart.length > 0 && (
                  <span
                    className="badge rounded-pill bg-white text-success"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {cart.length}
                  </span>
                )}
                <i className="bi bi-cart4 fs-4" aria-label="icono-carrito"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
