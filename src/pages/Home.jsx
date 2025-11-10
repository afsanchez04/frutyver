import { Link } from 'react-router-dom'
import { productsData } from '../data/products'
import "../stylesheet/Home.css"

export default function Home() {
  const sections = Object.keys(productsData)
  console.log(sections)

  return (
    <>
      <Link className="text-decoration-none" to="section/Verduras/De%20hoja">
        <section class="banner-container">
          <div className="container">
            <div className="row">
              <div className="col align-items-center d-flex">

                <div class="content-left">
                  <div class="season-tag">Temporada de rebajas</div>

                  <h1 class="main-title">VERDURAS</h1>

                  <div class="badges-container">
                    <div class="badge badge-discount">
                      <span class="discount-text">HASTA</span>
                      <span class="discount-value">30%OFF</span>
                    </div>

                    <div class="badge badge-shipping">

                      <div class="shipping-text">
                        <span class="shipping-label">ENVÍOS</span>
                        <span class="shipping-time">EN 24/48 HORAS</span>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
              <div className="col">

                <figure class="image-right">
                  <img src="./verdurasBanner.webp" alt="Casa de muñecas Barbie con niña jugando" />
                </figure>
              </div>
            </div>

          </div>


        </section>
      </Link>
      <main className="">
        <h3 className="mb-3 text-center bg-success text-white py-2">¡Descubre nuestros productos!</h3>
        <div className="container">

          <section className="row">
            {sections.map(section => {
              const portada = productsData[section].portada // obtener imagen por categoría

              return (
                <div key={section} className="col-md-3 col-6 mb-4 ">
                  <div className="card shadow-sm h-100">
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
                      <Link
                        to={`/section/${encodeURIComponent(section)}`}
                        className="btn btn-success mt-3"
                      >
                        Ver {section}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </section>
        </div>
      </main>
    </>
  )
}
