import { Link } from 'react-router-dom'
import { productsData } from '../data/products'

export default function Home() {
  const sections = Object.keys(productsData)
  console.log(sections)

  return (
    <>
      <div className="mt-4">
        <img className="w-100" src="banner.png" alt="" />
      </div>
      <div className="container mt-0">
        <h1 className="mb-4 text-center bg-success text-white py-3">Categorías</h1>
        <div className="row">
          {sections.map(section => {
            const portada = productsData[section].portada // obtener imagen por categoría

            return (
              <div key={section} className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  {portada && (
                    <img
                      src={portada.startsWith('http') ? portada : `/${portada}`}
                      className="card-img-top"
                      alt={`Imagen de ${section}`}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
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
        </div>
      </div>
    </>
  )
}
