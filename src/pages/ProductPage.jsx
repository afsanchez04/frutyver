import { useParams } from 'react-router-dom'
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

  if (!products) return <p className="p-3">Subsección no encontrada.</p>

  const convertToKg = w => (unit === 'lb' ? w / 2.20462 : w)

  return (
    <main className="container mt-4">
      <h2>{section} - {sub}</h2>
      <div className="row">
        {products.items.map(p => (
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
                  className="btn btn-success w-100"
                  onClick={() => addToCart(p, convertToKg(weight))}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
