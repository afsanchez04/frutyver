import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', address: '', payment: 'tarjeta' })
  const [paid, setPaid] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false) 
  const navigate = useNavigate()

  const total = cart.reduce((sum, i) => sum + i.pricePerKg * i.weightKg, 0)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePay = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.address) {
      alert('Por favor completa todos los campos.')
      return
    }

    setIsProcessing(true)

    // Simulación de pago
    setTimeout(() => {
      setPaid(true)
      clearCart()
    }, 1200)
  }

  if (paid) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="mb-3 text-success">✅ ¡Pago exitoso!</h2>
        <p>Gracias por tu compra, {form.name}. Tu pedido está en camino 🛍️</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    )
  }

  if (cart.length === 0)
    return (
      <div className="container mt-5 text-center">
        <h3>No tienes productos en el carrito.</h3>
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/')}>
          Ir a la tienda
        </button>
      </div>
    )

  return (
    <main className="container mt-4">
      <h2>Finalizar compra</h2>
      <div className="row mt-4">
        {/* Resumen del pedido */}
        <div className="col-md-6">
          <h4>Resumen de productos</h4>
          <ul className="list-group mb-3">
            {cart.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <small>{item.weightKg.toFixed(2)} kg</small>
                </div>
                <span>${(item.pricePerKg * item.weightKg).toLocaleString()}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <strong>Total</strong>
              <strong>${total.toLocaleString()}</strong>
            </li>
          </ul>
        </div>

        {/* Formulario de pago */}
        <div className="col-md-6">
          <h4>Datos de envío y pago</h4>
          <form onSubmit={handlePay}>
            <div className="mb-3">
              <label className="form-label">Nombre completo <span className='text-danger'>*</span></label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: Ana Pérez"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico <span className='text-danger'>*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: ana@email.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección <span className='text-danger'>*</span></label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: Calle 10 #15-20"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Método de pago <span className='text-danger'>*</span></label>
              <select name="payment" value={form.payment} onChange={handleChange} className="form-select">
                <option value="tarjeta">Tarjeta de crédito</option>
                <option value="efectivo">Efectivo al recibir</option>
                <option value="nequi">Nequi</option>
              </select>
            </div>

            <button type="submit" disabled={isProcessing} className="btn btn-success w-100">
              {isProcessing
                ? 'Procesando pago...' 
                : `Pagar $${total.toLocaleString()}`}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
