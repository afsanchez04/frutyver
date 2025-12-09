import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { cart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  const [search, setSearch] = useState("")

  const isActive = (path) => location.pathname.includes(path)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim().length === 0) return
    navigate(`/search?q=${encodeURIComponent(search)}`)
    setSearch("")
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success">
      <div className="container">

        <Link className="navbar-brand fw-bold text-pacific" to="/">
          <img src="./logo.png" width="150" alt="" />
        </Link>

        <div className="d-md-none ms-auto">
          <Link className="nav-link d-flex align-items-center gap-2 text-white" to="/cart">
            {cart.length > 0 && (
              <span className="badge rounded-pill bg-white text-success" style={{ fontSize: "0.8rem" }}>
                {cart.length}
              </span>
            )}
            <i className="bi bi-cart4 fs-4"></i>
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* LINKS DE CATEGORÍAS */}
          <nav>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('Granos') ? 'active' : ''}`} to="category/Granos">
                  Granos
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('Verduras') ? 'active' : ''}`} to="category/Verduras">
                  Verduras
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('Frutas') ? 'active' : ''}`} to="category/Frutas">
                  Frutas
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('Carnes') ? 'active' : ''}`} to="category/Carnes">
                  Carnes
                </Link>
              </li>
            </ul>
          </nav>

          {/* 🔍 BUSCADOR */}
          <form
            className="d-flex mx-auto my-2"
            style={{ maxWidth: "300px" }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="form-control search-input"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: '#333'
              }}
            />

            <button
              type="submit"
              className="btn btn-light ms-2 d-flex align-items-center justify-content-center"
              style={{ width: "45px" }}
            >
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* CARRITO */}
          <ul className="navbar-nav ms-auto d-none d-md-flex">
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-2 ${isActive('/cart') ? 'active' : ''}`} to="/cart">
                {cart.length > 0 && (
                  <span className="badge rounded-pill bg-white text-success" style={{ fontSize: "0.8rem" }}>
                    {cart.length}
                  </span>
                )}
                <i className="bi bi-cart4 fs-4"></i>
              </Link>
            </li>
          </ul>

        </div>
      </div>
      
      <style>{`
        .search-input:focus {
          outline: none !important;
          border: 2px solid rgba(255, 255, 255, 0.6) !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.15) !important;
        }
        
        .search-input::placeholder {
          color: #6c757d;
        }
      `}</style>
    </nav>
  )
}