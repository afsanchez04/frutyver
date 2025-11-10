import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { productsData } from '../data/products'
import { useState } from 'react'
import "../stylesheet/Product.css"

export default function ProductPage() {
  const { section, sub } = useParams()
  const products = productsData[section]?.[sub]
  const { addToCart } = useCart()
  const [weight, setWeight] = useState(1)
  const [unit, setUnit] = useState('kg')

  // Estado para rastrear qué productos fueron agregados
  const [addedProducts, setAddedProducts] = useState({})

  if (!products) return <p className="p-3">Subsección no encontrada.</p>

  const convertToKg = w => (unit === 'lb' ? w / 2.20462 : w)

  const handleAddToCart = (product, weightInKg) => {
    addToCart(product, weightInKg)

    // Marcar el producto como agregado
    setAddedProducts(prev => ({ ...prev, [product.id]: true }))

    // Remover el estado después de 2 segundos
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  return (
    <main className="container mt-4">
      <p><Link to="/section/Granos">{section}</Link> / <Link to="/section/Granos">{sub}</Link></p>
      <h2>{section} - {sub}</h2>
      <div className="row">
        {products.items.map(p => {
          const isAdded = addedProducts[p.id]

          return (
            <div key={p.id} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <figure>
                  <img src={p.image} alt={p.name} className="card-img-top" />
                </figure>
                <div className="card-body">
                  <h5>{p.name}</h5>
                  <p>{p.description}</p>
                  <p><strong>${p.pricePerKg.toLocaleString()} / kg</strong></p>

                  <div className="d-flex align-items-center mb-2">
                    <input
                      type="number"
                      value={weight}
                      min="0.1"
                      step="0.1"
                      onChange={e => setWeight(parseFloat(e.target.value))}
                      className="form-control me-2"
                      style={{ width: '100px' }}
                    />
                    <select value={unit} onChange={e => setUnit(e.target.value)} className="form-select w-auto">
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                    </select>
                  </div>

                  <button
                    className={`btn w-100 ${isAdded ? 'btn-added' : 'btn-success'}`}
                    onClick={() => handleAddToCart(p, convertToKg(weight))}
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
                      'Agregar al carrito'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}