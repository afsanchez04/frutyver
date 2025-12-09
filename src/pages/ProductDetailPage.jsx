import { useParams, Link, useNavigate } from 'react-router-dom'
import { productsData } from '../data/products'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import "../stylesheet/ProductDetail.css"

export default function ProductDetailPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [weight, setWeight] = useState(1)
  const [unit, setUnit] = useState('kg')
  const [isAdded, setIsAdded] = useState(false)

  // Buscar el producto en todas las categorías
  let foundProduct = null
  let productCategory = null
  let productSubcategory = null
  let categoryColor = null

  Object.keys(productsData).forEach((category) => {
    const subcats = productsData[category]
    
    Object.keys(subcats).forEach((sub) => {
      if (sub === "portada" || sub === "colorTag") return
      
      const obj = subcats[sub]
      if (!obj.items) return

      const product = obj.items.find(item => item.id === parseInt(productId))
      if (product) {
        foundProduct = product
        productCategory = category
        productSubcategory = sub
        categoryColor = productsData[category].colorTag
      }
    })
  })

  if (!foundProduct) {
    return (
      <div className="container mt-5 text-center">
        <h3>Producto no encontrado</h3>
        <button className="btn btn-success mt-3" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    )
  }

  const convertToKg = (w) => (unit === 'lb' ? w / 2.20462 : w)

  const handleAddToCart = () => {
    addToCart(foundProduct, convertToKg(weight))
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const calculateTotal = () => {
    return (foundProduct.pricePerKg * convertToKg(weight)).toLocaleString()
  }

  return (
    <main className="container mt-4 product-detail-container">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/category/${productCategory}`}>{productCategory}</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/section/${productCategory}/${productSubcategory}`}>{productSubcategory}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {foundProduct.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Imagen del producto */}
        <div className="col-lg-6 mb-4">
          <div className="product-image-container">
            <div className="category-badge-detail" style={{ backgroundColor: categoryColor }}>
              {productSubcategory}
            </div>
            <img 
              src={foundProduct.image} 
              alt={foundProduct.name} 
              className="product-detail-image"
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="col-lg-6">
          <div className="product-info-card">
            <h1 className="product-detail-title">{foundProduct.name}</h1>
            
            <div className="product-category-path mb-3">
              <i className="bi bi-tag-fill me-2" style={{ color: categoryColor }}></i>
              <span>{productCategory}</span>
              <i className="bi bi-chevron-right mx-2"></i>
              <span>{productSubcategory}</span>
            </div>

            <div className="product-detail-price mb-4">
              <span className="price-label">Precio por kilogramo:</span>
              <div className="price-value">${foundProduct.pricePerKg.toLocaleString()}</div>
            </div>

            <div className="product-description-box mb-4">
              <h5 className="description-title">
                <i className="bi bi-info-circle me-2"></i>
                Descripción
              </h5>
              <p className="description-text">{foundProduct.description}</p>
            </div>

            {/* Selector de cantidad */}
            <div className="quantity-selector mb-4">
              <h5 className="selector-title">Selecciona la cantidad:</h5>
              <div className="d-flex align-items-center gap-3">
                <div className="weight-input-group">
                  <label className="input-label">Peso:</label>
                  <input
                    type="number"
                    value={weight}
                    min="0.1"
                    step="0.1"
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 1)}
                    className="form-control weight-input-detail"
                  />
                </div>
                <div className="unit-select-group">
                  <label className="input-label">Unidad:</label>
                  <select 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)} 
                    className="form-select unit-select-detail"
                  >
                    <option value="kg">Kilogramos (kg)</option>
                    <option value="lb">Libras (lb)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="total-price-box mb-4">
              <span className="total-label">Total a pagar:</span>
              <span className="total-value" style={{ color: categoryColor }}>
                ${calculateTotal()}
              </span>
            </div>

            {/* Botones de acción */}
            <div className="action-buttons">
              <button
                className={`btn btn-lg w-100 mb-3 ${isAdded ? 'btn-added-detail' : 'btn-add-cart-detail'}`}
                onClick={handleAddToCart}
                disabled={isAdded}
                style={!isAdded ? { backgroundColor: categoryColor, borderColor: categoryColor } : {}}
              >
                {isAdded ? (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      style={{ marginRight: '8px', animation: 'checkmark 0.4s ease' }}
                    >
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    ¡Agregado al carrito!
                  </>
                ) : (
                  <>
                    <i className="bi bi-cart-plus me-2"></i>
                    Agregar al carrito
                  </>
                )}
              </button>

              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-secondary flex-grow-1"
                  onClick={() => navigate(-1)}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver
                </button>
                <Link 
                  to="/cart" 
                  className="btn btn-outline-success flex-grow-1"
                >
                  <i className="bi bi-cart4 me-2"></i>
                  Ver carrito
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados (opcional) */}
      <div className="related-products mt-5">
        <h3 className="related-title">
          <i className="bi bi-grid-3x3-gap me-2"></i>
          Más productos de {productSubcategory}
        </h3>
        <p className="text-muted">
          <Link to={`/section/${productCategory}/${productSubcategory}`} className="text-decoration-none">
            Ver todos los productos de {productSubcategory} →
          </Link>
        </p>
      </div>
    </main>
  )
}