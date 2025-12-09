import { useLocation, Link } from "react-router-dom";
import { productsData } from "../data/products";
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import "../stylesheet/CategoryPage.css"

const normalizeText = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function SearchResults() {
  const { addToCart } = useCart()
  const [weight, setWeight] = useState({})
  const [unit, setUnit] = useState({})
  const [addedProducts, setAddedProducts] = useState({})
  
  const rawQuery = new URLSearchParams(useLocation().search).get("q") || "";
  const query = normalizeText(rawQuery);

  const results = [];

  Object.keys(productsData).forEach((category) => {
    const normalizedCategory = normalizeText(category);
    const subcats = productsData[category];

    Object.keys(subcats).forEach((sub) => {
      if (sub === "portada" || sub === "colorTag") return;
      
      const normalizedSub = normalizeText(sub);
      const obj = subcats[sub];
      if (!obj.items) return;

      obj.items.forEach((item) => {
        const name = normalizeText(item.name);

        const matches =
          name.includes(query) ||
          normalizedCategory.includes(query) ||
          normalizedSub.includes(query);

        if (matches) {
          results.push({
            ...item,
            category,
            subcategory: sub,
            categoryColor: productsData[category].colorTag
          });
        }
      });
    });
  });

  const convertToKg = (w, productId) => {
    const productUnit = unit[productId] || 'kg'
    return productUnit === 'lb' ? w / 2.20462 : w
  }

  const handleAddToCart = (product, weightInKg) => {
    addToCart(product, weightInKg)
    setAddedProducts(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  const handleWeightChange = (productId, value) => {
    setWeight(prev => ({ ...prev, [productId]: parseFloat(value) || 1 }))
  }

  const handleUnitChange = (productId, value) => {
    setUnit(prev => ({ ...prev, [productId]: value }))
  }

  return (
    <div className="container my-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Búsqueda
          </li>
        </ol>
      </nav>

      {/* Header de búsqueda */}
      <div className="category-header mb-4" style={{ borderLeft: `6px solid #198754` }}>
        <h1 className="category-title">Resultados para: "{rawQuery}"</h1>
        <p className="text-muted">
          {results.length} producto{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      {results.length === 0 && (
        <div className="alert alert-info text-center">
          <i className="bi bi-search me-2"></i>
          No se encontraron productos que coincidan con tu búsqueda.
        </div>
      )}

      {/* Grid de productos */}
      <div className="row">
        {results.map((product) => {
          const isAdded = addedProducts[product.id]
          const productWeight = weight[product.id] || 1
          const productUnit = unit[product.id] || 'kg'

          return (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card shadow-sm h-100 product-card">
                <div className="category-badge" style={{ backgroundColor: product.categoryColor }}>
                  {product.subcategory}
                </div>
                
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <figure className="mb-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="card-img-top product-image" 
                    />
                  </figure>
                </Link>

                <div className="card-body d-flex flex-column">
                  <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <h5 className="card-title product-name">{product.name}</h5>
                  </Link>
                  
                  <p className="card-text product-description flex-grow-1">
                    {product.description}
                  </p>
                  
                  <p className="text-muted small mb-2">
                    <i className="bi bi-tag me-1"></i>
                    {product.category} → {product.subcategory}
                  </p>
                  
                  <div className="product-price mb-3">
                    <span className="price-amount">${product.pricePerKg.toLocaleString()}</span>
                    <span className="price-unit"> / kg</span>
                  </div>

                  <div className="d-flex align-items-center mb-2 gap-2">
                    <input
                      type="number"
                      value={productWeight}
                      min="0.1"
                      step="0.1"
                      onChange={(e) => handleWeightChange(product.id, e.target.value)}
                      className="form-control weight-input"
                    />
                    <select 
                      value={productUnit} 
                      onChange={(e) => handleUnitChange(product.id, e.target.value)} 
                      className="form-select unit-select"
                    >
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                    </select>
                  </div>

                  <button
                    className={`btn w-100 add-to-cart-btn ${isAdded ? 'btn-added' : 'btn-success'}`}
                    onClick={() => handleAddToCart(product, convertToKg(productWeight, product.id))}
                    disabled={isAdded}
                  >
                    {isAdded ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          style={{ marginRight: '8px', animation: 'checkmark 0.4s ease' }}
                        >
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                        Agregado
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cart-plus me-2"></i>
                        Agregar al carrito
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}