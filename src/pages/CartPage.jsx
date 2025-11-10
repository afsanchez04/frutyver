import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function CartPage() {
  const { cart, updateWeight, removeFromCart, clearCart } = useCart()
  const [unit, setUnit] = useState('')
  const navigate = useNavigate()

  const convert = wKg => (unit === 'lb' ? wKg * 2.20462 : wKg)
  const convertToKg = w => (unit === 'lb' ? w / 2.20462 : w)
  const total = cart.reduce((sum, i) => sum + i.pricePerKg * i.weightKg, 0)

  // Función para manejar el cambio de unidad
  const handleUnitChange = (e) => {
    const value = e.target.value
    if (value !== '') {
      setUnit(value)
    }
  }

  // Determinar qué unidad mostrar (por defecto kg si no se ha seleccionado)
  const displayUnit = unit || 'kg'

  return (
    <div className="container mt-4">
      <h2>Carrito</h2>

      <div className="d-flex justify-content-end mb-3">
        <select 
          value={unit} 
          onChange={handleUnitChange} 
          className="form-select w-auto"
          style={{ color: unit === '' ? '#6c757d' : 'inherit' }}
        >
          <option value="" disabled hidden>Cambiar unidad</option>
          <option value="kg">Ver en kg</option>
          <option value="lb">Ver en lb</option>
        </select>
      </div>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Peso ({displayUnit})</th>
                <th>Precio/kg</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      value={convert(item.weightKg).toFixed(2)}
                      min="0.1"
                      step="0.1"
                      onChange={e => updateWeight(item.id, convertToKg(parseFloat(e.target.value)))}
                      className="form-control"
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td>${item.pricePerKg.toLocaleString()}</td>
                  <td>${(item.pricePerKg * item.weightKg).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-danger btn-sm py-2 px-3" onClick={() => removeFromCart(item.id)}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 d-flex justify-content-between align-items-center">
            <h4>Total: ${total.toLocaleString()}</h4>
            <div>
              <button
                className="btn btn-link text-danger"
                onClick={() => {
                  const confirmClear = window.confirm('¿Estás seguro de que deseas vaciar el carrito? Esta acción no se puede deshacer.')
                  if (confirmClear) clearCart()
                }}
              >
                Vaciar carrito
              </button>
              <button className="btn btn-success" onClick={() => navigate('/checkout')}>
                Ir al Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}