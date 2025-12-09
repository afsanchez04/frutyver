import { Link } from 'react-router-dom'
import { productsData } from '../data/products'
import { useState, useEffect } from 'react'
import "../stylesheet/Home.css"

export default function Home() {
  const sections = Object.keys(productsData)
  const [showModal, setShowModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Datos de los slides
  const slides = [
    {
      id: 1,
      category: "Verduras",
      title: "VERDURAS DE HOJA",
      seasonTag: "Temporada de rebajas",
      discount: "30%OFF",
      discountLabel: "HASTA",
      shipping: "ENVÍOS",
      shippingTime: "EN 24/48 HORAS",
      image: "./verdurasBanner.webp",
      link: "section/Verduras/De%20hoja",
      gradient: "linear-gradient(135deg, #96d35c 0%, #FFD93D 100%)",
      titleColor: "#004308",
      badgeColor: "#004308"
    },
    {
      id: 2,
      category: "Frutas",
      title: "FRUTAS FRESCAS",
      seasonTag: "Cosecha del día",
      discount: "25%OFF",
      discountLabel: "HASTA",
      shipping: "FRESCURA",
      shippingTime: "GARANTIZADA",
      image: "./frutas.webp",
      link: "category/Frutas",
      gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
      titleColor: "#8B0000",
      badgeColor: "#8B0000"
    },
    {
      id: 3,
      category: "Carnes",
      title: "CARNES PREMIUM",
      seasonTag: "Calidad superior",
      discount: "20%OFF",
      discountLabel: "HASTA",
      shipping: "CORTES",
      shippingTime: "SELECTOS",
      image: "./carnes.webp",
      link: "category/Carnes",
      gradient: "linear-gradient(135deg, #8B1E3F 0%, #D4A574 100%)",
      titleColor: "#4A0E1F",
      badgeColor: "#4A0E1F"
    }
  ]

  useEffect(() => {
    // Verificar si es la primera visita
    const hasVisited = localStorage.getItem('hasVisitedStore')
    if (!hasVisited) {
      setShowModal(true)
      localStorage.setItem('hasVisitedStore', 'true')
    }

    // Auto-play del carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <>
      {/* Modal de bienvenida */}
      {showModal && (
        <div className="welcome-modal-overlay" onClick={handleCloseModal}>
          <div className="welcome-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            <div className="modal-icon">
              <i className="bi bi-gift-fill"></i>
            </div>
            
            <h2 className="modal-title">¡Bienvenido a nuestra tienda!</h2>
            
            <div className="points-banner">
              <div className="points-number">90</div>
              <div className="points-label">PUNTOS</div>
            </div>
            
            <p className="modal-description">
              Completa tu primera compra y obtén <strong>90 puntos de regalo</strong> 
              que podrás canjear en futuras compras.
            </p>
            
            <div className="modal-features">
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Envío gratis en tu primer pedido</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Productos frescos y de calidad</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Atención personalizada</span>
              </div>
            </div>
            
            <button className="modal-cta-btn" onClick={handleCloseModal}>
              ¡Empezar a comprar!
            </button>
          </div>
        </div>
      )}

      {/* Carousel Banner */}
      <div className="carousel-banner-container">
        <Link className="text-decoration-none" to={currentSlideData.link}>
          <section 
            className="banner-container position-relative"
            style={{ background: currentSlideData.gradient }}
          >
            <div className="container">
              <div className="row">
                <div className="col align-items-center d-flex">
                  <div className="content-left">
                    <div className="season-tag">{currentSlideData.seasonTag}</div>

                    <h1 className="main-title" style={{ color: currentSlideData.titleColor }}>
                      {currentSlideData.title}
                    </h1>

                    <div className="badges-container">
                      <div 
                        className="badge badge-discount"
                        style={{ backgroundColor: currentSlideData.badgeColor }}
                      >
                        <span className="discount-text">{currentSlideData.discountLabel}</span>
                        <span className="discount-value">{currentSlideData.discount}</span>
                      </div>

                      <div className="badge badge-shipping">
                        <div className="shipping-text">
                          <span className="shipping-label">{currentSlideData.shipping}</span>
                          <span className="shipping-time">{currentSlideData.shippingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <figure className="image-right">
                    <img src={currentSlideData.image} alt={currentSlideData.category} />
                  </figure>
                </div>
              </div>
            </div>
          </section>
        </Link>

        {/* Controles del carousel */}
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        
        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
        >
          <i className="bi bi-chevron-right"></i>
        </button>

        {/* Navegación con puntos */}
        <div className="carousel-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); goToSlide(index); }}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <main className="">
        <h3 className="mb-3 text-center bg-success text-white py-2">¡Descubre nuestros productos!</h3>
        <div className="container">

          <section className="row">
            {sections.map(section => {
              const portada = productsData[section].portada

              return (
                <div key={section} className="col-md-3 col-6 mb-4 ">
                  <Link 
                    to={`/category/${encodeURIComponent(section)}`} 
                    className="text-decoration-none"
                  >
                    <div className={`card shadow-sm h-100 card-clickable`} style={{borderTop: `8px solid ${productsData[section].colorTag}`}}>
                      {portada && (
                        <figure>
                          <img
                            src={portada.startsWith('http') ? portada : `/${portada}`}
                            className="card-img-top"
                            alt={`Imagen de ${section}`}
                            style={{ height: '150px', objectFit: 'cover' }}
                          />
                        </figure>
                      )}
                      <div className="card-body text-center">
                        <h3 className="card-title">{section}</h3>
                        <button className="btn btn-success mt-3">
                          Ver {section}
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </section>
        </div>
      </main>
    </>
  )
}